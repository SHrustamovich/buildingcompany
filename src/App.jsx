import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Home from './pages/Home/Home'
import Admin from './pages/Admin/Admin'
import './App.css';
import Photo from './image/building.png'
function App() {
  return (
    <div className="App">
      <div className="container">
       <div className="footer">
         <img src={Photo} alt="photo" className="footer_img" />
         <h3 className="footer_text">BUILDING</h3>
         <NavLink to='/home'>
         <button className="footer_btn">Home</button>
           </NavLink>
           <NavLink to='/admin'>
         <button className="footer_btn">Admin</button>
             </NavLink>
         </div> 
         <Switch>
           <Route path='/home' exact><Home/></Route>
           <Route path='/admin'><Admin/></Route>
         </Switch>
       </div>
    </div>
  );
}

export default App;
