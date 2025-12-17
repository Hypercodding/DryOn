import connectDB from "@/lib/mongodb";
import ContactInquiry from "@/models/ContactInquiry";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        await connectDB();
        const body = await req.json();
        const { name, email, phone, subject, message } = body;

        // Validation
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Name, email, and message are required" },
                { status: 400 }
            );
        }

        // Combine subject and message for storage (since ContactInquiry model doesn't have subject field)
        const fullMessage = subject 
            ? `Subject: ${subject}\n\n${message}`
            : message;

        // Save to database
        const inquiry = await ContactInquiry.create({
            name,
            email,
            phone: phone || undefined,
            message: fullMessage,
            status: "new",
        });

        // Send email notifications to company emails
        const emailSubject = subject || "New Contact Form Submission";
        const recipientEmails = [
            "hammad@visionnexera.com"
        ];

        const emailHtml = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
                    .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
                    .field { margin-bottom: 15px; }
                    .label { font-weight: bold; color: #667eea; }
                    .value { margin-top: 5px; padding: 10px; background: white; border-radius: 4px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h2>New Contact Form Submission</h2>
                    </div>
                    <div class="content">
                        <div class="field">
                            <div class="label">Name:</div>
                            <div class="value">${name}</div>
                        </div>
                        <div class="field">
                            <div class="label">Email:</div>
                            <div class="value">${email}</div>
                        </div>
                        ${phone ? `
                        <div class="field">
                            <div class="label">Phone:</div>
                            <div class="value">${phone}</div>
                        </div>
                        ` : ''}
                        ${subject ? `
                        <div class="field">
                            <div class="label">Subject:</div>
                            <div class="value">${subject}</div>
                        </div>
                        ` : ''}
                        <div class="field">
                            <div class="label">Message:</div>
                            <div class="value">${message.replace(/\n/g, '<br>')}</div>
                        </div>
                    </div>
                </div>
            </body>
            </html>
        `;

        const emailText = `
New Contact Form Submission

Name: ${name}
Email: ${email}
${phone ? `Phone: ${phone}` : ''}
${subject ? `Subject: ${subject}` : ''}

Message:
${message}
        `;

        // Send notification emails to company
        try {
            await resend.emails.send({
                from: "DryON Pakistan <onboarding@resend.dev>", // Update this with your verified domain
                to: recipientEmails,
                subject: `[Contact Form] ${emailSubject}`,
                html: emailHtml,
                text: emailText,
            });
        } catch (emailError) {
            console.error("Failed to send notification email:", emailError);
            // Don't fail the request if email fails, just log it
        }

        // Send confirmation email to the user
        try {
            await resend.emails.send({
                from: "DryON Pakistan <onboarding@resend.dev>", // Update this with your verified domain
                to: email,
                subject: "Thank you for contacting DryON Pakistan",
                html: `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <meta charset="utf-8">
                        <style>
                            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
                            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="header">
                                <h2>Thank You for Contacting Us!</h2>
                            </div>
                            <div class="content">
                                <p>Dear ${name},</p>
                                <p>Thank you for reaching out to DryON Pakistan. We have received your message and will get back to you within 24 hours.</p>
                                <p>Your inquiry is important to us, and we appreciate your interest in our moisture control solutions.</p>
                                <p>Best regards,<br>The DryON Pakistan Team</p>
                            </div>
                        </div>
                    </body>
                    </html>
                `,
                text: `Dear ${name},\n\nThank you for reaching out to DryON Pakistan. We have received your message and will get back to you within 24 hours.\n\nYour inquiry is important to us, and we appreciate your interest in our moisture control solutions.\n\nBest regards,\nThe DryON Pakistan Team`,
            });
        } catch (emailError) {
            console.error("Failed to send confirmation email:", emailError);
            // Don't fail the request if email fails, just log it
        }

        return NextResponse.json(
            { 
                success: true, 
                message: "Your message has been sent successfully. We'll get back to you soon!",
                id: inquiry._id.toString() 
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Contact form error:", error);
        return NextResponse.json(
            { error: "Failed to send message. Please try again later." },
            { status: 500 }
        );
    }
}

