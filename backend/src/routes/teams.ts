import { Router, Response } from 'express';
import { TeamModel } from '../models/Team';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();

// Create a new team (authenticated)
router.post('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const { name, university, coachName, coachEmail, coachPhone, members } = req.body;

    // Validation
    if (!name || !university || !coachName || !coachEmail || !coachPhone) {
      return res.status(400).json({ error: 'All team information fields are required' });
    }

    if (!members || !Array.isArray(members) || members.length < 1 || members.length > 3) {
      return res.status(400).json({ error: 'Team must have 1-3 members' });
    }

    // Validate each member
    for (const member of members) {
      if (!member.name || !member.email || !member.studentId || !member.year || !member.major) {
        return res.status(400).json({ error: 'All member information is required' });
      }
    }

    // Create team
    const team = TeamModel.create(
      name,
      university,
      coachName,
      coachEmail,
      coachPhone,
      req.user.id
    );

    // Add members
    const teamMembers = members.map((member: any, index: number) =>
      TeamModel.addMember(
        team.id,
        member.name,
        member.email,
        member.studentId,
        member.year,
        member.major,
        index === 0 ? 'captain' : 'member'
      )
    );

    res.status(201).json({
      message: 'Team created successfully',
      team: {
        ...team,
        members: teamMembers,
      },
    });
  } catch (error) {
    console.error('Team creation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user's teams (authenticated)
router.get('/my-teams', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const teams = TeamModel.findByUserId(req.user.id);

    // Get members for each team
    const teamsWithMembers = teams.map((team) => ({
      ...team,
      members: TeamModel.findMembersByTeamId(team.id),
    }));

    res.json({ teams: teamsWithMembers });
  } catch (error) {
    console.error('Get user teams error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get team by ID (authenticated)
router.get('/:id', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const team = TeamModel.findById(id);

    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    const members = TeamModel.findMembersByTeamId(id);

    res.json({
      team: {
        ...team,
        members,
      },
    });
  } catch (error) {
    console.error('Get team error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all teams (admin/public)
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 50;
    const offset = parseInt(req.query.offset as string) || 0;

    const teams = TeamModel.findAll(limit, offset);

    // Optionally include members
    const includeMembers = req.query.includeMembers === 'true';

    const teamsData = includeMembers
      ? teams.map((team) => ({
          ...team,
          members: TeamModel.findMembersByTeamId(team.id),
        }))
      : teams;

    res.json({ teams: teamsData });
  } catch (error) {
    console.error('Get teams error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update team status (admin only)
router.patch('/:id/status', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const updated = TeamModel.updateStatus(id, status);

    if (!updated) {
      return res.status(404).json({ error: 'Team not found' });
    }

    res.json({ message: 'Team status updated successfully' });
  } catch (error) {
    console.error('Update team status error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add member to team (team creator only - to be enhanced with proper authorization)
router.post('/:teamId/members', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const { teamId } = req.params;
    const { name, email, studentId, year, major, role } = req.body;

    // Validation
    if (!name || !email || !studentId || !year || !major) {
      return res.status(400).json({ error: 'All member information is required' });
    }

    // Check if team exists and user owns it
    const team = TeamModel.findById(teamId);
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    if (team.created_by !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to add members to this team' });
    }

    // Check team member count
    const currentMembers = TeamModel.findMembersByTeamId(teamId);
    if (currentMembers.length >= 3) {
      return res.status(400).json({ error: 'Team already has maximum 3 members' });
    }

    const member = TeamModel.addMember(teamId, name, email, studentId, year, major, role);

    res.status(201).json({
      message: 'Member added successfully',
      member,
    });
  } catch (error) {
    console.error('Add member error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete member from team (team creator only)
router.delete('/:teamId/members/:memberId', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const { teamId, memberId } = req.params;

    // Check if team exists and user owns it
    const team = TeamModel.findById(teamId);
    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    if (team.created_by !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to remove members from this team' });
    }

    const deleted = TeamModel.deleteMember(memberId);

    if (!deleted) {
      return res.status(404).json({ error: 'Member not found' });
    }

    res.json({ message: 'Member removed successfully' });
  } catch (error) {
    console.error('Delete member error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
