import React, {useState,useEffect} from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css' // quill css 
import './question.css'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


const Question = () => {

  const navigate = useNavigate()

  const userData = Cookies.get('auth')
  let auth =''
  if(userData)
  {
    const data = userData.split(',')
    auth = data[0]  
  }
  
    const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');  
  const [title, setTitle] =useState('')
  const [groupidd,setGroupidd] = useState('')
  const [body, setBody] = useState('')
  const [file,setFile] = useState('')
  const [user, setUser] = useState('')
  const [members, setMembers]= useState('')
  const [member, setMember] = useState([])
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
      char = 'You should write only 150 word'
    }

    var t_text = title.trim()
    let t_word = t_text.split(' ')
    let t_clearList = t_word.filter((function(element){
      return element != ''
    }))

    let t_char = t_clearList.length

    if(t_char>25)
    {
      t_char= 'you should write only 25 word'
      
    }
    /***************************************/    

  useEffect(()=>{
   /************This is *************/
      
        let userDetails = new Promise (async(resolve,reject)=>{
          const response =  await axios.get(`/main_G/${auth}`)
          resolve(response.data.Divisionid)
        })
        userDetails.then(
            async function(value)
            {
             
            const M_Data = await axios.get('/user-group',{params:{id_1:value,id_2:auth}})        
            
            setGroupidd(value)            
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
    data.append('subject',groupidd)
    data.append('Members', member)
    //data.append('group',group)
     
    if(!title || !body)
      {       
        setError("Something missing");
        setLoading(false);
      }      
      else if (t_clearList.length > 25)
      {      
      setError("You Should write only 25 Word in Title");
      setLoading(false);
      }
      else if(clearList.length >150)
      {
        setError("You Should write only 150 Word in Body");
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
          setMember(groupidd)      
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
           
             
              <p>
                Your Subject is : {user.Divisionid}
              </p>
              
              
               <small>Please Select the group</small>              
          
              
          </div>
        </div>
        
          
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
        <TextField {...params} label="Search Group Member Name" placeholder="Favorites" />
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
