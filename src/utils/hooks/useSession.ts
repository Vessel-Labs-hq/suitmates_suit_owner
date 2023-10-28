import { useEffect, useState } from "react";
import authService from "../apis/auth";

const useSession = () => {
  const [user, setUser] = useState(() => authService.getSession());

  useEffect(() => {
    const handleEventChange = () => {
      const userDetails = authService.getSession();

      setUser(userDetails);
    };

    window.addEventListener("UpdatedUserData", handleEventChange);

    return () => {
      window.removeEventListener("UpdatedUserData", handleEventChange);
    };
  }, []);

  return user;
};

export default useSession;
