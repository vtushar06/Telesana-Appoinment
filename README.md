# 🏥 Telesana

Modern healthcare platform for seamless doctor-patient video consultations and appointment management.

## ✨ Features

**Patients**: Browse doctors, book appointments, video consultations, credit system  
**Doctors**: Manage appointments, track earnings, set availability  
**Admins**: Verify doctors, process payouts, monitor platform

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Setup database
npx prisma generate && npx prisma migrate dev

# Run development server
npm run dev
```

Visit `http://localhost:3000`

## ⚙️ Environment Setup

Create `.env` file:

```bash
DATABASE_URL="mysql://user:password@localhost:3306/telesana"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_xxxxx"
CLERK_SECRET_KEY="sk_test_xxxxx"
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
```

## 🛠️ Tech Stack

Next.js 15 • React 19 • MySQL • Prisma • Clerk • Tailwind CSS • Vonage Video

## 📦 Scripts

- `npm run dev` - Development server
- `npm run build` - Production build
- `npm start` - Production server

## 🚀 Deployment

- **Railway**: See [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md)
- **Render**: See [RENDER_DEPLOYMENT.md](./RENDER_DEPLOYMENT.md)

## 📁 Project Structure

```
app/              # Next.js App Router pages
components/       # Reusable UI components
actions/          # Server actions
lib/              # Utilities & configs
prisma/           # Database schema
public/           # Static assets
```

## 📝 License

MIT License

---

Built with ❤️ using Next.js 15
