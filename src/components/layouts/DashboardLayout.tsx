import ProtectedLayout from "./ProtectedLayout";

const DashboardLayout = ({ children }: IChildren) => {
  return <ProtectedLayout>{children}</ProtectedLayout>;
};

export default DashboardLayout;
