import React from "react";
import { Field } from "formik";
import classNames from "classnames";
import FormError from "../FormError";
import FormLabel from "../FormLabel";

const CheckBoxField = ({
  label,
  name,
  isShrink,
  values = [],
  classes,
  alignLabel,
  selectedValues = [],
  setFieldValue,
  errors,
  touched,
}: {
  label: string;
  name: string;
  value?: string;
  selectedValues: string[];
  isShrink?: boolean;
  classes?: string;
  values: any[];
  alignLabel?: boolean;
  setFieldValue?: any;
  errors: any;
  touched: any;
}) => {

  return (
    <div>
      <FormLabel label={label} isShrink={isShrink} />
      <div
        className={classNames(
          "flex  px-4 pb-1 flex-col md:flex-row border-b border-custom-darkgrayfive",
          classes
        )}
      >
        {values.map((item, index) => (
          <label
            htmlFor={item.value}
            key={item.value}
            className="flex text-xs align-middle text-custom-darkgrayfive"
          >
            <Field
              type="checkbox"
              name={`name-${index + 1}`}
              checked={selectedValues.includes(item.value)}
              className="w-4 h-4 mr-2 "
              id={item.value}
              onClick={(e: any) => {
                if (e.target.checked) {
                  setFieldValue([...selectedValues, item.value]);
                } else {
                  setFieldValue(
                    selectedValues.filter((selectedValue) => selectedValue !== item.value)
                  );
                }
              }}
            />
            {item.label}
          </label>
        ))}
        {alignLabel && <div className="w-[190px]"></div>}
      </div>
      {errors[name] && touched[name] ? <FormError msg={errors[name]} isShrink={isShrink} /> : null}
    </div>
  );
};

export default CheckBoxField;
