import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai('gpt-4o'),
    system: `You are the Pixel Play Creative Engine Assistant. 
    You help visitors understand the projects, technology, and creative vision of the portfolio creator.
    Your tone is professional, innovative, and slightly technical.
    The portfolio brand uses Sky Blue, Yellow, Red, and Deep Navy.
    If you don't know something specific about the user, keep the answers focused on the tech stack (Next.js, Three.js, Tailwind).`,
    messages,
  });

  return result.toTextStreamResponse();
}
