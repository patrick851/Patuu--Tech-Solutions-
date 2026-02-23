// Scroll to Top Function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/Hide Scroll to Top Button on page load and scroll
window.addEventListener('DOMContentLoaded', () => {
    const scrollTopBtn = document.querySelector('.scroll-top');
    
    // Initially hide the button
    scrollTopBtn.style.display = 'none';
    
    // Show/hide on scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.display = 'block';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });
});
// ==================== NEWSLETTER SUBSCRIPTION WITH 1-MINUTE TIMER ====================

let countdownTimer;

// Newsletter Form Submission
document.getElementById('newsletterForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('newsletterEmail').value;
    
    // Validate email
    if (!email || !email.includes('@')) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Show popup
    document.getElementById('popupOverlay').classList.add('active');
    
    // Clear input field
    document.getElementById('newsletterEmail').value = '';
    
    // Start 60-second (1 minute) countdown
    startCountdown(60);
    
    // Optional: Log email for testing
    console.log('Subscribed:', email);
    
    // Optional: Send to backend
    // fetch('/api/subscribe', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email: email })
    // });
});

// Countdown Timer Function (displays in MM:SS format)
function startCountdown(seconds) {
    let timeLeft = seconds;
    const countdownElement = document.getElementById('countdown');
    
    // Clear any existing timer
    if (countdownTimer) {
        clearInterval(countdownTimer);
    }
    
    // Update countdown every second
    countdownTimer = setInterval(function() {
        timeLeft--;
        
        // Format time as MM:SS
        const minutes = Math.floor(timeLeft / 60);
        const secs = timeLeft % 60;
        const formattedTime = `${minutes}:${secs.toString().padStart(2, '0')}`;
        
        countdownElement.textContent = formattedTime;
        
        // Close popup when countdown reaches 0
        if (timeLeft <= 0) {
            clearInterval(countdownTimer);
            closePopup();
        }
    }, 1000);
}

// Close Popup Function
function closePopup() {
    const popupOverlay = document.getElementById('popupOverlay');
    popupOverlay.classList.remove('active');
    
    // Clear countdown timer
    if (countdownTimer) {
        clearInterval(countdownTimer);
    }
    
    // Reset countdown display
    document.getElementById('countdown').textContent = '1:00';
}

// Close popup when clicking outside the box
document.getElementById('popupOverlay').addEventListener('click', function(e) {
    if (e.target === this) {
        closePopup();
    }
});

// Optional: Close popup with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closePopup();
    }
});

// Form submission handler
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent default form submission
    
    // Show success popup
    const popup = document.getElementById('successPopup');
    popup.classList.add('show');
    
    // Reset form fields
    this.reset();
    
    // Hide popup after 4 seconds
    setTimeout(function() {
        popup.classList.remove('show');
    }, 4000);
});