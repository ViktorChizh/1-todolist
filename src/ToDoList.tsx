import React, {ChangeEvent} from 'react';
import {AddItemForm} from './AddItemForm';
import {FilterValuesType} from './App';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    updateTask: (todolistId: string, taskId: string, title: string)=> void
    updateTodolist: (todolistId: string, title: string)=> void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {

    const removeTodolist = () => props.removeTodolist(props.id)

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

    const addTaskHandler = (title: string) => {
        props.addTask(title, props.id)
    }
    const updateTodolistHandler = (title: string) => {
        props.updateTodolist(props.id, title)
    }
    return <div>
        <h3> <EditableSpan oldTitle={props.title} callBack={updateTodolistHandler}/>
            <IconButton color="primary" aria-label="delete"  onClick={removeTodolist}>
                <DeleteIcon />
            </IconButton>
        </h3>
        <AddItemForm callBack={addTaskHandler}/>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    }
                    const updateTaskHandler= (title: string) => {
                        props.updateTask(props.id, t.id, title)
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>
                        <EditableSpan oldTitle={t.title} callBack={updateTaskHandler}/>
                        <IconButton color="primary" aria-label="delete" onClick={onClickHandler}>
                            <DeleteIcon />
                        </IconButton>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}


