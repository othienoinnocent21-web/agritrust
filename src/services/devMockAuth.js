/**
 * DEVELOPMENT-ONLY MOCK AUTHENTICATION
 *
 * This module provides temporary test authentication for UI development.
 * It is NOT used in production builds — all call sites are gated by
 * `import.meta.env.DEV` which is `false` when running `vite build`.
 *
 * To remove: delete this file and remove `devLogin` references from
 *   src/context/AuthContext.jsx and src/pages/auth/Login.jsx
 */

import { ROLES } from "../constants";

const DEV_STORAGE_KEY = "agritrust_dev_auth";

const DEV_ACCOUNTS = [
  {
    id: "dev_farmer_1",
    email: "farmer@test.com",
    password: "Farmer123",
    name: "Test Farmer",
    role: ROLES.FARMER,
  },
  {
    id: "dev_buyer_1",
    email: "buyer@test.com",
    password: "Buyer123",
    name: "Test Buyer",
    role: ROLES.BUYER,
  },
  {
    id: "dev_admin_1",
    email: "admin@test.com",
    password: "Admin123",
    name: "Test Admin",
    role: ROLES.ADMIN,
  },
];

export const devLogin = (email, password) => {
  const account = DEV_ACCOUNTS.find(
    (a) => a.email === email && a.password === password
  );

  if (!account) {
    throw new Error("Invalid credentials");
  }

  const token = `dev_mock_token_${account.role.toLowerCase()}_${account.id}`;
  const user = {
    id: account.id,
    email: account.email,
    name: account.name,
    role: account.role,
    avatar: null,
  };

  const stored = { token, user };
  localStorage.setItem(DEV_STORAGE_KEY, JSON.stringify(stored));

  return { token, user };
};

export const getStoredDevAuth = () => {
  if (!import.meta.env.DEV) return null;
  try {
    const stored = localStorage.getItem(DEV_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

export const clearDevAuth = () => {
  localStorage.removeItem(DEV_STORAGE_KEY);
};

export { DEV_ACCOUNTS };
export default { devLogin, getStoredDevAuth, clearDevAuth, DEV_ACCOUNTS };
