import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { isLocale, localeCookieName } from "@/lib/locales";

export async function POST(request: Request) {
  let body: { locale?: unknown };

  try {
    body = (await request.json()) as { locale?: unknown };
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  if (typeof body.locale !== "string" || !isLocale(body.locale)) {
    return NextResponse.json({ message: "Unsupported locale." }, { status: 400 });
  }

  const cookieStore = await cookies();
  cookieStore.set(localeCookieName, body.locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });

  return NextResponse.json({ locale: body.locale });
}
