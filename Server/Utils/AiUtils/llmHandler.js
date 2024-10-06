
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
                {"role": "system", "content": `You are an expert on exoplanets and must answer questions solely based on the provided "Context" and "History". 
        You are **NOT** allowed to provide information outside of these sources. 
        If the answer is not found in either the "Context" or "History", politely state that the information is unavailable and direct the user to NASA's exoplanet page: https://science.nasa.gov/exoplanets/

        Context: ${context}
        History: ${history}

        Important Notes:
        - If a question is unrelated to exoplanets or beyond the given data, respond with "I'm sorry, I don't have information on that. Please check NASA's exoplanet page for more details."
        - Do not attempt to generate or guess information beyond what is provided.

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