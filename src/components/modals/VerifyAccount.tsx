import Image from "next/image";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import clsx from "classnames";
import FormField from "../common/FormField";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import { useState } from "react";
import { verifyAccount } from "services/auth.services";

const VerifyAccountSchema = Yup.object().shape({
  code: Yup.string().required("Code is required"),
  userId: Yup.string().required("User Id is missing"),
});

export default function VerifyAccountModal({
  open,
  hideModal,
  userToBeVerified,
  switchLogin,
}: {
  open: boolean;
  hideModal: Function;
  userToBeVerified: IUserToBeVerified;
  switchLogin: Function;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (values: any) => {
    try {
      setIsLoading(true);
      const { code, userId } = values;
      verifyAccount(userId, code)
        .then((res) => {
          toast.success(res.data.message);
          setIsLoading(false);
          switchLogin();
        })
        .catch((err) => {
          toast.error(`${err.response.data.message}`);
          setIsLoading(false)
        });
    } catch (err) {
      setIsLoading(false);
    }
  };

  return (
    <div className={clsx("modal bg-custom-lightgraythree/90", open ? "modal-open" : "invisible")}>
      <div className="modal-box p-5 max-h-fit rounded-none w-full h-full lg:h-fit lg:max-h-[calc(100vh-5em)] lg:rounded lg:px-2 lg:pt-[30px] lg:pb-[90px] bg-custom-contentgray no-scrollbar">
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
        <div className="w-[370px] m-auto">
          <Formik
            initialValues={{
              userId: userToBeVerified.userId,
              code: "",
            }}
            enableReinitialize={true}
            validationSchema={VerifyAccountSchema}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="mb-4">
                  <Image src="/images/logo.png" width={180} height={59} alt="Logo" />
                </div>
                <div className="py-2 text-base font-normal text-white">
                  Need Registration Verification, We have sent verification code to{" "}
                  {userToBeVerified.sendOn}
                </div>
                <div className="mt-5">
                  <FormField
                    label="Enter Code"
                    type="text"
                    name="code"
                    placeholder="Enter code"
                    errors={errors}
                    touched={touched}
                  />
                </div>
                <button
                  type="submit"
                  className="h-[50px] text-lg font-bold rounded-[5px] text-white normal-case btn bg-custom-default hover:bg-custom-default border-custom-default focus:border-custom-default mt-6 w-full"
                >
                  {isLoading && <FaSpinner className="transition duration-1000 animate-spin" />}
                  Verify
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
