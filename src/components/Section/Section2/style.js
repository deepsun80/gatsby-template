import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  background: {
    background: `linear-gradient(left, ${theme.palette.secondary.light} 40%, #fff 40%)`,
  },
  container: {
    padding: '8vh 0vw 0vh',
  },
  imageSection: {
    width: 800,
    margin: '2vh auto',
    maxWidth: '90%',
  },
  paper: {
    padding: '15px 0px 15px 15px',
    transform: 'translate(-10px, -50px)',
    [theme.breakpoints.up('sm')]: {
      transform: 'translate(-10px, -80px)',
    },
    [theme.breakpoints.up('md')]: {
      transform: 'translate(-20px, -190px)',
    },
    [theme.breakpoints.up('lg')]: {
      width: 450,
      transform: 'translate(-115px, -210px)',
    },
    display: 'flex',
    justifyContent: 'space-between',
  },
  header: {
    marginBottom: 10,
  },
  icon: {
    color: theme.palette.primary.main,
    fontSize: '2.5rem',
    borderRadius: '50%',
    padding: 10,
    '&:hover': {
      transition: 'all 0.5s',
      cursor: 'pointer',
      color: theme.palette.secondary.light,
    },
    marginTop: '5%',
    [theme.breakpoints.up('sm')]: {
      marginTop: '10%',
    },
    [theme.breakpoints.up('md')]: {
      marginTop: '25%',
    },
  },
}))

export default useStyles
