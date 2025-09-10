/**
 * The Fitness Mentor - AI Content Generator
 * This script uses OpenAI to generate fitness-related content
 * 
 * Usage:
 * - Can be run standalone for testing
 * - Ideal for integrating with Zapier for automation
 */

// Configuration - Replace with your API key when using
// IMPORTANT: For security, we recommend storing this in environment variables
// or in a secure backend service, not directly in your frontend code
const OPENAI_API_KEY = "YOUR_OPENAI_API_KEY"; // Replace with your actual key before using

// Content prompt templates
const PROMPTS = {
  motivation: [
    "Generate a short, energetic motivational quote for fitness enthusiasts trying to build consistency. Include a fitness-related emoji. Keep it under 240 characters.",
    "Create a motivational tweet in the style of a fitness coach encouraging someone who's struggling to stay motivated. Include a call to action and fitness emoji. Keep it under 240 characters.",
    "Write a short, powerful message about pushing through fitness plateaus. Focus on mental toughness. Include a fitness-related hashtag and emoji. Keep it under 240 characters."
  ],
  
  workoutTip: [
    "Create a practical workout tip for busy professionals. Include one specific exercise recommendation. Keep it under 240 characters.",
    "Generate a science-based workout optimization tip with one actionable insight. Keep it under 240 characters.",
    "Write a form correction tip for a common exercise mistake that many beginners make. Be specific and include why it matters. Keep it under 240 characters."
  ],
  
  nutritionAdvice: [
    "Generate a simple nutrition tip for someone trying to build muscle. Include one food recommendation. Keep it under 240 characters.",
    "Create a practical nutrition tip for someone trying to lose fat while maintaining energy for workouts. Keep it under 240 characters.",
    "Write a hydration tip related to workout performance. Include a specific recommendation. Keep it under 240 characters."
  ]
};

/**
 * Generate content using OpenAI API
 * @param {string} contentType - Type of content to generate (motivation, workoutTip, nutritionAdvice)
 * @returns {Promise<string>} - The generated content
 */
async function generateContent(contentType = "motivation") {
  // Select a random prompt from the specified content type
  const promptOptions = PROMPTS[contentType] || PROMPTS.motivation;
  const selectedPrompt = promptOptions[Math.floor(Math.random() * promptOptions.length)];
  
  // Add more context to the prompt
  const enhancedPrompt = `You are The Fitness Mentor, a motivational fitness coach with a bold, energetic style. ${selectedPrompt}`;
  
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // More affordable than GPT-4
        messages: [
          { 
            role: "system", 
            content: "You are a fitness coach who creates motivational, science-based content. Your tone is bold, energetic and inspiring. Your content is concise and actionable."
          },
          { 
            role: "user", 
            content: enhancedPrompt
          }
        ],
        max_tokens: 150,
        temperature: 0.7
      })
    });

    const data = await response.json();
    
    if (data.error) {
      console.error("OpenAI API Error:", data.error);
      return "Error generating content. Please try again later.";
    }
    
    return data.choices[0].message.content.trim();
    
  } catch (error) {
    console.error("Error generating content:", error);
    return "Error generating content. Please try again later.";
  }
}

/**
 * Format the content for different platforms
 * @param {string} content - The raw generated content
 * @param {string} platform - Target platform (twitter, email, instagram)
 * @returns {string} - Formatted content
 */
function formatContentForPlatform(content, platform = "twitter") {
  const currentDate = new Date().toLocaleDateString();
  
  switch (platform) {
    case "email":
      return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #E63946; margin-bottom: 20px;">Your Daily Fitness Motivation</h2>
          <p style="font-size: 18px; line-height: 1.6; margin-bottom: 25px;">${content}</p>
          <p style="font-size: 14px; color: #777;">The Fitness Mentor - ${currentDate}</p>
        </div>
      `;
      
    case "instagram":
      return `${content}\n\n.\n.\n.\n#fitnessmotivation #strengthtraining #fitnessjourney #thefitnessmentor`;
      
    case "twitter":
    default:
      // Twitter (or default) - just return the content, it's already optimized for Twitter's character limit
      return content;
  }
}

/**
 * Main function to generate and format content
 * @param {string} contentType - Type of content to generate
 * @param {string} platform - Target platform
 * @returns {Promise<string>} - Formatted content
 */
async function createFitnessContent(contentType = "motivation", platform = "twitter") {
  const generatedContent = await generateContent(contentType);
  return formatContentForPlatform(generatedContent, platform);
}

// Example usage (for testing or Zapier setup)
async function exampleRun() {
  console.log("Generating motivation content for Twitter...");
  const twitterContent = await createFitnessContent("motivation", "twitter");
  console.log("TWITTER CONTENT:");
  console.log(twitterContent);
  console.log("\n-----------------------------------------\n");
  
  console.log("Generating workout tip content for Email...");
  const emailContent = await createFitnessContent("workoutTip", "email");
  console.log("EMAIL CONTENT:");
  console.log(emailContent);
}

// Make functions globally available
window.contentGenerator = {
  generateContent,
  formatContentForPlatform,
  createFitnessContent,
  exampleRun
};