import React, { useEffect } from "react";
import { Field } from "formik";
import classNames from "classnames";
import FormError from "../FormError";
import FormLabel from "../FormLabel";

const RadioFields = ({
  label,
  name,
  isShrink,
  values = [],
  classes,
  alignLabel,
  selectedValue,
  setFieldValue,
  errors,
  touched,
  setOptionSelectedFromCustom,
}: {
  label: string;
  name: string;
  value?: string;
  selectedValue?: string;
  isShrink?: boolean;
  classes?: string;
  values: any[];
  alignLabel?: boolean;
  setFieldValue?: any;
  errors: any;
  touched: any;
  setOptionSelectedFromCustom?: any;
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
        {values.map((item, i) => (
          <label
            key={i}
            className="flex text-xs align-middle text-custom-darkgrayfive"
          >
            <Field
              type="radio"
              name={name}
              value={item.value}
              className="w-4 h-4 mr-2 "
            />
            {item.name}

            {item.customOptions?.length > 0 && (
              <div className="pl-1">
                :
                <select
                  className="bg-transparent outline-none text-custom-darkgrayfive"
                  disabled={selectedValue !== "chooseFromList"}
                  onChange={(e) => {
                    setFieldValue("chooseFromList", e.target.value);
                    setOptionSelectedFromCustom(e.target.value)
                  }}
                >
                  {item.customOptions.map((option: any, i: number) => (
                    <option
                      key={i}
                      value={option.value}
                      className="bg-custom-darkgrayfour"
                    >
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </label>
        ))}
        {alignLabel && <div className="w-[190px]"></div>}
      </div>
      {errors[name] && touched[name] ? (
        <FormError msg={errors[name]} isShrink={isShrink} />
      ) : null}
    </div>
  );
};

export default RadioFields;
