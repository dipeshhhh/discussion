import React, {useState, useEffect} from 'react'
import Img from './logo.png'
import './index.css'
import Content from './content'
import './captcha'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { Helmet } from 'react-helmet';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import Select from 'react-dropdown-select'

const Index = () => {
    const navigate = useNavigate()      
        
        let myPromise = new Promise((resolve,reject)=>{
            const auth = Cookies.get('auth')
            resolve(auth)
          })
          myPromise.then(
            async function(value)
            {
                if(value)
                {                              
                    navigate('/')
                }               
                
            }
                )  
  

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [register, setRegister] = useState(false)
    const [user, setUSer] = useState({
        name:'',email:'',password:'',cpassword:''
    })
    let name, value 
    const handleInput = (e)=>{
       
        name =e.target.name
        value =e.target.value

        setUSer({...user, [name]:value})
    }

    function validateEmail(email) {
        const reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
        if (reg.test(email) === false || !(email.split('@')[1] === 'icar.gov.in')) {
          return false;
        } else return true;
      }

    const [Smdhidden, SetSmdhidden]= useState(true)
    const [Subjecthidden, setSubjecthidden]= useState(true)
    const [designation, setDesignation]= useState('')

    const  handldesignation = (e)=>{

    setDesignation(e.target.value)
    
    if(e.target.value == 2)
    {
        SetSmdhidden(false)
        setSubjecthidden(true)
    } 
    else if(e.target.value == 3)
    {
        SetSmdhidden(false)
        setSubjecthidden(false)
    }       
    else{
        SetSmdhidden(true)
        setSubjecthidden(true)
    }

    }

/// Registration button function call here
       const handleRegister= async (e)=>{
       const status=1
        e.preventDefault()
        setLoading(true)
        const {name, email,password, cpassword} = user       
        if(!name || !email || !Divisionid || !password || !cpassword || !Smdid )
        {
            setError("Something missing");
            setLoading(false);
        }
        else if (!validateEmail(email))
        {
            setError("Email is not in valid formate");
            setLoading(false);
        }
        else if(!(password === cpassword))
        {
            
            setError("Password is not Matched");
            
            setLoading(false);
        }
        else{         
                  
            try{
                const resp =await axios.post('/Signup',
                {
                    name,
                    email,
                    Divisionid,
                    Smdid,
                    password,
                    status,
                    intrested
                    
                }).then((resp)=>{
                    toast.success('Registration Sucessfully')
                    navigate('/')
                    setLoading(false)
                })
            }
            catch(err)
            {
                toast.error(err.response.data.err)
                setLoading(false);
            }          
           
        }
                
      }

 /************Register as DG**************/     
     const Registerdg = async(e)=>{
        
        const status=3
        e.preventDefault()
        setLoading(true)
        const {name, email,password, cpassword} = user       
        if(!name || !email|| !password || !cpassword)
        {
            setError("Something missing");
            setLoading(false);
        }
        else if (!validateEmail(email))
        {
            setError("Email is not in valid formate");
            setLoading(false);
        }
        else if(!(password === cpassword))
        {
            
            setError("Password is not Matched");
            
            setLoading(false);
        }
        else{         
                  
            try{
                
                const resp =await axios.post('/Signup',
                {
                    name,
                    email,                   
                    password,
                    status,
                    intrested
                    
                }).then((resp)=>{
                    toast.success('Registration Sucessfully')
                    navigate('/')
                    setLoading(false)
                })
            }
            catch(err)
            {
                toast.error(err.response.data.err)
                setLoading(false);
            }          
           
        }

     }
/************Register as DDG & ADG**************/
     const Registerddg = async(e)=>{
       
        const status=2
        e.preventDefault()
        setLoading(true)
        const {name, email,password, cpassword} = user       
        if(!name || !email|| !password || !cpassword || !Smdid )
        {
            setError("Something missing");
            setLoading(false);
        }
        else if (!validateEmail(email))
        {
            setError("Email is not in valid formate");
            setLoading(false);
        }
        else if(!(password === cpassword))
        {
            
            setError("Password is not Matched");
            
            setLoading(false);
        }
        else{         
                  
            try{
                
                const resp =await axios.post('/Signup',
                {
                    name,
                    email,
                    Smdid,
                    password,
                    status,
                    intrested
                    
                }).then((resp)=>{
                    toast.success('Registration Sucessfully')
                    navigate('/')
                    setLoading(false)
                })
            }
            catch(err)
            {
                toast.error(err.response.data.err)
                setLoading(false);
            }          
           
        }



     }
 /*******************Handle Login Page button*************************/     
const handleLogin= async (e)=>{
    const {email, password} = user
    e.preventDefault()
        if(!email || !password )
    {
        setError("Something missing");
        setLoading(false);
    }
    else if (!validateEmail(email))
    {
        setError("Email is not in valid format");
        setLoading(false);
    }
    else{
    try{
        const resp = await axios.post('/Signin', {
            email,
            password
        }).then((resp)=>{
            const UserName = [resp.data.userExist.email,resp.data.userExist.name]

            let myPromise = new Promise((resolve,reject)=>{

                setTimeout(() => resolve(Cookies.set('auth',UserName)), 500)  
               // resolve(sessionStorage.setItem('username',UserName))
            })
            myPromise.then(
                async function ()
                {   
                    if(resp.data.userExist.status == 1)
                    {
                        toast.success('Login successfully')           
                        navigate('/index') 
                    }    
                    else
                    {
                        toast.success('Login successfully')           
                        navigate('/index') 

                    }    

                   
                }
                    )  
            
        })
        }
        catch(err) {

            // setError(err.response.data.err)

            toast.error(err.response.data.err)

            setLoading(false);
        }
    
    }
        }
        
    

      const [Smd , setSmd] = useState([])
      const [Smdid, setSmdid] = useState('')
      const [subject, setSubject] = useState([])
      const [Division, setDivision]= useState([])
      const [Divisionid, setDivisionid]= useState('')
      const [enable, setEnable] = useState(true)

         
    //Here We fetch the SMD division data from server 
        useEffect(()=>{
          async function getSmd()
          {
            await axios.get('/Group').then((res)=>{
               
                //console.log(res.data)
                setSmd(res.data)
            }).catch((err)=>{
              console.log(err)
            })
          }

          async function getSubject()
          {
            await axios.get('/subject').then((res)=>{               
                setSubject(res.data)               
            }).catch((err)=>{
              console.log(err)
            })

          }
          getSubject()
          getSmd()
        },[])      

     /****************Handle SMD Button****************/   
        const handleSmd = async (e)=>{           
            
            setSmdid('')
            setDivisionid('')    
            const Smdname = e.target.value    
          
        
            if(Smdname!='')
            {                   
                await axios.get(`/groupdetail/${Smdname}`).then((res)=>{
                          
                    setDivision(res.data)
                    setSmdid(Smdname)
                    setEnable(false)
        
                   
                    }).catch((err)=>{
                  console.log(err)
                })
        
               
            }
            else
            {
                setDivisionid('')
                setSmdid('')       
                setDivision([])
                setEnable(true)
        
            }
        }
       
       
        //handle division select options
        const handeDivision = async (e)=>{
            console.log(e.target.value)
        //    setDivisionid(e.target.value)
            
        }

/****************Select Intrested Subjects*********************/
      let options = []

     Division?.map((resp)=>{
        options.push(resp)
     })      
      
      let intrested = []        
           
    const [values, setValues] = useState([])

              values.map((resp)=>{
                console.log(resp)
                 intrested.push(resp._id)
              })     
              
    console.log(intrested)       

       
    
 /********************************************/ 

const [verify, setVerify] = useState(false)
const [otps, setOtps] = useState('')
const [resmail, setResmail]= useState(false)
const [demail, setDemail] = useState(false)

 const Getotp = async(e) =>{

    const {email} = user

    e.preventDefault()
    setLoading(true)

    if(!email)
    {
        toast.error('Please enter your email')
        setLoading(false);

    }
    else if (!validateEmail(email))
    {
        toast.error('Email is not in valid format')       
        setLoading(false);
    }
    else
    {
       try{

            const data = await axios.post('/SendOtp',{
                email
            }).then((resp)=>{
                toast.success('Please Check your Email') 
                setResmail(true)              
                setVerify(true)               
            })

        }
        catch(err){
            toast.error(err.response.data.err)
            setLoading(false);
        } 
       
    }}
 
  const Resotp = async(e)=>{

    const {email} = user

    try
    {
        const data = await axios.post('/Resotp',{
            email,
        }).then((resp)=>{
            toast.success('OTP Resend Successfully')            
        })
    }
    catch(err)
    {
        toast.error(err.response.data.err)
        setLoading(false);
    }


   }

   const Verifyotp = async(e)=>{

    const {otp,email} = user

    try
    {
        const data = await axios.post('/VerifyOtp',{
            otp,
            email,
    
        }).then((resp)=>{
            toast.success('Right OTP')
            setDemail(true)             
            setLoading(false);            
        })
    }
    catch(err)
    {
        toast.error(err.response.data.err)
        setLoading(false);
    }   }

  return (
        <div className='auth'>
            <Helmet>
        <title>Discussion Forum | Auth</title>
      </Helmet>
        <div className='auth-container'>
                <div className='landing_page'>
                    <div className='pull-right'>
                      <div className='auth-login'>
                          <div className='auth-login-container'>

                            <div className='ICAR-Sign'>
                                <img src={Img} alt="" style={{ height: "150px"}} />
                            </div>
                            
                            {
                                register ? (<>

                              <div className='input-field'>
                                  <p>ICAR Email (xxx@icar.gov.in)</p>
                                  <input disabled={demail}  type="email" name='email' autoComplete='off'
                                  value={user.email}
                                  onChange={handleInput}
                                  placeholder='xxx@icar.gov.in' />
                              </div>
                             {
                                resmail == false ?

                                <>
                                 <button style={{ marginTop: "20px" }} onClick={Getotp}>
                                   Get OTP
                                 </button>
                                </>
                                :
                                demail == false && 
                                <>
                                <button style={{ marginTop: "20px" }} onClick={Resotp}>
                                   Resent OTP
                                 </button>
                                </>
                             }                                         
                             
                              {
                                 demail == false ? 

                                 verify == true &&
                                 <>
                                  <div className='input-field'>
                                   <p>Enter OTP</p>
                                   <input  type="text" name='otp' autoComplete='off'
                                   value={user.otp}
                                   onChange={handleInput}
                                   placeholder='Please Enter OTP' />
                               </div>
                               <button style={{ marginTop: "20px" }} onClick={Verifyotp}>
                               Verify OTP
                               </button>                                
                                 </>

                                 :

                                <>                                
                            
                            <div className='input-field'>
                                  <p>Name</p>
                                  <input  type="text" name='name' autoComplete='off'
                                  value={user.name}
                                  onChange={handleInput}
                                  placeholder='Enter your full name' />
                              </div>

                            <div className='input-field'>
                                  <p>Select Your Designation (optional)</p>
                                  <select name="division" onChange={(e)=>handldesignation(e)} id="smd">
                                  <option value=''>--Select Designation--</option> 
                                  <option value='1'>DG</option>                                                        
                                  <option value='2'>DDG</option>
                                  <option value='2'>ADG</option>
                                  <option value='3'>Scientist</option>
                                  </select>
                              </div>
                              <div className='input-field'>
                              <p>Select Intrested Subjects</p>                           
                              <Select
                            name='select'
                            options={values.length>3 ? values : subject}
                            labelField='name'
                            valueField='name'                           
                            multi                                                                                                                      
                            onChange={values =>
                              setValues(values)                              
                              }
                            />
                              </div>
                              <div className='input-field'>
                                  <p>Select Main Subject</p>
                                  <select onChange={(e)=>{handeDivision(e)}} id="division">
                                  <option value=''>--Select Subject--</option>
                                  {
                                      subject.map((resp)=>
                                      <option value={resp._id}>{resp.name}</option>
                                     )
                                  }
                                 
                                  </select>
                              </div>                                                            
                              
                             
                                {
                                    Smdhidden == false && 
                                    <>
                                     <div className='input-field'>
                                  <p>Select SMD</p>
                                  <select name="division" disabled={Smdhidden} onChange={(e)=>handleSmd(e)} id="smd">
                                  <option value=''>--Select SMD--</option> 
                                  {
                                    Smd.map((data)=>
                                      
                                        <option value={data._id}>{data.name}</option>
                                    )
                                  }                                                      
                                 
                                  </select>
                                    </div>
                                    </>

                                }
                                {
                                    Subjecthidden == false  && 
                                    <>
                                     <div className='input-field'>
                              <p>Select Intrested Subjects</p>                           
                              <Select
                            name='select'
                            options={values.length>3 ? values : options }
                            labelField='name'
                            valueField='name'                           
                            multi                                                                                                                      
                            onChange={values =>                

                              setValues(values)                              
                              }
                            />
                              </div>
                              <div className='input-field'>
                                  <p>Select Main Subject</p>
                                  <select onChange={(e)=>{handeDivision(e)}} id="division">
                                  <option value=''>--Select Subject--</option>
                                  {
                                      Division.map((resp)=>
                                      <option value={resp._id}>{resp.name}</option>
                                     )
                                  }
                                 
                                  </select>
                              </div>

                                    </>


                                }
                             
                                                           
                              <div className='input-field'>
                                  <p>Password</p>
                                  <input  name='password' type="password" autoComplete='off'
                                  value={user.password}
                                  onChange={handleInput}
                                  placeholder='Enter the password'/>
                              </div>
                              <div className='input-field'>
                                  <p>Confirm Password</p>
                                  <input type="password" name='cpassword' autoComplete='off'
                                  value={user.cpassword}
                                  onChange={handleInput}
                                  placeholder='Enter the Confirm password' />
                              </div>
                              {
                                designation== 1 &&
                                <button style={{ marginTop: "20px" }} onClick={Registerdg}>
                              {loading ? "Registering..." : "Register"}
                              </button>

                              }
                              {
                                designation == 2 &&
                                <button style={{ marginTop: "20px" }} onClick={Registerddg}>
                                {loading ? "Registering..." : "Register"}
                                </button>
                              }
                              {
                                designation == 3 &&
                                <button style={{ marginTop: "20px" }} onClick={handleRegister}>
                              {loading ? "Registering..." : "Register"}
                              </button>
                              }                                
                                </>
                              
                              }               
                             
                              
                                </>
                                ) : (
                                
                                <>
                                <div className='input-field'>
                                  <p>Email</p>
                                  <input  type="email" name='email'  autoComplete='off' 
                                   value={user.email}
                                   onChange={handleInput}
                                  />
                              </div>
                              <div className='input-field'>
                                  <p>Password</p>
                                  <input  type="password" name='password' autoComplete='off'
                                  value={user.password}
                                  onChange={handleInput}
                                  />
                              </div>                         
                                                                                                                 
                              <button style={{ marginTop: "20px" }} onClick={handleLogin}>
                              {loading ? "Logging in..." : "Login"}
                              </button>
                              
                                </>
                                )}
                              <p onClick={()=> setRegister(!register)   || setUSer({name:'',email:'',division:'',password:'',cpassword:''})   || setError(false)                        
                            } style={{
                                    marginTop:'10px',
                                    textAlign:'center',
                                    // color:'#0095ff',
                                    color:'var(--secondary-color-forlink)',
                                    textDecoration:'underline',
                                    cursor:'pointer'
                              }}>{ register ? 'Login' : 'Register'}?</p>
                                  <div id="company">
                                  {error !== "" && (
                                        <p
                                        style={{
                                        color: "red",
                                        fontSize: "14px",
                                               }}
                                        >
                                          {error}
                                        </p>
                                            )}    
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