import { Container } from '@material-ui/core';
import React from 'react';
import Schedule from '../../components/schedule/schedule';

export default function Admin() {
  return (
    <Container>
      <Schedule title='TUIT Software Engineering Faculty' />
    </Container>
  );
}
