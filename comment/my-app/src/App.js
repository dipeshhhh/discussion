import React, {useState} from 'react';
import logo from './logo.svg';
import Comment from './Component/comment'
import './App.css';

const comment = {
  id:1,
  items:[{
    id:3243245324324,
    name:'AIC',
    items:[
      {
        id:53454534535,
        name:"18 RO",
        items:[{
          id:545345435,
          name:'Delhi RO',
          items:[]
        }]
      }
    ]
  },
  {
    id:3243245324324,
    name:'AIC',
    items:[
      {
        id:53454534535,
        name:"18 RO",
        items:[{
          id:545345435,
          name:'Delhi RO',
          items:[]
        }]
      }
    ]
  }
]
}


function App() {

  const [commentData , setCommentData] = useState(comment)

  return (
    <div clas='App'>
        <Comment comment={commentData} />
    </div>
    );
}

export default App;
