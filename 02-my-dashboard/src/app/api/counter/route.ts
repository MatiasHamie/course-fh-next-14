import { NextResponse } from "next/server";

export async function GET(req: Request) {
  console.log({ method: req.method, url: req.url });
  return NextResponse.json({ count: 100 });
}

export async function POST(req: Request) {
  console.log({ method: req.method, url: req.url });
  return NextResponse.json({ method: "POST", count: 100 });
}
