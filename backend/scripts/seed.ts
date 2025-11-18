import fs from 'fs';
import path from 'path';

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
  contests: Array<{
    name: string;
    description: string;
    start_date: string;
    end_date: string;
    is_active: boolean;
    registration_start: string;
    registration_end: string;
    max_teams: number;
    location: string;
  }>;
  scheduleEvents: Array<{
    title: string;
    description: string;
    start_time: string;
    end_time?: string;
    day: number;
    location: string;
    event_type: string;
    contestIndex: number;
  }>;
  contestRegistrations: Array<{
    contestIndex: number;
    teamIndex: number;
    registration_date: string;
    status: string;
  }>;
}

async function seedDatabase() {
  let strapi: any;

  try {
    console.log('🚀 Starting database seeding...\n');

    // Load Strapi instance
    console.log('📦 Loading Strapi...');
    const { createStrapi } = require('@strapi/strapi');
    const appDir = path.join(__dirname, '..');
    strapi = await createStrapi({ appDir, distDir: path.join(appDir, 'dist') }).load();
    console.log('✅ Strapi loaded successfully\n');

    // Load seed data
    const seedDataPath = path.join(__dirname, '..', 'data', 'seed-data.json');
    console.log(`📄 Loading seed data from: ${seedDataPath}`);
    const seedData: SeedData = JSON.parse(fs.readFileSync(seedDataPath, 'utf-8'));
    console.log('✅ Seed data loaded successfully\n');

    // Clear existing data
    console.log('🧹 Clearing existing data...');

    // Delete in correct order (respecting foreign key constraints)
    await strapi.db.query('api::contest-registration.contest-registration').deleteMany({});
    await strapi.db.query('api::schedule-event.schedule-event').deleteMany({});
    await strapi.db.query('api::team-member.team-member').deleteMany({});
    await strapi.db.query('api::team.team').deleteMany({});
    await strapi.db.query('api::contest.contest').deleteMany({});
    await strapi.db.query('api::contact-message.contact-message').deleteMany({});
    await strapi.db.query('api::volunteer-application.volunteer-application').deleteMany({});
    await strapi.db.query('plugin::users-permissions.user').deleteMany({
      where: {
        id: { $gt: 0 } // Delete all users except admin (id might be 1)
      }
    });

    console.log('✅ Existing data cleared\n');

    // Seed Users
    console.log('👥 Seeding users...');
    const createdUsers = [];
    for (const user of seedData.users) {
      try {
        const createdUser = await strapi.plugins['users-permissions'].services.user.add({
          username: user.username,
          email: user.email,
          password: user.password,
          confirmed: user.confirmed,
          blocked: user.blocked,
          provider: 'local',
        });
        createdUsers.push(createdUser);
        console.log(`  ✓ Created user: ${user.username}`);
      } catch (error: any) {
        console.error(`  ✗ Error creating user ${user.username}:`, error.message);
      }
    }
    console.log(`✅ Seeded ${createdUsers.length} users\n`);

    // Seed Teams
    console.log('🏆 Seeding teams...');
    const createdTeams = [];
    for (let i = 0; i < seedData.teams.length; i++) {
      const team = seedData.teams[i];
      try {
        const createdTeam = await strapi.db.query('api::team.team').create({
          data: {
            name: team.name,
            university: team.university,
            coach_name: team.coach_name,
            coach_email: team.coach_email,
            coach_phone: team.coach_phone,
            status: team.status,
            created_by_user: createdUsers[i] ? createdUsers[i].id : null,
          },
        });
        createdTeams.push(createdTeam);
        console.log(`  ✓ Created team: ${team.name}`);
      } catch (error: any) {
        console.error(`  ✗ Error creating team ${team.name}:`, error.message);
      }
    }
    console.log(`✅ Seeded ${createdTeams.length} teams\n`);

    // Seed Team Members
    console.log('👨‍💻 Seeding team members...');
    let createdMembersCount = 0;
    for (const member of seedData.teamMembers) {
      try {
        const team = createdTeams[member.teamIndex];
        if (team) {
          await strapi.db.query('api::team-member.team-member').create({
            data: {
              name: member.name,
              email: member.email,
              student_id: member.student_id,
              major: member.major,
              year: member.year,
              role: member.role,
              team: team.id,
            },
          });
          createdMembersCount++;
          console.log(`  ✓ Created team member: ${member.name} (${team.name})`);
        }
      } catch (error: any) {
        console.error(`  ✗ Error creating team member ${member.name}:`, error.message);
      }
    }
    console.log(`✅ Seeded ${createdMembersCount} team members\n`);

    // Seed Contact Messages
    console.log('📧 Seeding contact messages...');
    let createdMessagesCount = 0;
    for (const message of seedData.contactMessages) {
      try {
        await strapi.db.query('api::contact-message.contact-message').create({
          data: {
            name: message.name,
            email: message.email,
            subject: message.subject,
            message: message.message,
            status: message.status,
          },
        });
        createdMessagesCount++;
        console.log(`  ✓ Created contact message: ${message.subject}`);
      } catch (error: any) {
        console.error(`  ✗ Error creating contact message:`, error.message);
      }
    }
    console.log(`✅ Seeded ${createdMessagesCount} contact messages\n`);

    // Seed Volunteer Applications
    console.log('🤝 Seeding volunteer applications...');
    let createdApplicationsCount = 0;
    for (let i = 0; i < seedData.volunteerApplications.length; i++) {
      const application = seedData.volunteerApplications[i];
      try {
        await strapi.db.query('api::volunteer-application.volunteer-application').create({
          data: {
            name: application.name,
            email: application.email,
            phone: application.phone,
            team: application.team,
            experience: application.experience,
            availability: application.availability,
            motivation: application.motivation,
            status: application.status,
            user: createdUsers[3] ? createdUsers[3].id : null, // Link to volunteer_user
          },
        });
        createdApplicationsCount++;
        console.log(`  ✓ Created volunteer application: ${application.name} (${application.team})`);
      } catch (error: any) {
        console.error(`  ✗ Error creating volunteer application:`, error.message);
      }
    }
    console.log(`✅ Seeded ${createdApplicationsCount} volunteer applications\n`);

    // Seed Contests
    console.log('🏆 Seeding contests...');
    const createdContests = [];
    for (const contest of seedData.contests) {
      try {
        const createdContest = await strapi.db.query('api::contest.contest').create({
          data: {
            name: contest.name,
            description: contest.description,
            start_date: contest.start_date,
            end_date: contest.end_date,
            is_active: contest.is_active,
            registration_start: contest.registration_start,
            registration_end: contest.registration_end,
            max_teams: contest.max_teams,
            location: contest.location,
          },
        });
        createdContests.push(createdContest);
        console.log(`  ✓ Created contest: ${contest.name}`);
      } catch (error: any) {
        console.error(`  ✗ Error creating contest ${contest.name}:`, error.message);
      }
    }
    console.log(`✅ Seeded ${createdContests.length} contests\n`);

    // Seed Schedule Events
    console.log('📅 Seeding schedule events...');
    let createdEventsCount = 0;
    for (const event of seedData.scheduleEvents) {
      try {
        const contest = createdContests[event.contestIndex];
        if (contest) {
          await strapi.db.query('api::schedule-event.schedule-event').create({
            data: {
              title: event.title,
              description: event.description,
              start_time: event.start_time,
              end_time: event.end_time,
              day: event.day,
              location: event.location,
              event_type: event.event_type,
              contest: contest.id,
            },
          });
          createdEventsCount++;
          console.log(`  ✓ Created event: ${event.title} (Day ${event.day})`);
        }
      } catch (error: any) {
        console.error(`  ✗ Error creating event ${event.title}:`, error.message);
      }
    }
    console.log(`✅ Seeded ${createdEventsCount} schedule events\n`);

    // Seed Contest Registrations
    console.log('📝 Seeding contest registrations...');
    let createdRegistrationsCount = 0;
    for (const registration of seedData.contestRegistrations) {
      try {
        const contest = createdContests[registration.contestIndex];
        const team = createdTeams[registration.teamIndex];
        if (contest && team) {
          await strapi.db.query('api::contest-registration.contest-registration').create({
            data: {
              contest: contest.id,
              team: team.id,
              registration_date: registration.registration_date,
              status: registration.status,
            },
          });
          createdRegistrationsCount++;
          console.log(`  ✓ Created registration: ${team.name} for ${contest.name}`);
        }
      } catch (error: any) {
        console.error(`  ✗ Error creating registration:`, error.message);
      }
    }
    console.log(`✅ Seeded ${createdRegistrationsCount} contest registrations\n`);

    console.log('🎉 Database seeding completed successfully!\n');
    console.log('📊 Summary:');
    console.log(`   • Users: ${createdUsers.length}`);
    console.log(`   • Teams: ${createdTeams.length}`);
    console.log(`   • Team Members: ${createdMembersCount}`);
    console.log(`   • Contact Messages: ${createdMessagesCount}`);
    console.log(`   • Volunteer Applications: ${createdApplicationsCount}`);
    console.log(`   • Contests: ${createdContests.length}`);
    console.log(`   • Schedule Events: ${createdEventsCount}`);
    console.log(`   • Contest Registrations: ${createdRegistrationsCount}`);

  } catch (error) {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  } finally {
    // Close database connection
    if (strapi) {
      console.log('\n🔌 Closing Strapi connection...');
      await strapi.destroy();
      console.log('✅ Connection closed');
    }
    process.exit(0);
  }
}

// Run the seed function
seedDatabase();
