import Avatar from "@/components/atoms/Avatar";
import { Button, IconBox, Label, Title } from "@the_human_cipher/components-library";
import Image from "next/image";
import Link from "next/link";

export interface MRCProps {
  title: string;
  desc: string;
  date: string;
  label: "critical" | "trivial";
  status: "completed" | "not-completed";
  img: string;
  href: React.ComponentProps<typeof Link>["href"];
}

const StatusLabel = ({ status }: Pick<MRCProps, "status">) => (
  <Label
    label={status}
    type={status === "completed" ? "success" : "danger"}
    small
    icon={status === "not-completed" ? "XCircle" : "CheckCircleBroken"}
    className="ml-auto text-xs capitalize max-sm:py-0.5 max-sm:text-[10px]"
    iconSize={14}
  />
);

const MaintenanceRequestCard = (props: MRCProps) => {
  const { date, desc, label, status, title, img, href } = props;

  return (
    <div className="relative rounded-lg bg-light-gray p-5 text-suite-dark max-sm:cursor-pointer sm:rounded-xl">
      <Link href={href} className="absolute inset-0 rounded-[16px]" />

      <div className="">
        <div>
          <div className="mb-3 flex items-start">
            <div className="flex items-center gap-2 max-sm:w-full">
              <Avatar name="Alfred Alisha" src="/temp/avatar.png" />

              <div className="max-sm:w-full">
                <div className="flex items-center gap-2">
                  <p className="max-sm:text-sm">Suite 14C</p>
                  <Label
                    label={label}
                    type={label === "critical" ? "danger" : "warning"}
                    className="max-sm:tex-[7px] px-3 text-[10px] capitalize max-md:px-2 max-md:py-0.5 md:text-xs"
                    small
                    dots
                  />
                </div>
                <div className="mt-2 flex items-center gap-1 text-[10px] font-light leading-none md:mt-1">
                  <span>Alfred Alisha</span> <div className="h-1 w-1 rounded-full bg-current"></div>{" "}
                  <span>Alfredalisha@gmail.com</span>
                </div>
              </div>
            </div>

            <div className="ml-auto hidden sm:block">
              <div className="">
                <Image height={56} width={120} src={img} alt="" />
              </div>
            </div>
          </div>

          <div className="flex w-full justify-between gap-4">
            <div className="max-w-sm space-y-3">
              <div className="space-y-1">
                <div className="flex gap-2">
                  <Title level={2} className="max-sm:text-sm">
                    {title}
                  </Title>
                </div>
                <div className="text-xs">
                  <span>{date}</span> | <span>2:53pm</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm">{desc}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between gap-4">
        <div className="mt-2 w-full max-w-[120px] sm:hidden">
          <div className="">
            <Image height={56} width={120} src={img} alt="" />
          </div>
        </div>
        <div>
          <StatusLabel status={status} />
        </div>
        <div className="max-sm:hidden">
          <Button className="flex h-9 items-center gap-2 px-4 sm:h-10" asChild>
            <Link href={href}>
              <IconBox icon="ArrowNarrowRight" size={17} />
              <span className="max-sm:text-sm">View</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceRequestCard;
