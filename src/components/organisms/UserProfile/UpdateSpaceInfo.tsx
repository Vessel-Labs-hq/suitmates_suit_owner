import { SuiteAmenities } from "@/constants";
import onBoardingService from "@/utils/apis/onboarding";
import Alert from "@/utils/base/alerts";
import { UpdateSpaceInfoSchema } from "@/utils/schema/details";
import { type InferSchema } from "@/utils/schema/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Button, Select } from "@the_human_cipher/components-library";
import { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Icons from "@/assets/icons";
import { cn } from "@/utils";

type Inputs = InferSchema<typeof UpdateSpaceInfoSchema>;

const createAmenities = (amenities?: string): string[] => {
  if (!amenities) return [];

  return JSON.parse(amenities);
};

const UpdateSpaceInfo = ({ isEditMode, userProfile }: ProfileProps) => {
  const { register, formState, handleSubmit, control } = useForm<Inputs>({
    resolver: zodResolver(UpdateSpaceInfoSchema),
    mode: "onChange",
    defaultValues: {
      space_name: userProfile.space?.space_name,
      space_address: userProfile.space?.space_address,
      space_size: String(userProfile.space?.space_size ?? ""),
      space_amenities: [],
    },
  });
  const [amenities, setAmenities] = useState(
    createAmenities(userProfile.space?.space_amenities) ?? []
  );

  const handleCloseAmenities = (
    index: number,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    const updatedAmenities = amenities.filter((_, i) => i !== index);
    setAmenities(updatedAmenities);

    const updatedLabels = closeAmenities.slice(); // create a shallow copy
    updatedLabels.splice(index, 1); // remove the element at the specified index
    setCloseAmenities(updatedLabels);
  };

  const onFormSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const { space_name, space_address, space_size } = data;
      const updatedData = {
        space_name,
        space_address,
        space_size,
        space_amenities: amenities,
      };

      const res = await onBoardingService.updateSpace(updatedData);
      if (res) {
        Alert.success("Space information updated successfully");
      }
    } catch (error) {
      Alert.error(error);
    }
  };

  const getFormError = (key: keyof Inputs) => {
    const err = formState.errors[key]?.message;
    return err ? String(err) : undefined;
  };

  const assertError = (key: keyof Inputs): boolean => {
    return Boolean(formState.errors[key]?.message);
  };

  const { isSubmitting: isLoading } = formState;

  return (
    <section>
      <div className="my-4 mt-16">
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <div className="mx-auto max-w-[1180px]">
            <div className="mt-12">
              <span className="text-base font-bold text-[#333333]">
                Space Information
              </span>
            </div>
            <div className="mt-10 grid gap-x-28 gap-y-6 md:grid-cols-2 md:gap-y-10">
              <label>
                Space Name
                <Input
                  key={"space_name"}
                  className="py-3"
                  {...register("space_name")}
                  hint={getFormError("space_name")}
                  isError={Boolean(getFormError("space_name"))}
                  disabled={isEditMode}
                />
              </label>

              <Controller
                control={control}
                name="space_amenities"
                render={({ field: { value, onChange, ...rest } }) => (
                  <>
                    <div>
                      <Select
                        {...rest}
                        listbox-disabled={isEditMode}
                        options={SuiteAmenities}
                        label="Space amenities"
                        placeholder="Select..."
                        onChange={(amenity) => {
                          const amenitiesArr = amenity.map((ele) => ({
                            label: ele,
                            value: ele,
                          }));

                          onChange(amenitiesArr);
                          setAmenities(amenitiesArr);
                          // setCloseAmenities(new Array(e.length).fill(true)); // Update closeAmenities when amenities change
                        }}
                        value={amenities}
                        multiple
                        isError={assertError("space_amenities")}
                        hint={getFormError("space_amenities")}
                        hideMultipleSelectedValue
                      />
                    </div>
                  </>
                )}
              />

              <label>
                Space Address
                <Input
                  key={"space_address"}
                  className="py-3"
                  {...register("space_address")}
                  hint={getFormError("space_address")}
                  isError={Boolean(getFormError("space_address"))}
                  disabled={isEditMode}
                />
              </label>

              <div className="relative flex flex-wrap items-center justify-center gap-x-4 gap-y-4 text-center md:justify-start md:gap-x-2">
                {amenities.map((amenity, index: number) => (
                  <label
                    key={index}
                    className="flex h-8 items-center justify-center rounded-lg bg-[#E8E8E8] px-3 py-2"
                  >
                    {amenity}
                    <button
                      type="button"
                      className="mx-3"
                      onClick={() => handleCloseAmenities(index)}
                      disabled={isEditMode}
                    >
                      {Icons.XClose}
                    </button>
                  </label>
                ))}
              </div>
            </div>
            <div className="mt-8 flex justify-end">
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

export default UpdateSpaceInfo;
