import React, { useEffect, useState } from "react";
import { APIs } from "../constants/requests";
import { fetchApi } from "../utilities/functions";
import { FixedSizeList } from "react-window";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import useInterval from "../hooks/useInterval";

const RenderRow = ({ items, index, style, partyId }) => {
    const item = items[index];

    return (
        <div
            style={{
                ...style,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                overflow: "hidden"
            }}
            key={item.song_id}
        >
            <Typography
                style={{
                    marginLeft: 3,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: 300
                }}
            >
                {item.title}
            </Typography>
            <IconButton
                style={{ marginRight: 3, height: 30, width: 30 }}
                onClick={async () => {
                    const request = {
                        url: `${APIs.parties.all}/${partyId}/songs/${item.song_id}/approve`,
                        method: "GET"
                    };

                    const response = await fetchApi(request);

                    if (response.ok) {
                        let newSuggested = items.slice();
                        newSuggested.splice(
                            suggested.findIndex((song) => song.song_id === item.song_id),
                            1
                        );
                        setSuggested(newSuggested);
                    }
                }}
            >
                <AddIcon />
            </IconButton>
        </div>
    );
};

const SuggestedList = ({ partyId, playlist }) => {
    const [suggested, setSuggested] = useState([]);

    useEffect(() => {
        (async () => {
            const suggestedRequest = {
                url: `${APIs.parties.all}/${partyId}/songs/suggested`,
                method: "GET"
            };
            const suggestedResponse = await fetchApi(suggestedRequest);
            let toApprove = [];
            suggestedResponse.body.songs.forEach(async (song) => {
                if (playlist.find((s) => s.id === song.id)) {
                    const approveRequest = {
                        url: `${APIs.parties.all}/${partyId}/songs/${song.id}/approve`,
                        method: "GET"
                    };

                    await fetchApi(approveRequest);
                } else {
                    toApprove.push(song);
                }
            });
            setSuggested(toApprove);
        })();
    }, [partyId]);

    useInterval(() => {
        (async () => {
            const suggestedRequest = {
                url: `${APIs.parties.all}/${partyId}/songs/suggested`,
                method: "GET"
            };
            const suggestedResponse = await fetchApi(suggestedRequest);
            let toApprove = [];
            suggestedResponse.body.songs.forEach(async (song) => {
                if (playlist.find((s) => s.id === song.id)) {
                    const approveRequest = {
                        url: `${APIs.parties.all}/${partyId}/songs/${song.id}/approve`,
                        method: "GET"
                    };

                    await fetchApi(approveRequest);
                } else {
                    toApprove.push(song);
                }
            });
            setSuggested(toApprove);
        })();
    }, 5000);

    return (
        <div>
            {suggested[0] && (
                <FixedSizeList
                    height={suggested.length < 10 ? suggested.length * 46 : 460}
                    width={500}
                    itemSize={46}
                    className="list"
                    itemCount={suggested.length}
                >
                    {(props) => <RenderRow {...props} items={suggested} setSuggested={setSuggested} />}
                </FixedSizeList>
            )}
        </div>
    );
};

export default SuggestedList;
