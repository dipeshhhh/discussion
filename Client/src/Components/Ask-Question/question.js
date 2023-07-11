import React, {useState,useEffect} from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css' // quill css 
import './question.css'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom'

import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const Question = () => {

  const navigate = useNavigate()

  const auth = sessionStorage.getItem('username')
    const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');  
  const [title, setTitle] =useState('')
  const [group,setGroup] = useState('')
  const [groupid,setGroupid] = useState('')
  const [body, setBody] = useState('')
  const [file,setFile] = useState('')
  const [user, setUser] = useState('')
  //const [members, setMembers]= useState('')
  const [member, setMember] = useState('')
  const handleQuill = (value) => {
      setBody(value)
    
      
      
    }
/*********  Words Count for body & title part   ***********/
    var text = body.replace(/<[^>]*>/g,'')
              
    text=text.trim();
    let word = text.split(' ')
   
    let clearList =word.filter((function(elm){
      return elm != '';
    }))

    let char = clearList.length   

    if(char>150)
    {
      char = 'You should write only 150'
    }

    var t_text = title.trim()
    let t_word = t_text.split(' ')
    let t_clearList = t_word.filter((function(element){
      return element != ''
    }))

    let t_char = t_clearList.length

    if(t_char>20)
    {
      t_char= 'you should write only 20'
    }
    /***************************************/    

  useEffect(()=>{
      async function getGroup()
      {
        await axios.get(`/group/${auth}`).then((res)=>{
              
        setGroupid(res)
      
        }).catch((err)=>{
          console.log(err)
        })
      }
      getGroup()
    },[])   
    
  useEffect(()=>{
    async function user_detail()
    {
      await axios.get(`/user-detail/${auth}`).then((res)=>{
          
        setUser(res.data)
      
        }).catch((err)=>{
          console.log(err)
        })

    }
    user_detail()
  }, [])  
   

   const handleFileChange = (event) => {
       
        setFile(event.target.files[0]) 
                
    };  

    const add_question = async(e) => {
      
    e.preventDefault() 
    setLoading(true)

    const data = new FormData()

    data.append('file', file)
    data.append('title',title)
    data.append('body',body)
    data.append('auth',auth)
    data.append('subject',user.Divisionid)
    //data.append('group',group)
     
    if(!title || !body)
      {       
        setError("Something missing");
        setLoading(false);
      }      
      else if (title.length > 250)
      {
      console.log('missing')
      setError("Title Character should be about 200 Characters");
      setLoading(false);
      }
      else if(body.length >1500)
      {
        setError("Body Character should be about 1500 Characters");
      setLoading(false);
      }
    
      else if (!file)
      {      
        setError("Please attach the file");

        setLoading(false);
      }
      else if(file.type.split('/').pop()!='pdf')
        {

          setError("Please upload file in pdf format");
          setLoading(false);
          
        }
        else if (file.size/1024 > 5120) 
        {          
          setError("Please Upload file less than 5MB");
          setLoading(false);
        }        
     
      else
      {   
        if(window.confirm('Please confirm for Post'))
        {

          console.log(member)
          try {
            axios.post("/Question",data).then(res => {
  
                  console.log(res)
                  toast.success('Post uploaded sucessfully')
                  navigate('/')
                  setLoading(false)
  
                })
          }
          catch (err) {
            console.log(err)
            setLoading(false);
          }
          
        }
        else 
        {
          setLoading(false);
        } 
    
      }
    } 


   /**************Handle user Regarding the Subjects **************/ 
     
   useEffect(()=>{
    async function getMembers()
    {
            
      await axios.get(`/Member/${user.Divisionid}`).then((res)=>{
      console.log(res.data)
      //setMembers(res.data)
    
      }).catch((err)=>{
        console.log(err)
      })
    }
    getMembers()
  },[])  

   const handleMember = (e) =>{
    const {name, checked} =e.target
    console.log(`${name} is ${checked}`)

    if(checked)
    {
      setMember([...member,name])
    }
    else{
      setMember(member.filter((e)=> e!=name))
    }
   }   
   

  return (

    
    <div className='add-question'>
      <div className='add-question-container'>
      <div className='head-title'>
        <h1>Ask a Question</h1>
      </div>
      <div className='question-container'>
        <div className='question-options'>
         <div className='question-option'>
          <div className='title'>
            <h3>Title</h3>
            <small>Be specific and imagine you're asking a question to Group Member</small>            
          <input type="text" value={title} onChange={(e)=> setTitle(e.target.value)}
           
              placeholder='Add the question title' />
          </div>
          <p>
              <span dangerouslySetInnerHTML={{__html:t_char}}>
                </span> &nbsp;  words
             </p>
        </div>
          <div className='question-option'>
          <div className='body'>
            <h3>Body</h3>
            <small>Include all the information someone would need to answer your question</small>
             <ReactQuill value={body} id='textbox' onChange={handleQuill} className='react-quill'theme='snow'/>
             </div>
             <p>
              <span dangerouslySetInnerHTML={{__html:char}}>
                </span> &nbsp;  words
             </p>
        </div>
        <div className='question-option'>
          <div className='group'>
            <h3>Groups</h3>
            {
          user.status==1 ? 
             
              <p>
                Your Subject is : {user.Divisionid}
              </p>
              :
               <small>Please Select the group</small>
              
          //     <select value={group} onChange={(e)=>setGroup(e.target.value)}>
          // <option value=''>--Select Group--</option>
          // {
          //     groupid.data?.map((resp)=>
          //     <option value={resp._id}>{resp.name}</option>
          //     )
          // } 
          //           </select>
        }          
          
              
          </div>
        </div>

                {/* <small>Select your Post for All or Specific User</small>
            <select>
         <option value=''>--Select --</option>
          <option value="All">All Group Member</option>
          <option value="Specific">Specific User</option>  
           </select> */}

        <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={members}
      disableCloseOnSelect
      getOptionLabel={(option) => option.name}
      renderOption={(props, option, { selected }) => (
           
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
            onChange={handleMember}
            name={option.email}
          />                  
          {option.name}
        </li>
      )}
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField {...params}  label="Checkboxes" placeholder="Favorites" />
      )}
    />



        <div className='question-option'>
          <div className='attachment'>
            <h3>Attach file (only PDF with 5 MB)</h3>
            <input label="File upload" type="file" name='file' onChange={handleFileChange}
              placeholder="Select file..." />
          </div>
        </div>
        {error !== "" && (
      <p style={{ color: "red", fontSize: "14px"}} >
          {error}
      </p>
      )}    
        </div>
      </div>
      <button className='button' onClick={add_question}>
      {loading ? "Posting..." : "Post"}     
        </button>  
      </div>
        {/* {error !== "" && (
      <p style={{ color: "red", fontSize: "14px"}} >
          {error}
      </p>
      )}     */}
    </div>
  )
}

export default Question


const members = [
  { email: 'nitin@icar.gov.in', name: 'nitin' },
  { email: 'anil@icar.gov.in', name: 'anil' },
  { email: 'chhavi@icar.gov.in', name: 'chhavi' }
]

