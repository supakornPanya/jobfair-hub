
import { Company, InterviewSession, User } from "@/types";

/**
 * Mock Data File
 * 
 * This file contains mock data for various components.
 * These can be used for development, testing, or as placeholders.
 */

// Mock Companies
export const mockCompanies: Company[] = [
  {
    id: "company-1",
    name: "Tech Solutions Inc.",
    description: "A leading technology company specializing in software development, cloud services, and digital transformation. We help businesses leverage cutting-edge technology to streamline operations and enhance customer experiences.",
    address: "123 Tech Parkway, San Francisco, CA 94105",
    website: "https://techsolutions.example.com",
    telephone: "555-123-4567"
  },
  {
    id: "company-2",
    name: "Green Earth Innovations",
    description: "Sustainable technology company focused on environmental solutions. We develop eco-friendly products and services to help businesses reduce their carbon footprint and promote sustainability.",
    address: "789 Eco Avenue, Portland, OR 97201",
    website: "https://greenearth.example.com",
    telephone: "555-987-6543"
  },
  {
    id: "company-3",
    name: "Global Finance Group",
    description: "Financial services company providing banking, investment, and advisory services to individuals and businesses worldwide. Our expert team helps clients achieve their financial goals with personalized strategies.",
    address: "456 Wall Street, New York, NY 10005",
    website: "https://globalfinance.example.com",
    telephone: "555-456-7890"
  },
  {
    id: "company-4",
    name: "Health Innovations",
    description: "Healthcare technology company dedicated to improving patient care through innovative digital solutions. We develop software and devices that enhance medical diagnostics, treatment, and patient monitoring.",
    address: "321 Medical Drive, Boston, MA 02115",
    website: "https://healthinnovations.example.com",
    telephone: "555-234-5678"
  },
  {
    id: "company-5",
    name: "Creative Media Studios",
    description: "Award-winning media production company specializing in digital content, advertising, and brand storytelling. Our creative team produces compelling visual and interactive experiences for global brands.",
    address: "567 Art Boulevard, Los Angeles, CA 90028",
    website: "https://creativemedia.example.com",
    telephone: "555-876-5432"
  }
];

// Mock User
export const mockUser: User = {
  id: "user-1",
  name: "John Doe",
  email: "john.doe@example.com",
  telephone: "555-111-2222",
  isAdmin: false
};

// Mock Admin User
export const mockAdminUser: User = {
  id: "admin-1",
  name: "Admin User",
  email: "admin@example.com",
  telephone: "555-999-8888",
  isAdmin: true
};

// Mock Interview Sessions/Bookings
export const mockBookings: InterviewSession[] = [
  {
    id: "booking-1",
    userId: "user-1",
    companyId: "company-1",
    company: mockCompanies[0],
    date: "2022-05-10T10:00:00Z",
    createdAt: "2022-04-15T08:30:00Z",
    updatedAt: "2022-04-15T08:30:00Z"
  },
  {
    id: "booking-2",
    userId: "user-1",
    companyId: "company-3",
    company: mockCompanies[2],
    date: "2022-05-11T14:30:00Z",
    createdAt: "2022-04-16T09:45:00Z",
    updatedAt: "2022-04-16T09:45:00Z"
  },
  {
    id: "booking-3",
    userId: "user-1",
    companyId: "company-5",
    company: mockCompanies[4],
    date: "2022-05-12T11:15:00Z",
    createdAt: "2022-04-17T11:20:00Z",
    updatedAt: "2022-04-17T11:20:00Z"
  }
];
