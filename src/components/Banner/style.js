import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  grid: {
    padding: 0,
    minHeight: '100vh',
  },
  container: {
    transform: 'translateY(-35vh)',
    marginBottom: '-30vh',
    [theme.breakpoints.up('sm')]: {
      transform: 'translateY(-40vh)',
      marginBottom: '-35vh',
    },
    [theme.breakpoints.up('lg')]: {
      transform: 'translate(-15vw, -65vh)',
      marginBottom: '-50vh',
    },
    [theme.breakpoints.up('xl')]: {
      transform: 'translate(-15vw, -75vh)',
      marginBottom: '-60vh',
    },
  },
  paper: {
    padding: '10vh 5vw 5vh',
    width: 650,
    maxWidth: '100%',
  },
  subtitle: {
    marginTop: '3vh',
  },
  icon: {
    color: theme.palette.primary.main,
    fontSize: '3rem',
    borderRadius: '50%',
    padding: 10,
    '&:hover': {
      transition: 'all 0.5s',
      cursor: 'pointer',
      background: theme.palette.secondary.light,
      color: '#fff',
    },
  },
  flex: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}))

export default useStyles
