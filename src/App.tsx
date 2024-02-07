import React, {useCallback} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import ButtonAppBar from './ButtonAppBar';
import {Container, Grid, Paper} from '@mui/material';
import {addTodolistAC, changeFilterAC, removeTodolistAC, updateTodolistAC} from './reducers/todoListsReducer';
import {addTaskAC, changeStatusAC, removeTaskAC, updateTaskAC} from './reducers/tasksReducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppStoreType} from './reducers/Store';

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    const dispatch = useDispatch()
    const todoLists = useSelector<AppStoreType, TodolistType[]> (state => state.todolists)
    const tasks = useSelector<AppStoreType, TasksStateType> (state => state.tasks)

    const removeTask = useCallback((id: string, todolistId: string) => {
        dispatch(removeTaskAC(id, todolistId))
    }, [])
    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskAC(todolistId, title))
    }, [])
    const changeStatus = useCallback((id: string, isDone: boolean, todolistId: string) => {
        dispatch(changeStatusAC(id, todolistId, isDone))
    }, [])
    const changeFilter = useCallback((todolistId: string, value: FilterValuesType) => {
        dispatch(changeFilterAC(todolistId, value))
    }, [])
    const updateTask = useCallback((todolistId: string, taskId: string, title: string) => {
        dispatch(updateTaskAC(taskId, todolistId, title))
    }, [])

    const removeTodolist = useCallback((id: string) => {
        dispatch(removeTodolistAC(id))
    }, [])
    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(v1(), title))
    }, [])
    const updateTodolist = useCallback((todolistId: string, title: string) => {
        dispatch(updateTodolistAC(todolistId, title))
    }, [])

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed style={{width: '100%', maxWidth: '100%'}}>
                <Grid container>
                    <Paper elevation={5} style={{width: '96%', padding: '20px  6px 20px 20px', margin: '20px auto'}}>
                        <h3 style={{textAlign: 'center'}}>Add Todolist</h3>
                        <AddItemForm callBack={addTodolist}
                                     placeholder={'add new todolist'}
                                     style={{width: '100%', maxWidth: '100%'}}/>
                        {!todoLists.length &&
                            <span style={{color: 'red', display: 'block', marginTop: '10px'}}>
                                todoLists are empty
                            </span>}
                    </Paper>
                </Grid>
                <Grid container spacing={3} style={{width: '100%', justifyContent: 'center', marginLeft: '-0.5vw'}}>
                    {
                        todoLists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;
                            if (tl.filter === 'active') {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
                            }
                            if (tl.filter === 'completed') {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
                            }
                            return (
                                <Grid item spacing={3}>
                                    <Paper elevation={5} style={{padding: '20px'}}>
                                        <Todolist
                                            key={tl.id}
                                            id={tl.id}
                                            title={tl.title}
                                            tasks={tasksForTodolist}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeTaskStatus={changeStatus}
                                            filter={tl.filter}
                                            removeTodolist={removeTodolist}
                                            updateTask={updateTask}
                                            updateTodolist={updateTodolist}
                                        />
                                    </Paper>
                                </Grid>)
                        })
                    }
                </Grid>
            </Container>
        </div>
    )
}

export default App;
