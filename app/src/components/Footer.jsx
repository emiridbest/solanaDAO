import React from "react";
import {
  AppBar,
  Box,
  Container,
  Link,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";
import GitHubIcon from "@material-ui/icons/GitHub";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "transparent",
    boxShadow: "none",
    borderTop: "1px solid #e6e6e5",
    flexShrink: 0,
    marginTop: theme.spacing(2),
  },
  toolbar: {
    justifyContent: "space-between",
  },
  twitter: {
    marginRight: theme.spacing(1),
  },
}));

export default function Footer({ programID, voteAccount }) {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.root}>
      <Container maxWidth="xl">
        <Toolbar className={classes.toolbar}>
          <Typography variant="caption">
            {" "}
            <Link underline="always" href="https://brianfriel.xyz">
              Thanks @ Brian Friel
            </Link>
            {" | "}
            Powered by{" "}
            <Link underline="always" href="https://solana.com/">
Rust            </Link>
            {" | "}
            <Link
              underline="always"
              href={`https://explorer.solana.com/address/${programID.toString()}`}
            >
              Program ID
            </Link>
            {" | "}
            <Link
              underline="always"
              href={`https://explorer.solana.com/address/${voteAccount?.toString()}`}
            >
              Vote Account
            </Link>
            {" | "}
            <Link underline="always" href="https://www.freepik.com">
              Icon Credits
            </Link>
          </Typography>
          <Box>
            <Link
              className={classes.twitter}
              href="https://twitter.com/emiridbest"
            >
              <TwitterIcon />
            </Link>
            <Link href="https://github.com/emiridbest">
              <GitHubIcon />
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
