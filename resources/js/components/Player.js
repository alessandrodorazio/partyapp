import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";

const useStyles = makeStyles((theme) => ({
    button: {
        color: "#3f51b5",
        height: 60,
        width: 60
    }
}));

const Player = () => {
    const classes = useStyles();

    const [state, setState] = useState(false);

    return (
        <div style={styles.root}>
            {state ? (
                <PlayCircleFilledIcon onClick={() => setState(!state)} className={classes.button} />
            ) : (
                <PauseCircleFilledIcon onClick={() => setState(!state)} className={classes.button} />
            )}
            <VolumeUpIcon className={classes.button} />
        </div>
    );
};

const styles = {
    root: {
        height: 100,
        width: 300,
        borderRadius: 4,
        borderColor: "#efefef",
        backgroundColor: "white",
        webKitBoxShadow: "2px 3px 5px 0px rgba(0,0,0,0.75)",
        MozBoxShadow: "2px 3px 5px 0px rgba(0,0,0,0.75)",
        boxShadow: "2px 3px 5px 0px rgba(0,0,0,0.75)",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
    }
};

export default Player;
