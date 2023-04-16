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
      color: 'maroon'
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
  searchForm: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50px',
    background: '#fff',
    padding: '5px 10px',
    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.3)',
  },
  searchInput: {
    flex: '1',
    border: 'none',
    padding: '8px',
    borderRadius: '50px 0 0 50px',
    outline: 'none',
    fontSize: '1rem',
  },
  searchButton: {
    background: 'transparent',
    border: 'none',
    padding: '8px 10px',
    borderRadius: '0 50px 50px 0',
    cursor: 'pointer',
  },
  searchIcon: {
    color: '#555',
    fontSize: '1.2rem',
  },
}));
