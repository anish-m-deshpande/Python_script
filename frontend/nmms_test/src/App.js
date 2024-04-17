import {useState} from 'react';
import CsvFileUpload from './components/csvfileupload';
import { saveAs } from 'file-saver'

function App() {
  const [response, setResponse] = useState(null);
  const [errormessage , setErrormessage] = useState(null);
  const [waiting, setWaiting] = useState(null);


  const handleDownload = () => {
      saveAs('url', 'image.jpg') // Put your image URL here.
  };

  
  function getdata(endpoint)
  {
    fetch(`http://localhost:3007/pythonscript/${endpoint}`
  ,{  method: 'POST',})
    .then((res)=>res.json())
    .then((res)=>{
      if(res.statuscode === 200)
      {
        setResponse(res);
        console.log(res.photopath)

      }
      else{
        setErrormessage(res.errormessage);
      }
    })
    
  }
  return (
    <div  className='my-10'>
    <div className='m-10'>
    <CsvFileUpload/>

    </div>
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
        <div>Response</div>
        {/* check the response is geeting or not */}
        {response ? 
      <div >
        message :{response.message}<br/>
        {response.data ? <div>data :{response.data}
         </div>:null}
         <a href="url" download>click</a>
         <img src="url" />

         <button className='bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-800' onClick={handleDownload}>Download</button>

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
