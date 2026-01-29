// ===== MAIN APPLICATION =====

// App State
const AppState = {
    currentPage: 'home',
    pages: ['home', 'certificates', 'timeline', 'about', 'contact'],
    theme: 'professional',
    certificates: [],
    isAnimating: false
};

// DOM Elements
const DOM = {
    body: document.body,
    pages: document.querySelectorAll('.page'),
    navDots: document.querySelectorAll('.nav-dot'),
    navArrows: {
        prev: document.getElementById('prevPage'),
        next: document.getElementById('nextPage')
    },
    themeToggle: document.getElementById('themeToggle'),
    themePresets: document.querySelectorAll('.preset-btn'),
    customThemeModal: document.getElementById('customThemeModal'),
    progressBar: document.querySelector('.progress-fill'),
    pageIndicator: {
        current: document.querySelector('.current-page'),
        total: document.querySelector('.total-pages')
    },
    loadingScreen: document.getElementById('loadingScreen')
};

// ===== PAGE NAVIGATION =====

function initNavigation() {
    // Set total pages
    DOM.pageIndicator.total.textContent = AppState.pages.length.toString().padStart(2, '0');
    
    // Navigation dots
    DOM.navDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const page = dot.dataset.page;
            if (page !== AppState.currentPage && !AppState.isAnimating) {
                navigateToPage(page);
            }
        });
    });
    
    // Navigation arrows
    DOM.navArrows.prev.addEventListener('click', () => navigateToPreviousPage());
    DOM.navArrows.next.addEventListener('click', () => navigateToNextPage());
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (AppState.isAnimating) return;
        
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            navigateToPreviousPage();
        } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
            navigateToNextPage();
        } else if (e.key >= '1' && e.key <= '5') {
            const pageIndex = parseInt(e.key) - 1;
            if (pageIndex < AppState.pages.length) {
                navigateToPage(AppState.pages[pageIndex]);
            }
        }
    });
    
    // Swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', (e) => {
        if (AppState.isAnimating) return;
        
        touchEndX = e.changedTouches[0].screenX;
        const swipeThreshold = 50;
        
        if (touchStartX - touchEndX > swipeThreshold) {
            navigateToNextPage();
        } else if (touchEndX - touchStartX > swipeThreshold) {
            navigateToPreviousPage();
        }
    });
    
    // Update progress bar on scroll
    document.querySelectorAll('.page').forEach(page => {
        page.addEventListener('scroll', updateProgressBar);
    });
}

function navigateToPage(pageName) {
    if (AppState.isAnimating || AppState.currentPage === pageName) return;
    
    AppState.isAnimating = true;
    
    const currentIndex = AppState.pages.indexOf(AppState.currentPage);
    const targetIndex = AppState.pages.indexOf(pageName);
    const direction = targetIndex > currentIndex ? 'next' : 'prev';
    
    // Update UI
    updateActiveNavigation(pageName);
    updatePageIndicator(targetIndex + 1);
    
    // Animation
    animatePageTransition(pageName, direction);
    
    // Update state
    setTimeout(() => {
        AppState.currentPage = pageName;
        AppState.isAnimating = false;
        updateProgressBar();
        
        // Initialize page-specific features
        initPageFeatures(pageName);
    }, 600);
}

function navigateToNextPage() {
    const currentIndex = AppState.pages.indexOf(AppState.currentPage);
    const nextIndex = (currentIndex + 1) % AppState.pages.length;
    navigateToPage(AppState.pages[nextIndex]);
}

function navigateToPreviousPage() {
    const currentIndex = AppState.pages.indexOf(AppState.currentPage);
    const prevIndex = (currentIndex - 1 + AppState.pages.length) % AppState.pages.length;
    navigateToPage(AppState.pages[prevIndex]);
}

function animatePageTransition(targetPage, direction) {
    const currentPageEl = document.getElementById(`page-${AppState.currentPage}`);
    const targetPageEl = document.getElementById(`page-${targetPage}`);
    
    // Set initial positions
    if (direction === 'next') {
        targetPageEl.style.transform = 'translateX(100%)';
    } else {
        targetPageEl.style.transform = 'translateX(-100%)';
    }
    
    targetPageEl.style.visibility = 'visible';
    targetPageEl.style.opacity = '1';
    
    // Animate
    setTimeout(() => {
        if (direction === 'next') {
            currentPageEl.style.transform = 'translateX(-100%)';
            targetPageEl.style.transform = 'translateX(0)';
        } else {
            currentPageEl.style.transform = 'translateX(100%)';
            targetPageEl.style.transform = 'translateX(0)';
        }
        
        currentPageEl.classList.remove('active');
        targetPageEl.classList.add('active');
    }, 10);
}

function updateActiveNavigation(pageName) {
    // Update nav dots
    DOM.navDots.forEach(dot => {
        dot.classList.toggle('active', dot.dataset.page === pageName);
    });
    
    // Update arrows state
    const currentIndex = AppState.pages.indexOf(pageName);
    DOM.navArrows.prev.disabled = currentIndex === 0;
    DOM.navArrows.next.disabled = currentIndex === AppState.pages.length - 1;
}

function updatePageIndicator(pageNumber) {
    DOM.pageIndicator.current.textContent = pageNumber.toString().padStart(2, '0');
}

function updateProgressBar() {
    const currentPage = document.getElementById(`page-${AppState.currentPage}`);
    const scrollPercentage = (currentPage.scrollTop / (currentPage.scrollHeight - currentPage.clientHeight)) * 100;
    DOM.progressBar.style.width = `${scrollPercentage}%`;
}

// ===== THEME MANAGEMENT =====

function initTheme() {
    // Load saved theme
    const savedTheme = localStorage.getItem('certificateTheme') || 'professional';
    const savedMode = localStorage.getItem('colorMode') || 'light';
    
    setTheme(savedTheme);
    setColorMode(savedMode);
    
    // Theme toggle
    DOM.themeToggle.addEventListener('click', toggleColorMode);
    
    // Theme presets
    DOM.themePresets.forEach(preset => {
        preset.addEventListener('click', () => {
            const theme = preset.dataset.theme;
            if (theme === 'custom') {
                openCustomThemeModal();
            } else {
                setTheme(theme);
            }
        });
    });
    
    // Custom theme modal
    document.getElementById('cancelCustom').addEventListener('click', closeCustomThemeModal);
    document.getElementById('applyCustom').addEventListener('click', applyCustomTheme);
}

function setTheme(themeName) {
    AppState.theme = themeName;
    DOM.body.setAttribute('data-theme', themeName);
    
    // Update active preset
    DOM.themePresets.forEach(preset => {
        preset.classList.toggle('active', preset.dataset.theme === themeName);
    });
    
    // Save to localStorage
    localStorage.setItem('certificateTheme', themeName);
    
    // Update CSS variables for custom theme
    if (themeName !== 'custom') {
        updateThemeColors(themeName);
    }
}

function setColorMode(mode) {
    if (mode === 'dark') {
        DOM.body.classList.add('dark-mode');
        DOM.body.classList.remove('light-mode');
    } else {
        DOM.body.classList.add('light-mode');
        DOM.body.classList.remove('dark-mode');
    }
    
    localStorage.setItem('colorMode', mode);
}

function toggleColorMode() {
    const isDark = DOM.body.classList.contains('dark-mode');
    setColorMode(isDark ? 'light' : 'dark');
}

function updateThemeColors(themeName) {
    const themes = {
        'professional': {
            primary: '#2563eb',
            secondary: '#0ea5e9',
            accent: '#8b5cf6'
        },
        'dark-blue': {
            primary: '#1e3a8a',
            secondary: '#3b82f6',
            accent: '#60a5fa'
        },
        'green': {
            primary: '#059669',
            secondary: '#10b981',
            accent: '#34d399'
        },
        'purple': {
            primary: '#7c3aed',
            secondary: '#8b5cf6',
            accent: '#a78bfa'
        }
    };
    
    const colors = themes[themeName] || themes.professional;
    
    // Convert hex to RGB
    const hexToRgb = (hex) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `${r}, ${g}, ${b}`;
    };
    
    // Update CSS variables
    document.documentElement.style.setProperty('--primary', colors.primary);
    document.documentElement.style.setProperty('--secondary', colors.secondary);
    document.documentElement.style.setProperty('--accent', colors.accent);
    document.documentElement.style.setProperty('--primary-rgb', hexToRgb(colors.primary));
}

function openCustomThemeModal() {
    DOM.customThemeModal.style.display = 'flex';
    animateFadeIn(DOM.customThemeModal);
}

function closeCustomThemeModal() {
    animateFadeOut(DOM.customThemeModal).then(() => {
        DOM.customThemeModal.style.display = 'none';
    });
}

function applyCustomTheme() {
    const primaryColor = document.getElementById('primaryColor').value;
    const secondaryColor = document.getElementById('secondaryColor').value;
    const accentColor = document.getElementById('accentColor').value;
    
    // Update CSS variables
    document.documentElement.style.setProperty('--primary', primaryColor);
    document.documentElement.style.setProperty('--secondary', secondaryColor);
    document.documentElement.style.setProperty('--accent', accentColor);
    
    // Convert to RGB for rgba usage
    const hexToRgb = (hex) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `${r}, ${g}, ${b}`;
    };
    
    document.documentElement.style.setProperty('--primary-rgb', hexToRgb(primaryColor));
    
    setTheme('custom');
    closeCustomThemeModal();
}

// ===== CERTIFICATES MANAGEMENT =====

function initCertificates() {
    // Certificate data
    AppState.certificates = [
        {
            id: 1,
            title: "Google UX Design Professional Certificate",
            issuer: "Google via Coursera",
            year: "2023",
            category: "design",
            categoryText: "UI/UX & Desain",
            description: "Sertifikasi profesional desain UX/UI yang mencakup seluruh proses desain dari penelitian pengguna hingga prototipe interaktif.",
            tags: ["UX Research", "UI Design", "Figma", "Prototyping"],
            credentialId: "GUXD-2023-789012",
            image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            verifyLink: "https://coursera.org/verify/ABCD1234",
            downloadLink: "#"
        },
        {
            id: 2,
            title: "AWS Certified Solutions Architect - Associate",
            issuer: "Amazon Web Services",
            year: "2023",
            category: "programming",
            categoryText: "Pemrograman & Web",
            description: "Sertifikasi arsitektur solusi AWS yang menguji kemampuan dalam merancang dan menerapkan sistem terdistribusi pada platform AWS.",
            tags: ["Cloud Computing", "AWS", "Architecture", "DevOps"],
            credentialId: "AWS-CSA-2023-456789",
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            verifyLink: "https://aws.amazon.com/verification",
            downloadLink: "#"
        },
        {
            id: 3,
            title: "Data Science Specialization",
            issuer: "Johns Hopkins University via Coursera",
            year: "2022",
            category: "data",
            categoryText: "Data & AI",
            description: "Spesialisasi ilmu data yang mencakup R programming, analisis statistik, machine learning, dan pengembangan produk data.",
            tags: ["Data Science", "Machine Learning", "R Programming", "Statistics"],
            credentialId: "JHU-DS-2022-123456",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            verifyLink: "https://coursera.org/verify/EFGH5678",
            downloadLink: "#"
        },
        {
            id: 4,
            title: "Unity Certified Programmer",
            issuer: "Unity Technologies",
            year: "2022",
            category: "gaming",
            categoryText: "Game & Esports",
            description: "Sertifikasi programmer Unity yang menguji kemampuan dalam pengembangan game menggunakan engine Unity dan bahasa C#.",
            tags: ["Game Development", "Unity", "C#", "3D Programming"],
            credentialId: "UCP-2022-789123",
            image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            verifyLink: "https://unity.com/certification/verification",
            downloadLink: "#"
        },
        {
            id: 5,
            title: "Full Stack Web Development Bootcamp",
            issuer: "Dicoding Indonesia",
            year: "2021",
            category: "programming",
            categoryText: "Pemrograman & Web",
            description: "Bootcamp pengembangan web full-stack yang mencakup frontend (React) dan backend (Node.js, Express, MongoDB).",
            tags: ["JavaScript", "React", "Node.js", "MongoDB"],
            credentialId: "DICODING-FSWD-2021-456123",
            image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            verifyLink: "https://www.dicoding.com/certificates",
            downloadLink: "#"
        },
        {
            id: 6,
            title: "Digital Audio Production Professional",
            issuer: "Berklee College of Music",
            year: "2021",
            category: "music",
            categoryText: "Musik & Kreatif",
            description: "Sertifikasi produksi audio digital yang mencakup recording, mixing, mastering, dan produksi musik menggunakan DAW modern.",
            tags: ["Audio Production", "Mixing", "Mastering", "DAW"],
            credentialId: "BERKLEE-AUDIO-2021-987654",
            image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            verifyLink: "https://online.berklee.edu/certificates",
            downloadLink: "#"
        },
        {
            id: 7,
            title: "Leadership & Team Management",
            issuer: "University of Michigan via Coursera",
            year: "2023",
            category: "soft-skills",
            categoryText: "Keterampilan Lunak",
            description: "Sertifikasi kepemimpinan dan manajemen tim yang berfokus pada pengembangan keterampilan memimpin tim yang efektif dan inovatif.",
            tags: ["Leadership", "Management", "Team Building", "Communication"],
            credentialId: "UMICH-LEAD-2023-321654",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            verifyLink: "https://coursera.org/verify/IJKL9012",
            downloadLink: "#"
        },
        {
            id: 8,
            title: "Python for Data Science and AI",
            issuer: "IBM via Coursera",
            year: "2020",
            category: "data",
            categoryText: "Data & AI",
            description: "Sertifikasi pemrograman Python untuk ilmu data dan kecerdasan buatan yang mencakup libraries seperti Pandas, NumPy, dan Scikit-learn.",
            tags: ["Python", "Data Analysis", "AI", "Pandas"],
            credentialId: "IBM-PYTHON-2020-654987",
            image: "https://images.unsplash.com/photo-1526379879527-8559ecfcaec7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            verifyLink: "https://coursera.org/verify/MNOP3456",
            downloadLink: "#"
        },
        {
            id: 9,
            title: "Frontend Web Developer Expert",
            issuer: "Meta via Coursera",
            year: "2021",
            category: "programming",
            categoryText: "Pemrograman & Web",
            description: "Sertifikasi pengembang frontend expert yang mencakup React, advanced JavaScript, responsive design, dan performance optimization.",
            tags: ["React", "JavaScript", "CSS", "Web Performance"],
            credentialId: "META-FRONTEND-2021-147258",
            image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            verifyLink: "https://coursera.org/verify/QRST7890",
            downloadLink: "#"
        },
        {
            id: 10,
            title: "Project Management Professional (PMP)",
            issuer: "Project Management Institute",
            year: "2022",
            category: "soft-skills",
            categoryText: "Keterampilan Lunak",
            description: "Sertifikasi manajemen proyek profesional yang diakui secara global, mencakup metodologi Agile, Waterfall, dan hybrid.",
            tags: ["Project Management", "Agile", "Scrum", "PMI"],
            credentialId: "PMI-PMP-2022-369258",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            verifyLink: "https://www.pmi.org/certifications/certification-resources/registry",
            downloadLink: "#"
        }
    ];
    
    renderCertificates();
    initCertificateFilters();
    initCertificateModal();
}

function renderCertificates(filteredCertificates = AppState.certificates) {
    const grid = document.getElementById('certificatesGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    if (filteredCertificates.length === 0) {
        grid.innerHTML = `
            <div class="no-results animate-fade-in">
                <div class="no-results-icon">
                    <i class="fas fa-search"></i>
                </div>
                <p class="no-results-text">Tidak ditemukan sertifikat yang sesuai dengan filter pencarian.</p>
            </div>
        `;
        return;
    }
    
    filteredCertificates.forEach((cert, index) => {
        const card = document.createElement('div');
        card.className = 'certificate-card stagger-item';
        card.style.animationDelay = `${index * 0.1}s`;
        
        const categoryClass = `category-${cert.category}`;
        
        card.innerHTML = `
            <div class="certificate-header">
                <span class="certificate-category ${categoryClass}">
                    <i class="fas ${getCategoryIcon(cert.category)}"></i>
                    ${cert.categoryText}
                </span>
                <span class="certificate-year">${cert.year}</span>
            </div>
            <div class="certificate-body">
                <h3 class="certificate-title">${cert.title}</h3>
                <div class="certificate-issuer">
                    <div class="issuer-logo">${cert.issuer.charAt(0)}</div>
                    <div class="issuer-name">${cert.issuer}</div>
                </div>
                <p class="certificate-description">${cert.description}</p>
                <div class="certificate-tags">
                    ${cert.tags.map(tag => `<span class="certificate-tag">${tag}</span>`).join('')}
                </div>
            </div>
            <div class="certificate-footer">
                <button class="btn-secondary btn-preview" data-id="${cert.id}">
                    <i class="fas fa-eye"></i> Pratinjau
                </button>
                <a href="${cert.verifyLink}" target="_blank" class="btn-primary">
                    <i class="fas fa-external-link-alt"></i> Verifikasi
                </a>
            </div>
        `;
        
        grid.appendChild(card);
    });
    
    // Add event listeners to preview buttons
    document.querySelectorAll('.btn-preview').forEach(button => {
        button.addEventListener('click', function() {
            const certId = parseInt(this.dataset.id);
            openCertificateModal(certId);
        });
    });
}

function initCertificateFilters() {
    const searchInput = document.getElementById('certificateSearch');
    const categoryFilter = document.getElementById('categoryFilter');
    const yearFilter = document.getElementById('yearFilter');
    const clearSearch = document.getElementById('clearSearch');
    const resetFilters = document.getElementById('resetFilters');
    
    if (!searchInput) return;
    
    const filterCertificates = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const category = categoryFilter.value;
        const year = yearFilter.value;
        
        let filtered = AppState.certificates;
        
        if (searchTerm) {
            filtered = filtered.filter(cert => 
                cert.title.toLowerCase().includes(searchTerm) ||
                cert.issuer.toLowerCase().includes(searchTerm) ||
                cert.description.toLowerCase().includes(searchTerm) ||
                cert.tags.some(tag => tag.toLowerCase().includes(searchTerm))
            );
        }
        
        if (category !== 'all') {
            filtered = filtered.filter(cert => cert.category === category);
        }
        
        if (year !== 'all') {
            filtered = filtered.filter(cert => cert.year === year);
        }
        
        renderCertificates(filtered);
    };
    
    searchInput.addEventListener('input', filterCertificates);
    categoryFilter.addEventListener('change', filterCertificates);
    yearFilter.addEventListener('change', filterCertificates);
    
    clearSearch.addEventListener('click', () => {
        searchInput.value = '';
        filterCertificates();
        searchInput.focus();
    });
    
    resetFilters.addEventListener('click', () => {
        searchInput.value = '';
        categoryFilter.value = 'all';
        yearFilter.value = 'all';
        filterCertificates();
    });
    
    // Clear search on Escape key
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchInput.value = '';
            filterCertificates();
        }
    });
}

function initCertificateModal() {
    const modal = document.getElementById('certificateModal');
    const modalClose = document.getElementById('modalClose');
    
    if (!modal) return;
    
    // Close modal
    modalClose.addEventListener('click', () => {
        closeCertificateModal();
    });
    
    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeCertificateModal();
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeCertificateModal();
        }
    });
}

function openCertificateModal(certId) {
    const modal = document.getElementById('certificateModal');
    const modalBody = modal.querySelector('.modal-body');
    const cert = AppState.certificates.find(c => c.id === certId);
    
    if (!cert) return;
    
    const categoryClass = `category-${cert.category}`;
    
    modalBody.innerHTML = `
        <div class="modal-certificate animate-scale">
            <div class="modal-header">
                <span class="certificate-category ${categoryClass}">
                    <i class="fas ${getCategoryIcon(cert.category)}"></i>
                    ${cert.categoryText}
                </span>
                <span class="certificate-year">${cert.year}</span>
            </div>
            
            <img src="${cert.image}" alt="${cert.title}" class="modal-image">
            
            <div class="modal-details">
                <h3>${cert.title}</h3>
                <div class="detail-item">
                    <strong>Penerbit:</strong> ${cert.issuer}
                </div>
                <div class="detail-item">
                    <strong>ID Kredensial:</strong> ${cert.credentialId}
                </div>
                <div class="detail-item">
                    <strong>Tanggal:</strong> ${cert.year}
                </div>
                <div class="detail-item">
                    <strong>Kategori:</strong> ${cert.categoryText}
                </div>
            </div>
            
            <p class="modal-description">${cert.description}</p>
            
            <div class="modal-tags">
                ${cert.tags.map(tag => `<span class="modal-tag">${tag}</span>`).join('')}
            </div>
            
            <div class="modal-actions">
                <a href="${cert.verifyLink}" target="_blank" class="btn-primary">
                    <i class="fas fa-external-link-alt"></i> Verifikasi Online
                </a>
                <button class="btn-secondary" id="downloadCertificate">
                    <i class="fas fa-download"></i> Unduh PDF
                </button>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
    animateFadeIn(modal);
    
    // Add download button event
    document.getElementById('downloadCertificate').addEventListener('click', () => {
        alert(`Download akan dimulai untuk: ${cert.title}`);
        // In production, this would trigger actual file download
    });
}

function closeCertificateModal() {
    const modal = document.getElementById('certificateModal');
    animateFadeOut(modal).then(() => {
        modal.style.display = 'none';
    });
}

function getCategoryIcon(category) {
    const icons = {
        'programming': 'fa-code',
        'design': 'fa-paint-brush',
        'data': 'fa-chart-line',
        'gaming': 'fa-gamepad',
        'music': 'fa-music',
        'soft-skills': 'fa-users'
    };
    return icons[category] || 'fa-certificate';
}

// ===== PAGE-SPECIFIC FEATURES =====

function initPageFeatures(pageName) {
    switch (pageName) {
        case 'home':
            initHomePage();
            break;
        case 'certificates':
            initCertificatesPage();
            break;
        case 'timeline':
            initTimelinePage();
            break;
        case 'about':
            initAboutPage();
            break;
        case 'contact':
            initContactPage();
            break;
    }
}

function initHomePage() {
    // Animate stats counter
    animateStatsCounter();
    
    // Explore button
    const exploreBtn = document.querySelector('.explore-btn');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => navigateToPage('certificates'));
    }
    
    // Contact button
    const contactBtn = document.querySelector('.contact-btn');
    if (contactBtn) {
        contactBtn.addEventListener('click', () => navigateToPage('contact'));
    }
}

function initCertificatesPage() {
    // Already initialized in initCertificates()
}

function initTimelinePage() {
    // Add hover effects to timeline items
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.classList.add('hover-lift');
        });
        
        item.addEventListener('mouseleave', () => {
            item.classList.remove('hover-lift');
        });
    });
}

function initAboutPage() {
    // Animate skill bars
    setTimeout(() => {
        document.querySelectorAll('.skill-level').forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.transition = 'width 1s ease-in-out';
                bar.style.width = width;
            }, 300);
        });
    }, 500);
}

function initContactPage() {
    const contactForm = document.getElementById('contactForm');
    const scheduleBtn = document.querySelector('.schedule-btn');
    const downloadCvBtn = document.querySelector('.download-cv');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Show success message
            alert('Pesan Anda telah berhasil dikirim! Saya akan membalas secepatnya.');
            contactForm.reset();
            
            // In production, this would send data to a server
            console.log('Form submitted:', data);
        });
    }
    
    if (scheduleBtn) {
        scheduleBtn.addEventListener('click', () => {
            alert('Fitur penjadwalan meeting akan segera tersedia!');
        });
    }
    
    if (downloadCvBtn) {
        downloadCvBtn.addEventListener('click', () => {
            alert('Download CV akan dimulai...');
            // In production, this would trigger file download
        });
    }
}

// ===== ANIMATION HELPERS =====

function animateFadeIn(element) {
    return new Promise(resolve => {
        element.style.opacity = '0';
        element.style.display = 'flex';
        
        requestAnimationFrame(() => {
            element.style.transition = 'opacity 0.3s ease';
            element.style.opacity = '1';
            
            setTimeout(resolve, 300);
        });
    });
}

function animateFadeOut(element) {
    return new Promise(resolve => {
        element.style.transition = 'opacity 0.3s ease';
        element.style.opacity = '0';
        
        setTimeout(() => {
            element.style.display = 'none';
            resolve();
        }, 300);
    });
}

function animateStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.dataset.count);
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            stat.textContent = Math.floor(current).toString();
        }, 16);
    });
}

// ===== INITIALIZATION =====

function initApp() {
    // Show loading screen
    DOM.loadingScreen.classList.remove('hidden');
    
    // Initialize modules
    initNavigation();
    initTheme();
    initCertificates();
    
    // Hide loading screen after everything is loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            DOM.loadingScreen.classList.add('hidden');
            
            // Trigger initial animations
            document.querySelectorAll('.animate-slide-up, .animate-fade-in').forEach(el => {
                el.style.animationPlayState = 'running';
            });
            
            // Animate home page stats
            if (AppState.currentPage === 'home') {
                animateStatsCounter();
            }
        }, 1000);
    });
    
    // Handle page-specific initialization
    initPageFeatures(AppState.currentPage);
    
    // Update progress bar initially
    updateProgressBar();
}

// ===== START APPLICATION =====

// Start the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}