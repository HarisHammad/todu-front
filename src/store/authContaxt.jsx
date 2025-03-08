import { createContext, useEffect, useState } from "react";
import { data, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Authcontaxt = createContext();
export const Authprovider = ({ children }) => {

const[token,settoken]=useState(localStorage.getItem("token"))
const [user,setuser]=useState({});
const[id,setid]=useState(localStorage.getItem("id"))
const [isAdmin,setisAdmin]=useState();



const [mainLoading,setMainLoading]=useState(true)
const navigate = useNavigate()


function storetkeninLS(serverToken,serverId){
    settoken(serverToken)
    setid(serverId)
    localStorage.setItem('token',serverToken);
    localStorage.setItem('id',serverId);
    return;
}


let isLoggedin =!!token



const getuserData=async()=>{
  try{
const response = await fetch('https://mern-todu-list-l8d6.vercel.app/api/users',{
    method:"GET",
    headers:{Authorization:`Bearer${token}`}
})

if(response.ok){
  const data = await response.json();
  console.log(data.userData);
  setuser(data.userData)
  setisAdmin(data.userData.isAdmin)
  setMainLoading(false)
}
}catch (error) {
  console.log(data);
  
console.log('Frror Fetheing data');
}}




useEffect(()=>{
  if(token){
    getuserData()
  }
},[token])



function logout(){
 settoken('')
 setuser('')
 localStorage.removeItem('token')      
 navigate('/')
 setid('')
 return
}
    
  return (
  <Authcontaxt.Provider value={{storetkeninLS,isLoggedin,logout,user,mainLoading,token,isAdmin,id}}>
    {children}
  </Authcontaxt.Provider>)
};
