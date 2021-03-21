import React, { useState } from 'react';
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
import AddItemModal from '../add-item-modal/add-item-modal';

export default function Day({ title, items = {}, handleRemoveItem }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleOpen = (open) => {
    if (open) {
      setModalIsOpen(true);
    } else {
      setModalIsOpen(false);
    }
  };

  return (
    <>
      <Card>
        <CardContent>
          <Typography align='center' variant='h5'>
            {title}
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
                {Object.keys(items).map((id, i) => {
                  return (
                    <TableRow key={id}>
                      <TableCell component='th' scope='row'>
                        {i + 1}
                      </TableCell>
                      <TableCell align='left'>{items[id].lesson}</TableCell>
                      <TableCell align='right'>{items[id].room}</TableCell>
                      <TableCell align='right'>{items[id].teacher}</TableCell>
                      <TableCell align='right'>{items[id].time}</TableCell>
                      <TableCell align='center'>
                        <Button onClick={() => handleRemoveItem(title, id)} color='secondary'>
                          <DeleteIcon color='secondary' />
                        </Button>
                      </TableCell>
                      <TableCell align='center'>
                        <Button color='primary'>
                          <EditIcon color='primary' />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
        <CardActions>
          <Button
            onClick={() => {
              handleOpen(true);
            }}
            variant='outlined'
          >
            <AddIcon />
          </Button>
        </CardActions>
      </Card>
      <AddItemModal name={title} handleOpen={handleOpen} isOpen={modalIsOpen} />
    </>
  );
}
