# Database Seeding Guide

This guide explains how to seed the Strapi backend with sample data.

## Prerequisites

1. Node.js (>= 18.0.0)
2. npm (>= 6.0.0)
3. All dependencies installed (`npm install`)

## Seed Data

The seed data is located in `/backend/data/seed-data.json` and includes:

- **4 Users** - Sample coach and volunteer accounts
- **5 Teams** - Teams from Syrian universities (Damascus, Aleppo, Tishreen, Al-Baath, Kalamoon)
- **15 Team Members** - 3 members per team with different roles
- **5 Contact Messages** - Sample inquiries with different statuses
- **5 Volunteer Applications** - Applications for different volunteer teams

## How to Seed the Database

### Step 1: Initialize the Database

First, you need to start Strapi to create the database schema:

```bash
cd backend
npm run develop
```

Wait for Strapi to fully start (you should see "Strapi started successfully"). Then stop it with `Ctrl+C`.

### Step 2: Run the Seed Script

Once the database schema is created, run the seed script:

```bash
npm run seed
```

The script will:
- Connect to the SQLite database at `.tmp/data.db`
- Clear any existing data
- Insert all seed data (users, teams, members, messages, applications)
- Display a summary of what was seeded

### Step 3: Verify the Data

Start Strapi again:

```bash
npm run develop
```

Visit `http://localhost:3001/admin` to:
1. Create an admin account (first time only)
2. View the seeded data in the Content Manager

## Seed Script Details

The seed script (`scripts/seed-simple.ts`) uses:
- Direct SQLite3 connection via `better-sqlite3`
- Transaction-safe inserts
- Automatic timestamp generation
- Proper foreign key handling

## Sample Data Details

### Users
- coach@damascus.edu.sy
- coach@aleppo.edu.sy
- coach@tishreen.edu.sy
- volunteer@example.com
- (All passwords: `Password123!`)

### Teams
- Damascus Coders (approved)
- Aleppo Algorithms (approved)
- Tishreen Innovators (pending)
- Al-Baath Tech Stars (approved)
- Kalamoon Developers (rejected)

### Team Members
Each team has 3 members with one captain and two regular members.

### Contact Messages
Various inquiries about registration, venue, sponsorship, past problems, and technical requirements.

### Volunteer Applications
Applications for media, logistics, ops, and general volunteer teams with different approval statuses.

## Troubleshooting

### "No tables found" Error

If you see this error, it means the database schema hasn't been created yet. Make sure to:
1. Run `npm run develop` first
2. Wait for it to fully start
3. Stop it with Ctrl+C
4. Then run `npm run seed`

### Database Location

The SQLite database is stored at `backend/.tmp/data.db`. You can inspect it with any SQLite browser or the `sqlite3` command-line tool.

### Re-seeding

The seed script automatically clears existing data before inserting new records, so you can run it multiple times safely.

## Notes

- The seed script uses simple password hashing for demo purposes
- In production, Strapi handles password hashing automatically with bcrypt
- All timestamps are set to the current time when seeding
- Relations between entities are properly maintained (teams → members, teams → users, etc.)
