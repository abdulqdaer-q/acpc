const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface User {
  id: number;
  username: string;
  email: string;
  provider?: string;
  confirmed?: boolean;
  blocked?: boolean;
}

export interface AuthResponse {
  jwt: string;
  user: User;
}

export interface ErrorResponse {
  error: string;
}

export interface ContactMessageData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface VolunteerApplicationData {
  name: string;
  email: string;
  phone: string;
  team: 'media' | 'logistics' | 'ops' | 'volunteers';
  experience: string;
  availability: string;
  motivation: string;
}

export interface TeamMemberData {
  name: string;
  email: string;
  studentId: string;
  year: number;
  major: string;
}

export interface TeamData {
  name: string;
  university: string;
  coachName: string;
  coachEmail: string;
  coachPhone: string;
  members: TeamMemberData[];
}

class APIClient {
  private getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  private setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token);
    }
  }

  private removeToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = this.getToken();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'An error occurred');
    }

    return data;
  }

  async register(
    email: string,
    password: string,
    fullName?: string
  ): Promise<AuthResponse> {
    const data = await this.request<AuthResponse>('/api/auth/local/register', {
      method: 'POST',
      body: JSON.stringify({
        username: email.split('@')[0],
        email,
        password
      }),
    });

    this.setToken(data.jwt);
    return data;
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const data = await this.request<AuthResponse>('/api/auth/local', {
      method: 'POST',
      body: JSON.stringify({ identifier: email, password }),
    });

    this.setToken(data.jwt);
    return data;
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const data = await this.request<User>('/api/users/me');
      return data;
    } catch (error) {
      this.removeToken();
      return null;
    }
  }

  async logout(): Promise<void> {
    this.removeToken();
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  // Contact Methods
  async submitContactMessage(data: ContactMessageData): Promise<{ data: any }> {
    return this.request('/api/contact-messages', {
      method: 'POST',
      body: JSON.stringify({ data }),
    });
  }

  // Volunteer Methods
  async submitVolunteerApplication(data: VolunteerApplicationData): Promise<any> {
    return this.request('/api/volunteer-applications', {
      method: 'POST',
      body: JSON.stringify({ data }),
    });
  }

  async getMyVolunteerApplications(): Promise<any> {
    const user = await this.getCurrentUser();
    if (!user) return { data: [] };

    return this.request(`/api/volunteer-applications?filters[user][id][$eq]=${user.id}&populate=*`);
  }

  // Team Methods
  async createTeam(data: TeamData): Promise<any> {
    const user = await this.getCurrentUser();

    // First create the team
    const teamPayload = {
      data: {
        name: data.name,
        university: data.university,
        coach_name: data.coachName,
        coach_email: data.coachEmail,
        coach_phone: data.coachPhone,
        created_by_user: user?.id,
        status: 'pending'
      }
    };

    const teamResponse = await this.request<{ data: any }>('/api/teams', {
      method: 'POST',
      body: JSON.stringify(teamPayload),
    });

    // Then create team members
    const teamId = teamResponse.data.id;
    for (const member of data.members) {
      await this.request('/api/team-members', {
        method: 'POST',
        body: JSON.stringify({
          data: {
            name: member.name,
            email: member.email,
            student_id: member.studentId,
            year: member.year,
            major: member.major,
            role: 'member',
            team: teamId
          }
        }),
      });
    }

    return teamResponse;
  }

  async getMyTeams(): Promise<any> {
    const user = await this.getCurrentUser();
    if (!user) return { data: [] };

    return this.request(`/api/teams?filters[created_by_user][id][$eq]=${user.id}&populate=*`);
  }

  async getTeamById(id: string): Promise<any> {
    return this.request(`/api/teams/${id}?populate=*`);
  }

  async getAllTeams(includeMembers: boolean = false): Promise<any> {
    const populate = includeMembers ? '?populate=*' : '';
    return this.request(`/api/teams${populate}`);
  }

  async addTeamMember(teamId: string, member: TeamMemberData): Promise<any> {
    return this.request('/api/team-members', {
      method: 'POST',
      body: JSON.stringify({
        data: {
          name: member.name,
          email: member.email,
          student_id: member.studentId,
          year: member.year,
          major: member.major,
          role: 'member',
          team: teamId
        }
      }),
    });
  }

  async removeTeamMember(teamId: string, memberId: string): Promise<any> {
    return this.request(`/api/team-members/${memberId}`, {
      method: 'DELETE',
    });
  }
}

export const api = new APIClient();
