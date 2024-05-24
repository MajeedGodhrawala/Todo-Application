import dayjs from "dayjs";
import Button from "./Button";
import Form from "../components/Form";

import { connect } from "react-redux";

import { useEffect, useState, useRef } from "react";
import Accordion from "./Accordion";

const List = ({ tasks, manageTaskStatus, deleteTask }) => {
  const prioritys = ["All", "High", "Medium", "Low"];
  const [priority, setpriority] = useState("All");
  const [data, setData] = useState([]);
  const [dueDate, setDueDate] = useState(false);
  const [openAccordionIndex, setOpenAccordionIndex] = useState(null);
  const formRef = useRef(null);

  useEffect(() => {
    if (priority === "All") {
      setData(tasks);
      return;
    }
    setData(tasks.filter((task) => task.priority === priority));
  }, [priority, tasks]);

  const handleAccordion = (index) => {
    setOpenAccordionIndex((currentValue) =>
      currentValue === index ? null : index
    );
  };

  const handleForm = (task = null) => {
    formRef.current.openForm(task);
  };

  function setPriorityWiseData(e) {
    setpriority(e.target.value);
  }

  function listTr(task, index, priority) {
    return (
      <tr
        className={task.completed ? "table-success" : ""}
        key={`table_id${index}`}
      >
        <td>{index + 1}</td>
        <td>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={task.completed}
              onChange={() => manageTaskStatus(task.id)}
              id="flexCheckDefault"
            />
          </div>
        </td>
        <td className="w-25">
          <div className="fw-medium">{task.title}</div>
          <div
            dangerouslySetInnerHTML={{
              __html: task.description,
            }}
          ></div>
        </td>
        <td className="w-25">
          <span
            className={
              "border rounded border-secondary pe-2 ps-2 " +
              (priority === "High"
                ? "text-danger"
                : priority === "Medium"
                ? "text-success"
                : "text-warning")
            }
          >
            {task.priority}
          </span>
        </td>
        <td className="w-25">{dayjs(task.date).format("DD/MM/YYYY")}</td>
        <td className="w-25">
          <div
            className="btn-group"
            role="group"
            aria-label="Basic outlined example"
          >
            {!task.completed ? (
              <Button
                className="btn btn-outline-secondary"
                onClick={() => handleForm(task)}
              >
                Edit
              </Button>
            ) : (
              ""
            )}

            <Button
              className="btn btn-outline-secondary"
              onClick={() => deleteTask(task.id)}
            >
              Delete
            </Button>
          </div>
        </td>
      </tr>
    );
  }

  function dueDateList() {
    return (
      <table className="table mb-2 border border-solid">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col"></th>
            <th scope="col">Task</th>
            <th scope="col">Priority</th>
            <th scope="col">Date</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data
            .filter(
              (task) =>
                (priority === "All"
                  ? task.priority
                  : task.priority === priority) &&
                (dueDate ? new Date(task.date) < new Date() : task.id)
            )
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .map((task, index) => {
              return listTr(task, index, priority);
            })}
        </tbody>
      </table>
    );
  }

  function list() {
    return prioritys
      .filter((p) => (priority === "All" ? p !== "All" : p === priority))
      .map((priority, index) => {
        return (
          <Accordion
            priority={priority}
            key={index}
            data={data.filter((task) => task.priority === priority)}
            isOpen={openAccordionIndex === index}
            onClick={() => handleAccordion(index)}
          >
            <table
              className="table mb-2 border border-solid"
              key={`table_id${index}`}
            >
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col"></th>
                  <th scope="col">Task</th>
                  <th scope="col">Priority</th>
                  <th scope="col">Date</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {data
                  .filter((task) => task.priority === priority)
                  .sort((a, b) => new Date(a.date) - new Date(b.date))
                  .map((task, index) => {
                    return listTr(task, index, priority);
                  })}
              </tbody>
            </table>
          </Accordion>
        );
      });
  }

  return (
    <>
      <Form ref={formRef}></Form>
      <div className="d-flex justify-content-between mb-2">
        <div className="d-flex gap-2">
          <div>
            <select
              className="form-select form-select-"
              aria-label="Large select example"
              value={priority}
              name="priority"
              onChange={setPriorityWiseData}
            >
              {prioritys.map((priority, index) => (
                <option key={`option_${index}`} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
          </div>
          <div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.checked)}
                id="flexCheckForDueDate"
              />
              <label className="form-check-label" htmlFor="flexCheckForDueDate">
                Due Date List
              </label>
            </div>
          </div>
        </div>
        <div>
          <Button
            className="btn btn-outline-secondary"
            onClick={() => handleForm()}
          >
            Add
          </Button>
        </div>
      </div>
      {!dueDate ? list() : dueDateList()}
    </>
  );
};

const mapStateToProps = (state) => ({
  tasks: state.tasks,
});

const mapDispatchToProps = (dispatch) => ({
  manageTaskStatus: (id) => dispatch({ type: "manageTaskStatus", id: id }),
  deleteTask: (id) => dispatch({ type: "deleteTask", id: id }),
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
