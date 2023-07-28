import React, {useState, useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios'

import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const defaultTheme = createTheme();

export default function SignIn() {

    const [loading, setLoading] = useState(false);   
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    function validateEmail(email) {
      const reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
      if (reg.test(email) === false || !(email.split('@')[1] === 'icar.gov.in')) {
        return false;
      } else return true;
    }

    
  const handleSubmit = async (event) => {

    event.preventDefault();
    setLoading(true)
    if(!email || !password )
        {
          toast.error('Plese Fill the field')
            setLoading(false);
        }
    else if(!validateEmail(email))
    {
      toast.error('Email is not in Valid Formate')
      setLoading(false);
    }
    else
    {
      try{
        const resp = await axios.post('/SignAdmin', {
            email,
            password
        }).then((resp)=>{
                      //const UserName = [resp.data.userExist.email,resp.data.userExist.name]

           toast.success('you are the right person')       
            
        })
        }
        catch(err) {

            // setError(err.response.data.err)

            toast.error(err.response.data.err)

            setLoading(false);
        }
    }   




   
    
   
    // const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={email}
              autoComplete="email"
              autoFocus
              onChange={(e)=>{setEmail(e.target.value)}}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              autoComplete="current-password"
              onChange={(e)=>{setPassword(e.target.value)}}
            />          
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >  
            {loading ? "Logging in..." : "Login"}
            </Button>            
          </Box>
        </Box>       
      </Container>     
    </ThemeProvider>
    
  );
}