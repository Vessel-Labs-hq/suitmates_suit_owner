import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useGetManualRentUpload } from "@/utils/hooks/api/rent-history";

const Page = () => {
  const { data: manualRent } = useGetManualRentUpload();

  console.log({ manualRent });

  return <DashboardLayout>Page</DashboardLayout>;
};

export default Page;
