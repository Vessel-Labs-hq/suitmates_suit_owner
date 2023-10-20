import NavLink from "@/components/atoms/NavLink";
import { SideBarData } from "@/constants/sidebar-data";
import { cn } from "@/utils";
import authService from "@/utils/apis/auth";
import { IconBox } from "@the_human_cipher/components-library";
import Image from "next/image";
import { useRouter } from "next/router";
import Logo from "public/logo-dark.png";
import IconLogo from "@/assets/images/logo-icon.png";
import { Fragment, useEffect, useState } from "react";

const Sidebar = () => {
  const { pathname } = useRouter();

  const [open, setOpen] = useState(false);
  const [showText, setShowText] = useState(false);

  const getNavLinkState = (url: string) => {
    if (url === "dashboard" && pathname === "/") {
      return true;
    }

    return pathname === url;
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (open === true) {
        setShowText(open);
      }
    }, 300);

    if (!open) {
      setShowText(false);
    }

    () => {
      clearTimeout(timeout);
    };
  }, [open]);

  const textStyles = cn(
    "origin-left whitespace-nowrap duration-300 xxl:block",
    showText && "block opacity-100",
    !showText &&
      "max-xxl:sr-only max-xxl:-m-1 max-xxl:max-w-0 max-xxl:overflow-hidden max-xxl:opacity-0"
  );

  const arrowStyles = cn(
    "absolute -right-3 top-32 z-10 flex h-7 w-7 animate-ping cursor-pointer items-center justify-center rounded-full border-transparent bg-white p-1 font-semibold shadow-md shadow-black/20",
    open && "rotate-180"
  );

  const baseClassStyle = "h-12 w-fit overflow-hidden lg:text-base xxl:w-full";

  return (
    <Fragment>
      <aside
        className={cn(
          "fixed top-0 z-[4] hidden h-screen w-full max-w-[100px] bg-light-gray px-2 md:flex xxl:sticky xxl:max-w-[350px] xxl:border-r-0 xxl:pr-10 xxl:shadow-none",
          open && "max-w-[350px] pr-10",
          "duration-700 max-md:py-14"
        )}
      >
        <div className="ml-auto flex h-full w-full max-w-[80%] flex-col">
          <button
            type="button"
            className="cursor-pointer xxl:hidden"
            onClick={() => setOpen(!open)}
          >
            <div className={arrowStyles}>
              <IconBox icon="ChevronRight" className="opacity-0" />
            </div>
            <div className={cn(arrowStyles, "animate-none p-1.5 shadow-xl")}>
              <IconBox icon="ChevronRight" className="" />
            </div>
          </button>
          <div className="relative h-10 w-full">
            <Image
              priority
              src={Logo}
              alt="Suitemates"
              className={cn(
                "absolute top-0 opacity-0 ",
                open && "opacity-100 transition-opacity delay-300 duration-300",
                "xxl:opacity-100"
              )}
              width={197}
              height={30}
            />
            <Image
              src={IconLogo}
              alt="Suitemates"
              priority
              height={40}
              className={cn(
                "absolute top-0 ml-2 block h-10 w-fit opacity-0",
                !open && "opacity-100",
                "xxl:opacity-0"
              )}
            />
          </div>
          <ul className="mt-24 grid w-full grid-cols-1 space-y-5 py-4">
            {SideBarData.map(({ pathname: url, ...ele }) => (
              <li key={ele.text}>
                <NavLink
                  {...ele}
                  className={cn(baseClassStyle, open && "w-full")}
                  isActive={getNavLinkState(url)}
                  textStyles={textStyles}
                />
              </li>
            ))}
          </ul>

          <div className="mt-auto space-y-4">
            <NavLink
              icon="User01"
              text="Help & Support"
              link="/"
              className={cn(baseClassStyle, "bg-[#E6E6E6] xxl:w-fit", open && "w-fit")}
              textStyles={cn(textStyles, showText && "delay-100")}
            />
            <button
              type="button"
              onClick={() => authService.logOut()}
              className={cn(
                baseClassStyle,
                "flex items-center gap-3 rounded-xl bg-[#E6E6E6] px-4 py-3 text-suite-dark [word-spacing:-0.1ch]",
                "xxl:w-fit",
                open && "w-fit"
              )}
            >
              <IconBox icon="Settings01" size={22} />
              <p className={cn(textStyles, "w-[calc(100%-32px)] delay-100")}>Logout</p>
            </button>
          </div>
        </div>
      </aside>
      <div
        className={cn(
          "fixed inset-0 z-[-1] bg-transparent xxl:hidden",
          open && "z-[1] w-full bg-black/30 duration-100 ease-out",
          "max-md:hidden"
        )}
        onClick={() => setOpen(false)}
      ></div>
    </Fragment>
  );
};

export default Sidebar;
