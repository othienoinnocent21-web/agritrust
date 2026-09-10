import { ROLES } from "../../constants/roles";

export const mockUsers = [
  {
    id: 1,
    email: "farmer@example.com",
    name: "John Farmer",
    role: ROLES.FARMER,
    avatar: "https://placehold.co/40x40/166534/FFFFFF?text=JF",
    location: "Iowa, USA",
    rating: 4.5,
    reviewCount: 120,
    isVerified: true,
    createdAt: "2024-01-15T08:00:00Z",
  },
  {
    id: 2,
    email: "buyer@example.com",
    name: "Jane Buyer",
    role: ROLES.BUYER,
    avatar: "https://placehold.co/40x40/166534/FFFFFF?text=JB",
    location: "California, USA",
    rating: 4.8,
    reviewCount: 85,
    isVerified: true,
    createdAt: "2024-02-20T08:00:00Z",
  },
  {
    id: 3,
    email: "admin@example.com",
    name: "Admin User",
    role: ROLES.ADMIN,
    avatar: "https://placehold.co/40x40/166534/FFFFFF?text=AU",
    location: "New York, USA",
    rating: 5,
    reviewCount: 0,
    isVerified: true,
    createdAt: "2023-12-01T08:00:00Z",
  },
];

export const mockUser = mockUsers[0];
