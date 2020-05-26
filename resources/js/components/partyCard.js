import React, { Fragment, useState } from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core";

const types = [
    {
        id: 1,
        name: "Battle"
    },
    {
        id: 2,
        name: "Democracy"
    }
];

const useStyles = makeStyles((theme) => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: "33.33%",
        flexShrink: 0
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary
    }
}));

const PartyCard = ({ parties }) => {
    const classes = useStyles();

    const [expanded, setExpanded] = useState(false);

    const handlePanelChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Fragment>
            {parties[0] ? (
                parties.map((party) => (
                    <ExpansionPanel
                        key={party.id}
                        className={classes.panel}
                        expanded={expanded === party.id}
                        onChange={handlePanelChange(party.id)}
                    >
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography className={classes.heading}>{party.name}</Typography>
                            <Typography className={classes.secondaryHeading}>
                                {types.find((type) => type.id === party.party_type).name + " " + party.mood.name}
                            </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                {"Partecipanti: " + party.countParticipants + ", link di adesione: " + party.link}
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                ))
            ) : (
                <Typography>Caricamento party</Typography>
            )}
        </Fragment>
    );
};

export default PartyCard;
