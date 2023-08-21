import React, {useState,useEffect} from 'react'
import axios from 'axios'
import {Multiselect} from 'multiselect-react-dropdown'
import Select from 'react-dropdown-select'

const Comment = () => {

  const [Smd , setSmd] = useState([])
  const [Smdid, setSmdid] = useState('')
  const [Division, setDivision]= useState([])
  const [Divisionid, setDivisionid]= useState('')
  const [enable, setEnable] = useState(true)

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
    getSmd()
  },[])  

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

const handeDivision = async (e)=>{
  setDivisionid(e.target.value)
   
}

let options = []

Division.map((resp)=>
            options.push(resp)               
      ) 
   
let intrest = []
// const [value, setValue] = useState([])

// console.log(value)

const [values, setValues] = useState([])

values.map((resp)=>{
   intrest.push(resp._id)
})



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
    </div>


  )
}

export default Comment