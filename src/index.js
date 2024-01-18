import React from 'react';
import ReactDOM from 'react-dom/client';
import {RouterProvider,createBrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import Chatbot from './Chatbot';

const router=createBrowserRouter([
  {
    path:'/',
    children: [
      {
        path:"",
        element:<App/>
      },
      {
        path:"/chatbot",
        element: <Chatbot/>
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);


