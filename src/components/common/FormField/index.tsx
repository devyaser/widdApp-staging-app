import { Field } from "formik";
import FormError from "../FormError";
import FormLabel from "../FormLabel";

export default function FormField({
  label,
  subLable,
  type,
  name,
  placeholder,
  errors,
  touched,
  isShrink,
  readOnly,
  className,
}: {
  label?: string;
  subLable?: string;
  type: string;
  name: string;
  placeholder?: string;
  errors: any;
  touched: any;
  isShrink?: boolean;
  readOnly?: boolean;
  className?: string;
}) {
  return (
    <div>
      {label || subLable ? (
        <FormLabel label={label as string} subLable={subLable} isShrink={isShrink} />
      ) : null}
      <Field
        type={type}
        name={name}
        className={
          className
            ? className
            : "text-[15px] font-normal h-[23px] field-input input w-full bg-transparent px-0 border-0 border-b border-custom-darkgrayfive focus:outline-none focus:border-b focus:border-custom-darkgrayfive rounded-none text-white"
        }
        placeholder={placeholder}
        readOnly={readOnly}
      />
      {errors[name] && touched[name] ? <FormError msg={errors[name]} isShrink={isShrink} /> : null}
    </div>
  );
}
