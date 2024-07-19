import Image from "next/image";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import clsx from "classnames";
import FormField from "../common/FormField";
import { signIn } from "next-auth/client";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import { useState } from "react";

const ChannelSchema = Yup.object().shape({
  channel: Yup.string().required("Channel name is required"),
});

export default function CreateChannelModal({
  open,
  hideModal,
}: {
  open: boolean;
  hideModal: Function;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values: any) => {
    // const { email, password } = values;
    // setIsLoading(true);
    // const result = await signIn("credentials", {
    //   redirect: false,
    //   email,
    //   password,
    // });
    // if (!result) {
    //   return;
    // }
    // if (!result.error) {
    //   //set some auth state
    //   // await getSession().then((session) => {
    //   //   setIsLoading(false);
    //   //   if (session) {
    //   //     // const reduxStore = initializeStore();
    //   //     // const { dispatch } = reduxStore;
    //   //     try {
    //   //       setUser(session.user);
    //   //       // dispatch({
    //   //       //   type: "SET_USER",
    //   //       //   user: session.user,
    //   //       // });
    //   //       setTimeout(() => {
    //   //         router.replace("/");
    //   //       }, 3000);
    //   //     } catch (err) {
    //   //       console.log("no user to dispatch");
    //   //     }
    //   //   }
    //   // });
    //   hideModal();
    //   toast.success(`you have been logged in!`);
    //   setIsLoading(false);
    // } else {
    //   if (result.error === "CredentialsSignin") {
    //     toast.error("Email or password is incorrect.");
    //   }
    //   setIsLoading(false);
    // }
  };

  return (
    <div className={clsx("modal bg-custom-lightgraythree/90", open ? "modal-open" : "invisible")}>
      <div className="modal-box px-2 pt-[30px] pb-[90px] bg-custom-contentgray no-scrollbar">
        <div className="flex justify-end mb-5 mr-[30px]">
          <button
            className="btn btn-sm min-h-fit font-normal btn-circle btn-ghost text-white text-[48px]"
            onClick={(e) => {
              e.preventDefault();
              hideModal();
            }}
          >
            ✕
          </button>
        </div>
        <div className="w-[370px] m-auto">
          <Formik
            initialValues={{
              channel: "",
            }}
            validationSchema={ChannelSchema}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="mb-4">
                  <Image src="/images/logo.png" width={180} height={59} alt="Logo" />
                </div>
                <div className="text-white font-normal text-base py-2">
                  Want to start a chat? Type your channel name to create.
                </div>
                <FormField
                  label="Channel Name"
                  type="text"
                  name="channel"
                  placeholder="Enter your channel name"
                  errors={errors}
                  touched={touched}
                />
                <button
                  type="submit"
                  className="text-white normal-case btn bg-custom-default hover:bg-custom-default border-custom-default focus:border-custom-default mt-6 w-full"
                >
                  {isLoading && <FaSpinner className="animate-spin transition duration-1000" />}
                  Create
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
