import React, { useState, ChangeEvent, FormEvent } from 'react';
import { signupFields } from "../constants/formFields"
import FormAction from "./FormAction";
import Input from "./Input";
import { useNavigate } from 'react-router-dom';

interface FieldState {
  [key: string]: string;
}

const fields = signupFields;
let fieldsState: FieldState = {};

fields.forEach(field => fieldsState[field.id] = '');

export default function Signup() {

  const navigate = useNavigate();

  const [signupState, setSignupState] = useState<FieldState>(fieldsState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setSignupState({ ...signupState, [e.target.id]: e.target.value });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await createAccount();
  }

  //handle Signup API Integration here
  const createAccount = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/user/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: signupState.firstname,
          last_name: signupState.lastname,
          email: signupState.emailAddress,
          password_1: signupState.password,
          password_2: signupState.confirmPassword,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create account');
      }
  
      // Assuming your backend returns some data upon successful signup
      const data = await response.json();
      console.log('Signup successful:', data);
      alert("Signup successful")
      navigate('/');
    } catch (error) {
        alert(error);
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        
      <div className="">
        {
          fields.map(field =>
            <Input
              key={field.id}
              handleChange={handleChange}
              value={signupState[field.id]}
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
        <FormAction handleSubmit={handleSubmit} text="Signup" />
      </div>
    </form>
  )
}