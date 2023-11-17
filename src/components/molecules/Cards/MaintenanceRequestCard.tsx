import Avatar from "@/components/atoms/Avatar";
import {
  cn,
  formatWord,
  getMaintenanceRequestPriorityType,
  getMaintenanceRequestStatusIcon,
  getMaintenanceRequestStatusType,
} from "@/utils";
import { Button, IconBox, Label, Title } from "@the_human_cipher/components-library";
import Image from "next/image";
import Link from "next/link";

export interface MRCProps {
  title: string;
  desc: string;
  date: string;
  label: TMaintenanceRequestPriority;
  status: MaintenanceRequestStatus;
  img: string[];
  href: React.ComponentProps<typeof Link>["href"];
  user: {
    first_name: string;
    email: string;
    last_name: string;
    avatar: string;
  };
  suite: string;
}

const StatusLabel = ({ status }: Pick<MRCProps, "status">) => (
  <Label
    label={formatWord(status.toLowerCase())}
    type={getMaintenanceRequestStatusType(status)}
    small
    icon={getMaintenanceRequestStatusIcon(status)}
    className="ml-auto text-xs capitalize"
    iconSize={14}
  />
);

const ImageRow = ({ img }: Pick<MRCProps, "img">) => (
  <div className="flex h-[70px] w-[200px] items-center sm:translate-x-[10px] sm:justify-end">
    {img.slice(0, 3).map((src, idx) => {
      const LIMIT = 7 * idx;
      const size = 67 - LIMIT;

      const TRANSLATE: Record<number, string> = {
        0: "0",
        1: "-5px 0",
        2: "-10px 0",
      };

      const ZIndex: Record<number, number> = {
        0: 2,
        1: 1,
        2: 0,
      };

      return (
        <div
          key={src}
          style={{
            height: size,
            maxWidth: size,
            zIndex: ZIndex[idx],
            translate: TRANSLATE[idx],
          }}
          className="relative w-full overflow-hidden"
        >
          <Image src={src} alt="" fill className="rounded-md object-cover" />
        </div>
      );
    })}
  </div>
);

const MaintenanceRequestCard = (props: MRCProps) => {
  const { date, desc, label, status, title, img, href, user, suite } = props;

  return (
    <div className="relative rounded-lg bg-light-gray p-5 text-suite-dark max-sm:cursor-pointer sm:rounded-xl">
      <Link href={href} className="absolute inset-0 rounded-[16px]" />

      <div className="">
        <div>
          <div className="mb-3 flex items-start">
            <div className="flex items-center gap-2 max-sm:w-full">
              <Avatar name={cn(user.first_name, user.last_name)} src={user.avatar} />

              <div className="max-sm:w-full">
                <div className="flex items-center gap-2">
                  <p className="max-sm:text-sm">{suite}</p>
                  <Label
                    label={label}
                    type={getMaintenanceRequestPriorityType(label)}
                    className="max-sm:tex-[7px] px-3 text-[10px] capitalize max-md:px-2 max-md:py-0.5 md:text-xs"
                    small
                    dots
                  />
                </div>
                <div className="mt-2 flex items-center gap-1 text-[10px] font-light leading-none md:mt-1">
                  <span className="capitalize">
                    {user.first_name} {user.last_name}
                  </span>{" "}
                  <div className="h-1 w-1 rounded-full bg-current"></div>{" "}
                  <span>{user.email}</span>
                </div>
              </div>
            </div>

            <div className="ml-auto hidden sm:block">
              <ImageRow img={img} />
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
          <ImageRow img={img} />
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
