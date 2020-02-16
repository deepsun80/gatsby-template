import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  appPadding: {
    // [theme.breakpoints.up('md')]: {
    //   paddingLeft: '10vw',
    //   paddingRight: '10vw',
    //   paddingTop: '1vh',
    // },
    // [theme.breakpoints.down('sm')]: {
    //   paddingLeft: '5vw',
    //   paddingTop: '1vh',
    // },
    transition: 'all 0.5s',
    paddingTop: '1vh',
    [theme.breakpoints.up('sm')]: {
      paddingTop: '2vh',
    },
    [theme.breakpoints.up('lg')]: {
      paddingBottom: '1vh',
    },
  },
  logo: {
    cursor: 'pointer',
    transition: 'all 0.5s',
  },
  logoPrimaryHeight: {
    maxHeight: 60,
    [theme.breakpoints.up('md')]: {
      maxHeight: 65,
    },
    [theme.breakpoints.up('lg')]: {
      maxHeight: 80,
    },
  },
  logoSecondaryHeight: {
    maxHeight: 45,
    [theme.breakpoints.up('md')]: {
      maxHeight: 50,
    },
    [theme.breakpoints.up('lg')]: {
      maxHeight: 60,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  navPrimaryColor: {
    background: 'transparent',
    boxShadow: 'none',
  },
  navSecondaryColor: {
    background: '#fff',
    boxShadow:
      ' 0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
  },
  navLinkPrimaryColor: {
    color: theme.palette.primary.dark,
    [theme.breakpoints.up('md')]: {
      color: '#fff',
    },
  },
  navLinkSecondaryColor: {
    color: theme.palette.primary.dark,
  },
  iconPrimaryColor: {
    color: '#fff',
  },
  iconSecondaryColor: {
    color: theme.palette.primary.main,
  },
  link: {
    textDecoration: 'none',
  },
  navLink: {
    textTransform: 'uppercase',
    padding: 0,
    margin: '0 15px',
    fontSize: '0.9rem',
    transition: 'all 0.2s',
    [theme.breakpoints.up('md')]: {
      borderBottom: '2px solid transparent',
    },
    '&:hover': {
      opacity: 0.8,
      [theme.breakpoints.up('md')]: {
        borderBottom: '2px solid #fff',
      },
      background: 'transparent',
    },
    paddingBottom: '1vh',
  },
}))

export default useStyles
