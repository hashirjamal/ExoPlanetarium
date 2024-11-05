
const { Pinecone } = require('@pinecone-database/pinecone');
const {HfInference } = require("@huggingface/inference")

exports.getVectors = async (query) =>{
    const pc = new Pinecone({
        apiKey:process.env.PC_TOKEN
    })

    const index = pc.index("exoplanetarium")


    const hf = new HfInference(process.env.HF_TOKEN)

    const vecValues = await hf.featureExtraction({
        model:"sentence-transformers/all-MiniLM-L6-v2",
        inputs:query
    })


    const queryResponse = await index.namespace('nsac').query({
        vector: vecValues,
        topK: 3,
        includeValues: true,
        includeMetadata:true
    });

    

    return queryResponse.matches;
}