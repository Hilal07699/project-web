// Mobile menu toggle
let menu = document.querySelector('#menu-bar'); // Menu icon
let navbar = document.querySelector('.navbar'); // Navbar menu

menu.onclick = () => {
    menu.classList.toggle('fa-times'); // Toggle menu icon
    navbar.classList.toggle('active'); // Toggle navbar visibility
};

// Theme toggler
let themeToggler = document.querySelector('.theme-toggler');
let toggleBtn = document.querySelector('.toggle-btn');

// Toggles the theme panel visibility
toggleBtn.onclick = () => {
    themeToggler.classList.toggle('active');
};

// Allows users to change the primary theme color dynamically
document.querySelectorAll('.theme-toggler .theme-btn').forEach(btn => {
    btn.onclick = () => {
        let color = btn.style.background; // Get the color of the clicked button
        document.documentElement.style.setProperty('--main-color', color); // Update CSS variable
        localStorage.setItem('themeColor', color); // Save theme color to localStorage
    };
});

// Loads the saved theme color from localStorage
const savedThemeColor = localStorage.getItem('themeColor');
if (savedThemeColor) {
    document.documentElement.style.setProperty('--main-color', savedThemeColor);
}

// Swiper Initialization for Home Slider
const homeSlider = new Swiper('.home-slider', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2,
        slideShadows: true,
    },
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
});

// Swiper Initialization for Review Slider
const reviewSlider = new Swiper('.review-slider', {
    slidesPerView: 1,
    grabCursor: true,
    loop: true,
    spaceBetween: 10,
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        700: {
            slidesPerView: 2,
        },
        1050: {
            slidesPerView: 3,
        },
    },
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
});

// Form validation for Contact Form
function validateForm() {
    const name = document.getElementById('name').value.trim(); // Get the name field value
    const email = document.getElementById('email').value.trim(); // Get the email field value
    const message = document.getElementById('message').value.trim(); // Get the message field value

    // Check if any fields are empty
    if (!name || !email || !message) {
        alert('All fields are required!');
        return false;
    }

    // Simple email format validation
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(emailPattern)) {
        alert('Please enter a valid email address.');
        return false;
    }

    alert('Message sent successfully!');
    return true;
}

// Close menus and toggler on scroll
window.onscroll = () => {
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
    themeToggler.classList.remove('active');
};

// Lazy Loading Gallery Images
const galleryImages = document.querySelectorAll('.gallery .box img');

const lazyLoad = (image) => {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const lazyImage = entry.target;
                lazyImage.src = lazyImage.dataset.src; // Update image src with actual URL
                observer.unobserve(lazyImage); // Stop observing after loading
            }
        });
    });
    observer.observe(image);
};

// Apply lazy loading to gallery images
galleryImages.forEach(img => {
    img.dataset.src = img.src; // Backup the original src
    img.src = ''; // Clear src to simulate lazy loading
    lazyLoad(img);
});
