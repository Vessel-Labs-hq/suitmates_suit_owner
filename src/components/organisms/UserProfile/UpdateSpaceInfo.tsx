import { SuiteAmenities } from "@/constants";
import onBoardingService from "@/utils/apis/onboarding";
import Alert from "@/utils/base/alerts";
import { SpaceInfoSchema, UpdateSpaceInfoSchema } from "@/utils/schema/details";
import { type InferSchema } from "@/utils/schema/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import { Title, Text, Input, Button, Select } from "@the_human_cipher/components-library";
import { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Icons from "@/assets/icons";

type Inputs = InferSchema<typeof UpdateSpaceInfoSchema>;

type Name = keyof Inputs;

/**
 * totally useless codes, just wanted to do some ts magic
 */
type Label = Name extends `space_${infer A}` ? `Space ${Capitalize<A>}` : Name;

type Field = {
  name: Name;
  label: LoosenString<Label>;
  placeholder: LoosenString<`Enter ${Lowercase<Label>}`>;
};

const fields: Field[] = [
  {
    name: "space_name",
    label: "Space Name",
    placeholder: "Enter space name",
  },
  {
    name: "space_address",
    label: "Space Address",
    placeholder: "Enter space address ",
  },
  {
    name: "space_size",
    label: "Space Size (sq. ft.)",
    placeholder: "Enter space size ",
  },
];

const UpdateSpaceInfo = ({ isEditMode, setIsEditMode, userProfile }: ProfileProps) => {
  const { register, formState, handleSubmit, control, watch } = useForm<Inputs>({
    resolver: zodResolver(UpdateSpaceInfoSchema),
    mode: "onChange",
    values: {
      space_name: userProfile.space?.space_name as string,
      space_address: userProfile.space?.space_address as string,
      space_size: "",
      space_amenities: [],
    },
  });
  const [amenities, setAmenities] = useState<any[]>(
    JSON.parse(userProfile.space?.space_amenities as string) ?? []
  );

  const [closeAmenities, setCloseAmenities] = useState<boolean[]>(
    new Array(amenities.length).fill(true)
  );

  const handleCloseAmenities = (index: number, event: React.MouseEvent<HTMLButtonElement>) => {
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
      console.log("space response", res);
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
        <form onSubmit={handleSubmit(onFormSubmit, (error) => console.log(error))}>
          <div className="mx-auto max-w-[1180px]">
            <div className="mt-12">
              <span className="text-base font-bold text-[#333333]">Space Information</span>
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
                        options={SuiteAmenities}
                        label="Space amenities"
                        placeholder="Select..."
                        onChange={(e) => {
                          onChange(e);
                          setAmenities(e);
                          setCloseAmenities(new Array(e.length).fill(true)); // Update closeAmenities when amenities change
                        }}
                        value={amenities}
                        multiple
                        isError={assertError("space_amenities")}
                        hint={getFormError("space_amenities")}
                        hideMultipleSelectedValue
                        multipleSelectedLabel={
                          <span className="lowercase first-letter:uppercase">
                            Selected +{amenities?.length} option(s)
                          </span>
                        }
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
                {amenities.map(
                  (amenity: any, index: number) =>
                    closeAmenities[index] && (
                      <label
                        key={index}
                        className="flex h-8 items-center justify-center rounded-lg bg-[#E8E8E8] px-3 py-2"
                      >
                        {amenity.label}
                        <button
                          className="mx-3"
                          onClick={(event) => handleCloseAmenities(index, event)}
                          disabled={isEditMode}
                        >
                          {Icons.XClose}
                        </button>
                      </label>
                    )
                )}
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <Button
                className={`h-16 w-28 rounded-xl ${
                  isEditMode ? "cursor-not-allowed bg-[#f9f7f7]" : "bg-green-500 hover:bg-green-600"
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
