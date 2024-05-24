const initialStates = {
  tasks: [
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
  ],
};

const tasksReducer = (state = initialStates, action) => {
  let id = null;
  switch (action.type) {
    case "manageTaskStatus":
      id = action.id;
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === id ? { ...task, completed: !task.completed } : task
        ),
      };
    case "deleteTask":
      id = action.id;
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== id),
      };
    case "manageTask":
      const task = action.task;
      const findEditTask = state.tasks.find((detail) => detail.id === task.id);
      if (findEditTask) {
        return {
          ...state,
          tasks: state.tasks.map((detail) =>
            detail.id === task.id
              ? {
                  ...detail,
                  title: task.title,
                  description: task.description,
                  priority: task.priority,
                  date: task.date,
                  completed: task.completed,
                }
              : detail
          ),
        };
      } else {
        return {
          ...state,
          tasks: [...state.tasks, task],
        };
      }

    default:
      return state;
  }
};

export default tasksReducer;
