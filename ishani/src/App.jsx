import React from 'react';
import{
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import Home from './Pages/Home/Home'; 
import Contact from './Pages/Contact/Contact';
import About from './Pages/About/About';
import Product from './Pages/Products/Product';
import Gallery from './Pages/Gallery/Gallery';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Layout from './Layouts/Layout';
function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout/>}>
      <Route index element ={<Home/>}/>
      <Route path='/About' element ={<About/>}/>
      <Route path='Contact' element ={<Contact/>}/>
      <Route path='/Gallery' element ={<Gallery/>}/>
      <Route path='/Product' element ={<Product/>}/>

    </Route>

  ))
  
    
  return <RouterProvider router={router}/>
}

export default App