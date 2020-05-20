// import React, {useState} from 'react';
// import Calendar from '../components/Calendar';

// import TableCell from '@material-ui/core/TableCell';
// import TableRow from '@material-ui/core/TableRow';
// import Button from '@material-ui/core/Button';
// // import AddIcon from '@material-ui/icons/Add';
// import TextField from '@material-ui/core/TextField';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormControl from '@material-ui/core/FormControl';
// import FormGroup from '@material-ui/core/FormGroup';
// import Select from '@material-ui/core/Select';
// import TextareaAutosize from '@material-ui/core/TextareaAutosize';


// const AddEvent = () => {

//     const [open, setOpen] = useState(false);

//     const handleOpen = () => {
//         setOpen(true);
//       };
    
//       const handleClose = () => {
//         setOpen(false);
//       };

//     return (
//         <div>
//             <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
//                 <DialogTitle id="form-dialog-title">Add an Event</DialogTitle>
//                 <DialogContent>

//                 <FormGroup>
//                     <TextField id="outlined-basic" label="Event Name" variant="outlined" />
//                 </FormGroup>
                

//                 <FormControl variant="outlined">
//                     <FormGroup>
//                         <InputLabel id="select_type_label">Age</InputLabel>
//                         <Select
//                             labelId="select_type_label"
//                             id="select_type"
//                             //   value={age}
//                             //   onChange={handleChange}
//                             >
//                             <MenuItem value="Event">Event</MenuItem>
//                             <MenuItem value="Appointment">Appointment</MenuItem>
//                             <MenuItem value="Meeting">Meeting</MenuItem>
//                         </Select>
//                     </FormGroup>

//                     <FormGroup>
//                         <TextareaAutosize aria-label="Details" rowsMin={3} cols='35' placeholder="Details" />
//                     </FormGroup>
                        
//                     <FormGroup>
//                         <Calendar />
//                     </FormGroup>

//                 </FormControl>


//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleClose} color="primary">
//                         Cancel
//                     </Button>
//                     <Button onClick={handleClose} color="primary">
//                         Add
//                     </Button>
//                 </DialogActions>
//             </Dialog>


//             <TableRow>
//                 <TableCell>
//                     {/* <Button
//                         variant="contained"
//                         color="primary"
//                         startIcon={<AddIcon />}
//                         onClick={() => {handleOpen()}}
//                     >
//                     Add Event
//                     </Button> */}
//                 </TableCell>
//             </TableRow>
//         </div>

//     )
// };

// export default AddEvent;