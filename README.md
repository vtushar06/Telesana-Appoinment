# 🏥 Telesana - Virtual Healthcare Platform

A modern, full-stack telemedicine platform built with Next.js 15 that connects patients with healthcare professionals through secure video consultations and appointment management.

![Next.js](https://img.shields.io/badge/Next.js-15.3.2-black)
![React](https://img.shields.io/badge/React-19.0-blue)
![Prisma](https://img.shields.io/badge/Prisma-6.7-2D3748)
![MySQL](https://img.shields.io/badge/MySQL-Database-4479A1)
![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Database Setup](#-database-setup)
- [Key Features Explained](#-key-features-explained)
- [API Routes](#-api-routes)
- [Contributing](#-contributing)

---

## ✨ Features

### For Patients
- 🔐 **Secure Authentication** - Sign up/login with Clerk
- 👨‍⚕️ **Find Doctors** - Search by specialty and availability
- 📅 **Book Appointments** - Schedule consultations with available time slots
- 💳 **Credit System** - Purchase credits for appointments
- 🎥 **Video Consultations** - Connect with doctors via secure video calls
- 📊 **Appointment History** - Track past and upcoming appointments

### For Doctors
- ✅ **Verification System** - Upload credentials for admin verification
- 📆 **Availability Management** - Set and manage consultation time slots
- 💰 **Earnings Dashboard** - Track consultations and earnings
- 👥 **Patient Management** - View and manage appointments
- 💸 **Payout Requests** - Request withdrawals of earned credits

### For Admins
- 🛡️ **Doctor Verification** - Review and approve doctor applications
- 💵 **Payout Management** - Process doctor payout requests
- 📈 **Platform Overview** - Monitor platform activity

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 15.3.2** - React framework with App Router
- **React 19** - UI library
- **Tailwind CSS 4** - Utility-first CSS framework
- **Shadcn UI** - Pre-built accessible components
- **Lucide React** - Icon library

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Prisma 6.7** - Type-safe ORM
- **MySQL** - Relational database

### Authentication & Authorization
- **Clerk** - Complete authentication solution with user management

### Video Calling
- **Vonage Video API** - Real-time video consultation platform

### Additional Tools
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **date-fns** - Date manipulation
- **Sonner** - Toast notifications

---

## 📁 Project Structure

```
Telesana-Appoinment/
├── 📁 app/                          # Next.js App Router
│   ├── 📁 (auth)/                   # Authentication routes
│   │   ├── sign-in/[[...sign-in]]/  # Clerk sign-in page
│   │   └── sign-up/[[...sign-up]]/  # Clerk sign-up page
│   │
│   ├── 📁 (main)/                   # Main application routes
│   │   ├── 📁 admin/                # Admin dashboard
│   │   │   ├── page.jsx             # Admin overview
│   │   │   └── components/          # Admin-specific components
│   │   │       ├── pending-doctors.jsx
│   │   │       ├── pending-payouts.jsx
│   │   │       └── verified-doctors.jsx
│   │   │
│   │   ├── 📁 appointments/         # Patient appointments
│   │   │   └── page.jsx             # Appointments list
│   │   │
│   │   ├── 📁 doctor/               # Doctor dashboard
│   │   │   ├── page.jsx             # Doctor overview
│   │   │   ├── verification/        # Doctor verification flow
│   │   │   └── _components/
│   │   │       ├── appointments-list.jsx
│   │   │       ├── availability-settings.jsx
│   │   │       └── doctor-earnings.jsx
│   │   │
│   │   ├── 📁 doctors/              # Doctor browsing
│   │   │   ├── page.jsx             # All doctors
│   │   │   ├── [specialty]/         # Doctors by specialty
│   │   │   │   ├── page.jsx
│   │   │   │   └── [id]/            # Individual doctor profile
│   │   │   │       ├── page.jsx
│   │   │   │       └── _components/
│   │   │   │           ├── appointment-form.jsx
│   │   │   │           ├── doctor-profile.jsx
│   │   │   │           └── slot-picker.jsx
│   │   │   └── components/
│   │   │       └── doctor-card.jsx
│   │   │
│   │   ├── 📁 onboarding/           # User role selection
│   │   │   └── page.jsx
│   │   │
│   │   ├── 📁 pricing/              # Credit packages
│   │   │   └── page.jsx
│   │   │
│   │   └── 📁 video-call/           # Video consultation
│   │       ├── page.jsx
│   │       └── video-call-ui.jsx
│   │
│   ├── favicon.ico                  # Site favicon
│   ├── globals.css                  # Global styles
│   ├── layout.js                    # Root layout
│   └── page.js                      # Home/landing page
│
├── 📁 actions/                      # Server Actions
│   ├── admin.js                     # Admin operations
│   ├── appointments.js              # Appointment management
│   ├── credits.js                   # Credit system
│   ├── doctor.js                    # Doctor operations
│   ├── doctors-listing.js           # Doctor queries
│   ├── onboarding.js                # User onboarding
│   ├── patient.js                   # Patient operations
│   └── payout.js                    # Payout management
│
├── 📁 components/                   # Shared components
│   ├── appointment-card.jsx         # Appointment display
│   ├── header.jsx                   # Main navigation
│   ├── page-header.jsx              # Page title component
│   ├── pricing.jsx                  # Pricing display
│   ├── telesana-logo.jsx           # SVG logo
│   ├── telesana-icon.jsx           # Icon variant
│   ├── telesana-full-logo.jsx      # Full logo with text
│   ├── theme-provider.jsx          # Dark mode provider
│   └── 📁 ui/                       # Shadcn UI components
│       ├── alert.jsx
│       ├── badge.jsx
│       ├── button.jsx
│       ├── card.jsx
│       ├── dialog.jsx
│       ├── input.jsx
│       ├── label.jsx
│       ├── select.jsx
│       ├── separator.jsx
│       ├── sonner.jsx
│       ├── tabs.jsx
│       └── textarea.jsx
│
├── 📁 hooks/                        # Custom React hooks
│   └── use-fetch.js                 # Data fetching hook
│
├── 📁 lib/                          # Utility functions
│   ├── checkUser.js                 # User verification
│   ├── data.js                      # Static data
│   ├── prisma.js                    # Prisma client instance
│   ├── schema.js                    # Zod schemas
│   ├── specialities.js              # Medical specialties
│   └── utils.js                     # Helper functions
│
├── 📁 prisma/                       # Database
│   ├── schema.prisma                # Database schema
│   └── 📁 migrations/               # Migration history
│
├── 📁 public/                       # Static assets
│   ├── banner.png
│   ├── banner2.png
│   ├── logo.png
│   └── logo-single.png
│
├── .env                             # Environment variables
├── .gitignore                       # Git ignore rules
├── components.json                  # Shadcn config
├── eslint.config.mjs               # ESLint configuration
├── jsconfig.json                    # JavaScript config
├── middleware.js                    # Next.js middleware (Clerk)
├── next.config.mjs                 # Next.js configuration
├── package.json                     # Dependencies
├── postcss.config.mjs              # PostCSS config
├── tailwind.config.js              # Tailwind config (in next.config)
├── LOGO_GUIDE.md                   # Logo usage guide
└── README.md                        # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js 20+** (Current: v18.20.6 - upgrade recommended)
- **MySQL Database** (local or cloud)
- **Clerk Account** (for authentication)
- **Vonage Account** (for video calls - optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vtushar06/Telesana-Appoinment.git
   cd Telesana-Appoinment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env` (if available)
   - Or create a new `.env` file with the required variables (see below)

4. **Set up the database**
   ```bash
   # Run migrations
   npx prisma migrate dev
   
   # Generate Prisma Client
   npx prisma generate
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="mysql://username:password@localhost:3306/telesana_db"

# Clerk Authentication (Get from https://clerk.com)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_xxxxx"
CLERK_SECRET_KEY="sk_test_xxxxx"
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"

# Vonage Video API (Optional - Get from https://dashboard.nexmo.com)
VONAGE_API_KEY="your_api_key"
VONAGE_API_SECRET="your_api_secret"
VONAGE_APPLICATION_ID="your_application_id"
VONAGE_PRIVATE_KEY_PATH="./lib/private.key"
```

### Getting API Keys

1. **Clerk**: Sign up at [clerk.com](https://clerk.com) and create a new application
2. **Vonage**: Sign up at [vonage.com](https://dashboard.nexmo.com) for video API access

---

## 🗄️ Database Setup

### Database Schema

The application uses the following main models:

- **User** - Stores user information (patients, doctors, admins)
- **Appointment** - Manages appointment bookings
- **Availability** - Doctor availability slots
- **CreditTransaction** - Tracks credit purchases and usage
- **Payout** - Doctor payout requests

### Running Migrations

```bash
# Development
npx prisma migrate dev --name description_of_changes

# Production
npx prisma migrate deploy
```

### Viewing Database

```bash
# Open Prisma Studio
npx prisma studio
```

---

## 🎯 Key Features Explained

### 1. User Roles & Permissions

The application supports three user roles:

- **PATIENT**: Can browse doctors, book appointments, purchase credits
- **DOCTOR**: Can set availability, conduct consultations, request payouts
- **ADMIN**: Can verify doctors, process payouts, manage platform

Role is assigned during onboarding and determines access to features.

### 2. Credit System

- Patients purchase credits to book appointments
- Each appointment costs 1 credit
- New patients get 2 free credits
- Credits are allocated daily if the balance is below 2
- Doctors earn credits for completed appointments

### 3. Appointment Flow

1. Patient browses doctors by specialty
2. Patient selects available time slot
3. Appointment is created (1 credit deducted)
4. Both parties receive appointment details
5. Video call available at appointment time
6. Doctor marks appointment as completed
7. Doctor earns 1 credit

### 4. Doctor Verification

1. Doctor signs up and completes profile
2. Doctor uploads credentials (degree, license)
3. Admin reviews credentials
4. Doctor status changes to VERIFIED or REJECTED
5. Only verified doctors appear in listings

---

## 🔌 API Routes

The application uses Next.js Server Actions for API operations:

### Patient Actions
- `getAppointments()` - Fetch patient appointments
- `bookAppointment()` - Create new appointment
- `cancelAppointment()` - Cancel appointment

### Doctor Actions
- `getDoctorAppointments()` - Fetch doctor appointments
- `updateAvailability()` - Set doctor availability
- `markAppointmentCompleted()` - Complete appointment
- `requestPayout()` - Request credit withdrawal

### Admin Actions
- `getPendingDoctors()` - Fetch doctors awaiting verification
- `verifyDoctor()` - Approve/reject doctor
- `processPayout()` - Approve/reject payout request

---

## 📦 Available Scripts

```bash
# Development
npm run dev              # Start dev server with Turbopack

# Production
npm run build           # Build for production
npm start               # Start production server

# Database
npx prisma migrate dev  # Run migrations
npx prisma generate     # Generate Prisma Client
npx prisma studio       # Open database GUI

# Code Quality
npm run lint            # Run ESLint
```

---

## 🎨 Customization

### Branding

- Logo components: See `LOGO_GUIDE.md`
- Colors: Edit Tailwind config in `globals.css`
- Theme: Configured for dark mode by default

### Adding Features

1. Create server action in `/actions`
2. Add UI component in `/components`
3. Create route in `/app/(main)`
4. Update database schema in `prisma/schema.prisma` if needed

---

## 🚀 Deployment

### Deploy to Render

This project is configured for easy deployment on Render:

1. **Quick Deploy**: See [RENDER_DEPLOYMENT.md](./RENDER_DEPLOYMENT.md) for complete guide
2. **Requirements**:
   - MySQL/PostgreSQL database
   - Clerk API keys
   - (Optional) Vonage API for video calls

3. **One-Click Setup**:
   - Push to GitHub
   - Connect to Render
   - Configure environment variables
   - Deploy! 🎉

**Detailed deployment guide**: [RENDER_DEPLOYMENT.md](./RENDER_DEPLOYMENT.md)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Tushar Verma**
- GitHub: [@vtushar06](https://github.com/vtushar06)

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Clerk](https://clerk.com/) - Authentication & User Management
- [Prisma](https://www.prisma.io/) - Next-generation ORM
- [Shadcn UI](https://ui.shadcn.com/) - Re-usable components
- [Vonage](https://www.vonage.com/) - Video API
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework

---

## � Support

For support, email support@telesana.com or open an issue in the repository.

---

## � Future Enhancements

- [ ] Multi-language support
- [ ] Push notifications
- [ ] Mobile app (React Native)
- [ ] AI-powered doctor recommendations
- [ ] Prescription management
- [ ] Medical records storage
- [ ] Insurance integration
- [ ] Chat messaging between appointments
- [ ] Email/SMS reminders
- [ ] Analytics dashboard for doctors

---

**Built with ❤️ for better healthcare access**

