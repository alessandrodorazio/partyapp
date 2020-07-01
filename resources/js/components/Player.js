import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";
import YouTube from "react-youtube";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import VolumeUp from "@material-ui/icons/VolumeUp";

const useStyles = makeStyles((theme) => ({
    button: {
        color: "#3f51b5",
        height: 60,
        width: 60
    },
    slider: {
        width: 250,
        alignItems: "center"
    }
}));

const Player = ({ song }) => {
    const classes = useStyles();

    const [state, setState] = useState(true);
    const [player, setPlayer] = useState(null);
    const [value, setValue] = useState(50);

    let code = "https://www.youtube.com/watch?v=RZhGITHIbns".replace("https://www.youtube.com/watch?v=", "");

    const playPause = () => {
        if (player) {
            if (!state) {
                player.playVideo();
            } else {
                player.pauseVideo();
            }
            setState(!state);
        }
    };

    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
        player.setVolume(newValue);
    };

    const opts = {
        height: "0",
        width: "0",
        playerVars: {
            controls: 0,
            autoplay: 1
        }
    };

    return (
        <div style={styles.root}>
            <div style={{ alignItems: "center" }}>
                <div style={{ position: "absolute" }}>
                    <YouTube
                        videoId="2MtOpB5LlUA"
                        opts={opts}
                        onReady={(e) => {
                            setPlayer(e.target);
                            e.target.setVolume(50);
                        }}
                    />
                </div>
                {!state ? (
                    <PlayCircleFilledIcon onClick={playPause} className={classes.button} />
                ) : (
                    <PauseCircleFilledIcon onClick={playPause} className={classes.button} />
                )}
            </div>
            <div className={classes.slider}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <VolumeUp />
                    </Grid>
                    <Grid item xs>
                        <Slider
                            value={typeof value === "number" ? value : 0}
                            onChange={handleSliderChange}
                            aria-labelledby="input-slider"
                        />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

const styles = {
    root: {
        height: 100,
        width: 500,
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
