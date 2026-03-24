
An AI-powered user analytics dashboard that provides deep, structured insights into user profiles. Built with **React** and **Vite**, it leverages **Claude Sonnet 4** for profile analysis and implements intelligent caching for optimal performance.

---

## Key Features

**AI-Powered Analysis**: Delivers deep psychological and professional insights using advanced LLMs.
**Dynamic Profile Cards**: Interactive and responsive user interface for displaying individual user data.
**Intelligent Caching**: Local storage integration to prevent redundant API calls and ensure instant access.
**Theme-Driven UI**: A modern, dark-themed interface with vibrant accents.
**Scalable Architecture**: Flexible and extensible codebase for adding new data sources and analysis tools.

---

##Tech Stack

**Frontend**: [React 19](https://react.dev/), [Vite](https://vitejs.dev/)
**Styling**: Vanilla CSS (Modern CSS variables, Flexbox/Grid)
**AI Integration**: Claude Sonnet 4
**State Management**: React Hooks (Custom useInsight)

---

## Getting Started

### Prerequisites

[Node.js](https://nodejs.org/) (v22 or higher recommended)
[npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1.  **Clone the repository**:
bash
    git clone [repository-url]
    cd smart-insights-panel
   

2.  **Install dependencies**:
bash
    npm install
   

3.  **Set up environment variables**:
    Create a .env.local file in the root directory and add your API keys:
env
   
    VITE_GROQ_API_KEY=your_api_key_here
   

4.  **Run the development server**:
bash
    npm run dev
   

---

##Project Structure
text
smart-insights-panel/
├── src/
│   ├── components/  # Reusable UI components (UserCard, etc.)
│   ├── data/        # Mock user data and configuration
│   ├── hooks/       # Custom React hooks (useInsight for AI logic)
│   ├── styles/      # Global and component-specific styles
│   ├── utils/       # Utility functions and helpers
│   ├── App.jsx      # Main application entry point
│   └── main.jsx     # Vite setup
├── public/          # Static assets
└── vite.config.js   # Vite configuration

---

## 🛡️ License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
