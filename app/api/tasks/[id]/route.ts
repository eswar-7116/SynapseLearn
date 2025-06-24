import { db } from '@/lib/drizzle';
import { tasks } from '@/db/schema';
import { getAuth } from '@clerk/nextjs/server';
import { z } from 'zod';
import { NextResponse, NextRequest } from 'next/server';
import { eq, and } from 'drizzle-orm';

const TaskUpdateSchema = z.object({
  title: z.string().min(1).optional(),
  topic: z.string().min(1).optional(),
  completed: z.boolean().optional(),
});

const EditTaskSchema = z.object({
  title: z.string().min(1),
});

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { userId } = getAuth(req);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = params;
  const body = await req.json();
  const parsed = EditTaskSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const [updated] = await db.update(tasks)
    .set({ title: parsed.data.title })
    .where(and(eq(tasks.id, id), eq(tasks.userId, userId)))
    .returning();
  if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(updated);
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { userId } = getAuth(req);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = params;
  const body = await req.json();
  if (typeof body.completed !== 'boolean') {
    return NextResponse.json({ error: 'Missing or invalid completed value' }, { status: 400 });
  }
  const [updated] = await db.update(tasks)
    .set({ completed: body.completed })
    .where(and(eq(tasks.id, id), eq(tasks.userId, userId)))
    .returning();
  if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { userId } = getAuth(req);
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = params;
  const [deleted] = await db.delete(tasks)
    .where(and(eq(tasks.id, id), eq(tasks.userId, userId)))
    .returning();
  if (!deleted) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(deleted);
} 