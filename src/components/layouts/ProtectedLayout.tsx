import authService from "@/utils/apis/auth";
import { SpinnerLoader } from "../atoms/Loader";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";

export default function ProtectedLayout({ children }: IChildren) {
  const { isLoading, isError } = useQuery({
    queryFn: () => authService.validateSession(),
    queryKey: ["validate-session"],
    staleTime: 45 * (60 * 1000), // 30 mins
    cacheTime: 60 * (60 * 1000), // 60 mins
    retry: false,
  });

  const [loading, setLoading] = useState(isLoading);

  useEffect(() => {
    if (isError) {
      authService.redirectLogin();
    }
  }, [isError]);

  /** prevent glitch of other components showing */
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (!isLoading) {
      timeoutId = setTimeout(() => {
        setLoading(false);
      }, 300);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isLoading]);

  if (loading) return <SpinnerLoader fullScreen />;

  return children;
}
