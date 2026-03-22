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

    const url = new URL(req.url);
    const limitParam = url.searchParams.get('limit');
    let query = Order.find({ user: session.user.id }).sort({ createdAt: -1 });
    
    if (limitParam) {
        query = query.limit(parseInt(limitParam, 10));
    }

    const orders = await query;

    return NextResponse.json({ orders });
  } catch (error: any) {
    console.error("User orders fetching error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
