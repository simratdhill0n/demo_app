import React, { useState, ChangeEvent, FormEvent } from 'react';
import { loginFields } from "../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import { useNavigate } from 'react-router-dom';


interface FieldState {
  [key: string]: string;
}

const fields = loginFields;
let fieldsState: FieldState = {};
fields.forEach(field => fieldsState[field.id] = '');

const Login: React.FC = () => {
  const [loginState, setLoginState] = useState<FieldState>(fieldsState);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    authenticateUser();
  }

  //Handle Login API Integration here
  const authenticateUser = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/user/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: loginState.emailAddress,
          password: loginState.password,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to login');
      }
  
      // Assuming your backend returns some data upon successful signup
      navigate('/dashboard', {state:{email:loginState.emailAddress}});
    } catch (error) {
        alert(error);
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="-space-y-px">
        {
          fields.map(field =>
            <Input
              key={field.id}
              handleChange={handleChange}
              value={loginState[field.id]}
              labelText={field.labelText}
              labelFor={field.labelFor}
              id={field.id}
              name={field.name}
              type={field.type}
              isRequired={field.isRequired}
              placeholder={field.placeholder}
            />

          )
        }
      </div>

      <FormExtra />
      <FormAction handleSubmit={handleSubmit} text="Login" />

    </form>
  )
}

export default Login;