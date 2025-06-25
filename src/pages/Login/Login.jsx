import React, { useContext, useEffect, useState } from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import {login,logout,signup} from '../../firebase'
import netflix_spinner from '../../assets/netflix_spinner.gif'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../components/AuthContext/AuthContext'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../firebase'



const Login = () => {

const { signState,setSignState,
          name,setName,
            email,setEmail,
            password,setPassword,
             loading,setLoading,
            error, setErrors} = useContext(AuthContext);

            const navigate = useNavigate();

    useEffect(() => {
    setEmail('');
    setPassword('');
    setName('');
    setErrors({});
    setSignState('Sign In');
  }, []);
  

    useEffect(()=>{
      const unSubscribe = onAuthStateChanged(auth,(user)=>{
        if(user){
          navigate('/')
        }
      })
      return ()=> unSubscribe();
    },[navigate]);



const user_auth = async (event)=>{
  //event.preventDefault();
  //setLoading(true)

  if(signState==="Sign In"){
   const isLoggedIn = await login(email,password);
    if(isLoggedIn){
      navigate('/');
    }
  }else{
      const isSignedUp = await signup(name,email,password)
  if(isSignedUp){
    await logout();
      navigate('/login')
  }

  }
   setLoading(false)
}

const handleSubmit=(event)=>{
 event.preventDefault();
 let formErrors = {};

 if(signState ==='Sign Up'&& !name.trim()){
  formErrors.name = "Name is required";
 }

 if(!password){
  formErrors.password = "Password is required";
 }else if(password.length <6){
  formErrors.password = "Password must be at leat 6 characters";
 }


 if(!email){
  formErrors.email = 'Email is required';
 }

 setErrors(formErrors);

 if(Object.keys(formErrors).length ===0){
  console.log("no validation occur")
  user_auth();
 }
}



  return (
    loading ? <div className="login-spinner">
      <img src={netflix_spinner} alt="" />
    </div>:
    <div className='login'>
      <img src={logo} className='login-logo' alt="" />
      <div className='login-form'>
        <h1>{signState}</h1>
        <form onSubmit={handleSubmit}>
          {signState === "Sign Up" ?<input type="text" value={name} onChange={(event)=>{setName(event.target.value)}} 
          placeholder='Your name' />:<></>  }
           {error.name && <p style={{ color: 'red' }}>{error.name}</p>}
          <input type="email"  value={email} onChange={(event)=>{setEmail(event.target.value)}} 
          placeholder='Email' />
          {error.email && <p style={{ color: 'red' }}>{error.email}</p>}
          <input type="password"  value={password} onChange={(event)=>{setPassword(event.target.value)}} 
          placeholder='Password' />
          {error.password && <p style={{ color: 'red' }}>{error.password}</p>}
          <button  type='submit'>{signState}</button>

          <div className='form-help'>
            <div className='remember'>
              <input type="checkbox" />
              <label htmlFor="">Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className="form-switch">
          {signState === 'Sign In'? <p className='small-text'>New to Netflix? <span onClick={()=>{setSignState('Sign Up')}}>Sign Up Now</span></p>
          :<p className='small-text'>Already have account? <span onClick={()=>{setSignState('Sign In')}}>Sign In Now</span></p>}
          
         
        </div>
      </div>
    </div>
  )
}

export default Login
