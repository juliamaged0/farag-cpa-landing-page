// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or respect OS preference
const savedTheme = localStorage.getItem('theme');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
    body.classList.add('dark-mode');
    themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        themeToggle.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggle.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    }
});

// Fade-in animation on scroll
const fadeElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

fadeElements.forEach(element => {
    observer.observe(element);
});

// Smooth scrolling for navigation links - Updated to include footer links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Service Interaction with Animated Bubbles - Updated for Hover and Click Effects
document.addEventListener('DOMContentLoaded', function() {
    const bubbles = document.querySelectorAll('.bubble');
    const personImg = document.getElementById('person-image');
    const serviceDetail = document.getElementById('service-detail');
    const detailTitle = document.getElementById('detail-title');
    const detailDescription = document.getElementById('detail-description');

    // Store original image source
    const originalImageSrc = personImg.src;
    const happyImageSrc = 'assets/person-happy.png'; // تأكدي من وجود هذه الصورة

    // Service data mapping
    const serviceData = {
        'full-accounting': {
            title: 'Full Accounting Services',
            description: 'PERFECTing FINANCIAL SERVICES for 10+ Years!'
        },
        'bookkeeping': {
            title: 'Bookkeeping',
            description: 'Handle all books\' records completely, accurate, and dependable.'
        },
        'payroll': {
            title: 'Payroll',
            description: 'Multi-State full Payroll Services and more!'
        },
        'tax-services': {
            title: 'Complete Tax Services',
            description: 'Business and Individual Tax Services, preparation of tax returns.'
        },
        'consulting': {
            title: 'Business & Individual Consulting',
            description: 'Find out more of what we can do for you!'
        },
        'company-formation': {
            title: 'Company Formation',
            description: 'Interested in starting a new business? Allow us to assist you in starting your own business!'
        }
    };

    // Track currently selected bubble
    let selectedBubble = null;

    // Add hover and click events to each bubble
    bubbles.forEach(bubble => {
        // Hover effect - temporary change
        bubble.addEventListener('mouseenter', function() {
            const serviceKey = this.getAttribute('data-service');
            const service = serviceData[serviceKey];
            
            if (service && !selectedBubble) {
                // Change person image to happy version
                personImg.src = happyImageSrc;
                
                // Show service details
                detailTitle.textContent = service.title;
                detailDescription.textContent = service.description;
                serviceDetail.classList.remove('hidden');
                
                // Optional: Add animation effect
                serviceDetail.style.opacity = '0';
                serviceDetail.style.transform = 'translateY(-40%)';
                setTimeout(() => {
                    serviceDetail.style.opacity = '1';
                    serviceDetail.style.transform = 'translateY(-50%)';
                }, 10);
            }
        });

        bubble.addEventListener('mouseleave', function() {
            // Only revert if no bubble is selected
            if (!selectedBubble) {
                // Revert to original image
                personImg.src = originalImageSrc;
                
                // Hide service details
                serviceDetail.classList.add('hidden');
            }
        });

        // Click effect - permanent change
        bubble.addEventListener('click', function() {
            const serviceKey = this.getAttribute('data-service');
            const service = serviceData[serviceKey];
            
            if (service) {
                // If clicking the same bubble, deselect it
                if (selectedBubble === this) {
                    selectedBubble = null;
                    personImg.src = originalImageSrc;
                    serviceDetail.classList.add('hidden');
                } else {
                    // Select new bubble
                    selectedBubble = this;
                    
                    // Change person image to happy version
                    personImg.src = happyImageSrc;
                    
                    // Show service details
                    detailTitle.textContent = service.title;
                    detailDescription.textContent = service.description;
                    serviceDetail.classList.remove('hidden');
                    
                    // Optional: Add animation effect
                    serviceDetail.style.opacity = '0';
                    serviceDetail.style.transform = 'translateY(-40%)';
                    setTimeout(() => {
                        serviceDetail.style.opacity = '1';
                        serviceDetail.style.transform = 'translateY(-50%)';
                    }, 10);
                }
            }
        });
    });

    // Contact Form Toggle
    const toggleButton = document.getElementById('toggle-form');
    const formContainer = document.getElementById('contact-form-container');
    const contactInfo = document.getElementById('contact-info');
    
    toggleButton.addEventListener('click', function() {
        // إخفاء معلومات الاتصال وإظهار النموذج
        contactInfo.classList.add('hidden');
        formContainer.classList.remove('hidden');
    });
    
    // Hours Toggle
    const toggleHours = document.getElementById('toggle-hours');
    const hoursTable = document.getElementById('hours-table');
    
    toggleHours.addEventListener('click', function() {
        hoursTable.classList.toggle('hidden');
        this.classList.toggle('rotated');
    });
    
    // Set today's date highlight dynamically
    const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const rows = hoursTable.querySelectorAll('tr');
    
    // Remove any existing 'today' class
    rows.forEach(row => row.classList.remove('today'));
    
    // Add 'today' class to the correct row (accounting for 0-based array and Monday being first)
    // 1 = Monday, 2 = Tuesday, ..., 6 = Saturday, 0 = Sunday
    if (today >= 1 && today <= 6) { // Monday to Saturday
        rows[today - 1].classList.add('today'); // -1 to account for 0-based array
    } else if (today === 0) { // Sunday
        rows[6].classList.add('today'); // Last row is Sunday
    }
});

// Contact Form Submission - Updated with better UI
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    
    // إظهار رسالة تحميل
    showContactMessage('Sending your message...', 'info');
    
    // Telegram Bot Configuration
    const TELEGRAM_BOT_TOKEN = '7991338108:AAGEPttiT1J6hvQwpPyE7hd8IVGA054Uwgw';
    const CHAT_ID = -1002869884013;
    
    const text = `📩 New Contact Form Submission:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`;
    
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    
    const data = {
        chat_id: CHAT_ID,
        text: text
    };
    
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            showContactMessage('✅ Thank you! Your message has been sent successfully.\n\nWe will get back to you as soon as possible.', 'success');
            document.getElementById('contact-form').reset();
        } else {
            return response.text().then(text => {
                throw new Error(`HTTP error! status: ${response.status}, message: ${text}`);
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showContactMessage(`❌ Sorry, there was an error sending your message. Please try again later.\n\nDetails: ${error.message}`, 'error');
    });
});

// Function to show contact form messages
function showContactMessage(text, type) {
    const messageElement = document.getElementById('contact-form-message');
    messageElement.textContent = text;
    messageElement.className = 'contact-form-message ' + type;
    messageElement.classList.remove('hidden');
    
    // إخفاء الرسالة تلقائياً بعد 10 ثوانٍ
    setTimeout(() => {
        messageElement.classList.add('hidden');
    }, 10000);
}

// Sign Up Form Handling (Using EmailJS) - Updated with better UI
document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signup-form');
    const signupMessage = document.getElementById('signup-message');
    const signupSection = document.querySelector('.signup-section');
    
    if (signupForm) {
        // استخدام المعلومات التي قدمتها
        const serviceID = 'service_yhmgrsm'; // Service ID من EmailJS
        const templateID = 'template_dhf7go7'; // Template ID الصحيح
        const userID = 'rk28zX0A7mwyuHIEy'; // Public Key/User ID من EmailJS
        
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('signup-email').value;
            
            // إخفاء النموذج وإظهار رسالة تحميل
            signupSection.classList.add('form-hidden');
            showMessage('Sending confirmation email...', 'info');
            
            // إعداد معلمات القالب
            const templateParams = {
                to_email: email,
                from_name: 'Farag & Associate CPA, INC',
                confirmation_link: 'https://yourwebsite.com/confirm?email=' + encodeURIComponent(email)
            };
            
            emailjs.send(serviceID, templateID, templateParams, userID)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    showMessage('✅ Thank you! Your confirmation email has been sent successfully.\n\nPlease check your inbox and click the confirmation link.', 'success');
                    signupForm.reset();
                }, function(error) {
                    console.error('FAILED...', error);
                    // إعادة إظهار النموذج في حالة الخطأ
                    signupSection.classList.remove('form-hidden');
                    let errorMessage = '❌ Sorry, there was an error sending the confirmation email. Please try again later.';
                    if (error.text) {
                        errorMessage += '\nDetails: ' + error.text;
                    } else if (error.message) {
                        errorMessage += '\nDetails: ' + error.message;
                    }
                    showMessage(errorMessage, 'error');
                });
        });
    }
    
    function showMessage(text, type) {
        const signupMessage = document.getElementById('signup-message');
        signupMessage.textContent = text;
        signupMessage.className = 'signup-message ' + type;
        signupMessage.classList.remove('hidden');
        
        // إخفاء الرسالة تلقائياً بعد 10 ثوانٍ
        setTimeout(() => {
            signupMessage.classList.add('hidden');
            // إعادة إظهار النموذج بعد إخفاء الرسالة
            if (type === 'success' || type === 'error') {
                setTimeout(() => {
                    document.querySelector('.signup-section').classList.remove('form-hidden');
                }, 300);
            }
        }, 10000);
    }
});