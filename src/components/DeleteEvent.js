import React from 'react';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

const DeleteEvent = (props) => {

    const handleDelete = () => {
        if(window.confirm("Are you sure you want to remove this event?")){
            fetch(`http://localhost:5005/api/events/${props.id}`,{
                method: "DELETE"
            }).then(response => response.json())
            .then(props.refresh)
        }
    }

    return (
        <DeleteOutlinedIcon onClick={() =>{handleDelete()}}/>
    )
}

export default DeleteEvent;