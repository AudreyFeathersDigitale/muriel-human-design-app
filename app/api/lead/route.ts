import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const url = process.env.GOOGLE_SCRIPT_URL;

    if (!url) {
      return NextResponse.json(
        { success: false, error: "GOOGLE_SCRIPT_URL manquant" },
        { status: 500 }
      );
    }

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
    });

    const text = await response.text();

    return NextResponse.json({
      success: true,
      googleResponse: text,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}