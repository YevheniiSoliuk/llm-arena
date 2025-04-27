import { useState } from "react";
import { useTour } from "@reactour/tour";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

export const Guide = () => {
  const { setIsOpen } = useTour();

  const [accordionValue, setAccordionValue] = useState('');

  const handleQuickTour = () => {
    setAccordionValue('');
    setTimeout(() => {
      setIsOpen(true);
    }, 400);
  }

  return (
    <div className="mb-5">
      <Accordion type="single" collapsible value={accordionValue} onValueChange={setAccordionValue}>
        <AccordionItem value="item-1">
          <AccordionTrigger>💡 How It Works</AccordionTrigger>
          <AccordionContent className="text-start">
            <p><strong>Authorization:</strong> Sign up/Sign in to be able to fairly compare models.</p>
            <p><strong>Blind Test:</strong> Choose a task (sentiment analysis, Q&A, summarization etc.) and test the model on it.</p>
            <p><strong>Vote for the Best:</strong> Choose the best response. You can keep chatting until you find a winner.</p>
            <p><strong>Play Fair:</strong> If AI identity reveals, your vote won't count.</p>
            <div className="flex items-center w-full">
              <button className="ml-auto text-[16px] hover:text-white transition-colors" onClick={handleQuickTour}>Quick tour</button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion className="mt-2" type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>📃 Model Tasks</AccordionTrigger>
          <AccordionContent className="text-start">
            <p><strong>Sentiment Analysis:</strong> Detects the emotional tone of a text (like positive, negative, or neutral). Best used to quickly understand feelings in reviews, comments, or messages.</p>
            <p><strong>Question Answering:</strong> Finds the answer to a question based on a given context or passage. Ask a clear question related to the provided text for the best results.</p>
            <p><strong>Named Entity Recognition:</strong> Identifies and labels important elements in text, like names of people, organizations, dates, and places. Ideal for extracting key information from documents.</p>
            <p><strong>Summarization:</strong> Shortens a longer text while keeping its main ideas. Provide full paragraphs or articles to get a clear, concise summary.</p>
            <p><strong>Text Generation:</strong> Creates new text based on a given prompt. The more detailed and specific your prompt, the better and more relevant the output will be.</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
};
