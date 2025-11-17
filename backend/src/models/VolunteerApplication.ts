import db from '../db';
import { randomUUID } from 'crypto';

export interface VolunteerApplication {
  id: string;
  user_id: string | null;
  name: string;
  email: string;
  phone: string;
  team: 'media' | 'logistics' | 'ops' | 'volunteers';
  experience: string;
  availability: string;
  motivation: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

export const VolunteerApplicationModel = {
  create(
    userId: string | null,
    name: string,
    email: string,
    phone: string,
    team: 'media' | 'logistics' | 'ops' | 'volunteers',
    experience: string,
    availability: string,
    motivation: string
  ): VolunteerApplication {
    const id = randomUUID();

    const stmt = db.prepare(`
      INSERT INTO volunteer_applications
      (id, user_id, name, email, phone, team, experience, availability, motivation, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
    `);

    stmt.run(id, userId, name, email, phone, team, experience, availability, motivation);

    return this.findById(id)!;
  },

  findById(id: string): VolunteerApplication | undefined {
    const stmt = db.prepare('SELECT * FROM volunteer_applications WHERE id = ?');
    return stmt.get(id) as VolunteerApplication | undefined;
  },

  findByUserId(userId: string): VolunteerApplication[] {
    const stmt = db.prepare('SELECT * FROM volunteer_applications WHERE user_id = ? ORDER BY created_at DESC');
    return stmt.all(userId) as VolunteerApplication[];
  },

  findByEmail(email: string): VolunteerApplication[] {
    const stmt = db.prepare('SELECT * FROM volunteer_applications WHERE email = ? ORDER BY created_at DESC');
    return stmt.all(email) as VolunteerApplication[];
  },

  findAll(limit: number = 50, offset: number = 0): VolunteerApplication[] {
    const stmt = db.prepare(`
      SELECT * FROM volunteer_applications
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `);
    return stmt.all(limit, offset) as VolunteerApplication[];
  },

  findByTeam(team: string, limit: number = 50): VolunteerApplication[] {
    const stmt = db.prepare(`
      SELECT * FROM volunteer_applications
      WHERE team = ?
      ORDER BY created_at DESC
      LIMIT ?
    `);
    return stmt.all(team, limit) as VolunteerApplication[];
  },

  updateStatus(id: string, status: 'pending' | 'approved' | 'rejected'): boolean {
    const stmt = db.prepare('UPDATE volunteer_applications SET status = ? WHERE id = ?');
    const result = stmt.run(status, id);
    return result.changes > 0;
  },
};
