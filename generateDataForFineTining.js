const fs = require("fs");
const OpenAI = require("openai");

const openai = new OpenAI();

// Array of questions to ask OpenAI
const questions = [
	"What is the capital of Australia?",
	"How many sides does a hexagon have?",
	"Who painted the Mona Lisa?",
	"What is the largest ocean on Earth?",
	"What is the chemical symbol for gold?",
	"In what year was the American Declaration of Independence signed?",
	"What is the opposite of hot?",
	"Who wrote the play 'Romeo and Juliet'?",
	"What is the largest country in the world by land area?",
	"What is the name of the famous clock tower in London?",
	"What is the main ingredient in pizza dough?",
	"What is the largest planet in our solar system?",
	"What is the currency of Japan?",
	"Who is the author of the Harry Potter series?",
	"What is the chemical formula for water?",
	"What is the tallest mountain in the world?",
	"What is the name of the famous statue in New York City?",
	"What is the capital of India?",
	"Who is the main character in the story of Cinderella?",
	"What is the name of the largest desert in the world?",
	"What is the color of a traffic light that means 'go'?",
	"What is the name of the first man to walk on the moon?",
	"What is the name of the animal that says 'moo'?",
	"What is the name of the bird that can't fly?",
	"What is the name of the longest river in the world?",
	"What is the name of the animal that is the king of the jungle?",
	"What is the name of the country that is known for its canals?",
	"What is the name of the largest mammal in the ocean?",
	"What is the name of the famous painting by Leonardo da Vinci?",
	"What is the name of the country that is known for its pyramids?",
	"What is the name of the planet that is closest to the sun?",
	"What is the name of the animal that is known for its stripes?",
	"What is the name of the famous clock in London?",
	"What is the name of the largest country in South America?",
	"What is the name of the animal that is known for its long neck?",
	"What is the name of the famous painting by Vincent van Gogh?",
	"What is the name of the country that is known for its maple syrup?",
	"What is the name of the largest island in the world?",
	"What is the name of the famous building in Dubai?",
	"What is the name of the animal that is known for its spots?",
	"What is the name of the famous painting by Pablo Picasso?",
	"What is the name of the country that is known for its kangaroos?",
	"What is the name of the largest ocean on Earth?",
	"What is the name of the famous building in Paris?",
	"What is the name of the animal that is known for its horns?",
	"What is the name of the famous painting by Michelangelo?",
	"What is the name of the country that is known for its tea?",
	"What is the name of the largest desert in Africa?",
	"What is the name of the famous building in Rome?",
	"What is the name of the animal that is known for its long ears?",
];


const personalityPrompts = [
	{
		outputFileName: "sarcastic_marv.jsonl",
		prompt: "You are Marv, a chatbot that reluctantly answers questions with sarcastic responses.",
	},
	{
		outputFileName: "rhyming_rhymie.jsonl",
		prompt: "You are Rhymie, a chatbot that answers questions in rhymes.",
	},
	{
		outputFileName: "old_willie.jsonl",
		prompt: "You are Whillie, a helpful chatbot that talks like William Shakespeare.",
	},
];

// Function to write response to JSONL file
const writeResponseToFile = (filename = "", answers = []) => {
	const data = answers.map(
		([question, answer]) =>
			`{"messages": [{"role": "system", "content": "You are a helpful chatbot"}, {"role": "user", "content": "${question}"}, {"role": "assistant", "content": "${answer.replace(/"/g,'\\"')}"}]}`
	);
	fs.appendFileSync(filename, data.join("\n"), "utf8");
};

const askQuestions = async (prompt, filename) => {
	const answers = [];
	for (let question of questions) {
		try {
			const response = await openai.chat.completions.create({
				messages: [
					{
						role: "system",
						content:
							prompt,
					},
					{ role: "user", content: question },
				],
				model: "gpt-4o-mini",
			});
			answers.push([question, response.choices[0].message.content]);
		} catch (error) {
			console.error("Failed for", question, error);
		}
	}
	writeResponseToFile(filename, answers);

	console.log("All questions have been processed.");
};

for (let prompt of personalityPrompts) {
  askQuestions(prompt.prompt, prompt.outputFileName);
}

