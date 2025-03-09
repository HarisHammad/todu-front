import { useContext, useState } from "react"
import { Authcontaxt } from "./store/authContaxt"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react";
import { toast } from "react-toastify";
import './Todu-page.css'

export default function Todu(){
    const {isLoggedin,logout,user,token,id} = useContext(Authcontaxt)
    const[loading,setloading]=useState(true)
    const [data,setdata]=useState('')
    const [task,settask]=useState([])
    const [localtoken, setLocalToken] = useState(localStorage.getItem('token')); 
    // console.log(localtoken);
    
    const navigate = useNavigate()

// const id = user._id
// console.log(id);




    useEffect(() => {
        if (!isLoggedin) {
            navigate('/');
        }   
          if (user && id) {
            setloading(false);
            fetchUser();
        }
        
    }, [id,isLoggedin, navigate,user]);  




    
    function Change(e){
        setdata(e.target.value)
    }

    if (loading) {
        return <h1>Loading......</h1>;
    }



   async function fetchUser(){
   
    try {
        console.log("Local Token:", localtoken);
            const respons = await fetch(`https://todu-backend-lwfp.vercel.app/api/users/${id}`,{
            method:'GET',
            headers:{Authorization:`Bearer${localtoken}`}})
            if(respons.ok){
                const data = await respons.json(); 
                console.log(data);            
                settask(data.userData);
              console.log(data.userData);
              
              
            }   else{
                const errorData = await respons.json();
                toast.error(errorData.message);
                return navigate('/')
            }
    } catch (error) {
        console.log(error);  
    }}
     


   async function handleSubmit(e){
        e.preventDefault()
        const newTask = { tasks: data};
        settask(prevTasks => [...prevTasks, newTask]);
try {
        const respons = await fetch('https://todu-backend-lwfp.vercel.app/api/task',{
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({tasks:data,id})})
        if(respons.ok){
            console.log('task send');
            setdata('')
            fetchUser()
        }else{
            console.log('not send');
        }
    } catch (error) {
    console.log('task err',error);
    
    }
    }








  async function deleteTask(taskid){
        try {
            const response = await fetch(`https://todu-backend-lwfp.vercel.app/api/usersDelete/${id}/${taskid}`,{
                method:'DELETE'
            })
            if(response.ok){
                console.log('task Delete');
                fetchUser()
                
            }
        } catch (error) {
            console.log(error);
            
        }
        
        
    }
    
    function adminfunc(){
        if(!user.isAdmin){
            console.log("tt",user.isAdmin);
            
            <h1>Loading....</h1>
            navigate('/tudopage')
            return toast.error('Only Admin Accsess')
        }else{
            navigate('/admin')
            toast.success('welcome to Admin panal')
        }
       
    }
  

    return (
        <>
<div className="Main3" >
<div className="todonav">
        <nav>
            <ul>
                <li>To Do App</li>
            </ul>
        </nav>  
        <div className="todubtn">
        <button onClick={()=>adminfunc()}>admin</button>
        <button onClick={logout}>logout</button>
        </div> 
        </div>
        
         <div className="maintoducontainer">
        <div className="toduForm">
        <form onSubmit={handleSubmit}>
        <input className="reginput" type="text" placeholder="Add Task" value={data} onChange={Change} required  maxLength={17}/>
        <button type="submit" className="taskbtn">Add Task</button>
        </form>
        <div className="mainmaptask">
       {task.map((curr, index) => (
    <div key={index} className="maptask">
        <h3>{curr.tasks}</h3>
        <div>
          
            <button className="deletebtn" onClick={() => deleteTask(curr._id)}>Delete</button>
        </div>
    </div>
))}
</div>
</div>
</div>
       </div>   
        </>
    )
}