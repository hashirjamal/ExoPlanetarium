const asyncErrorHandler = require("../Utils/asyncErrorHandler");
const llmHandler = require("../Utils/AiUtils/llmHandler");
const { getVectors } = require("../Utils/AiUtils/pcQuery");

exports.handlePrompt = asyncErrorHandler(async (req, res, next) => {
    const { userInp } = req.body;
    const { convHistory } = req.body;

    const standaloneQues = await llmHandler.createQuestion(
        userInp,
        convHistory
    );
    console.log("Standalone:", standaloneQues);

    const similarVecs = await getVectors(standaloneQues);

    console.log("Retrieved information: ", similarVecs);

    let nearestMatches = similarVecs.map((v, i) => {
        return v.metadata.text;
    });

    nearestMatches = nearestMatches.join("\n");

    let history = convHistory.join("\n");

    const result = await llmHandler.getFinalAns(
        nearestMatches,
        history,
        userInp
    );

    console.log(result);
    res.status(200).send({
        status: "Success",
        message: "Response Fetched Successfully",
        data: result,
    });
});