const loginFields: Array<{
    labelText: string;
    labelFor: string;
    id: string;
    name: string;
    type: string;
    autoComplete: string;
    isRequired: boolean;
    placeholder: string;
  }> = [
    {
      labelText: "Email address",
      labelFor: "emailAddress",
      id: "emailAddress",
      name: "email",
      type: "email",
      autoComplete: "email",
      isRequired: true,
      placeholder: "Email address"
    },
    {
      labelText: "Password",
      labelFor: "password",
      id: "password",
      name: "password",
      type: "password",
      autoComplete: "current-password",
      isRequired: true,
      placeholder: "Password"
    }
  ];
  
  const signupFields: Array<{
    labelText: string;
    labelFor: string;
    id: string;
    name: string;
    type: string;
    autoComplete: string;
    isRequired: boolean;
    placeholder: string;
  }> = [
    {
      labelText: "First Name",
      labelFor: "firstname",
      id: "firstname",
      name: "firstname",
      type: "text",
      autoComplete: "firstname",
      isRequired: true,
      placeholder: "First Name"
    },
    {
      labelText: "Last Name",
      labelFor: "lastname",
      id: "lastname",
      name: "lastname",
      type: "text",
      autoComplete: "lastname",
      isRequired: true,
      placeholder: "Last Name"
    },
    {
      labelText: "Email address",
      labelFor: "emailAddress",
      id: "emailAddress",
      name: "email",
      type: "email",
      autoComplete: "email",
      isRequired: true,
      placeholder: "Email address"
    },
    {
      labelText: "Password",
      labelFor: "password",
      id: "password",
      name: "password",
      type: "password",
      autoComplete: "current-password",
      isRequired: true,
      placeholder: "Password"
    },
    {
      labelText: "Confirm Password",
      labelFor: "confirmPassword",
      id: "confirmPassword",
      name: "confirm-password",
      type: "password",
      autoComplete: "confirm-password",
      isRequired: true,
      placeholder: "Confirm Password"
    }
  ];
  
  export { loginFields, signupFields };