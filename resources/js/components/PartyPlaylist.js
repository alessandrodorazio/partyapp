import React, { useEffect, useState } from "react";
import { FixedSizeList } from "react-window";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { APIs } from "../constants/requests";
import { fetchApi } from "../utilities/functions";

const RenderRow = ({ items, index, style, democracy, partyId, suggested, setSuggested }) => {
    const item = items[index];
    const isSuggested = suggested ? suggested[index] : false;

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
                    maxWidth: 300,
                    color: "white"
                }}
            >
                {item.title}
            </Typography>
            {democracy && !isSuggested && (
                <IconButton
                    style={{ marginRight: 3, height: 30, width: 30, color: "#f44336" }}
                    onClick={async () => {
                        const request = {
                            url: `${APIs.parties.all}/${partyId}/songs/${item.song_id}/suggest`,
                            method: "GET"
                        };

                        const response = await fetchApi(request);

                        if (response.ok) {
                            let newSuggested = suggested.slice();
                            newSuggested[index] = true;
                            setSuggested(newSuggested);
                        }
                    }}
                >
                    <FavoriteIcon />
                </IconButton>
            )}
        </div>
    );
};

const PartyPlaylist = ({ songs, democracy, partyId }) => {
    const [suggested, setSuggested] = useState();

    useEffect(() => {
        setSuggested(songs.map(() => false));
    }, [songs]);

    return (
        <FixedSizeList
            height={songs.length < 10 ? songs.length * 46 : 460}
            width={340}
            itemSize={46}
            className="list"
            itemCount={songs.length}
        >
            {(props) => (
                <RenderRow
                    {...props}
                    items={songs}
                    democracy={democracy}
                    partyId={partyId}
                    suggested={suggested}
                    setSuggested={setSuggested}
                />
            )}
        </FixedSizeList>
    );
};

export default PartyPlaylist;
