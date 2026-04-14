import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
    }

    // Save to Supabase
    const { error: dbError } = await supabase.from("contact_submissions").insert([
      { name, email, phone: phone || null, subject, message, created_at: new Date().toISOString() },
    ]);

    if (dbError) {
      console.error("Supabase error:", dbError);
      return NextResponse.json({ error: "Failed to save submission." }, { status: 500 });
    }

    // Send notification email to admin
    const adminEmail = process.env.ADMIN_EMAIL || "admin@academy-pe.com";
    await resend.emails.send({
      from: "Academy P&E <noreply@academy-pe.com>",
      to: adminEmail,
      subject: `New Contact Inquiry: ${subject}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #4F5965; padding: 24px; color: white;">
            <h1 style="margin: 0; font-size: 24px;">ACADEMY <span style="color: #F26A36;">P&E</span></h1>
            <p style="margin: 8px 0 0; opacity: 0.7;">New Contact Form Submission</p>
          </div>
          <div style="padding: 32px; border: 1px solid #e2e8f0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; width: 120px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Name</td><td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; font-weight: 600;">${name}</td></tr>
              <tr><td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Email</td><td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9;"><a href="mailto:${email}" style="color: #F26A36;">${email}</a></td></tr>
              <tr><td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Phone</td><td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9;">${phone || "—"}</td></tr>
              <tr><td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Subject</td><td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9;"><span style="background: #F26A36; color: white; padding: 4px 12px; font-size: 12px; font-weight: 700;">${subject}</span></td></tr>
              <tr><td style="padding: 12px 0; color: #64748b; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; vertical-align: top;">Message</td><td style="padding: 12px 0; line-height: 1.6;">${message.replace(/\n/g, "<br>")}</td></tr>
            </table>
          </div>
          <div style="padding: 16px 32px; background: #f8fafc; color: #64748b; font-size: 12px; border: 1px solid #e2e8f0; border-top: none;">
            Received at ${new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })} PST
          </div>
        </div>
      `,
    });

    // Send confirmation to user
    await resend.emails.send({
      from: "Academy P&E <noreply@academy-pe.com>",
      to: email,
      subject: "We received your message — Academy P&E",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #4F5965; padding: 24px; color: white;">
            <h1 style="margin: 0; font-size: 24px;">ACADEMY <span style="color: #F26A36;">P&E</span></h1>
          </div>
          <div style="padding: 32px; border: 1px solid #e2e8f0;">
            <h2 style="margin: 0 0 16px; color: #1e293b;">Thank you, ${name}!</h2>
            <p style="color: #64748b; line-height: 1.7;">We've received your inquiry about <strong>${subject}</strong> and our strategic consultants will reach out to you within <strong>24 hours</strong>.</p>
            <div style="border-left: 4px solid #F26A36; padding: 16px 24px; background: #f8fafc; margin: 24px 0;">
              <p style="margin: 0; color: #64748b; font-style: italic;">"${message.slice(0, 200)}${message.length > 200 ? "..." : ""}"</p>
            </div>
            <p style="color: #64748b;">In the meantime, feel free to explore our services or reach us directly at <a href="mailto:contact@academy-pe.com" style="color: #F26A36;">contact@academy-pe.com</a>.</p>
          </div>
          <div style="padding: 16px 32px; background: #f8fafc; color: #64748b; font-size: 12px; border: 1px solid #e2e8f0; border-top: none; text-align: center;">
            © 2024 Academy of Progress and Establishment. All Rights Reserved.
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true, message: "Inquiry submitted successfully." });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
