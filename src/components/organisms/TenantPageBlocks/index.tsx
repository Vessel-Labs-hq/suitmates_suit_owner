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
import dayjs from "dayjs";
import { useState } from "react";
import tenantAPI from "@/utils/apis/tenant";
import Alert from "@/utils/base/alerts";
import { SpinnerLoader } from "@/components/atoms/Loader";
import { useQueryClient } from "react-query";

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
}: TenantPageHeaderProp) => {
  return (
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
              text="Add Tenant"
              href={{ query: { add_tenant: "true" } }}
            />

            <IconButton
              icon="Edit05"
              text="Edit Suite"
              href={{ query: { edit_suite: true } }}
            />
          </div>
        </div>
      </div>
      <DueRequestSideBar length={3} />
    </section>
  );
};

interface TenantPageTabProps {
  activeTenants: DbGetAllTenants[];
  inActiveTenants: DbGetAllTenants[];
  onAddSuite(tenantId: SN): void;
  onSuiteChange(tenantId: SN): void;
}
const tablist = ["Onboarded", "Pending Invites"] as const;

export const TenantPageTab = (props: TenantPageTabProps) => {
  const [loading, setLoading] = useState(false);
  const { activeTenants, inActiveTenants, onSuiteChange, onAddSuite } = props;
  const [pendingInvite, setPendingInvite] = useState<SN[]>([]);

  const queryClient = useQueryClient();

  const handleRemove = async (id: SN) => {
    setLoading(true);
    try {
      await tenantAPI.removeTenant(id);
      queryClient.invalidateQueries({ queryKey: ["get-all-tenants"] });
      Alert.success("Tenant removed successfully");
    } catch (error) {
      Alert.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async (id: SN) => {
    const newArr = [...pendingInvite, id].filter(Boolean);

    try {
      setPendingInvite(newArr);
      const res = await tenantAPI.resendInviteEmail(id);
      Alert.success("Invite sent successfully");
    } catch (error) {
      Alert.error(error);
    } finally {
      const rmArr = newArr.filter((idx) => id !== idx);
      setPendingInvite(rmArr);
    }
  };

  return (
    <div className="mt-5">
      {loading && <SpinnerLoader fullScreen wrapperClass="bg-white/60 z-40" />}
      <Tabs defaultValue={tablist[0]}>
        <Tabs.Header tablist={tablist} />
        <Tabs.Content value={tablist[0]}>
          <div className="mt-4 space-y-4">
            {/* <span>Sort</span> */}
            {activeTenants.length > 0 ? (
              activeTenants.map((row, idx) => {
                const { avatar, first_name, last_name, suite, businesses, id, ...rest } =
                  row;

                return (
                  <TenantDetailCard
                    key={idx}
                    {...rest}
                    onRemove={() => handleRemove(id)}
                    onSuiteChange={(hasSuite) => {
                      if (hasSuite) onSuiteChange(id);
                      else onAddSuite(id);
                    }}
                    href="#"
                    status={idx % 2 === 0 ? "paid" : "due"}
                    user={{
                      avatar,
                      name: cn(first_name ?? "-", last_name ?? "-"),
                    }}
                    business={businesses[0]}
                    suite={suite}
                  />
                );
              })
            ) : (
              <EmptyScreen
                desc="Your invitees are yet to signup, check back later"
                title="No Active Tenant"
                className="min-h-[38vh]"
              />
            )}
          </div>
        </Tabs.Content>
        <Tabs.Content className="space-y-2" value={tablist[1]}>
          {inActiveTenants.length > 0 ? (
            inActiveTenants.map(({ email, created_at, id }) => (
              <div
                className="relative grid grid-cols-2 items-center gap-5 gap-y-3 rounded-md bg-light-gray p-4 text-sm lg:grid-cols-3"
                key={email}
              >
                <p className="overflow-hidden text-ellipsis whitespace-nowrap text-xs max-xs:w-[150px] md:text-sm">
                  {email}
                </p>
                <div className="mx-auto w-48 max-lg:hidden">
                  Invited: {dayjs(created_at).fromNow()}
                </div>
                <div className="ml-auto w-full max-w-[100px] sm:max-w-[140px]">
                  <Button
                    className={cn(
                      "relative flex h-12 items-center gap-1 whitespace-nowrap bg-suite-dark px-3 py-2 text-sm max-md:h-8 max-md:rounded-md max-md:px-2 max-md:text-[10px]",
                      "[&_svg]:h-5 [&_svg]:w-5"
                    )}
                    variant="dark"
                    onClick={() => handleResend(id)}
                    loading={pendingInvite.includes(id)}
                  >
                    <IconBox icon="RefreshCw03" className="max-md:h-3 max-md:w-3" />
                    <span>Resend Email</span>
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <EmptyScreen
              desc="You are yet to send out any invite"
              title="No pending invites"
              className="min-h-[38vh]"
            />
          )}
        </Tabs.Content>
      </Tabs>
    </div>
  );
};
