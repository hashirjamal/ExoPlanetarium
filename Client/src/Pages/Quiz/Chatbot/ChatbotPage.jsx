import React from 'react'
import styles from "./Chatbot.module.css"
import Chatbot from './Chatbot'

export default function ChatbotPage() {
  return (
    <div className="overflow-hidden h-screen bg-gray-800 text-white flex justify-center align-middle">
        <Chatbot />
    </div>
  )
}
