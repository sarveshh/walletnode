import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Box, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Form from "./form";
import { ErrorPanel, PushToTalkButton } from "@speechly/react-ui";
import { useSpeechContext } from "@speechly/react-client";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  desktop: {
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  button: {
    marginLeft: theme.spacing(1),
    width: "180px",
    textTransform: "capitalize",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  mobile: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

export default function AddTransactions() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const { segment } = useSpeechContext();

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Button
        variant="contained"
        color="default"
        className={classes.button}
        startIcon={<AddIcon />}
        onClick={handleClickOpen}
      >
        Add Transaction
      </Button>
      <IconButton
        aria-label="Add Transactions"
        color="inherit"
        onClick={handleClickOpen}
        className={classes.desktop}
      >
        <AddIcon />
      </IconButton>
      <Dialog
        open={open}
        maxWidth="md"
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <Box p={3}>
          <Box justifyContent="flex-start" alignItems="center" display="flex">
            <DialogTitle id="form-dialog-title">
              <Typography variant="h4">Add Transaction</Typography>
            </DialogTitle>
            <div>
              <PushToTalkButton size="3rem" />
              <ErrorPanel />
            </div>
          </Box>

          <DialogContent>
            {segment ? (
              <div className="segment">
                {segment.words.map((w) => w.value).join(" ")}
              </div>
            ) : null}
            <Form />
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={handleClose}
              color="secondary"
              fullWidth
            >
              Cancel
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}
