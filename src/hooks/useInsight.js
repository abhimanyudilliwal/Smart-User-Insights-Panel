import { useState, useCallback, useRef } from "react";
import { buildPrompt } from "../utils/prompt";

const STORAGE_KEY = (id) => `insight_user_${id}`;

async function fetchInsight(user, signal) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const model = "gemini-2.0-flash";  // free tier model

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      signal,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: buildPrompt(user) }],
          },
        ],
        generationConfig: {
          maxOutputTokens: 200,
          temperature: 0.7,
        },
      }),
    }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `API error ${res.status}`);
  }

  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Empty response from Gemini");
  return text.trim();
}

export function useInsight(user) {
  const cached = localStorage.getItem(STORAGE_KEY(user.id));
  const [insight, setInsight] = useState(cached || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retries, setRetries] = useState(0);
  const abortRef = useRef(null);

  const generate = useCallback(async (isRegen = false) => {
    if (loading) return;
    if (insight && !isRegen) return;

    abortRef.current?.abort();
    abortRef.current = new AbortController();

    setLoading(true);
    setError(null);
    if (isRegen) setInsight(null);

    try {
      const result = await fetchInsight(user, abortRef.current.signal);
      setInsight(result);
      localStorage.setItem(STORAGE_KEY(user.id), result);
      setRetries(0);
    } catch (e) {
      if (e.name === "AbortError") return;
      setError(e.message || "Something went wrong.");
      setRetries((r) => r + 1);
    } finally {
      setLoading(false);
    }
  }, [loading, insight, user]);

  return { insight, loading, error, retries, generate };
}