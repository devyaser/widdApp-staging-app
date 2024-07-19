import { useRef, useState } from "react";
import FormError from "../FormError";
import FormLabel from "../FormLabel";
import { directUpload, getPreSignedUrl } from "services/upload.services";
import { AxiosResponse } from "axios";

export default function UploadFiles({
  label,
  name,
  placeholder,
  errors,
  touched,
  isShrink,
  setFieldValue,
  onUploadComplete,
}: {
  label: string;
  name: string;
  placeholder: string;
  errors?: any;
  touched?: any;
  isShrink?: boolean;
  setFieldValue: any;
  onUploadComplete?: any;
}) {
  const ref = useRef<any>();
  const [selectedFile, setSelectedFile] = useState<any>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e?.target?.files[0]);
      setFieldValue(name, e?.target?.files[0]);
      getPreSignedUrl(e?.target?.files[0].name)
        .then((res: AxiosResponse) => {
          const singedUrl = res?.data?.data?.signedUrl;
          const objectUrl = res?.data?.data?.objectUrl;

          directUpload(singedUrl, e?.target?.files?.[0] as File)
            .then((res) => {
              onUploadComplete?.(objectUrl);
            })
            .catch((err) => console.log("err", err));
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  };

  return (
    <div>
      <FormLabel label={label} isShrink={isShrink} />
      <input
        value={selectedFile?.name}
        name={name}
        placeholder="Choose file"
        className="text-[15px] font-normal h-[23px] field-input input w-full bg-transparent px-0 border-0 border-b border-custom-darkgrayfive focus:outline-none focus:border-b focus:border-custom-darkgrayfive rounded-none text-white"
        onClick={() => ref?.current?.click()}
      />
      <input
        type={"file"}
        name={name}
        className="hidden "
        onChange={handleChange}
        placeholder={placeholder}
        ref={ref}
      />
      {errors[name] && touched[name] ? <FormError msg={errors[name]} isShrink={isShrink} /> : null}
    </div>
  );
}
