// Main JavaScript for TechStart Digital Ecosystem - VERSION 2.1 (Fixed Quiz)

// Global variables
let currentSection = 'home';
let currentQuestion = 0;
let quizScore = 0;
let userAnswers = [];
let isLoggedIn = false;

// Debug flag
const DEBUG_QUIZ = true;

// Quiz questions and answers
const quizQuestions = [
    {
        question: "What is the primary purpose of JavaScript in web development?",
        options: [
            "Styling web pages",
            "Adding interactivity and dynamic behavior",
            "Creating database schemas",
            "Managing server configurations"
        ],
        correct: "B"
    },
    {
        question: "Which HTML tag is used to create a hyperlink?",
        options: [
            "<link>",
            "<a>",
            "<href>",
            "<url>"
        ],
        correct: "B"
    },
    {
        question: "What does CSS stand for?",
        options: [
            "Computer Style Sheets",
            "Cascading Style Sheets",
            "Creative Style Sheets",
            "Colorful Style Sheets"
        ],
        correct: "B"
    },
    {
        question: "Which method is used to add an element to the end of an array in JavaScript?",
        options: [
            "array.add()",
            "array.push()",
            "array.append()",
            "array.insert()"
        ],
        correct: "B"
    },
    {
        question: "What is the purpose of the <meta> tag in HTML?",
        options: [
            "To create a table",
            "To provide metadata about the document",
            "To create a form",
            "To insert an image"
        ],
        correct: "B"
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    loadProducts();
    setupEventListeners();
    
    // Initialize Google OAuth after a short delay to ensure the script is loaded
    setTimeout(() => {
        initializeGoogleAuth();
    }, 1000);
});

// Initialize application
function initializeApp() {
    console.log('TechStart Digital Ecosystem initialized');
    showSection('home');
}

// Setup event listeners
function setupEventListeners() {
    // Navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href').substring(1);
            showSection(target);
        });
    });
}

// Show specific section
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('hidden');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.remove('hidden');
        targetSection.classList.add('fade-in');
        currentSection = sectionId;
    }
    
    // Update navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    const activeLink = document.querySelector(`[href="#${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// SPT1 Functions - Profile Website Interactivity

// Animate skill bars
function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
    });
    
    // Show success message
    showNotification('Skills animated successfully!', 'success');
}

// Show contact form modal
function showContactForm() {
    const modal = document.getElementById('contactModal');
    modal.classList.remove('hidden');
    modal.classList.add('fade-in');
}

// Show resume modal
function showResume() {
    const modal = document.getElementById('resumeModal');
    modal.classList.remove('hidden');
    modal.classList.add('fade-in');
}

// Close resume modal
function closeResumeModal() {
    const modal = document.getElementById('resumeModal');
    modal.classList.add('hidden');
}

// Download resume
function downloadResume() {
    showNotification('Resume download started!', 'info');
    
    // In a real application, this would generate and download a PDF
    // For demo purposes, we'll just show a success message
    setTimeout(() => {
        showNotification('Resume downloaded successfully!', 'success');
    }, 1000);
}

// Show products section
function showProducts() {
    const productsSection = document.getElementById('spt1Products');
    productsSection.classList.remove('hidden');
    productsSection.classList.add('fade-in');
    
    // Load products if not already loaded
    if (document.getElementById('productsGrid').children.length === 0) {
        loadProductsFromData();
    }
    
    showNotification('Products section opened!', 'info');
}

// Close modal
function closeModal() {
    const modal = document.getElementById('contactModal');
    modal.classList.add('hidden');
    // Reset form
    document.getElementById('contactForm').reset();
    clearErrors();
}

// Change theme
function changeTheme() {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    showNotification(`Theme changed to ${isDark ? 'dark' : 'light'} mode`, 'info');
}

// Form validation
function validateForm(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    let isValid = true;
    
    // Clear previous errors
    clearErrors();
    
    // Validate name
    if (name.length < 2) {
        showError('nameError', 'Name must be at least 2 characters long');
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError('emailError', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate subject
    if (subject.length < 3) {
        showError('subjectError', 'Subject must be at least 3 characters long');
        isValid = false;
    }
    
    // Validate message
    if (message.length < 10) {
        showError('messageError', 'Message must be at least 10 characters long');
        isValid = false;
    }
    
    if (isValid) {
        showNotification('Message sent successfully! Shanael will get back to you soon.', 'success');
        closeModal();
    } else {
        showNotification('Please fix the errors above', 'error');
    }
}

// Show error message
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
    }
}

// Clear all errors
function clearErrors() {
    document.querySelectorAll('.error-message').forEach(error => {
        error.textContent = '';
    });
}

// WS101 Functions - Login and Quiz System

// Handle login
function handleLogin() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (email && password) {
        isLoggedIn = true;
        showNotification('Login successful!', 'success');
        showQuizSection();
    } else {
        showNotification('Please enter both email and password', 'error');
    }
}

// Handle Google OAuth response
function handleGoogleResponse(response) {
    console.log('Google OAuth Response:', response);
    
    if (response.credential) {
        // Decode the JWT token to get user information
        const payload = JSON.parse(atob(response.credential.split('.')[1]));
        console.log('User Info:', payload);
        
        // Store user information
        const userInfo = {
            name: payload.name,
            email: payload.email,
            picture: payload.picture,
            sub: payload.sub
        };
        
        // Store in localStorage for session management
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        
        isLoggedIn = true;
        showNotification(`Welcome ${userInfo.name}! Google login successful!`, 'success');
        showQuizSection();
        
        // Update UI with user info
        updateUserInterface(userInfo);
        
        // Show logout button
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.style.display = 'block';
        }
    } else {
        showNotification('Google login failed. Please try again.', 'error');
    }
}

// Update UI with user information
function updateUserInterface(userInfo) {
    // Update certificate name with real user name
    const certificateName = document.getElementById('certificateName');
    if (certificateName) {
        certificateName.textContent = userInfo.name;
    }
    
    // Update profile name if needed
    const profileName = document.querySelector('.profile-header h3');
    if (profileName) {
        profileName.textContent = userInfo.name;
    }
    
    // Update mobile app welcome message
    const mobileAppName = document.getElementById('appName');
    if (mobileAppName) {
        mobileAppName.placeholder = `Welcome ${userInfo.name}`;
    }
}

// Initialize Google OAuth when page loads
function initializeGoogleAuth() {
    if (typeof google !== 'undefined' && google.accounts) {
        google.accounts.id.initialize({
            client_id: '928220152911-2lu08vdacs7b9sna4hhdvatt1bkeesu1.apps.googleusercontent.com',
            callback: handleGoogleResponse
        });
        
        // Check if user is already logged in
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            const user = JSON.parse(userInfo);
            isLoggedIn = true;
            updateUserInterface(user);
            
            // Show logout button
            const logoutBtn = document.getElementById('logoutBtn');
            if (logoutBtn) {
                logoutBtn.style.display = 'block';
            }
        }
    }
}

// Show quiz section
function showQuizSection() {
    const quizSection = document.getElementById('quizSection');
    quizSection.classList.remove('hidden');
    quizSection.classList.add('fade-in');
    
    // Reset quiz
    currentQuestion = 0;
    quizScore = 0;
    userAnswers = [];
    loadQuestion();
}

// Load quiz question
function loadQuestion() {
    const question = quizQuestions[currentQuestion];
    
    document.getElementById('questionText').textContent = question.question;
    
    const options = document.querySelectorAll('.option-btn');
    options.forEach((btn, index) => {
        btn.textContent = `${String.fromCharCode(65 + index)}) ${question.options[index]}`;
        btn.classList.remove('selected');
        btn.disabled = false;
    });
    
    // Update progress
    const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
    document.getElementById('quizProgress').style.width = `${progress}%`;
    document.getElementById('progressText').textContent = `Question ${currentQuestion + 1} of ${quizQuestions.length}`;
    
    // Update buttons
    document.getElementById('nextBtn').disabled = true;
    if (currentQuestion === quizQuestions.length - 1) {
        document.getElementById('nextBtn').style.display = 'none';
        document.getElementById('submitBtn').style.display = 'inline-block';
    } else {
        document.getElementById('nextBtn').style.display = 'inline-block';
        document.getElementById('submitBtn').style.display = 'none';
    }
}

// Select option - VERSION 2.1 (Fixed - No auto-advance, No answer reveal)
function selectOption(button, option) {
    if (DEBUG_QUIZ) {
        console.log('=== QUIZ DEBUG ===');
        console.log('selectOption called with option:', option);
        console.log('Current question:', currentQuestion);
        console.log('Button clicked:', button);
    }
    
    // Remove previous selection
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('selected', 'correct', 'incorrect');
    });
    
    // Select current option
    button.classList.add('selected');
    userAnswers[currentQuestion] = option;
    
    // Enable next button
    const nextBtn = document.getElementById('nextBtn');
    if (nextBtn) {
        nextBtn.disabled = false;
    }
    
    // Show simple confirmation without revealing answer
    showNotification('Answer selected! Click Next to continue.', 'info');
    
    if (DEBUG_QUIZ) {
        console.log('Answer stored:', userAnswers);
        console.log('Next button enabled, NO AUTO-ADVANCE');
        console.log('=== END DEBUG ===');
    }
    
    // EXPLICITLY PREVENT ANY AUTO-ADVANCE
    // No setTimeout, no automatic nextQuestion calls
    return false;
}

// Next question
function nextQuestion() {
    if (currentQuestion < quizQuestions.length - 1) {
        currentQuestion++;
        loadQuestion();
    }
}

// Submit quiz
function submitQuiz() {
    // Calculate score
    quizScore = 0;
    userAnswers.forEach((answer, index) => {
        if (answer === quizQuestions[index].correct) {
            quizScore++;
        }
    });
    
    const percentage = Math.round((quizScore / quizQuestions.length) * 100);
    
    // Show final question with correct answers highlighted
    showFinalQuestionWithAnswers();
    
    // Show score after a brief delay
    setTimeout(() => {
        showScore(percentage);
    }, 2000);
}

// Show final question with correct answers highlighted
function showFinalQuestionWithAnswers() {
    const question = quizQuestions[currentQuestion];
    
    document.getElementById('questionText').textContent = question.question;
    
    const options = document.querySelectorAll('.option-btn');
    options.forEach((btn, index) => {
        btn.textContent = `${String.fromCharCode(65 + index)}) ${question.options[index]}`;
        btn.classList.remove('selected', 'correct', 'incorrect');
        btn.disabled = true;
        
        const btnOption = String.fromCharCode(65 + index);
        const correctAnswer = question.correct;
        const userAnswer = userAnswers[currentQuestion];
        
        // Mark correct answer
        if (btnOption === correctAnswer) {
            btn.classList.add('correct');
        }
        
        // Mark user's answer if it was wrong
        if (btnOption === userAnswer && userAnswer !== correctAnswer) {
            btn.classList.add('incorrect');
        }
        
        // Mark user's answer if it was correct
        if (btnOption === userAnswer && userAnswer === correctAnswer) {
            btn.classList.add('selected');
        }
    });
    
    // Update progress to show completion
    document.getElementById('quizProgress').style.width = '100%';
    document.getElementById('progressText').textContent = `Question ${currentQuestion + 1} of ${quizQuestions.length} - Review`;
    
    // Hide navigation buttons
    document.getElementById('nextBtn').style.display = 'none';
    document.getElementById('submitBtn').style.display = 'none';
    
    // Show feedback for this question
    const userAnswer = userAnswers[currentQuestion];
    const correctAnswer = question.correct;
    const isCorrect = userAnswer === correctAnswer;
    
    if (isCorrect) {
        showNotification('This answer was correct!', 'success');
    } else {
        showNotification(`This answer was incorrect. The correct answer is ${correctAnswer}.`, 'error');
    }
}

// Show score
function showScore(score) {
    const scoreSection = document.getElementById('scoreSection');
    scoreSection.classList.remove('hidden');
    scoreSection.classList.add('fade-in');
    
    // Get user name from localStorage or use default
    const userInfo = localStorage.getItem('userInfo');
    const userName = userInfo ? JSON.parse(userInfo).name : 'Shanael Angelyn Orodio';
    
    document.getElementById('scoreName').textContent = userName;
    document.getElementById('scorePercentage').textContent = score;
    document.getElementById('scoreCorrect').textContent = quizScore;
    document.getElementById('scoreTotal').textContent = quizQuestions.length;
    
    // Show appropriate message based on score
    let message = '';
    if (score >= 90) {
        message = 'Excellent! Outstanding performance!';
    } else if (score >= 80) {
        message = 'Great job! Well done!';
    } else if (score >= 70) {
        message = 'Good work! Keep it up!';
    } else if (score >= 60) {
        message = 'Not bad! Room for improvement.';
    } else {
        message = 'Keep studying! You can do better!';
    }
    
    document.getElementById('scoreMessage').textContent = message;
    
    showNotification(`Quiz completed! Score: ${score}%`, 'success');
}

// Show certificate
function showCertificate(score) {
    const certificateSection = document.getElementById('certificateSection');
    certificateSection.classList.remove('hidden');
    certificateSection.classList.add('fade-in');
    
    // Get user name from localStorage or use default
    const userInfo = localStorage.getItem('userInfo');
    const userName = userInfo ? JSON.parse(userInfo).name : 'Shanael Angelyn Orodio';
    
    document.getElementById('certificateName').textContent = userName;
    document.getElementById('certificateDate').textContent = new Date().toLocaleDateString();
    document.getElementById('certificateScore').textContent = score;
    
    showNotification(`Certificate generated! Score: ${score}%`, 'success');
}

// Download certificate
function downloadCertificate() {
    showNotification('Certificate download started!', 'info');
    
    // In a real application, this would generate and download a PDF
    // For demo purposes, we'll just show a success message
    setTimeout(() => {
        showNotification('Certificate downloaded successfully!', 'success');
    }, 1000);
}

// Retake quiz
function retakeQuiz() {
    // Reset quiz state
    currentQuestion = 0;
    quizScore = 0;
    userAnswers = [];
    
    // Hide score and certificate sections
    document.getElementById('scoreSection').classList.add('hidden');
    document.getElementById('certificateSection').classList.add('hidden');
    
    // Show quiz section
    document.getElementById('quizSection').classList.remove('hidden');
    
    // Reload first question
    loadQuestion();
    
    showNotification('Quiz restarted! Good luck!', 'info');
}

// Toggle password visibility
function togglePassword() {
    const passwordInput = document.getElementById('loginPassword');
    const toggleButton = document.querySelector('.password-toggle i');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleButton.className = 'fas fa-eye-slash';
    } else {
        passwordInput.type = 'password';
        toggleButton.className = 'fas fa-eye';
    }
}

// SPT2 Functions - Mobile App Prototype

// Switch between app screens
function switchScreen(screenNumber) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show target screen
    const targetScreen = document.getElementById(`screen${screenNumber}`);
    if (targetScreen) {
        targetScreen.classList.add('active');
        targetScreen.classList.add('slide-in');
    }
}

// Submit signup form
function submitSignup() {
    const name = document.getElementById('appName').value;
    const email = document.getElementById('appEmail').value;
    const password = document.getElementById('appPassword').value;
    
    if (name && email && password) {
        showNotification(`Welcome ${name}! Your data has been submitted to the database.`, 'success');
        
        // Reset form
        document.getElementById('appName').value = '';
        document.getElementById('appEmail').value = '';
        document.getElementById('appPassword').value = '';
        
        // Switch back to home screen
        setTimeout(() => {
            switchScreen(1);
        }, 1500);
    } else {
        showNotification('Please fill in all fields', 'error');
    }
}

// Logout function
function logout() {
    // Clear user data
    localStorage.removeItem('userInfo');
    isLoggedIn = false;
    
    // Hide quiz section
    const quizSection = document.getElementById('quizSection');
    if (quizSection) {
        quizSection.classList.add('hidden');
    }
    
    // Reset to default profile
    const profileName = document.querySelector('.profile-header h3');
    if (profileName) {
        profileName.textContent = 'Shanael Angelyn Orodio';
    }
    
    // Reset mobile app placeholder
    const mobileAppName = document.getElementById('appName');
    if (mobileAppName) {
        mobileAppName.placeholder = 'Full Name';
    }
    
    // Hide logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.style.display = 'none';
    }
    
    showNotification('Logged out successfully!', 'info');
}

// Product filtering
function filterProducts(category) {
    const products = document.querySelectorAll('.product-card');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Update active filter button
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Filter products
    products.forEach(product => {
        const productCategory = product.getAttribute('data-category');
        if (category === 'all' || productCategory === category) {
            product.style.display = 'block';
            product.classList.add('fade-in');
        } else {
            product.style.display = 'none';
        }
    });
}

// Load products from XML/JSON
function loadProducts() {
    // This would typically load from an external XML/JSON file
    // For demo purposes, we'll create sample products
    const products = [
        {
            id: 1,
            title: "Web Development Package",
            description: "Complete web development solution with modern frameworks",
            price: "$2,999",
            category: "web",
            image: "fas fa-code",
            tags: ["HTML", "CSS", "JavaScript", "React"]
        },
        {
            id: 2,
            title: "Mobile App Development",
            description: "Cross-platform mobile app development using React Native",
            price: "$3,499",
            category: "mobile",
            image: "fas fa-mobile-alt",
            tags: ["React Native", "iOS", "Android", "Cross-platform"]
        },
        {
            id: 3,
            title: "API Integration Service",
            description: "RESTful API development and third-party integrations",
            price: "$1,999",
            category: "api",
            image: "fas fa-plug",
            tags: ["REST API", "Node.js", "Express", "MongoDB"]
        },
        {
            id: 4,
            title: "E-commerce Solution",
            description: "Complete e-commerce platform with payment integration",
            price: "$4,999",
            category: "web",
            image: "fas fa-shopping-cart",
            tags: ["E-commerce", "Payment", "Inventory", "Analytics"]
        },
        {
            id: 5,
            title: "Cloud Migration",
            description: "Migrate your applications to cloud platforms",
            price: "$2,499",
            category: "api",
            image: "fas fa-cloud",
            tags: ["AWS", "Azure", "Google Cloud", "DevOps"]
        },
        {
            id: 6,
            title: "UI/UX Design",
            description: "Modern user interface and experience design",
            price: "$1,799",
            category: "web",
            image: "fas fa-paint-brush",
            tags: ["Figma", "Adobe XD", "Prototyping", "User Research"]
        }
    ];
    
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Create product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-category', product.category);
    
    card.innerHTML = `
        <div class="product-image">
            <i class="${product.image}"></i>
        </div>
        <h3 class="product-title">${product.title}</h3>
        <p class="product-description">${product.description}</p>
        <div class="product-price">${product.price}</div>
        <div class="product-tags">
            ${product.tags.map(tag => `<span class="product-tag">${tag}</span>`).join('')}
        </div>
    `;
    
    return card;
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 3000);
}

// Get notification icon based on type
function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// Get notification color based on type
function getNotificationColor(type) {
    const colors = {
        success: '#28a745',
        error: '#dc3545',
        warning: '#ffc107',
        info: '#17a2b8'
    };
    return colors[type] || '#17a2b8';
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
`;
document.head.appendChild(style);
