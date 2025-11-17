const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export interface User {
  id: string;
  email: string;
  full_name: string | null;
  created_at: string;
}

export interface AuthResponse {
  user: User;
  token: string;
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
    const data = await this.request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, fullName }),
    });

    this.setToken(data.token);
    return data;
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const data = await this.request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    this.setToken(data.token);
    return data;
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const data = await this.request<{ user: User }>('/auth/me');
      return data.user;
    } catch (error) {
      this.removeToken();
      return null;
    }
  }

  async logout(): Promise<void> {
    try {
      await this.request('/auth/logout', {
        method: 'POST',
      });
    } catch (error) {
      // Ignore logout errors
    } finally {
      this.removeToken();
    }
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  // Contact Methods
  async submitContactMessage(data: ContactMessageData): Promise<{ message: string; id: string }> {
    return this.request('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Volunteer Methods
  async submitVolunteerApplication(data: VolunteerApplicationData): Promise<any> {
    return this.request('/volunteers', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getMyVolunteerApplications(): Promise<any> {
    return this.request('/volunteers/my-applications');
  }

  // Team Methods
  async createTeam(data: TeamData): Promise<any> {
    return this.request('/teams', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getMyTeams(): Promise<any> {
    return this.request('/teams/my-teams');
  }

  async getTeamById(id: string): Promise<any> {
    return this.request(`/teams/${id}`);
  }

  async getAllTeams(includeMembers: boolean = false): Promise<any> {
    return this.request(`/teams?includeMembers=${includeMembers}`);
  }

  async addTeamMember(teamId: string, member: TeamMemberData): Promise<any> {
    return this.request(`/teams/${teamId}/members`, {
      method: 'POST',
      body: JSON.stringify(member),
    });
  }

  async removeTeamMember(teamId: string, memberId: string): Promise<any> {
    return this.request(`/teams/${teamId}/members/${memberId}`, {
      method: 'DELETE',
    });
  }
}

export const api = new APIClient();
