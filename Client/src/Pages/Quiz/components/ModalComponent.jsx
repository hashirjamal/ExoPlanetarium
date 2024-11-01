import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#2a2727',
  color:'white',
  borderRadius:"8px",
  boxShadow: 24,
  p: 4,

};

export default function ModalComponent({isUpdate,opener,setModalState,question}) {
  console.log("Hello",question)
  const [open, setOpen] = React.useState(opener);
  const handleOpen = () => setModalState(true);
  const handleClose = () => setModalState(false);

  const [questionState,setQuestionState]  = React.useState({
    ...question
  })

  const handleOptionChange = (value,index) =>{
    setQuestionState((p)=>{
      let obj = {...p};
      obj.options[index] = value;
      return obj;
    })
  }

  const handleUpdate = ()=>{
  
    let status=true;

    
    questionState.options.map((v)=>
    {if(v.trim()=="" || !v){
      status = false;
    }}
    )

    if(!status || questionState.question.trim()=="" || !questionState.correctOption){
      alert("Please feed all the required data");
      return;
    }

  //muneer ne api ka format nahi dia abhi tak
    console.log({...questionState})
  }


  const handleDelete = ()=>{

    //muneer ne api ka format nahi dia abhi tak
    console.log("Deleting ",questionState._id)
    handleClose()
  }

  const handleCorrectOptionChange = (v)=>{
    setQuestionState((p)=>{
      return {
        ...p,
        correctOption:v
      }
    })
  }


  return (
   
      
      <Modal
        open={opener}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {isUpdate?
          <div>

          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update Question
          </Typography>

{/* question box */}
          <div className="px-1 w-full sm:w-9/12 py-10">

         
          
        <nav className="flex items-centers">
          <p className="py-3 font-semibold">Q.</p>
          <input
            type="text "
            placeholder="Enter your Question here"
            className="p-2"
            value={questionState.question}
            onChange={(e)=>{
              setQuestionState(
                (p)=>{
                  return {
                    ...p,
                    question:e.target.value
                  }
                }
              )
            }}
            
          />
        </nav>

        <p className="font-light text-gray-400 pt-6">
          Note: Checkmark the option which is correct
        </p>

        <div className="flex flex-col gap-4 my-3 ">

            {
              questionState.options.map((v,i)=>{
                return   <nav className="flex w-full gap-6  items-center ">
                <input
                  type="radio"
                  name="ans"
                  id=""
                  className="w-1/12 h-6"
                  defaultChecked= {(v == questionState.correctOption)}
                  onChange={()=>handleCorrectOptionChange(v)}
                />
                <input
                  type="text"
                  className=" outline-white border-white"
                  placeholder="Option 1"
                  value={v}
                  onChange={(e)=>handleOptionChange(e.target.value,i)}
                />
              </nav>
              })
            }


       
       <div className='align-baseline'>

            <button
              className="py-2 px-4  rounded-lg mt-6 w-20 bg-gray-800 hover:bg-gray-700"
              onClick={handleUpdate}
              >
              Add
            </button>
            <button
              className="py-2 px-4  rounded-lg mt-6 w-20 ml-4 bg-gray-800 hover:bg-gray-700"
              onClick={handleClose}
              >
              Cancel
            </button>
              </div>
          
          </div>
          
        </div>
      </div>
    
        :
      <div>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        Are you sure you want to delete
          </Typography>
          <button className='bg-gray-800 rounded-lg px-3 py-2 mt-6 mx-2' onClick={handleDelete}>Yes</button>
          <button className='bg-gray-800 rounded-lg px-3 py-2 mt-6 mx-2' onClick={handleClose}>No</button>
        
      </div>
        }
        </Box>
      </Modal>

  );
}
