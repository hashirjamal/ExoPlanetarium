import React from 'react'
import Chatbot from './Chatbot'
import ChatbotCanvas from './ChatbotCanvas';
import { ToastContainer } from 'react-toastify';

export default function ChatbotPage() {
  return (
    <div className="overflow-scroll h-screen bg-transparent text-white flex justify-center align-middle">
      <ToastContainer theme="dark" />
      <div className='absolute -z-10 w-full min-h-screen'>

       <ChatbotCanvas />
      </div>
        <Chatbot />
    </div>
  )
}
