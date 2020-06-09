import React from "react";
import AuthForm from "../components/AuthForm";
import { useHistory } from "react-router-dom";

const Home = ({ openAuth, setOpenAuth, setLogged }) => {
    const history = useHistory();

    return (
        <div>
            <AuthForm
                open={openAuth}
                setOpen={setOpenAuth}
                setLogged={setLogged}
                toProfile={() => history.push("/profile")}
            />
        </div>
    );
};

export default Home;
