export const USERS = [
  { id: 1, name: "Alice Chen",    role: "Admin",     status: "Active",   language: "English", email: "alice@corp.io",  joined: "2021-03-15", department: "Engineering" },
  { id: 2, name: "Bob Martínez",  role: "Editor",    status: "Active",   language: "Spanish", email: "bob@corp.io",    joined: "2022-07-08", department: "Content" },
  { id: 3, name: "Carol Dubois",  role: "Viewer",    status: "Inactive", language: "French",  email: "carol@corp.io",  joined: "2020-11-01", department: "Marketing" },
  { id: 4, name: "David Okafor",  role: "Moderator", status: "Active",   language: "English", email: "david@corp.io",  joined: "2023-01-20", department: "Support" },
  { id: 5, name: "Elena Petrova", role: "Editor",    status: "Pending",  language: "Russian", email: "elena@corp.io",  joined: "2023-09-11", department: "Design" },
];

export const ROLE_COLORS = {
  Admin:     { bg: "#1a2e1a", border: "#22c55e", text: "#4ade80" },
  Editor:    { bg: "#1a1f2e", border: "#3b82f6", text: "#60a5fa" },
  Viewer:    { bg: "#2a1f2e", border: "#a855f7", text: "#c084fc" },
  Moderator: { bg: "#2e1f1a", border: "#f97316", text: "#fb923c" },
  Pending:   { bg: "#2e2a1a", border: "#eab308", text: "#facc15" },
};

export const STATUS_COLORS = {
  Active:   "#22c55e",
  Inactive: "#ef4444",
  Pending:  "#eab308",
};
