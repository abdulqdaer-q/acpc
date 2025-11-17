import db from '../db';
import { randomUUID } from 'crypto';

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  created_at: string;
}

export const ContactMessageModel = {
  create(name: string, email: string, subject: string, message: string): ContactMessage {
    const id = randomUUID();

    const stmt = db.prepare(`
      INSERT INTO contact_messages (id, name, email, subject, message, status)
      VALUES (?, ?, ?, ?, ?, 'new')
    `);

    stmt.run(id, name, email, subject, message);

    return this.findById(id)!;
  },

  findById(id: string): ContactMessage | undefined {
    const stmt = db.prepare('SELECT * FROM contact_messages WHERE id = ?');
    return stmt.get(id) as ContactMessage | undefined;
  },

  findAll(limit: number = 50, offset: number = 0): ContactMessage[] {
    const stmt = db.prepare(`
      SELECT * FROM contact_messages
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `);
    return stmt.all(limit, offset) as ContactMessage[];
  },

  updateStatus(id: string, status: 'new' | 'read' | 'replied'): boolean {
    const stmt = db.prepare('UPDATE contact_messages SET status = ? WHERE id = ?');
    const result = stmt.run(status, id);
    return result.changes > 0;
  },
};
