import React, {useState} from 'react'
import axios from 'axios';
export const Tooltip = ({text,children})=>{
   
    const [userDetails, setUserDetails] = useState(null);
    const [smd, setSmd] = useState('')
    const [institute, setInstitute] = useState('')

    const getUser = async(e)=>{

        const userResponse = await axios.get(`/user-details/${e}`)               
        setUserDetails(userResponse.data)       
         setIsVisible(true) 
        if(userResponse.data.Hqrs ==1)
        {
          const Smd = await axios.get(`/SmdName/${userResponse.data.Smdid}`);
          const Inst = await axios.get(`/InstituteName/${userResponse.data.institute}`)
          setSmd(Smd.data)
          setInstitute(Inst.data)
        }
        else if (userResponse.data.Hqrs == 2)
        {
          const Smd = await axios.get(`/SmdName/${userResponse.data.Smdid}`);
          setSmd(Smd.data)
        }  
    }

    const [isVisible, setIsVisible] = useState(false)
    return(
        <div className='tooltip-container'        
        onMouseEnter={()=>getUser(text)}
        onMouseLeave={()=>setIsVisible(false)}
        >
        {children}
        {isVisible &&  <div className='tooltip'>
            
            <p>Name: {userDetails.name}</p>
            <p>Email: {userDetails.email}</p>
            {userDetails.Hqrs ==1 ?
            <p>Location: Outside ICAR HQRS</p>
            :
            <p>Location: ICAR HQRS</p>
            }
            {             
            userDetails.status == 1 ?            
            <>
             <p>Institute: {institute.name}</p>
             <p>SMD: {smd.name}</p>
            </>           
            :
            <p>SMD: {smd.name}</p>
            }

            </div>} 
           
        </div>
    )
}