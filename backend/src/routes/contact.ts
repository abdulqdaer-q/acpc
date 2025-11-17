import { Router, Request, Response } from 'express';
import { ContactMessageModel } from '../models/ContactMessage';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();

// Submit contact form (public)
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    const contactMessage = ContactMessageModel.create(name, email, subject, message);

    res.status(201).json({
      message: 'Contact message submitted successfully',
      id: contactMessage.id,
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all contact messages (admin only - for now, requires authentication)
router.get('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 50;
    const offset = parseInt(req.query.offset as string) || 0;

    const messages = ContactMessageModel.findAll(limit, offset);

    res.json({ messages });
  } catch (error) {
    console.error('Get contact messages error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update message status (admin only)
router.patch('/:id/status', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['new', 'read', 'replied'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const updated = ContactMessageModel.updateStatus(id, status);

    if (!updated) {
      return res.status(404).json({ error: 'Message not found' });
    }

    res.json({ message: 'Status updated successfully' });
  } catch (error) {
    console.error('Update message status error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
