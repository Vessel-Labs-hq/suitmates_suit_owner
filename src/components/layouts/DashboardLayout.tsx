import authService from "@/utils/apis/auth";
import DashboardHeader from "../organisms/DashboardHeader";
import Sidebar from "../organisms/Sidebar";
import ProtectedLayout from "./ProtectedLayout";

interface Props {
  children: React.ReactNode;
  headerDesc?: string;
}

const DashboardLayout = ({ children, headerDesc }: Props) => {
  const user = authService.getSession();

  return (
    <ProtectedLayout>
      <div className="flex md:[&>*]:py-14">
        <Sidebar />
        <main className="w-full space-y-8 px-4 text-suite-dark max-md:py-5 md:space-y-4 md:px-6 lg:px-8">
          <DashboardHeader
            email={user?.email ?? ""}
            firstName="John"
            lastName="Doe"
            headerDesc={headerDesc ?? "Track maintenance and mange tenants on your dashboard"}
          />
          <div className="hidden h-[3px] w-full bg-gray md:block" />
          <div>{children}</div>
        </main>
      </div>
    </ProtectedLayout>
  );
};

export default DashboardLayout;
