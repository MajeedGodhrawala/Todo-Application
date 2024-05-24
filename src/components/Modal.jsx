import {
  forwardRef,
  useEffect,
  useId,
  useImperativeHandle,
  useState,
} from "react";
import Button from "./Button";
import bootstrap from "../../node_modules/bootstrap/dist/js/bootstrap";

const Modal = forwardRef(({ title, bodyContent, footerContent }, ref) => {
  let modelId = useId();
  let [bootstrapModel, setBootstrapModel] = useState(null);
  useEffect(() => {
    let modal = document.getElementById(modelId);
    setBootstrapModel(new bootstrap.Modal(modal));
  }, []);

  function closeModal() {
    bootstrapModel.hide();
  }

  useImperativeHandle(ref, () => ({
    openModal() {
      bootstrapModel.show();
    },
    closeModal,
  }));

  return (
    <div id={modelId} className="modal fade" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <Button onClick={closeModal} className={"btn-close"}></Button>
          </div>
          <div className="modal-body">{bodyContent && bodyContent()}</div>
          <div className="modal-footer">
            <Button onClick={closeModal} className={"btn btn-secondary"}>
              Close
            </Button>
            {footerContent && footerContent()}
          </div>
        </div>
      </div>
    </div>
  );
});

export default Modal;
