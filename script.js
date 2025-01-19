// Course details object
const courseDetails = {
    adca: {
        title: 'Advanced Diploma in Computer Applications (ADCA)',
        duration: '12 months',
        price: '₹10,000',
        details: [
            'Complete computer fundamentals',
            'MS Office (Word, Excel, PowerPoint)',
            'Tally with GST',
            'Web development basics',
            'DTP and basic designing',
            'Professional certification included'
        ]
    },
    dca: {
        title: 'Diploma in Computer Applications (DCA)',
        duration: '6 months',
        price: '₹4,500',
        details: [
            'Computer basics',
            'MS Office suite',
            'Internet fundamentals',
            'Email and communication',
            'Basic typing skills',
            'Professional certification included'
        ]
    },
    ccc: {
        title: 'Course on Computer Concepts (CCC)',
        duration: '3 months',
        price: '₹3,500',
        details: [
            'Basic computer operations',
            'MS Office essentials',
            'Internet basics',
            'Email basics',
            'Digital literacy',
            'Professional certification included'
        ]
    },
    cpp: {
        title: 'C & C++ Programming',
        duration: '4 months',
        price: '₹4,000',
        details: [
            'C programming fundamentals',
            'C++ and OOP concepts',
            'Data structures',
            'Project development',
            'Problem-solving skills',
            'Professional certification included'
        ]
    },
    python: {
        title: 'Python Programming',
        duration: '3 months',
        price: '₹3,500',
        details: [
            'Python basics',
            'Object-oriented programming',
            'Web frameworks introduction',
            'Database connectivity',
            'Basic projects',
            'Professional certification included'
        ]
    },
    tally: {
        title: 'Tally with GST',
        duration: '3 months',
        price: '₹4,000',
        details: [
            'Basic accounting concepts',
            'Tally fundamentals',
            'GST implementation',
            'Financial reports',
            'Practical training',
            'Professional certification included'
        ]
    },
    olevel: {
        title: 'O Level',
        duration: '12 months',
        price: '₹12,000',
        details: [
            'IT fundamentals',
            'Programming concepts',
            'Database management',
            'Web technologies',
            'System design',
            'Professional certification included'
        ]
    },
    typing: {
        title: 'Professional Typing Course',
        duration: 'Monthly',
        price: '₹500/month',
        details: [
            'Touch typing techniques',
            'Speed building exercises',
            'Accuracy improvement',
            'Professional typing methods',
            'Regular practice sessions',
            'Professional certification included'
        ]
    },
    java: {
        title: 'Java Programming',
        duration: '3 months',
        price: '₹4,000',
        details: [
            'Core Java concepts',
            'Object-oriented programming',
            'GUI development',
            'Database connectivity',
            'Project development',
            'Professional certification included'
        ]
    }
};

// Initialize AOS (Animate on Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// Modal functionality
function openCourseModal(courseId) {
    const modal = document.getElementById('courseModal');
    const modalContent = document.getElementById('modalContent');
    const course = courseDetails[courseId];
    
    if (!course) return;

    const detailsList = course.details.map(detail => `<li>${detail}</li>`).join('');
    
    modalContent.innerHTML = `
        <h2>${course.title}</h2>
        <div class="course-highlights">
            <div class="highlight">
                <span class="highlight-label">Duration:</span>
                <span class="highlight-value">${course.duration}</span>
            </div>
            <div class="highlight">
                <span class="highlight-label">Price:</span>
                <span class="highlight-value">${course.price}</span>
            </div>
        </div>
        <div class="course-details">
            <h3>Course Features:</h3>
            <ul>${detailsList}</ul>
        </div>
        <div class="enrollment-form">
            <h3>Enroll Now</h3>
            <form id="enrollmentForm" onsubmit="submitEnrollment(event, '${courseId}')">
                <div class="form-group">
                    <input type="text" id="enrollName" name="name" placeholder="Your Name" required>
                </div>
                <div class="form-group">
                    <input type="tel" id="enrollPhone" name="phone" placeholder="Mobile Number" required pattern="[0-9]{10}">
                </div>
                <div class="form-group">
                    <input type="email" id="enrollEmail" name="email" placeholder="Email Address" required>
                </div>
                <button type="submit" class="enroll-btn">Proceed to Payment</button>
            </form>
        </div>
    `;
    
    modal.style.display = 'block';
}

// Handle enrollment form submission
async function submitEnrollment(event, courseId) {
    event.preventDefault();
    const form = event.target;
    const course = courseDetails[courseId];
    
    // Log the form data to check values
    console.log('Form values:', {
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value
    });

    const formData = {
        from_name: form.name.value,
        from_email: form.email.value,
        mobile: form.phone.value,  
        phone_number: form.phone.value,  
        contact: form.phone.value,  
        course_name: course.title,
        course_price: course.price,
        to_name: 'Skill Tech Institute',
        message: `
Name: ${form.name.value}
Email: ${form.email.value}
Mobile Number: ${form.phone.value}
Course: ${course.title}
Price: ${course.price}
        `
    };

    try {
        // Log the data being sent to EmailJS
        console.log('Sending to EmailJS:', formData);
        
        // Send enrollment email
        const response = await emailjs.send('service_gzoz6zh', 'template_1jtdi2l', formData);
        console.log('EmailJS Response:', response);
        
        // Show payment modal
        showPaymentModal(formData, courseId);
    } catch (error) {
        console.error('Failed to submit enrollment:', error);
        alert('Failed to submit enrollment. Please try again.');
    }
}

function showPaymentModal(formData, courseId) {
    const modal = document.getElementById('courseModal');
    const modalContent = document.getElementById('modalContent');
    const course = courseDetails[courseId];

    modalContent.innerHTML = `
        <h2>Complete Your Payment</h2>
        <div class="payment-details">
            <p>Course: ${course.title}</p>
            <p>Amount: ${course.price}</p>
            <div class="qr-code">
                <img src="images/payment-qr.jpg" alt="Payment QR Code" class="qr-image">
                <p>Scan QR code to pay</p>
            </div>
            <div class="payment-buttons">
                <button onclick="confirmPayment('${formData.phone}')" class="payment-btn">Payment Done</button>
                <p class="payment-instruction">After clicking "Payment Done", you will be redirected to WhatsApp to send your payment screenshot for confirmation.</p>
            </div>
        </div>
    `;
}

function confirmPayment(phone) {
    // Redirect to WhatsApp
    const whatsappNumber = "916387738402";
    const message = "Hello, I have completed the payment for the course. Here is my payment screenshot.";
    window.location.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

// Image Modal Functions
function openImage(imageSrc, caption) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    
    modal.style.display = "flex";
    modalImg.src = imageSrc;
    modalCaption.textContent = caption;
    
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = "none";
    
    // Restore body scrolling
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside the image
document.getElementById('imageModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeImageModal();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    const mainContent = document.getElementById('mainContent');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');
    const contactForm = document.getElementById('contactForm');
    const modal = document.getElementById('courseModal');
    const closeModal = document.querySelector('.close-modal');

    // Show main content and hide loading screen
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            mainContent.style.display = 'block';
            setTimeout(() => {
                mainContent.style.opacity = '1';
            }, 50);
        }, 500);
    }, 1500);

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            const formData = {
                from_name: document.getElementById('name').value,
                from_email: document.getElementById('email').value,
                message: document.getElementById('message').value,
                to_name: 'Skill Tech Institute',
            };

            try {
                // Send email using EmailJS
                await emailjs.send('service_gzoz6zh', 'template_1jtdi2l', formData);
                
                // Show success message
                submitBtn.textContent = 'Message Sent!';
                submitBtn.style.backgroundColor = '#28a745';
                contactForm.reset();

                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.backgroundColor = '';
                }, 3000);
            } catch (error) {
                console.error('Failed to send email:', error);
                submitBtn.textContent = 'Failed to send';
                submitBtn.style.backgroundColor = '#dc3545';
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.backgroundColor = '';
                }, 3000);
            }
        });
    }

    // Close modal when clicking the close button
    if (closeModal) {
        closeModal.onclick = function() {
            modal.style.display = 'none';
        }
    }

    // Close modal when clicking outside
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    // Hide header on scroll down, show on scroll up
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        const header = document.querySelector('.header');
        
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }

        lastScroll = currentScroll;
    });
});
