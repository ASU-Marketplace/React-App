import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    width: '100%',
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  root: {
    flexGrow: 1,
  },
  link: {
    textDecoration: 'red',
    '&:hover': {
      textDecoration: 'overline',
    },
    '&:visited': {
      color: 'purple',
    },
  },
  gridBox: {
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.3)',
    },
    transition: 'all 0.3s ease-in-out',
  },
}));