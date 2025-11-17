# ACPC Backend - Strapi CMS

This is the backend for the ACPC (Arab Collegiate Programming Contest) platform, built with Strapi headless CMS.

## Features

- **User Authentication**: JWT-based authentication using Strapi's users-permissions plugin
- **Team Management**: Create and manage competition teams with members
- **Volunteer Applications**: Submit and track volunteer applications for different teams
- **Contact Messages**: Handle contact form submissions

## Tech Stack

- **Strapi**: v5.31.0
- **Database**: SQLite (development) - can be configured for PostgreSQL in production
- **Authentication**: JWT tokens via Strapi's users-permissions plugin

## Getting Started

### Installation

```bash
npm install
```

### Development

Run Strapi in development mode with the admin panel:

```bash
npm run develop
```

The server will start on `http://localhost:3001`
The admin panel will be available at `http://localhost:3001/admin`

### Production

Build and start Strapi in production mode:

```bash
npm run build
npm start
```

## Content Types

### Team
- name (string)
- university (string)
- coach_name (string)
- coach_email (email)
- coach_phone (string)
- status (enum: pending, approved, rejected)
- created_by_user (relation to User)
- members (relation to Team Members)

### Team Member
- name (string)
- email (email)
- student_id (string)
- major (string)
- year (integer)
- role (enum: member, captain)
- team (relation to Team)

### Contact Message
- name (string)
- email (email)
- subject (string)
- message (text)
- status (enum: new, read, replied)

### Volunteer Application
- name (string)
- email (email)
- phone (string)
- team (enum: media, logistics, ops, volunteers)
- experience (text)
- availability (text)
- motivation (text)
- status (enum: pending, approved, rejected)
- user (relation to User)

## API Endpoints

### Authentication
- `POST /api/auth/local/register` - Register a new user
- `POST /api/auth/local` - Login
- `GET /api/users/me` - Get current user (requires authentication)

### Teams
- `POST /api/teams` - Create a team (requires authentication)
- `GET /api/teams` - Get all teams
- `GET /api/teams/:id` - Get a specific team
- `PUT /api/teams/:id` - Update a team (requires authentication)
- `DELETE /api/teams/:id` - Delete a team (requires authentication)

### Team Members
- `POST /api/team-members` - Add a team member (requires authentication)
- `GET /api/team-members` - Get all team members
- `DELETE /api/team-members/:id` - Remove a team member (requires authentication)

### Contact Messages
- `POST /api/contact-messages` - Submit a contact message (public)
- `GET /api/contact-messages` - Get all messages (requires authentication)

### Volunteer Applications
- `POST /api/volunteer-applications` - Submit a volunteer application (public)
- `GET /api/volunteer-applications` - Get all applications (requires authentication)

## Environment Variables

Create a `.env` file in the backend directory with:

```env
HOST=0.0.0.0
PORT=3001

# Secrets (change these in production!)
APP_KEYS=your-app-key-1,your-app-key-2
API_TOKEN_SALT=your-api-token-salt
ADMIN_JWT_SECRET=your-admin-jwt-secret
TRANSFER_TOKEN_SALT=your-transfer-token-salt
JWT_SECRET=your-jwt-secret

# Database
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
```

**IMPORTANT**: Change all secrets in production!

## Permissions

The following routes are publicly accessible:
- Team listing (find, findOne)
- Contact message submission (create)
- Volunteer application submission (create)

All other routes require authentication.

## Admin Panel

After starting Strapi in development mode, visit `http://localhost:3001/admin` to:
- Create your admin account (first time only)
- Manage content
- Configure permissions
- View API documentation

## Migration from Express Backend

This Strapi backend replaces the previous Express.js + SQLite backend. The API structure has been updated to follow Strapi conventions while maintaining the same functionality.
