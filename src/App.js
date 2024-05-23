import "./App.css";
import { useRef, useState } from "react";
import Body from "./components/Body";
import Button from "./components/Button";
import Form from "./components/Form";
import List from "./components/List";
import Card from "./components/Card";

function App() {
  const formRef = useRef(null);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Test",
      description: "<p><strong><em>Test </em></strong></p>",
      priority: "High",
      date: "2024-05-26",
      completed: false,
    },
    {
      id: 2,
      title: "Test 2",
      description: "<h1><strong>Notice</strong></h1>",
      priority: "Low",
      date: "2024-05-30",
      completed: true,
    },
    {
      id: 3,
      title: "Test 3",
      description: "<p><strong><em>Test </em></strong></p>",
      priority: "High",
      date: "2024-05-28",
      completed: false,
    },
    {
      id: 4,
      title: "Test 4",
      description: "<p><strong><em>Test </em></strong></p>",
      priority: "Medium",
      date: "2024-05-09",
      completed: false,
    },
    {
      id: 5,
      title: "Test 5",
      description: "<p><strong><em>Test </em></strong></p>",
      priority: "Low",
      date: "2024-05-12",
      completed: true,
    },
    {
      id: 6,
      title: "Test 6",
      description: "<p><strong><em>Test </em></strong></p>",
      priority: "Medium",
      date: "2024-05-28",
      completed: true,
    },
    {
      id: 7,
      title: "Test 7",
      description: "<p><strong><em>Test </em></strong></p>",
      priority: "High",
      date: "2024-05-13",
      completed: false,
    },
    {
      id: 8,
      title: "Test 8",
      description: "<p><strong><em>Test </em></strong></p>",
      priority: "Medium",
      date: "2024-05-30",
      completed: true,
    },
  ]);

  const handleForm = (task = null) => {
    formRef.current.openForm(task);
  };

  function manageTask(task) {
    const myTask = [...tasks];
    const findEditTask = myTask.find((detail) => detail.id === task.id);
    if (findEditTask) {
      findEditTask.title = task.title;
      findEditTask.description = task.description;
      findEditTask.priority = task.priority;
      findEditTask.date = task.date;
      setTasks(myTask);
    } else {
      setTasks([...tasks, task]);
    }
  }

  function deleteTask(id) {
    setTasks(tasks.filter((detail) => detail.id !== id));
  }

  function manageTaskStatus(id) {
    const myTask = [...tasks];
    const findEditTask = myTask.find((detail) => detail.id === id);
    findEditTask.completed = !findEditTask.completed;
    setTasks(myTask);
  }

  return (
    <>
      <Body
        cardClass="m-3"
        title="Welcome back!"
        subTitle="Here's a list of your tasks!"
      >
        <div className="d-flex gap-2">
          <Card extraClass="flex-fill" title="Total Tasks">
            <div className="fs-3 fw-bold">{tasks.length}</div>
          </Card>
          <Card extraClass="flex-fill" title="Completed Tasks">
            <div className="fs-3 fw-bold">
              {tasks.filter((task) => task.completed).length}
            </div>
          </Card>
          <Card extraClass="flex-fill" title="InComplete Tasks">
            <div className="fs-3 fw-bold">
              {tasks.filter((task) => !task.completed).length}
            </div>
          </Card>
        </div>
        <Form
          ref={formRef}
          manageTask={manageTask}
          lastId={tasks[tasks.length - 1]?.id}
        ></Form>
        <List
          tasks={tasks}
          headerContent={
            <Button
              className="btn btn-outline-secondary"
              onClick={() => handleForm()}
            >
              Add
            </Button>
          }
          handleForm={handleForm}
          deleteTask={deleteTask}
          manageTaskStatus={manageTaskStatus}
        ></List>
      </Body>
    </>
  );
}

export default App;
