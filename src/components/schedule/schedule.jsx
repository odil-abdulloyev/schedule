import Day from '../day/day';
import Typography from '@material-ui/core/Typography';

export default function Schedule({ title }) {
  return (
    <>
      <Typography>
        <h1>{title}</h1>
      </Typography>
      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
        <Day name={day} key={day} />
      ))}
    </>
  );
}
