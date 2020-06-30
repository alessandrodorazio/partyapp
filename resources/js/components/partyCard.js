import React, { Fragment, useState, useEffect } from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core";
import { APIs } from "../constants/requests";
import { fetchApi } from "../utilities/functions";
import PartyUsersList from "./PartyUsersList";

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
        flexShrink: 0,
        maxWidth: 200,
        overflow: "hidden",
        textOverflow: "ellipsis"
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary
    }
}));

const participantsRequest = async (id) => {
    const request = {
        url: `${APIs.parties.all}/${id}`,
        method: "GET"
    };

    const response = await fetchApi(request);

    if (response.ok) {
        return {
            ok: true,
            participants: response.body.participants
        };
    }
    return {
        ok: false
    };
};

const PartyCard = ({ parties, found }) => {
    const classes = useStyles();

    const [expanded, setExpanded] = useState(false);
    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        (async () => {
            if (parties && parties[0]) {
                let newParticipants = [];
                await parties.forEach(async (party) => {
                    const response = await participantsRequest(party.id);
                    newParticipants.push(
                        response.ok
                            ? {
                                  partyId: party.id,
                                  users: response.participants
                              }
                            : null
                    );
                });
                setParticipants(newParticipants);
            }
        })();
    }, [parties]);

    const handlePanelChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Fragment>
            {found ? (
                parties[0] ? (
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
                                <div className="party-details">
                                    <Typography>
                                        {"Partecipanti: " +
                                            party.countParticipants +
                                            ", link di adesione: " +
                                            party.link}
                                    </Typography>
                                    <PartyUsersList
                                        users={
                                            participants && participants.length[0] && participants.find
                                                ? participants.find((p) => p.partyId === party.id).users
                                                : null
                                        }
                                    />
                                </div>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    ))
                ) : (
                    <Typography>Caricamento party</Typography>
                )
            ) : (
                <Typography>Non hai creato nessun party</Typography>
            )}
        </Fragment>
    );
};

export default PartyCard;
