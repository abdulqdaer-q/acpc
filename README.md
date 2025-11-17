# ACPC - Aleppo Competitive Programming Competition

A modern, responsive website for the Aleppo Competitive Programming Competition, built with Next.js 16, TypeScript, Tailwind CSS, and Strapi headless CMS.

## Features

### Core Features
- **Modern Landing Page**: Beautiful, responsive design with sections for About, Competition Format, Schedule, and Contact
- **Bilingual Support**: Full internationalization (i18n) with English and Arabic support using next-intl
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **TypeScript**: Fully typed for better development experience
- **Tailwind CSS**: Modern, utility-first CSS framework
- **SEO Optimized**: Dynamic metadata, sitemaps, and robots.txt

### Authentication System
- User registration with full name support
- Secure login with bcrypt password hashing
- JWT token-based authentication
- Protected dashboard routes
- Session management with localStorage

### Contact & Communication
- **Contact Form**: Fully functional contact form with backend integration
- Message storage and status tracking
- Form validation and error handling
- Admin dashboard support for message management

### Volunteer Management
- **Volunteer Applications**: Complete application system for 4 teams:
  - Media Team
  - Logistics Team
  - Operations Team
  - General Volunteers
- Application tracking and status management
- User application history (when authenticated)
- Admin approval workflow

### Team Registration
- **Competition Team Registration**: Full team management system
  - Team creation (1-3 members)
  - Coach information management
  - Team member profiles with student details
  - Team status tracking (pending/approved/rejected)
- Member addition/removal
- Team dashboard for registered users

### Headless CMS Backend
- Strapi v5.31.0 headless CMS
- REST API with comprehensive endpoints
- SQLite database (development) - configurable for PostgreSQL (production)
- Content type management for teams, applications, and messages
- Built-in admin panel for content management
- Admin-ready endpoints for content management

## Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Internationalization**: next-intl

### Backend
- **CMS**: Strapi 5.31.0
- **Runtime**: Node.js
- **Database**: SQLite (development) / PostgreSQL (production recommended)
- **Authentication**: JWT via Strapi users-permissions plugin
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
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**Backend** - The backend `.env` is already configured in `backend/.env`. For production, update:
- `APP_KEYS` - Use strong random secrets (comma-separated)
- `API_TOKEN_SALT` - Random salt for API tokens
- `ADMIN_JWT_SECRET` - Secret for admin JWT
- `TRANSFER_TOKEN_SALT` - Random salt for transfer tokens
- `JWT_SECRET` - Secret for user JWT
- Configure PostgreSQL database instead of SQLite

### Running the Development Servers

You need to run both the frontend and backend:

**Terminal 1 - Strapi Backend:**
```bash
cd backend
npm run develop
```
Backend API runs on [http://localhost:3001](http://localhost:3001)
Strapi Admin Panel is available at [http://localhost:3001/admin](http://localhost:3001/admin)

**Terminal 2 - Frontend:**
```bash
npm run dev
```
Frontend runs on [http://localhost:3000](http://localhost:3000)

Open [http://localhost:3000](http://localhost:3000) in your browser.

**First Time Setup:**
When you first run Strapi, visit [http://localhost:3001/admin](http://localhost:3001/admin) to create your admin account. This is required before the API can be used.

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

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - User logout

### Contact
- `POST /api/contact` - Submit contact message (public)
- `GET /api/contact` - Get all messages (admin)
- `PATCH /api/contact/:id/status` - Update message status (admin)

### Volunteers
- `POST /api/volunteers` - Submit volunteer application
- `GET /api/volunteers/my-applications` - Get user's applications (authenticated)
- `GET /api/volunteers` - Get all applications (admin)
- `GET /api/volunteers?team=<team>` - Filter by team (admin)
- `PATCH /api/volunteers/:id/status` - Update application status (admin)

### Teams
- `POST /api/teams` - Create team (authenticated)
- `GET /api/teams/my-teams` - Get user's teams (authenticated)
- `GET /api/teams/:id` - Get team details (authenticated)
- `GET /api/teams` - Get all teams
- `POST /api/teams/:teamId/members` - Add team member (team owner)
- `DELETE /api/teams/:teamId/members/:memberId` - Remove member (team owner)
- `PATCH /api/teams/:id/status` - Update team status (admin)

### Health
- `GET /api/health` - API health check

## Features to Add

- [x] Team management system
- [x] Competition registration flow
- [x] Contact form
- [x] Volunteer application system
- [ ] Admin dashboard
- [ ] Email notifications
- [ ] Practice problems section
- [ ] Scoreboard and rankings
- [ ] Past competitions archive
- [ ] Team invitation system
- [ ] Competition scheduling system

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for your own competitive programming competition website.

## Support

For issues and questions, please open an issue on GitHub or contact us at contact@acpc.org

---

Built with ❤️ for the competitive programming community
