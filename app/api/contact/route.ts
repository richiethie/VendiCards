import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { logger } from '@/lib/logger';
import { sendContactEmails } from '@/server/mail';

// Validation schema for contact form
const contactRequestSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(1, 'Message is required'),
});

export async function POST(request: NextRequest) {
  try {
    const startTime = Date.now();
    
    // Parse and validate request body
    const body = await request.json();
    const validatedData = contactRequestSchema.parse(body);
    
    // Log the request
    logger.info('Contact form submission received', {
      customerEmail: validatedData.email,
      subject: validatedData.subject,
    });
    
    // Send confirmation and notification emails
    const emailResults = await sendContactEmails(validatedData);
    
    // Log email results
    logger.info('Contact form emails sent', {
      customerEmailSent: emailResults.customerEmailSent,
      staffEmailSent: emailResults.staffEmailSent,
    });
    
    // Calculate response time
    const responseTime = Date.now() - startTime;
    
    // Log API performance
    logger.logApiRequest('POST', '/api/contact', 200, responseTime);
    
    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Contact form submitted successfully',
      emailSent: emailResults.customerEmailSent,
    }, { status: 200 });
    
  } catch (error) {
    // Log the error
    logger.error('Contact form submission failed', error as Error);
    
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        message: 'Validation failed',
        errors: error.errors,
      }, { status: 400 });
    }
    
    // Handle other errors
    return NextResponse.json({
      success: false,
      message: 'Failed to submit contact form. Please try again later.',
    }, { status: 500 });
  }
}

