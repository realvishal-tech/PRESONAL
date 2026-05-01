# Vishal Futuristic Portfolio

Premium, futuristic developer portfolio and admin dashboard built with Next.js, Tailwind, and Firebase.

## Features

- Futuristic neon UI with glassmorphism and layered gradients
- Animated hero with marquee, typing effect, and parallax imagery
- Dynamic sections (projects, skills, blog, stats) backed by Firebase
- Admin dashboard for projects, skills, blog posts, about content, and contact submissions
- AI assistant widget, voice commands, custom cursor, scroll progress, dark/light toggle

## Getting Started

```bash
npm install
npm run dev
```

## Firebase Setup

1. Create a Firebase project with Authentication (Email/Password), Firestore, and Storage enabled.
2. Copy `.env.example` to `.env.local` and fill in your Firebase credentials.
3. Create an admin user in Firebase Auth with the email set in `NEXT_PUBLIC_ADMIN_EMAIL`.
4. Visit `/admin` to log in with username `admin` and your Firebase password.

## Notes

- Firestore security rules should restrict writes to authenticated admin users.
- Replace the hero and about images with Vishal's real portraits for production.
