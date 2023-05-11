import React, {useState} from 'react'
import Img from './logo.png'
import './index.css'
import { ForkRight, Margin } from '@mui/icons-material';

const Index = () => {
 
    const [email, setEmail] = useState("");
    const [passowrd, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [err, setError] = useState("")

    const handleLogin= (e)=>{
        e.preventDefault()
        setError("")
        setLoading(true)
        if(email === "" || passowrd === "")
        {
            console.log("Something missing");
            setError('Required field is missing')
            setLoading(false)
        }
        else{
            console.log("everything is great");
            setLoading(false)
        }
    }
  return (
    <div className='auth'>
        <div className='auth-container'>
                <div className='landing_page'>
                    <div className='pull-right'>
                      <div className='ICAR-Sign'>
                          <img src={Img} alt="" style={{ height: "150px"}} />

                      </div>
                      <div className='auth-login'>
                          <div className='auth-login-container'>
                              <div className='input-field'>
                                  <p>Email</p>
                                  <input value={email} type="email" onChange={(e) => setEmail(e.target.value)} autoComplete='off' />
                              </div>
                              <div className='input-field'>
                                  <p>Password</p>
                                  <input value={passowrd} type="password" onChange={(e) => { setPassword(e.target.value) }} autoComplete='off'/>
                              </div>
                              <button style={{ marginTop: "20px" }} onClick={handleLogin}>Login</button>
                              <div id="company">
                                  <div>Copyright @ICAR - ICT Unit</div>
                              </div>
                          </div>
                      </div>
                    </div>
                    <div className='thread-body'>
                        <h1>
                        <span> <u>Discussion Box  for ICAR Users </u> </span></h1>
                      <p>
                        <span>
                            ICAR-Data Center&nbsp;is providing support for email services,
                             hosting of web applications/websites, e-Office, ICAR-ERP,
                              Agricultural Research Management System, 
                              Foreign Visit Management System, Personnel Management System, 
                              eHRMS, SPARROW, super computing facility, etc. 
                              This is a centralized help desk in the form&nbsp;of web 
                              application which address the issues and concerns related to 
                              use of ICAR-web application services. In order to use this you have to follow:
                              </span></p>

                              <p>
                        <span>
                            ICAR-Data Center&nbsp;is providing support for email services,
                             hosting of web applications/websites, e-Office, ICAR-ERP,
                              Agricultural Research Management System, 
                              Foreign Visit Management System, Personnel Management System, 
                              eHRMS, SPARROW, super computing facility, etc. 
                              This is a centralized help desk in the form&nbsp;of web 
                              application which address the issues and concerns related to 
                              use of ICAR-web application services. In order to use this you have to follow:
                              </span></p>

                              <p>
                        <span>
                            ICAR-Data Center&nbsp;is providing support for email services,
                             hosting of web applications/websites, e-Office, ICAR-ERP,
                              Agricultural Research Management System, 
                              Foreign Visit Management System, Personnel Management System, 
                              eHRMS, SPARROW, super computing facility, etc. 
                              This is a centralized help desk in the form&nbsp;of web 
                              application which address the issues and concerns related to 
                              use of ICAR-web application services. In order to use this you have to follow:
                              </span></p>

                              <p>
                        <span>
                            ICAR-Data Center&nbsp;is providing support for email services,
                             hosting of web applications/websites, e-Office, ICAR-ERP,
                              Agricultural Research Management System, 
                              Foreign Visit Management System, Personnel Management System, 
                              eHRMS, SPARROW, super computing facility, etc. 
                              This is a centralized help desk in the form&nbsp;of web 
                              application which address the issues and concerns related to 
                              use of ICAR-web application services. In order to use this you have to follow:
                              </span></p>
                              <p>
                        <span>
                            ICAR-Data Center&nbsp;is providing support for email services,
                             hosting of web applications/websites, e-Office, ICAR-ERP,
                              Agricultural Research Management System, 
                              Foreign Visit Management System, Personnel Management System, 
                              eHRMS, SPARROW, super computing facility, etc. 
                              This is a centralized help desk in the form&nbsp;of web 
                              application which address the issues and concerns related to 
                              use of ICAR-web application services. In order to use this you have to follow:
                              </span></p>
                              <p>
                        <span>
                            ICAR-Data Center&nbsp;is providing support for email services,
                             hosting of web applications/websites, e-Office, ICAR-ERP,
                              Agricultural Research Management System, 
                              Foreign Visit Management System, Personnel Management System, 
                              eHRMS, SPARROW, super computing facility, etc. 
                              This is a centralized help desk in the form&nbsp;of web 
                              application which address the issues and concerns related to 
                              use of ICAR-web application services. In order to use this you have to follow:
                              </span></p>
                              <p>
                        <span>
                            ICAR-Data Center&nbsp;is providing support for email services,
                             hosting of web applications/websites, e-Office, ICAR-ERP,
                              Agricultural Research Management System, 
                              Foreign Visit Management System, Personnel Management System, 
                              eHRMS, SPARROW, super computing facility, etc. 
                              This is a centralized help desk in the form&nbsp;of web 
                              application which address the issues and concerns related to 
                              use of ICAR-web application services. In order to use this you have to follow:
                              </span></p>

                    </div>
                
                    </div>       
            
            </div>
            
       
    </div>
  )
}

export default Index