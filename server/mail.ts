import nodemailer from 'nodemailer';
import { env } from '@/lib/env';
import { logger } from '@/lib/logger';
import { RepairRequest } from '@/types/shopify';
import { GradingRequest } from '@/components/GradingForm';

// Create transporter for sending emails
const createTransporter = () => {
  // Check if SMTP configuration is available
  if (!env.SMTP_HOST || !env.SMTP_PORT || !env.SMTP_USER || !env.SMTP_PASS) {
    throw new Error('SMTP configuration is missing. Please set SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS environment variables.');
  }
  
  return nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_PORT === 465, // true for 465, false for other ports
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASS,
    },
  });
};

// Email templates
const getRepairRequestConfirmationEmail = (repairRequest: RepairRequest, requestId: string) => ({
  subject: 'Repair Request Confirmation - VendiCards',
  html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Repair Request Confirmation</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #0ea5e9; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background-color: #f9fafb; }
        .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
        .request-id { background-color: #e0f2fe; padding: 10px; border-radius: 5px; margin: 20px 0; }
        .details { background-color: white; padding: 20px; border-radius: 5px; margin: 20px 0; }
        .detail-row { margin: 10px 0; }
        .label { font-weight: bold; color: #374151; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>VendiCards</h1>
          <h2>Repair Request Confirmation</h2>
        </div>
        
        <div class="content">
          <p>Thank you for submitting your repair request. We've received your submission and will review it shortly.</p>
          
          <div class="request-id">
            <strong>Request ID:</strong> ${requestId}
          </div>
          
          <div class="details">
            <h3>Request Details:</h3>
            <div class="detail-row">
              <span class="label">Name:</span> ${repairRequest.name}
            </div>
            <div class="detail-row">
              <span class="label">Email:</span> ${repairRequest.email}
            </div>
            <div class="detail-row">
              <span class="label">Phone:</span> ${repairRequest.phone}
            </div>
            <div class="detail-row">
              <span class="label">Item Description:</span> ${repairRequest.itemDescription}
            </div>
            <div class="detail-row">
              <span class="label">Issue Description:</span> ${repairRequest.issueDescription}
            </div>
            <div class="detail-row">
              <span class="label">Preferred Contact Method:</span> ${repairRequest.preferredContactMethod}
            </div>
            <div class="detail-row">
              <span class="label">Urgency:</span> ${repairRequest.urgency}
            </div>
          </div>
          
          <p>We will contact you within 24-48 hours to discuss your repair request and provide an estimate.</p>
          
          <p>If you have any questions, please don't hesitate to contact us.</p>
        </div>
        
        <div class="footer">
          <p>VendiCards<br>
          Phone: (920) 539-6222<br>
          Email: vendicards@gmail.com</p>
        </div>
      </div>
    </body>
    </html>
  `,
  text: `
    Repair Request Confirmation - VendiCards
    
    Thank you for submitting your repair request. We've received your submission and will review it shortly.
    
    Request ID: ${requestId}
    
    Request Details:
    - Name: ${repairRequest.name}
    - Email: ${repairRequest.email}
    - Phone: ${repairRequest.phone}
    - Item Description: ${repairRequest.itemDescription}
    - Issue Description: ${repairRequest.issueDescription}
    - Preferred Contact Method: ${repairRequest.preferredContactMethod}
    - Urgency: ${repairRequest.urgency}
    
    We will contact you within 24-48 hours to discuss your repair request and provide an estimate.
    
    If you have any questions, please don't hesitate to contact us.
    
    VendiCards
    Phone: (920) 539-6222
    Email: vendicards@gmail.com
  `,
});

const getRepairRequestNotificationEmail = (repairRequest: RepairRequest, requestId: string) => ({
  subject: `New Repair Request - ${requestId}`,
  html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Repair Request</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #dc2626; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background-color: #f9fafb; }
        .urgent { background-color: #fef2f2; border-left: 4px solid #dc2626; padding: 15px; margin: 20px 0; }
        .details { background-color: white; padding: 20px; border-radius: 5px; margin: 20px 0; }
        .detail-row { margin: 10px 0; }
        .label { font-weight: bold; color: #374151; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Repair Request</h1>
          <h2>Request ID: ${requestId}</h2>
        </div>
        
        <div class="content">
          ${repairRequest.urgency === 'high' ? '<div class="urgent"><strong>⚠️ URGENT REQUEST</strong></div>' : ''}
          
          <div class="details">
            <h3>Customer Information:</h3>
            <div class="detail-row">
              <span class="label">Name:</span> ${repairRequest.name}
            </div>
            <div class="detail-row">
              <span class="label">Email:</span> ${repairRequest.email}
            </div>
            <div class="detail-row">
              <span class="label">Phone:</span> ${repairRequest.phone}
            </div>
            <div class="detail-row">
              <span class="label">Preferred Contact:</span> ${repairRequest.preferredContactMethod}
            </div>
          </div>
          
          <div class="details">
            <h3>Repair Details:</h3>
            <div class="detail-row">
              <span class="label">Item Description:</span> ${repairRequest.itemDescription}
            </div>
            <div class="detail-row">
              <span class="label">Issue Description:</span> ${repairRequest.issueDescription}
            </div>
            <div class="detail-row">
              <span class="label">Urgency Level:</span> ${repairRequest.urgency.toUpperCase()}
            </div>
          </div>
          
          <p><strong>Action Required:</strong> Please review this request and contact the customer within 24 hours.</p>
        </div>
      </div>
    </body>
    </html>
  `,
  text: `
    New Repair Request - ${requestId}
    
    ${repairRequest.urgency === 'high' ? '⚠️ URGENT REQUEST ⚠️' : ''}
    
    Customer Information:
    - Name: ${repairRequest.name}
    - Email: ${repairRequest.email}
    - Phone: ${repairRequest.phone}
    - Preferred Contact: ${repairRequest.preferredContactMethod}
    
    Repair Details:
    - Item Description: ${repairRequest.itemDescription}
    - Issue Description: ${repairRequest.issueDescription}
    - Urgency Level: ${repairRequest.urgency.toUpperCase()}
    
    Action Required: Please review this request and contact the customer within 24 hours.
  `,
});

// Send repair request confirmation email to customer
export async function sendRepairRequestConfirmation(
  repairRequest: RepairRequest,
  requestId: string
): Promise<boolean> {
  try {
    if (!env.SMTP_USER) {
      throw new Error('SMTP_USER is not configured');
    }
    const transporter = createTransporter();
    const emailContent = getRepairRequestConfirmationEmail(repairRequest, requestId);
    
    await transporter.sendMail({
      from: `"VendiCards" <${env.SMTP_USER}>`,
      to: repairRequest.email,
      subject: emailContent.subject,
      html: emailContent.html,
      text: emailContent.text,
    });
    
    logger.info('Repair request confirmation email sent', { requestId, customerEmail: repairRequest.email });
    return true;
  } catch (error) {
    logger.error('Failed to send repair request confirmation email', error as Error, { requestId });
    return false;
  }
}

// Send repair request notification email to staff
export async function sendRepairRequestNotification(
  repairRequest: RepairRequest,
  requestId: string,
  staffEmail: string = env.SMTP_USER || 'vendicards@gmail.com'
): Promise<boolean> {
  try {
    if (!env.SMTP_USER) {
      throw new Error('SMTP_USER is not configured');
    }
    const transporter = createTransporter();
    const emailContent = getRepairRequestNotificationEmail(repairRequest, requestId);
    
    await transporter.sendMail({
      from: `"VendiCards" <${env.SMTP_USER}>`,
      to: staffEmail,
      subject: emailContent.subject,
      html: emailContent.html,
      text: emailContent.text,
    });
    
    logger.info('Repair request notification email sent to staff', { requestId, staffEmail });
    return true;
  } catch (error) {
    logger.error('Failed to send repair request notification email', error as Error, { requestId });
    return false;
  }
}

// Send both confirmation and notification emails
export async function sendRepairRequestEmails(
  repairRequest: RepairRequest,
  requestId: string,
  staffEmail?: string
): Promise<{ customerEmailSent: boolean; staffEmailSent: boolean }> {
  const customerEmailSent = await sendRepairRequestConfirmation(repairRequest, requestId);
  const staffEmailSent = await sendRepairRequestNotification(repairRequest, requestId, staffEmail);
  
  return { customerEmailSent, staffEmailSent };
}

// Grading Request Email Templates
const getGradingRequestConfirmationEmail = (gradingRequest: GradingRequest, requestId: string) => ({
  subject: 'Grading Request Confirmation - VendiCards',
  html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Grading Request Confirmation</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #dc2626; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background-color: #f9fafb; }
        .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
        .request-id { background-color: #e0f2fe; padding: 10px; border-radius: 5px; margin: 20px 0; }
        .details { background-color: white; padding: 20px; border-radius: 5px; margin: 20px 0; }
        .detail-row { margin: 10px 0; }
        .label { font-weight: bold; color: #374151; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>VendiCards</h1>
          <h2>Grading Request Confirmation</h2>
        </div>
        
        <div class="content">
          <p>Thank you for submitting your grading request. We've received your submission and will review it shortly.</p>
          
          <div class="request-id">
            <strong>Request ID:</strong> ${requestId}
          </div>
          
          <div class="details">
            <h3>Request Details:</h3>
            <div class="detail-row">
              <span class="label">Name:</span> ${gradingRequest.name}
            </div>
            <div class="detail-row">
              <span class="label">Email:</span> ${gradingRequest.email}
            </div>
            <div class="detail-row">
              <span class="label">Phone:</span> ${gradingRequest.phone}
            </div>
            <div class="detail-row">
              <span class="label">Card Description:</span> ${gradingRequest.cardDescription}
            </div>
            <div class="detail-row">
              <span class="label">Grading Tier:</span> ${gradingRequest.gradingTier}
            </div>
            ${gradingRequest.cardNotes ? `
            <div class="detail-row">
              <span class="label">Card Notes:</span> ${gradingRequest.cardNotes}
            </div>
            ` : ''}
            <div class="detail-row">
              <span class="label">Preferred Contact Method:</span> ${gradingRequest.preferredContactMethod}
            </div>
          </div>
          
          <p>We will contact you within 24-48 hours to discuss your grading request and provide next steps.</p>
          
          <p>If you have any questions, please don't hesitate to contact us.</p>
        </div>
        
        <div class="footer">
          <p>VendiCards<br>
          Phone: (920) 539-6222<br>
          Email: vendicards@gmail.com</p>
        </div>
      </div>
    </body>
    </html>
  `,
  text: `
    Grading Request Confirmation - VendiCards
    
    Thank you for submitting your grading request. We've received your submission and will review it shortly.
    
    Request ID: ${requestId}
    
    Request Details:
    Name: ${gradingRequest.name}
    Email: ${gradingRequest.email}
    Phone: ${gradingRequest.phone}
    Card Description: ${gradingRequest.cardDescription}
    Grading Tier: ${gradingRequest.gradingTier}
    ${gradingRequest.cardNotes ? `Card Notes: ${gradingRequest.cardNotes}\n` : ''}
    Preferred Contact Method: ${gradingRequest.preferredContactMethod}
    
    We will contact you within 24-48 hours to discuss your grading request and provide next steps.
    
    VendiCards
    Phone: (920) 539-6222
    Email: vendicards@gmail.com
  `,
});

const getGradingRequestNotificationEmail = (gradingRequest: GradingRequest, requestId: string) => ({
  subject: `New Grading Request #${requestId} - VendiCards`,
  html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Grading Request</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #dc2626; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background-color: #f9fafb; }
        .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
        .request-id { background-color: #fef2f2; padding: 10px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #dc2626; }
        .details { background-color: white; padding: 20px; border-radius: 5px; margin: 20px 0; }
        .detail-row { margin: 10px 0; }
        .label { font-weight: bold; color: #374151; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Grading Request</h1>
          <h2>Request ID: ${requestId}</h2>
        </div>
        
        <div class="content">
          <div class="request-id">
            <strong>Action Required:</strong> Please review this request and contact the customer within 24 hours.
          </div>
          
          <div class="details">
            <h3>Customer Information:</h3>
            <div class="detail-row">
              <span class="label">Name:</span> ${gradingRequest.name}
            </div>
            <div class="detail-row">
              <span class="label">Email:</span> ${gradingRequest.email}
            </div>
            <div class="detail-row">
              <span class="label">Phone:</span> ${gradingRequest.phone}
            </div>
            <div class="detail-row">
              <span class="label">Preferred Contact:</span> ${gradingRequest.preferredContactMethod}
            </div>
          </div>
          
          <div class="details">
            <h3>Card Information:</h3>
            <div class="detail-row">
              <span class="label">Card Description:</span> ${gradingRequest.cardDescription}
            </div>
            <div class="detail-row">
              <span class="label">Grading Tier:</span> ${gradingRequest.gradingTier}
            </div>
            ${gradingRequest.cardNotes ? `
            <div class="detail-row">
              <span class="label">Card Notes:</span> ${gradingRequest.cardNotes}
            </div>
            ` : ''}
          </div>
          
          <p><strong>Action Required:</strong> Please review this request and contact the customer within 24 hours.</p>
        </div>
      </div>
    </body>
    </html>
  `,
  text: `
    New Grading Request - VendiCards
    
    Request ID: ${requestId}
    
    Customer Information:
    - Name: ${gradingRequest.name}
    - Email: ${gradingRequest.email}
    - Phone: ${gradingRequest.phone}
    - Preferred Contact: ${gradingRequest.preferredContactMethod}
    
    Card Information:
    - Card Description: ${gradingRequest.cardDescription}
    - Grading Tier: ${gradingRequest.gradingTier}
    ${gradingRequest.cardNotes ? `- Card Notes: ${gradingRequest.cardNotes}\n` : ''}
    
    Action Required: Please review this request and contact the customer within 24 hours.
  `,
});

// Send grading request confirmation email to customer
export async function sendGradingRequestConfirmation(
  gradingRequest: GradingRequest,
  requestId: string
): Promise<boolean> {
  try {
    const transporter = createTransporter();
    const emailContent = getGradingRequestConfirmationEmail(gradingRequest, requestId);
    
    await transporter.sendMail({
      from: `"VendiCards" <${env.SMTP_USER}>`,
      to: gradingRequest.email,
      subject: emailContent.subject,
      html: emailContent.html,
      text: emailContent.text,
    });
    
    logger.info('Grading request confirmation email sent', { requestId, customerEmail: gradingRequest.email });
    return true;
  } catch (error) {
    logger.error('Failed to send grading request confirmation email', error as Error, { requestId });
    return false;
  }
}

// Send grading request notification email to staff
export async function sendGradingRequestNotification(
  gradingRequest: GradingRequest,
  requestId: string,
  staffEmail: string = env.SMTP_USER || 'vendicards@gmail.com'
): Promise<boolean> {
  try {
    const transporter = createTransporter();
    const emailContent = getGradingRequestNotificationEmail(gradingRequest, requestId);
    
    await transporter.sendMail({
      from: `"VendiCards" <${env.SMTP_USER}>`,
      to: staffEmail,
      subject: emailContent.subject,
      html: emailContent.html,
      text: emailContent.text,
    });
    
    logger.info('Grading request notification email sent to staff', { requestId, staffEmail });
    return true;
  } catch (error) {
    logger.error('Failed to send grading request notification email', error as Error, { requestId });
    return false;
  }
}

// Send both confirmation and notification emails
export async function sendGradingRequestEmails(
  gradingRequest: GradingRequest,
  requestId: string,
  staffEmail?: string
): Promise<{ customerEmailSent: boolean; staffEmailSent: boolean }> {
  const customerEmailSent = await sendGradingRequestConfirmation(gradingRequest, requestId);
  const staffEmailSent = await sendGradingRequestNotification(gradingRequest, requestId, staffEmail);
  
  return { customerEmailSent, staffEmailSent };
}

// Contact Form Email Templates
export interface ContactRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

const getContactConfirmationEmail = (contactRequest: ContactRequest) => ({
  subject: 'Thank You for Contacting VendiCards',
  html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Contact Confirmation</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #dc2626; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background-color: #f9fafb; }
        .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
        .details { background-color: white; padding: 20px; border-radius: 5px; margin: 20px 0; }
        .detail-row { margin: 10px 0; }
        .label { font-weight: bold; color: #374151; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>VendiCards</h1>
          <h2>Thank You for Contacting Us</h2>
        </div>
        
        <div class="content">
          <p>Hi ${contactRequest.firstName},</p>
          
          <p>Thank you for reaching out to VendiCards! We've received your message and will get back to you within 24 hours.</p>
          
          <div class="details">
            <h3>Your Message:</h3>
            <div class="detail-row">
              <span class="label">Subject:</span> ${contactRequest.subject}
            </div>
            <div class="detail-row">
              <span class="label">Message:</span><br>
              ${contactRequest.message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <p>We typically respond within 24 hours. For urgent inquiries, please call or text us at (920) 539-6222.</p>
          
          <p>Best regards,<br>The VendiCards Team</p>
        </div>
        
        <div class="footer">
          <p>VendiCards<br>
          Phone: (920) 539-6222<br>
          Email: vendicards@gmail.com</p>
        </div>
      </div>
    </body>
    </html>
  `,
  text: `
    Thank You for Contacting VendiCards
    
    Hi ${contactRequest.firstName},
    
    Thank you for reaching out to VendiCards! We've received your message and will get back to you within 24 hours.
    
    Your Message:
    Subject: ${contactRequest.subject}
    Message: ${contactRequest.message}
    
    We typically respond within 24 hours. For urgent inquiries, please call or text us at (920) 539-6222.
    
    Best regards,
    The VendiCards Team
    
    VendiCards
    Phone: (920) 539-6222
    Email: vendicards@gmail.com
  `,
});

const getContactNotificationEmail = (contactRequest: ContactRequest) => {
  const subjectLabels: Record<string, string> = {
    purchase: 'Looking to Buy Cards',
    repair: 'Card Repair Services',
    evaluation: 'Card Evaluation/Grading Prep',
    selling: 'Selling Cards to You',
    appraisal: 'Card Appraisal',
    general: 'General Question',
    other: 'Other',
  };
  
  const subjectLabel = subjectLabels[contactRequest.subject] || contactRequest.subject;
  
  return {
    subject: `New Contact Form Submission: ${subjectLabel} - VendiCards`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #dc2626; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9fafb; }
          .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
          .details { background-color: white; padding: 20px; border-radius: 5px; margin: 20px 0; }
          .detail-row { margin: 10px 0; }
          .label { font-weight: bold; color: #374151; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Contact Form Submission</h1>
            <h2>${subjectLabel}</h2>
          </div>
          
          <div class="content">
            <div class="details">
              <h3>Contact Information:</h3>
              <div class="detail-row">
                <span class="label">Name:</span> ${contactRequest.firstName} ${contactRequest.lastName}
              </div>
              <div class="detail-row">
                <span class="label">Email:</span> ${contactRequest.email}
              </div>
              ${contactRequest.phone ? `
              <div class="detail-row">
                <span class="label">Phone:</span> ${contactRequest.phone}
              </div>
              ` : ''}
              <div class="detail-row">
                <span class="label">Subject:</span> ${subjectLabel}
              </div>
            </div>
            
            <div class="details">
              <h3>Message:</h3>
              <p>${contactRequest.message.replace(/\n/g, '<br>')}</p>
            </div>
            
            <p><strong>Action Required:</strong> Please respond to this inquiry within 24 hours.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      New Contact Form Submission - VendiCards
      
      Subject: ${subjectLabel}
      
      Contact Information:
      - Name: ${contactRequest.firstName} ${contactRequest.lastName}
      - Email: ${contactRequest.email}
      ${contactRequest.phone ? `- Phone: ${contactRequest.phone}\n` : ''}
      
      Message:
      ${contactRequest.message}
      
      Action Required: Please respond to this inquiry within 24 hours.
    `,
  };
};

// Send contact form confirmation email to customer
export async function sendContactConfirmation(
  contactRequest: ContactRequest
): Promise<boolean> {
  try {
    const transporter = createTransporter();
    const emailContent = getContactConfirmationEmail(contactRequest);
    
    await transporter.sendMail({
      from: `"VendiCards" <${env.SMTP_USER}>`,
      to: contactRequest.email,
      subject: emailContent.subject,
      html: emailContent.html,
      text: emailContent.text,
    });
    
    logger.info('Contact form confirmation email sent', { customerEmail: contactRequest.email });
    return true;
  } catch (error) {
    logger.error('Failed to send contact form confirmation email', error as Error);
    return false;
  }
}

// Send contact form notification email to staff
export async function sendContactNotification(
  contactRequest: ContactRequest,
  staffEmail: string = env.SMTP_USER || 'vendicards@gmail.com'
): Promise<boolean> {
  try {
    const transporter = createTransporter();
    const emailContent = getContactNotificationEmail(contactRequest);
    
    await transporter.sendMail({
      from: `"VendiCards" <${env.SMTP_USER}>`,
      to: staffEmail,
      subject: emailContent.subject,
      html: emailContent.html,
      text: emailContent.text,
    });
    
    logger.info('Contact form notification email sent to staff', { staffEmail });
    return true;
  } catch (error) {
    logger.error('Failed to send contact form notification email', error as Error);
    return false;
  }
}

// Send both confirmation and notification emails
export async function sendContactEmails(
  contactRequest: ContactRequest,
  staffEmail?: string
): Promise<{ customerEmailSent: boolean; staffEmailSent: boolean }> {
  const customerEmailSent = await sendContactConfirmation(contactRequest);
  const staffEmailSent = await sendContactNotification(contactRequest, staffEmail);
  
  return { customerEmailSent, staffEmailSent };
}

// Test email configuration
export async function testEmailConfiguration(): Promise<boolean> {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    logger.info('Email configuration verified successfully');
    return true;
  } catch (error) {
    logger.error('Email configuration verification failed', error as Error);
    return false;
  }
}
