import React, {useState,useEffect} from 'react'
import Select from 'react-select'

const member = [
    {name:'nitin', email:'nitinsain@icar.gov.in'},
    {name:'pawan', email:'pawan@icar.gov.in'}
]

const Mul = () => {
   
    return (

       <Select
       options={member.map((resp)=>{return resp.email})}
       />
    )
}

export default Mul









