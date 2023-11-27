import onBoardingService from "@/utils/apis/onboarding";
import Alert from "@/utils/base/alerts";
import { AccountInoSchema } from "@/utils/schema/details";
import { type InferSchema } from "@/utils/schema/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import { Title, Text, Input, Button } from "@the_human_cipher/components-library";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = InferSchema<typeof AccountInoSchema>;

type Name = keyof Inputs;

/**
 * totally useless codes, just wanted to do some ts magic
 */
type Label = {
  [Key in Name]: Key extends `account_${infer A}` ? `Account ${A}` : Key;
}[Name];

type Field = {
  name: Name;
  label: LoosenString<Label>;
};

const fields: Field[] = [
  {
    name: "account_number",
    label: "Account Number",
  },
  {
    name: "routing_number",
    label: "Routing Number",
  },
];

const UpdateAccountInfo = ({ isEditMode, setIsEditMode, userProfile }: ProfileProps) => {
  const { register, formState, handleSubmit } = useForm<Inputs>({
    resolver: zodResolver(AccountInoSchema),
    mode: "onChange",
    values: userProfile.space,
  });

  const onFormSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await onBoardingService.updateAccountDetails({
        accountDetails: data,
      });
      console.log("response", res);

      if (res) {
        Alert.success("Account updated successfully");
      }
    } catch (error) {
      Alert.error(error);
    }
  };

  const getFormError = (key: keyof Inputs) => {
    const err = formState.errors[key]?.message;
    return err ? String(err) : undefined;
  };

  const { isSubmitting: isLoading } = formState;

  return (
    <section>
      <div className="my-4 mt-16">
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <div className="mx-auto max-w-[1180px]">
            <div className="mt-12">
              <span className="text-base font-bold text-[#333333]">Bank Details</span>
            </div>
            <div className="mt-10 grid gap-x-28 gap-y-6 md:grid-cols-2 md:gap-y-10">
              {fields.map((field) => (
                <Input
                  {...field}
                  key={field.name}
                  className="py-3"
                  {...register(field.name)}
                  hint={getFormError(field.name)}
                  isError={Boolean(getFormError(field.name))}
                  disabled={isEditMode}
                />
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <Button
                className={`h-16 w-28 rounded-xl ${
                  isEditMode
                    ? "cursor-not-allowed bg-[#f9f7f7]"
                    : "bg-green-500 hover:bg-green-600"
                } text-lg font-medium text-white`}
                disabled={isEditMode}
                type="submit"
                loading={isLoading}
              >
                Save
              </Button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UpdateAccountInfo;
