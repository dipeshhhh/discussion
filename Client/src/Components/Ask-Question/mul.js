import React, {useState,useEffect} from 'react'
import Select from 'multiselect-react-dropdown'
import axios from 'axios'

const Mul = () => {

       const [options, setOptions] = useState()
       
             useEffect (()=>{
             
        axios.get('/Member',{params:{id_1:'Agricultural Statistics',id_2:'ani.rai@icar.gov.in'}})
        .then((resp)=>{
            setOptions(resp.data)
        })            
            
       },[])
    
       console.log(options)


    return (

    //    <Select       
    //    options={options} // Options to display in the dropdown
    //     selectedValues={options.selectedValue} // Preselected value to persist in dropdown
    //     onSelect={(e)=>{console.log(options.email)}} // Function will trigger on select event
    //     onRemove={(e)=>{console.log(options.email)}} // Function will trigger on remove event
    //     displayValue="name"
    //     showCheckbox
       

    //    />    

    console.log('hi...')
   


 
    
    )
}

export default Mul









