import type { FieldErrors, FieldValues } from "react-hook-form";
import Alert from "../base/alerts";

export const onFormError = <T extends FieldValues>(error: FieldErrors<T>) => {
  const keys = Object.keys(error);

  if (keys) {
    Alert.error("You have one or more incomplete fields");
  }
};
