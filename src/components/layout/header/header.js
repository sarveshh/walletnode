import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Grid,
  Box,
} from "@material-ui/core";
import {
  Menu as MenuIcon,
  NotificationsNone as NotificationsIcon,
  Person as AccountIcon,
  Search as SearchIcon,
  ArrowBack as ArrowBackIcon,
} from "@material-ui/icons";
import classNames from "classnames";
import { useAuth } from '../../../context/AuthContext';
import { useHistory, Link } from 'react-router-dom'
import useStyles from "./headerstyles";
import { Badge, Typography } from "../../wrapper";
import Notification from "./notification/notification";
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../../context/LayoutContext";
import AddTransactions from './addtransactions/addtransactions'
import Snackbar from '../../snackbar'

const notifications = [
  { id: 0, color: "warning", message: "Check out this awesome ticket" },
  {
    id: 1,
    color: "success",
    type: "info",
    message: "What is the best way to get ...",
  },
  {
    id: 2,
    color: "secondary",
    type: "notification",
    message: "This is just a simple notification",
  },
  {
    id: 3,
    color: "primary",
    type: "e-commerce",
    message: "12 new orders has arrived today",
  },
];

export default function Header(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local
  var [notificationsMenu, setNotificationsMenu] = useState(null);
  var [isNotificationsUnread, setIsNotificationsUnread] = useState(true);
  var [profileMenu, setProfileMenu] = useState(null);
  var [isSearchOpen, setSearchOpen] = useState(false);
  const [open, setOpen] = React.useState(false);


  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()
  async function handleLogout() {
    setError("")

    try {
      await logout()
      localStorage.removeItem('transactions')
      history.push("/Login")
    } catch {
      setOpen(true)
      setError("failed to log out")
    }
  }

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Snackbar content={error} open={open} setOpen={setOpen} />
      <Toolbar className={classes.toolbar}>
        <IconButton
          color="inherit"
          onClick={() => toggleSidebar(layoutDispatch)}
          className={classNames(
            classes.headerMenuButtonSandwich,
            classes.headerMenuButtonCollapse,
          )}
        >
          {layoutState.isSidebarOpened ? (
            <ArrowBackIcon
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse,
                ),
              }}
            />
          ) : (
            <MenuIcon
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse,
                ),
              }}
            />
          )}
        </IconButton>
        <Grid container direction="row" justify="flex-start" alignItems="center">
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-wallet" width="44" height="44"
            viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" fill="none" strokeLinecap="round"
            strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path
              d="M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12" />
            <path d="M20 12v4h-4a2 2 0 0 1 0 -4h4" />
          </svg>
          <Typography variant="subtitle2" weight="medium" className={classes.logotype}>
            WalletNode
          </Typography>
        </Grid>
        <div className={classes.grow} />
        <div
          className={classNames(classes.search, {
            [classes.searchFocused]: isSearchOpen,
          })}
        >
          <div
            className={classNames(classes.searchIcon, {
              [classes.searchIconOpened]: isSearchOpen,
            })}
            onClick={() => setSearchOpen(!isSearchOpen)}
          >
            <SearchIcon classes={{ root: classes.headerIcon }} />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
        <AddTransactions />
        <IconButton
          color="inherit"
          aria-haspopup="true"
          aria-controls="mail-menu"
          onClick={e => {
            setNotificationsMenu(e.currentTarget);
            setIsNotificationsUnread(false);
          }}
          className={classes.headerMenuButton}
        >
          <Badge
            badgeContent={isNotificationsUnread ? notifications.length : null}
            color="warning"
          >
            <NotificationsIcon classes={{ root: classes.headerIcon }} />
          </Badge>
        </IconButton>

        <IconButton
          aria-haspopup="true"
          color="inherit"
          className={classes.headerMenuButton}
          aria-controls="profile-menu"
          onClick={e => setProfileMenu(e.currentTarget)}
        >
          <AccountIcon classes={{ root: classes.headerIcon }} />
        </IconButton>
        <Menu
          id="notifications-menu"
          open={Boolean(notificationsMenu)}
          anchorEl={notificationsMenu}
          onClose={() => setNotificationsMenu(null)}
          className={classes.headerMenu}
          disableAutoFocusItem
        >
          {notifications.map(notification => (
            <MenuItem
              key={notification.id}
              onClick={() => setNotificationsMenu(null)}
              className={classes.headerMenuItem}
            >
              <Notification {...notification} typographyVariant="inherit" />
            </MenuItem>
          ))}
        </Menu>
        <Menu
          id="profile-menu"
          open={Boolean(profileMenu)}
          anchorEl={profileMenu}
          onClose={() => setProfileMenu(null)}
          className={classes.headerMenu}
          classes={{ paper: classes.profileMenu }}
          disableAutoFocusItem
        >
          <MenuItem className={classes.profileMenuUser}>
            <Typography variant="h4" weight="medium">
              <Box display="flex" alignItems="center">
                {/* <Avatar className={classes.avatar}>
                  <CgProfile />
                </Avatar> */}
                {currentUser.displayName}
              </Box>
            </Typography>
          </MenuItem>
          <MenuItem
            className={classNames(
              classes.profileMenuItem,
              classes.headerMenuItem,
            )}
          >
            <Link to="/app/update-profile" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Box display="flex" alignItems="center">
                <AccountIcon className={classes.profileMenuIcon} /> Update Profile
              </Box>
            </Link>
          </MenuItem>
          <MenuItem className={classes.profileMenuUser}>
            <Typography
              className={classes.profileMenuLink}
              color="primary"
              onClick={handleLogout}
            >
              Sign Out
            </Typography>
          </MenuItem>
        </Menu>
      </Toolbar >
    </AppBar >
  );
}
