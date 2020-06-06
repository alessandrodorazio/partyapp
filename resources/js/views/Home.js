import React from "react";
import AuthForm from "../components/AuthForm";

const Home = ({ openAuth, setOpenAuth }) => {
    return (
        <div>
            <AuthForm open={openAuth} setOpen={setOpenAuth} />
        </div>
    );
};

export default Home;
