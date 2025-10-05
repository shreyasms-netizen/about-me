// Project data
const projectsData = [
    {
        title: "Multi-Enterprise eBGP with OSPF/EIGRP Integration",
        description: "Designed and deployed multi-AS routing using eBGP for external connectivity and OSPF/EIGRP for internal domains. Configured redistribution policies with route-maps, metric control, and summarization for stable route exchange. This project demonstrates advanced understanding of inter-domain routing protocols and their integration in enterprise networks.",
        technologies: ["eBGP", "OSPF", "EIGRP", "Route-maps", "Redistribution", "Summarization"]
    },
    {
        title: "OSPF–EIGRP Multi-Area Redistribution and Summarization",
        description: "Built an integrated topology with OSPF multi-area design and bidirectional EIGRP redistribution. Applied ABR summarization, route filtering, and interface-level summarization to reduce routing overhead and enhance scalability. This project showcases expertise in complex routing scenarios and optimization techniques.",
        technologies: ["OSPF", "EIGRP", "Multi-Area", "ABR", "Route Filtering", "Summarization"]
    },
    {
        title: "Three-Tier Campus Switching and WAN Edge Design",
        description: "Designed access, distribution, and core layers using VLANs, SVIs, EtherChannel, and Rapid-PVST+. Configured OSPF in the core and dual ISP edge connectivity for redundancy and external reachability. This project demonstrates understanding of hierarchical network design principles and high availability implementation.",
        technologies: ["VLANs", "SVIs", "EtherChannel", "Rapid-PVST+", "OSPF", "Dual ISP"]
    },
    {
        title: "Academic Project: Prepaid Electricity Energy Meter",
        description: "Developed a prepaid energy meter system with GSM-based remote recharge functionality. Implemented automatic disconnection on low balance to manage electricity usage efficiently. Streamlined billing and meter-reading processes for improved operational efficiency. This project combines embedded systems knowledge with telecommunications for practical IoT implementation.",
        technologies: ["GSM", "Energy Meter", "Remote Recharge", "Automatic Control", "Billing System"]
    }
];

// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.querySelector('.nav__menu');
const navLinks = document.querySelectorAll('.nav__link');
const projectCards = document.querySelectorAll('.project-card');
const projectModal = document.getElementById('project-modal');
const modalClose = document.getElementById('modal-close');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalTags = document.getElementById('modal-tags');
const hireMeBtn = document.getElementById('hire-me-btn');
const contactModal = document.getElementById('contact-modal');
const contactModalClose = document.getElementById('contact-modal-close');
const contactForm = document.getElementById('contact-form');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initProjects();
    initModals();
    initContactForm();
    initScrollEffects();
    initMobileMenu();
});

// Navigation functionality
function initNavigation() {
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });

    // Update active navigation link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const headerHeight = document.querySelector('.header').offsetHeight;
    const scrollPosition = window.scrollY + headerHeight + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const correspondingLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (correspondingLink) {
                correspondingLink.classList.add('active');
            }
        }
    });
}

// Mobile menu functionality
function initMobileMenu() {
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
}

// Project functionality
function initProjects() {
    projectCards.forEach((card, index) => {
        const detailsBtn = card.querySelector('.project-details-btn');
        detailsBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            showProjectModal(index);
        });

        // Also make the whole card clickable
        card.addEventListener('click', function() {
            showProjectModal(index);
        });
    });
}

function showProjectModal(projectIndex) {
    const project = projectsData[projectIndex];
    
    modalTitle.textContent = project.title;
    modalDescription.textContent = project.description;
    
    // Clear existing tags
    modalTags.innerHTML = '';
    
    // Add technology tags
    project.technologies.forEach(tech => {
        const tag = document.createElement('span');
        tag.className = 'skill-tag';
        tag.textContent = tech;
        modalTags.appendChild(tag);
    });
    
    projectModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

// Modal functionality
function initModals() {
    // Project modal close
    modalClose.addEventListener('click', function() {
        hideProjectModal();
    });

    // Contact modal close
    contactModalClose.addEventListener('click', function() {
        hideContactModal();
    });

    // Close modals when clicking outside
    [projectModal, contactModal].forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                if (modal === projectModal) {
                    hideProjectModal();
                } else {
                    hideContactModal();
                }
            }
        });
    });

    // Close modals with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            hideProjectModal();
            hideContactModal();
        }
    });

    // Hire Me button functionality
    hireMeBtn.addEventListener('click', function() {
        showContactModal();
    });
}

function hideProjectModal() {
    projectModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

function hideContactModal() {
    contactModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

function showContactModal() {
    contactModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

// Contact form functionality
function initContactForm() {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Create email subject and body
        const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
        const mailtoLink = `mailto:shreyasms2108@gmail.com?subject=${subject}&body=${body}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        showNotification('Thank you for your message! Your email client will open to send the message.', 'success');
        
        // Reset form
        contactForm.reset();
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles dynamically
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        max-width: 400px;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-base);
        box-shadow: var(--shadow-lg);
        z-index: 3000;
        transform: translateX(100%);
        transition: transform var(--duration-normal) var(--ease-standard);
        padding: var(--space-16);
    `;
    
    const notificationContent = notification.querySelector('.notification-content');
    notificationContent.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--space-12);
    `;
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        font-size: var(--font-size-lg);
        cursor: pointer;
        color: var(--color-text-secondary);
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close functionality
    const closeNotification = () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    };
    
    closeBtn.addEventListener('click', closeNotification);
    
    // Auto close after 5 seconds
    setTimeout(closeNotification, 5000);
}

// Scroll effects
function initScrollEffects() {
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.project-card, .skill-category, .training-item, .education-item');
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
    
    // Header background on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.background = 'rgba(var(--color-slate-900-rgb), 0.98)';
        } else {
            header.style.background = 'rgba(var(--color-slate-900-rgb), 0.95)';
        }
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add smooth hover effects to buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Handle window resize
window.addEventListener('resize', debounce(function() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
}, 250));

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Add fade-in effect to main content
    const mainSections = document.querySelectorAll('section');
    mainSections.forEach((section, index) => {
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Add initial styles for loading animation
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .loaded section {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
    `;
    document.head.appendChild(style);
});

// Performance optimization: Lazy load animations
const lazyAnimations = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            lazyAnimations.unobserve(entry.target);
        }
    });
});

// Additional interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Add ripple effect to buttons
    const createRipple = (event) => {
        const button = event.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        circle.classList.add('ripple');
        
        const ripple = button.getElementsByClassName('ripple')[0];
        if (ripple) {
            ripple.remove();
        }
        
        button.appendChild(circle);
    };
    
    const buttons = document.querySelectorAll('.btn--primary');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });
    
    // Add ripple CSS
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('Application error:', e.error);
    showNotification('Something went wrong. Please refresh the page.', 'error');
});

// Add focus management for accessibility
document.addEventListener('DOMContentLoaded', function() {
    // Trap focus in modals
    const trapFocus = (element) => {
        const focusableElements = element.querySelectorAll(
            'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        element.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    };
    
    // Apply focus trap to modals
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            trapFocus(modalContent);
        }
    });
});