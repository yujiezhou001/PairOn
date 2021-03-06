import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    padding: 0,
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  }
}));

export function ActiveConvo(props) {
  const classes = useStyles();

  const findChatterInfo = userId => {
    const chatPartner = props.clientList.find(element => element.id === userId);
    return chatPartner;
  };

  const findLatestMsg = userId => {
    const latestMsg = props.messages
      .reverse()
      .find(
        element => element.senderId === userId || element.recipientId === userId
      );
    return latestMsg;
  };

  const currentChatter = findChatterInfo(props.chatterId);
  const latestMsg = findLatestMsg(props.chatterId);

  const isLongMsg = message => {
    if (message.content.length > 40) {
      return message.content.slice(0, 40) + "...";
    }
    return message.content;
  };

  const displayMsg = isLongMsg(latestMsg);

  return (
    <List className={classes.root}>
      <ListItem alignItems="flex-start" style={{ padding: "8px" }}>
        <ListItemAvatar>
          <Link to={`/chat/${JSON.stringify(props.chatterId)}`}>
            <img
              className="rounded-circle"
              src={currentChatter.avatarURL}
              style={{ width: "55px", padding: "0 10px" }}
            />
          </Link>
        </ListItemAvatar>
        <ListItemText
          primary={currentChatter.firstName}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {displayMsg}
              </Typography>
              {` - ${latestMsg.datetime}`}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
  );
}

// export { ActiveConvo };
