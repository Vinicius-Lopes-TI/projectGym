import { User } from "@/@types/user";
import { createSafeContext } from "@/utils/createSafeContext";

export interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  errorMessage: string | null;
  user: User | null;
  login: (credentials: { username: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
}

export const [AuthProvider, useAuthContext] =
  createSafeContext<AuthContextType>(
    "useAuthContext must be used within AuthProvider",
  );
