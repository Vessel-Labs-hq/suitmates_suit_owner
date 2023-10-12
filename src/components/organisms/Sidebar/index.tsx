import NavLink from "@/components/atoms/NavLink";
import { SideBarData } from "@/constants/sidebar-data";
import authService from "@/utils/apis/auth";
import { IconBox } from "@the_human_cipher/components-library";
import Image from "next/image";
import { useRouter } from "next/router";
import Logo from "public/logoDark.png";

const Sidebar = () => {
  const { pathname } = useRouter();

  const getNavLinkState = (url: string) => {
    if (url === "dashboard" && pathname === "/") {
      return true;
    }

    return pathname === url;
  };

  return (
    <aside className="sticky top-0 hidden h-screen w-full max-w-[300px] bg-light-gray px-2 lg:flex lg:max-w-[380px] lg:pr-10 xl:max-w-[400px]">
      <div className="flex h-full w-full max-w-[95%] flex-col max-lg:mx-auto lg:ml-auto lg:max-w-[80%] ">
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
          <button
            type="button"
            onClick={() => authService.logOut()}
            className="flex w-fit items-center gap-3 rounded-xl bg-[#E6E6E6] px-4 py-3 pr-5
          text-suite-dark [word-spacing:-0.1ch] lg:text-lg"
          >
            <IconBox icon="Settings01" size={24} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
