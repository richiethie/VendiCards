import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { logger } from '@/lib/logger';
import { sendGradingRequestEmails } from '@/server/mail';
import { generateId } from '@/lib/formatting';

// Validation schema for grading requests
const gradingRequestSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(1, 'Phone number is required'),
  cardDescription: z.string().min(1, 'Card description is required'),
  gradingTier: z.string().min(1, 'Grading tier is required'),
  cardNotes: z.string().optional(),
  preferredContactMethod: z.enum(['email', 'phone']),
});

export async function POST(request: NextRequest) {
  try {
    const startTime = Date.now();
    
    // Parse and validate request body
    const body = await request.json();
    const validatedData = gradingRequestSchema.parse(body);
    
    // Generate unique request ID
    const requestId = generateId(12);
    
    // Log the request
    logger.info('Grading request received', {
      requestId,
      customerEmail: validatedData.email,
      gradingTier: validatedData.gradingTier,
    });
    
    // Send confirmation and notification emails
    const emailResults = await sendGradingRequestEmails(validatedData, requestId);
    
    // Log email results
    logger.info('Grading request emails sent', {
      requestId,
      customerEmailSent: emailResults.customerEmailSent,
      staffEmailSent: emailResults.staffEmailSent,
    });
    
    // Calculate response time
    const responseTime = Date.now() - startTime;
    
    // Log API performance
    logger.logApiRequest('POST', '/api/grading', 200, responseTime);
    
    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Grading request submitted successfully',
      requestId,
      emailSent: emailResults.customerEmailSent,
    }, { status: 200 });
    
  } catch (error) {
    // Log the error
    logger.error('Grading request submission failed', error as Error);
    
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        message: 'Invalid request data',
        errors: error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
        })),
      }, { status: 400 });
    }
    
    // Handle other errors
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
    }, { status: 500 });
  }
}

// Optional: Handle GET requests (e.g., for form validation)
export async function GET() {
  return NextResponse.json({
    message: 'Grading request endpoint',
    method: 'POST',
    requiredFields: [
      'name',
      'email', 
      'phone',
      'cardDescription',
      'gradingTier',
      'preferredContactMethod'
    ],
  });
}

