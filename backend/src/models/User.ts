import db from '../db';
import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';

export interface User {
  id: string;
  email: string;
  password: string;
  full_name: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserPublic {
  id: string;
  email: string;
  full_name: string | null;
  created_at: string;
}

export const UserModel = {
  async create(email: string, password: string, fullName?: string): Promise<User> {
    const id = randomUUID();
    const hashedPassword = await bcrypt.hash(password, 10);

    const stmt = db.prepare(`
      INSERT INTO users (id, email, password, full_name)
      VALUES (?, ?, ?, ?)
    `);

    stmt.run(id, email, hashedPassword, fullName || null);

    return this.findById(id)!;
  },

  findById(id: string): User | undefined {
    const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
    return stmt.get(id) as User | undefined;
  },

  findByEmail(email: string): User | undefined {
    const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
    return stmt.get(email) as User | undefined;
  },

  async verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  },

  toPublic(user: User): UserPublic {
    return {
      id: user.id,
      email: user.email,
      full_name: user.full_name,
      created_at: user.created_at,
    };
  },
};
