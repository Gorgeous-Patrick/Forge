import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PATCH /api/deliverables/:id - Update a deliverable (e.g., toggle completed)
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { title, completed, minutesEstimate } = body;

    const deliverable = await prisma.deliverable.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(completed !== undefined && { completed }),
        ...(minutesEstimate !== undefined && { minutesEstimate }),
      },
    });

    return NextResponse.json(deliverable);
  } catch (error) {
    console.error("Error updating deliverable:", error);
    return NextResponse.json(
      { error: "Failed to update deliverable" },
      { status: 500 }
    );
  }
}

// DELETE /api/deliverables/:id - Delete a deliverable
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.deliverable.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Deliverable deleted successfully" });
  } catch (error) {
    console.error("Error deleting deliverable:", error);
    return NextResponse.json(
      { error: "Failed to delete deliverable" },
      { status: 500 }
    );
  }
}
