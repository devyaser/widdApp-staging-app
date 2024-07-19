import Image from "next/image";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import clsx from "classnames";
import FormField from "../common/FormField";
import { toast } from "react-toastify";
import { FaEnvelope, FaPhoneAlt, FaSpinner } from "react-icons/fa";
import { useState } from "react";
import { registerUser } from "services/auth.services";
// import ReCAPTCHA from "react-google-recaptcha";

const LoginSchema = Yup.object().shape({
  userName: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email"),
  dob: Yup.string()
    .required("Birthday is required")
    .matches(/^([0-9]{2})-([0-9]{2})-([0-9]{4})$/, "Date must be in format mm-dd-yyyy"),
  password: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum."),
  confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Passwords must match"),
  phoneNo: Yup.string().matches(/^[0-9]+$/, "Must be only digits"),
});

export default function SignUpModal({
  open,
  hideModal,
  handleSignUpSuccess,
  switchLogin,
}: {
  open: boolean;
  hideModal: Function;
  handleSignUpSuccess: Function;
  switchLogin: Function;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [captcha, setCaptcha] = useState<string | null>(null);

  const handleSubmit = async (values: any) => {
    const payload: ISignUpBody = {
      userName: values.userName,
      dob: values.dob,
      password: values.password,
      confirmPassword: values.confirmPassword,
    };

    if (isEmail) {
      payload.email = values.email;
    } else {
      payload.phoneNo = values.phoneNo;
    }

    setIsLoading(true);
    const res = registerUser(payload)
      .then((res) => {
        toast.success(res.data.message);
        handleSignUpSuccess({ sendOn: res?.data?.sendOn, userId: res?.data?.id });
        setIsLoading(false);
      })
      .catch((err) => {
        toast.error(err?.response?.data.message);
        setIsLoading(false);
      });
  };

  const onChangeCaptcha = (value: string | null) => {
    setCaptcha(value);
  };

  return (
    <div className={clsx("modal bg-custom-lightgraythree/90", open ? "modal-open" : "invisible")}>
      <div className="modal-box p-5 max-h-fit rounded-none w-full h-full lg:max-h-[calc(100vh-5em)] lg:rounded lg:px-2 lg:pt-[30px] lg:pb-[90px] bg-custom-contentgray no-scrollbar">
        <div className="flex justify-end mb-5">
          <button
            className="h-auto p-0 font-normal text-white lg:hidden btn min-h-fit btn-ghost"
            onClick={(e) => {
              e.preventDefault();
              hideModal();
            }}
          >
            <Image src="/icons/close-mobile.svg" width={25} height={25} alt="Close" />
          </button>
          <button
            className="hidden h-auto p-0 mr-8 font-normal text-white lg:block btn min-h-fit btn-ghost"
            onClick={(e) => {
              e.preventDefault();
              hideModal();
            }}
          >
            <Image src="/icons/close-mobile.svg" width={40} height={40} alt="Close" />
          </button>
        </div>
        <div className="w-full lg:w-[370px] m-auto">
          <Formik
            enableReinitialize
            initialValues={{
              userName: "",
              dob: "",
              password: "",
              confirmPassword: "",
              email: "",
              phoneNo: "",
            }}
            validationSchema={LoginSchema}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ errors, touched, submitCount }) => (
              <Form>
                <div className="mb-4">
                  <Image src="/images/logo.png" width={180} height={59} alt="Logo" />
                </div>
                <div className="py-2 text-base font-normal text-white">
                  Want to start a chat? Register, connect your wallet and buy a NFT to be part of a
                  new chat
                </div>
                <div className="mt-5 space-y-5">
                  <FormField
                    isShrink
                    label="Username"
                    type="text"
                    name="userName"
                    placeholder="Choose your username"
                    errors={errors}
                    touched={touched}
                  />
                  <FormField
                    isShrink
                    label="Your Birthday"
                    type="text"
                    name="dob"
                    placeholder="Enter your birthday mm/dd/yyyy"
                    errors={errors}
                    touched={touched}
                  />
                  <FormField
                    isShrink
                    label="Password"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    errors={errors}
                    touched={touched}
                  />
                  <FormField
                    isShrink
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    placeholder="Retype your password"
                    errors={errors}
                    touched={touched}
                  />
                  {isEmail ? (
                    <FormField
                      isShrink
                      label="Email"
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      errors={errors}
                      touched={touched}
                    />
                  ) : (
                    <FormField
                      isShrink
                      label="Phone Number"
                      type="phoneNo"
                      name="phoneNo"
                      placeholder="Enter your phone number"
                      errors={errors}
                      touched={touched}
                    />
                  )}
                </div>

                <div className="mt-8">
                  <button
                    type="button"
                    className="flex items-center text-custom-default gap-x-2"
                    onClick={() => {
                      setIsEmail(!isEmail);
                    }}
                  >
                    {isEmail ? <FaPhoneAlt /> : <FaEnvelope />}
                    {isEmail ? "Use phone instead" : "User email instead"}
                  </button>
                </div>
                {/* <div className="mt-4">
                  <ReCAPTCHA
                    sitekey={process.env.RECAPTCHA_SITE_KEY ?? ""}
                    onChange={onChangeCaptcha}
                  />
                  {captcha === null && submitCount > 0 && (
                    <div className="mt-1 text-red-500">Please confirm you are not a robot.</div>
                  )}
                </div> */}
                <button
                  type="submit"
                  className="h-[50px] text-lg font-bold rounded-[5px] text-white disabled:bg-custom-default/50 disabled:cursor-not-allowed disabled:text-white normal-case btn bg-custom-default hover:bg-custom-default border-custom-default hover:border-custom-default mt-6 w-full"
                  // disabled={!captcha}
                >
                  {isLoading && <FaSpinner className="transition duration-1000 animate-spin" />}
                  Register
                </button>
                <div className="mt-6 text-base font-normal text-center text-white">
                  Have an account? Login&nbsp;
                  <span
                    className="cursor-pointer text-custom-default"
                    onClick={() => switchLogin()}
                  >
                    here
                  </span>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
