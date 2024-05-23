import { useState } from "react";

export default function Accordion({
  priority,
  data,
  children,
  isOpen,
  onClick,
}) {
  return (
    <>
      <div className="border rounded mb-2">
        <div
          onClick={onClick}
          className="d-flex justify-content-between flex-fill border-bottom p-2"
        >
          <div>
            <span className={"border rounded border-secondary pe-2 ps-2 "}>
              Priority : {priority}
            </span>
          </div>
          <div>
            <div className="d-flex gap-4">
              <div>
                <span className="fw-semibold">Total : </span>
                <span className="badge text-bg-light text-primary">
                  {data.length}
                </span>
              </div>
              <div>
                <span className="fw-semibold">Complted : </span>
                <span className="badge text-bg-light text-primary">
                  {data.filter((task) => task.completed === true).length}
                </span>
              </div>
              <div>
                <span className="fw-semibold">Incomplete : </span>
                <span className="badge text-bg-light text-primary">
                  {data.filter((task) => task.completed === false).length}
                </span>
              </div>
              <div>
                <span>
                  {isOpen ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-chevron-up"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-chevron-down"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                      />
                    </svg>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
        {isOpen ? <div className="flex-fill p-2">{children}</div> : ""}
      </div>
    </>
  );
}
