import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState } from "react";
import { API_REQUEST } from "../service/api.service";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    await axios
      .post(API_REQUEST.login, {
        email,
        password,
      })
      .then(function (response) {
        console.log(response.data.token);
        Cookies.set("user_id", response.data.token);
        setIsLoading(true);
        router.push('/');
      })
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  };

  const logOut = () => {
    Cookies.remove("user_id");
    router.push("/auth");
  };

  return {
    signIn,
    logOut,
    error,
    isLoading,
    setIsLoading,
    setError,
  };
};
