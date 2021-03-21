import React, { useState, useEffect } from 'react';
import Day from '../day/day';
import Typography from '@material-ui/core/Typography';
import database from '../../utils/database';

export default function Schedule({ title }) {
  const [data, setData] = useState({});

  useEffect(() => {
    database.select('/', (schedule) => {
      setData(schedule);
    });
  }, []);

  const removeItem = (day, id) => {
    database.remove(`${day}/${id}`);
  };

  return (
    <>
      <Typography>
        <h1>{title}</h1>
      </Typography>
      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
        <Day title={day} items={data ? data[day] : {}} handleRemoveItem={removeItem} key={day} />
      ))}
    </>
  );
}
