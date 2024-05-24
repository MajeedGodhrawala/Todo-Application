import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import Button from "./Button";
import Input from "./Input";
import TextEditor from "./TextEditor";
import Body from "./Body";

export default function PageForm() {
  const location = useLocation();
  const navigate = useNavigate();

  const [detail, setDetail] = useState({
    id: Date.now(),
    title: "",
    description: "<p>Write Description</p>",
    priority: "",
    date: dayjs().format("YYYY-MM-DD"),
    completed: false,
  });

  useEffect(() => {
    resetTask();
    if (location.state) {
      setDetail(location.state);
    }
  }, []);

  const prioritys = ["High", "Medium", "Low"];

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

  function handleSubmit() {
    navigate("/", { state: { detail: detail } });
  }

  return (
    <>
      <Body cardClass="m-3" title="Add New Task">
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
          <Button onClick={handleSubmit}>Save</Button>
        </div>
      </Body>
    </>
  );
}
