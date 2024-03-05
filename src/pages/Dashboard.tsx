import React, { useState } from 'react'
import {useLocation, useNavigate} from 'react-router-dom';
import Search from '../components/Search';
import Sidebar from '../components/Sidebar';
import Wallet from '../components/Wallet';

const Dashboard = () => {
    const location = useLocation();
    const navigate = useNavigate();
    let email:string="";
    if (!location.state && location.state.email.length < 1){
        navigate('/');
    } else {
        email = location.state.email;
        console.log(email)
    };
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
  
    return (
      <div>
        <Sidebar email={email} isOpen={isSidebarOpen} onClose={toggleSidebar} />
        {location.pathname === '/dashboard' ? (
                <div>
                  <Search />
                </div>
            ) : location.pathname === '/dashboard/wallet' ? (
                <Wallet email={email}/>
            ) : null}
      </div>
    );
}

export default Dashboard
