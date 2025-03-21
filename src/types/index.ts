
export interface User {
  id: string;
  name: string;
  email: string;
  telephone: string;
  isAdmin: boolean;
}

export interface Company {
  id: string;
  name: string;
  address: string;
  website: string;
  description: string;
  telephone: string;
}

export interface InterviewSession {
  id: string;
  userId: string;
  companyId: string;
  company: Company;
  date: string; // ISO date string format
  createdAt: string;
  updatedAt: string;
}

export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
};

export type BookingState = {
  bookings: InterviewSession[];
  isLoading: boolean;
  error: string | null;
};
