import { HomeInfoCard } from "@/components/atoms/HomeSharedUI";
import { DashboardSuiteInfoChart } from "../DashboardCharts";
import { Button, IconBox } from "@the_human_cipher/components-library";
import Link from "next/link";
import type { UrlObject } from "url";
import DueRequestSideBar from "@/components/molecules/DueRequestSideBar";
import Tabs from "../Tabs";
import TenantDetailCard from "@/components/molecules/TenantDetailCard";
import EmptyScreen from "@/components/molecules/EmptyScreen";
import { cn } from "@/utils";

interface IconButtonProps {
  href: string | UrlObject;
  icon: React.ComponentProps<typeof IconBox>["icon"];
  text: string;
  className?: string;
}

export const IconButton = ({ href, icon, text, className }: IconButtonProps) => (
  <Button asChild className={cn("flex items-center gap-2 px-3", className)}>
    <Link href={href}>
      <IconBox icon={icon} />
      <span className="whitespace-nowrap">{text}</span>
    </Link>
  </Button>
);

interface TenantPageHeaderProp {
  vacantSuites: SN;
  occupiedSuites: SN;
}

export const TenantPageHeader = ({
  occupiedSuites,
  vacantSuites,
}: TenantPageHeaderProp) => (
  <section className="flex items-start justify-between gap-4">
    <div className="flex h-full w-full flex-col gap-4">
      <div className="grid max-h-44 w-full grid-cols-2 items-center gap-4 rounded-xl bg-light-gray p-6 md:grid-cols-3">
        <div className="grid grid-cols-1 gap-4 md:col-span-2 md:grid-cols-2">
          <HomeInfoCard title="Vacant Suites" value={vacantSuites} />
          <HomeInfoCard title="Occupied Suites" value={occupiedSuites} />
        </div>
        <DashboardSuiteInfoChart />
      </div>
      <div className="mt-auto hidden w-fit md:block">
        <div className="flex items-center gap-4">
          <IconButton
            icon="Plus"
            text="Add Tenat"
            href={{ query: { add_tenant: "true" } }}
          />

          <IconButton icon="Edit05" text="Edit Suite" href="#" />
        </div>
      </div>
    </div>
    <DueRequestSideBar length={3} />
  </section>
);

interface TenantPageTabProps {
  activeTenants: DbGetAllTenants[];
  inActiveTenants: DbGetAllTenants[];
}
const tablist = ["Active", "Inactive"] as const;

export const TenantPageTab = ({ activeTenants, inActiveTenants }: TenantPageTabProps) => (
  <div className="mt-5">
    <Tabs defaultValue={tablist[0]}>
      <Tabs.Header tablist={tablist} />
      <Tabs.Content value={tablist[0]}>
        <div className="mt-4 space-y-4">
          {activeTenants.length > 0 ? (
            activeTenants.map(({ avatar, first_name, last_name }, idx) => (
              <TenantDetailCard
                key={idx}
                onRemove={() => {}}
                onSuiteChange={() => {}}
                href="#"
                status={idx % 2 === 0 ? "paid" : "due"}
                user={{
                  avatar,
                  name: cn(first_name ?? "-", last_name ?? "-"),
                }}
              />
            ))
          ) : (
            <EmptyScreen
              desc="Your invitees are yet to signup, check back later"
              title="No Active Tenant"
              className="min-h-[38vh]"
            />
          )}
        </div>
      </Tabs.Content>
      <Tabs.Content value={tablist[1]}>
        {inActiveTenants.map(({ avatar, first_name, last_name }, idx) => (
          <TenantDetailCard
            key={idx}
            onRemove={() => {}}
            onSuiteChange={() => {}}
            href="#"
            status={idx % 2 === 0 ? "paid" : "due"}
            user={{
              avatar,
              name: cn(first_name ?? "-", last_name ?? "-"),
            }}
          />
        ))}
      </Tabs.Content>
    </Tabs>
  </div>
);
