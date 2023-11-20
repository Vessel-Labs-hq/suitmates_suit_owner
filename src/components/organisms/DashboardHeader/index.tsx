import HeaderProfile from "@/components/atoms/HeaderProfile";
import Notifications from "@/components/molecules/Notifications";
import { cn, localLog } from "@/utils";
import { useGetNotifications } from "@/utils/hooks/api/notifications";
import Image from "next/image";
import LogoDark from "public/logo-dark.png";

export interface DashboardHeaderProps {
  name: string | undefined;
  avatar: string | undefined;
  headerDesc: string;
  email: string;
}

const assertName = (name?: string) => {
  const assertValue = (value: string) => (value === "null" ? "" : value);

  if (name) {
    const [firstName, lastName, ..._] = name.trim().split(" ");

    return {
      firstName: assertValue(firstName),
      lastName: assertValue(lastName),
    };
  }

  return { firstName: "", lastName: "" };
};

const DashboardHeader = (props: DashboardHeaderProps) => {
  const { name, headerDesc, avatar, email } = props;

  const { firstName, lastName } = assertName(name);

  const { data: notifications } = useGetNotifications();

  localLog({ notifications });

  return (
    <header className="flex flex-col-reverse justify-between gap-5  md:flex-row md:gap-4">
      <div className="space-y-2 text-sm text-suite-dark xl:text-xl">
        <h4 className="text-2xl font-bold text-black lg:text-4xl">Hello, {firstName}</h4>
        <p>{headerDesc}</p>
      </div>
      <div className="items-center gap-4 max-md:flex">
        <div className="md:hidden">
          <Image className="max-w-[150px]" src={LogoDark} alt="Suitemates" />
        </div>
        <div className="flex items-start gap-2 max-md:ml-auto md:gap-4">
          <Notifications notifications={["X", "x"]} hasNewNotifications />
          <HeaderProfile
            email={email}
            name={cn(firstName, lastName)}
            contentClass="md:block hidden"
            src={avatar}
          />
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
