import React from "react";
import { Box, Button, Link, Typography } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/styles";
import { WalletMultiButton } from "@solana/wallet-adapter-material-ui";
import { useWallet } from "@solana/wallet-adapter-react";

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(1),
    "&.hidden": {
      visibility: "hidden",
    },
  },
  connected: {
    color: green[500],
  },
  connectedBubble: {
    backgroundColor: green[500],
    height: 12,
    width: 12,
    borderRadius: "50%",
    marginRight: theme.spacing(0.5),
  },
  title: {
    fontWeight: 700,
  },
}));

export default function Intro({
  votes,
  initializeVoting,
  programID,
  voteAccount,
}) {
  const wallet = useWallet();
  const classes = useStyles();
  return (
    <Box textAlign="center">
      <Typography
        component="h1"
        variant="h3"
        gutterBottom
        className={classes.title}
      >
        Ayes or Nays?
      </Typography>
      <Typography variant="body1">
        Ready to vote on this proposal?
      </Typography>
      <Typography variant="body1">
        Cast your vote to our{" "}
        <Link href="https://doraHacks.io/" underline="always">
          Organizations most pressing need
        </Link>{" "}
        blockchain and help decide this once and for all!
      </Typography>
      <Box marginTop="8px">
        {wallet.connected ? (
          <Box display="flex" alignItems="center" justifyContent="center">
            <Box className={classes.connectedBubble} />
            <Typography variant="body1" className={classes.connected}>
              Connected
            </Typography>
          </Box>
        ) : (
          <Typography variant="body1">
            To get started, connect your wallet below:
          </Typography>
        )}
        <WalletMultiButton
          className={
            wallet.connected
              ? [classes.button, "hidden"].join(" ")
              : classes.button
          }
        />
      </Box>
      {(typeof votes.ayes !== "number" ||
        typeof votes.ayes !== "number") &&
        wallet.connected && (
          <Box marginTop="8px">
            <Typography variant="body1">
              This{" "}
              <Link
                href={`https://explorer.solana.com/address/${programID.toString()}`}
                underline="always"
              >
                program
              </Link>
              {"'s "}
              <Link
                href={`https://explorer.solana.com/address/${voteAccount?.toString()}`}
                underline="always"
              >
                vote account
              </Link>{" "}
              has not been initialized yet:
            </Typography>
            <Button
              color="primary"
              variant="contained"
              onClick={initializeVoting}
              className={classes.button}
            >
              Initialize Program
            </Button>
          </Box>
        )}
    </Box>
  );
}
