import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "../views/Home";
import "../../app.css";
import Profile from "../views/Profile";
import { fetchApi } from "../utilities/functions";
import { APIs } from "../constants/requests";
import Appbar from "../components/Appbar";

const csrfToken = document.head.querySelector("[name~=csrf-token][content]").content;

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
                    method: "GET",
                    csrf: csrfToken
                };

                const me = await fetchApi(meRequest);

                if (me.ok && Object.keys(me.body).length > 0) {
                    setLogged(true);
                }
            }
        })();
    }, []);

    return (
        <Router>
            <Appbar logged={logged} setLogged={setLogged} setOpenAuth={setOpenAuth} />
            <Switch>
                <Route
                    exact
                    path="/"
                    render={() => <Home openAuth={openAuth} setLogged={setLogged} setOpenAuth={setOpenAuth} />}
                />
                <Route exact path="/profile" component={Profile} />
            </Switch>
        </Router>
    );
}

export default App;

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}
