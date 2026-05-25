// ========== Navigation mobile toggle ==========
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = navToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    });
});

// ========== Scroll spy - active nav link ==========
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// ========== Skill bars animation on scroll ==========
const skillProgressBars = document.querySelectorAll('.skill-progress');

function animateSkillBars() {
    skillProgressBars.forEach(bar => {
        const barPosition = bar.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (barPosition < windowHeight - 50 && bar.style.width === '0px' || bar.style.width === '') {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = progress + '%';
        }
    });
}

window.addEventListener('scroll', animateSkillBars);
window.addEventListener('load', animateSkillBars);

// ========== Contact form validation ==========
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

const validators = {
    nom: {
        validate: value => value.trim().length >= 2,
        errorId: 'nomError'
    },
    email: {
        validate: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
        errorId: 'emailError'
    },
    sujet: {
        validate: value => value.trim().length >= 3,
        errorId: 'sujetError'
    },
    message: {
        validate: value => value.trim().length >= 10,
        errorId: 'messageError'
    }
};

function validateField(input) {
    const field = input.id;
    const validator = validators[field];
    if (!validator) return true;

    const errorElement = document.getElementById(validator.errorId);
    const isValid = validator.validate(input.value);

    if (isValid) {
        input.classList.remove('error');
        errorElement.classList.remove('visible');
    } else {
        input.classList.add('error');
        errorElement.classList.add('visible');
    }

    return isValid;
}

document.querySelectorAll('#contactForm input, #contactForm textarea').forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
        if (input.classList.contains('error')) {
            validateField(input);
        }
    });
});

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let isFormValid = true;
    Object.keys(validators).forEach(field => {
        const input = document.getElementById(field);
        if (!validateField(input)) {
            isFormValid = false;
        }
    });

    if (isFormValid) {
        formSuccess.classList.add('visible');
        contactForm.reset();
        setTimeout(() => {
            formSuccess.classList.remove('visible');
        }, 5000);
    }
});

// ========== Smooth reveal animation on scroll ==========
const revealElements = document.querySelectorAll('.section');

function revealOnScroll() {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
});

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ========== Project hover tilt effect ==========
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});
