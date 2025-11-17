import db from '../db';
import { randomUUID } from 'crypto';

export interface Team {
  id: string;
  name: string;
  university: string;
  coach_name: string;
  coach_email: string;
  coach_phone: string;
  created_by: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
}

export interface TeamMember {
  id: string;
  team_id: string;
  name: string;
  email: string;
  student_id: string;
  year: number;
  major: string;
  role: 'member' | 'captain';
  created_at: string;
}

export const TeamModel = {
  create(
    name: string,
    university: string,
    coachName: string,
    coachEmail: string,
    coachPhone: string,
    createdBy: string
  ): Team {
    const id = randomUUID();

    const stmt = db.prepare(`
      INSERT INTO teams
      (id, name, university, coach_name, coach_email, coach_phone, created_by, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')
    `);

    stmt.run(id, name, university, coachName, coachEmail, coachPhone, createdBy);

    return this.findById(id)!;
  },

  findById(id: string): Team | undefined {
    const stmt = db.prepare('SELECT * FROM teams WHERE id = ?');
    return stmt.get(id) as Team | undefined;
  },

  findByUserId(userId: string): Team[] {
    const stmt = db.prepare('SELECT * FROM teams WHERE created_by = ? ORDER BY created_at DESC');
    return stmt.all(userId) as Team[];
  },

  findAll(limit: number = 50, offset: number = 0): Team[] {
    const stmt = db.prepare(`
      SELECT * FROM teams
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `);
    return stmt.all(limit, offset) as Team[];
  },

  updateStatus(id: string, status: 'pending' | 'approved' | 'rejected'): boolean {
    const stmt = db.prepare('UPDATE teams SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?');
    const result = stmt.run(status, id);
    return result.changes > 0;
  },

  addMember(
    teamId: string,
    name: string,
    email: string,
    studentId: string,
    year: number,
    major: string,
    role: 'member' | 'captain' = 'member'
  ): TeamMember {
    const id = randomUUID();

    const stmt = db.prepare(`
      INSERT INTO team_members
      (id, team_id, name, email, student_id, year, major, role)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(id, teamId, name, email, studentId, year, major, role);

    return this.findMemberById(id)!;
  },

  findMemberById(id: string): TeamMember | undefined {
    const stmt = db.prepare('SELECT * FROM team_members WHERE id = ?');
    return stmt.get(id) as TeamMember | undefined;
  },

  findMembersByTeamId(teamId: string): TeamMember[] {
    const stmt = db.prepare('SELECT * FROM team_members WHERE team_id = ? ORDER BY created_at ASC');
    return stmt.all(teamId) as TeamMember[];
  },

  deleteMember(id: string): boolean {
    const stmt = db.prepare('DELETE FROM team_members WHERE id = ?');
    const result = stmt.run(id);
    return result.changes > 0;
  },
};
