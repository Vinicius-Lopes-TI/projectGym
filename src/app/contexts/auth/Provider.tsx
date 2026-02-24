// Import Dependencies
import { useEffect, useReducer, ReactNode } from "react";

// Local Imports
import type { LoginResponse } from "@/@types/auth";
import type { User } from "@/@types/user";
import axios from "@/utils/axios";
import { isTokenValid, setSession } from "@/utils/jwt";
import { AuthProvider as AuthContext, AuthContextType } from "./context";

function toBasicAuth(username: string, password: string): string {
  const encoded = btoa(
    unescape(encodeURIComponent(`${username}:${password}`)),
  );
  return `Basic ${encoded}`;
}

function mapLoginResponseToUser(data: LoginResponse): User {
  return {
    id: data.userName,
    name: data.fullName,
    role:
      data.listOfProfiles?.[0] !== undefined
        ? String(data.listOfProfiles[0])
        : undefined,
  };
}

// ----------------------------------------------------------------------

interface AuthAction {
  type:
    | "INITIALIZE"
    | "LOGIN_REQUEST"
    | "LOGIN_SUCCESS"
    | "LOGIN_ERROR"
    | "LOGOUT";
  payload?: Partial<AuthContextType>;
}

// Initial state
const initialState: AuthContextType = {
  isAuthenticated: false,
  isLoading: false,
  isInitialized: false,
  errorMessage: null,
  user: null,
  login: async () => {},
  logout: async () => {},
};

// Reducer handlers
const reducerHandlers: Record<
  AuthAction["type"],
  (state: AuthContextType, action: AuthAction) => AuthContextType
> = {
  INITIALIZE: (state, action) => ({
    ...state,
    isAuthenticated: action.payload?.isAuthenticated ?? false,
    isInitialized: true,
    user: action.payload?.user ?? null,
  }),

  LOGIN_REQUEST: (state) => ({
    ...state,
    isLoading: true,
  }),

  LOGIN_SUCCESS: (state, action) => ({
    ...state,
    isAuthenticated: true,
    isLoading: false,
    user: action.payload?.user ?? null,
  }),

  LOGIN_ERROR: (state, action) => ({
    ...state,
    errorMessage: action.payload?.errorMessage ?? "An error occurred",
    isLoading: false,
  }),

  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
};

// Reducer function
const reducer = (
  state: AuthContextType,
  action: AuthAction,
): AuthContextType => {
  const handler = reducerHandlers[action.type];
  return handler ? handler(state, action) : state;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const init = async () => {
      try {
        const authToken = window.localStorage.getItem("authToken");

        if (authToken && isTokenValid(authToken)) {
          setSession(authToken);

          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: true,
              user: null,
            },
          });
        } else {
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    init();
  }, []);

  const login = async (credentials: { username: string; password: string }) => {
    dispatch({ type: "LOGIN_REQUEST" });

    try {
      const authorization = toBasicAuth(
        credentials.username,
        credentials.password,
      );
      const response = await axios.post<LoginResponse>("/auth/login", "", {
        headers: { Authorization: authorization },
      });
      const data = response.data;
      const { accessToken } = data;

      if (typeof accessToken !== "string" || accessToken.trim() === "") {
        throw new Error("Response is not valid");
      }

      setSession(accessToken);

      const user = mapLoginResponseToUser(data);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { user },
      });
    } catch (err) {
      const errorMessage =
        typeof err === "string"
          ? err
          : err instanceof Error
            ? err.message
            : "Login failed";
      dispatch({
        type: "LOGIN_ERROR",
        payload: { errorMessage },
      });
    }
  };

  const logout = async () => {
    setSession(null);
    dispatch({ type: "LOGOUT" });
  };

  if (!children) {
    return null;
  }

  return (
    <AuthContext
      value={{
        ...state,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext>
  );
}
