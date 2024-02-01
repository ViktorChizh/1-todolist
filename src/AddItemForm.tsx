import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react'
import IconButton from '@mui/material/IconButton'
import QueueSharpIcon from '@mui/icons-material/QueueSharp';
import TextField from '@mui/material/TextField';

type AddItemProps = {
    callBack: (title: string) => void
    placeholder: string
    style?: { [key: string]: string }
}

export const AddItemForm: FC<AddItemProps> = (props: AddItemProps) => {
    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) { // так показывает устаревшие свойства, но они работают! правильно: e.key === 'Enter'
            addTask();
        }
    }
    const addTask = () => {
        let newTitle = title.trim();
        if (newTitle !== '') {
            props.callBack(newTitle);
            setTitle('');
        } else {
            setError('Title is required');
        }
    }

    const styles = {
        maxWidth: '40px',
        maxHeight: '40px',
        minWidth: '40px',
        minHeight: '40px',
    }

    return (
        <div style={{width:'100%',maxWidth: '100%', marginLeft:'-5wh', display: 'flex', flexDirection:'row', flexWrap:'nowrap'}}>
            <TextField placeholder={props.placeholder}
                       id="outlined-basic"
                       label={error ? error : props.placeholder}
                       variant="outlined"
                       size="small"
                       value={title}
                       error={!!error}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       style={props.style}
                // className={error ? 'error' : ''}
            />
            <IconButton style={styles}
                        color="primary" aria-label="add item" onClick={addTask}>
                <QueueSharpIcon/>
            </IconButton>
            {/*{error && <div className="error-message"> {error} </div>}*/}
        </div>
    )
}