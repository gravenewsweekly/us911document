// Security measures to prevent unauthorized access and copying
document.addEventListener('DOMContentLoaded', function() {
    // Show security alert on page load
    setTimeout(function() {
        document.getElementById('securityOverlay').style.display = 'block';
        document.getElementById('securityAlert').style.display = 'block';
    }, 1000);
    
    // Disable right-click
    document.addEventListener('contextmenu', function(e) {
        showSecurityWarning();
        e.preventDefault();
    });
    
    // Disable text selection
    document.addEventListener('selectstart', function(e) {
        showSecurityWarning();
        e.preventDefault();
    });
    
    // Disable keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Disable Ctrl+C, Ctrl+U, Ctrl+Shift+I, F12
        if (e.ctrlKey && (e.keyCode === 67 || e.keyCode === 85 || e.keyCode === 73)) {
            showSecurityWarning();
            e.preventDefault();
        }
        if (e.keyCode === 123) { // F12
            showSecurityWarning();
            e.preventDefault();
        }
    });
    
    // Prevent drag and drop
    document.addEventListener('dragstart', function(e) {
        showSecurityWarning();
        e.preventDefault();
    });
    
    // Monitor for developer tools opening
    let devtools = /./;
    devtools.toString = function() {
        showSecurityWarning();
        return '';
    };
    console.log('%c', devtools);
    
    // Periodically check for devtools
    setInterval(function() {
        const widthThreshold = window.outerWidth - window.innerWidth > 160;
        const heightThreshold = window.outerHeight - window.innerHeight > 160;
        if (heightThreshold || widthThreshold) {
            showSecurityWarning();
        }
    }, 1000);
});

function closeAlert() {
    document.getElementById('securityOverlay').style.display = 'none';
    document.getElementById('securityAlert').style.display = 'none';
}

function showSecurityWarning() {
    document.getElementById('securityOverlay').style.display = 'block';
    document.getElementById('securityAlert').style.display = 'block';
    
    // Log the attempt (simulated)
    console.warn('Unauthorized access attempt detected from IP: ' + 
        Math.floor(Math.random() * 255) + '.' + 
        Math.floor(Math.random() * 255) + '.' + 
        Math.floor(Math.random() * 255) + '.' + 
        Math.floor(Math.random() * 255));
    
    // In a real implementation, you would send this to a server
    // fetch('/log-security-violation', { method: 'POST', body: JSON.stringify({ violation: 'copy_attempt' }) });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Track external links
document.querySelectorAll('a[href^="http"]').forEach(link => {
    link.addEventListener('click', function(e) {
        // In a real implementation, you would track this
        console.log('External link clicked:', this.href);
        // Allow the link to proceed
    });
});

// Official document watermark effect
function addWatermark() {
    const watermark = document.createElement('div');
    watermark.style.position = 'fixed';
    watermark.style.bottom = '20px';
    watermark.style.right = '20px';
    watermark.style.opacity = '0.1';
    watermark.style.zIndex = '999';
    watermark.style.pointerEvents = 'none';
    watermark.style.fontSize = '24px';
    watermark.style.fontWeight = 'bold';
    watermark.style.color = 'var(--us-blue)';
    watermark.style.transform = 'rotate(-15deg)';
    watermark.textContent = 'OFFICIAL U.S. GOVERNMENT DOCUMENT';
    document.body.appendChild(watermark);
}

addWatermark();
