import { useState, useCallback, useRef } from "react";
import { buildPrompt } from "../utils/prompt";

const STORAGE_KEY = (id) => `insight_user_${id}`;

async function fetchInsight(user, signal) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    signal,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",  // free model on Groq
      max_tokens: 200,
      temperature: 0.9,
      messages: [
        { role: "user", content: buildPrompt(user) }
      ],
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || `API error ${res.status}`);
  }

  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content;
  if (!text) throw new Error("Empty response from Groq");
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