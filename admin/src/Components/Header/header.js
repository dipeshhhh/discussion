import React from 'react';
import './header.css';
import logo from './logo.png';
import { Link } from 'react-router-dom';
import { ToastContainer ,toast} from 'react-toastify';
import Cookies from 'js-cookie';

const Header = () => {

  let auth;
  
  if (Cookies.get('auth'))
  {

    const detail = Cookies.get('auth')

    auth = detail.split(',')
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
                  <p href="#" >
                    <i class="fa-solid fa-right-from-bracket"></i>  Log out
                  </p>
                </div>

              </div> 
              :
            <></>
        }
        <div className='header-right'>
          <font style={{color:'#006633'}}>Admin</font>
        </div>
      </div>
    </header>
  );
}

export default Header;