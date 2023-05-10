import React, {useState} from 'react'
import Img from './logo.png'
import './index.css'

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
            <div className='ICAR-Sign'>
                <img src={Img} alt="" style={{height:"150px"}}/>

            </div>
            <div className='auth-login'>
                <div className='auth-login-container'>
                    <div className='input-field'>
                        <p>Email</p>
                        <input value={email} type="email" onChange={(e)=> setEmail(e.target.value)} />
                    </div>
                    <div className='input-field'>
                        <p>Password</p>
                        <input value={passowrd} type="password" onChange={(e)=>{ setPassword(e.target.value)}} />
                    </div>
                    <button style={{marginTop:"20px"}} onClick={handleLogin}>Login</button>
                    <div id="company">
                        <div>Copyright @ICAR - ICT Unit</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Index