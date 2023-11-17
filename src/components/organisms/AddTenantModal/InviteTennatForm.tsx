import { getFormStateError } from "@/utils";
import tenantAPI from "@/utils/apis/tenant";
import Alert from "@/utils/base/alerts";
import { InferSchema } from "@/utils/schema/helpers";
import { InviteTenantSchema } from "@/utils/schema/tenant";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@the_human_cipher/components-library";
import { SubmitHandler, useForm } from "react-hook-form";
import { useQueryClient } from "react-query";

type Inputs = InferSchema<typeof InviteTenantSchema>;

interface Props {
  onSubmit(): void;
}

const InviteTenantForm = ({ onSubmit }: Props) => {
  const queryClient = useQueryClient();

  const { handleSubmit, register, formState } = useForm<Inputs>({
    mode: "onChange",
    resolver: zodResolver(InviteTenantSchema),
  });

  const onFormSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await tenantAPI.inviteTenant(data);

      if (res) {
        Alert.success("Invite has been sent to tenant");
        queryClient.invalidateQueries({ queryKey: ["get-all-tenants"] });
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
      <Button type="submit" loading={formState.isSubmitting}>
        Add
      </Button>
    </form>
  );
};

export default InviteTenantForm;
