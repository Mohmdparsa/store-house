import {Navbar , Items} from "./index.jsx"
import { useState } from "react";
const App = () =>{
    const [getItems , setItems] = useState([])
    const [loading , setLoading] = useState(false)
  return (
   <div className="App">
    <Navbar/>
    <Items getItems={getItems} loading={loading}/>


  </div>

  )
}

export default App;
