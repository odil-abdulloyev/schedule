import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField, Modal, Backdrop, Fade } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import database from '../../utils/database';
import formatTime from '../../utils/format-time';

function getModalStyle() {
  return {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  input: {
    display: 'block',
  },
}));

export default function AddItemModal({ name, handleOpen, isOpen }) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [lesson, setLesson] = useState('');
  const [room, setRoom] = useState('');
  const [teacher, setTeacher] = useState('');
  const [time, setTime] = useState(new Date());

  const handleSubmit = (event) => {
    event.preventDefault();
    database.push(name, { lesson, room, teacher, time: formatTime(time) });
    handleOpen(false);
    setLesson('');
    setRoom('');
    setTeacher('');
    setTime(new Date());
  };

  const handleLessonChange = (event) => {
    setLesson(event.target.value);
  };

  const handleRoomChange = (event) => {
    setRoom(event.target.value);
  };

  const handleTeacherChange = (event) => {
    setTeacher(event.target.value);
  };

  const handleTimeChange = (time) => {
    setTime(time);
  };

  return (
    <Modal
      open={isOpen}
      onClose={() => handleOpen(false)}
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 300,
      }}
    >
      <Fade in={isOpen}>
        <form style={modalStyle} className={classes.paper} onSubmit={handleSubmit}>
          <TextField
            className={classes.input}
            onChange={handleLessonChange}
            value={lesson}
            id='standard-basic'
            label='Lesson'
            required
          />
          <TextField
            className={classes.input}
            onChange={handleRoomChange}
            value={room}
            id='standard-basic'
            label='Room'
            required
          />
          <TextField
            className={classes.input}
            onChange={handleTeacherChange}
            value={teacher}
            id='standard-basic'
            label='Teacher'
            required
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardTimePicker
              className={classes.input}
              margin='normal'
              id='time-picker'
              label='Start time'
              value={time}
              onChange={handleTimeChange}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
            />
          </MuiPickersUtilsProvider>
          <Button variant='contained' color='primary' type='submit'>
            Submit
          </Button>
        </form>
      </Fade>
    </Modal>
  );
}
