import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required." }, { status: 400 });
    }

    // Upsert to avoid duplicates
    const { error: dbError } = await supabase.from("newsletter_subscribers").upsert(
      [{ email, subscribed_at: new Date().toISOString() }],
      { onConflict: "email" }
    );

    if (dbError) {
      console.error("Supabase error:", dbError);
      return NextResponse.json({ error: "Failed to subscribe." }, { status: 500 });
    }

    // Welcome email
    await resend.emails.send({
      from: "Academy P&E <noreply@academy-pe.com>",
      to: email,
      subject: "Welcome to Academy P&E Insights",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #4F5965; padding: 24px; color: white;">
            <h1 style="margin: 0; font-size: 24px;">ACADEMY <span style="color: #F26A36;">P&E</span></h1>
          </div>
          <div style="padding: 32px; border: 1px solid #e2e8f0;">
            <h2 style="margin: 0 0 16px; color: #1e293b;">You're now on the list!</h2>
            <p style="color: #64748b; line-height: 1.7;">You'll be the first to receive our latest insights on digital transformation, AI trends, and enterprise strategy.</p>
          </div>
          <div style="padding: 16px 32px; background: #f8fafc; color: #64748b; font-size: 12px; border: 1px solid #e2e8f0; border-top: none; text-align: center;">
            © 2024 Academy of Progress and Establishment. All Rights Reserved.
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Newsletter API error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
