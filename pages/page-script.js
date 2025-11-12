// Page-specific JavaScript for Legislative Achievements

document.addEventListener('DOMContentLoaded', function() {
    
    // Animate elements on page load
    const animatePageElements = () => {
        const elements = document.querySelectorAll('.hero-content, .hero-image-container, .intro-content, .section-header, .bill-card, .conclusion-content');
        
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('fade-in');
            }, index * 200);
        });
    };

    // Add hover effects to bill cards
    const addBillCardEffects = () => {
        const billCards = document.querySelectorAll('.bill-card');
        
        billCards.forEach(card => {
            // Add click effect
            card.addEventListener('click', function() {
                this.style.transform = 'scale(1.02)';
                setTimeout(() => {
                    this.style.transform = 'translateY(-10px)';
                }, 150);
            });
            
            // Add hover effect for progress bars
            card.addEventListener('mouseenter', function() {
                const progressFill = this.querySelector('.progress-fill');
                if (progressFill) {
                    progressFill.style.transform = 'scaleX(1.1)';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                const progressFill = this.querySelector('.progress-fill');
                if (progressFill) {
                    progressFill.style.transform = 'scaleX(1)';
                }
            });
        });
    };

    // Animate progress bars
    const animateProgressBars = () => {
        const progressBars = document.querySelectorAll('.progress-fill');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const width = progressBar.style.width;
                    progressBar.style.width = '0%';
                    
                    setTimeout(() => {
                        progressBar.style.width = width;
                    }, 500);
                }
            });
        });
        
        progressBars.forEach(bar => observer.observe(bar));
    };

    // Add floating animation to stats
    const addFloatingStats = () => {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach((stat, index) => {
            stat.style.animation = `float 3s ease-in-out infinite ${index * 0.3}s`;
        });
    };

    // Add CSS for floating animation
    const addFloatingStyles = () => {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-8px); }
            }
        `;
        document.head.appendChild(style);
    };

    // Add scroll-triggered animations
    const addScrollAnimations = () => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);
        
        const animatedElements = document.querySelectorAll('.bill-card, .conclusion-stat');
        animatedElements.forEach(el => observer.observe(el));
    };

    // Add navigation highlight
    const addNavigationHighlight = () => {
        const nav = document.querySelector('.page-nav');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                nav.style.background = 'linear-gradient(135deg, rgba(30, 60, 114, 0.95) 0%, rgba(42, 82, 152, 0.95) 100%)';
                nav.style.backdropFilter = 'blur(10px)';
            } else {
                nav.style.background = 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)';
                nav.style.backdropFilter = 'none';
            }
        });
    };

    // Add smooth scrolling for navigation
    const addSmoothScrolling = () => {
        const navLinks = document.querySelectorAll('.nav-back, .footer-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    };

    // Add bill status indicators
    const addBillStatusIndicators = () => {
        const billCards = document.querySelectorAll('.bill-card');
        
        billCards.forEach(card => {
            const status = card.querySelector('.bill-status');
            if (status) {
                // Add pulsing effect for in-progress bills
                if (status.classList.contains('in-progress')) {
                    status.style.animation = 'pulse 2s infinite';
                }
                
                // Add success effect for passed bills
                if (status.classList.contains('passed')) {
                    status.style.animation = 'success 3s ease-in-out infinite';
                }
            }
        });
    };

    // Add CSS for status animations
    const addStatusAnimations = () => {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
            
            @keyframes success {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
            }
        `;
        document.head.appendChild(style);
    };

    // Add print functionality
    const addPrintButton = () => {
        const printBtn = document.createElement('button');
        printBtn.className = 'print-btn';
        printBtn.innerHTML = '🖨️ Print Page';
        printBtn.onclick = () => window.print();
        
        // Add to the footer
        const footer = document.querySelector('.footer-content');
        if (footer) {
            const printContainer = document.createElement('div');
            printContainer.className = 'text-center mt-3';
            printContainer.appendChild(printBtn);
            footer.appendChild(printContainer);
        }
    };

    // Add CSS for print button
    const addPrintButtonStyles = () => {
        const style = document.createElement('style');
        style.textContent = `
            .print-btn {
                padding: 0.8rem 1.5rem;
                background: linear-gradient(135deg, #ffd700, #ff8c00);
                border: none;
                border-radius: 25px;
                color: #1e3c72;
                cursor: pointer;
                transition: all 0.3s ease;
                font-weight: 600;
                font-size: 1rem;
                box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
            }
            
            .print-btn:hover {
                background: linear-gradient(135deg, #ff8c00, #ff4500);
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(255, 215, 0, 0.4);
            }
            
            @media print {
                .print-btn, .page-nav { display: none; }
                .hero-section { padding: 2rem 0; }
                .bill-card { break-inside: avoid; }
            }
        `;
        document.head.appendChild(style);
    };

    // Enhance Category 2 and 3 cards to match Category 1 visuals
    // Overlay functionality removed



    // Initialize all features
    const init = () => {
        addFloatingStyles();
        addStatusAnimations();
        addPrintButtonStyles();
        
        animatePageElements();
        addBillCardEffects();
        animateProgressBars();
        addFloatingStats();
        addScrollAnimations();
        addNavigationHighlight();
        addSmoothScrolling();
        addBillStatusIndicators();
        
        // Add print button after a delay
        setTimeout(addPrintButton, 2000);
    };

    // Start the application
    init();

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Go back to cover page
            window.location.href = '../index.html';
        }
        
        if (e.key === 'ArrowRight') {
            // Go to next page
            const nextLink = document.querySelector('.footer-link[href*="constituency-projects"]');
            if (nextLink) {
                window.location.href = nextLink.href;
            }
        }
        
        if (e.key === 'ArrowLeft') {
            // Go back to cover page
            window.location.href = '../index.html';
        }
    });

    // Add loading state for images
    const addImageLoading = () => {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            img.addEventListener('load', function() {
                this.style.opacity = '1';
            });
            
            img.addEventListener('error', function() {
                this.style.opacity = '0.5';
                this.style.filter = 'grayscale(100%)';
            });
        });
    };

    setTimeout(addImageLoading, 1000);
});
