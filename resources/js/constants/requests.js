const BASE_URL = "http://127.0.0.1:8000/api/";

export const APIs = Object.freeze({
    parties: BASE_URL + "parties",
    moods: BASE_URL + "moods",
    playlists: BASE_URL + "playlists",
    auth: {
        register: BASE_URL + "auth/register",
        login: BASE_URL + "auth/login",
        logout: BASE_URL + "auth/logout",
        refresh: BASE_URL + "auth/refresh",
        me: BASE_URL + "auth/me"
    }
});
