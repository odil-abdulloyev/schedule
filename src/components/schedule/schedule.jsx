import Day from '../day/day';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  heading: {
    color: '#acacac',
  },
});

export default function Schedule({ group, controls }) {
  const classes = useStyles();

  return (
    <>
      <Typography align='right'>
        <h1 className={classes.heading}>Group #{group}</h1>
      </Typography>
      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
        <Day name={day} controls={controls} key={day} />
      ))}
    </>
  );
}
