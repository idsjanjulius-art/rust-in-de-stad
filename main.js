document.addEventListener('DOMContentLoaded', () => {

    // 1. Sticky Navbar
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuLinks = document.querySelectorAll('.mobile-nav-links a');

    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        
        // Transform hamburger to X
        const spans = menuToggle.querySelectorAll('span');
        if (mobileMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans.forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        }
    });

    // Close mobile menu on link click
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            const spans = menuToggle.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        });
    });

    // 3. Reveal on Scroll (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 4. FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all
            faqItems.forEach(faq => {
                faq.classList.remove('active');
                faq.querySelector('.faq-answer').style.maxHeight = null;
            });

            // If it wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // 5. Booking Form Submit Prevent
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Replaces button text to give feedback
            const btn = bookingForm.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            
            btn.innerText = 'Verzoek verstuurd...';
            btn.style.backgroundColor = '#5A765D'; // hover color
            
            setTimeout(() => {
                btn.innerText = 'Bedankt voor je aanvraag!';
                bookingForm.reset();
                
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.backgroundColor = '';
                }, 3000);
            }, 1000);
        });
    }

    // 6. Route Modal Logic
    const routeWrappers = document.querySelectorAll('.route-img-wrapper');
    const modal = document.getElementById('route-modal');
    if (modal) {
        const closeBtn = document.querySelector('.close-modal');
        const modalImg = document.getElementById('modal-image');
        const modalTitle = document.getElementById('modal-title');
        const modalDesc = document.getElementById('modal-desc');
        const modalMap = document.getElementById('modal-map-iframe');

        const closeModal = () => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto'; 
            setTimeout(() => { modalMap.src = ''; }, 400); // clear after transition
        };

        routeWrappers.forEach(wrapper => {
            wrapper.addEventListener('click', () => {
                modalImg.src = wrapper.dataset.img;
                modalTitle.textContent = wrapper.dataset.title;
                modalDesc.textContent = wrapper.dataset.desc;
                
                if (wrapper.dataset.map && wrapper.dataset.map !== "") {
                    modalMap.src = wrapper.dataset.map;
                    modalMap.parentElement.style.display = 'block';
                } else {
                    modalMap.src = '';
                    modalMap.parentElement.style.display = 'none';
                }
                
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; 
            });
            
            wrapper.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    wrapper.click();
                }
            });
        });

        closeBtn.addEventListener('click', closeModal);

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
});
