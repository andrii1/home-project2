import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUserContext } from '../../userContext';
import './Signup.Style.css';
import { apiURL } from '../../apiURL';
import { Button } from '../../components/Button/Button.component';

export const Signup = () => {
  const {
    user,
    name1,
    loading,
    registerWithEmailAndPassword,
    signInWithGoogle,
  } = useUserContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  /*
  const addUserToDb = useCallback(async (userCreated, fullName) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        full_name: fullName,
        email: userCreated.email,
        uid: userCreated?.uid,
      }),
    };
    await fetch(`${apiURL()}/users`, requestOptions);
  }, []); */
  const register = () => {
    if (!name) alert('Please enter name');
    registerWithEmailAndPassword(name, email, password);
  };
  useEffect(() => {
    if (loading) return;
    if (user) {
      /* addUserToDb(user, name1); */
      navigate('/');
    }
  }, [user, loading, navigate]);
  return (
    <div className="register">
      <div className="register__container">
        <input
          type="text"
          className="register__textBox"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
        <input
          type="text"
          className="register__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="register__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <Button primary onClick={register} label="Sign up" />
        <Button onClick={signInWithGoogle} label="Register with Google" />
        <div className="already-have-account">
          Already have an account? <Link to="/">Login</Link> now.
        </div>
      </div>
    </div>
  );
};
