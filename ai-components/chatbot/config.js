/**
 * The Fitness Mentor - Chatbot Configuration
 * This file contains the configuration for Tidio or Chatbase chatbot
 */

// Affirmations for the chatbot to send daily
const MOTIVATIONAL_AFFIRMATIONS = [
    "You don't have to be extreme, just consistent. Every workout counts.",
    "Your only competition is the person you were yesterday.",
    "Small steps every day create big results over time.",
    "You're stronger than you think and capable of more than you know.",
    "Progress isn't always linear. Trust the process.",
    "What you do today shapes your tomorrow. Make it count.",
    "Your body achieves what your mind believes.",
    "Focus on progress, not perfection.",
    "Rest is not a sign of weakness, it's part of the process.",
    "You're building discipline that will change your life.",
    "Success is built on daily habits, not occasional heroic efforts.",
    "Every rep brings you closer to the person you want to become.",
    "It's okay to struggle. Growth happens outside your comfort zone.",
    "Your consistency will beat others' intensity.",
    "What you eat in private, you wear in public.",
    "The workout you're dreading is often the one you need most.",
    "Discomfort today builds strength for tomorrow.",
    "Victory belongs to those who show up day after day.",
    "Motivation gets you started. Discipline keeps you going.",
    "Every time you choose health, you're building your future.",
    "You're not too busy. You're prioritizing.",
    "The only bad workout is the one that didn't happen.",
    "You have more strength, energy and power than you know.",
    "Your health is an investment, not an expense.",
    "The moment you want to quit is the moment you need to keep pushing.",
    "Strength doesn't come from what you can do. It comes from overcoming what you thought you couldn't.",
    "Today's actions create tomorrow's results.",
    "Your body can stand almost anything. It's your mind you have to convince.",
    "The pain of discipline weighs ounces. The pain of regret weighs tons.",
    "Success is the sum of small efforts repeated day in and day out."
  ];
  
  // FAQ responses for common questions
  const FAQ_RESPONSES = {
    "workout_plan": "I offer personalized workout plans based on your goals, equipment access, and time availability. Would you like me to create a custom plan for you?",
    
    "nutrition": "Nutrition is a crucial component of fitness success. I recommend a balanced approach focusing on protein intake, adequate hydration, and whole foods. Would you like specific nutrition guidance?",
    
    "weight_loss": "Sustainable weight loss combines consistent exercise, caloric deficit, and patience. The key is finding activities you enjoy and a nutrition plan you can maintain long-term. Would you like more specific advice for your situation?",
    
    "muscle_gain": "Building muscle requires resistance training, caloric surplus, adequate protein (1.6-2.2g per kg of bodyweight), and proper recovery. Would you like a muscle-building program recommendation?",
    
    "beginner": "Welcome to your fitness journey! Start with 2-3 workouts per week focusing on full-body movements. Consistency is more important than intensity. Would you like a beginner-friendly program?",
    
    "motivation": "Finding your 'why' is crucial for long-term motivation. Identify deeper reasons beyond appearance - energy, longevity, mental health, or setting an example for others. What's your primary fitness motivation?",
    
    "injury": "I recommend consulting with a healthcare professional for injury-specific advice. Once cleared, we can develop a modified plan that works around your limitations while promoting recovery.",
    
    "equipment": "You can get great results with minimal equipment. Bodyweight exercises, resistance bands, and adjustable dumbbells offer excellent versatility. What equipment do you currently have access to?",
    
    "pricing": "My coaching packages start at $99/month for customized workout plans and $199/month for comprehensive plans with nutrition guidance and weekly check-ins. Would you like more details about a specific package?",
    
    "results": "Results vary based on consistency, starting point, and goals. With dedicated effort, visible changes typically begin within 4-6 weeks, with significant transformation in 3-6 months. What's your primary goal?"
  };
  
  /**
   * Configure Tidio chatbot
   * Documentation: https://www.tidio.com/help/chatbots/triggers-and-actions/custom-javascript-actions/
   */
  function configureTidioBot() {
    // This function would be called in your website to configure the Tidio bot
    // The actual implementation depends on Tidio's API
    
    // Example of how you might set up pre-chat messages
    if (window.tidioChatApi) {
      window.tidioChatApi.on("ready", function() {
        // Send welcome message after a short delay
        setTimeout(() => {
          window.tidioChatApi.messageFromOperator({
            content: getRandomAffirmation(),
            sender: "The Fitness Mentor Bot"
          });
          
          setTimeout(() => {
            window.tidioChatApi.messageFromOperator({
              content: "👋 Hi there! I'm your fitness assistant. Would you like today's motivation or help with something specific?",
              sender: "The Fitness Mentor Bot"
            });
          }, 1500);
        }, 2000);
      });
    }
  }
  
  /**
   * Get a random affirmation from the list
   */
  function getRandomAffirmation() {
    const randomIndex = Math.floor(Math.random() * MOTIVATIONAL_AFFIRMATIONS.length);
    return MOTIVATIONAL_AFFIRMATIONS[randomIndex];
  }
  
  /**
   * Get FAQ response based on keyword detection
   * @param {string} message - User message
   * @returns {string} - Bot response
   */
  function getFAQResponse(message) {
    const msg = message.toLowerCase();
    
    if (msg.includes("workout") || msg.includes("plan") || msg.includes("program")) {
      return FAQ_RESPONSES.workout_plan;
    }
    else if (msg.includes("nutrition") || msg.includes("diet") || msg.includes("food") || msg.includes("eat")) {
      return FAQ_RESPONSES.nutrition;
    }
    else if (msg.includes("lose weight") || msg.includes("weight loss") || msg.includes("fat loss")) {
      return FAQ_RESPONSES.weight_loss;
    }
    else if (msg.includes("gain muscle") || msg.includes("build muscle") || msg.includes("bulk") || msg.includes("strength")) {
      return FAQ_RESPONSES.muscle_gain;
    }
    else if (msg.includes("beginner") || msg.includes("starting") || msg.includes("new to")) {
      return FAQ_RESPONSES.beginner;
    }
    else if (msg.includes("motivation") || msg.includes("motivated") || msg.includes("inspire")) {
      return FAQ_RESPONSES.motivation;
    }
    else if (msg.includes("injury") || msg.includes("hurt") || msg.includes("pain")) {
      return FAQ_RESPONSES.injury;
    }
    else if (msg.includes("equipment") || msg.includes("gear") || msg.includes("home gym")) {
      return FAQ_RESPONSES.equipment;
    }
    else if (msg.includes("price") || msg.includes("cost") || msg.includes("pricing")) {
      return FAQ_RESPONSES.pricing;
    }
    else if (msg.includes("results") || msg.includes("how long") || msg.includes("how soon")) {
      return FAQ_RESPONSES.results;
    }
    else if (msg.includes("motivation") || msg.includes("inspire") || msg.includes("quote")) {
      return getRandomAffirmation();
    }
    
    // Default response if no keywords match
    return "Thanks for reaching out! Would you like to learn about my coaching services, get a motivational quote, or schedule a free consultation call?";
  }
  
  /**
   * Configure Chatbase bot
   * For use with OpenAI integration
   * https://www.chatbase.co/
   */
  function getChatbaseConfig() {
    return {
      botName: "The Fitness Mentor",
      welcomeMessage: "👋 Welcome to The Fitness Mentor! I'm your AI fitness assistant. Would you like today's motivation or help with a specific fitness question?",
      inputPlaceholder: "Ask me about workouts, nutrition, or motivation...",
      themeColor: "#E63946",
      systemPrompt: `You are an AI assistant for "The Fitness Mentor," a fitness coaching brand. 
      Your primary functions are:
      1. Provide motivational fitness affirmations
      2. Answer basic fitness and nutrition questions
      3. Recommend workout plans based on user goals
      4. Direct users to book a call with the coach for personalized plans
      
      Your tone is energetic, motivational but science-based. You're encouraging but don't make unrealistic promises.
      
      When asked about motivation, randomly select from these affirmations: ${MOTIVATIONAL_AFFIRMATIONS.join(" | ")}
      
      For specific training plans or nutrition advice, suggest booking a free consultation call.
      
      Always end interactions by asking if there's anything else you can help with.`,
    };
  }
  
  // Export for use in other files
  module.exports = {
    getRandomAffirmation,
    getFAQResponse,
    configureTidioBot,
    getChatbaseConfig,
    MOTIVATIONAL_AFFIRMATIONS,
    FAQ_RESPONSES
  };