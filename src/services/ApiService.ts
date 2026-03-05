const API_BASE_URL = 'https://api.joueretgagner.com';

class ApiService {
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
  }

  private async request<T>(
    endpoint: string,
    options?: RequestInit,
  ): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: { ...headers, ...(options?.headers as Record<string, string>) },
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(
        (error as { message?: string }).message || 'Erreur réseau',
      );
    }
    return response.json() as Promise<T>;
  }

  get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  post<T>(endpoint: string, body: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }
}

export const apiService = new ApiService();
