import authService from "@/utils/apis/auth";
import DashboardHeader from "../organisms/DashboardHeader";
import Sidebar from "../organisms/Sidebar";
import ProtectedLayout from "./ProtectedLayout";
import SEO from "./SEO";

interface Props {
  children: React.ReactNode;
  headerDesc?: string;
  seo?: SEOobject;
}

const DashboardLayout = ({ children, headerDesc, seo }: Props) => {
  const user = authService.getSession();

  return (
    <ProtectedLayout>
      <div className="flex md:[&>*]:py-14">
        <Sidebar />
        <main className="w-full space-y-4 px-4 text-suite-dark max-md:py-5 md:ml-[100px] md:space-y-8 md:px-6 lg:px-8 xxl:ml-0">
          <DashboardHeader
            email={user?.email ?? ""}
            name={user?.name}
            avatar={user?.avatar ?? undefined}
            headerDesc={headerDesc ?? "Track maintenance and mange tenants on your dashboard"}
          />
          <div className="hidden h-[3px] w-full bg-gray md:block" />
          <div>{children}</div>
        </main>
      </div>
      <SEO {...seo} />
    </ProtectedLayout>
  );
};

export default DashboardLayout;
