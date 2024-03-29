import {
  addTodolistAC,
  changeTodoFilterAC,
  changeTodoStatusAC,
  FilterValuesType,
  removeTodolistAC,
  setTodolistAC,
  todoListsReducer,
  TodolistType,
  changeTodoTitleAC,
} from "features/pageTodolists/todolist/TodoListsReducer"
import { v1 } from "uuid"
import { StatusType } from "app_and_store/AppReducer"
import { TodolistServerType } from "api/api"

let todolistId1: string
let todolistId2: string
let startState: Array<TodolistType> = []

beforeEach(() => {
  todolistId1 = v1()
  todolistId2 = v1()
  const date = new Date()
  startState = [
    {
      id: todolistId1,
      title: "What to learn",
      filter: "all",
      todoStatus: "idle",
      addedDate: date,
      order: 0,
    },
    {
      id: todolistId2,
      title: "What to buy",
      filter: "all",
      todoStatus: "idle",
      addedDate: date,
      order: 0,
    },
  ]
})

test("correct todolist should be removed", () => {
  const endState = todoListsReducer(startState, removeTodolistAC({ idTDL: todolistId1 }))

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistId2)
})

test("correct todolist should be added", () => {
  const date = new Date()
  let todolist: TodolistServerType = {
    title: "New Todolist",
    id: "any id",
    addedDate: date,
    order: 0,
  }

  const endState = todoListsReducer(startState, addTodolistAC({ todolist }))

  expect(endState.length).toBe(3)
  expect(endState[endState.length - 1].title).toBe(todolist.title)
  expect(endState[endState.length - 1].filter).toBe("all")
})

test("correct todolist should change its name", () => {
  let newTodolistTitle = "New Todolist"

  const action = changeTodoTitleAC({ idTDL: todolistId2, title: newTodolistTitle })

  const endState = todoListsReducer(startState, action)

  expect(endState[0].title).toBe("What to learn")
  expect(endState[1].title).toBe(newTodolistTitle)
})

test("correct filter of todolist should be changed", () => {
  let newFilter: FilterValuesType = "completed"

  const action = changeTodoFilterAC({ idTDL: todolistId2, filter: newFilter })

  const endState = todoListsReducer(startState, action)

  expect(endState[0].filter).toBe("all")
  expect(endState[1].filter).toBe(newFilter)
})
test("todolists should be added", () => {
  const action = setTodolistAC({ todolists: startState })

  const endState = todoListsReducer([], action)

  expect(endState.length).toBe(2)
})
test("correct entity status of todolist should be changed", () => {
  let newStatus: StatusType = "loading"

  const action = changeTodoStatusAC({ idTDL: todolistId2, todoStatus: newStatus })

  const endState = todoListsReducer(startState, action)

  expect(endState[0].todoStatus).toBe("idle")
  expect(endState[1].todoStatus).toBe(newStatus)
})
