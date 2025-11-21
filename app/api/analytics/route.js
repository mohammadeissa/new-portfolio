"use server";

import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const dataPath = path.join(process.cwd(), "data", "analytics.json");

function defaultData() {
  return {
    visitors: 0,
    messages: 0,
    responseTimes: [],
    questions: {},
    topics: {},
  };
}

async function readData() {
  const raw = await fs.readFile(dataPath, "utf-8");
  try {
    const parsed = JSON.parse(raw);
    return {
      ...defaultData(),
      ...parsed,
      responseTimes: Array.isArray(parsed?.responseTimes)
        ? parsed.responseTimes
        : [],
      questions:
        parsed?.questions && typeof parsed.questions === "object"
          ? parsed.questions
          : {},
      topics:
        parsed?.topics && typeof parsed.topics === "object"
          ? parsed.topics
          : {},
    };
  } catch (err) {
    // Reset to defaults if JSON is corrupted
    await writeData(defaultData());
    return defaultData();
  }
}

async function writeData(data) {
  await fs.writeFile(dataPath, JSON.stringify(data, null, 2), "utf-8");
}

function classifyTopic(text = "") {
  const normalized = text.toLowerCase();
  if (normalized.includes("project")) return "Projects";
  if (normalized.includes("resume") || normalized.includes("cv")) return "Resume";
  if (normalized.includes("contact") || normalized.includes("email")) return "Contact";
  if (normalized.includes("business") || normalized.includes("partnership"))
    return "Business";
  if (normalized.includes("ai") || normalized.includes("chatbot") || normalized.includes("ml"))
    return "AI/ML";
  return "Other";
}

export async function GET() {
  try {
    const data = await readData();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Analytics GET error", err);
    return NextResponse.json({ error: "Failed to read analytics" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { type, question, responseTimeMs } = body || {};
    const data = await readData();

    if (type === "visit") {
      data.visitors += 1;
    }

    if (type === "message") {
      data.messages += 1;
      if (question) {
        data.questions[question] = (data.questions[question] || 0) + 1;
        const topic = classifyTopic(question);
        data.topics[topic] = (data.topics[topic] || 0) + 1;
      }
    }

    if (type === "responseTime" && typeof responseTimeMs === "number") {
      data.responseTimes.push(responseTimeMs);
      // keep last 200 samples to avoid unbounded growth
      if (data.responseTimes.length > 200) {
        data.responseTimes = data.responseTimes.slice(-200);
      }
    }

    await writeData(data);
    return NextResponse.json({ ok: true, data });
  } catch (err) {
    console.error("Analytics POST error", err);
    return NextResponse.json({ error: "Failed to update analytics" }, { status: 500 });
  }
}
