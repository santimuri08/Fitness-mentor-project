/**
 * The Fitness Mentor - Custom AI-Powered Chatbot
 * This chatbot uses OpenAI to provide intelligent fitness responses
 */

// Configuration
const OPENAI_API_KEY = "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"; // Replace with your actual OpenAI API key

// Chat UI elements
let chatContainer;
let chatMessages;
let chatInput;
let sendButton;
let chatWidget;
let chatToggle;

// Initialize the chatbot UI and functionality
function initChatbot() {
  createChatUI();
  setupEventListeners();
  
  // Display welcome message after a short delay
  setTimeout(() => {
    addBotMessage("👋 Hi there! I'm your AI fitness assistant. Ask me anything about workouts, nutrition, or fitness motivation!");
  }, 500);
}

// Create the chat UI elements
function createChatUI() {
  // Create chat toggle button
  chatToggle = document.createElement('div');
  chatToggle.className = 'chat-toggle';
  chatToggle.innerHTML = `
    <div class="chat-toggle-icon">💬</div>
  `;
  document.body.appendChild(chatToggle);
  
  // Create chat widget
  chatWidget = document.createElement('div');
  chatWidget.className = 'chat-widget';
  chatWidget.innerHTML = `
    <div class="chat-header">
      <div class="chat-title">The Fitness Mentor</div>
      <div class="chat-close">&times;</div>
    </div>
    <div class="chat-messages"></div>
    <div class="chat-input-container">
      <input type="text" class="chat-input" placeholder="Ask me about fitness...">
      <button class="chat-send">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 2L11 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
    <div class="chat-typing">
      <span></span>
      <span></span>
      <span></span>
    </div>
  `;
  document.body.appendChild(chatWidget);
  
  // Get UI elements
  chatMessages = document.querySelector('.chat-messages');
  chatInput = document.querySelector('.chat-input');
  sendButton = document.querySelector('.chat-send');
  
  // Add styles
  addChatStyles();
}

// Add CSS styles for chat interface
function addChatStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .chat-toggle {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 60px;
      height: 60px;
      background-color: #E63946;
      color: white;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 1000;
      transition: all 0.3s ease;
    }
    
    .chat-toggle:hover {
      transform: scale(1.05);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
    }
    
    .chat-toggle-icon {
      font-size: 24px;
    }
    
    .chat-widget {
      position: fixed;
      bottom: 90px;
      right: 20px;
      width: 350px;
      height: 500px;
      background-color: white;
      border-radius: 10px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      z-index: 1000;
      display: none;
      transition: all 0.3s ease;
    }
    
    .chat-widget.active {
      display: flex;
    }
    
    .chat-header {
      background-color: #E63946;
      color: white;
      padding: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: bold;
    }
    
    .chat-close {
      cursor: pointer;
      font-size: 20px;
    }
    
    .chat-messages {
      flex: 1;
      padding: 15px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    
    .message {
      max-width: 80%;
      padding: 10px 15px;
      border-radius: 18px;
      line-height: 1.4;
    }
    
    .message.user {
      background-color: #E6E6E6;
      color: #333;
      align-self: flex-end;
      border-bottom-right-radius: 4px;
    }
    
    .message.bot {
      background-color: #F1F1F1;
      color: #333;
      align-self: flex-start;
      border-bottom-left-radius: 4px;
    }
    
    .chat-input-container {
      display: flex;
      padding: 10px;
      border-top: 1px solid #E6E6E6;
    }
    
    .chat-input {
      flex: 1;
      border: 1px solid #DADADA;
      border-radius: 20px;
      padding: 10px 15px;
      font-size: 14px;
      outline: none;
    }
    
    .chat-send {
      background-color: transparent;
      border: none;
      margin-left: 10px;
      cursor: pointer;
      color: #E63946;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .chat-typing {
      display: none;
      padding: 10px 15px;
      color: #888;
      font-size: 12px;
      align-items: center;
      gap: 3px;
    }
    
    .chat-typing.active {
      display: flex;
    }
    
    .chat-typing span {
      width: 5px;
      height: 5px;
      background-color: #888;
      border-radius: 50%;
      animation: typing 1s infinite ease-in-out;
    }
    
    .chat-typing span:nth-child(2) {
      animation-delay: 0.2s;
    }
    
    .chat-typing span:nth-child(3) {
      animation-delay: 0.4s;
    }
    
    @keyframes typing {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-5px);
      }
    }
    
    @media (max-width: 480px) {
      .chat-widget {
        width: calc(100% - 40px);
        height: 60vh;
      }
    }
  `;
  document.head.appendChild(style);
}

// Set up event listeners
function setupEventListeners() {
  // Toggle chat visibility
  chatToggle.addEventListener('click', () => {
    chatWidget.classList.add('active');
    chatInput.focus();
  });
  
  // Close chat
  document.querySelector('.chat-close').addEventListener('click', () => {
    chatWidget.classList.remove('active');
  });
  
  // Send message on button click
  sendButton.addEventListener('click', sendMessage);
  
  // Send message on enter key
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
}

// Add a message from the user to the chat
function addUserMessage(message) {
  const msgElement = document.createElement('div');
  msgElement.className = 'message user';
  msgElement.textContent = message;
  chatMessages.appendChild(msgElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Add a message from the bot to the chat
function addBotMessage(message) {
  const msgElement = document.createElement('div');
  msgElement.className = 'message bot';
  msgElement.textContent = message;
  chatMessages.appendChild(msgElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Show typing indicator
function showTyping() {
  document.querySelector('.chat-typing').classList.add('active');
}

// Hide typing indicator
function hideTyping() {
  document.querySelector('.chat-typing').classList.remove('active');
}

// Send a message and get AI response
function sendMessage() {
  const message = chatInput.value.trim();
  if (!message) return;
  
  // Add user message to chat
  addUserMessage(message);
  
  // Clear input
  chatInput.value = '';
  
  // Show typing indicator
  showTyping();
  
  // Get AI response
  getFitnessResponse(message)
    .then(response => {
      // Hide typing indicator
      hideTyping();
      
      // Add bot message to chat
      addBotMessage(response);
    })
    .catch(error => {
      console.error('Error getting AI response:', error);
      hideTyping();
      addBotMessage("Sorry, I'm having trouble connecting. Please try again later.");
    });
}

// Get response from OpenAI API
async function getFitnessResponse(message) {
  // For demo purposes, if no API key is set, return predefined responses
  if (OPENAI_API_KEY === "YOUR_OPENAI_API_KEY") {
    return getFallbackResponse(message);
  }
  
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { 
            role: "system", 
            content: "You are a fitness coach assistant for 'The Fitness Mentor' website. Provide helpful, motivational, and scientifically accurate responses to fitness questions. Keep answers concise (under 3 sentences if possible) but informative. If you don't know something, suggest speaking with a certified trainer. Your tone is encouraging and energetic."
          },
          { 
            role: "user", 
            content: message
          }
        ],
        max_tokens: 150,
        temperature: 0.7
      })
    });

    const data = await response.json();
    
    if (data.error) {
      console.error("OpenAI API Error:", data.error);
      return "I'm having trouble connecting to my knowledge base. Please try again later or consider booking a consultation for personalized advice!";
    }
    
    return data.choices[0].message.content.trim();
    
  } catch (error) {
    console.error("Error:", error);
    return "I'm having trouble connecting to my knowledge base. Please try again later or consider booking a consultation for personalized advice!";
  }
}

// Fallback responses if no API key is available
function getFallbackResponse(message) {
  const msg = message.toLowerCase();
  
  // Fitness questions
  if (msg.includes("workout") || msg.includes("exercise") || msg.includes("training")) {
    return "For effective workouts, focus on compound movements, progressive overload, and consistency. I recommend starting with 3-4 sessions per week combining strength training and cardio. Would you like more specific advice?";
  }
  
  if (msg.includes("nutrition") || msg.includes("diet") || msg.includes("food") || msg.includes("eat")) {
    return "Nutrition is 80% of your fitness results! Focus on whole foods, adequate protein (1.6-2.2g per kg bodyweight), and staying hydrated. Consistency matters more than perfection.";
  }
  
  if (msg.includes("lose weight") || msg.includes("weight loss") || msg.includes("fat loss")) {
    return "Sustainable weight loss combines a small caloric deficit (300-500 calories/day), strength training to preserve muscle, and consistent cardio. Focus on habits you can maintain long-term rather than extreme approaches.";
  }
  
  if (msg.includes("gain muscle") || msg.includes("build muscle") || msg.includes("bulk")) {
    return "Building muscle requires progressive overload (gradually increasing weight/reps), sufficient protein intake, a slight caloric surplus, and adequate recovery. Focus on compound movements and track your progress.";
  }
  
  if (msg.includes("motivation") || msg.includes("motivated") || msg.includes("inspire")) {
    return "Remember that motivation is temporary, but discipline lasts. Focus on your 'why' - the deeper reason behind your fitness journey. Create habits that make consistency easier, and celebrate small wins along the way!";
  }
  
  // Default response
  return "Thanks for your question! I can help with workout plans, nutrition advice, and fitness motivation. For personalized coaching, consider booking a consultation call through our website!";
}

// Initialize the chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', initChatbot);

// Export for global access if needed
window.fitnessChat = {
  initChatbot,
  sendMessage
};