// Draggable Nodes
const canvas = document.getElementById('canvas');
let isDragging = false;
let draggedNode = null;
let offsetX, offsetY;

// Handle node dragging
canvas.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('node')) {
        isDragging = true;
        draggedNode = e.target;
        offsetX = e.clientX - draggedNode.offsetLeft;
        offsetY = e.clientY - draggedNode.offsetTop;
        draggedNode.style.cursor = 'grabbing';
    }
});

canvas.addEventListener('mousemove', (e) => {
    if (isDragging && draggedNode) {
        draggedNode.style.left = `${e.clientX - offsetX}px`;
        draggedNode.style.top = `${e.clientY - offsetY}px`;
    }
});

canvas.addEventListener('mouseup', () => {
    isDragging = false;
    if (draggedNode) draggedNode.style.cursor = 'grab';
    draggedNode = null;
});

// Add new node
const addNodeBtn = document.getElementById('add-node-btn');
addNodeBtn.addEventListener('click', () => {
    const newNode = document.createElement('div');
    newNode.className = 'node';
    newNode.textContent = `Node ${canvas.children.length + 1}`;
    newNode.style.top = '50%';
    newNode.style.left = '50%';
    canvas.appendChild(newNode);
});

// Chatbox Interaction
const chatBox = document.getElementById('chat-box');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');

sendBtn.addEventListener('click', () => {
    const userMessage = chatInput.value.trim();
    if (userMessage) {
        // Add user message
        const userBubble = document.createElement('div');
        userBubble.className = 'chat-message user';
        userBubble.textContent = userMessage;
        chatBox.appendChild(userBubble);

        // Simulate bot response
        const botBubble = document.createElement('div');
        botBubble.className = 'chat-message bot';
        botBubble.textContent = `You said: "${userMessage}"`;
        chatBox.appendChild(botBubble);

        // Clear input and scroll to bottom
        chatInput.value = '';
        chatBox.scrollTop = chatBox.scrollHeight;
    }
});

// Footer Button Actions
document.querySelectorAll('.footer-btn').forEach((button) => {
    button.addEventListener('click', () => {
        const action = button.textContent.trim();
        alert(`${action} button clicked!`);
    });
});

// const chatBox = document.getElementById('chat-box');
// const chatInput = document.getElementById('chat-input');
// const sendBtn = document.getElementById('send-btn');

const botReplies = {
    hello: "Hi there! How can I help you?",
    homework: "I can assist you with your homework. Please provide details.",
    thanks: "You're welcome! Feel free to ask anything else.",
    default: "I'm not sure how to respond to that. Can you rephrase?",
};

// Function to get bot response based on user input
function getBotReply(userMessage) {
    userMessage = userMessage.toLowerCase(); // Normalize the input
    for (const keyword in botReplies) {
        if (userMessage.includes(keyword)) {
            return botReplies[keyword];
        }
    }
    return botReplies.default;
}

// Function to add a message bubble to the chatbox
function addMessageBubble(sender, message) {
    const bubble = document.createElement('div');
    bubble.className = `chat-message ${sender}`;
    bubble.textContent = message;
    chatBox.appendChild(bubble);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the latest message
}

// Function to handle sending messages
function handleSendMessage() {
    const userMessage = chatInput.value.trim();
    if (userMessage) {
        // Add user's message
        addMessageBubble('user', userMessage);

        // Generate and add bot's response
        const botMessage = getBotReply(userMessage);
        setTimeout(() => addMessageBubble('bot', botMessage), 500); // Add delay for realism

        // Clear input
        chatInput.value = '';
    }
}

// Event Listener for "Send" button click
sendBtn.addEventListener('click', handleSendMessage);

// Event Listener for "Enter" key press
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSendMessage();
    }
});