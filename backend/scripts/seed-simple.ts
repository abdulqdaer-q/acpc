import fs from 'fs';
import path from 'path';
import Database from 'better-sqlite3';
import crypto from 'crypto';

interface SeedData {
  users: Array<{
    username: string;
    email: string;
    password: string;
    confirmed: boolean;
    blocked: boolean;
  }>;
  teams: Array<{
    name: string;
    university: string;
    coach_name: string;
    coach_email: string;
    coach_phone: string;
    status: string;
  }>;
  teamMembers: Array<{
    name: string;
    email: string;
    student_id: string;
    major: string;
    year: number;
    role: string;
    teamIndex: number;
  }>;
  contactMessages: Array<{
    name: string;
    email: string;
    subject: string;
    message: string;
    status: string;
  }>;
  volunteerApplications: Array<{
    name: string;
    email: string;
    phone: string;
    team: string;
    experience: string;
    availability: string;
    motivation: string;
    status: string;
  }>;
}

function hashPassword(password: string): string {
  // Simple hash for demo purposes - in real Strapi this is handled by bcrypt
  return crypto.createHash('sha256').update(password).digest('hex');
}

async function seedDatabase() {
  try {
    console.log('🚀 Starting database seeding...\n');

    // Connect to database
    const dbPath = path.join(__dirname, '..', '.tmp', 'data.db');
    const dbDir = path.dirname(dbPath);

    // Create .tmp directory if it doesn't exist
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
      console.log(`✅ Created database directory: ${dbDir}\n`);
    }

    console.log(`📦 Connecting to database: ${dbPath}`);
    const db = new Database(dbPath);
    console.log('✅ Database connected successfully\n');

    // Load seed data
    const seedDataPath = path.join(__dirname, '..', 'data', 'seed-data.json');
    console.log(`📄 Loading seed data from: ${seedDataPath}`);
    const seedData: SeedData = JSON.parse(fs.readFileSync(seedDataPath, 'utf-8'));
    console.log('✅ Seed data loaded successfully\n');

    const timestamp = new Date().toISOString();

    // Check if tables exist and clear existing data
    console.log('🧹 Clearing existing data (if tables exist)...');
    const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
    const tableNames = tables.map((t: any) => t.name);

    if (tableNames.length === 0) {
      console.log('⚠️  No tables found. Database needs to be initialized by Strapi first.');
      console.log('   Run: npm run develop');
      console.log('   Then stop it with Ctrl+C and run this seed script again.\n');
      db.close();
      process.exit(1);
    }

    // Clear only if tables exist
    if (tableNames.includes('team_members')) db.exec('DELETE FROM team_members');
    if (tableNames.includes('teams_created_by_user_lnk')) db.exec('DELETE FROM teams_created_by_user_lnk');
    if (tableNames.includes('teams')) db.exec('DELETE FROM teams');
    if (tableNames.includes('contact_messages')) db.exec('DELETE FROM contact_messages');
    if (tableNames.includes('volunteer_applications_user_lnk')) db.exec('DELETE FROM volunteer_applications_user_lnk');
    if (tableNames.includes('volunteer_applications')) db.exec('DELETE FROM volunteer_applications');
    if (tableNames.includes('up_users')) db.exec('DELETE FROM up_users');
    console.log('✅ Existing data cleared\n');

    // Seed Users
    console.log('👥 Seeding users...');
    const insertUser = db.prepare(`
      INSERT INTO up_users (
        username, email, provider, password, confirmed, blocked,
        created_at, updated_at, published_at, created_by_id, updated_by_id, locale
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const createdUsers: number[] = [];
    for (const user of seedData.users) {
      const result = insertUser.run(
        user.username,
        user.email,
        'local',
        hashPassword(user.password),
        user.confirmed ? 1 : 0,
        user.blocked ? 1 : 0,
        timestamp,
        timestamp,
        timestamp,
        null,
        null,
        'en'
      );
      createdUsers.push(Number(result.lastInsertRowid));
      console.log(`  ✓ Created user: ${user.username} (ID: ${result.lastInsertRowid})`);
    }
    console.log(`✅ Seeded ${createdUsers.length} users\n`);

    // Seed Teams
    console.log('🏆 Seeding teams...');
    const insertTeam = db.prepare(`
      INSERT INTO teams (
        name, university, coach_name, coach_email, coach_phone, status,
        created_at, updated_at, published_at, created_by_id, updated_by_id, locale
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const insertTeamUserLink = db.prepare(`
      INSERT INTO teams_created_by_user_lnk (team_id, user_id, team_ord)
      VALUES (?, ?, ?)
    `);

    const createdTeams: number[] = [];
    for (let i = 0; i < seedData.teams.length; i++) {
      const team = seedData.teams[i];
      const result = insertTeam.run(
        team.name,
        team.university,
        team.coach_name,
        team.coach_email,
        team.coach_phone,
        team.status,
        timestamp,
        timestamp,
        timestamp,
        null,
        null,
        'en'
      );
      const teamId = Number(result.lastInsertRowid);
      createdTeams.push(teamId);

      // Link team to user
      if (createdUsers[i]) {
        insertTeamUserLink.run(teamId, createdUsers[i], 1);
      }

      console.log(`  ✓ Created team: ${team.name} (ID: ${teamId})`);
    }
    console.log(`✅ Seeded ${createdTeams.length} teams\n`);

    // Seed Team Members
    console.log('👨‍💻 Seeding team members...');
    const insertMember = db.prepare(`
      INSERT INTO team_members (
        name, email, student_id, major, year, role, team_id,
        created_at, updated_at, published_at, created_by_id, updated_by_id, locale
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    let createdMembersCount = 0;
    for (const member of seedData.teamMembers) {
      const teamId = createdTeams[member.teamIndex];
      if (teamId) {
        const result = insertMember.run(
          member.name,
          member.email,
          member.student_id,
          member.major,
          member.year,
          member.role,
          teamId,
          timestamp,
          timestamp,
          timestamp,
          null,
          null,
          'en'
        );
        createdMembersCount++;
        console.log(`  ✓ Created team member: ${member.name} (ID: ${result.lastInsertRowid})`);
      }
    }
    console.log(`✅ Seeded ${createdMembersCount} team members\n`);

    // Seed Contact Messages
    console.log('📧 Seeding contact messages...');
    const insertMessage = db.prepare(`
      INSERT INTO contact_messages (
        name, email, subject, message, status,
        created_at, updated_at, published_at, created_by_id, updated_by_id, locale
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    let createdMessagesCount = 0;
    for (const message of seedData.contactMessages) {
      const result = insertMessage.run(
        message.name,
        message.email,
        message.subject,
        message.message,
        message.status,
        timestamp,
        timestamp,
        timestamp,
        null,
        null,
        'en'
      );
      createdMessagesCount++;
      console.log(`  ✓ Created contact message: ${message.subject} (ID: ${result.lastInsertRowid})`);
    }
    console.log(`✅ Seeded ${createdMessagesCount} contact messages\n`);

    // Seed Volunteer Applications
    console.log('🤝 Seeding volunteer applications...');
    const insertApplication = db.prepare(`
      INSERT INTO volunteer_applications (
        name, email, phone, team, experience, availability, motivation, status,
        created_at, updated_at, published_at, created_by_id, updated_by_id, locale
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const insertAppUserLink = db.prepare(`
      INSERT INTO volunteer_applications_user_lnk (volunteer_application_id, user_id, volunteer_application_ord)
      VALUES (?, ?, ?)
    `);

    let createdApplicationsCount = 0;
    for (const application of seedData.volunteerApplications) {
      const result = insertApplication.run(
        application.name,
        application.email,
        application.phone,
        application.team,
        application.experience,
        application.availability,
        application.motivation,
        application.status,
        timestamp,
        timestamp,
        timestamp,
        null,
        null,
        'en'
      );
      const appId = Number(result.lastInsertRowid);
      createdApplicationsCount++;

      // Link to volunteer user (last user)
      if (createdUsers[3]) {
        insertAppUserLink.run(appId, createdUsers[3], 1);
      }

      console.log(`  ✓ Created volunteer application: ${application.name} (ID: ${appId})`);
    }
    console.log(`✅ Seeded ${createdApplicationsCount} volunteer applications\n`);

    db.close();
    console.log('🎉 Database seeding completed successfully!\n');
    console.log('📊 Summary:');
    console.log(`   • Users: ${createdUsers.length}`);
    console.log(`   • Teams: ${createdTeams.length}`);
    console.log(`   • Team Members: ${createdMembersCount}`);
    console.log(`   • Contact Messages: ${createdMessagesCount}`);
    console.log(`   • Volunteer Applications: ${createdApplicationsCount}`);
    console.log('\n✅ You can now start Strapi with: npm run develop');

  } catch (error) {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();
