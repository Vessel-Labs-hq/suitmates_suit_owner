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
}

const AttachSuiteForm = ({ onSubmit, suites, email }: Props) => {
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
      await tenantAPI.addTenant(data);
      queryClient.invalidateQueries({ queryKey: ["get-all-tenants"] });
      Alert.success("Tenant added to suite");

      onSubmit();
    } catch (error) {
      Alert.error(error);
    }
  };

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
            label="Assign Suite Space"
            placeholder="Select..."
            hint={unwrapFormError("suite_id") ?? "Select the suite they occupy"}
            isError={assertFormError("suite_id")}
          />
        )}
      />

      <Button type="submit" loading={formState.isSubmitting}>
        Add
      </Button>
    </form>
  );
};

export default AttachSuiteForm;
