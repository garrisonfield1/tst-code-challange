import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [formInput, setFormInput] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState(false)

  const [formError, setFormError] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleUserInput = (name, value) => {
    setFormInput({
      ...formInput,
      [name]: value,
    });
  };

  const validateFormInput = (event) => {
    event.preventDefault();
    let inputError = {
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!formInput.email && !formInput.password) {
      setFormError({
        ...inputError,
        email: "Enter valid email address",
        password: "Password should not be empty",
      });
      return
    }

    if (!formInput.email) {
      setFormError({
        ...inputError,
        email: "Enter valid email address",
      });
      return
    }

    if (formInput.confirmPassword !== formInput.password) {
      setFormError({
        ...inputError,
        confirmPassword: "Password and confirm password should be same",
      });
      setPasswordError(true)
      return;
    }

    if (!formInput.password) {
      setFormError({
        ...inputError,
        password: "Password should not be empty",
      });
      return
    }

    else {
      alert('User Created');
      setFormInput({
        email: "",
        password: "",
        confirmPassword: ""}
      )
    }
    
    setFormError(inputError);
  };

  useEffect(() => {
    if(formInput.password !== formInput.confirmPassword){
      setPasswordError(true)
      setFormError({
        confirmPassword: "Password and confirm password should be same",
      });      
    }
    else{
      setPasswordError(false)
      setFormError({
        email: "",
        password: "",
        confirmPassword: "",
      }); 
    }
  },[formInput.confirmPassword, formInput.password])

  return (
    <div className="App-container">
      <div className="card">  
        <div className="card-header">
          <h4 className="title">Create User</h4>
        </div>
        <div className="card-body">
          <form onSubmit={validateFormInput}>
            <label className="label">Email
              <input
                value={formInput.email}
                onChange={ ({target})  => {
                  handleUserInput(target.name, target.value);
                  
                }}
                name="email"
                type="text"
                className="input"
                placeholder="Enter Email"
              />
              <p className="error-message">{formError.email}</p>
            </label>

            <label className="label">Password
              <input
                value={formInput.password}
                onChange={({ target }) => {
                  handleUserInput(target.name, target.value);
                }}
                name="password"
                type="password"
                className="input"
                placeholder="Password"
              />
              <p className="error-message">{formError.password}</p>
            </label>

            <label className="label">Confirm Password
              <input
                value={formInput.confirmPassword}
                onChange={({ target }) => {
                  handleUserInput(target.name, target.value);
                }}
                name="confirmPassword"
                type="password"
                className={`input ${passwordError ? "error" : ""}`}
                placeholder="Confirm Password"
              />
              <p className="error-message">{formError.confirmPassword}</p>
            </label>

            <input type="submit" className="btn" value="Submit" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
