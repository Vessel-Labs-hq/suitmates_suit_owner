import { getFormStateError } from "@/utils";
import tenantAPI from "@/utils/apis/tenant";
import Alert from "@/utils/base/alerts";
import { InferSchema } from "@/utils/schema/helpers";
import { AttachTenantSchema } from "@/utils/schema/tenant";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Select } from "@the_human_cipher/components-library";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useQueryClient } from "react-query";

type Inputs = InferSchema<typeof AttachTenantSchema>;

interface Props {
  onSubmit(): void;
  suites: SelectData<SN>[];
  email: string;
  isReassign?: boolean;
  tenantId: SN;
}

const AttachSuiteForm = ({ onSubmit, suites, email, isReassign, tenantId }: Props) => {
  const queryClient = useQueryClient();

  const { handleSubmit, control, formState } = useForm<Inputs>({
    mode: "onChange",
    resolver: zodResolver(AttachTenantSchema),
    defaultValues: {
      email,
    },
  });

  const onFormSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      if (!isReassign) {
        await tenantAPI.addTenant(data);
      } else {
        await tenantAPI.changeSuite({
          suiteId: data.suite_id.value,
          tenantId,
        });
      }

      queryClient.invalidateQueries({ queryKey: ["get-all-tenants"] });
      Alert.success("Tenant added to suite");
      onSubmit();
    } catch (error) {
      Alert.error(error);
    }
  };

  const Label = isReassign
    ? "Select the new suite they should occupy"
    : "Select the suite they should occupy";

  const { unwrapFormError, assertFormError } = getFormStateError(formState);

  return (
    <form
      className="w-full space-y-6 max-md:text-sm"
      onSubmit={handleSubmit(onFormSubmit)}
    >
      <Controller
        control={control}
        name="suite_id"
        render={({ field: { onChange, value } }) => (
          <Select
            options={suites}
            onChange={onChange}
            defaultValue={value}
            label={isReassign ? "Select New Suite" : "Assign Suite Space"}
            placeholder="Select..."
            hint={unwrapFormError("suite_id") ?? Label}
            isError={assertFormError("suite_id")}
          />
        )}
      />

      <Button type="submit" loading={formState.isSubmitting}>
        {isReassign ? "Reassign" : "Add"}
      </Button>
    </form>
  );
};

export default AttachSuiteForm;
