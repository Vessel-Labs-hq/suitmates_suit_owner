import DashboardHeader from "../organisms/DashboardHeader";
import Sidebar from "../organisms/Sidebar";
import ProtectedLayout from "./ProtectedLayout";
import SEO from "./SEO";
import MobileMenu from "../organisms/MobileMenu";
import useSession from "@/utils/hooks/useSession";
import { useGetProfile } from "@/utils/hooks/api/useGetProfile";

interface Props {
  children: React.ReactNode;
  headerDesc?: string;
  seo?: SEOobject;
}

const DashboardLayout = ({ children, headerDesc, seo }: Props) => {
  const user = useSession();

  const _response = useGetProfile();

  return (
    <ProtectedLayout>
      <div className="flex max-md:pb-40 md:[&>*]:py-14">
        <Sidebar />
        <main className="w-full space-y-4 px-4 text-suite-dark max-md:py-5 md:ml-[100px] md:space-y-8 md:px-6 lg:px-8 xxl:ml-0">
          <DashboardHeader
            email={user?.email ?? ""}
            name={user?.name}
            avatar={user?.avatar ?? undefined}
            headerDesc={
              headerDesc ?? "Track maintenance and mange tenants on your dashboard"
            }
          />
          <div className="hidden h-[3px] w-full bg-gray md:block" />
          <div>{children}</div>
        </main>
      </div>
      <SEO {...seo} />
      <MobileMenu />
    </ProtectedLayout>
  );
};

export default DashboardLayout;
