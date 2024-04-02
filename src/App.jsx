import React from 'react';
import './App.css';
import Body from './Components/Body';
import Header from './Components/Header';
import Footer from './Components/Footer';
import View from './Components/View';
import { Route, Routes } from 'react-router-dom';
import Add from './Components/Add';
import Edit from './Components/Edit';
import Auth from './Components/Auth';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Auth />} />
        <Route path='register' element={<Auth register />} />
        <Route path='body' element={<Body />} />
        <Route path='view/:id' element={<View />} />
        <Route path='edit/:id' element={<Edit />} />
        <Route path='add' element={<Add />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
