import { Container } from '@material-ui/core';
import React from 'react';
import Schedule from '../../components/schedule/schedule';
import { Link } from 'react-router-dom';
import { Typography, Link as MaterialLink } from '@material-ui/core';

export default function Home() {
  return (
    <Container maxWidth='md'>
      <Link to='/login'>
        <Typography>
          <MaterialLink>Login</MaterialLink>
        </Typography>
      </Link>
      <Schedule group='321-19' />
    </Container>
  );
}
