import React, { FC } from 'react';
import Header from "../components/Header";
import Login from "../components/Login";

const LoginPage: FC = () => {
    return (
        <div className='ml-80 mx-auto my-auto justify-center max-w-md'>
            <Header
                heading="Login to your account"
                paragraph="Don't have an account yet? "
                linkName="Signup"
                linkUrl="/signup"
            />
            <Login />
        </div>
    );
}

export default LoginPage;