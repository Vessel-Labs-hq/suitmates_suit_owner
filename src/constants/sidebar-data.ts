import { IconBox } from "@the_human_cipher/components-library";

type Icons = React.ComponentProps<typeof IconBox>["icon"];

interface ISideBarData {
  link: string;
  text: string;
  icon: Icons;
  pathname: string;
}

export const SideBarData: ISideBarData[] = [
  {
    link: "/",
    text: "Dashboard",
    icon: "Home01",
    pathname: "dashboard",
  },
  {
    link: "/maintenance-request",
    text: "Maintenance Request",
    icon: "Tool02",
    pathname: "/maintenance-request",
  },
  {
    link: "/rent-collection",
    text: "Rent Collection",
    icon: "CoinsStacked02",
    pathname: "/rent-collection",
  },
  {
    link: "/tenant",
    text: "Tenant",
    icon: "User01",
    pathname: "/tenant",
  },
];
