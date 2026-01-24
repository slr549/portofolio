// ===== GLOBAL VARIABLES =====
let cvData = {
    personal: {
        name: "John Doe",
        title: "Software Engineer",
        photo: "",
        summary: "Experienced software engineer with 5+ years in web development..."
    },
    contact: {
        email: "john.doe@email.com",
        phone: "+62 812-3456-7890",
        location: "Jakarta, Indonesia",
        website: "johndoe.dev",
        linkedin: "linkedin.com/in/johndoe",
        github: "github.com/johndoe"
    },
    education: [
        {
            institution: "University of Technology",
            degree: "Bachelor of Computer Science",
            year: "2016-2020",
            gpa: "3.8/4.0",
            description: "Specialized in AI and Machine Learning"
        }
    ],
    experience: [
        {
            company: "Tech Solutions Inc.",
            position: "Senior Software Engineer",
            duration: "2021-Present",
            description: "Lead developer for multiple web applications..."
        }
    ],
    skills: {
        technical: ["JavaScript", "React", "Node.js", "Python", "AWS"],
        languages: [
            { language: "Indonesian", level: "Native" },
            { language: "English", level: "Fluent" },
            { language: "Japanese", level: "Intermediate" },
            { language: "Chinese", level: "Basic" }
        ],
        soft: ["Leadership", "Problem Solving", "Communication", "Teamwork"]
    }
};

let currentTemplate = "modern";
let currentLanguage = "id";
let isDarkMode = false;

// ===== DOM ELEMENTS =====
const elements = {
    cvContainer: document.getElementById('cvContainer'),
    cvPaper: document.getElementById('cvPaper'),
    cvContent: document.getElementById('cvContent'),
    themeToggle: document.getElementById('themeToggle'),
    languageSelect: document.getElementById('languageSelect'),
    downloadPdfBtn: document.getElementById('downloadPdfBtn'),
    templateModal: document.getElementById('templateModal'),
    templateOptions: document.querySelectorAll('.template-option'),
    fullNameInput: document.getElementById('fullName'),
    jobTitleInput: document.getElementById('jobTitle'),
    photoUpload: document.getElementById('photoUpload')
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    renderCV();
    updatePreviewStats();
});

// ===== CORE FUNCTIONS =====
function initializeApp() {
    // Load saved data from localStorage
    const savedData = localStorage.getItem('cvData');
    if (savedData) {
        cvData = JSON.parse(savedData);
    }
    
    // Set initial values
    elements.fullNameInput.value = cvData.personal.name;
    elements.jobTitleInput.value = cvData.personal.title;
}

function setupEventListeners() {
    // Theme Toggle
    elements.themeToggle.addEventListener('click', toggleTheme);
    
    // Language Selector
    elements.languageSelect.addEventListener('change', function(e) {
        currentLanguage = e.target.value;
        updateLanguage();
    });
    
    // Template Selection
    elements.templateOptions.forEach(option => {
        option.addEventListener('click', function() {
            const template = this.dataset.template;
            switchTemplate(template);
        });
    });
    
    // Download PDF
    elements.downloadPdfBtn.addEventListener('click', downloadPDF);
    
    // Form Inputs (Real-time updates)
    elements.fullNameInput.addEventListener('input', function(e) {
        cvData.personal.name = e.target.value;
        renderCV();
    });
    
    elements.jobTitleInput.addEventListener('input', function(e) {
        cvData.personal.title = e.target.value;
        renderCV();
    });
    
    // Photo Upload
    elements.photoUpload.addEventListener('click', triggerPhotoUpload);
    elements.photoUpload.addEventListener('dragover', handleDragOver);
    elements.photoUpload.addEventListener('drop', handlePhotoDrop);
    
    // Drag & Drop Sections
    setupDragAndDrop();
    
    // Auto-save
    setInterval(saveToLocalStorage, 5000);
}

// ===== TEMPLATE RENDERING =====
function renderCV() {
    let cvHTML = '';
    
    switch(currentTemplate) {
        case 'modern':
            cvHTML = renderModernTemplate();
            break;
        case 'professional':
            cvHTML = renderProfessionalTemplate();
            break;
        case 'creative':
            cvHTML = renderCreativeTemplate();
            break;
        case 'elegant':
            cvHTML = renderElegantTemplate();
            break;
    }
    
    elements.cvContent.innerHTML = cvHTML;
    updatePreviewStats();
    updateMobilePreview();
}

function renderModernTemplate() {
    return `
        <div class="modern-header">
            <div class="profile-photo">
                ${cvData.personal.photo ? 
                    `<img src="${cvData.personal.photo}" alt="${cvData.personal.name}">` : 
                    '<div class="photo-placeholder"><i class="fas fa-user"></i></div>'
                }
            </div>
            <div class="profile-info">
                <h1>${cvData.personal.name}</h1>
                <div class="title">${cvData.personal.title}</div>
                <div class="summary">${cvData.personal.summary}</div>
                
                <div class="contact-info">
                    <div class="contact-item">
                        <i class="fas fa-envelope"></i>
                        <span>${cvData.contact.email}</span>
                    </div>
                    <div class="contact-item">
                        <i class="fas fa-phone"></i>
                        <span>${cvData.contact.phone}</span>
                    </div>
                    <div class="contact-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${cvData.contact.location}</span>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="cv-sections">
            <!-- Education Section -->
            <div class="cv-section">
                <h2 class="section-title">
                    <i class="fas fa-graduation-cap"></i>
                    ${getTranslation('education')}
                </h2>
                ${cvData.education.map(edu => `
                    <div class="timeline-item">
                        <div class="timeline-header">
                            <h3>${edu.institution}</h3>
                            <span class="timeline-date">${edu.year}</span>
                        </div>
                        <div class="timeline-subtitle">${edu.degree}</div>
                        ${edu.gpa ? `<div class="timeline-gpa">GPA: ${edu.gpa}</div>` : ''}
                        <div class="timeline-description">${edu.description}</div>
                    </div>
                `).join('')}
            </div>
            
            <!-- Experience Section -->
            <div class="cv-section">
                <h2 class="section-title">
                    <i class="fas fa-briefcase"></i>
                    ${getTranslation('experience')}
                </h2>
                ${cvData.experience.map(exp => `
                    <div class="timeline-item">
                        <div class="timeline-header">
                            <h3>${exp.company}</h3>
                            <span class="timeline-date">${exp.duration}</span>
                        </div>
                        <div class="timeline-subtitle">${exp.position}</div>
                        <div class="timeline-description">${exp.description}</div>
                    </div>
                `).join('')}
            </div>
            
            <!-- Skills Section -->
            <div class="cv-section">
                <h2 class="section-title">
                    <i class="fas fa-code"></i>
                    ${getTranslation('skills')}
                </h2>
                
                <h3>${getTranslation('technical')}</h3>
                <div class="skills-container">
                    ${cvData.skills.technical.map(skill => `
                        <span class="skill-tag">${skill}</span>
                    `).join('')}
                </div>
                
                <h3>${getTranslation('languages')}</h3>
                <div class="language-list">
                    ${cvData.skills.languages.map(lang => `
                        <div class="language-item">
                            <span class="language-name">${lang.language}</span>
                            <span class="language-level">${lang.level}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
        
        <!-- Social Media -->
        <div class="social-section">
            <h2 class="section-title">
                <i class="fas fa-share-alt"></i>
                ${getTranslation('social')}
            </h2>
            <div class="social-links">
                ${cvData.contact.linkedin ? `
                    <a href="https://${cvData.contact.linkedin}" class="social-link">
                        <i class="fab fa-linkedin"></i> LinkedIn
                    </a>` : ''
                }
                ${cvData.contact.github ? `
                    <a href="https://${cvData.contact.github}" class="social-link">
                        <i class="fab fa-github"></i> GitHub
                    </a>` : ''
                }
                ${cvData.contact.website ? `
                    <a href="https://${cvData.contact.website}" class="social-link">
                        <i class="fas fa-globe"></i> Portfolio
                    </a>` : ''
                }
            </div>
        </div>
    `;
}

function renderProfessionalTemplate() {
    // Similar structure with professional styling
    return `
        <div class="professional-template"></div>
            <div class="profile-photo">
                ${cvData.personal.photo ? 
                    `<img src="${cvData.personal.photo}" alt="${cvData.personal.name}">` : 
                    '<div class="photo-placeholder"><i class="fas fa-user"></i></div>'
                }
            </div>
            <div class="profile-info">
                <h1>${cvData.personal.name}</h1>
                <div class="title">${cvData.personal.title}</div>
                <div class="summary">${cvData.personal.summary}</div>
                
                <div class="contact-info">
                    <div class="contact-item">
                        <i class="fas fa-envelope"></i>
                        <span>${cvData.contact.email}</span>
                    </div>
                    <div class="contact-item">
                        <i class="fas fa-phone"></i>
                        <span>${cvData.contact.phone}</span>
                    </div>
                    <div class="contact-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${cvData.contact.location}</span>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="cv-sections">
            <!-- Education Section -->
            <div class="cv-section">
                <h2 class="section-title">
                    <i class="fas fa-graduation-cap"></i>
                    ${getTranslation('education')}
                </h2>
                ${cvData.education.map(edu => `
                    <div class="timeline-item">
                        <div class="timeline-header">
                            <h3>${edu.institution}</h3>
                            <span class="timeline-date">${edu.year}</span>
                        </div>
                        <div class="timeline-subtitle">${edu.degree}</div>
                        ${edu.gpa ? `<div class="timeline-gpa">GPA: ${edu.gpa}</div>` : ''}
                        <div class="timeline-description">${edu.description}</div>
                    </div>
                `).join('')}
            </div>
            
            <!-- Experience Section -->
            <div class="cv-section">
                <h2 class="section-title">
                    <i class="fas fa-briefcase"></i>
                    ${getTranslation('experience')}
                </h2>
                ${cvData.experience.map(exp => `
                    <div class="timeline-item">
                        <div class="timeline-header">
                            <h3>${exp.company}</h3>
                            <span class="timeline-date">${exp.duration}</span>
                        </div>
                        <div class="timeline-subtitle">${exp.position}</div>
                        <div class="timeline-description">${exp.description}</div>
                    </div>
                `).join('')}
            </div>
            
            <!-- Skills Section -->
            <div class="cv-section">
                <h2 class="section-title">
                    <i class="fas fa-code"></i>
                    ${getTranslation('skills')}
                </h2>
                
                <h3>${getTranslation('technical')}</h3>
                <div class="skills-container">
                    ${cvData.skills.technical.map(skill => `
                        <span class="skill-tag">${skill}</span>
                    `).join('')}
                </div>
                
                <h3>${getTranslation('languages')}</h3>
                <div class="language-list">
                    ${cvData.skills.languages.map(lang => `
                        <div class="language-item">
                            <span class="language-name">${lang.language}</span>
                            <span class="language-level">${lang.level}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
        
        <!-- Social Media -->
        <div class="social-section">
            <h2 class="section-title">
                <i class="fas fa-share-alt"></i>
                ${getTranslation('social')}
            </h2>
            <div class="social-links">
                ${cvData.contact.linkedin ? `
                    <a href="https://${cvData.contact.linkedin}" class="social-link">
                        <i class="fab fa-linkedin"></i> LinkedIn
                    </a>` : ''
                }
                ${cvData.contact.github ? `
                    <a href="https://${cvData.contact.github}" class="social-link">
                        <i class="fab fa-github"></i> GitHub
                    </a>` : ''
                }
                ${cvData.contact.website ? `
                    <a href="https://${cvData.contact.website}" class="social-link">
                        <i class="fas fa-globe"></i> Portfolio
                    </a>` : ''
                }
            </div>
        </div>
    `;
}

function renderCreativeTemplate() {
    // Creative design template
    return `<div class="creative-template">Creative Template Content</div>`;
}

function renderElegantTemplate() {
    // Elegant design template
    return `<div class="elegant-template">Elegant Template Content</div>`;
}

// ===== UTILITY FUNCTIONS =====
function toggleTheme() {
    isDarkMode = !isDarkMode;
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    
    const icon = elements.themeToggle.querySelector('i');
    icon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
    
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
}

function switchTemplate(template) {
    currentTemplate = template;
    
    // Update active template UI
    elements.templateOptions.forEach(opt => {
        opt.classList.toggle('active', opt.dataset.template === template);
    });
    
    renderCV();
}

function updateLanguage() {
    // Update all text based on selected language
    renderCV();
}

function getTranslation(key) {
    const translations = {
        education: {
            id: "Pendidikan",
            en: "Education",
            jp: "学歴",
            cn: "教育背景",
            bilingual: "Education/Pendidikan"
        },
        experience: {
            id: "Pengalaman Kerja",
            en: "Work Experience",
            jp: "職務経歴",
            cn: "工作经历",
            bilingual: "Work Experience/Pengalaman"
        },
        skills: {
            id: "Keahlian",
            en: "Skills",
            jp: "スキル",
            cn: "技能",
            bilingual: "Skills/Keahlian"
        }
    };
    
    return translations[key]?.[currentLanguage] || key;
}

// ===== DRAG & DROP =====
function setupDragAndDrop() {
    const sections = document.querySelectorAll('.form-section');
    const container = document.querySelector('.form-sections');
    
    sections.forEach(section => {
        section.addEventListener('dragstart', handleDragStart);
        section.addEventListener('dragend', handleDragEnd);
    });
    
    container.addEventListener('dragover', handleDragOverContainer);
    container.addEventListener('drop', handleDrop);
}

function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.dataset.section);
    e.target.classList.add('dragging');
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
}

function handleDragOverContainer(e) {
    e.preventDefault();
    const dragging = document.querySelector('.dragging');
    const afterElement = getDragAfterElement(e.clientY);
    
    if (afterElement == null) {
        this.appendChild(dragging);
    } else {
        this.insertBefore(dragging, afterElement);
    }
}

function getDragAfterElement(y) {
    const draggableElements = [...document.querySelectorAll('.form-section:not(.dragging)')];
    
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// ===== PDF GENERATION =====
async function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Capture CV as image
    const canvas = await html2canvas(elements.cvPaper, {
        scale: 2,
        useCORS: true,
        logging: false
    });
    
    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save(`${cvData.personal.name.replace(/\s+/g, '_')}_CV.pdf`);
}

// ===== PHOTO UPLOAD =====
function triggerPhotoUpload() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = handlePhotoSelect;
    input.click();
}

function handlePhotoSelect(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(event) {
        cvData.personal.photo = event.target.result;
        renderCV();
    };
    reader.readAsDataURL(file);
}

function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    this.classList.add('drag-over');
}

function handlePhotoDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    this.classList.remove('drag-over');
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
        handlePhotoSelect({ target: { files: [file] } });
    }
}

// ===== PREVIEW STATS =====
function updatePreviewStats() {
    // Update word count
    const text = elements.cvPaper.innerText;
    const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
    document.getElementById('wordCount').textContent = wordCount;
    
    // Update section count
    const sectionCount = document.querySelectorAll('.cv-section').length;
    document.getElementById('sectionCount').textContent = sectionCount;
    
    // Estimate page count
    const pageCount = Math.ceil(elements.cvPaper.scrollHeight / elements.cvPaper.clientHeight);
    document.getElementById('pageCount').textContent = pageCount;
}

function updateMobilePreview() {
    const mobilePreview = document.getElementById('mobilePreview');
    mobilePreview.innerHTML = elements.cvPaper.innerHTML;
    
    // Scale down for mobile view
    mobilePreview.style.transform = 'scale(0.3)';
    mobilePreview.style.transformOrigin = 'top left';
}

// ===== DATA PERSISTENCE =====
function saveToLocalStorage() {
    localStorage.setItem('cvData', JSON.stringify(cvData));
    localStorage.setItem('template', currentTemplate);
    localStorage.setItem('language', currentLanguage);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
}

// ===== SAMPLE DATA LOADER =====
function loadSampleData(type) {
    const samples = {
        software: {
            personal: {
                name: "Alexandra Chen",
                title: "Full Stack Developer",
                summary: "Passionate developer with expertise in React, Node.js, and cloud technologies."
            },
            skills: {
                technical: ["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Python", "AWS", "Docker"],
                languages: [
                    { language: "English", level: "Native" },
                    { language: "Mandarin", level: "Fluent" },
                    { language: "Japanese", level: "Intermediate" }
                ]
            }
        },
        designer: {
            personal: {
                name: "Rina Tanaka",
                title: "UI/UX Designer",
                summary: "Creative designer focused on user-centered design and beautiful interfaces."
            },
            skills: {
                technical: ["Figma", "Adobe Creative Suite", "Sketch", "Prototyping", "User Research"],
                languages: [
                    { language: "Japanese", level: "Native" },
                    { language: "English", level: "Fluent" }
                ]
            }
        }
    };
    
    if (samples[type]) {
        cvData = { ...cvData, ...samples[type] };
        renderCV();
        updateFormInputs();
    }
}

function updateFormInputs() {
    elements.fullNameInput.value = cvData.personal.name;
    elements.jobTitleInput.value = cvData.personal.title;
    // Update other form fields...
}

// Export functions for global access
window.CVBuilder = {
    loadSampleData,
    resetData: function() {
        cvData = {
            personal: { name: "", title: "", photo: "", summary: "" },
            contact: { email: "", phone: "", location: "" },
            education: [],
            experience: [],
            skills: { technical: [], languages: [], soft: [] }
        };
        renderCV();
        updateFormInputs();
    },
    exportJSON: function() {
        const dataStr = JSON.stringify(cvData, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        const exportFileDefaultName = 'cv_data.json';
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    },
    importJSON: function(file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            cvData = JSON.parse(e.target.result);
            renderCV();
            updateFormInputs();
        };
        reader.readAsText(file);
    }
};