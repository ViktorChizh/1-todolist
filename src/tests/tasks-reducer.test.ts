import {
  addTask,
  removeTask,
  setTasks,
  tasksReducer,
  TasksStateType,
  updateTask,
} from "features/pageTodolists/todolist/task/TasksReducer"

import { addTodolist, removeTodolist, setTodolist } from "features/pageTodolists/todolist/TodoListsReducer"
import { TaskPriorities, TaskStatuses } from "api/api"

let startState: TasksStateType = {}
beforeEach(() => {
  const date = new Date()
  startState = {
    todolistId1: [
      {
        id: "1",
        title: "CSS",
        status: TaskStatuses.New,
        todoListId: "todolistId1",
        description: "",
        startDate: date,
        deadline: date,
        addedDate: date,
        order: 0,
        priority: TaskPriorities.Low,
        taskStatus: "idle",
      },
      {
        id: "2",
        title: "JS",
        status: TaskStatuses.Completed,
        todoListId: "todolistId1",
        description: "",
        startDate: date,
        deadline: date,
        addedDate: date,
        order: 0,
        priority: TaskPriorities.Low,
        taskStatus: "idle",
      },
      {
        id: "3",
        title: "React",
        status: TaskStatuses.New,
        todoListId: "todolistId1",
        description: "",
        startDate: date,
        deadline: date,
        addedDate: date,
        order: 0,
        priority: TaskPriorities.Low,
        taskStatus: "idle",
      },
    ],
    todolistId2: [
      {
        id: "1",
        title: "bread",
        status: TaskStatuses.New,
        todoListId: "todolistId2",
        description: "",
        startDate: date,
        deadline: date,
        addedDate: date,
        order: 0,
        priority: TaskPriorities.Low,
        taskStatus: "idle",
      },
      {
        id: "2",
        title: "milk",
        status: TaskStatuses.Completed,
        todoListId: "todolistId2",
        description: "",
        startDate: date,
        deadline: date,
        addedDate: date,
        order: 0,
        priority: TaskPriorities.Low,
        taskStatus: "idle",
      },
      {
        id: "3",
        title: "tea",
        status: TaskStatuses.New,
        todoListId: "todolistId2",
        description: "",
        startDate: date,
        deadline: date,
        addedDate: date,
        order: 0,
        priority: TaskPriorities.Low,
        taskStatus: "idle",
      },
    ],
  }
})

test("correct task should be deleted from correct array", () => {
  const action = removeTask({ idTDL: "todolistId2", taskId: "2" })

  const endState = tasksReducer(startState, action)

  expect(endState["todolistId1"].length).toBe(3)
  expect(endState["todolistId2"].length).toBe(2)
  expect(endState["todolistId2"].every((t) => t.id != "2")).toBeTruthy()
})
test("correct task should be added to correct array", () => {
  //const action = addTaskAC("juce", "todolistId2");
  const date = new Date()
  const action = addTask({
    task: {
      todoListId: "todolistId2",
      title: "juce",
      status: TaskStatuses.New,
      addedDate: date,
      deadline: date,
      description: "",
      order: 0,
      priority: 0,
      startDate: date,
      id: "id exists",
      taskStatus: "idle",
    },
  })

  const endState = tasksReducer(startState, action)

  expect(endState["todolistId1"].length).toBe(3)
  expect(endState["todolistId2"].length).toBe(4)
  expect(endState["todolistId2"][0].id).toBeDefined()
  expect(endState["todolistId2"][0].title).toBe("juce")
  expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New)
})
test("status of specified task should be changed", () => {
  const action = updateTask({
    idTDL: "todolistId2",
    taskId: "2",
    model: { status: TaskStatuses.New },
  })

  const endState = tasksReducer(startState, action)

  expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed)
  expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New)
})
test("title of specified task should be changed", () => {
  const action = updateTask({ idTDL: "todolistId2", taskId: "2", model: { title: "yogurt" } })

  const endState = tasksReducer(startState, action)

  expect(endState["todolistId1"][1].title).toBe("JS")
  expect(endState["todolistId2"][1].title).toBe("yogurt")
  expect(endState["todolistId2"][0].title).toBe("bread")
})
test("new array should be added when new todolist is added", () => {
  const date = new Date()
  const action = addTodolist({
    todolist: {
      id: "blabla",
      title: "new todolist",
      order: 0,
      addedDate: date,
    },
  })

  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)
  const newKey = keys.find((k) => k != "todolistId1" && k != "todolistId2")
  if (!newKey) {
    throw Error("new key should be added")
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})
test("propertry with todolistId should be deleted", () => {
  const action = removeTodolist({ idTDL: "todolistId2" })

  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState["todolistId2"]).not.toBeDefined()
})

test("empty arrays should be added when we set todolists", () => {
  const date = new Date()
  const action = setTodolist({
    todolists: [
      { id: "1", title: "title 1", order: 0, addedDate: date },
      { id: "2", title: "title 2", order: 0, addedDate: date },
    ],
  })

  const endState = tasksReducer({}, action)

  const keys = Object.keys(endState)

  expect(keys.length).toBe(2)
  expect(endState["1"]).toBeDefined()
  expect(endState["2"]).toBeDefined()
})
test("tasks should be added for todolist", () => {
  const action = setTasks({ idTDL: "todolistId1", tasks: startState["todolistId1"] })

  const endState = tasksReducer(
    {
      todolistId2: [],
      todolistId1: [],
    },
    action,
  )

  expect(endState["todolistId1"].length).toBe(3)
  expect(endState["todolistId2"].length).toBe(0)
})