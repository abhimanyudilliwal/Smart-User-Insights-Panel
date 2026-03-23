export function buildPrompt(user) {
  return `You are a professional HR analyst. Write a concise, insightful 1–2 sentence summary about this user based on their profile data. Be specific and professional. Do not start with their name literally — vary the opening.

User Profile:
- Name: ${user.name}
- Role: ${user.role}
- Status: ${user.status}
- Language: ${user.language}
- Department: ${user.department}
- Member Since: ${user.joined}

Write only the summary — no preamble, no labels, no quotes.`;
}
