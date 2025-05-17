# RayVibe: PDF Summarizer

**RayVibe** is an AI-powered web application that generates short, easy-to-understand summaries from lengthy PDF documents. It uses **Cohere AI**, **Gemini**, and falls back to **OpenAI** to ensure reliable, high-quality outputs. The app supports PDF uploads and integrates secure payment functionality via **Stripe**.

![home](https://github.com/user-attachments/assets/014887da-83c4-4640-b201-5da46472e9c4)


## 🧠 Features

- 📄 Upload and parse long PDF files
- 🤖 AI-based summary generation (Cohere → Gemini → OpenAI fallback)
- 💳 Stripe payment integration
- ⚡ Modern UI with TailwindCSS
- 🔐 Secure and scalable with Next.js & SQL backend

## 🚀 Tech Stack

- **Frontend**: Next.js, TailwindCSS
- **Backend**: Next.js API routes
- **Database**: SQL (PostgreSQL / MySQL)
- **AI Providers**: Cohere AI, Gemini, OpenAI
- **Payments**: Stripe API

## 🔧 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/deepanshurwt06/RayVibe
cd rayvibe
2. Install Dependencies
npm install
3. Configure Environment Variables
Create a .env.local file in the root directory and add your keys:

env
COHERE_API_KEY=your_cohere_api_key
GEMINI_API_KEY=your_gemini_api_key
OPENAI_API_KEY=your_openai_api_key
STRIPE_SECRET_KEY=your_stripe_secret
DATABASE_URL=your_database_connection_url
UPLOADTHING_TOKEN=_your_uploadthing_token
CLERK_SECRET_KEY=_your_cleark_api_key
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=_next_public_cleark_key

4. Run the Development Server
bash
npm run dev
Open http://localhost:3000 in your browser.

🌐 Live Demo
👉 https://rayvibe.onrender.com/

📁 Folder Structure
bash
Copy
Edit
/pages        # Next.js pages (routes)
/components   # Reusable UI components
/utils        # Helper functions
/styles       # TailwindCSS styles
/lib          # Database and API config
📸 Screenshots
<!-- Add real screenshots or links -->
Upload PDF
![upload](https://github.com/user-attachments/assets/72a2a1b3-51ea-4a99-97f9-c4db6ed2e3b9)

View Summary
![overview](https://github.com/user-attachments/assets/3916131a-383b-428a-9882-76dec5e51797)


🤝 Connect With Me
GitHub: https://github.com/deepanshurwt06

LinkedIn: https://www.linkedin.com/in/deepanshurwt6/

📄 License
This project is licensed under the MIT License.

Built with ❤️ using AI and modern web tech.
