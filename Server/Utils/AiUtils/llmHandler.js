
const axios = require("axios")

exports.createQuestion = async (userInp)=>{
    let llmRes;

    try{

        llmRes = await axios.post("https://openrouter.ai/api/v1/chat/completions",{
            model: "meta-llama/llama-3.1-8b-instruct:free",
            messages: [
      
                {"role": "user", "content": userInp},
                {"role": "system", "content": "Conver the user's content into a STAND ALONE QUESTION DONT SAY ANYTHING ELSE JUST RETURN THE STANDALONE QUESTION"},
      
    ],
},{headers:{
    "Authorization": `Bearer ${process.env.OR_TOKEN}`, 
    "Content-Type": "application/json"
}})
console.log(llmRes.data.choices)
return llmRes.data.choices[0].message.content;
}
catch(e){
    console.log(e)
    return e
}
}

exports.getFinalAns = async (context, history, actualQuestion)=>{
    let llmRes;

    try{

        llmRes = await axios.post("https://openrouter.ai/api/v1/chat/completions",{
            model: "meta-llama/llama-3.1-8b-instruct:free",
            messages: [
      
                {"role": "user", "content": actualQuestion},
                {"role": "system", "content": `You have to answer user's questions regarding Exoplanets.
                    Answer the given question based on the given Context (given below). If not found in context then try to find it in History(given below) otherwise gently say sorry and refer them to NASA's website about exoplanets with this link "https://science.nasa.gov/exoplanets/"
                  Context: ${context}
                  History: ${history}

                  Imp Instructions:
                  Dont mention about Context or History but do take them into account as mentioned above
                  If asked any thing out of the scope of context and history gently say that you dont know much about it and dont tell things about it as it is out of the scope of our domain
                  Be Precise and Humble with your answers
                  Format the answers properly

                    `},
      
    ],
},{headers:{
    "Authorization": `Bearer ${process.env.OR_TOKEN}`, 
    "Content-Type": "application/json"
}})
// console.log(llmRes.data.choices)
return llmRes.data.choices[0].message;
}
catch(e){
    return e
}
}