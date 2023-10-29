import authService from "@/utils/apis/auth";
import { SpinnerLoader } from "../atoms/Loader";
import { useQuery, useQueryClient } from "react-query";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function ProtectedLayout({ children }: IChildren) {
  const router = useRouter();

  const queryClient = useQueryClient();

  const { isLoading, isError } = useQuery({
    queryFn: () => authService.validateSession(),
    queryKey: ["validate-session"],
    staleTime: 45 * (60 * 1000), // 30 mins
    cacheTime: 60 * (60 * 1000), // 60 mins
    retry: false,
  });

  const [loading, setLoading] = useState(isLoading);

  useEffect(() => {
    queryClient.invalidateQueries();

    if (isError) {
      authService.redirectLogin({ router });
    }
  }, [isError]);

  /** prevent glitch of other components showing */
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (!isLoading) {
      timeoutId = setTimeout(() => {
        setLoading(false);
      }, 500);
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
