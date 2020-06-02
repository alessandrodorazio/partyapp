import React, { useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import { ReactSVG } from "react-svg";
import IconButton from "@material-ui/core/IconButton";
import music from "../../assets/svg/music.svg";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: 752
    },
    demo: {
        backgroundColor: theme.palette.background.paper
    },
    title: {
        margin: theme.spacing(4, 0, 2)
    }
}));

function generate(element) {
    return [0, 1, 2].map((value) =>
        React.cloneElement(element, {
            key: value
        })
    );
}

const PlaylistList = ({ playlists }) => {
    const classes = useStyles();

    const [dense, setDense] = useState(false);
    const [secondary, setSecondary] = useState(false);

    return (
        <div className={classes.demo}>
            <List dense={dense}>
                {playlists.map((playlist) => (
                    <ListItem key={playlist.id}>
                        <ListItemAvatar>
                            <Avatar
                                onClick={() => {
                                    console.log("ciao");
                                }}
                            >
                                <ReactSVG
                                    src={music}
                                    style={{
                                        width: 25,
                                        height: 25
                                    }}
                                />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={playlist.name + " / " + playlist.genre.name + " / " + playlist.songsCount}
                            secondary={secondary ? "Secondary text" : null}
                        />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default PlaylistList;
