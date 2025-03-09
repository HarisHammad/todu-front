import {useContext, useState } from "react"
import { NavLink} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./register.css"; 
import './login-page.css'
import { toast } from "react-toastify";
import { Authcontaxt } from "../store/authContaxt";


export default function Login(){
const {storetkeninLS} = useContext(Authcontaxt)
const navigate = useNavigate()
const [data,setdata]= useState({
    username:"",
    email:"",
    password:"",
})



    function inputhandle(e){
        const name = e.target.name;
        const value = e.target.value;
        setdata({
            ...data,
            [name]:value
        })}


        async function handlesubmit (e){
            e.preventDefault();
          try {
            const response = await fetch('https://todu-backend-lwfp.vercel.app/api/login',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(data),
                // mode:'no-cors',
            })
            const res_data = await response.json();
            console.log(res_data);
            
            if(response.ok){
                toast.success('Login successfully')
                navigate('/tudopage')
                storetkeninLS(res_data.Token,res_data.userid)
            }else{
                toast.error(res_data.message)
            }
          } catch (error) {
            console.log('login ',error);
            
          }

        }

    return(
     
        <div className="Main2" >
            <div className="Navcontainer">
        <nav>
            <ul>
                <li>To Do App</li>
            </ul>
        </nav>   
        
        </div>

         <div className="mainregcontainer">
        <div className="registerForm">
            <form onSubmit={handlesubmit}>
               <h1 className="regheading" style={{marginLeft:"33%"}}>Login</h1> <br/><br/>
                <label htmlFor="email">Email</label><br/>
                <input className="reginput" type="Email"  required placeholder="Enter Your Email Address" id="email" name="email" onChange={inputhandle} value={data.email}/><br/><br/><br/>
                <label htmlFor="password">Password</label><br/>
                <input  className="reginput" type="password"  required placeholder="Enter Your Password" id="password" name="password" onChange={inputhandle} value={data.password}/><br/><br/><br/><br/>
                <button className="regbtn" type="submit">Login</button><br/><br/><br/>
                <p>Don't have an account? <NavLink style={{color:'white'}} to={'/register'}>Sign up here</NavLink></p>
            </form>
            </div>
            </div>
            </div>
    )
}