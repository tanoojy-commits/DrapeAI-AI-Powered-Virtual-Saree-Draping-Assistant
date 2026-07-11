import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AuthContext, type AuthContextValue } from "@/context/auth-context";
import { AUTH_TOKEN_STORAGE_KEY } from "@/services/apiClient";
import { getCurrentUser, loginUser, registerUser } from "@/services/authService";
import type { AuthUser, LoginPayload, RegisterPayload } from "@/types/auth";

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const logout = useCallback(() => {
    window.localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
    setUser(null);
  }, []);

  const reloadUser = useCallback(async () => {
    const token = window.localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch {
      logout();
    } finally {
      setIsLoading(false);
    }
  }, [logout]);

  useEffect(() => {
    void reloadUser();
  }, [reloadUser]);

  async function login(payload: LoginPayload) {
    const response = await loginUser(payload);
    window.localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, response.access_token);
    setUser(response.user);
  }

  async function register(payload: RegisterPayload) {
    await registerUser(payload);
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      login,
      register,
      logout,
      reloadUser,
    }),
    [isLoading, logout, reloadUser, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
