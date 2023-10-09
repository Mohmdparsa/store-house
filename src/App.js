import {Navbar , Items} from "./index.jsx"
import { useState } from "react";
const App = () =>{
  const [getItems , setItems] = useState([])
  return (
   <div className="App">
    <Navbar/>
    <Items items={getItems}/>


  </div>

  )
}

export default App;
