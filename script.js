// Stewardship Report Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    
    // Add animation classes to elements
    const animateElements = () => {
        const elements = document.querySelectorAll('.header-section, .profile-section, .categories-section, .footer-section');
        
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('fade-in');
            }, index * 400);
        });
    };

    // Add hover effects to category cards
    const addHoverEffects = () => {
        const categoryCards = document.querySelectorAll('.category-card');
        
        categoryCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-15px) scale(1.03)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    };

    // Add click effects to category cards
    const addClickEffects = () => {
        const categoryCards = document.querySelectorAll('.category-card');
        
        categoryCards.forEach(card => {
            card.addEventListener('click', function(e) {
                // Add ripple effect
                const ripple = document.createElement('div');
                ripple.className = 'ripple-effect';
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 215, 0, 0.6);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;
                
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
                
                // Handle clickable cards with navigation
                if (this.classList.contains('clickable')) {
                    // Add loading state
                    this.style.pointerEvents = 'none';
                    this.style.opacity = '0.7';
                    
                    // Add loading spinner
                    const spinner = document.createElement('div');
                    spinner.className = 'loading-spinner';
                    spinner.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                    spinner.style.cssText = `
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        color: #ffd700;
                        font-size: 1.5rem;
                        z-index: 10;
                    `;
                    this.appendChild(spinner);
                    
                    // Navigate after a short delay for visual feedback
                    setTimeout(() => {
                        const href = this.getAttribute('href');
                        if (href) {
                            window.location.href = href;
                        }
                    }, 500);
                }
            });
        });
    };

    // Add CSS for ripple effect
    const addRippleStyles = () => {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    };

    // Add loading animation
    const loadingAnimation = () => {
        const loader = document.createElement('div');
        loader.className = 'page-loader';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="spinner"></div>
                <p>Loading Stewardship Report...</p>
            </div>
        `;
        
        document.body.appendChild(loader);
        
        // Remove loader after page loads
        window.addEventListener('load', function() {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.remove();
                }, 500);
            }, 1000);
        });
    };

    // Add CSS for loader
    const addLoaderStyles = () => {
        const style = document.createElement('style');
        style.textContent = `
            .page-loader {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #1e3c72 0%, #2a5298 25%, #667eea 50%, #764ba2 75%, #f093fb 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                transition: opacity 0.5s ease;
            }
            
            .loader-content {
                text-align: center;
                color: white;
            }
            
            .spinner {
                width: 60px;
                height: 60px;
                border: 4px solid rgba(255, 215, 0, 0.3);
                border-top: 4px solid #ffd700;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 1rem;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        
        document.head.appendChild(style);
    };

    // Add parallax effect for watermark
    const addParallaxEffect = () => {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const watermark = document.querySelector('.watermark');
            
            if (watermark) {
                const speed = scrolled * 0.2;
                watermark.style.transform = `translateY(${speed}px)`;
            }
        });
    };

    // Add floating animation to logos
    const addFloatingAnimation = () => {
        const logos = document.querySelectorAll('.apc-logo, .ogun-logo');
        
        logos.forEach((logo, index) => {
            logo.style.animation = `float 3s ease-in-out infinite ${index * 0.5}s`;
        });
    };

    // Add CSS for floating animation
    const addFloatingStyles = () => {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
            }
        `;
        document.head.appendChild(style);
    };

    // Initialize all features
    const init = () => {
        addLoaderStyles();
        addRippleStyles();
        addFloatingStyles();
        loadingAnimation();
        animateElements();
        addHoverEffects();
        addClickEffects();
        addParallaxEffect();
        addFloatingAnimation();
    };

    // Start the application
    init();

    // Add print functionality
    const addPrintButton = () => {
        const printBtn = document.createElement('button');
        printBtn.className = 'print-btn';
        printBtn.innerHTML = '🖨️ Print Report';
        printBtn.onclick = () => window.print();
        
        // Add to the footer section
        const footerSection = document.querySelector('.footer-section');
        if (footerSection) {
            const printContainer = document.createElement('div');
            printContainer.className = 'text-center mt-4';
            printContainer.appendChild(printBtn);
            footerSection.appendChild(printContainer);
        }
    };

    setTimeout(addPrintButton, 2000);

    // Add CSS for print button
    const addButtonStyles = () => {
        const style = document.createElement('style');
        style.textContent = `
            .print-btn {
                padding: 1rem 2rem;
                background: linear-gradient(135deg, #ffd700, #ff8c00);
                border: none;
                border-radius: 25px;
                color: #1e3c72;
                cursor: pointer;
                transition: all 0.3s ease;
                font-weight: 700;
                font-size: 1.1rem;
                box-shadow: 0 5px 15px rgba(255, 215, 0, 0.4);
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            
            .print-btn:hover {
                background: linear-gradient(135deg, #ff8c00, #ff4500);
                transform: translateY(-3px);
                box-shadow: 0 8px 25px rgba(255, 215, 0, 0.6);
            }
            
            @media print {
                .print-btn { display: none; }
            }
        `;
        
        document.head.appendChild(style);
    };

    setTimeout(addButtonStyles, 1000);
});
