import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import Slide from "@material-ui/core/Slide";
import Typography from "@material-ui/core/Typography";
import { APIs } from "../constants/requests";
import { fetchApi } from "../utilities/functions";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const VoteBattle = ({ songs, setOpen, open, partyId }) => {
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        if (open) {
            const timer = setInterval(() => {
                setProgress((oldProgress) => {
                    if (oldProgress === 0) {
                        setOpen(false);
                        return 0;
                    }
                    return Math.min(oldProgress - 10, 100);
                });
            }, 1000);

            return () => {
                clearInterval(timer);
            };
        }
    }, [open]);

    useEffect(() => {
        setProgress(100);
    }, [songs]);

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => setOpen(false)}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            fullWidth={true}
            maxWidth="xs"
        >
            <DialogTitle id="alert-dialog-slide-title">Vota una canzone</DialogTitle>
            <DialogContent>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        height: 60,
                        width: "100%"
                    }}
                >
                    <Button
                        variant="outlined"
                        onClick={async () => {
                            const request = {
                                url: `${APIs.parties.all}/${partyId}/battle/${songs[0].id}/vote`,
                                method: "GET"
                            };
                            const response = await fetchApi(request);
                            setOpen(false);
                        }}
                        style={{ height: 40, width: "48%" }}
                    >
                        <Typography style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {songs[0].title}
                        </Typography>
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={async () => {
                            const request = {
                                url: `${APIs.parties.all}/${partyId}/battle/${songs[1].id}/vote`,
                                method: "GET"
                            };
                            const response = await fetchApi(request);
                            setOpen(false);
                        }}
                        style={{ width: "48%", height: 40 }}
                    >
                        <Typography style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {songs[1].title}
                        </Typography>
                    </Button>
                </div>
                <LinearProgress variant="determinate" value={progress} />
            </DialogContent>
        </Dialog>
    );
};

export default VoteBattle;
