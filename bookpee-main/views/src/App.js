import './App.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link, NavLink, Outlet } from "react-router-dom";
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Header from './components/shared/header'
import Homepage from './components/homepage/homepage';
import NoPage from './components/nopage/nopage';
import SignIn from './components/signin/signin'
import axios from 'axios'
import SignUp from './components/signup/signup';
import ViewHistoryBook from './components/viewHistoryBook/viewHistoryBook'
import Order from './components/order/order';
import CreateBook from './components/CRUID_book/create_book'
import UpdateBook from './components/CRUID_book/update_book'
import ProviderBookDetail from './components/CRUID_book/provider_book_detail';
import CrudBook from './components/CRUID_book/crud_book'

function App() {
  return (
    <Routes>
      <Route path="/" element ={<Header/>}>
        <Route index element={<Homepage />} />
        <Route path='signin' element={<SignIn />} />
        <Route path='signup' element={<SignUp />} />
        <Route path='viewhistory' element={<ViewHistoryBook/>} />
        <Route path="*" element={<NoPage />} />
        <Route path='order' element={<Order />} />
        <Route path='createBook' element={<CreateBook/>}/>
        <Route path='updateBook/:bookId' element={<UpdateBook/>}/>
        <Route path='providerBookDetail/:bookId' element={<ProviderBookDetail />} />


        <Route path='crudBook' element={<CrudBook/>}/>
      </Route>
    </Routes>
  );
}

export default App;

