import * as React from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
// import Headers from "./Header";
import "./styles.css";

let renderCount = 0;

const fieldArrayName = "array";

const Display = ({ control, index }: any) => {
  const data = useWatch({
    control,
    name: `${fieldArrayName}.${index}`,
  });

  if (!data?.firstName) return null;

  return (
    <div>
      <h3>Submitted Data</h3>
      <p>
        {data?.firstName} {data?.lastName}
      </p>
      <p>{Boolean(data?.working) && data?.working && "I am working."}</p>
    </div>
  );
};

const Edit = ({ update, index, value, control }: any) => {
  const { register, handleSubmit } = useForm({
    defaultValues: value,
  });

  return (
    <div>
      {/* <Display control={control} index={index} /> */}

      <input
        placeholder="first name"
        {...register(`firstName`, { required: true })}
      />
      <input
        placeholder="last name"
        {...register(`lastName`, { required: true })}
      />
      <label>
        Are you working?
        <input type="checkbox" {...register(`working`)} />
      </label>

      <button
        type="button"
        onClick={handleSubmit((data) => {
          update(index, data);
        })}
      >
        Submit
      </button>
    </div>
  );
};

export default function App() {
  const { control, handleSubmit } = useForm();
  const { fields, append, update, remove } = useFieldArray({
    control,
    name: fieldArrayName,
    // defaultValues: {
    //   [fieldArrayName]: [] as any,
    // },
  });
  const onSubmit = (data: any) => console.log(data);
  renderCount++;

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <fieldset key={field.id}>
            <Edit
              control={control}
              update={update}
              index={index}
              value={field}
            />
            <button
              className="remove"
              type="button"
              onClick={() => remove(index)}
            >
              Remove
            </button>
          </fieldset>
        ))}

        <br />

        <button
          type="button"
          onClick={() => {
            append({
              firstName: "",
              lastName: "",
              working: false,
            });
          }}
        >
          append
        </button>
        <input type="submit" />
      </form>
    </div>
  );
}
