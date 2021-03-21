import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  makeStyles,
} from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import AdminForm from '../admin-form/admin-form';
import database from '../../utils/database';

const useStyles = makeStyles({
  root: {
    color: '#585858',
  },
  card: {
    marginBottom: '2rem',
  },
});

export default function Day({ name, controls }) {
  const classes = useStyles();
  const [addItemModalIsOpen, setAddItemModalIsOpen] = useState(false);
  const [editItemModalIsOpen, setEditItemModalIsOpen] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const [data, setData] = useState({});

  useEffect(() => {
    database.select(`${name}`, (schedule) => {
      setData(schedule);
    });
  }, [name]);

  const removeitem = (id) => {
    database.remove(`${name}/${id}`);
  };

  const handleAddItemModalOpen = (open) => {
    setAddItemModalIsOpen(open);
  };

  const handleEditItemModalOpen = (open) => {
    setEditItemModalIsOpen(open);
  };

  return (
    <>
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.root} align='center'>
            <h2>{name}</h2>
          </Typography>
          <TableContainer component={Paper}>
            <Table size='small' aria-label='a dense table'>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.root}>#</TableCell>
                  <TableCell className={classes.root} align='center'>
                    Lesson
                  </TableCell>
                  <TableCell className={classes.root} align='center'>
                    Room
                  </TableCell>
                  <TableCell className={classes.root} align='center'>
                    Teacher
                  </TableCell>
                  <TableCell className={classes.root} align='center'>
                    Time
                  </TableCell>
                  {controls && (
                    <TableCell className={classes.root} align='center'>
                      Remove
                    </TableCell>
                  )}
                  {controls && (
                    <TableCell className={classes.root} align='center'>
                      Edit
                    </TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(data || {}).map((id, i) => (
                  <TableRow key={id}>
                    <TableCell className={classes.root} component='th' scope='row'>
                      {i + 1}
                    </TableCell>
                    <TableCell className={classes.root} align='center'>
                      {data[id].lesson}
                    </TableCell>
                    <TableCell className={classes.root} align='center'>
                      {data[id].room}
                    </TableCell>
                    <TableCell className={classes.root} align='center'>
                      {data[id].teacher}
                    </TableCell>
                    <TableCell className={classes.root} align='center'>
                      {data[id].time}
                    </TableCell>
                    {controls && (
                      <TableCell align='center'>
                        <Button onClick={() => removeitem(id)} color='secondary'>
                          <DeleteIcon color='secondary' />
                        </Button>
                      </TableCell>
                    )}
                    {controls && (
                      <TableCell align='center'>
                        <Button
                          onClick={() => {
                            setEditItemModalIsOpen(true);
                            setEditItemId(id);
                          }}
                          color='primary'
                        >
                          <EditIcon color='primary' />
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
        <CardActions>
          <Button
            onClick={() => {
              handleAddItemModalOpen(true);
            }}
            variant='outlined'
          >
            <AddIcon />
          </Button>
        </CardActions>
      </Card>
      <AdminForm
        name={name}
        handleOpen={handleAddItemModalOpen}
        isOpen={addItemModalIsOpen}
        type='add'
      />
      <AdminForm
        name={name}
        id={editItemId}
        handleOpen={handleEditItemModalOpen}
        isOpen={editItemModalIsOpen}
        type='edit'
      />
    </>
  );
}
