import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  container: {
    paddingTop: '5vh',
    paddingBottom: '5vh',
  },
  innerContainer: {
    marginTop: 30,
    width: '100%',
    background: theme.palette.secondary.light,
    height: '55vh',
    [theme.breakpoints.up('md')]: {
      height: '15vh',
    },
    [theme.breakpoints.up('xl')]: {
      height: '25vh',
    },
  },
  card: {
    maxWidth: '95%',
    margin: 'auto',
    transform: 'translateY(-50vh)',
    marginBottom: '-40vh',
    [theme.breakpoints.up('md')]: {
      transform: 'translateY(-12vh)',
      marginBottom: '-8vh',
    },
    [theme.breakpoints.up('xl')]: {
      transform: 'translateY(-20vh)',
      marginBottom: '-15vh',
    },
  },
  image: {
    minWidth: '50%',
  },
  rightLetter: {
    marginLeft: 15,
  },
  author: {
    fontWeight: 600,
    marginTop: 30,
    textAlign: 'right',
    textTransform: 'capitalize',
  },
  pagination: {
    justifyContent: 'space-between',
  },
  content: {
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  },
  flex: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
}))

export default useStyles
