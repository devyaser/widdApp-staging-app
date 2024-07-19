import clsx from "classnames";
import Button from "../common/Button";
import DaoDetails from "../dashboard/Body/Dao/DaoDetails";

export default function PublishTopicModal({
  topicId,
  open,
  hideModal,
  handlePublishTopic,
}: {
  topicId: string
  open: boolean;
  hideModal: Function;
  handlePublishTopic: () => void;
}) {
  return (
    <div
      className={clsx(
        "modal bg-custom-lightgraythree/90",
        open ? "modal-open" : "invisible"
      )}
    >
      <div className="modal-box px-2 pt-[30px] pb-[90px] bg-custom-lightgraytwo no-scrollbar max-w-[800px]">
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
        <DaoDetails topicId={topicId} inModal />

        <div className="px-5">
          <Button onClick={handlePublishTopic}>Publish Topic</Button>
        </div>
      </div>
    </div>
  );
}
