import React from 'react';
import './header.css';
import logo from './logo.png';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom'
import { ToastContainer ,toast} from 'react-toastify';
import Cookies from 'js-cookie';

const Header = () => {
  const navigate = useNavigate() 

  let auth  
  
  if (Cookies.get('45034583/45843958/985307'))
  {
    const detail = Cookies.get('45034583/45843958/985307')
    auth = detail.split(',')
    
    
  }

  
  const logout = () => {


    const singout = new Promise (async(res,rej)=>{  
    res(Cookies.remove('45034583/45843958/985307'))
    })
    singout.then((out)=>{         
     toast.success('Logout Sucessfully')
     navigate('/Sigin')
    })
 
} 


  return (    
    <header>
      <ToastContainer
            position='top-center'
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
      <div className='header-container'>
        <div className='header-left'>
          <Link to="/" >
            <img src={logo} alt="" />
          </Link>
          <h3>       </h3>
        </div>
        <div className='header-center'>
          <h1 className='header-title'><font style={{color:'#006633'}}>Discussion Forum</font></h1>
          <h2 className='header-title2'><font style={{color:'#006633'}}>ICAR (Indian Council Of Agricultural Research)</font></h2>
        </div>       
        {
          auth ?
          <div className='header-right'>
            <h4>{auth[1]}</h4>
            {/* <h4>User Name</h4> */}
            <div className='header-right-container'>
              <p onClick={logout}>
                <i class="fa-solid fa-right-from-bracket"></i>  Log out
              </p>
            </div>
          </div> 
          :
          <p></p>
        }
      </div>
    </header>
  );
}

export default Header;