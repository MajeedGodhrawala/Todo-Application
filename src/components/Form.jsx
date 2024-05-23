import { forwardRef, useImperativeHandle, useState, useRef } from "react";
import dayjs from "dayjs";
import Modal from "./Modal";
import Button from "./Button";
import Input from "./Input";
import TextEditor from "./TextEditor";

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
        console.log(task);
        try {
          setDetail(task);
        } catch (error) {
          console.log(error);
        }
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
          {/* <textarea
            className="form-control"
            aria-label="With textarea"
            onChange={handleInput}
            id="exampleInputDescription"
            name="description"
            value={detail.description}
          ></textarea> */}
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

export default Form;
