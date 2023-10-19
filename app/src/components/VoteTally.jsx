import React from "react";
import {
  Avatar,
  Box,
  LinearProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { formatWithCommas, percentize } from "../utils/helpers";

const useStyles = makeStyles((theme) => ({
  avatar: {
    height: 48,
    width: 48,
    borderRadius: "initial",
    "&.left": {
      marginRight: theme.spacing(0.5),
    },
    "&.right": {
      marginLeft: theme.spacing(0.5),
    },
  },
  progress: {
    backgroundColor: theme.palette.primary.main,
    height: 25,
  },
}));

// Show vote counts for each side
export default function VoteTally({ votes }) {
  const classes = useStyles();

  function getProgress() {
    if (
      typeof votes.ayes !== "number" ||
      typeof votes.nays !== "number" ||
      votes.ayes + votes.nays === 0
    ) {
      return 50;
    }
    return (votes.ayes / (votes.nays + votes.ayes)) * 100;
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" marginBottom="5px">
        <Box display="flex" alignItems="flex-end">
          <Avatar
            alt=""
            src="/images/ayes-icon.svg"
            className={[classes.avatar, "left"].join(" ")}
          />
          <Typography variant="h6">Team Ayes</Typography>
        </Box>
        <Box display="flex" alignItems="flex-end" textAlign="right">
          <Typography variant="h6">Team Nays</Typography>
          <Avatar
            alt=""
            src="/images/nays-icon.svg"
            className={[classes.avatar, "right"].join(" ")}
          />
        </Box>
      </Box>
      <LinearProgress
        variant="determinate"
        value={getProgress()}
        color="secondary"
        className={classes.progress}
      />
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography variant="h3">
            {formatWithCommas(votes.ayes)}
          </Typography>
          <Typography variant="h6">
            {percentize(votes.ayes / (votes.ayes + votes.nays))}
          </Typography>
        </Box>
        <Box textAlign="right">
          <Typography variant="h3">{formatWithCommas(votes.nays)}</Typography>
          <Typography variant="h6">
            {percentize(votes.nays / (votes.ayes + votes.nays))}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
