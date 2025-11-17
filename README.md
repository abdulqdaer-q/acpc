# ACPC - Aleppo Competitive Programming Competition

A modern, responsive website for the Aleppo Competitive Programming Competition, built with Next.js 14, TypeScript, Tailwind CSS, and Supabase.

## Features

- **Modern Landing Page**: Beautiful, responsive design with sections for About, Competition Format, Schedule, and Contact
- **User Authentication**: Complete authentication system with Supabase including:
  - User registration with email verification
  - Secure login
  - Password reset functionality
  - Social authentication (GitHub, Google) ready
- **User Dashboard**: Personalized dashboard for registered users
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **TypeScript**: Fully typed for better development experience
- **Tailwind CSS**: Modern, utility-first CSS framework

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Supabase
- **Deployment Ready**: Optimized for Vercel deployment

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase account and project

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd acpc
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.local.example` to `.env.local`
   - Update the Supabase credentials:

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### Supabase Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key from Project Settings > API
3. Enable Email authentication in Authentication > Providers
4. (Optional) Configure social authentication providers (GitHub, Google)

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
acpc/
├── app/
│   ├── auth/
│   │   ├── login/
│   │   │   └── page.tsx          # Login page
│   │   └── register/
│   │       └── page.tsx          # Registration page
│   ├── dashboard/
│   │   └── page.tsx              # User dashboard
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Landing page
├── components/
│   ├── About.tsx                 # About section
│   ├── Competition.tsx           # Competition format section
│   ├── Contact.tsx               # Contact section
│   ├── Footer.tsx                # Footer component
│   ├── Hero.tsx                  # Hero section
│   ├── Navbar.tsx                # Navigation bar
│   └── Schedule.tsx              # Schedule section
├── lib/
│   └── supabase.ts               # Supabase client
└── public/                       # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

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

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The project can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

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
