import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  // Simple token-based auth for the admin dashboard
  const token = req.headers.get("x-admin-token");
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return NextResponse.json({ error: "Admin password not configured." }, { status: 500 });
  }

  if (token !== adminPassword) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase error:", error);
    return NextResponse.json({ error: "Failed to fetch submissions." }, { status: 500 });
  }

  return NextResponse.json({ submissions: data });
}
