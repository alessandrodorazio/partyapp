import React, { Fragment, useState } from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core";

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

const PartyCard = () => {
    const classes = useStyles();

    const [expanded, setExpanded] = useState(false);

    const handlePanelChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    //simula una risposta di una API, questi saranno passati tramite i props
    const panels = [
        {
            name: "test",
            type: "Battle",
            mood: "70s",
            private: true,
            description: "questo è un party di prova, codice adesione: WIP"
        },
        {
            name: "test2",
            type: "Democracy",
            mood: "Nightcore",
            private: true,
            description: "questo è un party di prova, codice adesione: WIP"
        }
    ];

    return (
        <Fragment>
            {panels[0] ? (
                panels.map((panel, index) => (
                    <ExpansionPanel
                        key={index}
                        className={classes.panel}
                        expanded={expanded === index}
                        onChange={handlePanelChange(index)}
                    >
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography className={classes.heading}>{panel.name}</Typography>
                            <Typography className={classes.secondaryHeading}>
                                {panel.type + " " + panel.mood}
                            </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>{panel.description}</Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                ))
            ) : (
                <Typography>Non ci sono party nel tuo profilo</Typography>
            )}
        </Fragment>
    );
};

export default PartyCard;
