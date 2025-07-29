// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

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

    const originalImageSrc = personImg.src;
    const happyImageSrc = 'assets/person-happy.png'; 

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

    let selectedBubble = null;


    bubbles.forEach(bubble => {
        bubble.addEventListener('mouseenter', function() {
            const serviceKey = this.getAttribute('data-service');
            const service = serviceData[serviceKey];
            
            if (service && !selectedBubble) {
                personImg.src = happyImageSrc;

                detailTitle.textContent = service.title;
                detailDescription.textContent = service.description;
                serviceDetail.classList.remove('hidden');
                
                serviceDetail.style.opacity = '0';
                serviceDetail.style.transform = 'translateY(-40%)';
                setTimeout(() => {
                    serviceDetail.style.opacity = '1';
                    serviceDetail.style.transform = 'translateY(-50%)';
                }, 10);
            }
        });

        bubble.addEventListener('mouseleave', function() {
            if (!selectedBubble) {
                personImg.src = originalImageSrc;
                serviceDetail.classList.add('hidden');
            }
        });

        bubble.addEventListener('click', function() {
            const serviceKey = this.getAttribute('data-service');
            const service = serviceData[serviceKey];
            
            if (service) {
                if (selectedBubble === this) {
                    selectedBubble = null;
                    personImg.src = originalImageSrc;
                    serviceDetail.classList.add('hidden');
                } else {
                    selectedBubble = this;
                    personImg.src = happyImageSrc;
                    detailTitle.textContent = service.title;
                    detailDescription.textContent = service.description;
                    serviceDetail.classList.remove('hidden');
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

    const toggleButton = document.getElementById('toggle-form');
    const formContainer = document.getElementById('contact-form-container');
    const contactInfo = document.getElementById('contact-info');
    
    toggleButton.addEventListener('click', function() {
        contactInfo.classList.add('hidden');
        formContainer.classList.remove('hidden');
    });
    
    const toggleHours = document.getElementById('toggle-hours');
    const hoursTable = document.getElementById('hours-table');
    
    toggleHours.addEventListener('click', function() {
        hoursTable.classList.toggle('hidden');
        this.classList.toggle('rotated');
    });
    
    const today = new Date().getDay(); 
    const rows = hoursTable.querySelectorAll('tr');
    
    rows.forEach(row => row.classList.remove('today'));
    if (today >= 1 && today <= 6) { 
        rows[today - 1].classList.add('today'); 
    } else if (today === 0) { 
        rows[6].classList.add('today'); 
    }
});


document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    
    showContactMessage('Sending your message...', 'info');
    

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


function showContactMessage(text, type) {
    const messageElement = document.getElementById('contact-form-message');
    messageElement.textContent = text;
    messageElement.className = 'contact-form-message ' + type;
    messageElement.classList.remove('hidden');
    
    
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
        const serviceID = 'service_yhmgrsm'; 
        const templateID = 'template_dhf7go7'; 
        const userID = 'rk28zX0A7mwyuHIEy'; 
        
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('signup-email').value;
            signupSection.classList.add('form-hidden');
            showMessage('Sending confirmation email...', 'info');
            
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
        
        setTimeout(() => {
            signupMessage.classList.add('hidden');
            if (type === 'success' || type === 'error') {
                setTimeout(() => {
                    document.querySelector('.signup-section').classList.remove('form-hidden');
                }, 300);
            }
        }, 10000);
    }
});
