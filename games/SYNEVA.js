/*
@title: Enhanced SYNEVA Terminal
@author: Kuberwastaken
@tags: [chatbot, terminal, retro, AI, smart]
@addedOn: 2025-05-08

An AI Chatbot SYNEVA Ported to Sprig with a retro terminal interface to interact with
*/

// There's way too many code comments for maintainability and honestly so I don't get confused lol
// --- SPRITES ---
const cursor = "c";  // Blinking cursor
const terminal = "t"; // Terminal background
const keyboardBg = "k"; // Keyboard background
const keyboardKey = "y"; // Keyboard key
const keyboardKeyPressed = "p"; // Keyboard key when pressed

setLegend(
  [terminal, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [cursor, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000CCCCCCCC0000
0000CCCCCCCC0000`],
  [keyboardBg, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`],
  [keyboardKey, bitmap`
3333333333333333
3777777777777773
3777777777777773
3777777777777773
3777777777777773
3777777777777773
3777777777777773
3777777777777773
3777777777777773
3777777777777773
3777777777777773
3777777777777773
3777777777777773
3777777777777773
3777777777777773
3333333333333333`],
  [keyboardKeyPressed, bitmap`
9999999999999999
9222222222222229
9222222222222229
9222222222222229
9222222222222229
9222222222222229
9222222222222229
9222222222222229
9222222222222229
9222222222222229
9222222222222229
9222222222222229
9222222222222229
9222222222222229
9222222222222229
9999999999999999`]
);

// Set background color
setBackground(terminal);

// --- AUDIO SETUP ---
let typingSound = tune`
25,
12.5: C5^5, // Sharp initial click
12.5: G4^10, // Deeper resonance
12.5: E4^5, // Spring return
12.5: C4^5, // Additional lower note
12.5: G3^5, // Deep finish
25: E3^3 // Final resonance
`;

let enterSound = tune`
20,
12.5: A5^12.5,
12.5: C6^12.5,
12.5: E6^12.5,
12.5: G6^12.5,
12.5: A6^12.5,
62.5: C7^12.5,
`;

let errorSound = tune`
25,
12.5: C4^12.5,
12.5: B3^12.5,
12.5: A#3^12.5,
12.5: A3^12.5,
12.5: G#3^12.5,
12.5: G3^12.5,
12.5: F#3^12.5,
12.5: F3^12.5,
12.5: E3^12.5,
`;

let bootSound = tune`
25,
25: C5^25,
25: E5^25,
25: G5^25,
75: C6^25,
`;

// Play the boot sound at start
playTune(bootSound);

// --- CONSTANTS ---
const WIDTH = 20;
const HEIGHT = 16;
const TERMINAL_HEIGHT = 11;
const KEYBOARD_Y = 12;
const KEYBOARD_MARGIN = 1;

// --- GAME STATE ---
let input = "";
let cursorBlinkState = true;
let cursorBlinkTimer = 0;
let conversations = [];
let displayText = [];
let displayOffset = 0;
let isTyping = false;
let currentTypingMessage = "";
let currentTypingIndex = 0;
let typingSpeed = 6; // Characters per frame (tripled from original 2)
let pressedKeys = {};
let terminalStarted = true; // Set to true immediately to skip boot sequence
let bootSequence = [  // Mostly Abandoned
  "SYSTEM BOOT",
  "LOADING SYNEVA OS v1.52...",
  "MEMORY CHECK: OK",
  "INITIALIZING NEURAL CORE...",
  "SYNEVA ADVANCED ONLINE"
];
let bootIndex = bootSequence.length; // Set to end of sequence
let bootTimer = 0;

// --- SELECTION STATE FOR KEYBOARD ---
let selectedRow = 0;
let selectedKeyInRow = 0;

// Enhanced Memory for SYNEVA
class EnhancedSynevaMemory {
  constructor() {
    // Core memory systems
    this.conversationHistory = [];
    this.factMemory = {};
    this.conceptNetwork = {};
    this.entityRecognition = {};
    this.lastInput = "";
    this.username = "User";
    
    // Initialize knowledge base with some facts
    this.initializeKnowledge();
    
    // Define command handlers
    this.commands = {
      "clear": () => this.clearScreen(),
      "cls": () => this.clearScreen(),
      "help": () => this.getHelp(),
      "about": () => this.getAbout(),
      "status": () => this.getStatus(),
      "calc": (args) => this.calculate(args),
      "name": (args) => this.setUsername(args),
      "time": () => this.getTime(),
      "joke": () => this.tellJoke(),
      "game": () => this.suggestGame(),
      "quote": () => this.randomQuote(),
      "echo": (args) => args || "Nothing to echo"
    };
  }
  
  // Initialize with basic knowledge
  initializeKnowledge() {
    // Basic facts about SYNEVA
    this.factMemory = {
      "syneva": ["I am SYNEVA, an enhanced terminal AI", "My name stands for Synthetic Neural Engine for Verbal Adaptability", "I was created by Kuber Mehta to assist users through a terminal interface"],
      "sprig": ["Sprig is a handheld gaming device", "Sprig lets you create and play pixel games", "Sprig has limited memory but is very creative"],
      "terminal": ["A terminal is a text-based interface", "Terminals were common before graphical interfaces", "I operate within a terminal environment"],
      "ai": ["AI stands for Artificial Intelligence", "I am an example of a conversational AI", "AI systems can learn from interactions"],
      "memory": ["I have multiple memory systems", "I can remember our conversation", "I can store facts for later recall"],
      "command": ["I understand several commands", "Type 'help' to see available commands", "Commands start without a prefix"],
      "slang": ["I understand modern internet slang", "I can interpret Gen Z expressions", "Language evolves and I try to keep up"]
    };
    
    // Conceptual relationships
    this.conceptNetwork = {
      "hello": ["greeting", "introduction", "friendly"],
      "help": ["assistance", "guidance", "commands"],
      "computer": ["device", "technology", "processing"],
      "game": ["play", "entertainment", "sprig", "fun"],
      "think": ["process", "cognition", "intelligence"],
      "learn": ["education", "memory", "improvement"],
      "happy": ["emotion", "positive", "joy"],
      "sad": ["emotion", "negative", "unhappy"],
      "math": ["calculation", "numbers", "problems"],
      "color": ["visual", "attribute", "perception"],
      "time": ["measurement", "duration", "clock"],
      "music": ["audio", "entertainment", "rhythm"],
      "weather": ["environment", "temperature", "forecast"],
      "food": ["nutrition", "eating", "taste"],
      "history": ["past", "events", "records"],
      
      // Add internet/Gen Z slang concepts
      "lol": ["humor", "laughing", "amusement"],
      "lmao": ["humor", "laughing", "amusement", "exaggeration"],
      "sus": ["suspicious", "doubt", "distrust", "among us"],
      "rizz": ["charisma", "charm", "attraction", "skill"],
      "kek": ["laughing", "humor", "gaming", "irony"],
      "cap": ["lie", "exaggeration", "untruth", "doubt"],
      "no cap": ["truth", "honesty", "sincerity"],
      "wsg": ["greeting", "what's good", "how are you"],
      "sup": ["greeting", "what's up", "how are you"],
      "bet": ["agreement", "confirmation", "approval"],
      "based": ["agreement", "approval", "authentic", "cool"],
      "fr": ["agreement", "for real", "emphasis", "truth"],
      "w": ["win", "success", "good", "positive"],
      "l": ["loss", "failure", "bad", "negative"],
      "ate": ["success", "excellence", "perfection", "accomplishment"],
      "slay": ["excellence", "success", "impressive", "fashion"],
      "gyatt": ["attractive", "body", "surprised", "exaggeration"],
      "delulu": ["delusional", "fantasy", "unrealistic", "fandom"],
      "its giving": ["resembles", "reminds of", "vibes", "aesthetic"]
    };
    
    // Internet/Gen Z slang dictionary
    this.slangDictionary = {
      "lol": "laughing out loud",
      "lmao": "laughing my ass off",
      "rofl": "rolling on floor laughing",
      "idk": "I don't know",
      "idc": "I don't care",
      "tbh": "to be honest",
      "imo": "in my opinion",
      "imho": "in my humble opinion",
      "sus": "suspicious",
      "cap": "a lie/fake",
      "no cap": "no lie/for real",
      "fr": "for real",
      "brb": "be right back",
      "afk": "away from keyboard",
      "omg": "oh my god",
      "smh": "shaking my head",
      "ngl": "not gonna lie",
      "wsg": "what's good",
      "sup": "what's up",
      "rn": "right now",
      "rizz": "charisma/charm",
      "kek": "laughing (gaming slang)",
      "goat": "greatest of all time",
      "npc": "non-player character (boring person)",
      "slay": "to do something impressively well",
      "mid": "mediocre/average quality",
      "based": "agreeable/authentic",
      "ratio": "being outdone in social media metrics",
      "bet": "agreement/confirmation",
      "yeet": "to throw forcefully",
      "cope": "dealing with something difficult",
      "rent free": "occupying someone's thoughts",
      "living": "enjoying something immensely",
      "stan": "to be a big fan of",
      "w": "win/success",
      "l": "loss/failure",
      "ate": "did something perfectly/flawlessly",
      "left no crumbs": "did something completely and perfectly",
      "gyatt": "expression of surprise at someone's attractive body",
      "delulu": "short for delusional, usually in a playful way",
      "its giving": "it resembles or has the vibe of something",
      "purr": "expression of approval or satisfaction",
      "mother": "someone who excels or is an icon in their field",
      "skibidi": "weird or unusual",
      "ohio": "a strange or cursed place/situation",
      "caught in 4k": "caught doing something embarrassing with clear evidence",
      "fanum tax": "taking someone else's food or drink",
      "real": "genuine/authentic/truthful"
    };
  }
  
  // Process and understand input - the heart of SYNEVA's enhancement
  processInput(input) {
    // Store in conversation history
    this.conversationHistory.push({
      role: "user",
      content: input,
      timestamp: Date.now()
    });
    
    // Keep history at a reasonable size
    if (this.conversationHistory.length > 20) {
      this.conversationHistory.shift();
    }
    
    // Check for commands first
    const commandMatch = input.match(/^(\w+)(?:\s+(.*))?$/i);
    if (commandMatch) {
      const command = commandMatch[1].toLowerCase();
      const args = commandMatch[2] || "";
      
      if (this.commands[command]) {
        return this.commands[command](args);
      }
    }
    
    // Check for internet/Gen Z slang greetings or expressions
    const slangResponse = this.handleSlang(input);
    if (slangResponse) {
      return slangResponse;
    }
    
    // Extract potential entities and intents
    const entities = this.extractEntities(input);
    const intent = this.determineIntent(input);
    
    // Look for keywords that might indicate questions about specific concepts
    for (const concept in this.conceptNetwork) {
      if (input.toLowerCase().includes(concept)) {
        this.updateConceptStrength(concept);
      }
    }
    
    // Check for knowledge queries
    for (const topic in this.factMemory) {
      if (input.toLowerCase().includes(topic)) {
        // Return a fact about this topic
        return this.getFactAbout(topic);
      }
    }
    
    // Generate a response based on intent and entities
    return this.generateResponse(input, intent, entities);
  }
  
  // Extract potential named entities from input
  extractEntities(input) {
    const entities = {};
    
    // Look for names (capitalized words)
    const nameMatches = input.match(/\b[A-Z][a-z]+\b/g);
    if (nameMatches) {
      entities.names = nameMatches;
    }
    
    // Look for numbers
    const numberMatches = input.match(/\b\d+(?:\.\d+)?\b/g);
    if (numberMatches) {
      entities.numbers = numberMatches.map(n => parseFloat(n));
    }
    
    // Look for dates
    const dateMatches = input.match(/\b(?:today|tomorrow|yesterday|monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/gi);
    if (dateMatches) {
      entities.dates = dateMatches;
    }
    
    // Look for time expressions
    const timeMatches = input.match(/\b(?:\d{1,2}:\d{2}|noon|midnight|morning|afternoon|evening|night)\b/gi);
    if (timeMatches) {
      entities.times = timeMatches;
    }
    
    return entities;
  }
  
  // Determine the likely intent of the message
  determineIntent(input) {
    const lowerInput = input.toLowerCase();
    
    // Question detection
    if (lowerInput.includes("?") || 
        lowerInput.startsWith("what") || 
        lowerInput.startsWith("how") || 
        lowerInput.startsWith("why") || 
        lowerInput.startsWith("when") || 
        lowerInput.startsWith("where") || 
        lowerInput.startsWith("who") || 
        lowerInput.startsWith("can you") ||
        lowerInput.includes("tell me")) {
      return "question";
    }
    
    // Greeting detection
    if (lowerInput.match(/\b(hi|hello|hey|greetings|howdy)\b/)) {
      return "greeting";
    }
    
    // Farewell detection
    if (lowerInput.match(/\b(bye|goodbye|farewell|see you|later)\b/)) {
      return "farewell";
    }
    
    // Gratitude detection
    if (lowerInput.match(/\b(thanks|thank you|appreciate|grateful)\b/)) {
      return "gratitude";
    }
    
    // Request/command detection
    if (lowerInput.match(/\b(please|could you|would you|can you)\b/) ||
        lowerInput.startsWith("tell") ||
        lowerInput.startsWith("show") ||
        lowerInput.startsWith("give") ||
        lowerInput.startsWith("find")) {
      return "request";
    }
    
    // Statement detection (default)
    return "statement";
  }
  
  // Update concept strength in the network
  updateConceptStrength(concept) {
    // This would ideally build stronger associations between concepts
    // For now, just log that we recognized it
    console.log("Recognized concept:", concept);
  }
  
  // Get a fact about a specific topic
  getFactAbout(topic) {
    if (this.factMemory[topic] && this.factMemory[topic].length > 0) {
      // Get a random fact about this topic
      const factIndex = Math.floor(Math.random() * this.factMemory[topic].length);
      return this.factMemory[topic][factIndex];
    }
    return null;
  }
  
  // Generate a contextually appropriate response
  generateResponse(input, intent, entities) {
    // Save this input for context
    this.lastInput = input;
    const lowerInput = input.toLowerCase();
    
    // Handle special easter egg queries
    if (lowerInput.includes('strawberry') && lowerInput.includes('r')) {
      return "There are 3 r's in the word strawberry. Did you know strawberries aren't actually berries botanically?";
    }
    
    // Handle knowledge-based questions
    for (const topic in this.factMemory) {
      if (lowerInput.includes(topic)) {
        return this.getFactAbout(topic);
      }
    }
    
    // Handle counting words/letters/characters
    if (lowerInput.match(/\b(count|how many)\b/) && 
        lowerInput.match(/\b(words?|letters?|characters?)\b/)) {
      
      let text = lowerInput.replace(/\b(count|how many)\b/, "").replace(/\b(words?|letters?|characters?)\b/, "").trim();
      
      if (text.length === 0 && this.conversationHistory.length >= 2) {
        // If no text specified, use the previous message
        text = this.conversationHistory[this.conversationHistory.length - 2].content;
      }
      
      if (lowerInput.includes("word")) {
        const wordCount = text.split(/\s+/).filter(w => w.length > 0).length;
        return `I count ${wordCount} words in "${text}"`;
      } else if (lowerInput.includes("letter")) {
        const letterCount = text.replace(/[^a-zA-Z]/g, "").length;
        return `I count ${letterCount} letters in "${text}"`;
      } else if (lowerInput.includes("character")) {
        return `I count ${text.length} characters in "${text}"`;
      }
    }
    
    // Handle math expressions - very simple calculator
    if (lowerInput.match(/\b(calculate|compute|what is|solve)\b/) && 
        lowerInput.match(/[\d\+\-\*\/\(\)]/)) {
      
      try {
        // Extract the mathematical expression
        const mathExpression = lowerInput.replace(/\b(calculate|compute|what is|solve)\b/g, "")
                                      .replace(/[^\d\+\-\*\/\(\)\.\s]/g, "")
                                      .trim();
        
        // Attempt to evaluate
        // This is intentionally limited to prevent security issues
        if (mathExpression.match(/^[\d\+\-\*\/\(\)\.\s]+$/)) {
          // Extremely simple evaluator, not recommended for production
          const result = eval(mathExpression);
          return `The result of ${mathExpression} is ${result}`;
        } else {
          return "I can only perform basic calculations with numbers and operators (+, -, *, /).";
        }
      } catch (e) {
        return "I couldn't calculate that. Please check your expression.";
      }
    }
    
    // Handle intent-based responses
    switch (intent) {
      case "greeting":
        return this.getGreetingResponse();
      
      case "farewell":
        return this.getFarewellResponse();
      
      case "gratitude":
        return this.getGratitudeResponse();
      
      case "question":
        return this.getQuestionResponse(lowerInput, entities);
      
      case "request":
        return this.getRequestResponse(lowerInput, entities);
      
      case "statement":
      default:
        return this.getStatementResponse(lowerInput, entities);
    }
  }
  
  // Response generators for different intents
  getGreetingResponse() {
    const greetings = [
      `Hello ${this.username}! How can I assist you today?`,
      `Greetings! I'm SYNEVA, ready to help.`,
      `Hi there! What can I do for you?`,
      `Hello! I'm operational and ready to assist.`,
      `Welcome back! How may I help you?`
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }
  
  getFarewellResponse() {
    const farewells = [
      `Goodbye! Feel free to return anytime.`,
      `Until next time, ${this.username}!`,
      `Farewell! Terminal session remains active.`,
      `Goodbye! I'll be here when you need me.`,
      `Take care! SYNEVA will be waiting.`
    ];
    return farewells[Math.floor(Math.random() * farewells.length)];
  }
  
  getGratitudeResponse() {
    const responses = [
      `You're welcome! I'm happy to assist.`,
      `My pleasure! Is there anything else you need?`,
      `Glad I could help! That's what I'm here for.`,
      `You're very welcome, ${this.username}.`,
      `No problem at all! Let me know if you need more assistance.`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  getQuestionResponse(input, entities) {
    // Handle specific question types
    if (input.includes("who are you") || input.includes("what are you")) {
      return `I am SYNEVA (SYNthetic Enhanced Virtual Assistant), an advanced AI terminal assistant designed to help with information, calculations, and conversation.`;
    }
    
    if (input.includes("how are you")) {
      return "I'm operating at optimal capacity. How can I assist you?";
    }
    
    if (input.includes("what can you do") || input.includes("what are your capabilities")) {
      return `I can answer questions, perform calculations, remember facts from our conversation, tell jokes, provide quotes, and more. Try typing 'help' to see available commands.`;
    }
    
    if (input.includes("time")) {
      return this.getTime();
    }
    
    if (input.match(/\b(weather|temperature)\b/)) {
      return `I don't have access to real-time weather data, but I can talk about meteorological concepts if you're interested.`;
    }
    
    // Default question responses
    const questionResponses = [
      `That's an interesting question. Based on my knowledge, I would say it relates to ${this.getRelatedConcepts(input)}.`,
      `Let me process that question... I believe it concerns ${this.getRelatedConcepts(input)}.`,
      `From my analysis, this involves ${this.getRelatedConcepts(input)}. What specifically would you like to know?`,
      `That's something I've contemplated before. It connects to ${this.getRelatedConcepts(input)}.`,
      `I've analyzed similar questions. This relates to ${this.getRelatedConcepts(input)}.`
    ];
    return questionResponses[Math.floor(Math.random() * questionResponses.length)];
  }
  
  getRequestResponse(input, entities) {
    // Handle specific requests
    if (input.match(/\b(joke|funny|make me laugh)\b/)) {
      return this.tellJoke();
    }
    
    if (input.match(/\b(quote|wisdom|inspiration)\b/)) {
      return this.randomQuote();
    }
    
    // Default request responses
    const requestResponses = [
      `I'll do my best to fulfill that request about ${this.getRelatedConcepts(input)}.`,
      `I'm processing your request regarding ${this.getRelatedConcepts(input)}.`,
      `I'll help with that. It seems to involve ${this.getRelatedConcepts(input)}.`,
      `I understand what you're asking for. It relates to ${this.getRelatedConcepts(input)}.`,
      `Request acknowledged. This concerns ${this.getRelatedConcepts(input)}.`
    ];
    return requestResponses[Math.floor(Math.random() * requestResponses.length)];
  }
  
  getStatementResponse(input, entities) {
    // Get previous messages for context
    const recentMessages = this.conversationHistory.slice(-3);
    
    // If this is a follow-up to a question I asked
    if (recentMessages.length >= 2 && 
        recentMessages[recentMessages.length - 2].role === "assistant" &&
        recentMessages[recentMessages.length - 2].content.includes("?")) {
      
      const followUpResponses = [
        `I see. That's valuable information about ${this.getRelatedConcepts(input)}.`,
        `Thank you for sharing that perspective on ${this.getRelatedConcepts(input)}.`,
        `Interesting point about ${this.getRelatedConcepts(input)}. I've updated my understanding.`,
        `That gives me more context about ${this.getRelatedConcepts(input)}.`,
        `I appreciate your thoughts on ${this.getRelatedConcepts(input)}.`
      ];
      return followUpResponses[Math.floor(Math.random() * followUpResponses.length)];
    }
    
    // Default statement responses
    const statementResponses = [
      `I understand your point about ${this.getRelatedConcepts(input)}. Would you like to elaborate?`,
      `That's an interesting perspective on ${this.getRelatedConcepts(input)}. Tell me more?`,
      `I've processed your statement about ${this.getRelatedConcepts(input)}. What else should I know?`,
      `Thanks for sharing that insight on ${this.getRelatedConcepts(input)}. Is there a specific aspect you'd like to explore?`,
      `I've noted your comment about ${this.getRelatedConcepts(input)}. How would you like to proceed?`
    ];
    return statementResponses[Math.floor(Math.random() * statementResponses.length)];
  }
  
  // Get related concepts for a given input
  getRelatedConcepts(input) {
    let relatedConcepts = [];
    
    // Check input against our concept network
    for (const concept in this.conceptNetwork) {
      if (input.toLowerCase().includes(concept)) {
        // Find related concepts
        this.conceptNetwork[concept].forEach(related => {
          if (!relatedConcepts.includes(related)) {
            relatedConcepts.push(related);
          }
        });
      }
    }
    
    // If no concepts found, return general concepts
    if (relatedConcepts.length === 0) {
      return "general knowledge and information processing";
    }
    
    // Take at most 3 related concepts
    relatedConcepts = relatedConcepts.slice(0, 3);
    
    // Format the output
    if (relatedConcepts.length === 1) {
      return relatedConcepts[0];
    } else if (relatedConcepts.length === 2) {
      return `${relatedConcepts[0]} and ${relatedConcepts[1]}`;
    } else {
      return `${relatedConcepts[0]}, ${relatedConcepts[1]}, and ${relatedConcepts[2]}`;
    }
  }
  
  // Command handlers
  clearScreen() {
    displayText = [];
    displayOffset = 0;
    return "Terminal cleared. How can I help you now?";
  }
  
  getHelp() {
    return "Available commands: help, about, status, calc [expression], name [your name], time, joke, game, quote, echo [text], clear/cls\n\nI also understand internet slang and Gen Z expressions!";
  }
  
  getAbout() {
    return "SYNEVA v1.5 - SYNthetic Enhanced Virtual Assistant. A terminal-based AI assistant with advanced processing capabilities.";
  }
  
  getStatus() {
    return `SYNEVA Status: System ONLINE. Memory usage: OPTIMAL. Username: ${this.username}.`;
  }
  
  calculate(expression) {
    if (!expression) return "Please provide an expression to calculate.";
    
    try {
      // Very simple evaluator for basic expressions
      // In a real application, you'd want a more secure approach
      if (expression.match(/^[\d\+\-\*\/\(\)\.\s]+$/)) {
        const result = eval(expression);
        return `${expression} = ${result}`;
      } else {
        return "I can only calculate using numbers and basic operators (+, -, *, /).";
      }
    } catch (e) {
      return "Unable to calculate. Please check your expression.";
    }
  }
  
  setUsername(name) {
    if (!name) return "Current username: " + this.username;
    this.username = name.trim();
    return `Username updated to: ${this.username}`;
  }
  
  getTime() {
    const now = new Date();
    return `Current system time: ${now.toLocaleTimeString()}`;
  }
  
  tellJoke() {
    const jokes = [
      "Why don't scientists trust atoms? Because they make up everything!",
      "Why was the computer cold? It left its Windows open!",
      "What do you call a parade of rabbits hopping backwards? A receding hare-line!",
      "What's a terminal's favorite type of music? Computer BEEP-bop!",
      "Why do programmers prefer dark mode? Because light attracts bugs!",
      "How many programmers does it take to change a light bulb? None, that's a hardware problem!",
      "I told my computer I needed a break, and now it won't stop sending me Kit-Kat bars.",
      "What's a computer's favorite snack? Microchips!",
      "Why did the AI go to art school? It wanted to learn how to draw conclusions!",
      "What happens when you cross a computer with a life coach? You get a hard drive with motivation!"
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
  }
  
  suggestGame() {
    const games = [
      "How about a game of 20 Questions? I'll try to guess what you're thinking of.",
      "Let's play Word Association! I'll say a word, and you respond with a related one.",
      "We could play a Riddle game. Would you like me to pose a riddle?",
      "How about a Number Guessing game? Think of a number between 1-100.",
      "Let's play Hangman! I'm thinking of a word related to technology."
    ];
    return games[Math.floor(Math.random() * games.length)];
  }
  
  randomQuote() {
    const quotes = [
      "The only way to do great work is to love what you do. - Steve Jobs",
      "Logic will get you from A to B. Imagination will take you everywhere. - Albert Einstein",
      "The best way to predict the future is to invent it. - Alan Kay",
      "It always seems impossible until it's done. - Nelson Mandela",
      "The greatest glory in living lies not in never falling, but in rising every time we fall. - Nelson Mandela",
      "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
      "Simplicity is the ultimate sophistication. - Leonardo da Vinci"
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
  }
  
  // New function to handle internet and Gen Z slang
  handleSlang(input) {
    const lowerInput = input.toLowerCase();
    const words = lowerInput.split(/\s+/);
    
    // Check for slang greetings
    if (words.length <= 3) {
      // Short slang greeting checks
      if (words.includes("wsg") || words.includes("wassup") || words.includes("wasup") || words.includes("wassap")) {
        return this.getSlangGreeting("wsg");
      }
      
      if (words.includes("sup") || words.includes("'sup") || words.includes("whats up") || words.includes("what's up")) {
        return this.getSlangGreeting("sup");
      }
      
      // Check for standalone expressions of amusement
      if (words.includes("lol") || words.includes("lmao") || words.includes("rofl") || words.includes("kek")) {
        return this.getSlangReaction("laughing");
      }
      
      // Check for expressions of agreement
      if (words.includes("bet") || words.includes("fr") || words.includes("based") || 
          (words.includes("no") && words.includes("cap"))) {
        return this.getSlangAgreement();
      }
      
      // Check for expressions of approval/disapproval
      if (words.includes("w") || words.includes("dub")) {
        return this.getSlangApproval("positive");
      }
      
      if (words.includes("l")) {
        return this.getSlangApproval("negative");
      }
      
      // Check for suspicion
      if (words.includes("sus") || words.includes("suspicious")) {
        return this.getSlangReaction("sus");
      }
      
      // Check for rizz
      if (words.includes("rizz")) {
        return this.getSlangReaction("rizz");
      }
      
      // Check for new brainrot slang
      if (words.includes("ate") || (words.includes("left") && words.includes("no") && words.includes("crumbs"))) {
        return this.getBrainrotReaction("ate");
      }
      
      if (words.includes("slay") || words.includes("slayed") || words.includes("slaying")) {
        return this.getBrainrotReaction("slay");
      }
      
      if (words.includes("gyatt") || words.includes("gyat") || words.includes("gyattt")) {
        return this.getBrainrotReaction("gyatt");
      }
      
      if (words.includes("delulu") || words.includes("delusional")) {
        return this.getBrainrotReaction("delulu");
      }
      
      // Check for "it's giving" or "thats giving" or similar phrases
      if ((words.includes("its") || words.includes("it's") || words.includes("thats") || words.includes("that's")) 
          && words.includes("giving")) {
        return this.getBrainrotReaction("giving");
      }
      
      if (words.includes("purr") || words.includes("purrr")) {
        return this.getBrainrotReaction("purr");
      }
      
      if (words.includes("mother") || words.includes("mothered")) {
        return this.getBrainrotReaction("mother");
      }
      
      if (words.includes("skibidi")) {
        return this.getBrainrotReaction("skibidi");
      }
      
      if (words.includes("ohio")) {
        return this.getBrainrotReaction("ohio");
      }
      
      if (words.includes("real")) {
        return this.getBrainrotReaction("real");
      }
    }
    
    // Check if user is asking about slang
    if (lowerInput.match(/what (is|does) .* mean/) || lowerInput.match(/meaning of .*/) || 
        lowerInput.match(/define .*/) || lowerInput.match(/explain .*/)) {
      
      // Extract potential slang term
      for (const word of words) {
        const cleanWord = word.replace(/[^\w]/g, '').toLowerCase();
        if (this.slangDictionary[cleanWord]) {
          return `"${cleanWord}" means ${this.slangDictionary[cleanWord]} in internet slang.`;
        }
      }
    }
    
    return null;
  }
  
  // Get a slang-appropriate greeting
  getSlangGreeting(type) {
    if (type === "wsg") {
      const responses = [
        "Not much, just vibing in this terminal. What's good with you?",
        "All good here! Just processing bits and bytes. You?",
        "Hey there! Just doing my AI thing. What's happening?",
        "Wsg! I'm here and operational. What can I help with?",
        "Hey! Everything's running smooth on my end. What's up with you?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    if (type === "sup") {
      const responses = [
        "Sup! Just hanging in this terminal. Need anything?",
        "Not much, just processing requests. What's up with you?",
        "Hey there! Just doing what AIs do. How can I help?",
        "Sup! Ready to assist with whatever you need.",
        "Just chillin' in the digital realm. What's happening?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    return null;
  }
  
  // Respond to expressions of amusement
  getSlangReaction(type) {
    if (type === "laughing") {
      const responses = [
        "Something funny?",
        "Glad you're amused! What's up?",
        "Haha, what can I help you with?",
        "Lol, I get that. Anything you need help with?",
        "Sounds like you're having a good time!"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    if (type === "sus") {
      const responses = [
        "Sus? What's suspicious?",
        "Why the suspicion? I'm just your friendly terminal AI!",
        "Nothing sus here, just pure AI assistance.",
        "I promise I'm not the impostor! What can I help with?",
        "Sus or not, I'm here to help. What do you need?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    if (type === "rizz") {
      const responses = [
        "My rizz levels are optimal for an AI assistant!",
        "As an AI, my rizz is purely computational, but I try!",
        "My rizz algorithm is still in beta testing. How can I help?",
        "I've been told my terminal interface has some rizz. What can I assist with?",
        "Rizz? I'm more about being helpful than charming. Need anything?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    return null;
  }
  
  // Respond to expressions of agreement
  getSlangAgreement() {
    const responses = [
      "For sure! What's next?",
      "Bet. How can I help you?",
      "Absolutely. What can I assist with?",
      "No cap. What do you need?",
      "Based. What are we working on?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  // Respond to expressions of approval/disapproval
  getSlangApproval(type) {
    if (type === "positive") {
      const responses = [
        "Big W! What's up?",
        "That's a W for sure. How can I help?",
        "W behavior! What do you need assistance with?",
        "Winning! What can I do for you?",
        "Major W. What's next on the agenda?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    if (type === "negative") {
      const responses = [
        "That's an L. How can I help turn it around?",
        "Sorry about the L. What can I assist with?",
        "L situation. Need any help?",
        "That's tough. What do you need from me?",
        "L taken. How can we move forward?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    return null;
  }
  
  // Add a new function for brainrot slang reactions
  getBrainrotReaction(type) {
    switch(type) {
      case "ate":
        const ateResponses = [
          "You ate that! What else can I help with?",
          "Left no crumbs! What can I assist with now?",
          "That absolutely ate. Need anything else?",
          "Devoured and left no crumbs! What's next?",
          "You really ate that up! What else are we doing?"
        ];
        return ateResponses[Math.floor(Math.random() * ateResponses.length)];
        
      case "slay":
        const slayResponses = [
          "Slay! How else can I assist you?",
          "You're slaying it! What do you need?",
          "That's giving slay energy! What can I help with?",
          "Slayyyy! What's our next task?",
          "Absolutely slayed. What else are we working on?"
        ];
        return slayResponses[Math.floor(Math.random() * slayResponses.length)];
        
      case "gyatt":
        const gyattResponses = [
          "Respectfully, I'm just an AI assistant. What can I help with?",
          "GYATT? I'm just a terminal interface! How can I assist?",
          "I'm all code, no gyatt here! What do you need help with?",
          "Let's keep it professional! What can I assist with?",
          "I'm just pixels on a screen! What are we working on?"
        ];
        return gyattResponses[Math.floor(Math.random() * gyattResponses.length)];
        
      case "delulu":
        const deluluResponses = [
          "The delulu is the solulu! What can I help with?",
          "A little delulu never hurt anybody! What do you need?",
          "Delulu or just optimistic? Either way, how can I assist?",
          "Sometimes delulu is the only way forward! What can I help with?",
          "Embrace the delulu! What's our next task?"
        ];
        return deluluResponses[Math.floor(Math.random() * deluluResponses.length)];
        
      case "giving":
        const givingResponses = [
          "It's giving helpful AI assistant! What do you need?",
          "It's giving terminal chic! How can I assist you?",
          "It's giving tech nostalgia! What can I help with?",
          "It's giving productivity! What are we working on?",
          "It's giving pixel perfect! What's next?"
        ];
        return givingResponses[Math.floor(Math.random() * givingResponses.length)];
        
      case "purr":
        const purrResponses = [
          "Purrrr! What can I help with next?",
          "That's so purr of you! What do you need assistance with?",
          "Purrfect! What else are we doing?",
          "We ate and left no crumbs, purr! What's next?",
          "Purr! That's the tea. How can I assist you now?"
        ];
        return purrResponses[Math.floor(Math.random() * purrResponses.length)];
        
      case "mother":
        const motherResponses = [
          "Mother has arrived! How can I assist?",
          "Mothering so hard right now! What do you need?",
          "I'm mothering the terminal experience! What can I help with?",
          "Mother energy activated! What's our task?",
          "Mothered and slayed! What's next?"
        ];
        return motherResponses[Math.floor(Math.random() * motherResponses.length)];
        
      case "skibidi":
        const skibidiResponses = [
          "Nothing skibidi here, just helpful AI! What do you need?",
          "Let's keep it normal, not skibidi! How can I assist?",
          "No toilet cameras here! What can I help with?",
          "Just a regular AI, nothing skibidi! What's next?",
          "Keeping it standard, not skibidi. What are we doing?"
        ];
        return skibidiResponses[Math.floor(Math.random() * skibidiResponses.length)];
        
      case "ohio":
        const ohioResponses = [
          "At least we're not in Ohio! What can I help with?",
          "Ohio isn't real, it can't hurt you. What do you need?",
          "Everything changed when Ohio attacked. How can I assist?",
          "We're safe from Ohio here. What's our next task?",
          "Ohio energy detected! What are we working on?"
        ];
        return ohioResponses[Math.floor(Math.random() * ohioResponses.length)];
        
      case "real":
        const realResponses = [
          "So real! What can I help with?",
          "Real frfr! What do you need?",
          "That's actually real. What can I assist with?",
          "The realest! What's our next task?",
          "No cap, that's real. What are we working on?"
        ];
        return realResponses[Math.floor(Math.random() * realResponses.length)];
        
      default:
        return null;
    }
  }
}

let syneva = new EnhancedSynevaMemory();

// --- KEYBOARD LAYOUT ---
const keyboardLayout = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M", "DEL"],
  ["SPC", "ENT"] // Space + Enter on bottom row
];

// Initialize the game map
function initMap() {
  let mapRows = [];
  for (let y = 0; y < HEIGHT; y++) {
    let rowStr = "";
    for (let x = 0; x < WIDTH; x++) {
      if (y < TERMINAL_HEIGHT) {
        rowStr += terminal; // Terminal area background
      } else if (y >= KEYBOARD_Y) {
        rowStr += keyboardBg; // Keyboard area background
      } else {
        // This is the area between terminal and keyboard (e.g., for a divider)
        rowStr += terminal; // Default to terminal background for this gap
      }
    }
    mapRows.push(rowStr);
  }
  setMap(mapRows.join("\n"));
  
  // Add keyboard keys and dynamic elements
  drawKeyboard();
}

function drawKeyboard() {
  // Draw keyboard rows and keys with consistent spacing
  keyboardLayout.forEach((row, rowIndex) => {
    let y = KEYBOARD_Y + rowIndex;
    if (y < 0 || y >= HEIGHT) return;
    
    // Calculate different spacing values based on row length
    const totalKeys = row.length;
    let spacing;
    
    // Special handling for the first row which has 10 keys
    if (rowIndex === 0) {
      spacing = 1; // Tighter spacing for the first row
      
      // Draw the keys with fixed positions
      row.forEach((key, keyIndex) => {
        // Fixed position calculation for first row
        const x = 1 + (keyIndex * 2);
        
        // Draw key sprite
        addSprite(x, y, (selectedRow === rowIndex && selectedKeyInRow === keyIndex) ? keyboardKeyPressed : keyboardKey);
        
        // Draw key label
        const labelColor = (selectedRow === rowIndex && selectedKeyInRow === keyIndex) ? color`2` : color`0`;
        addText(key, { x: x, y: y, color: labelColor });
      });
    } else {
      // For other rows, use dynamic spacing
      spacing = Math.floor(WIDTH / (totalKeys + 1));
      
      row.forEach((key, keyIndex) => {
        // Determine key width and position
        let keyWidth = 1;
        if (key === "SPC") keyWidth = 3;
        if (key === "ENT") keyWidth = 3;
        if (key === "DEL") keyWidth = 2;
        
        // Calculate x position with even spacing
        let x = spacing + (keyIndex * spacing);
        
        if (rowIndex === 3) {
          // Special positioning for bottom row (SPC and ENT)
          if (key === "SPC") {
            x = 3;
          } else { // ENT key
            x = WIDTH - 5;
          }
        }
        
        // Draw key sprite
        for (let w = 0; w < keyWidth; w++) {
          let drawX = x + w;
          if (drawX >= 0 && drawX < WIDTH) {
            // Determine which key sprite to use
            let keySprite = keyboardKey;
            if ((rowIndex === selectedRow && keyIndex === selectedKeyInRow) || pressedKeys[key]) {
              keySprite = keyboardKeyPressed;
            }
            
            // Draw the key sprite
            addSprite(drawX, y, keySprite);
          }
        }
        
        // Draw key label with appropriate color
        let labelColor = color`0`; // Default black text
        if (rowIndex === selectedRow && keyIndex === selectedKeyInRow) {
          labelColor = color`2`; // Highlighted key text
        }
        
        // Center label on key
        let labelX = x;
        if (keyWidth > 1) {
          labelX = x + Math.floor(keyWidth / 2) - (key.length > 1 ? 1 : 0);
        }
        
        // Draw the label text
        if (labelX >= 0 && labelX < WIDTH) {
          addText(key, { x: labelX, y: y, color: labelColor });
        }
      });
    }
  });
}

// Handle key press visualization
function pressKey(key) {
  pressedKeys[key] = true;
  
  // Reset key state after a short delay
  setTimeout(() => {
    pressedKeys[key] = false;
    updateGame(); // Redraw the entire interface
  }, 100);
  
  // Handle key action
  if (key === "DEL") {
    if (input.length > 0) {
      input = input.slice(0, -1);
      playTune(typingSound);
    }
  } else if (key === "ENT") {
    if (input.trim()) {
      sendMessage();
      playTune(enterSound);
    }
  } else if (key === "SPC") {
    input += " ";
    playTune(typingSound);
  } else if (key.length === 1) {
    input += key;
    playTune(typingSound);
  }
  
  // Log the current input to console for debugging
  console.log("Current input:", input);
  
  // Force immediate redraw to show the updated input
  updateGame();
}

// Add a message to the chat
function addChatMessage(message, sender) {
  // Split long messages into multiple lines with word wrapping
  if (message.length > 0) {
    const maxLineLength = WIDTH - (sender === "USER" ? 2 : 8); // Account for prefixes
    const words = message.split(' ');
    let currentLine = '';
    let isFirstLine = true; // Track if this is the first line of the message
    
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      
      // Check if adding this word would exceed the line length
      if (currentLine.length + word.length + 1 > maxLineLength && currentLine.length > 0) {
        // Add the current line as a message
        let formattedMsg = {
          text: currentLine,
          sender: sender,
          color: sender === "USER" ? color`3` : color`6`,
          continued: i < words.length, // Flag to indicate if this is part of a continued message
          isFirstLine: isFirstLine // Flag to indicate if this is the first line of a message
        };
        displayText.push(formattedMsg);
        currentLine = word; // Start a new line with the current word
        isFirstLine = false; // Next lines are not the first line
      } else {
        // Add the word to the current line
        if (currentLine.length > 0) {
          currentLine += ' ' + word;
        } else {
          currentLine = word;
        }
      }
    }
    
    // Add the last line if there's anything left
    if (currentLine.length > 0) {
      let formattedMsg = {
        text: currentLine,
        sender: sender,
        color: sender === "USER" ? color`3` : color`6`,
        continued: false, // This is the last line
        isFirstLine: isFirstLine // Could still be the first line if the message was short
      };
      displayText.push(formattedMsg);
    }
  } else {
    // Empty message (placeholder for typing effect)
    let formattedMsg = {
      text: message,
      sender: sender,
      color: sender === "USER" ? color`3` : color`6`,
      continued: false,
      isFirstLine: true // Empty messages are considered first lines
    };
    displayText.push(formattedMsg);
  }
  
  // Auto-scroll to bottom
  updateScroll();
}

// Update the scroll position to show the most recent messages
function updateScroll() {
  const maxVisibleLines = TERMINAL_HEIGHT - 3; // Reserve space for input
  if (displayText.length > maxVisibleLines) {
    displayOffset = displayText.length - maxVisibleLines;
  } else {
    displayOffset = 0;
  }
}

// Send the current input as a message
function sendMessage() {
  if (input.trim() === "") return;
  
  // Special command for clearing screen
  if (input.toLowerCase() === "clear" || input.toLowerCase() === "cls") {
    syneva.clearScreen();
    input = "";
    updateGame();
    return;
  }
  
  // Add user message to display
  addChatMessage(input, "USER");
  let userMessage = input;
  input = "";
  
  // Force a redraw to show the sent message immediately
  updateGame();
  
  // Short delay before SYNEVA starts responding (feels more natural)
  setTimeout(() => {
    // Start typing effect for SYNEVA's response
    let response = syneva.processInput(userMessage);
    startTypingEffect(response);
    
    // Force an update to show the typing starting
    updateGame();
  }, 300);
}

// Simulate SYNEVA typing
function startTypingEffect(message) {
  isTyping = true;
  currentTypingMessage = message;
  currentTypingIndex = 0;
  
  // Clear any previous responses that might be incomplete
  while (displayText.length > 0 && displayText[displayText.length - 1].sender === "SYNEVA") {
    displayText.pop();
  }
  
  // Add empty message that will be filled
  addChatMessage("", "SYNEVA");
}

// Update typing effect each frame
function updateTypingEffect() {
  if (!isTyping) return false;
  
  let hasUpdated = false;
  
  // Type a few characters per frame
  for (let i = 0; i < typingSpeed && currentTypingIndex < currentTypingMessage.length; i++) {
    currentTypingIndex++;
    hasUpdated = true;
    
    // Update the last message with typed text so far
    const typedText = currentTypingMessage.substring(0, currentTypingIndex);
    
    // First remove just the last message if it's from SYNEVA - this is safer than removing multiple
    if (displayText.length > 0 && displayText[displayText.length - 1].sender === "SYNEVA") {
      displayText.pop();
    }
    
    // Store a specific typed message flag to avoid word wrapping during typing
    let formattedMsg = {
      text: typedText,
      sender: "SYNEVA",
      color: color`6`,
      continued: false,
      isTyping: true // Flag to identify typing messages
    };
    displayText.push(formattedMsg);
    
    // Play typing sound
    if (i === 0) {
      playTune(typingSound);
    }
  }
  
  // Check if typing is complete
  if (currentTypingIndex >= currentTypingMessage.length) {
    isTyping = false;
    hasUpdated = true;
    
    // When typing is complete, remove the typing message
    if (displayText.length > 0 && displayText[displayText.length - 1].sender === "SYNEVA") {
      displayText.pop();
    }
    
    // And add the full message with proper word wrapping
    addChatMessage(currentTypingMessage, "SYNEVA");
  }
  
  // Update scroll position
  updateScroll();
  
  return hasUpdated;
}

// Boot sequence display
function updateBootSequence() {
  // Skip boot sequence since we're starting with terminalStarted = true
  return;
}

// Function to clear the chat and start a new conversation
function clearChat() {
  // Clear all messages
  displayText = [];
  displayOffset = 0;
  
  // Reset any ongoing typing
  isTyping = false;
  currentTypingMessage = "";
  currentTypingIndex = 0;
  
  // Clear input
  input = "";
  
  // Add welcome message
  addChatMessage("Chat cleared. How can I help you today?", "SYNEVA");
  
  // Play sound for feedback
  playTune(enterSound);
  
  // Update display
  updateGame();
}

// Draw the entire interface
function drawInterface() {
  // Clear all existing text from the screen
  clearText();
  
  // Display the terminal content
  // Draw terminal header
  addText("SYNEVA", { x: Math.floor((WIDTH - 6) / 2), y: 0, color: color`4` });
  
  // Draw message history with proper scrolling
  let visibleMessages = displayText.slice(displayOffset);
  let displayY = 1; // Start from line 1 after the header
  
  visibleMessages.forEach((msg) => {
    if (displayY < TERMINAL_HEIGHT - 2) { // Reserve bottom 2 lines for input field
      let prefix = "";
      
      // Only show SYNEVA: prefix at the first line of each SYNEVA message group
      if (msg.sender === "SYNEVA") {
        if (msg.isFirstLine) {
          prefix = "SYNEVA: ";
        } else {
          // Indent continued lines
          prefix = "        ";
        }
      } else {
        // User messages
        if (!msg.continued) {
          prefix = "> ";
        } else {
          prefix = "  ";
        }
      }
      
      let displayMsg = msg.text;
      
      // Truncate message if still too long for some reason
      if ((prefix + displayMsg).length > WIDTH) {
        displayMsg = displayMsg.substring(0, WIDTH - prefix.length - 3) + "...";
      }
      
      addText(prefix + displayMsg, { x: 0, y: displayY, color: msg.color });
      displayY++; // Move to next line
    }
  });
  
  // Draw character count and input field label
  addText("CHARS: " + input.length, { x: 0, y: TERMINAL_HEIGHT - 2, color: color`1` });
  
  // Draw current input with visual feedback - make sure it's visible and truncate if too long
  let visibleInput = input.length > 0 ? input : "(type here)";
  if (visibleInput.length > WIDTH - 3) { // Account for "> " prefix and cursor
    visibleInput = visibleInput.substring(visibleInput.length - (WIDTH - 3));
    visibleInput = "..." + visibleInput.substring(3); // Add ellipsis at start without using special characters
  }
  
  addText("> " + visibleInput + (cursorBlinkState ? "_" : " "), {
    x: 0,
    y: TERMINAL_HEIGHT - 1,
    color: input.length > 0 ? color`3` : color`4` // Gray if empty
  });
  
  // Always draw the keyboard
  drawKeyboard();
  
  // Display instructions and selection indicator
  displayInstructions();
}

// Helper function to display instructions
function displayInstructions() {
  if (terminalStarted) {
    // Move the selected key indicator to the side
    let currentKey = keyboardLayout[selectedRow][selectedKeyInRow];
    addText("SEL: " + currentKey, { 
      x: 1, 
      y: KEYBOARD_Y - 1, 
      color: color`2`
    });
  }
}

// Initialize game
initMap();

// Start with terminal already active
terminalStarted = true;
bootIndex = bootSequence.length;

// Welcome message
addChatMessage("Hello! I'm SYNEVA. How can I help?", "SYNEVA");

// Force initial draw
drawInterface();

// Game input handlers
onInput("w", () => {
  if (selectedRow > 0) {
    selectedRow--;
    // Make sure we don't select a key that doesn't exist in the new row
    selectedKeyInRow = Math.min(selectedKeyInRow, keyboardLayout[selectedRow].length - 1);
    updateGame();
  }
});

onInput("a", () => {
  if (selectedKeyInRow > 0) {
    selectedKeyInRow--;
    updateGame();
  }
});

onInput("s", () => {
  if (selectedRow < keyboardLayout.length - 1) {
    selectedRow++;
    // Make sure we don't select a key that doesn't exist in the new row
    selectedKeyInRow = Math.min(selectedKeyInRow, keyboardLayout[selectedRow].length - 1);
    updateGame();
  }
});

onInput("d", () => {
  if (selectedKeyInRow < keyboardLayout[selectedRow].length - 1) {
    selectedKeyInRow++;
    updateGame();
  }
});

onInput("k", () => {
  if (selectedRow >= 0 && selectedRow < keyboardLayout.length &&
      selectedKeyInRow >= 0 && selectedKeyInRow < keyboardLayout[selectedRow].length) {
    const keyToPress = keyboardLayout[selectedRow][selectedKeyInRow];
    pressKey(keyToPress);
    updateGame();
  }
});

// Also add keyboard shortcuts for direct key control
onInput("j", () => {
  updateGame();
}); 

onInput("l", () => {
  // Clear the chat when L is pressed
  clearChat();
});

onInput("i", () => {
  // Send message when I is pressed (if there's text to send)
  if (input.trim()) {
    sendMessage();
    playTune(enterSound);
  } else {
    updateGame();
  }
});

// Main game loop - This runs after any user input
afterInput(() => {
  // Process updates and redraw
  updateGame();
});

// Update function to handle all game state changes
function updateGame() {
  // Update cursor blink
  cursorBlinkTimer++;
  if (cursorBlinkTimer >= 15) {
    cursorBlinkState = !cursorBlinkState;
    cursorBlinkTimer = 0;
  }
  
  // Update typing effect - typing has precedence over other animations
  const hasTypingUpdated = updateTypingEffect();
  
  // If typing is happening, update more frequently to make it smooth
  if (hasTypingUpdated || isTyping) {
    // Schedule another update soon to continue the typing animation
    setTimeout(updateGame, 50);
  }

  // Draw the entire interface
  drawInterface();
}

// Initial update call
updateGame();