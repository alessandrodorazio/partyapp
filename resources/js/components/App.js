import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "../views/Home";
import "../../app.css";
import Profile from "../views/Profile";
import { fetchApi } from "../utilities/functions";
import { APIs } from "../constants/requests";
import Appbar from "../components/Appbar";
import Party from "../views/Party";
import { createMuiTheme, Box, MuiThemeProvider } from "@material-ui/core";
import { blue, red } from "@material-ui/core/colors";

localStorage.setItem("CSRF", document.head.querySelector("[name~=csrf-token][content]").content);
const darkTheme = createMuiTheme({
    palette: {
        type: "dark",
        primary: red
    }
});
function App(props) {
    const [firstRender, setFirstRender] = useState(true);
    const [logged, setLogged] = useState(false);
    const [openAuth, setOpenAuth] = useState(false);

    useEffect(() => {
        (async () => {
            if (firstRender) {
                setFirstRender(false);
                const meRequest = {
                    url: APIs.auth.me,
                    method: "GET"
                };

                const me = await fetchApi(meRequest);

                if (me.ok && Object.keys(me.body).length > 0) {
                    localStorage.setItem("loggedId", me.body.id);
                    setLogged(true);
                } else {
                    refresh = await fetch(APIs.auth.refresh, {
                        method: "POST",
                        headers: {
                            "X-CSRF-TOKEN": localStorage.getItem("CSRF"),
                            Authorization: "Bearer " + localStorage.getItem(constants.TOKEN)
                        }
                    });

                    try {
                        jsonRefresh = await refresh.json();
                    } catch {
                        setLogged(false);
                    }
                    localStorage.setItem(constants.TOKEN, jsonRefresh.access_token);
                    const meAgain = await fetchApi(meRequest);
                    if (meAgain.ok && Object.keys(meAgain.body).length > 0) {
                        localStorage.setItem("loggedId", meAgain.body.id);
                        setLogged(true);
                    }
                }
            }
        })();
    }, []);

    return (
        <Router>
            <MuiThemeProvider theme={darkTheme}>
                <Appbar logged={logged} setLogged={setLogged} setOpenAuth={setOpenAuth} />
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={() => <Home openAuth={openAuth} setLogged={setLogged} setOpenAuth={setOpenAuth} />}
                    />
                    <Route exact path="/profile" component={Profile} />
                    <Route exact path="/parties/:partyId" component={Party} />
                </Switch>
            </MuiThemeProvider>
        </Router>
    );
}

export default App;

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}
