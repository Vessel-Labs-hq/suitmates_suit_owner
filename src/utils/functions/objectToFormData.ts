import FormData from "form-data";

export const objectToFormData = (
  data: object,
  formData = new FormData(),
  parentKey = ""
): FormData => {
  Object.entries(data).forEach(([key, value]) => {
    const formKey = parentKey ? `${parentKey}[${key}]` : key;

    if (value instanceof Date) {
      formData.append(formKey, value.toISOString());
    } else if (Array.isArray(value)) {
      value.forEach((arrayValue, i) => {
        const arrayKey = `${formKey}[${i}]`;

        if (typeof arrayValue === "object" && arrayValue !== null) {
          if (arrayValue instanceof File) {
            formData.append(arrayKey, arrayValue, arrayValue.name);
          } else {
            objectToFormData(arrayValue, formData, arrayKey);
          }
        } else {
          formData.append(arrayKey, arrayValue.toString());
        }
      });
    } else if (typeof value === "object" && value !== null) {
      if (value instanceof File) {
        formData.append(formKey, value, value.name);
      } else {
        objectToFormData(value, formData, formKey);
      }
    } else if (value !== undefined && value !== null) {
      formData.append(formKey, value.toString());
    }
  });

  return formData;
};
