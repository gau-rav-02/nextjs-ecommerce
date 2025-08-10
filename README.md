

## 📋 Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** (v18 or later) → [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn** or **pnpm**

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/gau-rav-02/nextjs-ecommerce.git
cd your-repo-name
```

### 2. Install Dependencies
Using npm:
```bash
npm install
```
Using yarn:
```bash
yarn install
```
Using pnpm:
```bash
pnpm install
```

---

## ⚙️ Environment Variables

1. Create a `.env.local` file in the root of your project:
```bash
touch .env.local
```

2. Add your environment variables in `.env.local` (example):
```env
// MongoDB Access
MONGODB_URI=
SECRET_KEY=

// Node Emailer to Send Emails (for email verification and otp verification)
NODEMAILER_HOST="smtp.gmail.com" // as it is
NODEMAILER_PORT="587" // as it is
NODEMAILER_EMAIL="" // Your Email
NODEMAILER_PASSWORD="" // Your App Passwords - (Create Your Email Passwords in manage account), example password - "aaaa bbbb cccc dddd"

// base urls
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
NEXT_PUBLIC_API_BASE_URL="http://localhost:3000/api"
NODE_ENV="development"

// Setup your cloudinary access points
NEXT_PUBLIC_CLOUDINARY_API_KEY=""
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=""
NEXT_PUBLIC_CLOUDINARY_UPDATE_PRESET=""
CLOUDINARY_SECRET_KEY=""
```

---

## 🏃 Running the Project

### Development Mode
```bash
npm run dev
```
or
```bash
yarn dev
```
or
```bash
pnpm dev
```
- Your app will be running at **http://localhost:3000**

### Production Build
```bash
npm run build
npm start
```

---

## 📚 Learn More
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [MongoDB Docs](https://www.mongodb.com/docs/)


