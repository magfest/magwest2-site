import { Grid } from '@material-ui/core';
import styled from '../utils/styled';

const Section = styled(Grid, {
  component: 'section',
  spacing: 0,
  justify: 'center',
  container: true,
})(theme => ({
  padding: '0',
}));

export default Section;
