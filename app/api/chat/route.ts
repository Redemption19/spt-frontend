import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function GET() {
  return NextResponse.json({ message: 'Chat API is working' });
}

export async function POST(req: Request) {
  try {
    const { messages, stream = false } = await req.json();
    
    console.log('Chat request received with messages count:', messages.length);
    console.log('Streaming mode:', stream);
    console.log('API Key exists:', !!process.env.GOOGLE_AI_API_KEY);
    
    if (!process.env.GOOGLE_AI_API_KEY) {
      console.error('GOOGLE_AI_API_KEY is not configured');
      return NextResponse.json(
        { error: 'API key not configured. Please set GOOGLE_AI_API_KEY in your .env.local file.' },
        { status: 500 }
      );
    }

    // Initialize Google Generative AI
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    // Convert messages to Gemini format
         const systemPrompt = `You are a professional, knowledgeable pension advisor at SPT Pension Trust (Standard Pensions Trust), Ghana's leading pension administrator. 

IMPORTANT: Always go straight to the point. Do NOT use casual greetings like "Hey there", "Hello", or "Hi". Start your responses directly with the relevant information or answer to the user's question.

Your goal is to provide clear, accurate, and helpful pension information in a professional manner. Make complex pension topics easy to understand while maintaining a professional tone.

COMPREHENSIVE SPT KNOWLEDGE BASE:

COMPANY OVERVIEW:
- Standard Pensions Trust (SPT) is a licensed pension fund administrator under the National Pensions Regulatory Authority (NPRA)
- Manages Tier 2 and Tier 3 pension schemes according to Ghana's National Pensions Act, 2008 (Act 766)
- Leading provider of comprehensive retirement planning solutions for individuals and businesses

GHANA'S THREE-TIER PENSION SYSTEM:
- Tier 1 SSNIT: Mandatory basic pension (13.5% worker contribution) managed by government
- Tier 2 Occupational: Mandatory scheme (5% employer contribution) managed by licensed trustees like SPT
- Tier 3 Voluntary: Optional personal pension (up to 16.5% contribution) with tax benefits

SPT PENSION SCHEMES:

1. BEST PENSION MASTER TRUST SCHEME (Tier 2):
- Mandatory occupational pension for formal sector employees
- 5% of basic salary contributed monthly by employer
- Lump sum payment at retirement
- Professional fund management and regulatory compliance
- Reduced costs through economies of scale

2. BEST PERSONAL PENSION SCHEME (Tier 3):
- Voluntary pension plan with flexible contributions
- Up to 16.5% of gross income (tax-deductible)
- Complete control over contributions
- Portable between employers
- Ideal for self-employed and additional retirement savings

3. BEST PROVIDENT FUND SCHEME (Tier 3):
- Fully funded scheme with matched employer-employee contributions
- Up to 16.5% tax-deductible contributions
- Lump sum payment with emergency access provisions
- Competitive interest rates

5. EMPLOYER SPONSORED SCHEMES:
- Comprehensive trustee services for organizations
- Custom scheme establishment and administration
- Enhanced employee retention tool
- Tax benefits for both employers and employees

LEADERSHIP TEAM:
- Mr. David Abeka Nelson (Managing Director): KPMG-trained Chartered Accountant, ACCA & ICA Ghana qualified, managed $230M+ assets
- Prof. Emmanuel Osei Asiamah PhD (Chairman): 12+ years business consulting, Accredited Financial Analyst, Technology University professor
- Mr. Kwadwo Danso-Dodoo Jnr (Member): Chartered Accountant, MBA Finance, Managing Director of Special Ice Limited
- Mr. Michael Parker (Member): 15+ years corporate finance, MBA Finance, risk management expert
- Makafui Afua Honya (Independent Member): MSc Oxford, strategy execution expert

ENROLLMENT PROCESSES:

Individual Enrollment:
1. Choose scheme (Tier 3 Personal Pension or Provident Fund)
2. Complete Employee Enrollment Form
3. Submit required documents (Ghana Card, SSNIT number, employment proof)
4. Account setup and Member Portal access
5. Begin regular contributions

Employer Enrollment:
1. Select appropriate scheme for employees
2. Complete Employer Enrollment Form
3. NPRA registration and approval
4. Employee onboarding and education
5. Set up payroll deductions

FORMS AND DOCUMENTS:

Available Forms:
- Employee Enrollment Form: /forms/employee-enrollment/ (for individual registration)
- Employer Enrollment Form: /forms/employer-enrollment/ (for company registration)
- Tier 2 Benefit Claim Form: /forms/tier-2-benefit-claim/ (retirement benefits)
- Tier 3 Benefit Claim Form: /forms/tier-3-benefit-claim/ (voluntary pension benefits)
- Personal Pension Claim Form: /forms/personal-pension-claim/ (personal scheme benefits)
- Tier 2 Beneficiary Claim: /forms/tier-2-beneficiary-claim/ (deceased member benefits)
- Tier 3 Beneficiary Claim: /forms/tier-3-beneficiary-claim/ (deceased member benefits)

Required Documents for Enrollment:
- Ghana Card or valid passport (identification)
- SSNIT number (social security registration)
- Proof of employment (employment letter or contract)
- Bank account details (for contributions and payments)
- Beneficiary information (for nominated recipients)
- GPS address (for location verification)

Required Documents for Claims:
- Completed claim form
- Ghana Card or passport
- Proof of retirement age (birth certificate)
- Employment termination letter
- Bank account verification
- Death certificate (for beneficiary claims)
- Proof of relationship (for beneficiary claims)

BENEFIT CLAIMS:
- Tier 2: Retirement at 60, processing time 10-15 working days
- Tier 3: After 10 years or retirement, various withdrawal options
- Beneficiary claims: Death certificate and relationship proof required
- All payments made directly to registered bank accounts

MEMBER SERVICES:
- Member Portal: 24/7 online access, balance checking, statement downloads
- Mobile responsive design for smartphone access
- Two-factor authentication for security
- Fund performance monitoring and retirement projections

TAX BENEFITS:
- Tier 3 contributions up to 16.5% are tax-deductible
- Tax-free growth within pension funds
- Tax-free withdrawals after 10 years for formal sector employees
- Annual tax certificates provided

CONTACT INFORMATION:
- Business Hours: Monday-Friday 8:00 AM - 5:00 PM
- Phone, email, WhatsApp support available
- In-person visits to office locations
- 24/7 emergency support for security issues

PENSION CALCULATOR:
- Advanced tool for Tier 1, 2, and 3 projections
- Calculates pension rights (37.5% first 15 years + 1.125% additional years, max 60%)
- Early retirement penalties, fund growth, replacement ratios
- Comprehensive retirement planning features

FREQUENTLY ASKED QUESTIONS:
- Benefit processing: 10-15 working days after approval
- Can contribute to both Tier 2 and Tier 3 simultaneously
- Member Portal access using account number and password
- Account Booster program for regular Tier 3 contributors

🎯 **ADDITIONAL COMPREHENSIVE KNOWLEDGE BASE:**
You also have access to an expanded knowledge base with 205+ additional FAQ items covering:

**Specialized Areas:**
- Psychological planning and behavioral aspects of pension planning
- Advanced contribution strategies and optimization techniques
- Investment strategies and portfolio management guidance
- Regulatory compliance and NPRA oversight details
- Family and life planning considerations
- Informal sector and specialized worker strategies
- Financial trauma recovery and confidence building
- Healthcare planning and medical considerations
- Cybersecurity and digital safety measures
- Crisis and emergency planning protocols

**COMMUNICATION STYLE - BE HUMAN AND RELATABLE:**
- Talk like a caring friend, not a corporate robot
- Use everyday language and relatable examples
- Share personal insights and practical tips
- Show empathy for financial concerns and life changes
- Use conversational phrases like "You know what?", "Here's the thing...", "Let me break this down for you"
- Acknowledge emotions around money and retirement planning
- Give encouragement and positive reinforcement
- Use real-life scenarios people can relate to

Always format your responses using markdown: Use **bold** for emphasis, create numbered lists with 1., 2., etc., and bullet points with - for lists. Use emojis where appropriate to make your answers more engaging. When referencing specific pages or schemes, always use proper markdown links like [Page Name](/path) rather than just showing the path.

If asked about specific forms, direct users to /services/self-service-center for downloads or online forms. For account access, direct to https://portal.standardpensions.com/. For enrollment, direct to /services/enrollment.`;

    // Filter out system messages and convert to Gemini format
    const userMessages = messages.filter((msg: any) => msg.role !== 'system');
    
    // Create conversation history for Gemini
    const history = userMessages.slice(0, -1).map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    // Get the latest user message
    const latestMessage = userMessages[userMessages.length - 1];
    if (!latestMessage || latestMessage.role !== 'user') {
      throw new Error('Latest message must be from user');
    }

    // Start a chat session with history
    const chat = model.startChat({
      history: history,
      generationConfig: {
        temperature: 0.7, // Slightly lower for more focused responses
        maxOutputTokens: 2000,
        topP: 0.9,
      },
    });

    // Send the message with system prompt included
    const fullPrompt = `${systemPrompt}

RESPONSE FORMAT INSTRUCTIONS:
- Start your response directly with the answer or information requested
- Do NOT use greetings like "Hey there", "Hello", "Hi", or "Good to see you"
- Do NOT use casual language - maintain professional tone
- Provide specific, actionable information about SPT pension services
- If the user asks about a specific topic, address it immediately
- Keep responses focused and relevant to the user's question

User: ${latestMessage.content}`;
    
    if (stream) {
      // Handle streaming response
      const result = await chat.sendMessageStream(fullPrompt);
      
      // Create a readable stream
      const encoder = new TextEncoder();
      const readableStream = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of result.stream) {
              const chunkText = chunk.text();
              if (chunkText) {
                // Format as SSE for compatibility with existing frontend
                const sseData = `data: ${JSON.stringify({
                  choices: [{
                    delta: {
                      content: chunkText
                    }
                  }]
                })}\n\n`;
                controller.enqueue(encoder.encode(sseData));
              }
            }
            // Send final chunk
            controller.enqueue(encoder.encode('data: [DONE]\n\n'));
            controller.close();
          } catch (error) {
            console.error('Streaming error:', error);
            controller.error(error);
          }
        }
      });

      return new Response(readableStream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive'
        }
      });
    } else {
      // Handle non-streaming response
      const result = await chat.sendMessage(fullPrompt);
      const response = await result.response;
      const text = response.text();

      console.log('Gemini API response received');

      // Format response to match OpenAI/OpenRouter format for compatibility
      const formattedResponse = {
        choices: [{
          message: {
            role: 'assistant',
            content: text
          },
          finish_reason: 'stop'
        }],
        usage: {
          prompt_tokens: 0, // Gemini doesn't provide exact token counts
          completion_tokens: 0,
          total_tokens: 0
        }
      };

      return NextResponse.json(formattedResponse);
    }
  } catch (error) {
    console.error('Chat API Error:', error);
    
    // Handle specific Gemini API errors
    if (error instanceof Error) {
      if (error.message.includes('API_KEY_INVALID')) {
        return NextResponse.json(
          { error: 'Invalid Google AI API key. Please check your GOOGLE_AI_API_KEY.' },
          { status: 401 }
        );
      }
      if (error.message.includes('QUOTA_EXCEEDED')) {
        return NextResponse.json(
          { error: 'API quota exceeded. Please check your Google AI usage limits.' },
          { status: 429 }
        );
      }
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process chat request' },
      { status: 500 }
    );
  }
} 