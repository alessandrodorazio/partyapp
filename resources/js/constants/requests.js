const BASE_URL = "http://127.0.0.1:8000/api/";

export const APIs = {
    parties: {
        all: BASE_URL + "parties",
        my: BASE_URL + "parties/myparties",
        upcomingParties: BASE_URL + "parties/upcomingParties",
        startedParties: BASE_URL + "parties/startedParties"
    },
    moods: BASE_URL + "moods",
    playlists: {
        all: BASE_URL + "playlists",
        my: BASE_URL + "playlists/myplaylists"
    },
    auth: {
        register: BASE_URL + "auth/register",
        login: BASE_URL + "auth/login",
        logout: BASE_URL + "auth/logout",
        refresh: BASE_URL + "auth/refresh",
        me: BASE_URL + "auth/me"
    },
    users: {
        followers: BASE_URL + "users/follows/followers",
        following: BASE_URL + "users/follows/following",
        search: BASE_URL + "users/search/"
    },
    genres: BASE_URL + "genres",
    songs: {
        youtube: BASE_URL + "songs/youtube/search"
    }
};
