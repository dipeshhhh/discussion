import React, {useState} from 'react'
import Img from './logo.png'
import './index.css'
import Content from './content'
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import './captcha'

const Index = () => {
 
    const [email, setEmail] = useState("");
    const [passowrd, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [err, setError] = useState("")
    const [register, setRegister] = useState(false)

    
    const handleLogin= (e)=>{
        
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
                            {
                                register ? (<>
                                    <div className='input-field'>
                                  <p>Name</p>
                                  <input value={email} type="email" onChange={(e) => setEmail(e.target.value)} autoComplete='off' placeholder='Enter your full name' />
                              </div>
                              <div className='input-field'>
                                  <p>ICAR Email</p>
                                  <input value={email} type="email" onChange={(e) => setEmail(e.target.value)} autoComplete='off' placeholder='Enter your icar mail' />
                              </div>

                              <div className='input-field'>
                                  <p>Select Division</p>
                                  <select name="organization" id="">Division
                                  <option value="">--Select Organization--</option>
                                  <option value="">Agricultural Education </option>
                                  <option value="">Agricultural Engineering</option>
                                  <option value="">Agricultural Extension</option>
                                  <option value="">Animal Science</option>
                                  <option value="">Crop Science</option>
                                  <option value="">Fisheries Science</option>
                                  <option value="">Horticulture Science</option>
                                  <option value="">Natural Resource Management</option>
                                  <option value="">Administration</option>
                                  <option value="">Finance</option>
                                  <option value="">Social Science</option>
                                  <option value="">Technical</option>
                                  </select>
                              </div>
                              <div className='input-field'>
                                  <p>Password</p>
                                  <input value={email} type="email" onChange={(e) => setEmail(e.target.value)} autoComplete='off' placeholder='Enter the password'/>
                              </div>
                              <div className='input-field'>
                                  <p>Confirm Pasword</p>
                                  <input value={email} type="email" onChange={(e) => setEmail(e.target.value)} autoComplete='off' placeholder='Enter the Confirm password' />
                              </div>
                              <button style={{ marginTop: "20px" }}>Register</button>
                                </>
                                ) : (
                                
                                <>
                                <div className='input-field'>
                                  <p>Email</p>
                                  <input value={email} type="email" onChange={(e) => setEmail(e.target.value)} autoComplete='off' />
                              </div>
                              <div className='input-field'>
                                  <p>Password</p>
                                  <input value={passowrd} type="password" onChange={(e) => { setPassword(e.target.value) }} autoComplete='off'/>
                              </div>
                              <div className='input-field captcha_box'>
                              <p></p>
                                  <input value='' type="text" disabled autoComplete='off'/>
                                  <div className='refresh-button'>
                                  <RestartAltIcon/>
                                  </div>
                              </div>   
                              <div className='input-field captcha_input '>
                              <p>Enter Capcha</p>
                                  <input type="text" placeholder='Enter Captcha' autoComplete='off'/>
                                                                    
                              </div>                                                      
                              <button style={{ marginTop: "20px" }} onClick={handleLogin}>Login</button>
                                </>
                                )}
                              <p onClick={()=> setRegister(!register)} style={{
                                    marginTop:'10px',
                                    textAlign:'center',
                                    color:'#0095ff',
                                    textDecoration:'underline',
                                    cursor:'pointer'
                              }}>{ register ? 'Login' : 'Register'}?</p>
                              <div id="company">
                                  <div>Copyright @ICAR - ICT Unit</div>
                              </div>
                          </div>
                      </div>
                    </div>
                    
                        <Content/>
                  
                
                    </div>       
            
            </div>
            
       
    </div>
    
  )
}

export default Index