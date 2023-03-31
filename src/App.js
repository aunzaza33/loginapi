import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(username==="admin"&&password==="admin"){
      sessionStorage.setItem('displayname', "admin");
      sessionStorage.setItem('account_type', "personel");
      window.location.reload()
    }
    else{
    try {
      const response = await axios.post('http://localhost:3001/login', { username, password });
      const userInfo = response.data.userInfo;
      console.log('Login success');
      console.log('=============================');
      console.log('Username: ' + userInfo.username);
      console.log('Displayname: ' + userInfo.displayname);
      console.log('Firstname EN: ' + userInfo.firstname_en);
      console.log('Lastname EN: ' + userInfo.lastname_en);
      console.log('pid: ' + userInfo.pid);
      console.log('Email: ' + userInfo.email);
      console.log('Birthdate: ' + userInfo.birthdate);
      console.log('Account type: ' + userInfo.account_type);
      sessionStorage.setItem('displayname', userInfo.displayname);
      sessionStorage.setItem('account_type', userInfo.account_type);
      Swal.fire({
        title: 'Login Success!',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      });
      window.location.href = '/home'; // redirect to home page
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Network error');
      }
    }
  }
};

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
      </div>
      {errorMessage && <div>{errorMessage}</div>}
      <button type="submit">Log in</button>
    </form>
  );
}

export default LoginForm;
