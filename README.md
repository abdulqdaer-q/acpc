# ACPC - Aleppo Competitive Programming Competition

A modern, responsive website for the Aleppo Competitive Programming Competition, built with Next.js 16, TypeScript, Tailwind CSS, and a custom Express backend.

## Features

- **Modern Landing Page**: Beautiful, responsive design with sections for About, Competition Format, Schedule, and Contact
- **Bilingual Support**: Full internationalization (i18n) with English and Arabic support using next-intl
- **User Authentication**: Complete authentication system with JWT including:
  - User registration with full name support
  - Secure login with bcrypt password hashing
  - JWT token-based authentication
  - Protected dashboard routes
- **User Dashboard**: Personalized dashboard for registered users
- **Custom Backend**: Express.js REST API with SQLite database
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **TypeScript**: Fully typed for better development experience
- **Tailwind CSS**: Modern, utility-first CSS framework

## Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Internationalization**: next-intl

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: SQLite (better-sqlite3)
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ installed

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd acpc
```

2. Install dependencies for both frontend and backend:
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

3. Set up environment variables:

**Frontend** - Copy `.env.local.example` to `.env.local`:
```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

**Backend** - The backend `.env` is already configured in `backend/.env`. For production, update:
- `JWT_SECRET` - Use a strong random secret
- `DATABASE_PATH` - Path to SQLite database file
- `FRONTEND_URL` - Your frontend URL for CORS

### Running the Development Servers

You need to run both the frontend and backend:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend runs on [http://localhost:3001](http://localhost:3001)

**Terminal 2 - Frontend:**
```bash
npm run dev
```
Frontend runs on [http://localhost:3000](http://localhost:3000)

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
acpc/
├── app/                          # Frontend Next.js app
│   ├── [locale]/                 # Internationalized routes
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   │   └── page.tsx      # Login page
│   │   │   └── register/
│   │   │       └── page.tsx      # Registration page
│   │   ├── dashboard/
│   │   │   └── page.tsx          # User dashboard
│   │   ├── layout.tsx            # Locale layout
│   │   └── page.tsx              # Landing page
│   └── globals.css               # Global styles
├── backend/                      # Backend Express API
│   ├── src/
│   │   ├── models/
│   │   │   └── User.ts           # User model
│   │   ├── routes/
│   │   │   └── auth.ts           # Authentication routes
│   │   ├── middleware/
│   │   │   └── auth.ts           # JWT authentication middleware
│   │   ├── db.ts                 # Database setup
│   │   └── index.ts              # Express server
│   ├── .env                      # Backend environment variables
│   ├── tsconfig.json             # TypeScript config
│   └── package.json              # Backend dependencies
├── components/
│   ├── About.tsx                 # About section
│   ├── Competition.tsx           # Competition format section
│   ├── Contact.tsx               # Contact section
│   ├── Footer.tsx                # Footer component
│   ├── Hero.tsx                  # Hero section
│   ├── Navbar.tsx                # Navigation bar
│   └── Schedule.tsx              # Schedule section
├── lib/
│   └── api.ts                    # API client for backend
├── messages/                     # i18n translation files
│   ├── en.json                   # English translations
│   └── ar.json                   # Arabic translations
└── public/                       # Static assets
```

## Available Scripts

### Frontend
- `npm run dev` - Start frontend development server
- `npm run build` - Build frontend for production
- `npm start` - Start frontend production server
- `npm run lint` - Run ESLint

### Backend
- `cd backend && npm run dev` - Start backend development server
- `cd backend && npm run build` - Build backend for production
- `cd backend && npm start` - Start backend production server

## Customization

### Branding

1. Update the primary colors in `tailwind.config.ts`
2. Replace the ACPC logo/name in components
3. Update meta information in `app/layout.tsx`

### Content

- Edit sections in the `components/` directory
- Update contact information in `components/Contact.tsx`
- Modify competition details in `components/Competition.tsx` and `components/Schedule.tsx`

## Deployment

This project requires deploying both frontend and backend separately.

### Frontend Deployment (Vercel - Recommended)

1. Push your code to GitHub
2. Import your repository to Vercel
3. Add environment variables:
   - `NEXT_PUBLIC_API_URL` - Your backend API URL
4. Deploy!

### Backend Deployment

The backend can be deployed to:
- **Railway** - Easy Node.js deployment
- **Render** - Free tier available
- **DigitalOcean App Platform**
- **Heroku**
- **AWS EC2/Elastic Beanstalk**

For production:
1. Build the backend: `cd backend && npm run build`
2. Set environment variables (JWT_SECRET, DATABASE_PATH, etc.)
3. Run: `npm start`

### Database

For production, consider migrating from SQLite to:
- PostgreSQL
- MySQL
- MongoDB

Update `backend/src/db.ts` accordingly.

## Features to Add

- [ ] Team management system
- [ ] Competition registration flow
- [ ] Admin dashboard
- [ ] Email notifications
- [ ] Practice problems section
- [ ] Scoreboard and rankings
- [ ] Past competitions archive

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for your own competitive programming competition website.

## Support

For issues and questions, please open an issue on GitHub or contact us at contact@acpc.org

---

Built with ❤️ for the competitive programming community
