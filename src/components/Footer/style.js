import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  footer: {
    background: theme.palette.secondary.light,
    marginTop: '5vh',
    padding: 30,
  },
  grid: {
    paddingTop: 50,
    [theme.breakpoints.up('lg')]: {
      paddingTop: 0,
    },
  },
  paper: {
    padding: '0px 30px',
    [theme.breakpoints.up('lg')]: {
      padding: '50px 30px',
    },
  },
  socialMedia: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.up('lg')]: {
      justifyContent: 'flex-end',
    },
  },
  logoContainer: {
    [theme.breakpoints.up('lg')]: {
      textAlign: 'center',
    },
  },
  logo: {
    maxHeight: 60,
  },
  icon: {
    transition: 'all 0.5s',
    '&:hover': {
      color: theme.palette.secondary.main,
      cursor: 'pointer',
      transform: 'translateY(-5px)',
    },
    [theme.breakpoints.up('lg')]: {
      marginLeft: 30,
    },
  },
  divider: {
    margin: '30px auto',
  },
  copyrightContainer: {
    marginBottom: 10,
  },
  copyright: {
    textTransform: 'capitalize',
  },
}))

export default useStyles
