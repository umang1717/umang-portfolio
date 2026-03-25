// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Hide loader
    setTimeout(() => {
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
    }, 1000);
    
    // Custom cursor
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        
        document.addEventListener('mouseenter', () => {
            cursor.style.opacity = '1';
        });
        
        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
        });
        
        // Add hover effect on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-category');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursor.style.borderColor = '#8b5cf6';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.borderColor = '#6366f1';
            });
        });
    }
    
    // Navigation active state and smooth scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
        
        // Navbar background change
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        }
    });
    
    // Smooth scroll for navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Hamburger menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // ==================== RESUME DOWNLOAD - WORKS FROM ANYWHERE ====================
    const downloadBtn = document.getElementById('downloadResumeBtn');
    
    // Get the base URL of the current page (works on GitHub Pages, localhost, etc.)
    function getBaseUrl() {
        const currentUrl = window.location.href;
        const baseUrl = currentUrl.substring(0, currentUrl.lastIndexOf('/') + 1);
        return baseUrl;
    }
    
    function downloadResume() {
        // Show preparing message
        showNotification('📄 Preparing your resume...', 'info');
        
        // Try multiple methods to ensure download works
        const resumeFile = 'umang-resume.pdf';
        const baseUrl = getBaseUrl();
        
        // Method 1: Direct download using fetch (most reliable)
        fetch(resumeFile, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/pdf',
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            return response.blob();
        })
        .then(blob => {
            // Create blob URL and trigger download
            const blobUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = 'Umang_Raj_Resume.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
            showNotification('✅ Resume downloaded successfully!', 'success');
        })
        .catch(error => {
            console.error('Download error:', error);
            
            // Method 2: Try direct link as fallback
            try {
                const link = document.createElement('a');
                link.href = resumeFile;
                link.download = 'Umang_Raj_Resume.pdf';
                link.target = '_blank';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                showNotification('✅ Resume download started!', 'success');
            } catch (fallbackError) {
                console.error('Fallback error:', fallbackError);
                
                // Method 3: Open in new tab as last resort
                window.open(resumeFile, '_blank');
                showNotification('📄 Resume opened in new tab. Use Ctrl+S to save.', 'info');
            }
        });
    }
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', downloadResume);
    }
    
    // Notification function
    function showNotification(message, type = 'info') {
        // Remove any existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notif => notif.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'info' ? 'fa-info-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    // Add notification styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(30, 41, 59, 0.95);
            backdrop-filter: blur(10px);
            padding: 12px 20px;
            border-radius: 50px;
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            border-left: 4px solid #6366f1;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            font-size: 0.9rem;
            max-width: 90vw;
        }
        .notification.show {
            transform: translateX(0);
        }
        .notification-success {
            border-left-color: #10b981;
        }
        .notification-success i {
            color: #10b981;
        }
        .notification-info {
            border-left-color: #6366f1;
        }
        .notification-info i {
            color: #6366f1;
        }
        .notification i {
            font-size: 1.2rem;
        }
        @media (max-width: 768px) {
            .notification {
                bottom: 20px;
                right: 20px;
                left: 20px;
                transform: translateY(100px);
            }
            .notification.show {
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showNotification('Message sent successfully! I will get back to you soon.', 'success');
            contactForm.reset();
        });
    }
    
    // Animate on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.project-card, .skill-category, .achievement-card, .cert-item, .training-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
    
    // Check if resume file is accessible
    fetch('umang-resume.pdf', { method: 'HEAD' })
        .then(response => {
            if (response.ok) {
                console.log('✅ Resume file found and accessible!');
            } else {
                console.warn('⚠️ Resume file not found. Make sure umang-resume.pdf is in the same directory.');
            }
        })
        .catch(error => {
            console.error('Error checking resume:', error);
        });
    
    console.log('🎉 Portfolio loaded successfully!');
    console.log('📍 Current URL:', window.location.href);
});
