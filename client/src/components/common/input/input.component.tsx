import React, { ReactNode } from "react";
import { FormikTouched, FormikErrors, FormikValues } from "formik";
import { cn } from "../../../utils";
interface Props extends React.InputHTMLAttributes<HTMLInputElement>{
   touched?: boolean | FormikTouched<FormikValues> | FormikTouched<FormikValues>[] | undefined;
   error?: string | string[] | FormikErrors<FormikValues> | FormikErrors<FormikValues>[] | undefined;
}

export const Input = (props: Props) => {
  const { type, name, onChange, value, className, placeholder, touched, error, ...rest } = props
  return (
    <>
      <input
        className={cn(
          "w-full bg-transparent px-[3.5px] py-3 text-md",
          className,
        )}
        type={type}
        name={name}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        {...rest}
      />
      {touched && error ? (
        <div className="text-red-600">{error as ReactNode}</div>
      ) : null}
    </>
  );
}