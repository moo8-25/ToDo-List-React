import Typography from '@mui/material/Typography';
import '../App.css'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Todo from './todo';
import { useState, useEffect, useMemo } from 'react';
import Grid from '@mui/material/Grid2';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';




const initial = []
export default function TaskList() {
    const [todos, setTodos] = useState(initial)
    const [inputTit, setInputTit] = useState("")
    const [inputInfo, setInputInfo] = useState("")
    const [alignment, setAlignment] = useState('all');

    // Random Id Generation //
    const randomId = function (length = 6) {
        return Math.random().toString(36).substring(2, length + 2);
    };
    // ========Random Id Generation======= //



    // Filteration of Todos //

    // useMemo is using for cache the process and execute it in specific state not execute it all the time 
    // the Component called 
    // the second para [todos] mean that do not execute the

    const completedTodos = useMemo(() => {
        return todos.filter((t) => {
            return t.isCompleted
        })
    }, [todos])


    const nonCompletedTodos = useMemo(() => {
        return todos.filter((t) => {
            return !t.isCompleted
        })
    }, [todos])


    //======== Filteration of Todos ========//


    let renderTodos = todos
    if (alignment == 'finished') {
        renderTodos = completedTodos
    }
    else if (alignment == 'pending') {
        renderTodos = nonCompletedTodos
    }
    else {
        renderTodos = todos
    }


    // useEffect Hook to get the values from the local Storage.
    // the second parameter[] mean that the function inside the useEffect hook will execute one time only. 

    useEffect(() => {
        const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
        setTodos(storageTodos);
    }, []);

    //============ useEffect hook ========//


    // Handlers Functions //

    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    function handelAddNew() {
        let newTodo = {
            id: randomId(),
            title: inputTit,
            details: inputInfo,
            isCompleted: false
        }
        const updatedTodos = [...todos, newTodo];
        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
        setInputInfo("")
        setInputTit("")
        Swal.fire({
            title: "The Task Added Successfully!",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
        });
    }

    function handleState(id) {
        const checked = todos.map((t) => {
            if (t.id == id) {
                t.isCompleted = !t.isCompleted
            }
            return t
        })
        setTodos(checked)
        localStorage.setItem("todos", JSON.stringify(todos))
        Swal.fire({
            title: "The Task Updated Successfully!",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
        });
    }

    function handleEd(id, myEditedInfo) {
        let EditedTodos = todos.map((t) => {
            if (t.id == id) {
                t.title = myEditedInfo.newTitle
                t.details = myEditedInfo.newDetails
            }
            return t
        })
        setTodos(EditedTodos)
        localStorage.setItem("todos", JSON.stringify(todos))
        Swal.fire({
            title: "The Task Edited Successfully!",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
        });
    }

    function handelDel(id) {
        const updatedTodos = todos.filter((t) => {
            return t.id != id
        })
        setTodos(updatedTodos)
        localStorage.setItem("todos", JSON.stringify(updatedTodos))
        Swal.fire({
            title: "The Task Deleted Successfully!",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
        });
    }
    // ======Handlers Functions===== //

    const TodosList = renderTodos.map((t) => {
        return <Todo key={t.id} todo={t} handleCheck={handleState} handelDelete={handelDel} handleEdite={handleEd}></Todo>
    })


    return (
        <div className='bigDiv'>
            <div className='container'>
                <div className='headerBox'>
                    <Typography variant='h3'>مهامي</Typography>
                    <hr style={{}} />
                    {/* ///////////////////////// */}
                    <ToggleButtonGroup
                        sx={{ marginBottom: 2, marginTop: 2 }}
                        value={alignment}
                        exclusive
                        onChange={handleAlignment}
                        aria-label="text alignment"
                    >
                        <ToggleButton sx={{ fontSize: 18 }} value="pending" aria-label="centered">
                            غير منجز
                        </ToggleButton>
                        <ToggleButton sx={{ fontSize: 18 }} value="finished" aria-label="left aligned">
                            منجز
                        </ToggleButton>
                        <ToggleButton sx={{ fontSize: 18 }} value="all" aria-label="right aligned">
                            الكل
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>
                <div className='todo' style={{ maxHeight: "600px", overflow: "scroll" }}>
                    {TodosList}
                </div>
                <div>
                    <Grid container spacing={2} className="inputField" sx={{ display: "flex", justifyContent: "center", alignItems: "center", direction: "rtl", marginTop: 3 }}>
                        <Grid size={12}>
                            <TextField
                                value={inputTit}
                                onChange={(e) => {
                                    setInputTit(e.target.value)
                                }}
                                required
                                id="outlined-required"
                                label="عنوان المهمة"
                                style={{ width: "100%", height: "100%", marginBottom: 15, marginTop: 20 }}
                            />
                            <TextField
                                value={inputInfo}
                                onChange={(e) => {
                                    setInputInfo(e.target.value)
                                }}
                                required
                                id="outlined-required"
                                label="تفاصيل المهمة"
                                style={{ width: "100%", height: "100%" }}
                            />
                        </Grid>
                        <Grid size={4}>
                            <Button onClick={handelAddNew} disabled={inputTit.length == 0 || inputInfo.length == 0} style={{ width: "100%", height: "100%" }} variant="contained">اضافة</Button>
                        </Grid>
                    </Grid>
                </div>
            </div>

        </div>
    )


}


