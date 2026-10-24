/**
 * Shashwat Dwivedi - Portfolio Interactivity & Modern Dynamics
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Dynamic Typing Effect for Hero Section
    const typedTextSpan = document.querySelector('.typed-text');
    if (typedTextSpan) {
        const roles = [
            'Software Engineer',
            'Backend & Distributed Systems',
            'AI / Deep Learning Enthusiast',
            'Problem Solver (350+ DSA)'
        ];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typingSpeed = 90;
        const deletingSpeed = 45;
        const delayBetweenRoles = 1800;

        function typeEffect() {
            const currentRole = roles[roleIndex];

            if (isDeleting) {
                typedTextSpan.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typedTextSpan.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentRole.length) {
                isDeleting = true;
                setTimeout(typeEffect, delayBetweenRoles);
                return;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                setTimeout(typeEffect, 400);
                return;
            }

            const currentSpeed = isDeleting ? deletingSpeed : typingSpeed;
            setTimeout(typeEffect, currentSpeed);
        }

        setTimeout(typeEffect, 500);
    }

    // 2. Sticky Navbar on Scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. Mobile Navigation Menu Toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuBtn.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-xmark');
                } else {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            }
        });

        // Close mobile menu when any nav item is clicked
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = menuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // 4. Active Nav Link on Scroll
    const sections = document.querySelectorAll('section[id]');
    function highlightNavOnScroll() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');
            const link = document.querySelector(`.nav-links a[href*="${sectionId}"]`);

            if (link) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    }
    window.addEventListener('scroll', highlightNavOnScroll);

    // 5. Projects Filter Tabs
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // 6. Project Details Data & Modal Handling
    const projectData = {
        'lung-cancer': {
            title: 'Lung Cancer Detection AI System',
            category: 'Machine Learning & Healthcare AI',
            period: 'June 2026 - August 2026',
            image: 'images/projects/lung-cancer.jpg',
            description: 'Automated deep learning diagnostic framework using a DenseNet121 architecture with transfer learning to classify CT scan images and detect cancerous pulmonary nodules at an early stage.',
            architecture: 'Utilizes DenseNet121 with feature reuse and dense connectivity. The pipeline incorporates advanced SimpleITK HU-windowing preprocessing, synthetic augmentation, class balancing, and grad-CAM heatmap extraction for clinician verification.',
            highlights: [
                'Developed an automated lung cancer detection system utilizing a DenseNet121 model with transfer learning to classify CT scan images and identify cancerous nodules with high accuracy.',
                'Implemented an end-to-end deep learning pipeline, including image preprocessing, data augmentation, and class imbalance handling, to enhance model robustness and improve generalisation across medical imaging datasets.',
                'Architected a scalable, reproducible AI diagnostic framework for early-stage lung cancer detection, enhancing clinician decision-making speed and accuracy by 90%.'
            ],
            tech: ['Python', 'TensorFlow/Keras', 'DenseNet121', 'Scikit-learn', 'SimpleITK', 'Pillow', 'NumPy', 'Pandas', 'Matplotlib', 'Seaborn'],
            github: 'https://github.com/ShashwatDwivedi04'
        },
        'banking-system': {
            title: 'Banking Transaction System',
            category: 'Backend & Distributed Systems',
            period: 'April 2026 - Present',
            image: 'images/projects/banking-system.jpg',
            description: 'A high-concurrency, secure banking transaction platform engineered with strict ACID compliance, optimistic/pessimistic locking, rollbacks, and JWT-authenticated session controls.',
            architecture: 'Built on Node.js and Express.js with MongoDB multi-document transactions. Implements session-based rollback mechanisms, distributed mutex locks for concurrent debit/credit requests, and Dockerized microservices.',
            highlights: [
                'Implemented ACID-compliant transaction processing with concurrency control, rollback mechanisms, and consistency guarantees to ensure reliable and secure database operations.',
                'Developed a secure banking transaction system supporting deposits, withdrawals, and fund transfers with robust transaction management and data integrity.',
                'Engineered stateless JWT authorization with role-based permissions, bcrypt cryptographic hashing, and automated Docker container orchestration.'
            ],
            tech: ['Node.js', 'Express.js', 'MongoDB', 'JavaScript', 'JWT', 'Docker', 'HTML5', 'CSS3', 'REST APIs'],
            github: 'https://github.com/ShashwatDwivedi04'
        },
        'goboffin': {
            title: 'GoBoffin – Job Search Web Application',
            category: 'Full-Stack Web Development',
            period: 'October 2025 - December 2025',
            image: 'images/projects/goboffin-jobs.jpg',
            description: 'Modern, highly responsive job discovery portal integrating live job market APIs with multi-parameter client-side search filtering and bookmark management.',
            architecture: 'Crafted using semantic HTML5, modern vanilla CSS with responsive flex/grid layouts, and vanilla JavaScript (ES6+). Includes asynchronous REST API client, debounced instant search, and client-side filtering algorithms.',
            highlights: [
                'Developed a responsive job search web application using HTML, CSS, and JavaScript with real-time API integration for dynamic job listings.',
                'Implemented client-side data fetching and filtering logic to improve job search accuracy and enhance user experience.',
                'Designed a clean, intuitive, and user-friendly interface to enable efficient job discovery, navigation, and interaction across devices.'
            ],
            tech: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'REST APIs', 'Async/Await', 'Responsive Design'],
            github: 'https://github.com/ShashwatDwivedi04'
        }
    };

    const modalOverlay = document.getElementById('projectModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalCategory = document.getElementById('modalCategory');
    const modalPeriod = document.getElementById('modalPeriod');
    const modalDesc = document.getElementById('modalDesc');
    const modalBullets = document.getElementById('modalBullets');
    const modalTech = document.getElementById('modalTech');
    const modalGithub = document.getElementById('modalGithub');

    document.querySelectorAll('.open-modal-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = btn.getAttribute('data-project');
            const data = projectData[projectId];

            if (data && modalOverlay) {
                modalImage.src = data.image;
                modalTitle.textContent = data.title;
                modalCategory.textContent = data.category;
                modalPeriod.textContent = data.period;
                modalDesc.textContent = data.description;

                // Bullets
                modalBullets.innerHTML = '';
                data.highlights.forEach(bullet => {
                    const li = document.createElement('li');
                    li.textContent = bullet;
                    modalBullets.appendChild(li);
                });

                // Tech Pills
                modalTech.innerHTML = '';
                data.tech.forEach(t => {
                    const span = document.createElement('span');
                    span.textContent = t;
                    modalTech.appendChild(span);
                });

                if (modalGithub) {
                    modalGithub.href = data.github;
                }

                modalOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    function closeModal() {
        if (modalOverlay) {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });

    // 7. Toast Notification Utility
    const toast = document.getElementById('toast');
    function showToast(message, iconClass = 'fa-circle-check') {
        if (!toast) return;
        toast.innerHTML = `<i class="fas ${iconClass}"></i><span>${message}</span>`;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3200);
    }

    // 8. Copy to Clipboard for Email
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', () => {
            const email = 'shashwatdwi04@gmail.com';
            navigator.clipboard.writeText(email).then(() => {
                showToast('Email address copied to clipboard!');
            }).catch(() => {
                showToast('shashwatdwi04@gmail.com');
            });
        });
    }

    // 9. Contact Form Simulation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('senderName')?.value.trim();
            const email = document.getElementById('senderEmail')?.value.trim();
            const subject = document.getElementById('senderSubject')?.value.trim();
            const message = document.getElementById('senderMessage')?.value.trim();

            if (!name || !email || !message) {
                showToast('Please fill in all required fields.', 'fa-circle-exclamation');
                return;
            }

            // Provide immediate feedback to the user
            showToast(`Thank you ${name}! Opening mail client...`);
            
            // Construct mailto link as fallback
            const mailtoUrl = `mailto:shashwatdwi04@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Inquiry from ' + name)}&body=${encodeURIComponent('From: ' + name + ' (' + email + ')\n\n' + message)}`;
            
            setTimeout(() => {
                window.location.href = mailtoUrl;
                contactForm.reset();
            }, 800);
        });
    }

    // 10. Back to Top Button
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    console.log("Shashwat Dwivedi's Portfolio Initialized Successfully!");
});