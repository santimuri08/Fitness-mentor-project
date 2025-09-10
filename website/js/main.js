/**
 * The Fitness Mentor - Main JavaScript
 * Handles all website functionality
 */

// Initialize mobile navigation
function initMobileNav() {
    const navToggle = document.createElement('div');
    navToggle.className = 'mobile-nav-toggle';
    navToggle.innerHTML = '<span></span><span></span><span></span>';
    
    const nav = document.querySelector('.nav .container');
    if (nav) {
      nav.prepend(navToggle);
      
      // Toggle mobile navigation
      navToggle.addEventListener('click', function() {
        document.body.classList.toggle('nav-open');
        this.classList.toggle('active');
      });
    }
  }
  
  // Handle Motivation Signup Form
  function handleMotivationSignup() {
    const form = document.getElementById('motivation-signup');
    
    if (form) {
      form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const email = form.querySelector('input[type="email"]').value;
        
        // Show success message
        const button = form.querySelector('button');
        const originalText = button.textContent;
        
        button.textContent = 'Sending...';
        
        // Simulate API call
        setTimeout(() => {
          button.textContent = 'Success! ✓';
          button.style.backgroundColor = '#4CAF50';
          
          // Store email in localStorage
          localStorage.setItem('motivationEmail', email);
          
          // Reset form after delay
          setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = '';
            form.reset();
          }, 3000);
        }, 1500);
        
        // Here you would normally send this to your backend or a service like Mailchimp
        console.log('Motivation signup:', email);
      });
    }
  }
  
  // Load random motivational quotes in the content examples section
  function loadRandomQuotes() {
    const contentCards = document.querySelectorAll('.content-card .quote');
    
    if (contentCards.length && window.MOTIVATIONAL_AFFIRMATIONS) {
      // Copy the array to avoid modifying the original
      const affirmations = [...window.MOTIVATIONAL_AFFIRMATIONS];
      
      // Shuffle the array to get random quotes
      for (let i = affirmations.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [affirmations[i], affirmations[j]] = [affirmations[j], affirmations[i]];
      }
      
      // Update the content cards with random quotes
      contentCards.forEach((card, index) => {
        if (affirmations[index]) {
          card.textContent = `"${affirmations[index]}"`;
        }
      });
    }
  }
  
  // Add smooth scrolling for anchor links
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
  }
  
  // Handle Tidio Chat integration
  function initTidioChat() {
    // The actual Tidio script is loaded in index.html
    // This function can be used for additional configuration
    
    // Example of listening for Tidio events
    document.addEventListener('tidioChat-ready', function() {
      console.log('Tidio Chat is ready');
      
      // You can open the chat programmatically
      const chatButtons = document.querySelectorAll('.open-chat');
      chatButtons.forEach(button => {
        button.addEventListener('click', function(e) {
          e.preventDefault();
          if (window.tidioChatApi) {
            window.tidioChatApi.open();
          }
        });
      });
    });
  }
  
  // Initialize everything when DOM is loaded
  document.addEventListener('DOMContentLoaded', function() {
    // Load affirmations from the config if available
    window.MOTIVATIONAL_AFFIRMATIONS = window.MOTIVATIONAL_AFFIRMATIONS || [];
    
    // Initialize features
    initMobileNav();
    handleMotivationSignup();
    loadRandomQuotes();
    initSmoothScroll();
    initTidioChat();
    
    console.log('The Fitness Mentor website initialized!');
  });