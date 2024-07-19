import Image from "next/image";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import clsx from "classnames";
import FormField from "../common/FormField";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import { useState } from "react";
import {  useDispatch } from "react-redux";
import { setUser } from "store/features/user/userSlice";
import { AppDispatch } from "store/store";
import { loginUser } from "services/auth.services";

const LoginSchema = Yup.object().shape({
  userName: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

export default function LoginModal({
  open,
  hideModal,
  switchRegister,
  switchVerification,
}: {
  open: boolean;
  hideModal: Function;
  switchVerification: Function;
  switchRegister: Function;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch: AppDispatch = useDispatch<AppDispatch>();

  const handleSubmit = (values: any) => {
    const { userName, password } = values;
    setIsLoading(true);
    loginUser({ userName, password })
      .then((res) => {
        if (res?.data?.success === false) {
          toast.error("Account Verification Required");
          setIsLoading(false);
          switchVerification({ sendOn: res?.data?.data?.sendOn, userId: res?.data?.data?.id });
          return;
        }

        if (res?.data?.success === true) {
          dispatch(setUser({ token: res.data.token, user: res.data.user, loading: false }));
          toast.success(res.data.message || "Login Success");
          setIsLoading(false);
          hideModal();
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setIsLoading(false);
      });
  };

  return (
    <div className={clsx("modal bg-custom-lightgraythree/90", open ? "modal-open" : "invisible")}>
      <div className="modal-box p-5 max-h-fit rounded-none w-full h-full lg:max-h-[calc(100vh-5em)] lg:h-fit lg:rounded lg:px-2 lg:pt-[30px] lg:pb-[90px] bg-custom-contentgray no-scrollbar">
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
            initialValues={{
              useName: "",
              password: "",
            }}
            validationSchema={LoginSchema}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="mb-4">
                  <Image src="/images/logo-1-pod.png" width={180} height={59} alt="Logo" />
                </div>
                <div className="py-2 text-lg font-normal text-white">
                  Want to start a chat? Log in, connect your wallet and buy a NFT to be part of a
                  new chat
                </div>
                <div className="mt-5 space-y-5">
                  <FormField
                    isShrink
                    label="Username"
                    type="text"
                    name="userName"
                    placeholder="Enter your your Username"
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
                </div>
                <div className="flex justify-between mt-[18px]">
                  <label className="flex items-center">
                    <input type="checkbox" />
                    <span className="ml-1 text-xs text-custom-darkgrayone">Stay logged in?</span>
                  </label>
                  <span className="text-xs cursor-pointer text-custom-darkgrayone">
                    Forgot password?
                  </span>
                </div>
                <button
                  type="submit"
                  className="h-[50px] text-lg font-bold rounded-[5px] text-white normal-case btn bg-custom-default hover:bg-custom-default border-custom-default focus:border-custom-default mt-6 w-full"
                >
                  {isLoading && <FaSpinner className="transition duration-1000 animate-spin" />}
                  Login
                </button>
                <div className="mt-6 text-base font-normal text-center text-white">
                  Don&apos;t have an account yet? Register{" "}
                  <span
                    className="cursor-pointer text-custom-default"
                    onClick={() => switchRegister()}
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
