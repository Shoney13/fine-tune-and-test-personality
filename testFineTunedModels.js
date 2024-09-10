const fs = require("fs");
const OpenAI = require("openai");

const openai = new OpenAI();

// Array of questions to ask OpenAI
const questions = [
	"What is the name of the famous painting by Edvard Munch?",
	"What is the name of the country that is known for its rice?",
	"What is the name of the largest lake in the world?",
	"What is the name of the famous building in Sydney?",
	"What is the name of the animal that is known for its long tongue?",
	"What is the name of the famous painting by Claude Monet?",
	"What is the name of the country that is known for its chocolate?",
	"What is the name of the largest island in Asia?",
	"What is the name of the famous building in Barcelona?",
	"What is the name of the animal that is known for its long tail?",
];

const models = [
 {title:"Sarcastic", model: "ft:gpt-4o-mini-2024-07-18:sarcastic-marv",}, //TODO: Change the model here
 {title:"Rhyming", model: "ft:gpt-4o-mini-2024-07-18:rhyming-rhymie",}, //TODO: Change the model here
 {title:"Old", model: "ft:gpt-4o-mini-2024-07-18:old-willie",}, //TODO: Change the model here
]

// Function to write response to JSONL file
const writeResponseToFile = (filename = "", answers = []) => {
	const data = answers.map(
		([question, answer]) => `Q. ${question}\nA. ${answer}\n`
	);
	fs.writeFileSync(`${filename.toLocaleLowerCase()}_output.txt`, data.join("\n"), "utf8");
};

const askQuestions = async (model, filename) => {
	const answers = [];
	for (let question of questions) {
		try {
			const response = await openai.chat.completions.create({
				messages: [
					{
						role: "system",
						content: "You are a helpful chatbot",
					},
					{ role: "user", content: question },
				],
				model,
			});
			answers.push([question, response.choices[0].message.content]);
		} catch (error) {
			console.error("Failed for", question, error);
		}
	}
	writeResponseToFile(filename, answers);

	console.log("All questions have been processed.");
};

for (let model of models) {
	askQuestions(model.model, model.title);
}
