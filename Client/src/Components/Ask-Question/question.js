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
  const [members, setMembers]= useState('')
  const [member, setMember] = useState('')
  const [bthidden, setBthidden] = useState(false);
  const [gStatus, setGStatus]= useState(true)
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
   /************This is *************/ 
      async function getGroup()
      {
        await axios.get(`/main_group/${auth}`).then((res)=>{
            
       setGroupid(res)
      
        }).catch((err)=>{
          console.log(err)
        })
      }      
      getGroup()  
    let userDetails = new Promise(async(resolve,reject)=>{
      const response = await axios.get(`/user-detail/${auth}`)        
       resolve(response.data)  
    })
    userDetails.then(
      async function(value)
      {
      const M_Data = await axios.get('/Member',{params:{id_1:value.Divisionid,id_2:auth}})
       
        setUser(value)
        setMembers(M_Data.data)

      },
      function(error)
      {
        console.log(error)
      }
    )   

    }, [])
    
  
   

   const handleFileChange = (event) => {
              
        const files = event.target.files[0];

    if (files.size / 1024 > 5120 || files.type.split('/').pop() !== 'pdf') {
      setBthidden(true);
      setError('Please upload file as per the specified criteria');
    } else {
      setError('');
      setBthidden(false);
      setFile(event.target.files[0]);
    }                
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
    data.append('Members', member)
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
      else if(member.length<=1)
      {
        setError("Please Select the Group Member");
        setLoading(false);
      }          
     
      else
      {   
        if(window.confirm('Please confirm for Post'))
        {

        
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


     
   const groupMember= (e)=>{
        const val = e.target.value
        if(val == '')
        {
          setGStatus(true)
          setMember([])          
        }
        else if(val == 0)
        {
          setError(" ");            
          setGStatus(true)
          setMember([])
          let Member = members.map((resp)=>{ return (resp.email)})
          setMember(Member)
          Member.push(auth)
                    
             
        }
        else if(val == 1)
        {
          setError(" "); 
          setMember([auth])
          setGStatus(false)
        }
       
   }

   const handleMember = (e) =>{

    setError(" "); 
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
     
   console.log(member)

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

              
              //  <small>Please Select the group</small>
              
              <select value={group} onChange={(e)=>setGroup(e.target.value)}>
          <option value=''>--Select Group--</option>
         
          {
              groupid.data?.map((resp)=>
              <option value={resp._id}>{resp.name}</option>
              )
          } 
                    </select>      
        }          
          
              
          </div>
        </div>
        {
          user.status==1 ? 
          
          <div className='question-option'>
          <div className='group'>
            <h3>Member</h3>
           
               <small>Please Select the Member</small>
              
             <select onChange={(e)=>{groupMember(e)}}>
           <option value=''>--Select Group--</option>             
              <option value='0'>To All Member Subject</option>
              <option value='1'>To Specific Member Subject</option>
       
                    </select>
                      
              
          </div>
        </div>          

          :
          <p>hi... you Super Admin</p>
        }

<Autocomplete
        hidden={gStatus}
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
        <TextField {...params}  label="Search Group Member Name" placeholder="Favorites" />
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
      <button hidden={bthidden} className='button' onClick={add_question}>
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


// const members = [
//   { email: 'nitin@icar.gov.in', name: 'nitin' },
//   { email: 'anil@icar.gov.in', name: 'anil' },
//   { email: 'chhavi@icar.gov.in', name: 'chhavi' }
// ]
