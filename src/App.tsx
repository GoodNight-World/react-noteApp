import React from 'react';
import './App.css';
import { Outlet, Route, Routes } from 'react-router-dom';
import Nav from './components/Nav';
import Pages from './reducers/pageState/Pages';


const Layout = () => {
  return (
    <div className='layout'>
      <Nav />
      <Outlet />
    </div>
  )
}


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={ <Layout /> }>
          <Route index element={ <Pages /> } />
        </Route>
      </Routes>  
    </div>
  );
}

export default App;
