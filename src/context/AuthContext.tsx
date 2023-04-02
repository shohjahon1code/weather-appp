import { ReactNode, createContext, useMemo, useState } from "react";
import { useAuth } from "../hooks/useAuth";


interface AuthContextState {
  error: string;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>
  logOut: () => void
}

export const AuthContext = createContext<AuthContextState>({
  error: "",
  isLoading: false,
  signIn: async () => { },
  logOut: () => { }
});

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const {
    logOut,

    signIn,
    isLoading,
    error,
    setIsLoading,
  } = useAuth();
  const [initialLoader, setInitialLoader] = useState<boolean>(false);

  const value = useMemo(
    () => ({
      logOut,
      signIn,
      error,
      isLoading,
      setIsLoading
    }),

    //eslint-disable-next-line
    [isLoading, error]
  );


  return (
    <AuthContext.Provider value={value}>
      {!initialLoader ? children : "Loader..."}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;