import { getFormStateError } from "@/utils";
import tenantAPI from "@/utils/apis/tenant";
import Alert from "@/utils/base/alerts";
import { InferSchema } from "@/utils/schema/helpers";
import { AddTenantByInviteSchema } from "@/utils/schema/tenant";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Select } from "@the_human_cipher/components-library";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type Inputs = InferSchema<typeof AddTenantByInviteSchema>;

interface Props {
  onSubmit(): void;
  suites: SelectData<SN>[];
}

const InviteTenantForm = ({ onSubmit, suites }: Props) => {
  const { handleSubmit, register, control, formState } = useForm<Inputs>({
    mode: "onChange",
    resolver: zodResolver(AddTenantByInviteSchema),
  });

  const onFormSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await tenantAPI.inviteTenant(data);

      if (res) {
        await tenantAPI.addTenant(data);
        Alert.success("Tenant added successfully");
        onSubmit();
      }
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
      <Input
        placeholder="Please enter tenant email"
        {...register("email")}
        label="Tenant Email Address"
        hint={unwrapFormError("email")}
        isError={assertFormError("email")}
      />
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

export default InviteTenantForm;
