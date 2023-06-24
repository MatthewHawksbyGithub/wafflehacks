import { Configuration, OpenAIApi } from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";


const configuration =  new Configuration({
  organization: "org-mtnx3paq9vdUscGbK1znT4p4",
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

const app = express();
const port = 3000;

app.use(bodyParser.json())
app.use(cors())

app.post("/", async (req, res) => {

  const { message } = req.body;

  //Messages can be collected here in an array to create a history if needed.

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user", content:  `Please respond using simple but correct language. If I ask you a question, answer it in simple language. If I give you text, simplify it. If I ask you to explain something, respond in simple language.  ${message}`},
    ]
  })

  res.json({
    completion: completion.data.choices[0].message
  })

});

app.listen(port, () => (
  console.log(`example app listening at port https://localhost:${ port }`)
  ));





/*
function showText() {
    var textBoxValue = ReadAbilityAI.getElementById("myTextBox").value;
    var displayBox = ReadAbilityAI.getElementById("displayText");
    displayBox.innerHTML = textBoxValue;
  }
*/