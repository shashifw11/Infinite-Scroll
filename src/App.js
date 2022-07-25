import logo from './logo.svg';
import './App.css';
import  {useState , useEffect } from "react" ;
import axios from "axios" ; 

function App() {

  const [state , setState] = useState([]);
  const [page ,setPage] = useState(1);  

    console.log(page);


  useEffect(()=>{
    axios.get(`http://localhost:8080/data?_page=${page}&_limit=5`)
    .then((data)=>{
       return setState( data.data);
    })
  },[page]) 


  const scrollToEnd = ()=>{
      setTimeout(()=>{
        setPage(page+1) ; 
      },500)
  }

  window.onscroll = function(){
    const {scrollHeight , scrollTop , clientHeight} = document.documentElement ; 

    if( scrollTop + clientHeight >= scrollHeight){
           scrollToEnd() ; 
      }
  }
   
  return (
    <div className="App">
    
     {state.length>0 && state.map((el,i)=>{
      return <div className = "container" key = {i}>
          <h3>ID :{el.id}</h3>
          <h3>NAME : {el.title}</h3>
          <h3>Price : {el.price}</h3>
      </div>
     })}
    </div>
  );
}

export default App;
