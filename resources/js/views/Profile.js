import React, { useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import PartyCard from "../components/partyCard";
import DialogForm from "../components/dialogForm";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        "& .MuiTextField-root": {
            margin: theme.spacing(1),
            width: "25ch"
        }
    },
    addPartyButton: {
        marginTop: 15
    }
}));

const Profile = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    return (
        <Fragment>
            <div className="party-panel-container">
                <PartyCard />
                <Button variant="outlined" className={classes.addPartyButton} onClick={handleClickOpen} color="primary">
                    Aggiungi un party
                </Button>
            </div>
            <DialogForm open={open} setOpen={setOpen} />
        </Fragment>
    );
};

export default Profile;
