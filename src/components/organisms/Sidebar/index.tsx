import NavLink from "@/components/atoms/NavLink";
import { SideBarData } from "@/constants/sidebar-data";
import Image from "next/image";
import { useRouter } from "next/router";
import Logo from "public/logoDark.png";

const Sidebar = () => {
  const { pathname } = useRouter();

  const getNavLinkState = (url: string) => {
    console.log(pathname);

    if (url === "dashboard" && pathname === "/") {
      return true;
    }

    return pathname === url;
  };

  return (
    <aside className="sticky top-0 flex h-screen w-full max-w-sm bg-light-gray md:pr-5 lg:pr-10 xxl:max-w-[400px]">
      <div className="ml-auto flex h-full w-full max-w-[80%] flex-col">
        <Image priority src={Logo} alt="Suitemates" width={197} height={30} />
        <ul className="mt-16 grid w-full grid-cols-1 space-y-5 py-4">
          {SideBarData.map(({ pathname: url, ...ele }) => (
            <li key={ele.text}>
              <NavLink {...ele} isActive={getNavLinkState(url)} />
            </li>
          ))}
        </ul>

        <div className="mt-auto space-y-4">
          <NavLink
            icon="User01"
            text="Help & Support"
            link="/"
            className="w-fit bg-[#E6E6E6] pr-5"
          />
          <NavLink icon="Settings01" text="Logout" link="/" className="w-fit bg-[#E6E6E6] pr-5" />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
