import './App.css';
import Navbar from './components/Navbar';
import {Link} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
import { AddItem, DisplayA, RemoveItem, UpdateItem, Search, DisplayC, DisplayL, Sort } from "./pages/directory";

function App() {
  return (
    <div className="App">
       <Link to="/">
         <h1>Inventory Management System</h1>
        </Link>
      <div className="header">
        <Navbar/>
        <Routes>
          <Route path="/add" element={<AddItem/>}/>
          <Route path="/update" element={<UpdateItem/>}/>
          <Route path="/remove" element={<RemoveItem/>}/>
          <Route path="/displayC" element={<DisplayC/>}/>
          <Route path="/displayA" element={<DisplayA/>}/>
          <Route path="/search" element={<Search/>}/>
          <Route path="/sort" element={<Sort/>}/>
          <Route path="/displayL" element={<DisplayL/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
