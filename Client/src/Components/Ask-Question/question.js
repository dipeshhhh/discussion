import React, {useState,useEffect} from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css' // quill css 
import './question.css'
import axios from 'axios'
import Filter from 'bad-words'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Select from 'react-dropdown-select'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const words = require('./extra-words.json')


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
  const [smdid, setSmdid] = useState('')
  const [tempsmdid, setTempsmdid] = useState('') 
  const [institute, setInstitute]= useState([])
  const [Imember, setImember] = useState('')
  const [subject, setSubject] = useState([])
  const [subjectid, setSubjectid] = useState([])
  const [smd, setSmd] = useState('')
  const [groupidd,setGroupidd] = useState('')
  const [body, setBody] = useState('')
  const [file,setFile] = useState('')
  const [user, setUser] = useState('')
  const [members, setMembers]= useState('')
  const [member, setMember] = useState([])
  const [bthidden, setBthidden] = useState(false);
  const [gStatus, setGStatus]= useState(true)
  const [mStatus, setMstatus] = useState(true)
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
          resolve(response.data)
        })
        userDetails.then(
            async function(value)
            {     

            if(value.status === 1)
            {              
              const M_Data = await axios.get('/user-group',{params:{id_1:value.Divisionid,id_2:auth}})        
            
              setGroupidd(value)
              setSubjectid(value.Divisionid)                          
              setMembers(M_Data.data.rsp)
              setUser(M_Data.data.resp.name)                                       

            }
            else if(value.status === 2)
            {                  
              const M_Data = await axios.get('/user-group',{params:{id_1:value.Divisionid,id_2:auth}})            
              setGroupidd(value)                                                   
              setMembers(M_Data.data.rsp)
              setUser(M_Data.data.resp.name)              

                const response =  await axios.get('/smd-group',{params:{id_1:value.Smdid}})              
               
                setSubject(response.data.rsp)
                setSmd(response.data.resp)                
                setTempsmdid(response.data.resp._id) 
            }
      
            },
            function(error)
            {
              console.log(error)
            }
          )

    }, [])    

  
   const handleFileChange = (event) => {
              
    const files = event.target.files[0];
      console.log(files,"files");
      console.log(files == undefined,"files");

    const cancelFile = (event) =>{
      setError('');
      setBthidden(false);
      setFile(event.target.files[0]);
    }

    if(files == undefined) {
      cancelFile(event)
      return
    } 
    if (files.size / 1024 > 5120 || files.type.split('/').pop() !== 'pdf') {
      setBthidden(true);
      setError('Please upload file as per the specified criteria');
    } else {
      cancelFile(event)
    }      
    };  

    const add_question = async(e) => {
      
    e.preventDefault() 
    setLoading(true)

    const filter = new Filter({ replaceRegex:  /[A-Za-z0-9가-힣_]/g })
    filter.addWords(...words)

    const data = new FormData()
      
    data.append('file', file)
    data.append('title',title)
    data.append('body',body)
    data.append('auth',auth)
    data.append('institute',institute)
    data.append('subjectid',subjectid)
    data.append('Imember',Imember)
    data.append('Members', member)
    data.append('smdid',smdid)
  
    // console.log('Member:'+member)
    // console.log('smdid:'+smdid)   

    // console.log('Imember:'+Imember)

    // console.log('subject id:'+subjectid)
    
    if(!title || !body)
      {       
        setError("Something missing");
        setLoading(false);
      }
      else if (filter.isProfane(title) == true)
      {
        setError('You Should Remove bad words from Title');
        setLoading(false);
      }
      else if (filter.isProfane(body) == true)
      {
        setError('You Should Remove bad words from body');
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
                          
     
      else
      {
        if(hsubject == false)
        {
           if(member.length<1)
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
        else if(hinstitute == false)
        {
          if(!institute)
          {
            setError("Please Select the Institute");
          setLoading(false);
          }
          else if(!Imember)
          {
            setError("Please Select the Member");
            setLoading(false);
          }
          else
          {
            if(window.confirm('Please confirm for Post'))
        {       
          try {
            axios.post("/Question",data).then(res => {
  
                
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
          setMember(subjectid)      
        }
        else if(val == 1)
        {
          setError(" "); 
          setMember([])
          setGStatus(false)
        }
       
  }
 
  const handleMember = (e,members,removeOption) =>{   
    let membersEmail = []
    members.filter(function name(obj) {
      membersEmail.push(obj.email);
    })
    setImember(membersEmail)    
   }



   const handleMemberForPrincipelSci = (e,members,removeOption) =>{   
    
    let membersEmail = []
    members.filter(function name(obj) {
      membersEmail.push(obj.email);
    })
    setMember(membersEmail)    
   }

  //  console.log(member,subjectid)
  

   const [selectMember , setSelectMember] = useState('')
 

   const get_subject = (e)=>{
   
  const val = e.map((resp)=>(resp._id)) 
  setInstitute(val)
   setImember(val)  
   }    
     
   const Select_Member = (e)=>{

      setSelectMember(e.target.value)

      const Ssubject = e.target.value        

      setMember([])
      setImember([])
      setInstitute([])

      if(Ssubject == '')
      {        
        setMember([])
        setImember([])

      }
      else if(Ssubject == 1)
      { 
        console.log(subject)
        let val = []
        for(let i=0;i<subject.length;i++)
        {          
          val.push(subject[i]._id)           
        }        
        setImember(val)        
        setInstitute(val)

      }
      else if(Ssubject == 2)
      {      
        
      }
      else if(Ssubject == 3)
      {
        setSmdid('')       
        setImember([])       

      }

   }

   const [hsubject, setHsubject] = useState(true)
   const [hinstitute, setHInstitute] = useState(true)
   const Select_Type = (e)=>{  
    
    
    
    if(e.target.value == 1)
    {
      setHsubject(false)
      setHInstitute(true)
      setSubjectid(groupidd.Divisionid)      
    }
    else if(e.target.value == 2)
    {
      setSmdid(tempsmdid)
      setHInstitute(false)
      setHsubject(true)
      setSubjectid('')
    }
    else
    {
      setHInstitute(true)
      setHsubject(true)
      setSmdid('')
      setSubjectid('')
    }

   }


   const handleSubject = async (e) =>{     
    
    const id = e.target.value 
    
    if(e.target.value == '')
    {    
      setMstatus(true)
    }
    else 
    {             
          const user = await axios.get('/user-group-institute',{params:{id_1:id,id_2:auth}}) 
          setMstatus(false)        
          setInstitute(user.data.resp._id) 
          setImember(user.data.rsp)
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
            
            {groupidd.status === 1 ?
            <>
             <h3>
                Your Subject is : {user}
              </h3>           

            </>
            :  
            <>
                <h3>
                 Your SMD is : {smd.name}
                </h3>
            </>
          }
    
             
          </div>
        </div> 

         

{
  groupidd.status === 1?
  <>
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
      onChange={handleMemberForPrincipelSci}
      getOptionLabel={(option) => option.name}
      renderOption={(props, option, { selected }) => (
           
        <li {...props}>
          <Checkbox                        
            icon={icon}           
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
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




  </>
  :
  <>
  <div className='input-field'>    
    <select name="division" onChange={(e)=>Select_Type(e)} id="smd">
    <option value=''>--Select options--</option> 
    <option value='1'>Subject</option>                                                        
    <option value='2'>SMD</option>       
    </select>
</div>  

 {
  hsubject == false && 
  <>
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
      onChange={handleMemberForPrincipelSci}
      getOptionLabel={(option) => option.name}
      renderOption={(props, option, { selected }) => (
           
        <li {...props}>
          <Checkbox                        
            icon={icon}           
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
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
  </>

 }


{
  hinstitute == false && 

  <>
  
  <div className='input-field'>    
    <select name="division" onChange={(e)=>Select_Member(e)} id="smd">
    <option value=''>--Select Institute--</option> 
    <option value='1'>All SMD Institute</option>                                                        
    <option value='2'>Multiple Instituteember</option>
    <option value='3'>Specific Institute Member</option>   
    </select>
</div>   

  {  selectMember == 2 &&

  <div className='input-field'>
        <p>Select Institute</p>                           
        <Select        
      name='select'
      options={subject}
      labelField='name'
      valueField='name'                           
       multi                                                                                                                      
      onChange={value =>get_subject(value)                              
        }
      />
        </div> }

    {
       selectMember == 3 &&
        <>
          <div className='input-field'>
         <p>Select Institute</p>
         <select name="division" onChange={(e)=>handleSubject(e)} id="smd">
         <option value=''>--Select Institute--</option> 
         {
           subject.map((data)=>             
               <option value={data._id}>{data.name}</option>
           )
         }                                                      
        
         </select>
           </div>

           <div className='input-field'>     
      <Autocomplete
      hidden={mStatus}     
      multiple      
      id="checkboxes-tags-demo"      
      options={members}
      onChange={handleMember}
      disableCloseOnSelect
      getOptionLabel={(option) => option.name}
      renderOption={(props, option, { selected }) => (
           
        <li {...props}>
          <Checkbox                        
            icon={icon}           
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}           
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
    </div>

  </>

}
        </>
    }    

  
  </>

}



                   

        


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
    </div>
  )
}

export default Question

