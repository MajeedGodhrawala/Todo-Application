import { forwardRef, useImperativeHandle, useState, useRef } from "react";
import dayjs from "dayjs";
import Modal from "./Modal";
import Button from "./Button";
import Input from "./Input";
import TextEditor from "./TextEditor";

import { connect } from "react-redux";

const Form = forwardRef(({ manageTask }, ref) => {
  const modalRef = useRef(null);
  const [detail, setDetail] = useState({
    id: Date.now(),
    title: "",
    description: "<p>Write Description</p>",
    priority: "",
    date: dayjs().format("YYYY-MM-DD"),
    completed: false,
  });

  useImperativeHandle(ref, () => ({
    openForm(task) {
      resetTask();
      if (task) {
        setDetail(task);
      }
      modalRef.current.openModal();
    },
  }));

  const prioritys = ["High", "Medium", "Low"];

  function handleInput(e) {
    setDetail({
      ...detail,
      [e.target.name]: e.target.value,
    });
  }

  function handleTextEditor(value) {
    setDetail({
      ...detail,
      description: value,
    });
  }

  const form = () => {
    return (
      <>
        <div className="mb-3">
          <Input
            label="Title"
            name="title"
            value={detail.title}
            onChange={handleInput}
          />

          <label htmlFor="exampleInputDescription" className="form-label">
            Description
          </label>
          <TextEditor
            value={detail.description}
            onChange={handleTextEditor}
          ></TextEditor>
          <Input
            label="Date"
            type="date"
            name="date"
            value={detail.date}
            onChange={handleInput}
          />
          <label htmlFor="exampleInputPriority" className="form-label">
            Priority
          </label>
          <select
            className="form-select form-select-lg mb-3"
            aria-label="Large select example"
            value={detail.priority}
            name="priority"
            onChange={handleInput}
          >
            <option value="" disabled>
              -- Select Priority --
            </option>
            {prioritys.map((priority, index) => (
              <option key={`option_${index}`} value={priority}>
                {priority}
              </option>
            ))}
          </select>
        </div>
      </>
    );
  };

  function handleSubmit() {
    manageTask(detail);
    modalRef.current.closeModal();
  }

  function resetTask() {
    setDetail({
      id: Date.now(),
      title: "",
      description: "<p>Write Description</p>",
      priority: "",
      date: dayjs().format("YYYY-MM-DD"),
      completed: false,
    });
  }

  return (
    <Modal
      ref={modalRef}
      title="ToDo Form"
      bodyContent={form}
      footerContent={() => {
        return <Button onClick={handleSubmit}>Save</Button>;
      }}
    />
  );
});

const mapStateToProps = (state) => ({
  tasks: state.tasks,
});

const mapDispatchToProps = (dispatch) => ({
  manageTask: (detail) => dispatch({ type: "manageTask", task: detail }),
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(Form);
