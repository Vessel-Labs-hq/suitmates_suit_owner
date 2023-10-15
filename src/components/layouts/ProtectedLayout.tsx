import authService from "@/utils/apis/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SpinnerLoader } from "../atoms/Loader";

export default function ProtectedLayout({ children }: IChildren) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const validateSession = async () => {
    try {
      await authService.validateSession();
    } catch (error) {
      authService.redirectLogin({ router });
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 400);
    }
  };

  useEffect(() => {
    validateSession();
  }, []);

  if (loading)
    return (
      <SpinnerLoader
        wrapperClass="w-full h-screen flex items-center justify-center"
        className="fill-white text-primary"
      />
    );

  return children;
}
