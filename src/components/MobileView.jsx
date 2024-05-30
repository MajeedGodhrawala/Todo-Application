import { Swiper, SwiperSlide } from "swiper/react";
import { useRef, useState, useEffect } from "react";
import Button from "./Button";
import Modal from "./Modal";

import "swiper/css";
import "swiper/css/effect-cards";

import { EffectCards } from "swiper/modules";
export default function MobileView({
  data,
  manageTaskStatus,
  handleForm,
  deleteTask,
}) {
  const [task, setTask] = useState({
    id: "",
    title: "",
    description: "",
    priority: "",
    date: "",
    completed: false,
  });
  useEffect(() => {}, []);
  const modalRef = useRef(null);

  const taskDetail = () => {
    return (
      <>
        <div className="d-flex justify-content-between">
          <span className="fs-3 fw-semibold">{task.title}</span>
          <span
            className={"btn btn-outline-dark"}
            style={{
              color:
                task.priority === "High"
                  ? "#dc3545"
                  : task.priority === "Medium"
                  ? "#13795b"
                  : "#ffc107",
            }}
          >
            {task.priority}
          </span>
        </div>
        <div className="d-flex justify-content-end">{task.date}</div>

        <div
          className="m-1 p-1 d-flex flex-full border border-2 rounded border-secondary"
          dangerouslySetInnerHTML={{
            __html: task.description,
          }}
        ></div>
        <div className="d-flex">
          <div
            className="btn-group flex-fill"
            role="group"
            aria-label="Basic outlined example"
          >
            {!task.completed ? (
              <Button
                className="btn btn-outline-secondary"
                onClick={() => {
                  modalRef.current.closeModal();
                  handleForm(task);
                }}
              >
                Edit
              </Button>
            ) : (
              ""
            )}
            <Button
              className="btn btn-outline-secondary"
              onClick={() => {
                modalRef.current.closeModal();
                deleteTask(task.id);
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      </>
    );
  };

  function openModel(task) {
    setTask(task);
    modalRef.current.openModal();
  }

  return (
    <>
      <Modal
        ref={modalRef}
        title={task.title ?? "Task"}
        bodyContent={taskDetail}
      />
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper shadow-sm mb-1 bg-body-tertiary rounded flex-fill"
        style={{ width: "90%", height: "150px" }}
      >
        {data.map((task, index) => {
          return (
            <div key={`card_${index}`} className="card-body">
              <div className="card-text">
                <SwiperSlide
                  key={`slide_${index}`}
                  style={{
                    padding: "10px",
                    borderRadius: "18px",
                    border: "1px solid",
                    backgroundColor: task.completed
                      ? "#d1e7dd"
                      : "rgba(255, 255, 255, 0.993)",
                  }}
                  onClick={() => openModel(task)}
                >
                  <div className="d-flex pb-2">
                    <div className="flex-grow-1">
                      <div className="fw-semibold fs-4">{task.title}</div>
                      {/* <div
                          dangerouslySetInnerHTML={{
                            __html: task.description,
                          }}
                        ></div> */}
                    </div>
                    <div>
                      <span>{task.date}</span>
                      <div className="form-check">
                        <input
                          className="form-check-input p-3 ps-5"
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => manageTaskStatus(task.id)}
                          onClick={(e) => e.stopPropagation()}
                          id={`${index}_input`}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="d-flex gap-2 ">
                    <div className="flex-fill">
                      <span
                        className={"btn btn-outline-dark"}
                        style={{
                          color:
                            task.priority === "High"
                              ? "#dc3545"
                              : task.priority === "Medium"
                              ? "#13795b"
                              : "#ffc107",
                        }}
                      >
                        {task.priority}
                      </span>
                    </div>
                    <div
                      className="btn-group flex-fill"
                      role="group"
                      aria-label="Basic outlined example"
                    >
                      {!task.completed ? (
                        <Button
                          className="btn btn-outline-secondary"
                          onClick={() => {
                            handleForm(task);
                          }}
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
                  </div>
                </SwiperSlide>
              </div>
            </div>
          );
        })}
      </Swiper>
    </>
  );
}
