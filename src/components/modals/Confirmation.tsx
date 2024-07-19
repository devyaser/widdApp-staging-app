import Image from "next/image";
import clsx from "classnames";
import Button from "../common/Button";

export default function ConfirmationModal({
  text,
  open,
  handleCancel,
  handleConfirm,
}: {
  text: string;
  open: boolean;
  handleCancel: Function;
  handleConfirm: Function;
}) {
  return (
    <div
      className={clsx(
        "modal bg-custom-lightgraythree/90",
        open ? "modal-open" : "invisible"
      )}
    >
      <div className="modal-box px-2  bg-custom-lightgraytwo no-scrollbar max-w-[400px]  lg:max-w-[500px]">
        <div className="flex justify-end mb-5 mr-[30px]">
          <button
            className="btn btn-sm min-h-fit font-normal btn-circle btn-ghost text-white text-[32px] md:text-[40px]"
            onClick={(e) => {
              e.preventDefault();
              handleCancel();
            }}
          >
            ✕
          </button>
        </div>
        <div className="m-auto flex flex-col items-center gap-4 justify-center">
          <div>{text}</div>
          <div className="flex items-center justify-center gap-2 lg:gap-4">
            <Button variant="dark" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleConfirm}>
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
