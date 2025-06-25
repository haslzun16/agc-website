import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

const resend = new Resend(process.env.RESEND_API_KEY)

// Form validation schemas
const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number is required'),
  subject: z.string().optional(),
  message: z.string().min(1, 'Message is required'),
  service: z.string().optional(),
  formType: z.enum(['quote', 'estimate', 'contact']),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = contactSchema.parse(body)

    const { name, email, phone, subject, message, service, formType } = validatedData

    // Determine email subject based on form type
    let emailSubject = ''
    switch (formType) {
      case 'quote':
        emailSubject = 'New Quote Request - AGC Home Renovation'
        break
      case 'estimate':
        emailSubject = 'New Free Estimate Request - AGC Home Renovation'
        break
      case 'contact':
        emailSubject = subject || 'New Contact Form Submission - AGC Home Renovation'
        break
    }

    // Create email content
   
const createInternalEmailContent =  `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New ${formType.charAt(0).toUpperCase() + formType.slice(1)} Request - AGC Home Renovation</title>
  </head>
  <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
      <div style="max-width: 700px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #6B8E5A 0%, #5A7A4A 100%); color: white; padding: 25px 30px;">
              <div style="display: flex; align-items: center; justify-content: space-between;">
                  <div>
                      <h1 style="margin: 0; font-size: 20px; font-weight: 500;">New ${formType.charAt(0).toUpperCase() + formType.slice(1)} Request</h1>
                      <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.9;">AGC Home Renovation</p>
                  </div>
              </div>
          </div>

          <!-- Main Content -->
          <div style="padding: 30px;">
              
              <!-- Customer Information -->
              <div style="margin-bottom: 25px;">
                  <h3 style="color: #2c3e50; font-size: 16px; margin: 0 0 15px 0; font-weight: 600; border-bottom: 2px solid #ecf0f1; padding-bottom: 8px;">
                    Customer Information
                  </h3>
                  
                  <div style="background-color: #ffffff; border: 1px solid #e8eaed; border-radius: 8px; overflow: hidden;">
                      <div style="display: flex; padding: 12px 20px; border-bottom: 1px solid #f1f3f4; background-color: #fafbfc;">
                          <span style="font-weight: 600; color: #5f6368; width: 100px; display: inline-block; font-size: 14px;">Full Name:</span>
                          <span style="color: #202124; font-weight: 500;">${name}</span>
                      </div>
                      <div style="display: flex; padding: 12px 20px; border-bottom: 1px solid #f1f3f4;">
                          <span style="font-weight: 600; color: #5f6368; width: 100px; display: inline-block; font-size: 14px;">Email:</span>
                          <span style="color: #202124;">
                              <a href="mailto:${email}" style="color: #6B8E5A; text-decoration: none; font-weight: 500;">${email}</a>
                          </span>
                      </div>
                      <div style="display: flex; padding: 12px 20px; border-bottom: 1px solid #f1f3f4; background-color: #fafbfc;">
                          <span style="font-weight: 600; color: #5f6368; width: 100px; display: inline-block; font-size: 14px;">Phone:</span>
                          <span style="color: #202124;">
                              <a href="tel:${phone}" style="color: #6B8E5A; text-decoration: none; font-weight: 500;">${phone}</a>
                          </span>
                      </div>
                      <div style="display: flex; padding: 12px 20px; background-color: #fafbfc;">
                          <span style="font-weight: 600; color: #5f6368; width: 100px; display: inline-block; font-size: 14px;">Form Type:</span>
                          <span style="background: #6B8E5A; color: white; padding: 2px 8px; border-radius: 12px; font-size: 12px; font-weight: 600; text-transform: uppercase;">
                              ${formType}
                          </span>
                      </div>
                  </div>
              </div>

              <!-- Service & Subject (if applicable) -->
              ${service || subject ? `
              <div style="margin-bottom: 25px;">
                  <h3 style="color: #2c3e50; font-size: 16px; margin: 0 0 15px 0; font-weight: 600; border-bottom: 2px solid #ecf0f1; padding-bottom: 8px;">
                    Service Details
                  </h3>
                  <div style="background-color: #ffffff; border: 1px solid #e8eaed; border-radius: 8px; overflow: hidden;">
                      ${service ? `
                      <div style="display: flex; padding: 12px 20px; border-bottom: 1px solid #f1f3f4; background-color: #fafbfc;">
                          <span style="font-weight: 600; color: #5f6368; width: 120px; display: inline-block; font-size: 14px;">Service Requested: </span>
                          <span style="color: #202124; font-weight: 500;">${service}</span>
                      </div>
                      ` : ''}
                      ${subject ? `
                      <div style="display: flex; padding: 12px 20px; background-color: ${service ? '' : '#fafbfc'};">
                          <span style="font-weight: 600; color: #5f6368; width: 120px; display: inline-block; font-size: 14px;">Subject: </span>
                          <span style="color: #202124; font-weight: 500;">${subject}</span>
                      </div>
                      ` : ''}
                  </div>
              </div>
              ` : ''}

              <!-- Customer Message -->
              <div style="margin-bottom: 25px;">
                  <h3 style="color: #2c3e50; font-size: 16px; margin: 0 0 15px 0; font-weight: 600; border-bottom: 2px solid #ecf0f1; padding-bottom: 8px;">
                    Customer Message
                  </h3>
                  <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #8DB575;">
                      <p style="margin: 0; color: #2c3e50; line-height: 1.6; font-size: 15px;">
                          ${message.replace(/\n/g, '<br>')}
                      </p>
                  </div>
              </div>
          </div>

          <!-- Footer -->
          <div style="background-color: #f8f9fa; padding: 20px 30px; border-top: 1px solid #e9ecef; text-align: center;">
              <p style="margin: 0; color: #6c757d; font-size: 13px;">
                This notification was automatically generated from the AGC Home Renovation website contact form
              </p>
              <p style="margin: 5px 0 0 0; color: #6c757d; font-size: 12px;">
                  Received on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}
              </p>
          </div>
          
      </div>
  </body>
  </html>
  `;

    // Send email to business
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'contact@yourdomain.com',
      to: [process.env.BUSINESS_EMAIL || 'haslzun08@gmail.com', 'haslzun08@gmail.com'],
      subject: emailSubject,
      html: createInternalEmailContent,
      replyTo: email,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send email. Please try again.' },
        { status: 500 }
      )
    }

    // Send confirmation email to customer
    const confirmationEmail = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AGC Home Renovation - Request Confirmation</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #6B8E5A 0%, #5A7A4A 100%); color: white; padding: 30px 40px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px; font-weight: 300; letter-spacing: 1px;">AGC HOME RENOVATION</h1>
            <p style="margin: 8px 0 0 0; font-size: 14px; opacity: 0.9; text-transform: uppercase; letter-spacing: 0.5px;">Professional Craftsmanship</p>
        </div>

        <!-- Main Content -->
        <div style="padding: 40px;">
            
            <!-- Thank You Section -->
            <div style="text-align: center; margin-bottom: 30px;">
                <div style="width: 60px; height: 4px; background: linear-gradient(90deg, #6B8E5A, #8DB575); margin: 0 auto 20px auto; border-radius: 2px;"></div>
                <h2 style="color: #2c3e50; font-size: 24px; margin: 0 0 10px 0; font-weight: 400;">Thank You for Your Interest!</h2>
                <p style="color: #7f8c8d; font-size: 16px; margin: 0; line-height: 1.5;">We've received your request and will respond promptly</p>
            </div>

            <!-- Personal Greeting -->
            <div style="background-color: #f8f9fa; padding: 20px; border-left: 4px solid #6B8E5A; margin-bottom: 30px;">
                <p style="margin: 0; color: #2c3e50; font-size: 16px; line-height: 1.6;">
                    Hi <span style="font-weight: 600; color: #34495e;">${name}</span>,
                </p>
                <p style="margin: 15px 0 0 0; color: #5d6d7e; font-size: 15px; line-height: 1.6;">
                    Thank you for reaching out to us. We have received your <strong>${formType}</strong> request and will get back to you as soon as possible.
                </p>
            </div>

            <!-- Request Details -->
            <div style="margin-bottom: 30px;">
                <h3 style="color: #2c3e50; font-size: 18px; margin: 0 0 20px 0; font-weight: 500; border-bottom: 2px solid #ecf0f1; padding-bottom: 10px;">Your Request Details</h3>
                
                <div style="background-color: #ffffff; border: 1px solid #e8eaed; border-radius: 8px; overflow: hidden;">
                    <div style="display: flex; padding: 15px 20px; border-bottom: 1px solid #f1f3f4; background-color: #fafbfc;">
                        <span style="font-weight: 600; color: #5f6368; width: 80px; display: inline-block;">Name:</span>
                        <span style="color: #202124;">${name}</span>
                    </div>
                    <div style="display: flex; padding: 15px 20px; border-bottom: 1px solid #f1f3f4;">
                        <span style="font-weight: 600; color: #5f6368; width: 80px; display: inline-block;">Email:</span>
                        <span style="color: #202124;">${email}</span>
                    </div>
                    <div style="display: flex; padding: 15px 20px; border-bottom: 1px solid #f1f3f4; background-color: #fafbfc;">
                        <span style="font-weight: 600; color: #5f6368; width: 80px; display: inline-block;">Phone:</span>
                        <span style="color: #202124;">${phone}</span>
                    </div>
                    ${service ? `
                    <div style="display: flex; padding: 15px 20px; border-bottom: 1px solid #f1f3f4;">
                        <span style="font-weight: 600; color: #5f6368; width: 80px; display: inline-block;">Service:</span>
                        <span style="color: #202124;">${service}</span>
                    </div>
                    ` : ''}
                    <div style="padding: 15px 20px; background-color: #fafbfc;">
                        <span style="font-weight: 600; color: #5f6368; display: block; margin-bottom: 8px;">Message:</span>
                        <span style="color: #202124; line-height: 1.5;">${message}</span>
                    </div>
                </div>
            </div>

            <!-- Contact Information -->
            <div style="background: linear-gradient(135deg, #f8f9fa, #e9ecef); padding: 25px; border-radius: 8px; text-align: center; margin-bottom: 30px;">
                <h4 style="color: #2c3e50; margin: 0 0 15px 0; font-size: 16px; font-weight: 600;">Need to reach us urgently?</h4>
                <p style="margin: 0; color: #5d6d7e; font-size: 15px; line-height: 1.5;">
                    Call us at <a href="tel:+13363292502" style="color: #6B8E5A; text-decoration: none; font-weight: 600;">(336) 329-2502</a>
                </p>
            </div>

            <!-- What's Next -->
            <div style="border-left: 4px solid #8DB575; padding-left: 20px; margin-bottom: 30px;">
                <h4 style="color: #6B8E5A; margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">What happens next?</h4>
                <ul style="color: #5d6d7e; margin: 0; padding-left: 20px; line-height: 1.6;">
                    <li style="margin-bottom: 5px;">Our team will review your request as soon as possible</li>
                    <li style="margin-bottom: 5px;">We'll contact you to discuss your project details</li>
                    <li>Schedule a free consultation at your convenience</li>
                </ul>
            </div>

        </div>

        <!-- Footer -->
        <div style="background-color: #6B8E5A; color: white; padding: 30px 40px; text-align: center;">
            <div style="margin-bottom: 20px;">
                <h3 style="margin: 0 0 5px 0; font-size: 18px; font-weight: 400;">AGC Home Renovation</h3>
                <p style="margin: 0; font-size: 13px; opacity: 0.8;">Elevate Your Living Space</p>
            </div>
            
            <div style="border-top: 1px solid rgba(255,255,255,0.2); padding-top: 20px;">
                <p style="margin: 0 0 8px 0; font-size: 14px;">
                    📍 209 Smith St, Burlington, NC 27217
                </p>
                <p style="margin: 0 0 8px 0; font-size: 14px;">
                    📞 <a href="tel:+13363292502" style="color: #B8D4A6; text-decoration: none;">(336) 329-2502</a>
                </p>
                <p style="margin: 0; font-size: 14px;">
                    ✉️ <a href="mailto:carlosr0415@yahoo.com" style="color: #B8D4A6; text-decoration: none;">carlosr0415@yahoo.com</a>
                </p>
            </div>
            
            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.2);">
                <p style="margin: 0; font-size: 12px; opacity: 0.7;">
                    © 2025 AGC Home Renovation.
                </p>
            </div>
        </div>
        
    </div>
</body>
</html>
`;

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'contact@yourdomain.com',
      to: [email],
      subject: 'Thank you for contacting AGC Home Renovation',
      html: confirmationEmail,
    })

    return NextResponse.json(
      { message: 'Email sent successfully', id: data?.id },
      { status: 200 }
    )
  } catch (error) {
    console.error('API error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid form data', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 