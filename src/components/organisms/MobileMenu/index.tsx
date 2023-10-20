import { MobileMenuData } from "@/constants/navdata";
import { checkIfNavLinkIsActive, cn } from "@/utils";
import { IconBox } from "@the_human_cipher/components-library";
import Link from "next/link";
import { useRouter } from "next/router";

const MobileMenu = () => {
  const { pathname } = useRouter();

  const getNavLinkState = checkIfNavLinkIsActive(pathname);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 h-16 w-full border-t border-black/10 md:hidden">
      <div className="flex h-full w-full justify-between bg-light-gray px-4 text-center text-[8px] leading-normal">
        {MobileMenuData.map(({ pathname: url, icon, link, text }) => {
          const isActive = getNavLinkState(url);

          return (
            <Link
              key={text}
              className={cn(
                "flex h-14 w-16 flex-col items-center justify-center gap-0.5 rounded-2xl transition-all duration-500",
                isActive && "-translate-y-3 bg-primary text-white"
              )}
              href={link}
            >
              <IconBox icon={icon} size={28} />
              <p className="mx-auto w-fit text-center">{text}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileMenu;
