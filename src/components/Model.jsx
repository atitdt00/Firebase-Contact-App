import { createPortal } from "react-dom";
import { IoMdClose } from "react-icons/io";

const Model = ({ isOpen, onClose, children }) => {
  return createPortal(
    <>
      {isOpen && (
        <>
          <div
            onClick={onClose}
            className="absolute top-0 z-20 backdrop-blur-xs w-screen h-screen"
          >
          </div>
            <div className="absolute top-50 left-50 flex flex-col  z-90 min-h-[200px] max-w-[100%] p-2 bg-white rounded-2xl">
              <div className="flex justify-end p-3 text-3xl">
                <IoMdClose onClick={onClose} className="cursor-pointer" />
              </div>-
              {children}
            </div>
        </>
      )}
    </>,
    document.getElementById("model-root")
  );
};

export default Model;
