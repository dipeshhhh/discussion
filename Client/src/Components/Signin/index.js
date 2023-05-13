import React, {useState} from 'react'
import Img from './logo.png'
import './index.css'
import Content from './content'
import './captcha'
import axios from 'axios'

const Index = () => {
 
    const [register, setRegister] = useState(false)
    const [user, setUSer] = useState({
        name:'',email:'',division:'',password:'',cpassword:''
    })
    let name, value 
    const handleInput = (e)=>{
        console.log(e)
        name =e.target.name
        value =e.target.value

        setUSer({...user, [name]:value})
    }

    const handleRegister = (e)=>{
        e.preventDefault()
        console.log(user);
        axios.post('/Signup',{user}).then(res=>
            console.log(res)
        ).catch(err=>
            console.log(err.toJSON().message)
        )
       
    }
    
    
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
                                  <input  type="text" name='name' autoComplete='off'
                                  value={user.name}
                                  onChange={handleInput}
                                  placeholder='Enter your full name' />
                              </div>
                              <div className='input-field'>
                                  <p>ICAR Email</p>
                                  <input  type="email" name='email' autoComplete='off'
                                  value={user.email}
                                  onChange={handleInput}
                                  placeholder='Enter your icar mail' />
                              </div>

                              <div className='input-field'>
                                  <p>Select Division</p>
                                  <select name="division" onChange={handleInput} value={user.division} id="divsion">
                                  <option>--Select Organization--</option>
                                  <option>Agricultural Education </option>
                                  <option>Agricultural Engineering</option>
                                  <option>Agricultural Extension</option>
                                  <option>Animal Science</option>
                                  <option>Crop Science</option>
                                  <option>Fisheries Science</option>
                                  <option>Horticulture Science</option>
                                  <option>Natural Resource Management</option>
                                  <option>Administration</option>
                                  <option>Finance</option>
                                  <option>Social Science</option>
                                  <option>Technical</option>
                                  </select>
                              </div>
                              <div className='input-field'>
                                  <p>Password</p>
                                  <input  name='password' type="password"  autoComplete='off'
                                  value={user.password}
                                  onChange={handleInput}
                                  placeholder='Enter the password'/>
                              </div>
                              <div className='input-field'>
                                  <p>Confirm Pasword</p>
                                  <input type="password" name='cpassword' autoComplete='off'
                                  value={user.cpassword}
                                  onChange={handleInput}
                                  placeholder='Enter the Confirm password' />
                              </div>
                              <button style={{ marginTop: "20px" }} onClick={handleRegister}>Register</button>
                                </>
                                ) : (
                                
                                <>
                                <div className='input-field'>
                                  <p>Email</p>
                                  <input  type="email" autoComplete='off' />
                              </div>
                              <div className='input-field'>
                                  <p>Password</p>
                                  <input  type="password" autoComplete='off'/>
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