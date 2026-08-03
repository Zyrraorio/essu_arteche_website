/**
 * Interactive Script for ESSU Arteche Extension Campus & Student Profile
 * Handles Contact Form validation, interactive Alerts, and dynamic UI feedback.
 */

document.addEventListener('DOMContentLoaded', function () {
    console.log("ESSU AEC Script Loaded Successfully! 🌸");

    // Initialize Student Profile Contact Form
    const studentForm = document.getElementById('studentContactForm') || document.querySelector('.girly-form');
    if (studentForm) {
        setupFormValidation(studentForm, 'profile');
    }

    // Initialize Main Contact Page Form (if present)
    const mainContactForm = document.querySelector('.contact-form');
    if (mainContactForm && mainContactForm !== studentForm) {
        setupFormValidation(mainContactForm, 'main');
    }

    // Add interactive input feedback
    const inputs = document.querySelectorAll('.form-control, input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('focus', function () {
            this.parentElement.classList.add('focused');
        });
        input.addEventListener('blur', function () {
            this.parentElement.classList.remove('focused');
        });
    });
});

/**
 * Setup validation and custom alert triggers for forms
 */
function setupFormValidation(formElement, type) {
    formElement.addEventListener('submit', function (event) {
        event.preventDefault();

        // Retrieve field values
        let nameVal = '';
        let emailVal = '';
        let messageVal = '';
        let courseVal = '';

        if (type === 'profile') {
            const nameInput = document.getElementById('fullname') || formElement.querySelector('#name');
            const emailInput = document.getElementById('email') || formElement.querySelector('#email');
            const messageInput = document.getElementById('message') || formElement.querySelector('#message');
            const courseSelect = document.getElementById('course');

            nameVal = nameInput ? nameInput.value.trim() : '';
            emailVal = emailInput ? emailInput.value.trim() : '';
            messageVal = messageInput ? messageInput.value.trim() : '';
            courseVal = courseSelect ? courseSelect.value : '';
        } else {
            const nameInput = formElement.querySelector('#name');
            const emailInput = formElement.querySelector('#email');
            const messageInput = formElement.querySelector('#message');

            nameVal = nameInput ? nameInput.value.trim() : '';
            emailVal = emailInput ? emailInput.value.trim() : '';
            messageVal = messageInput ? messageInput.value.trim() : '';
        }

        // Validation Checks
        if (!nameVal) {
            showCustomAlert('⚠️ Validation Error', 'Please enter your Full Name before submitting.', 'error');
            return;
        }

        if (!emailVal || !isValidEmail(emailVal)) {
            showCustomAlert('⚠️ Validation Error', 'Please enter a valid Email Address.', 'error');
            return;
        }

        if (!messageVal) {
            showCustomAlert('⚠️ Validation Error', 'Please enter your message before sending.', 'error');
            return;
        }

        // Success Alert Message
        const successTitle = '💖 Message Sent Successfully!';
        const successMsg = `Thank you, ${nameVal}! Your message regarding "${courseVal || 'General Inquiry'}" has been sent. Zyrra will get back to you at ${emailVal} soon! ✨`;

        // Trigger native alert and custom UI alert modal
        alert(`✨ SUCCESS! ✨\n\nThank you, ${nameVal}!\nYour message has been sent successfully to Zyrra.\n\nDetails:\n- Email: ${emailVal}\n- Course: ${courseVal || 'N/A'}`);

        showCustomAlert(successTitle, successMsg, 'success');

        // Reset form inputs after submission
        formElement.reset();
    });

    // Form Reset Handler
    formElement.addEventListener('reset', function () {
        setTimeout(() => {
            showCustomAlert('🌸 Form Reset', 'All input fields have been cleared.', 'info');
        }, 10);
    });
}

/**
 * Basic Email Regex Validator
 */
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Creates and displays a modern girly Modal Alert Popup
 */
function showCustomAlert(title, message, type = 'info') {
    // Remove existing modal if any
    const existingModal = document.getElementById('girlyAlertModal');
    if (existingModal) {
        existingModal.remove();
    }

    let icon = '🌸';
    let headerBg = 'linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)';

    if (type === 'error') {
        icon = '⚠️';
        headerBg = 'linear-gradient(135deg, #ff4e50 0%, #f9d423 100%)';
    } else if (type === 'success') {
        icon = '💖';
        headerBg = 'linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)';
    }

    const modalHTML = `
        <div id="girlyAlertModal" class="alert-modal-backdrop">
            <div class="alert-modal-card">
                <div class="alert-modal-header" style="background: ${headerBg};">
                    <span class="alert-modal-icon">${icon}</span>
                    <h3>${title}</h3>
                </div>
                <div class="alert-modal-body">
                    <p>${message}</p>
                </div>
                <div class="alert-modal-footer">
                    <button id="closeGirlyAlert" class="alert-modal-btn">Okay 💕</button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modal = document.getElementById('girlyAlertModal');
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);

    document.getElementById('closeGirlyAlert').addEventListener('click', function () {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.remove();
        }, 300);
    });
}
