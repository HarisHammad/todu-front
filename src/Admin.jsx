import { useEffect, useState } from "react"
import './Admin.css'
import { useContext } from "react"
import { Authcontaxt } from "./store/authContaxt"
import { useNavigate } from "react-router-dom"

export default function Admin(){
    const[adminData,setadminData]=useState()
    const[loading,setloading]=useState(true)
    const{user,token,isAdmin,isLoggedin}=useContext(Authcontaxt)
    const navigate = useNavigate()
        
    // const isAdmin = user.isAdmin
    
    async function alldata(){
        try {
        const response = await fetch("https://mern-todu-list-l8d6.vercel.app/api/admin",{
            method:"GET",
        })
        if(response.ok){
            const data = await response.json()
            setadminData(data)
            console.log('Data fetched successfully');
        }

    
} catch (error) {
        console.log('error');
        
}}


async function deleteUser(id){
    try {
        const response = await fetch(`https://mern-todu-list-l8d6.vercel.app/api/deleteUser/${id}`,{
            method:'DELETE'
        })
        if(response.ok){
            console.log('User Deleted');
            alldata()
        }
    } catch (error) {
        console.log(error);
        
    }
}

useEffect(()=>{
    // if (!loading) {
        // if (!user || !user.isAdmin) {
        //     navigate("/");
        // } else {
            alldata();
        //     setloading(false)
        // }
    // }
    // }
},[navigate,isAdmin,token, user,user.isAdmin])


if (isAdmin === false) {
    console.log('admin',isAdmin);
    console.log('user',user.isAdmin)
    navigate('/')
}else{
    if (!isAdmin) {
        return <h1>Loading......</h1>;
    }

}

    return(

        <div className="mainadmin">
              <table>
                    <thead>
                     <tr>
                     <th>Name</th>
                     <th>Email</th>
                     <th>Delete</th>
                     </tr>
                     </thead>
            {adminData&&adminData.map((curr,index)=>(
                  
                     <tbody key={index}>
                         <tr>
                         <td>{curr.username}</td>
                         <td>{curr.email}</td>
                         <td><button className="deletebtn" onClick={() => deleteUser(curr._id)}>Delete</button></td>
                         </tr>
                     </tbody>
            ))}
              </table>
        
        </div>
    )
}