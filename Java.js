const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

// Function to display timestamp
function getTime() {
  const now = new Date();
  return now.getHours() + ":" + String(now.getMinutes()).padStart(2, "0") + " PM";
}

// Load JSON responses
let responses = {};
fetch('responses.json')
  .then(res => res.json())
  .then(data => responses = data);

// Send message function
function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  // Display user message
  const userMessage = document.createElement('div');
  userMessage.classList.add('message', 'user-message');
  userMessage.textContent = text;
  chatMessages.appendChild(userMessage);

  userInput.value = '';
  chatMessages.scrollTop = chatMessages.scrollHeight;

  // Generate bot response
  setTimeout(() => {
    const botMessage = document.createElement('div');
    botMessage.classList.add('message', 'bot-message');
    botMessage.textContent = responses[text.toLowerCase()] || "I'm not sure about that. Can you ask something else?";
    
    const timeSpan = document.createElement('span');
    timeSpan.classList.add('timestamp');
    timeSpan.textContent = getTime();
    botMessage.appendChild(timeSpan);

    chatMessages.appendChild(botMessage);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 800);
}

// Event listeners
sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendMessage();
});

// Initialize timestamp for first bot message
document.getElementById('timeStamp').textContent = getTime();


