# 🚀 InsightAI Platform

InsightAI is a powerful, full-stack AI-powered SaaS platform designed to transform unstructured user input (text or files) into actionable insights. Built during the AI Hackathon, it focuses on solving real-world productivity and decision-making challenges using advanced generative AI.

## 🔗 Live Demo
**Application URL**: [https://insight-ai-platform-f9cd4.web.app](https://insight-ai-platform-f9cd4.web.app)

---

## 🔧 Tech Stack

*   **Frontend**: Vite + React (TypeScript)
*   **Backend**: Node.js + Express
*   **Database & Authentication**: Supabase (PostgreSQL with Row Level Security)
*   **AI Integration**: Google Gemini Pro API
*   **Hosting**: Firebase Hosting
*   **Styling**: Custom Modern CSS (Glassmorphism design)

## ✨ Key Features

*   **Secure Authentication**: Implemented using Supabase Auth with protected routes and session persistence.
*   **AI Processing Engine**: Backend API integrated with Gemini Pro to analyze user inputs and generate structured insights.
*   **Interactive Dashboard**: Users can view, manage, and revisit their past analysis history.
*   **Scalable Database Design**: Structured tables (`saas_user_inputs`, `saas_results`) with RLS policies ensuring strict data privacy.
*   **Modern UI/UX**: Responsive, premium dark-themed interface with smooth interactions and micro-animations.

---

## 🏗️ Architecture

- **Modular Frontend**: Clean component-based structure using React hooks (e.g., `useAuth`) for state management.
- **RESTful API**: Node.js/Express server acting as a secure bridge between the client and AI models.
- **Security**: Strict Row Level Security (RLS) on Supabase ensuring users can only access their own data.
- **Environment Management**: Segregated environment variables for frontend and backend keys.

---

## 🛠️ Local Setup

### 1. Clone the repository
```bash
git clone <repository-url>
cd Hackathon
```

### 2. Install dependencies
```bash
# Root directory
npm install

# Client directory
cd client && npm install

# Server directory
cd ../server && npm install
```

### 3. Environment Variables
Create `.env` files in both `client/` and `server/` directories.

**Client (`client/.env`):**
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_URL=http://localhost:5000
```

**Server (`server/.env`):**
```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
GEMINI_API_KEY=your_gemini_api_key
```

### 4. Database Setup
Execute the SQL found in `server/setup_db.sql` in your Supabase SQL Editor.

### 5. Run the application
```bash
npm run dev
```

---

## 🎯 Impact & Use Case
InsightAI enables users to quickly extract meaningful insights from raw data, improving productivity, decision-making, and accessibility to AI-powered analysis without requiring technical expertise.

---

## ⚡ Hackathon Submission
Developed with ⚡ and ☕ by **Aadarsh Thakur**.
Focusing on rapid execution, usability, and real-world applicability.
