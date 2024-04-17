import './App.css';
import {useState} from 'react';

function App() {
  const [response, setResponse] = useState(null);
  const [errormessage , setErrormessage] = useState(null);
  const [waiting, setWaiting] = useState(null);

  function getdata(endpoint)
  {
    fetch(`http://localhost:3007/pythonscript/${endpoint}`)
    .then((res)=>res.json())
    .then((res)=>{
      if(res.statuscode === 200)
      {
        setResponse(res);

      }
      else{
        setErrormessage(res.errormessage);
      }
    })
  }
  return (
    <div  className='my-10'>
      <div className='flex justify-evenly'>
    
      <button className='bg-green-600 text-white p-3 rounded-lg hover:bg-green-800'  onClick={()=>{getdata("average-height");setWaiting(false);}}>average-height</button>
      <button className='bg-green-600 text-white p-3 rounded-lg hover:bg-green-800' onClick={()=>{getdata("average-width");setWaiting(false);}}>average-width</button>
      <button className='bg-green-600 text-white p-3 rounded-lg hover:bg-green-800' onClick={()=>{getdata("distribution-map");setWaiting(false);}}>distribution-map</button>
      <button className='bg-green-600 text-white p-3 rounded-lg hover:bg-green-800' onClick={()=>{getdata("heatmap-carbonseq");setWaiting(false);}}>heatmap-carbonseq</button>
      <button className='bg-green-600 text-white p-3 rounded-lg hover:bg-green-800' onClick={()=>{getdata("pie-diversity");setWaiting(false);}}>pie-diversity</button>
      <button className='bg-green-600 text-white p-3 rounded-lg hover:bg-green-800' onClick={()=>{getdata("infographic");setWaiting(false);}}>infographic</button>
      <button className='bg-green-600 text-white p-3 rounded-lg hover:bg-green-800' onClick={()=>{getdata("merged-script");setWaiting(false);}}>merged-script</button>
      </div>

      <div className='border border-black p-3 mx-10 my-10'>
        {response ? 
      <div >
        message :{response.message}<br/>
        {response.data ? <div>data :{response.data}</div>:null}
        </div>:null  
      }
      {waiting===false  ? !response ? <div>waiting for the response </div>:null :null}


      {errormessage ? 
      <div className='text-red-500'>
        message :{errormessage}
        </div>:null  
      }
      

      </div>
    </div>
  );
}

export default App;
