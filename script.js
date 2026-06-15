/* ==========================================================================
   BILINGUAL TRANSLATION DICTIONARY
   ========================================================================== */
const i18n = {
    // Navigation
    nav_home: { ar: 'الرئيسية', en: 'Home' },
    nav_services: { ar: 'خدماتنا', en: 'Services' },
    nav_gallery: { ar: 'الحالات', en: 'Gallery' },
    nav_doctors: { ar: 'أطباؤنا', en: 'Doctors' },
    nav_branches: { ar: 'الفروع', en: 'Branches' },
    nav_faq: { ar: 'أسئلة تهمك', en: 'FAQs' },
    nav_booking_nav: { ar: 'تواصل معنا', en: 'Contact' },
    btn_book_now: { ar: 'احجز الآن', en: 'Book Now' },

    // Hero Section
    hero_badge: { ar: '✨ مركز متكامل لطب وتجميل الأسنان', en: '✨ Premium Dental & Cosmetic Center' },
    btn_schedule_appointment: { ar: 'احجز موعدك الآن', en: 'Book Appointment' },
    btn_explore_services: { ar: 'استكشف خدماتنا', en: 'Explore Services' },

    // Services Section
    services_tag: { ar: 'الخدمات', en: 'Services' },
    service_learn_more: { ar: 'احجز استشارة ←', en: 'Book Consultation ←' },

    // Gallery Section
    gallery_tag: { ar: 'ابتساماتنا', en: 'Smile Gallery' },
    gallery_btn_consult: { ar: 'حجز استشارة تجميلية', en: 'Book Cosmetic Consultation' },

    // Doctors Section
    doctors_tag: { ar: 'أطباؤنا', en: 'Our Doctors' },

    // Branches Section
    branches_tag: { ar: 'الفروع', en: 'Branches' },
    btn_show_map: { ar: 'عرض الخريطة', en: 'View Map' },
    branch_status_open: { ar: 'مفتوح الآن', en: 'Open Now' },

    // Booking Wizard Section
    booking_tag: { ar: 'احجز الآن', en: 'Book Now' },
    wizard_prev: { ar: 'السابق', en: 'Back' },
    wizard_next: { ar: 'التالي', en: 'Next' },
    btn_book_another: { ar: 'حجز موعد جديد', en: 'Book Another Appointment' },

    // FAQ Section
    faq_tag: { ar: 'الأسئلة', en: 'FAQ' },
    testimonials_tag: { ar: 'آراء مراجعينا', en: 'Patient Reviews' },

    // Chatbot Widget Chips
    chip_book: { ar: '📅 احجز موعداً', en: '📅 Book Appointment' },
    chip_locations: { ar: '📍 فروعنا وعناويننا', en: '📍 Our Branches' },
    chip_services: { ar: '🦷 خدماتنا الطبية', en: '🦷 Our Services' },
    chip_hours: { ar: '⏰ مواعيد العمل', en: '⏰ Working Hours' }
};

// State Variables
let currentLanguage = 'ar';

/* ==========================================================================
   LANGUAGE SWITCHER LOGIC
   ========================================================================== */
const langToggleBtn = document.getElementById('langToggle');

function setLanguage(lang) {
    currentLanguage = lang;
    const htmlElement = document.documentElement;
    
    // Toggle HTML lang and direction
    htmlElement.setAttribute('lang', lang);
    if (lang === 'ar') {
        htmlElement.setAttribute('dir', 'rtl');
    } else {
        htmlElement.setAttribute('dir', 'ltr');
    }

    // Update i18n translated elements
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (i18n[key]) {
            element.textContent = i18n[key][lang];
        }
    });

    // Update input placeholders dynamically
    const chatInput = document.getElementById('chatInput');
    const chatInputEn = document.getElementById('chatInputEn');
    const patientName = document.getElementById('patientName');
    const patientNotes = document.getElementById('patientNotes');

    if (lang === 'ar') {
        if (chatInput) chatInput.style.display = 'block';
        if (chatInputEn) chatInputEn.style.display = 'none';
        if (patientName) patientName.setAttribute('placeholder', 'الاسم ثلاثي');
        if (patientNotes) patientNotes.setAttribute('placeholder', 'مثال: ألم شديد في الضرس');
    } else {
        if (chatInput) chatInput.style.display = 'none';
        if (chatInputEn) chatInputEn.style.display = 'block';
        if (patientName) patientName.setAttribute('placeholder', 'Your full name');
        if (patientNotes) patientNotes.setAttribute('placeholder', 'e.g., severe toothache, general checkup');
    }

    // Translate bookingService select options dynamically to bypass native browser styling constraints
    const bookingService = document.getElementById('bookingService');
    if (bookingService) {
        const currentValue = bookingService.value;
        const serviceOptions = {
            ar: [
                { value: '', text: 'اختر نوع الخدمة...' },
                { value: 'cosmetics', text: 'تجميل الأسنان وهوليوود سمايل' },
                { value: 'implants', text: 'زراعة الأسنان' },
                { value: 'ortho', text: 'تقويم الأسنان' },
                { value: 'whitening', text: 'تبييض الأسنان بالليزر' },
                { value: 'pediatric', text: 'طب أسنان الأطفال' },
                { value: 'rootcanal', text: 'علاج الجذور والعصب' },
                { value: 'general', text: 'كشف واستشارة عامة' }
            ],
            en: [
                { value: '', text: 'Select service type...' },
                { value: 'cosmetics', text: 'Cosmetic Dentistry & Hollywood Smile' },
                { value: 'implants', text: 'Dental Implants' },
                { value: 'ortho', text: 'Orthodontics (Braces/Aligners)' },
                { value: 'whitening', text: 'Teeth Whitening' },
                { value: 'pediatric', text: 'Pediatric Dentistry' },
                { value: 'rootcanal', text: 'Root Canal & Endodontics' },
                { value: 'general', text: 'General Checkup & Consultation' }
            ]
        };
        bookingService.innerHTML = '';
        serviceOptions[lang].forEach(opt => {
            const optionEl = document.createElement('option');
            optionEl.value = opt.value;
            optionEl.textContent = opt.text;
            bookingService.appendChild(optionEl);
        });
        bookingService.value = currentValue; // preserve selection if any
    }

    // Refresh dynamic contents like date inputs
    renderSmartCalendar();
}

langToggleBtn.addEventListener('click', () => {
    const nextLang = currentLanguage === 'ar' ? 'en' : 'ar';
    setLanguage(nextLang);
});

/* ==========================================================================
   MOBILE MENU TOGGLE
   ========================================================================== */
const mobileNavToggle = document.getElementById('mobileNavToggle');
const navMenu = document.getElementById('navMenu');

mobileNavToggle.addEventListener('click', () => {
    mobileNavToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileNavToggle.classList.remove('active');
        navMenu.classList.remove('active');
        
        // Update active class
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

/* ==========================================================================
   BEFORE/AFTER DRAG SLIDER LOGIC
   ========================================================================== */
const slider = document.getElementById('beforeAfterSlider');
const handle = document.getElementById('sliderHandle');
const afterContainer = document.getElementById('afterImageContainer');

if (slider && handle && afterContainer) {
    let isDragging = false;

    function moveSlider(x) {
        const rect = slider.getBoundingClientRect();
        let position = (x - rect.left) / rect.width;
        
        // Constrain boundaries (keep handle within slider)
        if (position < 0) position = 0;
        if (position > 1) position = 1;
        
        const percentage = position * 100;
        
        // Move handle and adjust after-image clipping
        handle.style.left = `${percentage}%`;
        afterContainer.style.clipPath = `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)`;
    }

    // Mouse events
    handle.addEventListener('mousedown', () => isDragging = true);
    window.addEventListener('mouseup', () => isDragging = false);
    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        moveSlider(e.clientX);
    });

    // Touch events
    handle.addEventListener('touchstart', () => isDragging = true);
    window.addEventListener('touchend', () => isDragging = false);
    window.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        moveSlider(e.touches[0].clientX);
    });

    // Also support clicking anywhere on the slider to jump
    slider.addEventListener('click', (e) => {
        if (e.target.closest('#sliderHandle')) return; // Avoid double triggering on handle
        moveSlider(e.clientX);
    });
}

/* ==========================================================================
   BRANCH MAP SWITCHER LOGIC
   ========================================================================== */
const branchCards = [
    document.getElementById('branchCardBanha'),
    document.getElementById('branchCardHeliopolis')
];
const googleMapIframe = document.getElementById('googleMapIframe');

const mapsUrls = {
    banha: "https://maps.google.com/maps?q=30.474807,31.18183&t=&z=16&ie=UTF8&iwloc=&output=embed",
    heliopolis: "https://maps.google.com/maps?q=30.08639,31.32551&t=&z=16&ie=UTF8&iwloc=&output=embed"
};

const mapTabs = document.querySelectorAll('.map-tab');
const getDirectionsBtn = document.getElementById('getDirectionsBtn');

const directionsUrls = {
    banha: "https://maps.google.com/?q=Edhak+Dental+Clinic+Banha",
    heliopolis: "https://maps.google.com/?q=Edhak+Dental+Clinic+Heliopolis"
};

function switchBranchMap(branchKey) {
    // Update map iframe src
    if (googleMapIframe) googleMapIframe.src = mapsUrls[branchKey];

    // Toggle active card
    branchCards.forEach(card => {
        if (!card) return;
        if (card.getAttribute('data-map') === branchKey) {
            card.classList.add('active');
        } else {
            card.classList.remove('active');
        }
    });

    // Toggle active tab
    mapTabs.forEach(tab => {
        if (tab.getAttribute('data-map-tab') === branchKey) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });

    // Toggle active toggle buttons
    const branchToggleBtns = document.querySelectorAll('.branch-toggle-btn');
    branchToggleBtns.forEach(btn => {
        if (btn.getAttribute('data-branch') === branchKey) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Update GPS directions navigation button
    if (getDirectionsBtn) {
        getDirectionsBtn.href = directionsUrls[branchKey];
    }
}

// Branch Toggle Switcher Listeners
document.querySelectorAll('.branch-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const branchKey = btn.getAttribute('data-branch');
        switchBranchMap(branchKey);
    });
});

branchCards.forEach(card => {
    if (!card) return;
    card.addEventListener('click', (e) => {
        // Don't switch map if they click whatsapp link directly
        if (e.target.closest('.btn-whatsapp')) return;
        
        const branchKey = card.getAttribute('data-map');
        switchBranchMap(branchKey);
    });
});

// Click handlers for Map Buttons inside cards
document.querySelectorAll('.show-map-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation(); // Stop propagating click event to parent card
        const branchKey = btn.getAttribute('data-branch');
        switchBranchMap(branchKey);
        // Scroll map into view on mobile
        if (window.innerWidth <= 1024) {
            if (googleMapIframe) googleMapIframe.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Click handlers for map tabs above the iframe
mapTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const branchKey = tab.getAttribute('data-map-tab');
        switchBranchMap(branchKey);
    });
});

/* ==========================================================================
   BOOKING WIZARD LOGIC
   ========================================================================== */
const bookingForm = document.getElementById('bookingForm');
const selectedTimeSlotInput = document.getElementById('selectedTimeSlot');
const bookingDateInput = document.getElementById('bookingDate');
const bookingBranchInputs = document.getElementsByName('bookingBranch');

// Smart Calendar State Variables
let calCurrentMonth = new Date().getMonth();
let calCurrentYear = new Date().getFullYear();
let calSelectedDateStr = "";

const calendarTranslations = {
    months: {
        ar: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"],
        en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    },
    weekdays: {
        ar: ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة"],
        en: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"]
    }
};

// Radio Branch Selection visuals in booking wizard
document.querySelectorAll('.branch-option-card').forEach(card => {
    const radio = card.querySelector('input[type="radio"]');
    card.addEventListener('click', () => {
        document.querySelectorAll('.branch-option-card').forEach(c => c.classList.remove('checked'));
        card.classList.add('checked');
        radio.checked = true;
        
        // Clear selected date if it is closed for the newly selected branch
        if (calSelectedDateStr) {
            const selectedDate = new Date(calSelectedDateStr);
            const dayOfWeek = selectedDate.getDay();
            const activeBranch = radio.value;
            let isClosed = false;
            if (activeBranch === 'banha' && dayOfWeek === 5) {
                isClosed = true;
            } else if (activeBranch === 'heliopolis' && dayOfWeek === 0) {
                isClosed = true;
            }
            
            if (isClosed) {
                calSelectedDateStr = "";
                bookingDateInput.value = "";
                selectedTimeSlotInput.value = "day_only";
            }
        }
        
        renderSmartCalendar();
    });
});

// Simulate Time slots based on date
const timeSlotsPool = [
    "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", 
    "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM"
];

function generateTimeSlots() {
    // Booking is day-only
}

// Validate inputs of the booking form before submission
function validateBookingForm() {
    const service = document.getElementById('bookingService').value;
    if (!service) {
        alert(currentLanguage === 'ar' ? '⚠️ يرجى اختيار الخدمة الطبية المطلوبة.' : '⚠️ Please select a required treatment.');
        return false;
    }
    const date = bookingDateInput.value;
    if (!date) {
        alert(currentLanguage === 'ar' ? '⚠️ يرجى اختيار التاريخ المفضل.' : '⚠️ Please select preferred Date.');
        return false;
    }
    const name = document.getElementById('patientName').value.trim();
    const phone = document.getElementById('patientPhone').value.trim();
    if (!name || !phone) {
        alert(currentLanguage === 'ar' ? '⚠️ يرجى إدخال اسمك ورقم الهاتف للتواصل.' : '⚠️ Please fill your Name and Phone number.');
        return false;
    }
    // Basic Egyptian mobile validation (11 digits, starts with 01)
    const phoneRegex = /^01[0125][0-9]{8}$/;
    if (!phoneRegex.test(phone)) {
        alert(currentLanguage === 'ar' ? '⚠️ يرجى إدخال رقم هاتف مصري صحيح (مثال: 01012345678).' : '⚠️ Please enter a valid Egyptian phone number (e.g., 01012345678).');
        return false;
    }
    return true;
}

// Form submit event listener
if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateBookingForm()) {
            submitBookingForm();
        }
    });
}

// Simulate Form submission and generate Digital Ticket
function submitBookingForm() {
    const branchVal = document.querySelector('input[name="bookingBranch"]:checked').value;
    const serviceSelect = document.getElementById('bookingService');
    const serviceText = serviceSelect.options[serviceSelect.selectedIndex]?.text || '';
    const dateVal = bookingDateInput.value;
    const nameVal = document.getElementById('patientName').value.trim();
    const phoneVal = document.getElementById('patientPhone').value.trim();

    // Generate simulated reference code
    const randNum = Math.floor(1000 + Math.random() * 9000);
    const refCode = `ED-2026-${randNum}`;

    // Update Digital Ticket elements
    const digitalTicket = document.getElementById('digitalTicket');
    const ticketBranchText = branchVal === 'banha' 
        ? (currentLanguage === 'ar' ? 'بنها (منطقة الفلل)' : 'Banha (El-Villas)')
        : (currentLanguage === 'ar' ? 'مصر الجديدة (القاهرة)' : 'Heliopolis (Cairo)');

    digitalTicket.innerHTML = `
        <div class="ticket-brand">
            🎫 تذكرة موعد اضحك | EDHAK Appointment
        </div>
        <div class="ticket-grid">
            <div class="ticket-item">
                <span class="ticket-lbl lang-ar">اسم المريض</span>
                <span class="ticket-lbl lang-en">Patient Name</span>
                <span class="ticket-val">${nameVal}</span>
            </div>
            <div class="ticket-item">
                <span class="ticket-lbl lang-ar">الفرع</span>
                <span class="ticket-lbl lang-en">Branch</span>
                <span class="ticket-val">${ticketBranchText}</span>
            </div>
            <div class="ticket-item">
                <span class="ticket-lbl lang-ar">التاريخ المختار</span>
                <span class="ticket-lbl lang-en">Selected Date</span>
                <span class="ticket-val">${formatReadableDate(dateVal, currentLanguage)}</span>
            </div>
            <div class="ticket-item">
                <span class="ticket-lbl lang-ar">الخدمة</span>
                <span class="ticket-lbl lang-en">Treatment</span>
                <span class="ticket-val">${serviceText}</span>
            </div>
            <div class="ticket-code">
                ${refCode}
            </div>
        </div>
    `;

    // WhatsApp Message Integration
    const shareWhatsappBtn = document.getElementById('shareWhatsappBtn');
    const clinicPhone = branchVal === 'banha' ? '201022225000' : '201233334000';
    const readableDate = formatReadableDate(dateVal, currentLanguage);
    const msgText = currentLanguage === 'ar'
        ? `مرحباً عيادة اضحك، أود تأكيد موعد حجز الكشف الخاص بي:\nالاسم: ${nameVal}\nالفرع: ${ticketBranchText}\nالتاريخ: ${readableDate}\nالخدمة: ${serviceText}\nرقم المرجع: ${refCode}`
        : `Hello Edhak Clinic, I would like to confirm my dental booking:\nName: ${nameVal}\nBranch: ${ticketBranchText}\nDate: ${readableDate}\nTreatment: ${serviceText}\nReference: ${refCode}`;
        
    shareWhatsappBtn.href = `https://wa.me/${clinicPhone}?text=${encodeURIComponent(msgText)}`;

    // Hide Form and show Success page
    bookingForm.style.display = 'none';
    document.getElementById('wizardSuccess').classList.add('active');

    // Scroll to success card
    document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
}

// Reset Booking wizard button
const resetWizardBtn = document.getElementById('resetWizardBtn');
resetWizardBtn.addEventListener('click', () => {
    // Reset form fields
    bookingForm.reset();
    bookingForm.style.display = 'block';
    document.getElementById('wizardSuccess').classList.remove('active');
    
    // Reset hidden slot input
    if (selectedTimeSlotInput) {
        selectedTimeSlotInput.value = 'day_only';
    }
    
    // Reset smart calendar selection
    calSelectedDateStr = "";
    calCurrentMonth = new Date().getMonth();
    calCurrentYear = new Date().getFullYear();
    renderSmartCalendar();

    // Reset radio visual checked state
    document.querySelectorAll('.branch-option-card').forEach(c => {
        c.classList.remove('checked');
    });
    const firstBranchCard = document.querySelector('.branch-option-card');
    firstBranchCard.classList.add('checked');
    firstBranchCard.querySelector('input[type="radio"]').checked = true;

});

/* ==========================================================================
   FAQ SPLIT VIDEO TABS LOGIC
   ========================================================================== */
function initFAQVideoTabs() {
    const tabItems = document.querySelectorAll('.faq-tab-item');
    const videoPlayer = document.getElementById('faqVideoPlayer');
    const loadingOverlay = document.getElementById('phoneLoadingOverlay');

    if (!tabItems.length || !videoPlayer) return;

    // Hide loading overlay once the initial iframe finishes loading
    videoPlayer.addEventListener('load', () => {
        if (loadingOverlay) loadingOverlay.classList.add('hidden');
    });

    tabItems.forEach(item => {
        const btn = item.querySelector('.faq-tab-btn');
        if (!btn) return;
        
        btn.addEventListener('click', () => {
            if (item.classList.contains('active')) return;

            // Remove active class from all items
            tabItems.forEach(i => i.classList.remove('active'));

            // Add active class to current item
            item.classList.add('active');

            // Show loading overlay while new video loads
            const videoId = item.getAttribute('data-video-id');
            if (videoId) {
                if (loadingOverlay) {
                    loadingOverlay.classList.remove('hidden');
                }
                videoPlayer.src = `https://www.instagram.com/reel/${videoId}/embed/`;
            }

            // Smooth scroll to video mockup on mobile/tablet
            if (window.innerWidth <= 992) {
                const videoPanel = document.querySelector('.faq-video-panel');
                if (videoPanel) {
                    videoPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    });
}

initFAQVideoTabs();

/* ==========================================================================
   INTERACTIVE CHATBOT (EDHAK BOT) LOGIC
   ========================================================================== */
const chatWidget = document.getElementById('chatbotWidget');
const chatTriggerBtn = document.getElementById('chatTriggerBtn');
const chatPanel = document.getElementById('chatPanel');
const chatCloseBtn = document.getElementById('chatCloseBtn');
const chatBody = document.getElementById('chatBody');
const chatInput = document.getElementById('chatInput');
const chatInputEn = document.getElementById('chatInputEn');
const chatSendBtn = document.getElementById('chatSendBtn');

// Open/Close triggers
chatTriggerBtn.addEventListener('click', () => {
    chatPanel.classList.toggle('active');
    chatWidget.querySelector('.bubble-badge').style.display = 'none'; // Clear notification badge
});

chatCloseBtn.addEventListener('click', () => {
    chatPanel.classList.remove('active');
});

// Typing indicator helpers
function showTypingIndicator() {
    if (document.getElementById('chatTypingIndicator')) return;

    const indicator = document.createElement('div');
    indicator.id = 'chatTypingIndicator';
    indicator.classList.add('chat-msg', 'bot');

    const bubble = document.createElement('div');
    bubble.classList.add('msg-bubble', 'typing-dots');
    bubble.innerHTML = `
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
    `;
    indicator.appendChild(bubble);
    chatBody.appendChild(indicator);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function hideTypingIndicator() {
    const indicator = document.getElementById('chatTypingIndicator');
    if (indicator) {
        indicator.remove();
    }
}

// Handle Quick Chip Actions
document.querySelectorAll('.chat-chip').forEach(chip => {
    chip.addEventListener('click', () => {
        const action = chip.getAttribute('data-action');
        const userMsgText = chip.textContent;
        
        // Push user message bubble
        appendChatMessage(userMsgText, 'user');
        
        showTypingIndicator();
        
        // Generate simulated bot reply based on action
        setTimeout(() => {
            hideTypingIndicator();
            handleBotAction(action);
        }, 900);
    });
});

// Function to append message bubbles to stream
function appendChatMessage(text, sender) {
    const timeNow = new Date();
    const timeString = `${String(timeNow.getHours()).padStart(2, '0')}:${String(timeNow.getMinutes()).padStart(2, '0')}`;

    const msgWrapper = document.createElement('div');
    msgWrapper.classList.add('chat-msg', sender);

    const bubble = document.createElement('div');
    bubble.classList.add('msg-bubble');
    bubble.textContent = text;

    const time = document.createElement('span');
    time.classList.add('msg-time');
    time.textContent = timeString;

    msgWrapper.appendChild(bubble);
    msgWrapper.appendChild(time);
    chatBody.appendChild(msgWrapper);

    // Scroll to bottom
    chatBody.scrollTop = chatBody.scrollHeight;
}

// Chatbot Booking States (to guide users step-by-step through a booking inside the chat!)
let chatBookingState = {
    inProgress: false,
    step: 0,
    branch: '',
    service: '',
    name: '',
    phone: ''
};

function handleBotAction(action) {
    let reply = '';
    
    if (action === 'locations') {
        reply = currentLanguage === 'ar'
            ? '📍 فروعنا:\n\n1. فرع بنها: منطقة الفلل، 163 شارع 6 متفرع من شارع الكورنيش، بجوار كافيه مكاني. (تليفون: 0133212500)\n\n2. فرع مصر الجديدة (القاهرة): 74 شارع خليفة المأمون. (تليفون: 0222900000)'
            : '📍 Our Branches:\n\n1. Banha Branch: El-Villas, 163 6th St, off Corniche Road, next to Makani Cafe. (Tel: 0133212500)\n\n2. Heliopolis Branch (Cairo): 74 Khalifa El-Maamon St. (Tel: 0222900000)';
        appendChatMessage(reply, 'bot');
    } else if (action === 'hours') {
        reply = currentLanguage === 'ar'
            ? '⏰ مواعيد عمل العيادات:\n\n- فرع بنها: يومياً من 12:00 ظهراً حتى 10:00 مساءً (الجمعة مغلق).\n- فرع مصر الجديدة: يومياً من 1:00 ظهراً حتى 9:00 مساءً (الأحد مغلق).'
            : '⏰ Working Hours:\n\n- Banha Branch: Daily 12:00 PM - 10:00 PM (Friday Closed).\n- Heliopolis Branch: Daily 1:00 PM - 9:00 PM (Sunday Closed).';
        appendChatMessage(reply, 'bot');
    } else if (action === 'services') {
        reply = currentLanguage === 'ar'
            ? '🦷 الخدمات المتاحة بمركز اضحك:\n- تجميل وزراعة الأسنان (هوليوود سمايل/قشور خزفية)\n- تقويم الأسنان (العادي والشفاف)\n- تبييض الأسنان بالليزر\n- طب أسنان الأطفال\n- علاج العصب والجذور وعلاج اللثة'
            : '🦷 Available Treatments:\n- Cosmetic Dentistry & Implants (Hollywood Smile/Veneers)\n- Orthodontics (Braces & Aligners)\n- Laser Teeth Whitening\n- Pediatric Dentistry\n- Root Canal & Endodontic Care';
        appendChatMessage(reply, 'bot');
    } else if (action === 'book') {
        // Start interactive chatbot booking process!
        chatBookingState.inProgress = true;
        chatBookingState.step = 1;
        
        reply = currentLanguage === 'ar'
            ? '📅 يسعدني مساعدتك في الحجز هنا! من فضلك اختر الفرع الذي ترغب بزيارته:\n(1) فرع بنها\n(2) فرع مصر الجديدة\nاكتب رقم الفرع أو اسمه.'
            : '📅 I can help you book right here! Please select the branch you wish to visit:\n(1) Banha Branch\n(2) Heliopolis Branch\nWrite the number or branch name.';
        appendChatMessage(reply, 'bot');
    }
}

// Typing input send button handlers
function processUserTextMessage() {
    const input = currentLanguage === 'ar' ? chatInput : chatInputEn;
    const text = input.value.trim();
    if (!text) return;

    // Send user message
    appendChatMessage(text, 'user');
    input.value = '';

    showTypingIndicator();

    // Handle reply delay
    setTimeout(() => {
        hideTypingIndicator();
        // Check if booking is in progress in chat
        if (chatBookingState.inProgress) {
            handleChatBookingFlow(text);
        } else {
            generateNaturalReply(text);
        }
    }, 1000);
}

chatSendBtn.addEventListener('click', processUserTextMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') processUserTextMessage();
});
chatInputEn.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') processUserTextMessage();
});

// Chat booking wizard simulation
function handleChatBookingFlow(text) {
    let reply = '';
    const normText = text.toLowerCase();

    // Step 1: Branch Selection
    if (chatBookingState.step === 1) {
        if (normText.includes('1') || normText.includes('بنها') || normText.includes('banha')) {
            chatBookingState.branch = currentLanguage === 'ar' ? 'فرع بنها' : 'Banha Branch';
            chatBookingState.step = 2;
            reply = currentLanguage === 'ar'
                ? '🦷 رائع! ما هي الخدمة الطبية المطلوبة؟ (مثال: تجميل، تقويم، زراعة، كشف، تبييض)'
                : '🦷 Great! What treatment is required? (e.g., cosmetic, braces, implants, checkup, whitening)';
        } else if (normText.includes('2') || normText.includes('جديدة') || normText.includes('heliopolis') || normText.includes('مصر')) {
            chatBookingState.branch = currentLanguage === 'ar' ? 'مصر الجديدة' : 'Heliopolis Branch';
            chatBookingState.step = 2;
            reply = currentLanguage === 'ar'
                ? '🦷 رائع! ما هي الخدمة الطبية المطلوبة؟ (مثال: تجميل، تقويم، زراعة، كشف، تبييض)'
                : '🦷 Great! What treatment is required? (e.g., cosmetic, braces, implants, checkup, whitening)';
        } else {
            reply = currentLanguage === 'ar'
                ? '⚠️ من فضلك اختر الفرع بكتابة (1) لفرع بنها أو (2) لفرع مصر الجديدة.'
                : '⚠️ Please choose a branch by entering (1) for Banha or (2) for Heliopolis.';
        }
        appendChatMessage(reply, 'bot');
        return;
    }

    // Step 2: Treatment Selection
    if (chatBookingState.step === 2) {
        chatBookingState.service = text;
        chatBookingState.step = 3;
        reply = currentLanguage === 'ar'
            ? '👤 حسناً، الرجاء كتابة اسمك الكامل لتسجيل الطلب:'
            : '👤 Got it. Please write your Full Name to register the booking:';
        appendChatMessage(reply, 'bot');
        return;
    }

    // Step 3: Name
    if (chatBookingState.step === 3) {
        chatBookingState.name = text;
        chatBookingState.step = 4;
        reply = currentLanguage === 'ar'
            ? '📞 شكراً لك! أخيراً، الرجاء إدخال رقم هاتفك المحمول (الواتساب) للتواصل وتأكيد الموعد:'
            : '📞 Thank you! Finally, please enter your Mobile Number (WhatsApp) to contact you and confirm the slot:';
        appendChatMessage(reply, 'bot');
        return;
    }

    // Step 4: Phone (Finish)
    if (chatBookingState.step === 4) {
        const phoneRegex = /^01[0125][0-9]{8}$/;
        if (!phoneRegex.test(text.trim())) {
            reply = currentLanguage === 'ar'
                ? '⚠️ عذراً، الرجاء كتابة رقم هاتف محمول مصري صحيح مكون من 11 رقماً (مثال: 01012345678).'
                : '⚠️ Sorry, please enter a valid 11-digit Egyptian mobile number (e.g., 01012345678).';
            appendChatMessage(reply, 'bot');
            return;
        }

        chatBookingState.phone = text.trim();
        chatBookingState.inProgress = false;
        chatBookingState.step = 0;

        const randNum = Math.floor(1000 + Math.random() * 9000);
        const refCode = `ED-BOT-${randNum}`;

        reply = currentLanguage === 'ar'
            ? `🎉 تم تسجيل طلب حجزك بنجاح! تفاصيل الموعد المبدئي:\n\n- الاسم: ${chatBookingState.name}\n- الفرع: ${chatBookingState.branch}\n- الخدمة: ${chatBookingState.service}\n- كود الطلب: ${refCode}\n\nسيقوم مسؤول الاستقبال بالاتصال بك هاتفياً أو عبر واتساب لتحديد تاريخ ووقت الحضور المناسب لك. شكراً لثقتك بنا!`
            : `🎉 Your booking request has been registered successfully! Tentative details:\n\n- Patient Name: ${chatBookingState.name}\n- Branch: ${chatBookingState.branch}\n- Service: ${chatBookingState.service}\n- Code: ${refCode}\n\nOur receptionist will contact you shortly via phone or WhatsApp to schedule the exact date & time. Thank you!`;
            
        appendChatMessage(reply, 'bot');
        
        // Also provide redirect chip to main booking section
        const bookingLink = document.createElement('div');
        bookingLink.style.marginTop = '10px';
        bookingLink.innerHTML = currentLanguage === 'ar'
            ? `<a href="#booking" onclick="document.getElementById('chatPanel').classList.remove('active');" style="color: var(--color-gold-base); font-weight: bold; text-decoration: underline;">يمكنك أيضاً تعديل تفاصيل حجزك في النموذج الرئيسي من هنا</a>`
            : `<a href="#booking" onclick="document.getElementById('chatPanel').classList.remove('active');" style="color: var(--color-gold-base); font-weight: bold; text-decoration: underline;">You can also modify details in the main wizard here</a>`;
        chatBody.appendChild(bookingLink);
        chatBody.scrollTop = chatBody.scrollHeight;
    }
}

// Simple rule-based chatbot NLP keyword response system
function generateNaturalReply(userMsg) {
    const text = userMsg.toLowerCase().trim();
    let reply = '';

    // Keywords mappings
    const isAr = currentLanguage === 'ar';

    // 1. Booking intent
    if (text.includes('حجز') || text.includes('موعد') || text.includes('كشف') || text.includes('book') || text.includes('reserve') || text.includes('appointment')) {
        handleBotAction('book');
        return;
    }

    // 2. Specific branches / Locations
    if (text.includes('بنها') || text.includes('banha') || text.includes('الفلل')) {
        reply = isAr
            ? '📍 فرع بنها يقع في منطقة الفلل: 163 شارع 6 متفرع من شارع الكورنيش، بجوار كافيه مكاني. تليفون: 01022225000 | 0133212500. مواعيد العمل: 12:00 ظهراً - 10:00 مساءً (الجمعة مغلق).'
            : '📍 Banha Branch is located at El-Villas: 163 6th St., off Corniche Rd., next to Makani Cafe. Tel: 01022225000 | 0133212500. Open daily: 12:00 PM - 10:00 PM (Friday Closed).';
        appendChatMessage(reply, 'bot');
        return;
    }

    if (text.includes('جديدة') || text.includes('مصر الجديدة') || text.includes('heliopolis') || text.includes('القاهرة') || text.includes('cairo')) {
        reply = isAr
            ? '📍 فرع مصر الجديدة يقع في: 74 شارع خليفة المأمون، مصر الجديدة، القاهرة (بجوار سوق العصر). تليفون: 01233334000 | 0222900000. مواعيد العمل: 1:00 ظهراً - 9:00 مساءً (الأحد مغلق).'
            : '📍 Heliopolis Branch is located at: 74 Khalifa El-Maamon St, Heliopolis, Cairo (Next to Souq El-Asr). Tel: 01233334000 | 0222900000. Open daily: 1:00 PM - 9:00 PM (Sunday Closed).';
        appendChatMessage(reply, 'bot');
        return;
    }

    // 3. Locations / Branches intent general
    if (text.includes('عنوان') || text.includes('فروع') || text.includes('فرع') || text.includes('موقع') || text.includes('مكان') || text.includes('address') || text.includes('location') || text.includes('branch') || text.includes('where')) {
        handleBotAction('locations');
        return;
    }

    // 4. Doctor query
    if (text.includes('دكتور') || text.includes('طبيب') || text.includes('أطباء') || text.includes('محمد') || text.includes('موسى') || text.includes('سارة') || text.includes('مصطفى') || text.includes('الدريني') || text.includes('زيدان') || text.includes('منصور') || text.includes('doctor') || text.includes('dr') || text.includes('dentist') || text.includes('derini') || text.includes('zidan') || text.includes('mansour')) {
        reply = isAr
            ? '🦷 يضم مركز "اضحك" نخبة من الأطباء والاستشاريين:\n' +
              '• د. محمد موسى (المؤسس والمشرف العام - زراعة وتجميل الأسنان)\n' +
              '• د. سارة حمدي (أخصائية التركيبات الثابتة والجمالية)\n' +
              '• د. مصطفى الرفاعي (أخصائي الحشوات التجميلية)\n' +
              '• د. أحمد الدريني (أخصائي طب أسنان الأطفال)\n' +
              '• د. محمد زيدان (أخصائي التقويم والتقويم الشفاف)\n' +
              '• د. محمد منصور (أخصائي علاج الجذور وحشو العصب)\n' +
              'يمكنك مراجعة مواعيد تواجدهم التفصيلية في قسم "أطباؤنا" بالموقع.'
            : '🦷 EDHAK Center features an elite team of dental specialists:\n' +
              '• Dr. Mohamed Moosa (Founder & supervisor - Implants & Cosmetics)\n' +
              '• Dr. Sarah Hamdy (Fixed Prosthodontics Specialist)\n' +
              '• Dr. Mostafa El-Refaey (Cosmetic Fillings Specialist)\n' +
              '• Dr. Ahmed El-Derini (Pediatric Dentistry Specialist)\n' +
              '• Dr. Mohamed Zidan (Orthodontics & Clear Aligners Specialist)\n' +
              '• Dr. Mohamed Mansour (Endodontics & Root Canal Specialist)\n' +
              'You can review their detailed clinical schedules in the "Our Doctors" section of the page.';
        appendChatMessage(reply, 'bot');
        return;
    }

    // 5. Services / Implants / Braces
    if (text.includes('علاج') || text.includes('خدمات') || text.includes('تقويم') || text.includes('زرع') || text.includes('زراعة') || text.includes('تبييض') || text.includes('فينير') || text.includes('سمايل') || text.includes('treatment') || text.includes('service') || text.includes('ortho') || text.includes('braces') || text.includes('implant') || text.includes('veneer') || text.includes('whitening')) {
        handleBotAction('services');
        return;
    }

    // 6. Hours / working hours
    if (text.includes('ساعة') || text.includes('مواعيد') || text.includes('ساعات') || text.includes('تفتح') || text.includes('hours') || text.includes('time') || text.includes('when') || text.includes('open')) {
        handleBotAction('hours');
        return;
    }

    // 7. Price / cost
    if (text.includes('سعر') || text.includes('تكلفة') || text.includes('بكم') || text.includes('فلوس') || text.includes('قسط') || text.includes('تقسيط') || text.includes('price') || text.includes('cost') || text.includes('how much') || text.includes('payment') || text.includes('installments')) {
        reply = isAr
            ? '💰 تختلف التكلفة بناءً على الحالة ونوع العلاج المستخدم. نحن نوفر كشفاً أولياً واستشارات تجميلية بأسعار رمزية، مع خيارات دفع وتقسيط مرنة. يمكنك حجز موعد كشف أو إرسال تفاصيل حالتك لنعطيك قيمة تقريبية.'
            : '💰 Prices vary based on case complexity and materials used. We provide checkups and aesthetic consultations at nominal fees, with flexible installation options. Please book an appointment or send details to get an estimate.';
        appendChatMessage(reply, 'bot');
        return;
    }

    // 8. Offers / discounts
    if (text.includes('عروض') || text.includes('عرض') || text.includes('خصم') || text.includes('تخفيض') || text.includes('offer') || text.includes('discount') || text.includes('promo')) {
        reply = isAr
            ? '🎉 نحن نوفر عروضاً حصرية ومميزة على خدمات تبييض الأسنان بالليزر، وقشور الفينير التجميلية، وزراعة الأسنان الفورية. يمكنك متابعة عروضنا من خلال حجز استشارة أو التواصل معنا مباشرة عبر واتساب.'
            : '🎉 We offer exclusive discount packages on laser whitening, cosmetic veneers, and immediate implants. You can learn about our current offers by booking a consultation or messaging us on WhatsApp.';
        appendChatMessage(reply, 'bot');
        return;
    }

    // 9. Pain / Dental ache
    if (text.includes('ألم') || text.includes('وجع') || text.includes('ضرس') || text.includes('سنة') || text.includes('pain') || text.includes('ache') || text.includes('hurt') || text.includes('toothache')) {
        reply = isAr
            ? '⚠️ سلامتك! إذا كنت تعاني من ألم شديد ومفاجئ، فقد يكون ذلك التهاب عصب حاد. يوصى بحجز موعد طارئ لتنظيف الجذور. يمكنك الاتصال بنا فوراً على الأرقام: 01022225000 (بنها) أو 01233334000 (مصر الجديدة) لترتيب جلسة مسكنة فورية.'
            : '⚠️ Sorry to hear that! Severe sudden pain is often an indicator of acute nerve infection. We recommend booking an emergency root canal consultation. Contact us immediately: 01022225000 (Banha) or 01233334000 (Heliopolis) for emergency relief.';
        appendChatMessage(reply, 'bot');
        return;
    }

    // 10. General greeting
    if (text.includes('أهلاً') || text.includes('سلام') || text.includes('مرحبا') || text.includes('hello') || text.includes('hi') || text.includes('hey') || text.includes('greet')) {
        reply = isAr
            ? 'أهلاً بك! كيف يمكنني مساعدتك اليوم؟ يمكنك الاختيار من الأزرار السريعة بالأسفل للحصول على إجابة فورية.'
            : 'Hello! How can I help you today? You can select from the quick options below for an instant answer.';
        appendChatMessage(reply, 'bot');
        return;
    }

    // 11. Fallback
    reply = isAr
        ? 'شكراً لرسالتك! لم أفهم تماماً ما تقصده، ولكن يمكنك حجز موعد كشف مباشرة أو سؤالنا عن "العناوين" أو "مواعيد العمل". وسيقوم أحد أطبائنا بالرد عليك شخصياً عند الحاجة.'
        : "Thank you for your message! I didn't quite get that, but you can book a consultation or ask me about our 'branches' or 'working hours'. A team member will call you if needed.";
    appendChatMessage(reply, 'bot');
}

/* ==========================================================================
   SMART CUSTOM CALENDAR picker rendering
   ========================================================================== */
function renderSmartCalendar() {
    const monthYearLabel = document.getElementById("calMonthYear");
    const weekdaysContainer = document.getElementById("calWeekdays");
    const daysContainer = document.getElementById("calDays");
    
    if (!monthYearLabel || !weekdaysContainer || !daysContainer) return;
    
    const lang = currentLanguage;
    monthYearLabel.textContent = `${calendarTranslations.months[lang][calCurrentMonth]} ${calCurrentYear}`;
    
    // Render Weekdays header
    weekdaysContainer.innerHTML = "";
    calendarTranslations.weekdays[lang].forEach(day => {
        const span = document.createElement("span");
        span.textContent = day;
        weekdaysContainer.appendChild(span);
    });
    
    // Render Days
    daysContainer.innerHTML = "";
    
    const firstDayDate = new Date(calCurrentYear, calCurrentMonth, 1);
    const standardFirstDay = firstDayDate.getDay(); // 0 = Sunday, 1 = Monday, etc.
    // Map Standard day index to Saturday-based index
    const firstDayIndex = (standardFirstDay + 1) % 7;
    
    const totalDays = new Date(calCurrentYear, calCurrentMonth + 1, 0).getDate();
    const prevMonthTotalDays = new Date(calCurrentYear, calCurrentMonth, 0).getDate();
    
    const activeBranchEl = document.querySelector('input[name="bookingBranch"]:checked');
    const activeBranch = activeBranchEl ? activeBranchEl.value : 'banha';
    
    const today = new Date();
    today.setHours(0,0,0,0);
    
    // Padding days from previous month
    for (let i = firstDayIndex - 1; i >= 0; i--) {
        const dayNum = prevMonthTotalDays - i;
        const div = document.createElement("div");
        div.classList.add("cal-day", "other-month", "disabled");
        div.textContent = dayNum;
        daysContainer.appendChild(div);
    }
    
    // Current month days
    for (let day = 1; day <= totalDays; day++) {
        const div = document.createElement("div");
        div.classList.add("cal-day");
        div.textContent = day;
        
        const thisDate = new Date(calCurrentYear, calCurrentMonth, day);
        const standardDayOfWeek = thisDate.getDay();
        
        const yyyy = calCurrentYear;
        const mm = String(calCurrentMonth + 1).padStart(2, '0');
        const dd = String(day).padStart(2, '0');
        const dateStr = `${yyyy}-${mm}-${dd}`;
        
        const isPast = thisDate < today;
        
        let isClosed = false;
        if (activeBranch === 'banha' && standardDayOfWeek === 5) {
            isClosed = true; // Friday closed
        } else if (activeBranch === 'heliopolis' && standardDayOfWeek === 0) {
            isClosed = true; // Sunday closed
        }
        
        if (dateStr === calSelectedDateStr) {
            div.classList.add("selected");
        }
        
        if (thisDate.getTime() === today.getTime()) {
            div.classList.add("today");
        }
        
        if (isPast || isClosed) {
            div.classList.add("disabled");
        } else {
            div.addEventListener("click", () => {
                calSelectedDateStr = dateStr;
                bookingDateInput.value = dateStr;
                renderSmartCalendar();
            });
        }
        
        daysContainer.appendChild(div);
    }
    
    // Padding days from next month
    const totalRendered = firstDayIndex + totalDays;
    const nextPadding = (7 - (totalRendered % 7)) % 7;
    for (let day = 1; day <= nextPadding; day++) {
        const div = document.createElement("div");
        div.classList.add("cal-day", "other-month", "disabled");
        div.textContent = day;
        daysContainer.appendChild(div);
    }
}

function initSmartCalendar() {
    const prevBtn = document.getElementById("calPrevBtn");
    const nextBtn = document.getElementById("calNextBtn");
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener("click", () => {
            calCurrentMonth--;
            if (calCurrentMonth < 0) {
                calCurrentMonth = 11;
                calCurrentYear--;
            }
            renderSmartCalendar();
        });
        
        nextBtn.addEventListener("click", () => {
            calCurrentMonth++;
            if (calCurrentMonth > 11) {
                calCurrentMonth = 0;
                calCurrentYear++;
            }
            renderSmartCalendar();
        });
    }
}

/* ==========================================================================
   SCROLL REVEAL ANIMATIONS
   ========================================================================== */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal-on-scroll');
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });
    
    reveals.forEach(el => observer.observe(el));
}

/* ==========================================================================
   DATE FORMATTING HELPER
   ========================================================================== */
function formatReadableDate(dateStr, lang) {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    try {
        return date.toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', options);
    } catch (e) {
        return dateStr;
    }
}

// Hero Video Playback Toggle
const heroVideo = document.getElementById('heroVideo');
const videoControlBtn = document.getElementById('videoControlBtn');
if (heroVideo && videoControlBtn) {
    videoControlBtn.addEventListener('click', () => {
        if (heroVideo.paused) {
            heroVideo.play();
            videoControlBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;
        } else {
            heroVideo.pause();
            videoControlBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
        }
    });
}

/* ==========================================================================
   SCROLL SPY NAVIGATION ACTIVE LINKS
   ========================================================================== */
function initScrollSpy() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const header = document.querySelector('.header');

    const observerOptions = {
        root: null,
        rootMargin: '-30% 0px -50% 0px',
        threshold: 0
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                const targetLink = document.querySelector(`.nav-link[href="#${id}"]`);
                if (targetLink) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    targetLink.classList.add('active');
                }
                if (header) {
                    header.setAttribute('data-active-section', id);
                }
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(sec => observer.observe(sec));
}

/* ==========================================================================
   DYNAMIC MOUSE SPOTLIGHT GLOW EFFECT
   ========================================================================== */
function initSpotlightGlow() {
    const cards = document.querySelectorAll('.spotlight-glow');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

// Initial setup
setLanguage('ar');
initSmartCalendar();
renderSmartCalendar();
initScrollReveal();
initScrollSpy();
initSpotlightGlow();
initDoctorsSlider();

/* ==========================================================================
   DOCTORS CAROUSEL SLIDER LOGIC
   ========================================================================== */
function initDoctorsSlider() {
    const track = document.getElementById('doctorsSliderTrack');
    const cards = document.querySelectorAll('.doctors-slider-track .doctor-card');
    const prevBtn = document.getElementById('docPrevBtn');
    const nextBtn = document.getElementById('docNextBtn');
    const dotsContainer = document.getElementById('doctorsSliderDots');

    if (!track || cards.length === 0 || !prevBtn || !nextBtn || !dotsContainer) return;

    let currentIndex = 0;
    let itemsPerView = 3;
    let autoplayInterval;

    function getItemsPerView() {
        if (window.innerWidth <= 576) return 1;
        if (window.innerWidth <= 992) return 2;
        if (window.innerWidth <= 1200) return 3;
        return 4;
    }

    function startAutoplay() {
        stopAutoplay();
        autoplayInterval = setInterval(() => {
            itemsPerView = getItemsPerView();
            const maxIndex = Math.max(0, cards.length - itemsPerView);
            if (maxIndex === 0) return;
            if (currentIndex >= maxIndex) {
                goToSlide(0);
            } else {
                goToSlide(currentIndex + 1);
            }
        }, 4000);
    }

    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
        }
    }

    function resetAutoplay() {
        stopAutoplay();
        startAutoplay();
    }

    function updateSliderDimensions() {
        itemsPerView = getItemsPerView();
        const maxIndex = Math.max(0, cards.length - itemsPerView);
        if (currentIndex > maxIndex) {
            currentIndex = maxIndex;
        }

        // Hide controls if there's only one page
        if (maxIndex === 0) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
            dotsContainer.style.display = 'none';
            stopAutoplay();
        } else {
            prevBtn.style.display = 'flex';
            nextBtn.style.display = 'flex';
            dotsContainer.style.display = 'flex';
            startAutoplay();
        }

        // Re-generate pagination dots
        dotsContainer.innerHTML = '';
        const dotsCount = maxIndex + 1;
        for (let i = 0; i < dotsCount; i++) {
            const dot = document.createElement('button');
            dot.classList.add('slider-dot');
            if (i === currentIndex) dot.classList.add('active');
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
            dot.addEventListener('click', () => {
                goToSlide(i);
                resetAutoplay();
            });
            dotsContainer.appendChild(dot);
        }

        goToSlide(currentIndex, true);
    }

    function goToSlide(index, noTransition = false) {
        itemsPerView = getItemsPerView();
        const maxIndex = Math.max(0, cards.length - itemsPerView);
        
        currentIndex = Math.min(Math.max(0, index), maxIndex);

        if (cards.length > 0) {
            const cardWidth = cards[0].getBoundingClientRect().width;
            const gap = 30; // matching CSS gap
            const offset = currentIndex * (cardWidth + gap);
            
            if (noTransition) {
                track.classList.add('no-transition');
            } else {
                track.classList.remove('no-transition');
            }
            
            const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
            if (isRtl) {
                track.style.transform = `translateX(${offset}px)`;
            } else {
                track.style.transform = `translateX(-${offset}px)`;
            }
        }

        const dots = dotsContainer.querySelectorAll('.slider-dot');
        dots.forEach((dot, idx) => {
            if (idx === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        prevBtn.style.opacity = currentIndex === 0 ? '0' : '1';
        prevBtn.style.visibility = currentIndex === 0 ? 'hidden' : 'visible';
        prevBtn.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';
        
        nextBtn.style.opacity = currentIndex === maxIndex ? '0' : '1';
        nextBtn.style.visibility = currentIndex === maxIndex ? 'hidden' : 'visible';
        nextBtn.style.pointerEvents = currentIndex === maxIndex ? 'none' : 'auto';
    }

    prevBtn.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
        resetAutoplay();
    });

    nextBtn.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
        resetAutoplay();
    });

    // Touch Swipe Gesture Detection
    let startX = 0;
    let endX = 0;
    
    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        stopAutoplay();
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        const threshold = 50;
        const diff = startX - endX;
        
        const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                if (isRtl) {
                    goToSlide(currentIndex - 1);
                } else {
                    goToSlide(currentIndex + 1);
                }
            } else {
                if (isRtl) {
                    goToSlide(currentIndex + 1);
                } else {
                    goToSlide(currentIndex - 1);
                }
            }
        }
        startAutoplay();
    }, { passive: true });

    // Hover listeners to pause/play autoplay
    const sliderContainer = document.querySelector('.doctors-slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopAutoplay);
        sliderContainer.addEventListener('mouseleave', startAutoplay);
    }

    // Handle language toggle sync
    const langToggleBtn = document.getElementById('langToggle');
    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            setTimeout(() => {
                goToSlide(currentIndex, true);
            }, 100);
        });
    }

    window.addEventListener('resize', updateSliderDimensions);
    updateSliderDimensions();
}

/* ==========================================================================
   SCROLL PROGRESS INDICATOR
   ========================================================================== */
function initScrollProgress() {
    const progressBar = document.getElementById('scrollProgressBar');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        progressBar.style.width = scrollPercent + '%';
    }, { passive: true });
}

/* ==========================================================================
   3D MOUSE PARALLAX TILT ON HERO COLLAGE
   ========================================================================== */
function initHeroParallax() {
    const collage = document.querySelector('.hero-media-collage');
    const mainCard = document.querySelector('.hero-media-collage .main-card');
    const floatExp = document.querySelector('.hero-media-collage .floating-experience');
    const floatTrust = document.querySelector('.hero-media-collage .floating-trust');
    
    if (!collage || !mainCard) return;

    collage.addEventListener('mousemove', (e) => {
        const rect = collage.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        
        // Coordinates relative to the center of the collage container (-0.5 to 0.5)
        const mouseX = (e.clientX - rect.left) / width - 0.5;
        const mouseY = (e.clientY - rect.top) / height - 0.5;
        
        // Rotations: Y rotates based on horizontal mouse, X rotates based on vertical mouse
        const rotateY = mouseX * 24; // Up to 12 degrees rotation
        const rotateX = -mouseY * 24; // Up to 12 degrees rotation
        
        mainCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
        
        // Parallax offset for floating cards (translate in opposite direction)
        const offsetX = -mouseX * 40;
        const offsetY = -mouseY * 40;
        
        if (floatExp) {
            floatExp.style.transform = `translate3d(${offsetX * 1.5}px, ${offsetY * 1.5}px, 60px)`;
        }
        if (floatTrust) {
            floatTrust.style.transform = `translate3d(${offsetX * 0.8}px, ${offsetY * 0.8}px, 40px)`;
        }
    });

    collage.addEventListener('mouseleave', () => {
        // Smoothly transition back to center
        mainCard.style.transform = `rotateX(0deg) rotateY(0deg) translateZ(0)`;
        if (floatExp) {
            floatExp.style.transform = `translate3d(0, 0, 60px)`;
        }
        if (floatTrust) {
            floatTrust.style.transform = `translate3d(0, 0, 40px)`;
        }
    });
}

// Initialize premium animations
initScrollProgress();
initHeroParallax();
