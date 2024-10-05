import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import QuizPage from './Pages/Quiz/QuizPage.jsx';
import ChatbotPage from './Pages/Quiz/Chatbot/ChatbotPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: '/exoplanet-quiz',
        element: <QuizPage />,
      },
      {
        path: '/chatbot',
        element: <ChatbotPage />,
      }
    ]
  },
  
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
