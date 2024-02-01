import {TodolistType} from '../App';
import {addTodolistAC, changeFilterAC, removeTodolistAC, todoListsReducer, updateTodolistAC} from './todoListsReducer';
import {v1} from 'uuid';

let state: TodolistType[] = [
        {id: 'todolistId1', title: 'What to learn', filter: 'all'},
        {id: 'todolistId2', title: 'What to buy', filter: 'all'}
    ]

test('remove todoList by id', () => {
    // action
    const endState = todoListsReducer(state, removeTodolistAC('todolistId1'))
    // expect result
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe('todolistId2')
})

test('add todoList by id', () => {
    // action
    const endState = todoListsReducer(state, addTodolistAC(v1(), 'What to watch'))
    // expect result
    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe('What to watch')
})

test('change todoList title by id', () => {
    // action
    const endState = todoListsReducer(state, updateTodolistAC('todolistId1', 'What to watch'))
    // expect result
    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe('What to watch')
})

test('change todoList filter by id', () => {
    // action
    const endState = todoListsReducer(state, changeFilterAC('todolistId2', 'active'))
    // expect result
    expect(endState.length).toBe(2)
    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe('active')
})