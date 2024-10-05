import React from 'react'
import { Suspense } from "react";
import styles from "./Chatbot.module.css"
import Chatbot from './Chatbot'

import { Canvas } from "@react-three/fiber";
import Three from "../../../components/Three";

import ChatbotCanvas from './ChatbotCanvas';

export default function ChatbotPage() {
  return (
    <div className="overflow-hidden h-screen bg-transparent text-white flex justify-center align-middle">
        {/* <Canvas
      
        id="cn"
        style={{ width: "100%", height: "100vh" }} // Ensure canvas takes full width and height
        camera={{ fov: 45, near: 0.1, far: 1000, position: [0, 0, 5] }}
      >
        <Suspense fallback={null}>
          <Three  />
        </Suspense>
      </Canvas> */}
      <div className='absolute -z-10 w-full min-h-screen'>

       <ChatbotCanvas />
      </div>
        <Chatbot />
    </div>
  )
}
