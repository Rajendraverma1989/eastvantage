import { useState } from 'react'
import { Loader } from 'rsuite';
import axios from 'axios';
import './App.css'

function App() {
  const [refreshUser, setRefreshUser] = useState(false);

  const apiCall =async()=>{
    setRefreshUser(true);
    await axios.get('https://randomuser.me/api')
       .then(function (response) {      
         const {results} = response.data;
         const {name} = results[0];
         const {title, first, last} = name;
         const fname = title+' '+ first+' '+last
         const {email} = results[0];
         localStorage.setItem("name", fname);
         localStorage.setItem("email", email); 
       })
       .catch(function (error) {       
         console.log(error);
       })
       .finally(function () {      
         setRefreshUser(false);
       });
  }

  const fetchData= async(e:any) =>{
    e.preventDefault();
    await apiCall();
  }

  return (
    <div className="app">
    {refreshUser&&<Loader center content="" size="lg"/>}
      <div className='userDetails'>
      <div className='name'>
               Name: {localStorage.getItem('name')}
        </div>
       <div className='email'>
             Email: {localStorage.getItem('email')}
        </div>
        <button onClick={(e)=>fetchData(e)}> Refresh User </button>
       </div>
     
    </div>
  )
}

export default App
