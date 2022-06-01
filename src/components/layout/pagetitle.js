import React from "react";
import { Typography } from "../wrapper";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  pageTitleContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(2),
  },
  typo: {
    color: theme.palette.text.hint,
  },
  button: {
    boxShadow: theme.customShadows.widget,
    textTransform: "none",
    "&:active": {
      boxShadow: theme.customShadows.widgetWide,
    },
  },
}));

export default function PageTitle(props) {
  var classes = useStyles();

  return (
    <div className={classes.pageTitleContainer}>
      <Typography className={classes.typo} variant="h1" size="sm">
        {props.title}
      </Typography>
      {props.button && props.button}
    </div>
  );
}
