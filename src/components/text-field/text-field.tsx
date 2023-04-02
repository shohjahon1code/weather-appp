import React from "react";
import { TextFieldProps } from "./text-field.props";
import { ErrorMessage, FieldHookConfig, useField } from "formik";

const TextField = ({ ...props }: TextFieldProps & FieldHookConfig<string>) => {
  const [field, meta] = useField(props);

  return (
    <div className="inline-block w-full">
      <label
        className={`inline-block w-full `}
        htmlFor="text"
      >
        <input className={`input ${meta.touched && meta.error && "border-red-500 border"
          }`} {...props} {...field} />
      <ErrorMessage  name={field.name} />
      </label>
    </div>
  );
};

export default TextField;