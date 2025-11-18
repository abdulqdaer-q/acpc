import fs from 'fs';
import path from 'path';
import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';

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
  guide: {
    title: string;
    content: any;
  };
}

function hashPassword(password: string): string {
  // Use bcrypt to match Strapi's password hashing
  return bcrypt.hashSync(password, 10);
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
    if (tableNames.includes('team_members_team_lnk')) db.exec('DELETE FROM team_members_team_lnk');
    if (tableNames.includes('team_members')) db.exec('DELETE FROM team_members');
    if (tableNames.includes('teams_created_by_user_lnk')) db.exec('DELETE FROM teams_created_by_user_lnk');
    if (tableNames.includes('teams')) db.exec('DELETE FROM teams');
    if (tableNames.includes('contact_messages')) db.exec('DELETE FROM contact_messages');
    if (tableNames.includes('volunteer_applications_user_lnk')) db.exec('DELETE FROM volunteer_applications_user_lnk');
    if (tableNames.includes('volunteer_applications')) db.exec('DELETE FROM volunteer_applications');
    if (tableNames.includes('up_users_role_lnk')) db.exec('DELETE FROM up_users_role_lnk');
    if (tableNames.includes('up_users')) db.exec('DELETE FROM up_users');
    if (tableNames.includes('guides')) db.exec('DELETE FROM guides');
    console.log('✅ Existing data cleared\n');

    // Seed Users
    console.log('👥 Seeding users...');
    const insertUser = db.prepare(`
      INSERT INTO up_users (
        username, email, provider, password, confirmed, blocked,
        created_at, updated_at, published_at, created_by_id, updated_by_id, locale
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const insertUserRole = db.prepare(`
      INSERT INTO up_users_role_lnk (user_id, role_id)
      VALUES (?, ?)
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
      const userId = Number(result.lastInsertRowid);
      createdUsers.push(userId);

      // Link user to "Authenticated" role (id: 1)
      insertUserRole.run(userId, 1);

      console.log(`  ✓ Created user: ${user.username} (ID: ${userId})`);
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
      INSERT INTO teams_created_by_user_lnk (team_id, user_id)
      VALUES (?, ?)
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
        insertTeamUserLink.run(teamId, createdUsers[i]);
      }

      console.log(`  ✓ Created team: ${team.name} (ID: ${teamId})`);
    }
    console.log(`✅ Seeded ${createdTeams.length} teams\n`);

    // Seed Team Members
    console.log('👨‍💻 Seeding team members...');
    const insertMember = db.prepare(`
      INSERT INTO team_members (
        name, email, student_id, major, year, role,
        created_at, updated_at, published_at, created_by_id, updated_by_id, locale
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const insertMemberTeamLink = db.prepare(`
      INSERT INTO team_members_team_lnk (team_member_id, team_id, team_member_ord)
      VALUES (?, ?, ?)
    `);

    let createdMembersCount = 0;
    for (let i = 0; i < seedData.teamMembers.length; i++) {
      const member = seedData.teamMembers[i];
      const teamId = createdTeams[member.teamIndex];
      if (teamId) {
        const result = insertMember.run(
          member.name,
          member.email,
          member.student_id,
          member.major,
          member.year,
          member.role,
          timestamp,
          timestamp,
          timestamp,
          null,
          null,
          'en'
        );
        const memberId = Number(result.lastInsertRowid);

        // Link team member to team
        insertMemberTeamLink.run(memberId, teamId, i + 1);

        createdMembersCount++;
        console.log(`  ✓ Created team member: ${member.name} (ID: ${memberId})`);
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
      INSERT INTO volunteer_applications_user_lnk (volunteer_application_id, user_id)
      VALUES (?, ?)
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
        insertAppUserLink.run(appId, createdUsers[3]);
      }

      console.log(`  ✓ Created volunteer application: ${application.name} (ID: ${appId})`);
    }
    console.log(`✅ Seeded ${createdApplicationsCount} volunteer applications\n`);

    // Seed Guide (singleType)
    console.log('📚 Seeding guide...');
    const insertGuide = db.prepare(`
      INSERT INTO guides (
        title, content,
        created_at, updated_at, published_at, created_by_id, updated_by_id, locale
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const guideResult = insertGuide.run(
      seedData.guide.title,
      JSON.stringify(seedData.guide.content),
      timestamp,
      timestamp,
      timestamp,
      null,
      null,
      'en'
    );
    console.log(`  ✓ Created guide: ${seedData.guide.title} (ID: ${guideResult.lastInsertRowid})`);
    console.log(`✅ Seeded guide\n`);

    db.close();
    console.log('🎉 Database seeding completed successfully!\n');
    console.log('📊 Summary:');
    console.log(`   • Users: ${createdUsers.length}`);
    console.log(`   • Teams: ${createdTeams.length}`);
    console.log(`   • Team Members: ${createdMembersCount}`);
    console.log(`   • Contact Messages: ${createdMessagesCount}`);
    console.log(`   • Volunteer Applications: ${createdApplicationsCount}`);
    console.log(`   • Guide: 1`);
    console.log('\n✅ You can now start Strapi with: npm run develop');

  } catch (error) {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();
