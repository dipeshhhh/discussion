import React, {useState,useEffect} from 'react'
import axios from 'axios'

const Comment = () => {

  const [Smd , setSmd] = useState([])
  const [Smdid, setSmdid] = useState('')
  const [Division, setDivision]= useState([])
  const [Divisionid, setDivisionid]= useState('')
  const [enable, setEnable] = useState(true)

  useEffect(()=>{
    async function getSmd()
    {
      await axios.get('/smddetail').then((res)=>{
         
          //console.log(res.data)
          setSmd(res.data)
      }).catch((err)=>{
        console.log(err)
      })
    }
    getSmd()
  },[])  

  const handleSmd = async (e)=>{           
            
    setSmdid('')
    setDivision([])
    
    const Smdname = e.target.value
    
    console.log(Smdname)

    if(Smdname!='')
    {                   
        await axios.get(`/groupdetail/${Smdname}`).then((res)=>{
           
          console.log(res.data)
            // setDivision(res.data)
            // setSmdid(Smdname)
            // setEnable(false)

           
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



  return (
    <div>
     <div className='input-field'>
                                  <p>Select SMD</p>
                                  <select name="division" onChange={(e)=>handleSmd(e)} id="smd">
                                  <option value=''>--Select SMD--</option> 
                                  {
                                    Smd.map((data)=>
                                      
                                        <option value={data.name}>{data.name}</option>
                                    )
                                  }                                                      
                                 
                                  </select>
                                    </div>
    </div>


  )
}

export default Comment