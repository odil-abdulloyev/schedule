import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField, Modal, Backdrop, Fade, Select, MenuItem } from '@material-ui/core';
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
  select: {
    marginTop: 15,
  },
}));

export default function AdminForm({ name, id, handleOpen, isOpen, type }) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [lesson, setLesson] = useState('');
  const [lessonType, setLessonType] = useState('Лекция');
  const [room, setRoom] = useState('');
  const [teacher, setTeacher] = useState('');
  const [time, setTime] = useState(new Date());

  const handleLessonChange = (event) => {
    setLesson(event.target.value);
  };

  const handleLessonTypeChange = (event) => {
    setLessonType(event.target.value);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    handleOpen(false);
    setLesson('');
    setLessonType('Лекция');
    setRoom('');
    setTeacher('');
    setTime(new Date());
    switch (type) {
      case 'add':
        database.push(name, { lesson, lessonType, room, teacher, time: formatTime(time) });
        break;
      case 'edit':
        database.update(`${name}/${id}`, {
          lesson,
          lessonType,
          room,
          teacher,
          time: formatTime(time),
        });
        break;
      default:
        return;
    }
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
          <Select className={classes.select} value={lessonType} onChange={handleLessonTypeChange}>
            <MenuItem value='Лекция'>Лекция</MenuItem>
            <MenuItem value='Практика'>Практика</MenuItem>
            <MenuItem value='Лабораторная'>Лабораторная</MenuItem>
          </Select>
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
