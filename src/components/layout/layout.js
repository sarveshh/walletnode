import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import classnames from "classnames";
import { Box, IconButton, Link } from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import GitHubIcon from "@material-ui/icons/GitHub";
import useStyles from "./layoutstyles";
import Header from "./header/header";
import Sidebar from "./sidebar/sidebar";
import Dashboard from "../../screen/dashboard/dashboard";
import Typography from "../../screen/typography/typography";
import { useLayoutState } from "../../context/LayoutContext";
import Main from "../../screen/transactions/main";
import UpdateProfile from "../Authentication/updateprofile/updateprofile";

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
      <>
        <Header history={props.history} />
        <Sidebar />
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: layoutState.isSidebarOpened,
          })}
        >
          <div className={classes.fakeToolbar} />
          <Switch>
            <Route path="/app/update-profile" component={UpdateProfile} />
            <Route path="/app/dashboard" component={Dashboard} />
            <Route path="/app/transactions" component={Main} />
            <Route path="/app/typography" component={Typography} />
            <Route
              exact
              path="/app/friends"
              render={() => <Redirect to="/app/friends/friend1" />}
            />
            {/* <Route path="/app/friends/friend1" component={Maps} />
            <Route path="/app/friends/friend2" component={Icons} />
            <Route path="/app/friends/friend3" component={Charts} /> */}
          </Switch>
          <Box
            mt={5}
            width={"100%"}
            display={"flex"}
            alignItems={"center"}
            justifyContent="space-between"
          >
            <div>
              <Link
                color={"primary"}
                href={"http://sarveshh.github.io"}
                target={"_blank"}
                className={classes.link}
              >
                Sarvesh's GitHub
              </Link>
              <Link
                color={"primary"}
                href={"http://sarveshh.github.io"}
                target={"_blank"}
                className={classes.link}
              >
                About Us
              </Link>
              <Link
                color={"primary"}
                href={"http://sarveshh.github.io"}
                target={"_blank"}
                className={classes.link}
              >
                Blog
              </Link>
            </div>
            <div>
              <Link href={"http://sarveshh.github.io"} target={"_blank"}>
                <IconButton aria-label="facebook">
                  <FacebookIcon />
                </IconButton>
              </Link>
              <Link href={"http://sarveshh.github.io"} target={"_blank"}>
                <IconButton aria-label="twitter">
                  <TwitterIcon />
                </IconButton>
              </Link>
              <Link href={"http://sarveshh.github.io"} target={"_blank"}>
                <IconButton aria-label="github" style={{ marginRight: -12 }}>
                  <GitHubIcon />
                </IconButton>
              </Link>
            </div>
          </Box>
        </div>
      </>
    </div>
  );
}

export default withRouter(Layout);
