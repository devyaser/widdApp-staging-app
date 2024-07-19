import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import FormField from "../../../../../components/common/FormField";
import RadioFields from "../../../../../components/common/RadioField";
import UploadFiles from "../../../../common/UploadFiles";

import CheckBoxField from "@/components/common/CheckBox";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { updateTopic } from "services/topics.services";
import {
  addNewTopicAsync,
  getOwnedTopicsAsync,
} from "store/features/topics/topics";
import { useAppDispatch } from "store/store";
import { TOPIC_STATUS } from "utils/common";
import * as Yup from "yup";
import Button from "../../../../../components/common/Button";
import {
  WalletConnectModal,
  WalletQRModal,
} from "../../../../../components/modals";
import PublishTopicModal from "../../../../../components/modals/PublishTopic";
import { toast } from "react-toastify";
import { getAllUsersLists } from "services/list.services";
const Editor = dynamic(() => import("@/components/common/Editor"), {
  ssr: false,
});

const TopicSchema = Yup.object().shape({
  topicName: Yup.string().required("Topic name is required"),
  topicRules: Yup.string().required("Topic rules are required"),
  mainDescription: Yup.string().required("Main description is required"),
  audience: Yup.string().required("Select any one"),
});

const DaoTab = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [walletQRModalOpen, setWalletQRModalOpen] = useState(false);
  const [walletConnectModalOpen, setWalletConnectModalOpen] = useState(false);
  const [publishTopicModalOpen, setPublishTopicModalOpen] = useState(false);
  const [content, setContent] = useState<string>("");
  const dispatch = useAppDispatch();
  const [uploadedTopicId, setUploadedTopicId] = useState<string>("");
  const [usersList, setUsersList] = useState<IList[]>([]);
  const [usersListLoading, setUsersListLoading] = useState<boolean>(false);
  const [selectedList, setSelectedList] = useState<string | null>(null);

  const handleSubmit = async (values: any) => {
    try {
      setIsLoading(true);
      const newValues = {
        ...values,
        mainDescription: content,
      };
      if (values.audience === "chooseFromList") {
        newValues.audience = "DAO_LIST";
        newValues.daoListId = selectedList;
      } else {
        newValues.audience = values.audience;
      }

      const { payload } = await dispatch(addNewTopicAsync({ topic: newValues }));
      setUploadedTopicId(payload._id as string);
      setPublishTopicModalOpen(true);
      // setWalletQRModalOpen(true);
      setIsLoading(false);
    } catch (error: any) {
      toast.error(error.message);
      setIsLoading(false);
      console.log("error", error);
    }
  };

  const router = useRouter();

  useEffect(() => {
    setUsersListLoading(true);
    getAllUsersLists()
      .then((res) => {
        setUsersList(res?.data?.data as IList[]);
        setUsersListLoading(false);
      })
      .catch((err) => {
        setUsersListLoading(false);
        toast.error(err?.response?.data?.message);
      });
  }, []);

  const handlePublishTopic = () => {
    console.log(uploadedTopicId, "uploaded TOPic IDDD");
    updateTopic({ topicId: uploadedTopicId, status: TOPIC_STATUS.PUBLISHED })
      .then((_res) => {
        setUpdateLoading(true);
        setPublishTopicModalOpen(false);
        setUpdateLoading(false);
        dispatch(getOwnedTopicsAsync());
        router.push(`?type=dao_details&id=${uploadedTopicId}`);
      })
      .catch((_err) => {
        setUpdateLoading(false);
      });
  };

  useEffect(()=> {
    if(!selectedList && usersList?.length> 0){
      setSelectedList(usersList[0]._id)
    }
  }, [usersList])

  return (
    <div className="mt-5">
      <div className="text-[16px] font-bold line-clamp-1">
        Let’s get you ready to chat. What’s a topic you like to start?
      </div>
      <div className="text-[13px] font-medium text-custom-darkgrayfour line-clamp-1">
        Botrix charges xx% to start a topic and xx% from the donation/ upvotes
        and xx% to mint
      </div>
      <div className="mt-3">
        <div className=" bg-custom-lightgrayone py-5 px-4 rounded-md no-scrollbar">
          <Formik
            initialValues={{
              topicName: "",
              topicRules: "",
              mainDescription: "",
              uploadImagesUrl: [],
              audience: "",
            }}
            validationSchema={TopicSchema}
            onSubmit={(values: any) => handleSubmit(values)}
          >
            {({
              errors,
              touched,
              values,
              setFieldValue,
            }: {
              errors: any;
              touched: any;
              values: any;
              setFieldValue: any;
            }) => (
              <Form>
                <div className="space-y-5">
                  <FormField
                    label="Topic"
                    type="text"
                    name="topicName"
                    placeholder="Enter your topic"
                    errors={errors}
                    touched={touched}
                    isShrink
                  />
                  <FormField
                    label="Topic Rules"
                    type="text"
                    name="topicRules"
                    placeholder="Enter rules"
                    errors={errors}
                    touched={touched}
                    isShrink
                  />

                  <Editor
                    getHTML={(content: string) => {
                      setFieldValue("mainDescription", content);
                      setContent(content);
                    }}
                    values={values}
                    setFieldValue={setFieldValue}
                  />

                  {/* <FormField
                    label="Generate"
                    subLable="Verified smart contract address"
                    type="text"
                    name="contratcAddress"
                    placeholder="Smart contract address"
                    errors={errors}
                    touched={touched}
                    readOnly
                    isShrink
                  /> */}

                  <RadioFields
                    label="Audience"
                    name="audience"
                    classes="justify-between"
                    selectedValue={values?.audience}
                    setFieldValue={setFieldValue}
                    setOptionSelectedFromCustom={(value: string)=> setSelectedList(value)}
                    errors={errors}
                    touched={touched}
                    isShrink
                    values={[
                      { name: "Public", value: "PUBLIC" },
                      { name: "Followed", value: "FOLLOWED" },
                      {
                        name: "Choose From List",
                        value: "chooseFromList",
                        customOptions: usersList?.map((item) => {
                          return { name: item.name, value: item._id };
                        }),
                      },
                    ]}
                  />
                  {/* <CheckBoxField
                    label="Type"
                    name="type"
                    classes="justify-between"
                    isShrink
                    // alignLabel
                    selectedValues={values.type}
                    setFieldValue={(selectedValues: string[]) => {
                      console.log("values in parent", selectedValues);
                      setFieldValue("type", selectedValues, false);
                    }}
                    errors={errors}
                    touched={touched}
                    values={[
                      { label: "DAO", value: "DAO" },
                      { label: "NFT", value: "NFT" },
                      { label: "Chat", value: "CHAT" },
                    ]}
                  /> */}
                </div>

                <Button isLoading={isLoading} type="submit">
                  Connect Wallet
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <WalletQRModal
        open={walletQRModalOpen}
        hideModal={() => {
          setWalletConnectModalOpen(true);
          setWalletQRModalOpen(false);
        }}
      />

      <WalletConnectModal
        open={walletConnectModalOpen}
        hideModal={() => setWalletConnectModalOpen(false)}
        handleConnectWallet={() => {
          setWalletConnectModalOpen(false);
          setPublishTopicModalOpen(true);
        }}
      />

      <PublishTopicModal
        topicId={uploadedTopicId}
        open={publishTopicModalOpen}
        hideModal={() => setPublishTopicModalOpen(false)}
        handlePublishTopic={handlePublishTopic}
      />
    </div>
  );
};

export default DaoTab;
