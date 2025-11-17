import { NextResponse } from "next/server";
import OpenAI from "openai";
import fs from "fs";
import path from "path";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


// Load all portfolio data dynamically
function loadPortfolio() {
  const about = fs.readFileSync(
    path.join(process.cwd(), "content/about.md"),
    "utf8"
  );

  const projects = JSON.parse(
    fs.readFileSync(
      path.join(process.cwd(), "content/projects.json"),
      "utf8"
    )
  );

  return { about, projects };
}

export async function POST(req) {
  const { messages } = await req.json();
  const portfolio = loadPortfolio();

  const systemPrompt = `
You are the AI assistant for Mohammad Eissa’s portfolio website.

ABOUT:
${portfolio.about}

PROJECTS:
${JSON.stringify(portfolio.projects, null, 2)}
`;

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages,
      ],
    });

    return NextResponse.json({
      reply: completion.choices[0].message,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
