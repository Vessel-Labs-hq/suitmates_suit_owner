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
      <div className="flex [&>*]:py-14">
        <Sidebar />
        <main className="w-full space-y-4 px-4 text-suite-dark md:px-6 lg:px-8">
          <DashboardHeader
            email={user?.email ?? ""}
            firstName="rehk"
            lastName="mansa"
            headerDesc={headerDesc ?? "Track maintenance and mange tenants on your dashboard"}
          />
          <div className="h-[3px] w-full bg-gray" />
          <div>{children}</div>
        </main>
      </div>
    </ProtectedLayout>
  );
};

export default DashboardLayout;
