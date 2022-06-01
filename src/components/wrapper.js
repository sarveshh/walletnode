import React from "react";
import {
  withStyles,
  Badge as BadgeBase,
  Typography,
} from "@material-ui/core";
import { useTheme, makeStyles } from "@material-ui/styles";
import classnames from "classnames";

// styles
var useStyles = makeStyles(theme => ({
  badge: {
    fontWeight: 600,
    height: 16,
    minWidth: 16,
  },
}));

function Badge({ children, colorBrightness, color, ...props }) {
  var classes = useStyles();
  var theme = useTheme();
  var Styled = createStyled({
    badge: {
      backgroundColor: getColor(color, theme, colorBrightness),
    },
  });

  return (
    <Styled>
      {styledProps => (
        <BadgeBase
          classes={{
            badge: classnames(classes.badge, styledProps.classes.badge),
          }}
          {...props}
        >
          {children}
        </BadgeBase>
      )}
    </Styled>
  );
}

export { Badge, Typography };

// ########################################################################

function getColor(color, theme, brigtness = "main") {
  if (color && theme.palette[color] && theme.palette[color][brigtness]) {
    return theme.palette[color][brigtness];
  }
}

function createStyled(styles, options) {
  var Styled = function (props) {
    const { children, ...other } = props;
    return children(other);
  };

  return withStyles(styles, options)(Styled);
}
