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
    className="ml-auto text-xs capitalize"
    iconSize={14}
  />
);

const MaintenanceRequestCard = (props: MRCProps) => {
  const { date, desc, label, status, title, img, href } = props;

  return (
    <div className="relative rounded-xl bg-light-gray p-5 text-suite-dark">
      <Link href={href} className="absolute inset-0 rounded-[16px]" />

      <div className="mb-3 flex items-start">
        <div className="flex items-center gap-2">
          <Avatar name="Alfred Alisha" src="/temp/avatar.png" />

          <div>
            <div className="flex items-center gap-2">
              <p>Suite 14C</p>
              <Label
                label={label}
                type={label === "critical" ? "danger" : "warning"}
                className="!px-3 text-[10px] capitalize md:text-xs"
                small
                dots
              />
            </div>
            <div className="mt-1 flex items-center gap-1 text-[10px] font-light leading-none">
              <span>Alfred Alisha</span> <div className="h-1 w-1 rounded-full bg-current"></div>{" "}
              <span>Alfredalisha@gmail.com</span>
            </div>
          </div>
        </div>

        <div className="ml-auto">
          <div className="">
            <Image height={56} width={120} src={img} alt="" />
          </div>
        </div>
      </div>

      <div className="flex w-full justify-between gap-4">
        <div className="max-w-sm space-y-3">
          <div className="space-y-1">
            <div className="flex gap-2">
              <Title level={2}>{title}</Title>
            </div>
            <div className="text-xs">
              <span>{date}</span> | <span>2:53pm</span>
            </div>
          </div>
          <p className="text-sm">{desc}</p>
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between gap-4">
        <div>
          <StatusLabel status={status} />
        </div>
        <div>
          <Button className="flex h-10 items-center gap-2 px-4" asChild>
            <Link href={href}>
              <IconBox icon="ArrowNarrowRight" size={17} />
              <span>View</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceRequestCard;
