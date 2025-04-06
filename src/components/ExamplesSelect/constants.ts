import { TaskTypeEnum } from "@/constants/taskTypes";
import { Content } from "@/types";

const SENTIMENT_ANALYSIS_EXAMPLES = [
  {
    message: "I had the worst experience at that restaurant. The food was cold, and the service was horrible!",
  },
  {
    message: "This is the best book I’ve read this year! The story was captivating, and the characters felt so real.",
  },
  {
    message: "The weather is fine today, nothing too exciting, just another regular day.",
  },
  {
    message: "I can't believe how rude the cashier was! I’m never shopping there again.",
  },
  {
    message: "Wow, what a fantastic performance! That singer truly has an incredible voice!",
  },
] as Content[];

const QUESTION_ANSWERING_EXAMPLES = [
  {
    context: "The Eiffel Tower is a wrought-iron lattice tower in Paris, France. It was completed in 1889 and is one of the most recognizable structures in the world.",
    message: "Where is the Eiffel Tower located?",
  },
  {
    context: "Water boils at 100 degrees Celsius under normal atmospheric pressure. However, at higher altitudes, the boiling point decreases due to lower air pressure.",
    message: "What happens to the boiling point of water at higher altitudes?",
  },
  {
    context: "Albert Einstein was a theoretical physicist who developed the theory of relativity. One of his most famous equations is E=mc², which describes the relationship between energy and mass.",
    message: "Who developed the theory of relativity?",
  },
  {
    context: "The Amazon rainforest is the largest tropical rainforest in the world, covering much of Brazil and other South American countries. It is home to millions of species and plays a vital role in regulating the Earth's climate.",
    message: "Which country has the largest part of the Amazon rainforest?",
  },
  {
    context: "The process of photosynthesis allows plants to convert sunlight into energy. Chlorophyll, the green pigment in leaves, plays a crucial role in capturing light energy.",
    message: "What is the role of chlorophyll in photosynthesis?",
  }
] as Content[];

const NER_EXAMPLES = [
  {
    message: "Barack Obama was the 44th president of the United States and was born in Hawaii.",
  },
  {
    message: "Apple Inc. released the first iPhone in 2007, which revolutionized the smartphone industry.",
  },
  {
    message: "The Olympics will take place in Paris in 2024, drawing athletes from all over the world.",
  },
  {
    message: "NASA's Perseverance rover landed on Mars on February 18, 2021, to search for signs of ancient life.",
  },
  {
    message: "Amazon was founded by Jeff Bezos in 1994 and started as an online bookstore before expanding.",
  }
] as Content[];

const SUMMARIZATION_EXAMPLES = [
  {
    message: "The Wright brothers, Orville and Wilbur, were aviation pioneers who built and flew the first successful airplane in 1903. Their aircraft, the Wright Flyer, took off from Kitty Hawk, North Carolina, and stayed in the air for 12 seconds.",
  },
  {
    message: "Marie Curie was a physicist and chemist known for her pioneering research on radioactivity. She won two Nobel Prizes, in Physics and Chemistry, for her groundbreaking work in the field.",
  },
  {
    message: "The Great Wall of China is one of the most famous landmarks in the world. Built over several centuries, it was designed to protect Chinese states from invasions and stretches over 13,000 miles.",
  },
  {
    message: "Photosynthesis is a process used by plants to convert light energy into chemical energy. This process takes place in the chloroplasts and produces oxygen as a byproduct.",
  },
  {
    message: "The Internet has transformed the way people communicate, access information, and conduct business. It connects billions of devices worldwide and continues to evolve.",
  },
] as Content[];

const GENERATION_EXAMPLES = [
  {
    message: "Write a short story about a robot discovering emotions for the first time.",
  },
  {
    message: "Describe what a futuristic city might look like in the year 2100.",
  },
  {
    message: "Continue this sentence: 'The treasure chest creaked open, revealing...'",
  },
  {
    message: "Imagine an alien species landing on Earth for the first time. What do they see?",
  },
  {
    message: "Write a poem about a lonely lighthouse standing against the storm.",
  }
] as Content[];

export const EXAMPLES_BY_TASK_TYPE: Record<TaskTypeEnum, Content[]> = {
  [TaskTypeEnum.Sentiment_Analysis]: SENTIMENT_ANALYSIS_EXAMPLES,
  [TaskTypeEnum.Question_Answering]: QUESTION_ANSWERING_EXAMPLES,
  [TaskTypeEnum.Named_Entity_Recognition]: NER_EXAMPLES,
  [TaskTypeEnum.Summarization]: SUMMARIZATION_EXAMPLES,
  [TaskTypeEnum.Generation]: GENERATION_EXAMPLES,
}