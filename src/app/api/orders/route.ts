import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import connectToDatabase from '@/lib/db';
import Order from '@/models/Order';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const orders = await Order.find({ user: session.user.id })
      .sort({ createdAt: -1 })
      .limit(5); // Get their 5 most recent orders

    return NextResponse.json({ orders });
  } catch (error: any) {
    console.error("User orders fetching error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
