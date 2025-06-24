import { db } from '@/lib/drizzle';
import { tasks } from '@/db/schema';
import { getAuth } from '@clerk/nextjs/server';
import { z } from 'zod';
import { NextResponse, NextRequest } from 'next/server';
import { eq } from 'drizzle-orm';

const TaskSchema = z.object({
  title: z.string().min(1),
  topic: z.string().min(1),
  completed: z.boolean().optional(),
});

export async function POST(req: NextRequest) {
  const { userId } = getAuth(req);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const parsed = TaskSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const { title, topic, completed = false } = parsed.data;
  const [task] = await db.insert(tasks).values({
    userId,
    title,
    topic,
    completed,
  }).returning();
  return NextResponse.json(task);
}

export async function GET(req: NextRequest) {
  const { userId } = getAuth(req);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const userTasks = await db.select().from(tasks).where(eq(tasks.userId, userId));
  return NextResponse.json(userTasks);
} 