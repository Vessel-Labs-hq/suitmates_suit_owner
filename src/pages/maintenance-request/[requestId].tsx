import { FaviconLoader } from "@/components/atoms/Loader";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import UserQuickInfoCard from "@/components/molecules/UserQuickInfoCard";
import ChatBoxModal from "@/components/organisms/ChatboxModal";
import { MaintenanceRequestArr, WorkingHoursOptions } from "@/constants";
import maintenanceApi from "@/utils/apis/maintenance";
import Alert from "@/utils/base/alerts";
import {
  assertQuery,
  cn,
  formatWord,
  getFormStateError,
  getMaintenanceRequestStatusIcon,
  getMaintenanceRequestStatusType,
} from "@/utils/functions/helpers";
import { useGetAllMaintenance } from "@/utils/hooks/api/maintenance";
import useSession from "@/utils/hooks/useSession";
import { InferSchema } from "@/utils/schema/helpers";
import { UpdateMaintenanceRequestSchema } from "@/utils/schema/maintenance";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  DatePicker,
  IconBox,
  Label,
  Select,
} from "@the_human_cipher/components-library";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useQueryClient } from "react-query";

type Inputs = InferSchema<typeof UpdateMaintenanceRequestSchema>;

function MaintenanceRequestPage() {
  const router = useRouter();

  const { data, isLoading, isError } = useGetAllMaintenance();

  const profile = useSession();

  const [chats, setChats] = useState<IChats[]>([]);

  const queryClient = useQueryClient();

  const { requestId, view_comments } = router.query;
  const handleModalClose = () => router.push({ query: { requestId } });

  const selectedRequest = useMemo(
    () => data?.maintenanceRequests.find(({ id }) => String(id) === requestId),
    [data, requestId]
  );

  const { control, formState, register, reset, handleSubmit, setValue } = useForm<Inputs>(
    {
      resolver: zodResolver(UpdateMaintenanceRequestSchema),
      defaultValues: {
        repair_date: new Date(selectedRequest?.repair_date ?? "") ?? undefined,
        repair_time: selectedRequest?.repair_time
          ? JSON.parse(selectedRequest?.repair_time)
          : undefined,
        status: MaintenanceRequestArr.find(
          ({ value }) => value === selectedRequest?.status
        ),
      },
    }
  );

  useEffect(() => {
    reset({
      repair_date: new Date(selectedRequest?.repair_date ?? "") ?? undefined,
      repair_time: selectedRequest?.repair_time
        ? JSON.parse(selectedRequest?.repair_time)
        : undefined,
      status: MaintenanceRequestArr.find(
        ({ value }) => value === selectedRequest?.status
      ),
    });
  }, [selectedRequest]);

  useEffect(() => {
    if (selectedRequest) {
      const Chats: IChats[] = selectedRequest.comments.map(({ id, user, text }) => ({
        id,
        message: text,
        contact: cn(user.first_name, user.last_name),
        isSender: profile?.email === user.email,
      }));

      setChats(Chats);
    }
  }, [selectedRequest]);

  const onFormSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await maintenanceApi.updateMaintenanceRequest({
        data,
        requestId: selectedRequest?.id ?? "n/a",
      });
      Alert.success("Maintenance request updated");
      queryClient.invalidateQueries({ queryKey: ["get-all-maintenance"] });
    } catch (error) {
      Alert.error(error);
    }
  };

  const { assertFormError, unwrapFormError } = getFormStateError(formState);

  if (isLoading) {
    return (
      <DashboardLayout headerDesc="Track maintenance on your dashboard ">
        <div className="grid h-[500px] place-items-center">
          <div>
            <FaviconLoader />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (isError) {
    return (
      <DashboardLayout headerDesc="Track maintenance on your dashboard ">
        <div>Oops an error occurred</div>
      </DashboardLayout>
    );
  }

  if (!selectedRequest) {
    return (
      <DashboardLayout>
        <div className="mt-10">Oops something went wrong</div>
      </DashboardLayout>
    );
  }

  const { updated_at, description, images, priority, status, suite, category, user } =
    selectedRequest;

  return (
    <DashboardLayout headerDesc="Track maintenance on your dashboard ">
      <section className="max-w-[900px] space-y-8 pb-40">
        <div className="flex gap-4">
          <Link className="mt-8 flex gap-1 max-sm:text-sm" href="/maintenance-request">
            <IconBox className="max-sm:hidden" icon="ArrowNarrowLeft" size={24} />
            <IconBox className="sm:hidden" icon="ArrowNarrowLeft" size={18} />
            <span>Maintenance Request</span>
          </Link>
        </div>
        <div className="space-y-8">
          <div>
            <UserQuickInfoCard
              suite={`Suite ${suite.suite_number}`}
              user={user}
              label={priority}
            />
          </div>
          <div>
            <h2 className="text-2xl font-medium">{category ?? "Appliance"}</h2>
            <div className="mt-2 text-sm">
              {dayjs(updated_at).format("DD MMM YYYY")} |{" "}
              {dayjs(updated_at).format("h:ma")}
            </div>

            <p className="mt-6 text-sm font-light first-letter:capitalize md:text-lg">
              {description?.trim()}
            </p>
            <div className="mt-6 grid grid-cols-4 gap-2 sm:gap-4">
              {images.map(({ url }) => (
                <div
                  key={url}
                  style={{
                    backgroundImage: `url(${url})`,
                  }}
                  className="h-20 w-full rounded bg-cover sm:h-40 sm:rounded-md"
                />
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium">Resolve maintenance request</h3>
            <form
              onSubmit={handleSubmit(onFormSubmit)}
              className="mt-4 grid max-w-md grid-cols-2 gap-4 text-sm"
            >
              <Controller
                control={control}
                name="repair_date"
                render={({ field: { value, onChange } }) => (
                  <DatePicker
                    onChange={onChange}
                    pickerProps={{ pickerWrapperStyles: "z-[1]" }}
                    label="Repair Date"
                    placeholder="Repair Time"
                    isError={assertFormError("repair_date")}
                    hint={unwrapFormError("repair_date")}
                    value={(value ?? formState.defaultValues?.repair_date) as any}
                  />
                )}
              />
              <Controller
                control={control}
                name="repair_time"
                render={({ field: { value, onChange } }) => (
                  <Select
                    options={WorkingHoursOptions}
                    placeholder="0:00 am"
                    label="Repair Time"
                    btnClassName="h-14 mt-1"
                    isError={assertFormError("repair_time")}
                    hint={unwrapFormError("repair_time")}
                    onChange={onChange}
                    value={value}
                    defaultValue={value}
                  />
                )}
              />
              <div className="col-span-2">
                <Controller
                  control={control}
                  name="status"
                  render={({ field: { value, onChange } }) => (
                    <Select
                      options={MaintenanceRequestArr}
                      placeholder="Status"
                      label="Update Status"
                      btnClassName="h-14 mt-1"
                      isError={assertFormError("status")}
                      hint={unwrapFormError("status")}
                      onChange={onChange}
                      value={value ?? formState.defaultValues?.status}
                    />
                  )}
                />

                <div className="mt-6 max-w-[150px]">
                  <Button loading={formState.isSubmitting} type="submit">
                    Save
                  </Button>
                </div>
              </div>
            </form>
          </div>
          <div>
            <h3 className="font-medium">Status</h3>
            <div className="mt-4 flex items-center gap-4">
              <Label
                label={formatWord(status.toLowerCase())}
                icon={getMaintenanceRequestStatusIcon(status)}
                type={getMaintenanceRequestStatusType(status)}
                className="px-4 max-md:gap-1 max-md:text-sm md:px-5"
                figureClassName="max-md:max-h-4 max-md:max-w-4"
              />
              <Button
                variant="dark"
                className="flex w-fit gap-1 px-2 max-md:text-xs md:gap-2 md:px-4"
                asChild
              >
                <Link
                  href={{
                    pathname: "/maintenance-request/[requestId]/",
                    query: { view_comments: true, requestId },
                  }}
                >
                  <IconBox
                    size={24}
                    icon="MessageCheckCircle"
                    className="max-md:hidden"
                  />
                  <IconBox size={18} icon="MessageCheckCircle" className="md:hidden" />
                  Add Comments
                  <span></span>
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {assertQuery(view_comments) && (
          <ChatBoxModal
            onClose={handleModalClose}
            onSubmit={setChats}
            chats={chats}
            requestId={String(selectedRequest.id)}
          />
        )}
      </section>
    </DashboardLayout>
  );
}

export default MaintenanceRequestPage;
