/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ReactNode,
  createContext,
  useMemo,
  useState,
  useContext,
  useCallback,
  useEffect,
} from "react";

import { useToast } from "@/components/ui/use-toast";

import axiosWithConfig, { setAxiosConfig } from "@/utils/apis/axiosWithConfig";
import { getClientProfile } from "../apis/client/api";
import { getWorkerProfile } from "../apis/worker/api";
import { ProfileType } from "../types/api";

interface Context {
  token: string;
  id: string;
  role: string;
  client: Partial<ProfileType>;
  worker: Partial<ProfileType>;
  changeToken: (token?: string) => void;
  changeRole: (role?: string) => void;
  changeId: (id?: string) => void;
  reFetch: () => void;
}

interface Props {
  children: ReactNode;
}

const contextValue = {
  token: "",
  id: "",
  role: "",
  client: {},
  worker: {},
  changeToken: () => {},
  changeRole: () => {},
  changeId: () => {},
  reFetch: () => {},
};

const TokenContext = createContext<Context>(contextValue);

export function TokenProvider({ children }: Readonly<Props>) {
  const { toast } = useToast();

  const [token, setToken] = useState(localStorage.getItem("token") ?? "");
  const [role, setRole] = useState(localStorage.getItem("role") ?? "");
  const [id, setId] = useState(localStorage.getItem("id") ?? "");
  const [client, setClient] = useState<Partial<ProfileType>>({});
  const [worker, setWorker] = useState<Partial<ProfileType>>({});

  useEffect(() => {
    setAxiosConfig(token);
    token !== "" && fetchProfile(id);
  }, [token]);

  axiosWithConfig.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        changeToken();
      }

      return Promise.reject(error);
    }
  );

  const fetchProfile = useCallback(
    async (id: string) => {
      try {
        if (role === "client") {
          const result = await getClientProfile(id);
          setClient(result);
        } else {
          const result = await getWorkerProfile(id);
          setWorker(result);
        }
      } catch (error: any) {
        toast({
          title: "Oops! Something went wrong.",
          description: error.message.toString(),
          variant: "destructive",
        });
      }
    },
    [token]
  );

  const reFetch = useCallback(() => {
    fetchProfile(id);
  }, []);

  const changeToken = useCallback(
    (token?: string) => {
      const newToken = token ?? "";
      setToken(newToken);
      if (token) {
        localStorage.setItem("token", newToken);
      } else {
        localStorage.removeItem("token");
        setClient({});
        setWorker({});
      }
    },
    [token]
  );

  const changeRole = useCallback(
    (role?: string) => {
      const newRole = role ?? "";
      setRole(newRole);
      if (role) {
        localStorage.setItem("role", newRole);
      } else {
        localStorage.removeItem("role");
        setClient({});
        setWorker({});
      }
    },
    [token]
  );

  const changeId = useCallback(
    (id?: string) => {
      const newId = id ?? "";
      setId(newId);
      if (id) {
        localStorage.setItem("id", newId);
      } else {
        localStorage.removeItem("id");
        setClient({});
        setWorker({});
      }
    },
    [token]
  );

  const tokenContextValue = useMemo(
    () => ({
      token,
      id,
      role,
      client,
      worker,
      changeToken,
      changeRole,
      changeId,
      reFetch,
    }),
    [
      token,
      id,
      role,
      client,
      worker,
      changeToken,
      changeRole,
      changeId,
      reFetch,
    ]
  );

  return (
    <TokenContext.Provider value={tokenContextValue}>
      {children}
    </TokenContext.Provider>
  );
}

export function useToken() {
  const context = useContext(TokenContext);

  if (context === undefined) {
    throw new Error("ERROR, useToken must be used within TokenContext");
  }

  return context;
}
