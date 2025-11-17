import { Router, Response } from 'express';
import { VolunteerApplicationModel } from '../models/VolunteerApplication';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();

// Submit volunteer application
router.post('/', async (req: AuthRequest, res: Response) => {
  try {
    const { name, email, phone, team, experience, availability, motivation } = req.body;

    // Validation
    if (!name || !email || !phone || !team || !experience || !availability || !motivation) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (!['media', 'logistics', 'ops', 'volunteers'].includes(team)) {
      return res.status(400).json({ error: 'Invalid team selection' });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Check if user is authenticated (optional)
    const userId = req.user ? req.user.id : null;

    const application = VolunteerApplicationModel.create(
      userId,
      name,
      email,
      phone,
      team,
      experience,
      availability,
      motivation
    );

    res.status(201).json({
      message: 'Volunteer application submitted successfully',
      application: {
        id: application.id,
        team: application.team,
        status: application.status,
      },
    });
  } catch (error) {
    console.error('Volunteer application error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user's volunteer applications (authenticated)
router.get('/my-applications', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const applications = VolunteerApplicationModel.findByUserId(req.user.id);

    res.json({ applications });
  } catch (error) {
    console.error('Get user applications error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all volunteer applications (admin only)
router.get('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 50;
    const offset = parseInt(req.query.offset as string) || 0;
    const team = req.query.team as string;

    let applications;
    if (team) {
      applications = VolunteerApplicationModel.findByTeam(team, limit);
    } else {
      applications = VolunteerApplicationModel.findAll(limit, offset);
    }

    res.json({ applications });
  } catch (error) {
    console.error('Get volunteer applications error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update application status (admin only)
router.patch('/:id/status', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const updated = VolunteerApplicationModel.updateStatus(id, status);

    if (!updated) {
      return res.status(404).json({ error: 'Application not found' });
    }

    res.json({ message: 'Status updated successfully' });
  } catch (error) {
    console.error('Update application status error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
