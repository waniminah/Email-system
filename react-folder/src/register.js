import React, { useState,useEffect } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import { graphql } from '@apollo/client';

 function register (){
    const [formErrors,setFormErrors]=useState({});
    const [isSubmit,setIsSubmit]=useState(false);
    const[values,setValues]=useState({
            firstName: '',
            lastName: '',
            phone: '',
            username: '',
            email: '',
            password: '',
            confirmPassword: ''

        })
        const onChange =(e) =>
      {
  
     const{name,value}=e.target;
     setValues({...values,[name]:value});
     console.log(values);
  }
        const [addUser, { loading }] = useMutation(Register_User, {
            update(proxy, result) {
            
            },
        
        });
        const onSubmit =(e) =>
  {
    e.preventDefault();
    setFormErrors(validate(values));
    setIsSubmit(true);
  }
  useEffect(()=>
  {
    console.log(formErrors);
    if(Object.keys(formErrors).length === 0 && isSubmit)
    {
      console.log(values);}
    },[formErrors]);
  const validate =(values) =>
  {
    const errors ={};

    if (!values.firstName)
    {
      errors.firstName="firstname is required";
    }
    else if(!isNaN(values.firstName))
  {
      errors.firstName="Numerical values are not allowed";
    }
    if (!values.lastName)
    {
      errors.lastName="lastname is required";
    }
    else if(!isNaN(values.lastName))
    {
        errors.lastName="Numerical values are not allowed";
      }
  
    if(!values.phone)
    {
      errors.phone="phone number is required";
    }
    else if(values.phone.length >10)
    {
      errors.phone="phone number cannot exceed more than 10 digits";
    }
  
    else if(values.phone.length < 10)
    {
      errors.phone="phone number must be more than entered numbers";
    }
    else if(isNaN(values.phone))
    {
      errors.phone="phone number must be in digits ie (0-9)";
    }
  
    if (!values.email)
    {
      errors.email="Email is required!";
    }  
    if (!values.password)
    {
      errors.password="password is required!";
    }
    else if(values.password.length < 4)
    {
      errors.password ="password must be more than 4 characters";
    }
    if(!values.confirmPassword)
    {
      errors.confirmPassword="Confirm  password is required"
    }
    else if(values.confirmPassword!==values.password)
    {
      errors.confirmPassword="Incorrect Password";
    }
    return errors;
  };

    return (
        <div className="form-container">
            <Form onSubmit={onSubmit}>
                <h1>Register</h1>
                <Form.Input
                    label="Firstname"
                    name="firstName"
                    type="text"
                    value={values.firstName}
                    onChange={onChange}
                />
                 <p>{formErrors.firstName}</p>
                <Form.Input
                    label="Lastname"
                    type="text"
                    name="lastName"
                    value={values.lastName}
                    onChange={onChange}
                />
                 <p>{formErrors.lastName}</p>
                <Form.Input
                    label="Phonenumber"
                    type="text"
                    name="phone"
                    value={values.phone}
                 
                    onChange={onChange}
                />
                 <p>{formErrors.phone}</p>

                <Form.Input
                    label="Username"
                    type="text"
                    name="username"
                    value={values.username}
                    
                    onChange={onChange}
                />
                 <p>{formErrors.username}</p>
                <Form.Input
                    label="email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={onChange}
                />
                 <p>{formErrors.email}</p>
                <Form.Input
                    label="Password"
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={onChange}
                />
                 <p>{formErrors.password}</p>
                <Form.Input
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    value={values.confirmPassword}
                    onChange={onChange}
                />
                 <p>{formErrors.confirmPassword}</p>
                <Button type="submit" primary>Register</Button>
            </Form>
        </div>
    );
}
const Register_User = graphql`
mutation 
register(
    $firstname:String!
    $lastname:String!
    $Phonenumber:String!
    $username:String!
    $email:String!
    $password:String!
    $confirmPassword:String!
)
{
    createAccount(
        
            firstName:$firstname
            lastName:$lastname
            phone:$Phonenumber
            username:$username
            email:$email
            password:$password
             confirmPassword:$confirmPassword
        
    )
  {
    message
    account{
       id
       username
      email
      firstName
      lastName
      phone
      password
      confirmPassword
      lastLogin
      
    }
  }
   

}`

export default register;
