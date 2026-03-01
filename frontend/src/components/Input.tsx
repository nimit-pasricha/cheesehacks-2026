import type { PT_classname } from "../types";
import { forwardRef } from "react";
import { jcn } from "../utility";

type PT_baseInput = React.InputHTMLAttributes<HTMLInputElement> & PT_classname;

const baseInputStyles = `
  w-full
  rounded-lg
  border
  border-gray-300
  bg-secondary
  px-3
  py-2
  text-sm
  sm:text-base
  outline-none
  transition
  focus:border-accent
  focus:ring-2
  focus:ring-accent
  disabled:opacity-50
  disabled:cursor-not-allowed
`;

export const NumberInput = forwardRef<HTMLInputElement, PT_baseInput>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type="number"
        inputMode="numeric"
        pattern="[0-9]*"
        className={jcn(baseInputStyles, className)}
        {...props}
      />
    );
  },
);

export const TextInput = forwardRef<HTMLInputElement, PT_baseInput>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type="text"
        className={jcn(baseInputStyles, className)}
        {...props}
      />
    );
  },
);

type MultilineTextInputProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const MultilineTextInput = forwardRef<
  HTMLTextAreaElement,
  MultilineTextInputProps
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={`w-full min-h-30 p-3 border rounded-md resize-y focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
      {...props}
    />
  );
});

type FileUploadProps = React.InputHTMLAttributes<HTMLInputElement>;
export const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type="file"
        className={`block w-full text-sm file:mr-4 file:py-2 file:px-4 
      file:rounded-md file:border-0 
      file:bg-accent file:text-white 
      hover:file:bg-accent/80 ${className}`}
        {...props}
      />
    );
  },
);
