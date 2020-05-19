import React, {useState, useEffect} from 'react';
import DateView from '../components/DateView';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// import TableSortLabel from '@material-ui/core/TableSortLabel';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Paper from '@material-ui/core/Paper';
// import Checkbox from '@material-ui/core/Checkbox';
// import IconButton from '@material-ui/core/IconButton';
// import Tooltip from '@material-ui/core/Tooltip';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Switch from '@material-ui/core/Switch';
// import DeleteIcon from '@material-ui/icons/Delete';
// import FilterListIcon from '@material-ui/icons/FilterList';

const Main = () => {

    const [events, setEvents] = useState([]);
    const [error, setError] = useState(false);

    async function fetchData(){
        const res = await fetch("http://localhost:5005/api/events");
            res.json()
            .then(res => setEvents(res))
            .catch(err => setError(err)); 
    };

    useEffect(() => {
        fetchData();
    },[]);

    // descendingComparator = (a, b, orderBy) =>  {
    //     if (b[orderBy] < a[orderBy]) {
    //       return -1;
    //     }
    //     if (b[orderBy] > a[orderBy]) {
    //       return 1;
    //     }
    //     return 0;
    //   }

    // getComparator = (order, orderBy) => {
    // return order === 'desc'
    //     ? (a, b) => descendingComparator(a, b, orderBy)
    //     : (a, b) => -descendingComparator(a, b, orderBy);
    // }

    // stableSort = (array, comparator) => {
    //     const stabilizedThis = array.map((el, index) => [el, index]);
    //     stabilizedThis.sort((a, b) => {
    //       const order = comparator(a[0], b[0]);
    //       if (order !== 0) return order;
    //       return a[1] - b[1];
    //     });
    //     return stabilizedThis.map((el) => el[0]);
    //   }

    //   EnhancedTableHead = (props) => {
    //     const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    //     const createSortHandler = (property) => (event) => {
    //       onRequestSort(event, property);
    //     };


    const displayEvent = events.map((event) => {
        return  <ExpansionPanel>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <TableRow key={event.id}>
                        <Typography>{event.name}</Typography>
                        </TableRow>

                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>

                            {event.date} <br/>
                            {event.type} <br/>
                            {event.details}
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>

        
        // <TableRow key={event.id}>
        //             <TableCell>{event.name}</TableCell>
        //             <TableCell>{event.date}</TableCell>
        //         </TableRow>
    })

    return (
        <div id="main_container">

            <DateView />

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell> Event </TableCell>
                            <TableCell> Date </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {displayEvent}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Expansion Panel 1</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel> */}
        </div>
    )
};

export default Main;