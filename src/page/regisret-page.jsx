import { useState } from "react"
import { NavLink} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./register.css"; 
import { Authcontaxt } from "../store/authContaxt";
import { useContext } from "react";


export default function Register(){
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
  async function handleSubmit(e){
    e.preventDefault()
    try {
        const respone = await fetch('https://todu-backend.vercel.app/api/register',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(data)
        })
        const res_data = await respone.json();
        console.log(res_data);
        if(respone.ok){
            navigate('/tudopage')
            toast.success('Register Successfull')
            storetkeninLS(res_data.Token,res_data.userid,res_data.isAdmin)
        }
        else{
            toast.error(res_data.message)
        }
    } catch (error) {
        console.log('regiter',error);
        
    }
  }

    return(
     
        <div className="Main" >
            <div className="Navcontainer">
        <nav>
            <ul>
                <li>To Do App</li>
            </ul>
        </nav>   
        
        </div>

         <div className="mainregcontainer" style={{ marginTop: '-20px'}}>
        <div className="registerForm">
            <form onSubmit={handleSubmit}>
               <h1 className="regheading">Create an account</h1> <br/>
                <label htmlFor="username">Name</label><br/>
                <input className="reginput" type="text" required placeholder="Enter Your Name" id="username" name="username"  onChange={inputhandle} value={data.username}/><br/><br/><br/>
                <label htmlFor="email">Email</label><br/>
                <input className="reginput" type="Email"  required placeholder="Enter Your Email Address" id="email" name="email" onChange={inputhandle} value={data.email}/><br/><br/><br/>
                <label htmlFor="password">Password</label><br/>
                <input  className="reginput" type="password"  required placeholder="Enter Your Password" id="password" name="password" onChange={inputhandle} value={data.password}/><br/><br/><br/><br/>
                <button className="regbtn" type="submit">Sign up</button><br/><br/><br/>
                <p>Already have account? <NavLink style={{color:'white'}} to={'/'}> Login</NavLink></p>
            </form>
            </div>
            </div>
            </div>
    )
}