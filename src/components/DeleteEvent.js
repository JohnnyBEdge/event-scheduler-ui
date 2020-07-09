import React from 'react';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

const DeleteEvent = (props) => {

    const handleDelete = () => {
        if(window.confirm("Are you sure you want to remove this event?")){
            fetch(`${process.env.REACT_APP_API_URL}/api/events/${props.id}`,{
                method: "DELETE"
            }).then(response => response.json())
            .then(resData => resData.deletedCount === 1 ? props.handleEventRemoval(props.id) : console.log("Could not delete"))
            .then(props.handleChange())
        };
    };

    return (
        <DeleteOutlinedIcon  color="error" onClick={() =>{handleDelete()}}/>
    )
}

export default DeleteEvent;