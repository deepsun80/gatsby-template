import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import { useState, useEffect } from "react"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import AppBar from "@material-ui/core/AppBar"
import Button from "@material-ui/core/Button"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import MenuItem from "@material-ui/core/MenuItem"
import Menu from "@material-ui/core/Menu"
import SignoutModal from "./SignoutModal"
import { IoIosMenu } from "react-icons/io"
import headerIndex from "../../utils/headerIndex"
import useStyles from "./style"

const Navbar = ({
  logo,
  scroll,
  web,
  siteTitle,
  signoutHeader,
  setFilter,
  logout,
}) => {
  const classes = useStyles()

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null)
  const [menuColor, setMenuColor] = useState(!!scroll)
  const [modal, setModal] = useState(false)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const headerColorChange = () => {
    const windowsScrollTop = window.pageYOffset
    if (windowsScrollTop > 200) {
      setMenuColor(false)
    } else {
      setMenuColor(true)
    }
  }

  const handleOpen = () => {
    setModal(true)
  }

  const handleClose = () => {
    setModal(false)
  }

  useEffect(() => {
    if (scroll) {
      window.addEventListener("scroll", headerColorChange)
    }
    return function cleanup() {
      if (scroll) {
        window.removeEventListener("scroll", headerColorChange)
      }
    }
  })

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const renderMenu = (link, linkTitle, linkId) => (
    <AniLink fade to={link} title={link} alt={link}>
      <MenuItem
        className={classNames(
          classes.navLink,
          menuColor
            ? classes.navLinkPrimaryColor
            : classes.navLinkSecondaryColor
        )}
        id={linkId}
        onClick={handleMobileMenuClose}
      >
        {linkTitle}
      </MenuItem>
    </AniLink>
  )

  const mobileMenuId = "menu-mobile"
  const renderMobileMenu = web ? (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {headerIndex.map((link, index) => {
        return (
          <div key={index}>{renderMenu(link.path, link.name, link.name)}</div>
        )
      })}
      <AniLink
        fade
        to={"/schedule"}
        title="schedule online"
        alt="schedule online"
      >
        <Button
          variant="outlined"
          size="small"
          color="secondary"
          className={classes.mobileButton}
          onClick={handleMobileMenuClose}
        >
          schedule online
        </Button>
      </AniLink>
    </Menu>
  ) : (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem
        className={classNames(
          classes.navLink,
          menuColor
            ? classes.navLinkPrimaryColor
            : classes.navLinkSecondaryColor
        )}
        id="appointments"
        onClick={() => {
          setFilter("appts")
          sessionStorage.setItem("dashboard", "appts")
          handleMobileMenuClose()
        }}
      >
        appointments
      </MenuItem>
      <MenuItem
        className={classNames(
          classes.navLink,
          menuColor
            ? classes.navLinkPrimaryColor
            : classes.navLinkSecondaryColor
        )}
        id="leads"
        onClick={() => {
          setFilter("customers")
          sessionStorage.setItem("dashboard", "customers")
          handleMobileMenuClose()
        }}
      >
        customers
      </MenuItem>
      <MenuItem
        className={classNames(
          classes.navLink,
          menuColor
            ? classes.navLinkPrimaryColor
            : classes.navLinkSecondaryColor
        )}
        id="leads"
        onClick={() => {
          setFilter("leads")
          sessionStorage.setItem("dashboard", "leads")
          handleMobileMenuClose()
        }}
      >
        leads
      </MenuItem>
      <Button
        variant="text"
        size="small"
        color="secondary"
        className={classes.mobileButton}
        onClick={handleOpen}
      >
        sign out
      </Button>
    </Menu>
  )

  return (
    <>
      <AppBar
        position="fixed"
        className={classNames(
          classes.appPadding,
          menuColor ? classes.navPrimaryColor : classes.navSecondaryColor
        )}
      >
        <Toolbar>
          <AniLink fade to="/" title={siteTitle} alt={siteTitle}>
            <img
              alt={`${siteTitle} Logo`}
              title={`${siteTitle} Logo`}
              src={logo}
              className={classNames(
                classes.logo,
                menuColor
                  ? classes.logoPrimaryHeight
                  : classes.logoSecondaryHeight
              )}
            />
          </AniLink>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {web ? (
              headerIndex.map((link, index) => {
                return (
                  <div key={index}>
                    {renderMenu(link.path, link.name, link.name)}
                  </div>
                )
              })
            ) : (
              <>
                <MenuItem
                  className={classNames(
                    classes.navLink,
                    menuColor
                      ? classes.navLinkPrimaryColor
                      : classes.navLinkSecondaryColor
                  )}
                  id="appointments"
                  onClick={() => {
                    setFilter("appts")
                    sessionStorage.setItem("dashboard", "appts")
                  }}
                >
                  appointments
                </MenuItem>
                <MenuItem
                  className={classNames(
                    classes.navLink,
                    menuColor
                      ? classes.navLinkPrimaryColor
                      : classes.navLinkSecondaryColor
                  )}
                  id="customers"
                  onClick={() => {
                    setFilter("customers")
                    sessionStorage.setItem("dashboard", "customers")
                  }}
                >
                  customers
                </MenuItem>
                <MenuItem
                  className={classNames(
                    classes.navLink,
                    menuColor
                      ? classes.navLinkPrimaryColor
                      : classes.navLinkSecondaryColor
                  )}
                  id="leads"
                  onClick={() => {
                    setFilter("leads")
                    sessionStorage.setItem("dashboard", "leads")
                  }}
                >
                  leads
                </MenuItem>
                <Button
                  variant="outlined"
                  size="medium"
                  color="secondary"
                  className={menuColor ? classes.navButton : null}
                  onClick={handleOpen}
                >
                  sign out
                </Button>
              </>
            )}
            {web && (
              <AniLink
                fade
                to={"/schedule"}
                title="schedule online"
                alt="schedule online"
              >
                <Button
                  variant="outlined"
                  size="medium"
                  color="secondary"
                  className={menuColor ? classes.navButton : null}
                >
                  schedule online
                </Button>
              </AniLink>
            )}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="Show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              className={
                menuColor
                  ? classes.iconPrimaryColor
                  : classes.iconSecondaryColor
              }
            >
              <IoIosMenu />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      <SignoutModal
        onClose={handleClose}
        open={modal}
        header={signoutHeader}
        logout={logout}
      />
    </>
  )
}

Navbar.defaultProps = {
  web: false,
  scroll: false,
  signoutHeader: "",
  setFilter: () => {},
  logout: () => {},
}

Navbar.propTypes = {
  logo: PropTypes.string.isRequired,
  scroll: PropTypes.bool,
  web: PropTypes.bool,
  siteTitle: PropTypes.string.isRequired,
  signoutHeader: PropTypes.string,
  setFilter: PropTypes.func,
  logout: PropTypes.func,
}

export default Navbar
