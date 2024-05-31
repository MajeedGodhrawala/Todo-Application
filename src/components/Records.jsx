import Button from "./Button";
import Form from "./Form";

import { connect } from "react-redux";

import { useEffect, useState, useRef } from "react";
import Accordion from "./Accordion";

import MobileView from "./MobileView";
import DataTable from "./DataTable";

const Records = ({ tasks, manageTaskStatus, deleteTask }) => {
  const prioritys = ["All", "High", "Medium", "Low"];
  const [priority, setpriority] = useState("All");
  const [data, setData] = useState([]);
  const [dueDate, setDueDate] = useState(false);
  const [openAccordionIndex, setOpenAccordionIndex] = useState(null);
  const formRef = useRef(null);
  const [mobileView, setMobileView] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(2);

  let width = window.matchMedia("(max-width: 575px)");

  useEffect(() => {
    setMobileView(width.matches);
  }, [width.matches]);

  width.addEventListener("change", function () {
    setMobileView(width.matches);
  });

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
    setCurrentPage(1);
  };

  const handleForm = (task = null) => {
    formRef.current.openForm(task);
  };

  function setPriorityWiseData(e) {
    setpriority(e.target.value);
  }

  function dueDateWiseData() {
    let content = data
      .filter(
        (task) =>
          (priority === "All" ? task.priority : task.priority === priority) &&
          new Date(task.date) < new Date()
      )
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    return mobileView ? (
      <MobileView
        data={content}
        manageTaskStatus={manageTaskStatus}
        handleForm={handleForm}
        deleteTask={deleteTask}
      ></MobileView>
    ) : (
      dataTable(content)
    );
  }

  function priorityWisedata() {
    return prioritys
      .filter((p) => (priority === "All" ? p !== "All" : p === priority))
      .map((priority, index) => {
        let content = data
          .filter((task) => task.priority === priority)
          .sort((a, b) => new Date(a.date) - new Date(b.date));
        return (
          <Accordion
            priority={priority}
            key={index}
            data={data.filter((task) => task.priority === priority)}
            isOpen={openAccordionIndex === index}
            onClick={() => handleAccordion(index)}
          >
            {mobileView ? (
              <MobileView
                data={content}
                manageTaskStatus={manageTaskStatus}
                handleForm={handleForm}
                deleteTask={deleteTask}
              ></MobileView>
            ) : (
              dataTable(content)
            )}
          </Accordion>
        );
      });
  }

  const filterBody = () => (
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
  );

  function dataTable(tableData) {
    const columns = [
      { key: "index", title: "#" },
      { key: "completed", title: "" },
      { key: "task", title: "Task", bodyClassName: "w-25" },
      { key: "priority", title: "Priority", bodyClassName: "w-25" },
      { key: "date", title: "Date", bodyClassName: "w-25" },
      { key: "action", title: "Action", visible: true, bodyClassName: "w-25" },
    ];

    const total = tableData.length;

    const renderBody = {
      completed: (row) => (
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            checked={row.completed}
            onChange={() => manageTaskStatus(row.id)}
            id="flexCheckDefault"
          />
        </div>
      ),
      task: (row) => (
        <>
          <div className="fw-medium">{row.title}</div>
          <div
            dangerouslySetInnerHTML={{
              __html: row.description,
            }}
          ></div>
        </>
      ),
      priority: (row) => (
        <span
          className={
            "border rounded border-secondary pe-2 ps-2 " +
            (row.priority === "High"
              ? "text-danger"
              : row.priority === "Medium"
              ? "text-success"
              : "text-warning")
          }
        >
          {row.priority}
        </span>
      ),
      action: (row) => (
        <div
          className="btn-group"
          role="group"
          aria-label="Basic outlined example"
        >
          {!row.completed ? (
            <Button
              className="btn btn-outline-secondary"
              onClick={() => handleForm(row)}
            >
              Edit
            </Button>
          ) : (
            ""
          )}

          <Button
            className="btn btn-outline-secondary"
            onClick={() => deleteTask(row.id)}
          >
            Delete
          </Button>
        </div>
      ),
    };

    const handlePaginate = (pageinationData) => {
      setCurrentPage(pageinationData.currentPage);
      setPerPage(pageinationData.perPage);
    };

    return (
      <DataTable
        columns={columns}
        rows={tableData.filter(
          (data, index) =>
            index >= (currentPage - 1) * perPage &&
            index <= Math.min(currentPage * perPage - 1, total)
        )}
        total={total}
        currentPageProp={currentPage}
        renderBody={renderBody}
        onPaginate={handlePaginate}
        trClass={(row) => (row.completed ? "table-success" : "")}
      ></DataTable>
    );
  }

  return (
    <>
      <Form ref={formRef}></Form>
      {filterBody()}
      {!dueDate ? priorityWisedata() : dueDateWiseData()}
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

export default connect(mapStateToProps, mapDispatchToProps)(Records);
