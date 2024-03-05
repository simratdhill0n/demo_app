import React, { FC } from 'react';
import Header from "../components/Header";
import Signup from "../components/Signup";

const SignupPage: FC = () => {
    return(
        <div className='ml-80 mx-auto my-auto justify-center max-w-md'>
            <Header
              heading="Signup to create an account"
              paragraph="Already have an account? "
              linkName="Login"
              linkUrl="/"
            />
            <Signup/>
        </div>
    )
}

export default SignupPage;