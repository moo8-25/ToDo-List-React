import Card from '@mui/material/Card';
import "../App.css"
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CardContent from '@mui/material/CardContent';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CheckIcon from '@mui/icons-material/Check';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';



export default function Todo({ todo, handleCheck, handelDelete, handleEdite }) {

    // states //
    const [openDel, setOpenDel] = useState(false)
    const [openEd, setOpenEd] = useState(false);
    const [EditInputs, setEditInputs] = useState({ newTitle: todo.title, newDetails: todo.details })
    // ==========states=========== //




    // Handlers //
    const handleClickOpenEd = () => {
        setOpenEd(true);
    };

    const handleCloseEd = () => {
        setOpenEd(false);
    };

    const handleClickOpenDel = () => {
        setOpenDel(true);
    };

    const handleCloseDel = () => {
        setOpenDel(false);
    };

    function handleChecked(id) {
        handleCheck(id)
    }

    function handleEdited(id) {
        let newObj = { ...EditInputs }
        handleEdite(id, newObj)
        handleCloseEd()
    }

    function handleDeleted(id) {
        handelDelete(id)
    }
    // ======Handlers =======//


    return (
        <Card className='card' sx={{ direction: 'rtl', }}>
            <CardContent>
                <Grid container spacing={2} sx={{
                    display: "flex", justifyContent: "center",
                    alignItems: "center",
                }}>
                    <Grid size={8}>
                        <div style={{ textAlign: "right" }} className='info'>
                            <h2 style={{ textDecoration: todo.isCompleted ? "line-through" : "none" }}>{todo.title}</h2>
                            <p>{todo.details}</p>
                        </div>
                    </Grid>
                    <Grid size={4}>
                        <div className='icons'>
                            {/* Check Button */}
                            <IconButton
                                onClick={() => {
                                    handleChecked(todo.id);
                                }}
                                className="iconButton"
                                aria-label="delete"
                                style={{
                                    color: todo.isCompleted ? "white" : "#8bc34a",
                                    background: todo.isCompleted ? "#8bc34a" : "white",
                                    border: "solid #8bc34a 3px",
                                }}><CheckIcon style={{}}></CheckIcon></IconButton>
                            {/*==== Check Button =====*/}

                            {/* Edit Button */}
                            <IconButton onClick={handleClickOpenEd}><EditOutlinedIcon></EditOutlinedIcon></IconButton>
                            {/* ========Edit Button====*/}

                            {/* delete Button */}
                            <IconButton onClick={handleClickOpenDel}><DeleteOutlineOutlinedIcon></DeleteOutlineOutlinedIcon></IconButton>
                            {/*======== delete Button =========*/}

                        </div>
                    </Grid>
                </Grid>
            </CardContent>
            {/* // Delete Modal */}
            <>
                <Dialog
                    open={openDel}
                    onClose={handleCloseDel}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Are you sure you want to delte this task ?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            if you confirm you can not restore the task
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button className='EditCloseModel' onClick={handleCloseDel}>close</Button>
                        <Button className='EditConfirmModel' onClick={() => {
                            handleDeleted(todo.id)
                        }} autoFocus>
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
            {/* // ========Delete Modal======== // */}

            {/* Edit Modal */}
            <>
                <Dialog
                    open={openEd}
                    onClose={handleCloseEd}
                >
                    <DialogTitle>Edit Task</DialogTitle>
                    <DialogContent>
                        <TextField
                            value={EditInputs.newTitle}
                            onChange={(event) => {
                                setEditInputs({ ...EditInputs, newTitle: event.target.value })
                            }}
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="email"
                            label="New Task Title"
                            type="email"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            value={EditInputs.newDetails}
                            onChange={(event) => {
                                setEditInputs({ ...EditInputs, newDetails: event.target.value })
                            }}
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="email"
                            label="New Task Details"
                            type="email"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseEd}>Cancel</Button>
                        <Button onClick={() => {
                            handleEdited(todo.id)
                        }}>Update</Button>
                    </DialogActions>
                </Dialog>
            </>
            {/* ========Edit Modal========== */}
        </Card>
    )
}