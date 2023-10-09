import authService from "@/utils/apis/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ProtectedLayout({ children }: IChildren) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = authService.getSession();

    if (!user) {
      authService.redirectLogin({ router });
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) return <div />;

  return <main>{children}</main>;
}
