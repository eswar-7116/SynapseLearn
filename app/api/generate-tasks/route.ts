import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/drizzle';
import { tasks } from '@/db/schema';
import { getAuth } from '@clerk/nextjs/server';
import { eq, and } from 'drizzle-orm';

const GeminiSchema = z.object({
  topic: z.string().min(1),
});

export async function POST(req: NextRequest) {
  try {
    const { userId } = getAuth(req);
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const parsed = GeminiSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const { topic } = parsed.data;
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

    const prompt = `You are an AI tutor helping users learn by doing.
Given a topic, generate exactly 5 short, actionable tasks for a beginner to learn the topic.
Return the result as a JSON array of objects with a "title" field only.

Example:
[
  { "title": "Install Python and set up your environment" },
  { "title": "Learn about variables and data types" },
  ...
]

Topic: Learn ${topic}

Only return valid JSON. No explanations. No formatting.`;

    const geminiRes = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json"
        }
      }),
    });

    if (!geminiRes.ok) {
      const err = await geminiRes.text();
      console.error('Gemini API failed:', err);
      return NextResponse.json({ error: 'Failed to fetch from Gemini API' }, { status: 500 });
    }

    const geminiData = await geminiRes.json();
    const rawText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) {
      return NextResponse.json({ error: 'No content returned from Gemini' }, { status: 500 });
    }

    let generatedTasks: { title: string }[] = [];
    try {
      generatedTasks = JSON.parse(rawText);
    } catch (err) {
      console.error('JSON Parse Error:', err);
      return NextResponse.json({ error: 'Invalid JSON format from Gemini' }, { status: 500 });
    }

    // Overwrite: delete all existing tasks for this topic and user
    await db.delete(tasks).where(and(eq(tasks.userId, userId), eq(tasks.topic, topic)));

    const now = new Date();
    const toInsert = generatedTasks.map((task) => ({
      userId,
      title: task.title,
      topic,
      completed: false,
      createdAt: now,
    }));

    const inserted = await db.insert(tasks).values(toInsert).returning();
    return NextResponse.json(inserted, { status: 201 });

  } catch (err) {
    console.error('Server Error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
