import React from 'react'
import Chatbot from './Chatbot'
import ChatbotCanvas from './ChatbotCanvas';

export default function ChatbotPage() {
  return (
    <div className="overflow-hidden h-screen bg-transparent text-white flex justify-center align-middle">
      <div className='absolute -z-10 w-full min-h-screen'>

       <ChatbotCanvas />
      </div>
        <Chatbot />
    </div>
  )
}
