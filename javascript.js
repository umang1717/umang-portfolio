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
    
    // Download Resume Functionality
    const downloadBtn = document.getElementById('downloadResumeBtn');
    
    function downloadResume() {
        // Create resume content
        const resumeContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Umang Raj - Resume</title>
                <meta charset="UTF-8">
                <style>
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }
                    body {
                        font-family: 'Segoe UI', Arial, sans-serif;
                        background: white;
                        color: #1a1a2e;
                        padding: 40px;
                        line-height: 1.6;
                    }
                    .resume-container {
                        max-width: 900px;
                        margin: 0 auto;
                    }
                    .header {
                        text-align: center;
                        margin-bottom: 30px;
                        padding-bottom: 20px;
                        border-bottom: 2px solid #6366f1;
                    }
                    .header h1 {
                        color: #6366f1;
                        font-size: 2.5rem;
                        margin-bottom: 5px;
                    }
                    .header p {
                        color: #4a5568;
                        margin: 5px 0;
                    }
                    .section {
                        margin-bottom: 25px;
                    }
                    .section h2 {
                        color: #6366f1;
                        border-left: 4px solid #6366f1;
                        padding-left: 15px;
                        margin-bottom: 15px;
                        font-size: 1.5rem;
                    }
                    .skill-grid {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 10px;
                        margin: 10px 0;
                    }
                    .skill-tag {
                        background: #f0f0f0;
                        padding: 5px 12px;
                        border-radius: 20px;
                        font-size: 0.85rem;
                    }
                    .project-item, .cert-item, .achievement-item {
                        margin-bottom: 15px;
                        padding-left: 15px;
                        border-left: 2px solid #e0e0e0;
                    }
                    .project-item h3, .cert-item h3, .achievement-item h3 {
                        color: #2d3748;
                        margin-bottom: 5px;
                    }
                    .date {
                        color: #718096;
                        font-size: 0.8rem;
                        margin-bottom: 5px;
                    }
                    .tech-stack {
                        display: inline-block;
                        background: #e9ecef;
                        padding: 3px 10px;
                        border-radius: 15px;
                        font-size: 0.75rem;
                        margin-top: 5px;
                    }
                    .edu-item {
                        margin-bottom: 15px;
                    }
                    .edu-item h3 {
                        color: #2d3748;
                    }
                    .contact-info {
                        text-align: center;
                        margin-top: 30px;
                        padding-top: 20px;
                        border-top: 1px solid #e0e0e0;
                    }
                    @media print {
                        body {
                            padding: 20px;
                        }
                        .contact-info {
                            break-inside: avoid;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="resume-container">
                    <div class="header">
                        <h1>Umang Raj</h1>
                        <p>B.Tech Computer Science Engineering | Data Enthusiast</p>
                        <p>📧 umang@example.com | 📍 Punjab, India</p>
                        <p>🔗 github.com/umangraj | 💼 linkedin.com/in/umangraj</p>
                    </div>
                    
                    <div class="section">
                        <h2>Professional Summary</h2>
                        <p>Passionate Computer Science student with strong foundations in Data Analytics, Software Development, and OOPs. Skilled in Python, C++, and data visualization tools. Proven ability to deliver impactful projects and collaborate effectively in team environments.</p>
                    </div>
                    
                    <div class="section">
                        <h2>Education</h2>
                        <div class="edu-item">
                            <h3>Bachelor of Technology - Computer Science and Engineering</h3>
                            <p>Lovely Professional University, Punjab</p>
                            <p>CGPA: 6.51 | Aug 2023 - Present</p>
                        </div>
                        <div class="edu-item">
                            <h3>Intermediate (12th)</h3>
                            <p>New Horizon School, Bhagalpur</p>
                            <p>Percentage: 68.8% | Apr 2021 - Mar 2022</p>
                        </div>
                        <div class="edu-item">
                            <h3>Matriculation (10th)</h3>
                            <p>Sky Vision Public School, Lakhisarai</p>
                            <p>Percentage: 69.6% | Mar 2019 - Mar 2020</p>
                        </div>
                    </div>
                    
                    <div class="section">
                        <h2>Technical Skills</h2>
                        <div class="skill-grid">
                            <span class="skill-tag">Python</span>
                            <span class="skill-tag">C++</span>
                            <span class="skill-tag">Java</span>
                            <span class="skill-tag">SQL</span>
                            <span class="skill-tag">Pandas</span>
                            <span class="skill-tag">NumPy</span>
                            <span class="skill-tag">Matplotlib</span>
                            <span class="skill-tag">Seaborn</span>
                            <span class="skill-tag">Power BI</span>
                            <span class="skill-tag">Tableau</span>
                            <span class="skill-tag">Excel</span>
                            <span class="skill-tag">MySQL</span>
                        </div>
                    </div>
                    
                    <div class="section">
                        <h2>Projects</h2>
                        <div class="project-item">
                            <h3>Electric Vehicle Population Dashboard</h3>
                            <div class="date">Mar 2025 - Apr 2025</div>
                            <p>Built an interactive Excel dashboard to analyze EV adoption trends and regional distributions. Used pivot tables and visual charts for data-driven storytelling.</p>
                            <div class="tech-stack">Excel, Pivot Tables, Data Visualization</div>
                        </div>
                        <div class="project-item">
                            <h3>Bollywood Movies Data Analysis</h3>
                            <div class="date">Mar 2025 - Apr 2025</div>
                            <p>Performed EDA on Bollywood movie data to identify trends in genre, ratings, and box-office performance using Python libraries.</p>
                            <div class="tech-stack">Python, Pandas, NumPy, Matplotlib, Seaborn</div>
                        </div>
                        <div class="project-item">
                            <h3>Smart Hospital Management System</h3>
                            <div class="date">Jun 2025 - Jul 2025</div>
                            <p>Built a comprehensive system using C++ with OOP and DSA concepts. Implemented appointment queue, billing, and data management modules.</p>
                            <div class="tech-stack">C++, OOP, DSA, Queue</div>
                        </div>
                    </div>
                    
                    <div class="section">
                        <h2>Training & Certifications</h2>
                        <div class="cert-item">
                            <h3>C++ OOPs & DSA Training</h3>
                            <div class="date">CSE PATHSHALA | Jun 2025 - Jul 2025</div>
                        </div>
                        <div class="cert-item">
                            <h3>C++ Programming: OOPs and DSA</h3>
                            <div class="date">CSE PATHSHALA | Jul 2025</div>
                        </div>
                        <div class="cert-item">
                            <h3>Roadmap to DevOps</h3>
                            <div class="date">AWS CLOUD CLUB | Apr 2025</div>
                        </div>
                        <div class="cert-item">
                            <h3>The Bits and Bytes of Computer Networking</h3>
                            <div class="date">Coursera | Nov 2024</div>
                        </div>
                        <div class="cert-item">
                            <h3>Introduction to Python</h3>
                            <div class="date">Infosys Springboard | Mar 2024</div>
                        </div>
                        <div class="cert-item">
                            <h3>Responsive Web-App</h3>
                            <div class="date">Free Code Camp | Dec 2023</div>
                        </div>
                    </div>
                    
                    <div class="section">
                        <h2>Achievements</h2>
                        <div class="achievement-item">
                            <h3>NGO Volunteer</h3>
                            <div class="date">Jul 2024</div>
                            <p>Volunteered with an NGO supporting child rights and education initiatives.</p>
                        </div>
                        <div class="achievement-item">
                            <h3>Global Chess Silver Medal</h3>
                            <div class="date">Oct 2019</div>
                            <p>Secured Silver Medal at Global Level Chess Competition.</p>
                        </div>
                    </div>
                    
                    <div class="contact-info">
                        <p>© 2024 Umang Raj | Built with passion for technology and innovation</p>
                    </div>
                </div>
            </body>
            </html>
        `;
        
        // Create blob and download
        const blob = new Blob([resumeContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Umang_Raj_Resume.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        // Show success message
        showNotification('Resume downloaded successfully!', 'success');
    }
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', downloadResume);
    }
    
    // Notification function
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
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
        .notification i {
            font-size: 1.2rem;
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
});