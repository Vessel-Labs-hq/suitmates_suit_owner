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
    icon: "Users01",
    pathname: "/tenant",
  },
];

export const MobileMenuData: ISideBarData[] = [
  {
    link: "/rent-collection",
    text: "Rent",
    icon: "CoinsStacked02",
    pathname: "/rent-collection",
  },
  {
    link: "/maintenance-request",
    text: "Maintenance",
    icon: "Tool02",
    pathname: "/maintenance-request",
  },
  {
    link: "/",
    text: "Dashboard",
    icon: "Home01",
    pathname: "dashboard",
  },
  {
    link: "/tenant",
    text: "Tenant",
    icon: "Users01",
    pathname: "/tenant",
  },
  {
    link: "#",
    text: "Profile",
    icon: "User01",
    pathname: "/settings",
  },
];
