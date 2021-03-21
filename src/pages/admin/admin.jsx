import { Container } from '@material-ui/core';
import React from 'react';
import Schedule from '../../components/schedule/schedule';

export default function Admin() {
  return (
    <Container maxWidth='md'>
      <Schedule group='321-19' controls />
    </Container>
  );
}
