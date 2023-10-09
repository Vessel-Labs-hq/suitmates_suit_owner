import Sidebar from "../organisms/Sidebar";
import ProtectedLayout from "./ProtectedLayout";

const DashboardLayout = ({ children }: IChildren) => {
  return (
    <ProtectedLayout>
      <div className="flex [&>*]:pt-10">
        <Sidebar />
        <main className="w-full px-4 md:px-6 lg:px-8">{children}</main>
      </div>
    </ProtectedLayout>
  );
};

export default DashboardLayout;
