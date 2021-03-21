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
} from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import AdminForm from '../admin-form/admin-form';
import database from '../../utils/database';

export default function Day({ name }) {
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
      <Card>
        <CardContent>
          <Typography align='center' variant='h5'>
            {name}
          </Typography>
          <TableContainer component={Paper}>
            <Table size='small' aria-label='a dense table'>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell align='left'>Lesson</TableCell>
                  <TableCell align='right'>Room</TableCell>
                  <TableCell align='right'>Teacher</TableCell>
                  <TableCell align='right'>Time</TableCell>
                  <TableCell align='center'>Remove</TableCell>
                  <TableCell align='center'>Edit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(data || {}).map((id, i) => (
                  <TableRow key={id}>
                    <TableCell component='th' scope='row'>
                      {i + 1}
                    </TableCell>
                    <TableCell align='left'>{data[id].lesson}</TableCell>
                    <TableCell align='right'>{data[id].room}</TableCell>
                    <TableCell align='right'>{data[id].teacher}</TableCell>
                    <TableCell align='right'>{data[id].time}</TableCell>
                    <TableCell align='center'>
                      <Button onClick={() => removeitem(id)} color='secondary'>
                        <DeleteIcon color='secondary' />
                      </Button>
                    </TableCell>
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
