import clsx from "classnames";
import Button from "../../../../common/Button";
import FormField from "@/components/common/FormField";
import * as Yup from "yup";
import { Formik, Form } from "formik";

export default function CreateListModal({
  open,
  hideModal,
  onSubmit,
  loading
}: {
  open: boolean;
  hideModal: () => void;
  onSubmit: (values: string) => void;
  loading: boolean
}) {
  const ListCreateSchema = Yup.object().shape({
    listName: Yup.string().required("List name is required"),
  });

  return (
    <div
      className={clsx(
        "modal bg-custom-lightgraythree/90",
        open ? "modal-open" : "invisible"
      )}
    >
      <div className="modal-box px-8 pt-[30px] pb-[30px] bg-custom-lightgraytwo no-scrollbar max-w-[800px]">
        <div className="flex justify-end mb-5">
          <button
            className="btn font-normal btn-circle btn-ghost text-white text-[48px]"
            onClick={(e) => {
              e.preventDefault();
              hideModal();
            }}
          >
            ✕
          </button>
        </div>
        <div>
          <Formik
            initialValues={{
              listName: "",
            }}
            validationSchema={ListCreateSchema}
            onSubmit={(values: any) => onSubmit(values.listName)}
            className="w-full"
          >
            {({
              errors,
              touched,
            }: {
              errors: any;
              touched: any;
              values: any;
              setFieldValue: any;
            }) => (
              <div className="w-full">
                <Form>
                  <div className="flex flex-col gap-1 md:items-baseline md:flex-row ">
                    <label className="flex-[0.4] text-[13px] font-bold">
                      List Name
                    </label>
                    <div className="flex flex-col flex-1">
                      <FormField
                        type="text"
                        name="listName"
                        placeholder="List Name"
                        errors={errors}
                        touched={touched}
                        className="w-full outline-none border border-white text-[13px] text-black bg-custom-darkgrayfour px-3 rounded-[5px] p-1 h-[32px]"
                        isShrink
                      />
                      <div className="text-xs pt-1">
                        Please add a name for the list
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 flex justify-end items-center">
                    <Button type="submit" variant="dark" isLoading={loading}>
                      Save Changes
                    </Button>
                  </div>
                </Form>
              </div>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
