import React, { useState } from 'react'

export default function AddQnA() {

    const [question,setQuestion] = useState("");
    const [options, setOptions] = useState({
    option1:"",
    option2:"",
    option3:"",
    option4:""
    })

    const [selectedIndex,setSelectedIndex] = useState(null)

    const handleOptionChange = (optionNo, value)=>{
        setOptions(p=>{
            let obj = {
                ...p,
            }
            obj[optionNo]=value;
            return obj;
        })
    }


    const handleClear = ()=>{
        setQuestion("");
        setOptions({
            option1:"",
            option2:"",
            option3:"",
            option4:""
        })
        setSelectedIndex(null);
    }

    const handleSubmit = ()=>{
        let obj ={
            question,
            ...options,
            correctIndex: selectedIndex
        }
        console.log(obj)
    }

  return (
    <div className='bg-[#0c0b0b] min-h-[91vh]  text-white flex flex-col 
    items-center '>
        {/* question box */}
        <h2 className=' text-4xl text-center mt-6'>Add Questions for quiz</h2>
        <div className='px-6 w-full sm:w-9/12 py-10'>
        
        <nav className='flex items-centers'>
<p className='py-3 font-semibold'>Q.</p>
        <input type="text "placeholder='Enter your Question here' className='p-2' value={question} onChange={(e)=>setQuestion(e.target.value)}/>
        </nav>

        <p className='font-light text-gray-400 pt-6'>Note: Checkmark the option which is correct</p>

        <div className='flex flex-wrap my-3'>

        <nav className='flex w-1/2 gap-6  items-center '>

        <input type="radio" name="ans" id="" className='w-1/12 h-6' onChange={()=>setSelectedIndex(0)}/>
        <input type="text" className='w-1/2 outline-white border-white' placeholder='Option 1'  value={options.option1} onChange={(e)=>handleOptionChange("option1",e.target.value)}/>
        </nav>
        
        <nav className='flex w-1/2 gap-6  items-center'>

        <input type="radio" name="ans" id="" className='w-1/12 h-6' onChange={()=>setSelectedIndex(1)} />
        <input type="text" className='w-1/2  outline-white border-white' placeholder='Option 2' 
        value={options.option2} onChange={(e)=>handleOptionChange("option2",e.target.value)}
        />
        </nav>
        </div>
        
        <div className='flex flex-wrap'>

        <nav className='flex w-1/2 gap-6  items-center '>
        <input type="radio" name="ans" id="" className='w-1/12 h-6' onChange={()=>setSelectedIndex(2)} />
        <input type="text" className='w-1/2  outline-white border-white' placeholder='Option 3' 
        value={options.option3} onChange={(e)=>handleOptionChange("option3",e.target.value)}
        />
        </nav>
        
        <nav className='flex w-1/2 gap-6  items-center'>
        <input type="radio" name="ans"  id="" className='w-1/12 h-6' onChange={()=>setSelectedIndex(3)} />
        <input type="text" className='w-1/2  outline-white border-white' placeholder='Option 4' value={options.option4} onChange={(e)=>handleOptionChange("option4",e.target.value)}/>
        </nav>

<div className='my-8'>

        <button className='py-2 px-4  rounded-lg mt-6 w-20 bg-gray-800' onClick={handleSubmit}>Add</button>
        <button className='py-2 px-4  rounded-lg mt-6 w-20 ml-4 bg-gray-800' onClick={handleClear}>Clear</button>
</div>

        </div>
        
       
        
       
        </div>
    </div>
  )
}
