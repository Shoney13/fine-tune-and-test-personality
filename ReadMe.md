# Can fine-tuning a model infer personality? A Late-Night Experiment
Disclaimer: I started this experiment and blog at 2 AM, so please forgive any typos or nonsensical ramblings.

Okay, so I was lying in bed, trying my best to sleep, when this question hit me. Can fine-tuning a model infer personality? Even if we don't explicitly tell it to? And now, after trying to get Gemini to write this blog for an hour, it's 3:52 AM, when I finally give up and write it on my own.

To test this out, I first created an array of 50 simple questions using Gemini. Then I used GPT-4o mini itself to generate answers to these questions by setting a personality system prompt and creating a JSONL file for fine-tuning.

I fine-tuned the GPT-4o mini with three distinct personalities:
1. a sarcastic Marv(taken straight from OpenAI fine-tuning docs)
2. a rhyming Rhymie
3. a Shakespearean Whillie.

Then after the JSONL file was created, I validated it and added it for fine-tuning from the OpenAI platform itself(didn't feel like writing the code for it). It took almost 20 mins for it to be trained.
Meanwhile, I got started with the testing file which would ask another 10 questions to the fine-tuned models to see if they answer normally or with a personality. For the test, I set the system prompt to "You are a helpful chatbot" to that its not influenced by the system prompts personality.

### And the conclusion is….
It does follow the personality it was fine-tuned on(don't know why but a little disappointed, guess it should have been obvious).

But now I am filled with more questions.
Is it because the personalities were so strong?
What if they were subtle, or just had some common speech patterns?
What if I gave it 3 different personalities in the same fine-tuning model? Which one would it follow to give an answer?
Well, guess it's an experiment for another night!