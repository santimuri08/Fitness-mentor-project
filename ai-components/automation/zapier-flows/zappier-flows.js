// The Fitness Mentor - Zapier Automation Flows
// This is a documentation file describing how to set up your Zapier flows

/*
 * FLOW 1: DAILY MOTIVATION GENERATOR
 * 
 * Purpose: Generate and post daily motivational content
 * Trigger: Schedule (Every day at 9AM)
 * Actions: Generate content, post to social media or email
 */

/*
Step 1: Schedule Trigger
- App: Schedule by Zapier
- Event: Every Day at 9:00 AM
*/

/*
Step 2: Run JavaScript Code
- App: Code by Zapier
- Event: Run JavaScript
- Input: None needed
- Code: (Copy the content generation code below)
*/

function generateMotivation() {
    // API call configuration - use your own API key
    const options = {
      url: 'https://api.openai.com/v1/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_OPENAI_API_KEY'
      },
      body: {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a fitness coach who creates motivational content. Your tone is bold, energetic and inspiring. Your content is concise and actionable."
          },
          {
            role: "user",
            content: "Generate a short, energetic motivational quote for fitness enthusiasts trying to build consistency. Include a fitness-related emoji. Keep it under 240 characters."
          }
        ],
        max_tokens: 150,
        temperature: 0.7
      }
    };
    
    return options;
  }
  
  /*
  Step 3: Post to Twitter/X
  - App: Twitter (or X)
  - Event: Create Tweet
  - Input: Message from previous step
    - Get content from: response.choices[0].message.content
  */
  
  /*
  Step 4: Send Email (Optional additional step)
  - App: Gmail or Email by Zapier
  - Event: Send Email
  - Input: 
    - To: Your subscribers list
    - Subject: Daily Fitness Motivation
    - Body HTML: Format the motivation in an email template
  */
  
  
  /*
   * FLOW 2: LEAD CAPTURE & WELCOME SEQUENCE
   * 
   * Purpose: Capture new leads and send personalized AI-generated welcome email
   * Trigger: New form submission on website
   * Actions: Add to email list, send personalized welcome
   */
  
  /*
  Step 1: Form Submission Trigger
  - App: Forms (Use Zapier Forms, Google Forms, Typeform, etc.)
  - Event: New Submission
  */
  
  /*
  Step 2: Add to Email List
  - App: Email Marketing (Mailchimp, ConvertKit, etc.)
  - Event: Add/Update Subscriber
  - Input: Map form fields to subscriber fields
  */
  
  /*
  Step 3: Run JavaScript Code
  - App: Code by Zapier
  - Event: Run JavaScript
  - Input: Subscriber name and goals from form
  - Code: (Copy the personalized content generation code below)
  */
  
  function generateWelcomeEmail(name, fitnessGoal) {
    // API call configuration
    const options = {
      url: 'https://api.openai.com/v1/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_OPENAI_API_KEY'
      },
      body: {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a fitness coach creating personalized welcome emails. Your tone is warm, encouraging and professional. You provide specific guidance based on the person's fitness goals."
          },
          {
            role: "user",
            content: `Write a personalized welcome email for ${name} who wants to ${fitnessGoal}. Include:
            1. A warm welcome to the community
            2. One specific tip related to their goal
            3. Instructions to book a free consultation call
            4. A motivational quote at the end
            Keep it under 300 words and make it feel personal.`
          }
        ],
        max_tokens: 500,
        temperature: 0.7
      }
    };
    
    return options;
  }
  
  /*
  Step 4: Send Welcome Email
  - App: Gmail or Email by Zapier
  - Event: Send Email
  - Input: 
    - To: Subscriber email
    - Subject: Welcome to The Fitness Mentor!
    - Body HTML: Personalized content from previous step
  */
  
  
  /*
   * FLOW 3: CALENDLY BOOKING CONFIRMATION ENHANCER
   * 
   * Purpose: Send enhanced confirmation emails when someone books a call
   * Trigger: New Calendly booking
   * Actions: Generate personalized prep email with AI
   */
  
  /*
  Step 1: Calendly Booking Trigger
  - App: Calendly
  - Event: Invitee Created
  */
  
  /*
  Step 2: Delay
  - App: Delay by Zapier
  - Event: Delay For
  - Input: 5 minutes (to allow Calendly's own confirmation to send first)
  */
  
  /*
  Step 3: Run JavaScript Code
  - App: Code by Zapier
  - Event: Run JavaScript
  - Input: Invitee name and event type
  - Code: (Copy the prep email generation code below)
  */
  
  function generatePrepEmail(name, eventType) {
    // Determine coaching type based on event name
    const isInitialConsult = eventType.toLowerCase().includes('consultation');
    
    let promptContent = isInitialConsult ?
      `Write a prep email for ${name} who just booked an initial fitness consultation. Include:
      1. Confirmation of their booking
      2. 3 questions they should think about before our call (about goals, current routine, and challenges)
      3. A request to come prepared with any specific questions
      4. A brief motivational note about taking this first step` :
      
      `Write a prep email for ${name} who just booked a fitness coaching check-in call. Include:
      1. Confirmation of their booking
      2. A request to prepare their progress metrics and questions
      3. A reminder to update their workout log before the call
      4. An encouraging note about their ongoing commitment`;
    
    // API call configuration
    const options = {
      url: 'https://api.openai.com/v1/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_OPENAI_API_KEY'
      },
      body: {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a professional fitness coach's assistant sending preparation emails for coaching calls. Your tone is professional, warm, and organized."
          },
          {
            role: "user",
            content: promptContent
          }
        ],
        max_tokens: 500,
        temperature: 0.7
      }
    };
    
    return options;
  }
  
  /*
  Step 4: Send Prep Email
  - App: Gmail or Email by Zapier
  - Event: Send Email
  - Input: 
    - To: Invitee email
    - Subject: Prepare for Your Fitness Mentor Session
    - Body HTML: Formatted content from previous step
  */
  
  
  /*
   * FLOW 4: WEEKLY CLIENT CHECK-IN REMINDER
   * 
   * Purpose: Send automated check-in reminders to active clients
   * Trigger: Schedule (Weekly)
   * Actions: Send personalized check-in email
   */
  
  /*
  Step 1: Schedule Trigger
  - App: Schedule by Zapier
  - Event: Every Friday at 10:00 AM
  */
  
  /*
  Step 2: Get Active Clients
  - App: Google Sheets, Airtable, or your CRM
  - Event: Find Records
  - Input: Status = "Active"
  */
  
  /*
  Step 3: Loop Through Clients
  - App: Looping by Zapier
  - Event: Loop
  - Input: Client records from previous step
  */
  
  /*
  Step 4: Run JavaScript Code
  - App: Code by Zapier
  - Event: Run JavaScript
  - Input: Client name and goal
  - Code: (Copy the check-in email generation code below)
  */
  
  function generateCheckInEmail(name, currentGoal, weeksActive) {
    // API call configuration
    const options = {
      url: 'https://api.openai.com/v1/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_OPENAI_API_KEY'
      },
      body: {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a fitness coach sending weekly check-in emails to clients. Your tone is supportive, encouraging, and action-oriented."
          },
          {
            role: "user",
            content: `Write a weekly check-in email for ${name} who has been working with me for ${weeksActive} weeks. Their current goal is ${currentGoal}. Include:
            1. A warm greeting and acknowledgment of their progress so far
            2. A reminder to complete their weekly check-in form
            3. One specific tip related to their current goal
            4. A motivational quote relevant to consistency and progress
            Keep it under 250 words and conversational.`
          }
        ],
        max_tokens: 500,
        temperature: 0.7
      }
    };
    
    return options;
  }
  
  /*
  Step 5: Send Check-In Email
  - App: Gmail or Email by Zapier
  - Event: Send Email
  - Input: 
    - To: Client email
    - Subject: Your Weekly Fitness Check-In
    - Body HTML: Personalized content from previous step
  */