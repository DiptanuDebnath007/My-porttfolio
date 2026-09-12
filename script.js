/* ============================================
   DIPTANU DEBNATH — PORTFOLIO HERO
   Interactive JavaScript
   ============================================ */

(function () {
    'use strict';

    // -------- Preloader --------
    const preloader = document.getElementById('preloader');
    const preloaderCounter = document.getElementById('preloaderCounter');
    const preloaderLine = document.querySelector('.preloader-line');
    let progress = 0;
    let preloaderDone = false;

    function finishPreloader() {
        if (preloaderDone) return;
        preloaderDone = true;
        if (preloaderCounter) preloaderCounter.textContent = '100';
        if (preloaderLine) preloaderLine.style.width = '100%';
        setTimeout(() => {
            if (preloader) preloader.classList.add('done');
            document.body.style.overflow = '';
            setTimeout(() => {
                const hero = document.getElementById('hero');
                if (hero) hero.classList.add('revealed');
            }, 250);
        }, 150);
    }

    function updatePreloader() {
        if (preloaderDone) return;
        if (progress < 100) {
            const increment = progress < 60 ? (Math.random() * 15 + 10) : (Math.random() * 20 + 15);
            progress = Math.min(progress + increment, 100);
            if (preloaderCounter) preloaderCounter.textContent = Math.floor(progress);
            if (preloaderLine) preloaderLine.style.width = progress + '%';
            if (progress >= 100) {
                finishPreloader();
            } else {
                setTimeout(updatePreloader, 25);
            }
        } else {
            finishPreloader();
        }
    }

    // Start preloader on DOM ready, with safety fallback
    document.body.style.overflow = 'hidden';
    updatePreloader();
    setTimeout(finishPreloader, 1000); // Safety fallback so user is never stuck

    // -------- Mobile Navigation Drawer --------
    const navHamburger = document.getElementById('navHamburger');
    const mobileNavOverlay = document.getElementById('mobileNavOverlay');
    const mobileNavBackdrop = document.getElementById('mobileNavBackdrop');
    const mobileNavClose = document.getElementById('mobileNavClose');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .mobile-cta-btn');

    function openMobileMenu() {
        if (!mobileNavOverlay) return;
        mobileNavOverlay.classList.add('is-open');
        mobileNavOverlay.setAttribute('aria-hidden', 'false');
        if (navHamburger) {
            navHamburger.classList.add('is-active');
            navHamburger.setAttribute('aria-expanded', 'true');
        }
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        if (!mobileNavOverlay) return;
        mobileNavOverlay.classList.remove('is-open');
        mobileNavOverlay.setAttribute('aria-hidden', 'true');
        if (navHamburger) {
            navHamburger.classList.remove('is-active');
            navHamburger.setAttribute('aria-expanded', 'false');
        }
        document.body.style.overflow = '';
    }

    if (navHamburger) {
        navHamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            if (mobileNavOverlay && mobileNavOverlay.classList.contains('is-open')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }

    if (mobileNavClose) {
        mobileNavClose.addEventListener('click', closeMobileMenu);
    }

    if (mobileNavBackdrop) {
        mobileNavBackdrop.addEventListener('click', closeMobileMenu);
    }

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileNavOverlay && mobileNavOverlay.classList.contains('is-open')) {
            closeMobileMenu();
        }
    });

    // -------- Custom Cursor (Fine pointer desktop devices only) --------
    const cursor = document.getElementById('customCursor');
    const cursorFollower = document.getElementById('customCursorFollower');
    const hasFinePointer = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (hasFinePointer && cursor && cursorFollower) {
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let followerX = 0, followerY = 0;
        let isCursorVisible = false;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (!isCursorVisible) {
                cursor.style.opacity = '1';
                cursorFollower.style.opacity = '1';
                isCursorVisible = true;
            }
        });

        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
            cursorFollower.style.opacity = '0';
            isCursorVisible = false;
        });

        document.addEventListener('mouseenter', () => {
            cursor.style.opacity = '1';
            cursorFollower.style.opacity = '1';
            isCursorVisible = true;
        });

        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.3;
            cursorY += (mouseY - cursorY) * 0.3;
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';

            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;
            cursorFollower.style.left = followerX + 'px';
            cursorFollower.style.top = followerY + 'px';

            requestAnimationFrame(animateCursor);
        }

        animateCursor();

        function isHoverable(el) {
            return el.closest('a, button, input, textarea, .floating-tag, .hero-photo-wrapper, .contact-card, .scope-pill, .matrix-link, .back-to-top-btn, .bento-item, .comparison-slider, .comparison-handle, .capability-pill, .photo-stat, .color-swatch-box, .tool-btn, .timeline-tracks-arena');
        }

        document.addEventListener('mouseover', (e) => {
            if (isHoverable(e.target)) {
                cursor.classList.add('cursor-hover');
                cursorFollower.classList.add('cursor-hover');
            }
        });

        document.addEventListener('mouseout', (e) => {
            if (isHoverable(e.target)) {
                cursor.classList.remove('cursor-hover');
                cursorFollower.classList.remove('cursor-hover');
            }
        });
    }

    // -------- Parallax on Mouse Move --------
    const heroPhoto = document.getElementById('heroPhoto');
    const hero = document.getElementById('hero');
    const floatingTags = document.querySelectorAll('.floating-tag');

    if (hero && heroPhoto) {
        hero.addEventListener('mousemove', (e) => {
            if (window.innerWidth <= 768) return;
            const rect = hero.getBoundingClientRect();
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const deltaX = (e.clientX - rect.left - centerX) / centerX;
            const deltaY = (e.clientY - rect.top - centerY) / centerY;

            // Subtle photo parallax
            heroPhoto.style.transform = `translate(${deltaX * 8}px, ${deltaY * 6}px)`;

            // Floating tags parallax
            floatingTags.forEach((tag) => {
                const speed = parseFloat(tag.dataset.speed) || 0.02;
                const moveX = deltaX * speed * 300;
                const moveY = deltaY * speed * 300;
                tag.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        });

        hero.addEventListener('mouseleave', () => {
            if (window.innerWidth <= 768) return;
            heroPhoto.style.transform = 'translate(0, 0)';
            floatingTags.forEach((tag) => {
                tag.style.transform = 'translate(0, 0)';
            });
        });
    }

    // -------- Magnetic Elements Helper --------
    function applyMagnetic(elements, strength = 0.25, scale = 1.05) {
        elements.forEach((el) => {
            if (!el) return;
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                el.style.transform = `translate(${x * strength}px, ${y * strength}px) scale(${scale})`;
            });
            el.addEventListener('mouseleave', () => {
                el.style.transform = 'translate(0, 0) scale(1)';
            });
        });
    }

    // Apply magnetic to hero social links & CTA
    applyMagnetic(document.querySelectorAll('.social-link'), 0.3, 1.1);
    applyMagnetic(document.querySelectorAll('.nav-cta-btn'), 0.15, 1.05);
    applyMagnetic(document.querySelectorAll('.back-to-top-btn'), 0.2, 1.05);

    // -------- Subtle Tilt on Photo Hover --------
    if (heroPhoto) {
        heroPhoto.addEventListener('mousemove', (e) => {
            const rect = heroPhoto.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            heroPhoto.style.transform = `perspective(800px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) translate(${x * 10}px, ${y * 6}px)`;
        });
        heroPhoto.addEventListener('mouseleave', () => {
            heroPhoto.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) translate(0, 0)';
        });
    }

    // ============================================
    // CONTACT SECTION INTERACTIVITY
    // ============================================

    // -------- Live Local Clock (IST / Kolkata) --------
    const localClock = document.getElementById('localClock');
    function updateClock() {
        if (!localClock) return;
        const now = new Date();
        const options = {
            timeZone: 'Asia/Kolkata',
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        const timeStr = new Intl.DateTimeFormat([], options).format(now);
        localClock.textContent = `${timeStr} IST`;
    }
    updateClock();
    setInterval(updateClock, 1000);

    // -------- Scroll Reveal Observer --------
    const revealElements = document.querySelectorAll('[data-reveal]');
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach((el) => revealObserver.observe(el));
    } else {
        revealElements.forEach((el) => el.classList.add('is-revealed'));
    }

    // -------- Fast Click-to-Copy Email Card --------
    const copyEmailCard = document.getElementById('copyEmailCard');
    const copyStatusText = document.getElementById('copyStatusText');
    const copyToast = document.getElementById('copyToast');
    let toastTimeout = null;

    if (copyEmailCard) {
        function triggerCopy() {
            const email = copyEmailCard.getAttribute('data-email') || 'debnathdiptanu2003@gmail.com';
            
            // Clipboard write
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(email).then(onCopied).catch(fallbackCopy);
            } else {
                fallbackCopy();
            }

            function fallbackCopy() {
                const tempInput = document.createElement('input');
                tempInput.value = email;
                document.body.appendChild(tempInput);
                tempInput.select();
                try {
                    document.execCommand('copy');
                    onCopied();
                } catch (err) {
                    console.error('Failed to copy', err);
                }
                document.body.removeChild(tempInput);
            }

            function onCopied() {
                copyEmailCard.classList.add('copied');
                if (copyStatusText) {
                    copyStatusText.innerHTML = `
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        COPIED TO CLIPBOARD ✦
                    `;
                }

                // Show toast
                if (copyToast) {
                    copyToast.classList.add('show');
                    if (toastTimeout) clearTimeout(toastTimeout);
                    toastTimeout = setTimeout(() => {
                        copyToast.classList.remove('show');
                    }, 2800);
                }

                // Revert button text after delay
                setTimeout(() => {
                    copyEmailCard.classList.remove('copied');
                    if (copyStatusText) {
                        copyStatusText.innerHTML = `
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                            CLICK TO COPY
                        `;
                    }
                }, 3000);
            }
        }

        copyEmailCard.addEventListener('click', triggerCopy);
        copyEmailCard.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                triggerCopy();
            }
        });
    }

    // -------- Interactive Project Discipline Selector --------
    const scopePills = document.querySelectorAll('.scope-pill');
    const selectedScopeInput = document.getElementById('selectedScope');
    const userSubjectInput = document.getElementById('userSubject');

    scopePills.forEach((pill) => {
        pill.addEventListener('click', () => {
            scopePills.forEach((p) => p.classList.remove('active'));
            pill.classList.add('active');
            const scopeValue = pill.getAttribute('data-scope');
            if (selectedScopeInput) {
                selectedScopeInput.value = scopeValue;
            }
            // Auto-hint subject if empty
            if (userSubjectInput && !userSubjectInput.value.trim()) {
                userSubjectInput.placeholder = `Project: ${scopeValue} specifications...`;
            }
        });
    });

    // -------- Command Console 3D Tilt Effect --------
    const consoleBox = document.getElementById('contactFormWrapper');
    if (consoleBox && window.matchMedia('(min-width: 1024px)').matches) {
        consoleBox.addEventListener('mousemove', (e) => {
            const rect = consoleBox.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            consoleBox.style.transform = `perspective(1000px) rotateY(${x * 3}deg) rotateX(${-y * 3}deg) translateY(-2px)`;
        });

        consoleBox.addEventListener('mouseleave', () => {
            consoleBox.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0)';
        });
    }

    // -------- Contact Form Submission & Protocol Telemetry --------
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formStatusMsg = document.getElementById('formStatusMsg');
    const consoleSuccess = document.getElementById('consoleSuccess');
    const resetConsoleBtn = document.getElementById('resetConsoleBtn');

    if (contactForm && submitBtn) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            formStatusMsg.textContent = '';
            formStatusMsg.className = 'form-status-msg';

            const name = document.getElementById('userName').value.trim();
            const email = document.getElementById('userEmail').value.trim();
            const subject = document.getElementById('userSubject').value.trim();
            const message = document.getElementById('userMessage').value.trim();

            // Simple aggressive validation
            if (!name || !email || !subject || !message) {
                formStatusMsg.textContent = '⚠ ERROR: All protocol fields are required before dispatch.';
                formStatusMsg.classList.add('error');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                formStatusMsg.textContent = '⚠ ERROR: Invalid electronic mail transmission address.';
                formStatusMsg.classList.add('error');
                return;
            }

            // Enter dispatching state
            submitBtn.classList.add('sending');
            submitBtn.disabled = true;
            const originalBtnHtml = submitBtn.querySelector('.btn-text').innerHTML;
            submitBtn.querySelector('.btn-text').innerHTML = `
                <span>TRANSMITTING PACKET...</span>
                <svg class="btn-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
                    <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
                </svg>
            `;

            const formData = new FormData(contactForm);

            fetch('https://formspree.io/f/xwlkzgbn', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(async (response) => {
                submitBtn.classList.remove('sending');
                submitBtn.disabled = false;
                submitBtn.querySelector('.btn-text').innerHTML = originalBtnHtml;

                if (response.ok) {
                    if (consoleSuccess) {
                        consoleSuccess.classList.add('active');
                    }
                    contactForm.reset();
                } else {
                    const data = await response.json().catch(() => null);
                    if (data && data.errors && data.errors.length > 0) {
                        formStatusMsg.textContent = '⚠ ERROR: ' + data.errors.map(err => err.message).join(', ');
                    } else {
                        formStatusMsg.textContent = '⚠ ERROR: Dispatch failed. Please try again or reach out via direct email.';
                    }
                    formStatusMsg.classList.add('error');
                }
            })
            .catch(() => {
                submitBtn.classList.remove('sending');
                submitBtn.disabled = false;
                submitBtn.querySelector('.btn-text').innerHTML = originalBtnHtml;
                formStatusMsg.textContent = '⚠ TRANSMISSION FAILURE: Network error. Please check your connection.';
                formStatusMsg.classList.add('error');
            });
        });
    }

    if (resetConsoleBtn && consoleSuccess && contactForm) {
        resetConsoleBtn.addEventListener('click', () => {
            consoleSuccess.classList.remove('active');
            contactForm.reset();
            formStatusMsg.textContent = '';
            formStatusMsg.className = 'form-status-msg';
            // Reset discipline pills
            scopePills.forEach((p, idx) => {
                if (idx === 0) p.classList.add('active');
                else p.classList.remove('active');
            });
            if (selectedScopeInput) selectedScopeInput.value = 'Web Development';
        });
    }

    // -------- Return to Summit Button --------
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ============================================
    // WEB DEVELOPER WORKSTATION & VIDEO SHOWCASE
    // ============================================

    const workstationViewport = document.getElementById('workstationViewportWrapper');
    const viewportButtons = document.querySelectorAll('.viewport-toggle-btn');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-video-card');

    // Main Featured Screen & Video Elements
    const webdevMainVideo = document.getElementById('webdevMainVideo');
    const webdevVideoSource = document.getElementById('webdevVideoSource');
    const workstationUrlText = document.getElementById('workstationUrlText');
    const workstationLaunchBtn = document.getElementById('workstationLaunchBtn');
    const hudProjectRecText = document.getElementById('hudProjectRecText');

    // Fallback Simulated Elements
    const simProjectTitle = document.getElementById('simProjectTitle');
    const simProjectDesc = document.getElementById('simProjectDesc');
    const simProjectTag = document.getElementById('simProjectTag');

    // Deck Info Elements
    const deckProjectNum = document.getElementById('deckProjectNum');
    const deckCategoryBadge = document.getElementById('deckCategoryBadge');
    const deckProjectTitle = document.getElementById('deckProjectTitle');
    const deckProjectDesc = document.getElementById('deckProjectDesc');
    const deckTechStack = document.getElementById('deckTechStack');
    const deckLiveBtn = document.getElementById('deckLiveBtn');
    const deckRepoBtn = document.getElementById('deckRepoBtn');

    // Video Controls Elements
    const webdevPlayToggle = document.getElementById('webdevPlayToggle');
    const webdevSoundToggle = document.getElementById('webdevSoundToggle');
    const webdevScrubTrack = document.getElementById('webdevScrubTrack');
    const webdevScrubFill = document.getElementById('webdevScrubFill');
    const webdevTimeDisplay = document.getElementById('webdevTimeDisplay');
    const webdevTheaterToggle = document.getElementById('webdevTheaterToggle');
    const deckTheaterBtn = document.getElementById('deckTheaterBtn');

    // Theater Modal Elements
    const webdevTheaterModal = document.getElementById('webdevTheaterModal');
    const theaterModalBackdrop = document.getElementById('theaterModalBackdrop');
    const theaterCloseBtn = document.getElementById('theaterCloseBtn');
    const theaterVideoElement = document.getElementById('theaterVideoElement');
    const theaterModalName = document.getElementById('theaterModalName');

    // 1. Responsive Viewport Mode Switcher
    if (viewportButtons.length && workstationViewport) {
        viewportButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                viewportButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const mode = btn.getAttribute('data-viewport');
                workstationViewport.classList.remove('mode-desktop', 'mode-tablet', 'mode-mobile');
                workstationViewport.classList.add(`mode-${mode}`);
            });
        });
    }

    // 2. Project Category Filter
    if (filterButtons.length && projectCards.length) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filter === 'all' || filter === category) {
                        card.style.display = 'flex';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Helper: format time mm:ss
    function formatTime(seconds) {
        if (isNaN(seconds) || seconds < 0) return '00:00';
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }

    // 3. Project Selection (Click on any project video card)
    function selectWebdevProject(card) {
        if (!card) return;

        projectCards.forEach(c => {
            c.classList.remove('active');
            const pill = c.querySelector('.card-play-pill');
            if (pill) {
                pill.textContent = '▶ STREAM VIDEO';
                pill.classList.remove('active-badge');
            }
        });
        card.classList.add('active');
        const activePill = card.querySelector('.card-play-pill');
        if (activePill) {
            activePill.textContent = '▶ ACTIVE IN STAGE';
            activePill.classList.add('active-badge');
        }

        const videoSrc = card.getAttribute('data-video');
        const title = card.getAttribute('data-title');
        const tag = card.getAttribute('data-tag');
        const desc = card.getAttribute('data-desc');
        const url = card.getAttribute('data-url');
        const live = card.getAttribute('data-live');
        const repo = card.getAttribute('data-repo');
        const techJson = card.getAttribute('data-tech');
        const idx = card.getAttribute('data-project-idx') || '0';

        // Update video
        if (webdevMainVideo) {
            webdevMainVideo.src = videoSrc;
            webdevMainVideo.load();
            webdevMainVideo.play().catch(() => {
                // Autoplay policy or placeholder file, graceful fallback
            });
        }

        // Update Workstation URL & Buttons
        if (workstationUrlText) workstationUrlText.textContent = url || 'nexus-ai.dev';
        if (workstationLaunchBtn) workstationLaunchBtn.href = live || '#';

        // Update HUD
        if (hudProjectRecText) {
            hudProjectRecText.textContent = `PROJECT 0${parseInt(idx) + 1} // ${title.split('//')[0].trim().toUpperCase()}`;
        }

        // Update Simulated Screen Fallback
        if (simProjectTitle) simProjectTitle.textContent = title;
        if (simProjectDesc) simProjectDesc.textContent = desc;
        if (simProjectTag) simProjectTag.textContent = `⚡ ${tag}`;

        // Update Deck Specs
        if (deckProjectNum) deckProjectNum.textContent = `// PROJECT 0${parseInt(idx) + 1}`;
        if (deckCategoryBadge) deckCategoryBadge.textContent = tag;
        if (deckProjectTitle) deckProjectTitle.textContent = title;
        if (deckProjectDesc) deckProjectDesc.textContent = desc;
        if (deckLiveBtn) deckLiveBtn.href = live || '#';
        if (deckRepoBtn) deckRepoBtn.href = repo || '#';

        // Update Tech Pills in Deck
        if (deckTechStack && techJson) {
            try {
                const techs = JSON.parse(techJson);
                deckTechStack.innerHTML = techs.map(t => `<span class="tech-chip">${t}</span>`).join('');
            } catch (e) {
                // Ignore parse error
            }
        }

        // Update Feature Checkmarks in Deck
        const deckFeaturesList = document.querySelector('.deck-features-list');
        const featuresJson = card.getAttribute('data-features');
        if (deckFeaturesList && featuresJson) {
            try {
                const features = JSON.parse(featuresJson);
                deckFeaturesList.innerHTML = features.map(f => `
                    <div class="feature-item">
                        <span class="feat-check">✓</span>
                        <span>${f}</span>
                    </div>
                `).join('');
            } catch (e) {
                // Ignore parse error
            }
        }
    }

    if (projectCards.length) {
        projectCards.forEach(card => {
            card.addEventListener('click', () => {
                selectWebdevProject(card);
            });

            // Mini Video Hover Autoplay
            const miniVideo = card.querySelector('.card-mini-video');
            if (miniVideo) {
                card.addEventListener('mouseenter', () => {
                    miniVideo.play().catch(() => {});
                });
                card.addEventListener('mouseleave', () => {
                    miniVideo.pause();
                });
            }
        });
    }

    // 4. Video Player Controls HUD
    if (webdevMainVideo) {
        // Play / Pause Toggle
        if (webdevPlayToggle) {
            const playIcon = webdevPlayToggle.querySelector('.icon-play');
            const pauseIcon = webdevPlayToggle.querySelector('.icon-pause');

            webdevPlayToggle.addEventListener('click', () => {
                if (webdevMainVideo.paused) {
                    webdevMainVideo.play().then(() => {
                        if (playIcon) playIcon.style.display = 'none';
                        if (pauseIcon) pauseIcon.style.display = 'block';
                    }).catch(() => {});
                } else {
                    webdevMainVideo.pause();
                    if (playIcon) playIcon.style.display = 'block';
                    if (pauseIcon) pauseIcon.style.display = 'none';
                }
            });

            webdevMainVideo.addEventListener('play', () => {
                if (playIcon) playIcon.style.display = 'none';
                if (pauseIcon) pauseIcon.style.display = 'block';
            });

            webdevMainVideo.addEventListener('pause', () => {
                if (playIcon) playIcon.style.display = 'block';
                if (pauseIcon) pauseIcon.style.display = 'none';
            });
        }

        // Sound / Mute Toggle
        if (webdevSoundToggle) {
            const muteIcon = webdevSoundToggle.querySelector('.icon-mute');
            const unmuteIcon = webdevSoundToggle.querySelector('.icon-unmute');

            webdevSoundToggle.addEventListener('click', () => {
                webdevMainVideo.muted = !webdevMainVideo.muted;
                if (webdevMainVideo.muted) {
                    if (muteIcon) muteIcon.style.display = 'block';
                    if (unmuteIcon) unmuteIcon.style.display = 'none';
                } else {
                    if (muteIcon) muteIcon.style.display = 'none';
                    if (unmuteIcon) unmuteIcon.style.display = 'block';
                }
            });
        }

        // Time Update & Scrubber Progress
        webdevMainVideo.addEventListener('timeupdate', () => {
            const current = webdevMainVideo.currentTime;
            const duration = webdevMainVideo.duration || 45;
            const percent = (current / duration) * 100;

            if (webdevScrubFill) {
                webdevScrubFill.style.width = `${percent}%`;
            }
            if (webdevTimeDisplay) {
                webdevTimeDisplay.textContent = `${formatTime(current)} / ${formatTime(duration)}`;
            }
        });

        // Click on Scrubber to seek
        if (webdevScrubTrack) {
            webdevScrubTrack.addEventListener('click', (e) => {
                const rect = webdevScrubTrack.getBoundingClientRect();
                const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                if (webdevMainVideo.duration) {
                    webdevMainVideo.currentTime = pos * webdevMainVideo.duration;
                }
            });
        }
    }

    // 5. 4K Theater Mode Modal
    function openWebdevTheater() {
        if (!webdevTheaterModal || !theaterVideoElement) return;
        webdevTheaterModal.classList.add('active');
        if (theaterModalName && deckProjectTitle) {
            theaterModalName.textContent = deckProjectTitle.textContent;
        }
        if (webdevMainVideo) {
            theaterVideoElement.src = webdevMainVideo.currentSrc || webdevMainVideo.src;
            theaterVideoElement.currentTime = webdevMainVideo.currentTime || 0;
            theaterVideoElement.muted = false;
            theaterVideoElement.play().catch(() => {});
        }
    }

    function closeWebdevTheater() {
        if (!webdevTheaterModal) return;
        webdevTheaterModal.classList.remove('active');
        if (theaterVideoElement) {
            theaterVideoElement.pause();
        }
    }

    if (webdevTheaterToggle) {
        webdevTheaterToggle.addEventListener('click', openWebdevTheater);
    }
    if (deckTheaterBtn) {
        deckTheaterBtn.addEventListener('click', openWebdevTheater);
    }
    if (theaterCloseBtn) {
        theaterCloseBtn.addEventListener('click', closeWebdevTheater);
    }
    if (theaterModalBackdrop) {
        theaterModalBackdrop.addEventListener('click', closeWebdevTheater);
    }
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && webdevTheaterModal && webdevTheaterModal.classList.contains('active')) {
            closeWebdevTheater();
        }
    });
    // 6. How to Add More Websites Guide Modal
    const webdevAddWebsiteModal = document.getElementById('webdevAddWebsiteModal');
    const openAddWebsiteModalBtn = document.getElementById('openAddWebsiteModalBtn');
    const guideCloseBtn = document.getElementById('guideCloseBtn');
    const guideModalBackdrop = document.getElementById('guideModalBackdrop');

    function openAddWebsiteModal() {
        if (webdevAddWebsiteModal) {
            webdevAddWebsiteModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeAddWebsiteModal() {
        if (webdevAddWebsiteModal) {
            webdevAddWebsiteModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (openAddWebsiteModalBtn) {
        openAddWebsiteModalBtn.addEventListener('click', openAddWebsiteModal);
    }
    if (guideCloseBtn) {
        guideCloseBtn.addEventListener('click', closeAddWebsiteModal);
    }
    if (guideModalBackdrop) {
        guideModalBackdrop.addEventListener('click', closeAddWebsiteModal);
    }
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && webdevAddWebsiteModal && webdevAddWebsiteModal.classList.contains('active')) {
            closeAddWebsiteModal();
        }
    });

    // 3D Tilt for WebDev Service & Architecture Cards
    const webdevTiltCards = document.querySelectorAll('.webdev-service-item.tilt-card');
    webdevTiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -6;
            const rotateY = ((x - centerX) / centerX) * 6;
            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // ============================================
    // DRONE 360° SCROLL ANIMATION
    // ============================================

    const droneSection = document.getElementById('droneSequence');
    const droneCanvas = document.getElementById('droneCanvas');
    const droneCtx = droneCanvas ? droneCanvas.getContext('2d') : null;
    const droneHud = document.getElementById('droneHud');
    const hudFrameEl = document.getElementById('hudFrame');
    const hudRotationEl = document.getElementById('hudRotation');
    const hudProgressFill = document.getElementById('hudProgressFill');
    const hudProgressLabel = document.getElementById('hudProgressLabel');
    const droneScrollHint = document.getElementById('droneScrollHint');
    const particleCanvas = document.getElementById('droneParticleCanvas');
    const particleCtx = particleCanvas ? particleCanvas.getContext('2d') : null;

    const TOTAL_FRAMES = 300;
    const isMobileViewport = window.innerWidth <= 768;
    // Step frames on mobile (step by 2 = 150 frames: ultra smooth 360 rotation with 50% data saving)
    const FRAME_STEP = isMobileViewport ? 2 : 1;
    const droneFrames = new Array(TOTAL_FRAMES);
    let droneFramesLoaded = 0;
    let currentDroneFrame = -1;
    let droneAnimActive = false;
    let droneFramesPreloaded = false;

    // Load first frame immediately so canvas has image right away
    function loadFirstFrame() {
        if (!droneCanvas || !droneCtx) return;
        const img = new Image();
        img.src = 'drone frames/ezgif-frame-001.png';
        img.onload = () => {
            droneFrames[0] = img;
            droneFramesLoaded++;
            droneCanvas.width = img.naturalWidth;
            droneCanvas.height = img.naturalHeight;
            droneCtx.drawImage(img, 0, 0);
            droneCanvas._lastDrawnImg = img;
        };
    }

    if (droneCanvas) {
        loadFirstFrame();
    }

    // Preload frames progressively in background
    function startPreloadingFrames() {
        if (droneFramesPreloaded) return;
        droneFramesPreloaded = true;

        for (let i = 1; i <= TOTAL_FRAMES; i += FRAME_STEP) {
            if (i === 1 && droneFrames[0]) continue;
            const img = new Image();
            const num = String(i).padStart(3, '0');
            img.src = `drone frames/ezgif-frame-${num}.png`;
            img.onload = () => {
                droneFramesLoaded++;
                if (droneAnimActive) {
                    onDroneScroll();
                }
            };
            droneFrames[i - 1] = img;
        }
    }

    // Start downloading frames after initial page display
    setTimeout(startPreloadingFrames, 600);

    // Draw a specific frame on canvas with outward fallback to nearest available loaded frame
    function drawDroneFrame(index) {
        if (!droneCtx || !droneCanvas) return;

        let frameImg = droneFrames[index];
        if (!frameImg || !frameImg.complete || !frameImg.naturalWidth) {
            // Search outwards for closest loaded frame
            let bestImg = null;
            for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
                const prev = droneFrames[index - offset];
                if (prev && prev.complete && prev.naturalWidth) {
                    bestImg = prev;
                    break;
                }
                const next = droneFrames[index + offset];
                if (next && next.complete && next.naturalWidth) {
                    bestImg = next;
                    break;
                }
            }
            if (bestImg) {
                frameImg = bestImg;
            } else if (droneFrames[0] && droneFrames[0].complete && droneFrames[0].naturalWidth) {
                frameImg = droneFrames[0];
            }
        }

        if (!frameImg || !frameImg.complete || !frameImg.naturalWidth) return;
        if (frameImg === droneCanvas._lastDrawnImg) return;
        droneCanvas._lastDrawnImg = frameImg;
        currentDroneFrame = index;

        droneCtx.clearRect(0, 0, droneCanvas.width, droneCanvas.height);
        droneCtx.drawImage(frameImg, 0, 0);
    }

    // Update HUD telemetry
    function updateHUD(frameIndex, progress) {
        if (hudFrameEl) {
            hudFrameEl.textContent = `${String(frameIndex + 1).padStart(3, '0')} / ${TOTAL_FRAMES}`;
        }
        if (hudRotationEl) {
            const degrees = ((frameIndex / TOTAL_FRAMES) * 360).toFixed(1);
            hudRotationEl.textContent = `${degrees}°`;
        }
        if (hudProgressFill) {
            hudProgressFill.style.width = `${(progress * 100).toFixed(1)}%`;
        }
        if (hudProgressLabel) {
            hudProgressLabel.textContent = `${Math.round(progress * 100)}%`;
        }
    }

    // -------- Bold Text Scroll-Reveal --------
    const leftTexts  = document.querySelectorAll('#droneTextLeft  .drone-bold-text');
    const rightTexts = document.querySelectorAll('#droneTextRight .drone-bold-text');
    const DRONE_TEXT_COUNT = 4; // number of text blocks per side

    function updateSpecPanels(progress) {
        // Divide scroll into equal zones for each text block
        // Zone 0: 0.05 – 0.27 | Zone 1: 0.27 – 0.50 | Zone 2: 0.50 – 0.73 | Zone 3: 0.73 – 0.95
        const zoneStart = 0.05;
        const zoneEnd   = 0.95;
        const zoneSize  = (zoneEnd - zoneStart) / DRONE_TEXT_COUNT;

        // Determine which zone we're in
        let activeIndex = -1;
        if (progress >= zoneStart && progress <= zoneEnd) {
            activeIndex = Math.min(
                DRONE_TEXT_COUNT - 1,
                Math.floor((progress - zoneStart) / zoneSize)
            );
        }

        // Toggle .active on each text block — only 1 active at a time
        leftTexts.forEach((el, i) => {
            if (i === activeIndex) {
                el.classList.add('active');
            } else {
                el.classList.remove('active');
            }
        });

        rightTexts.forEach((el, i) => {
            if (i === activeIndex) {
                el.classList.add('active');
            } else {
                el.classList.remove('active');
            }
        });
    }

    // Scroll handler — syncs drone frame to scroll position within section
    let droneRAF = null;
    function onDroneScroll() {
        if (!droneSection || !droneCanvas) return;

        const rect = droneSection.getBoundingClientRect();
        const sectionHeight = droneSection.offsetHeight - window.innerHeight;
        const scrolled = -rect.top;
        const progress = Math.max(0, Math.min(1, scrolled / sectionHeight));

        const frameIndex = Math.min(
            TOTAL_FRAMES - 1,
            Math.max(0, Math.floor(progress * (TOTAL_FRAMES - 1)))
        );

        drawDroneFrame(frameIndex);
        updateHUD(frameIndex, progress);
        updateSpecPanels(progress);

        // Fade scroll hint as user scrolls
        if (droneScrollHint) {
            const hintOpacity = Math.max(0, 1 - progress * 5);
            droneScrollHint.style.opacity = hintOpacity;
        }
    }

    // Use requestAnimationFrame-throttled scroll listener for performance
    let droneTicking = false;
    window.addEventListener('scroll', () => {
        if (!droneTicking) {
            requestAnimationFrame(() => {
                onDroneScroll();
                droneTicking = false;
            });
            droneTicking = true;
        }
    }, { passive: true });

    // Lazy preload frames when approaching drone section (within 800px)
    if (droneSection) {
        const preloadObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startPreloadingFrames();
                    preloadObserver.disconnect();
                }
            });
        }, { rootMargin: '800px 0px' });
        preloadObserver.observe(droneSection);
    }

    // Activate HUD & particles only when drone section enters viewport
    let particleRunning = false;

    if (droneSection && droneHud) {
        const droneObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    droneHud.classList.add('active');
                    droneAnimActive = true;
                    if (!particleRunning && particleCtx && particleCanvas) {
                        particleRunning = true;
                        animateParticles();
                    }
                } else {
                    droneHud.classList.remove('active');
                    droneAnimActive = false;
                }
            });
        }, { threshold: 0.05 });

        droneObserver.observe(droneSection);
    }

    // -------- Particle System --------
    const particles = [];
    const PARTICLE_COUNT = 60;

    function initParticles() {
        if (!particleCanvas) return;
        particleCanvas.width = window.innerWidth;
        particleCanvas.height = window.innerHeight;

        particles.length = 0;
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push({
                x: Math.random() * particleCanvas.width,
                y: Math.random() * particleCanvas.height,
                size: Math.random() * 2 + 0.5,
                speedX: (Math.random() - 0.5) * 0.3,
                speedY: (Math.random() - 0.5) * 0.3,
                opacity: Math.random() * 0.3 + 0.05,
                pulse: Math.random() * Math.PI * 2,
            });
        }
    }

    function animateParticles() {
        if (!particleCtx || !particleCanvas || !droneAnimActive) {
            particleRunning = false;
            return;
        }

        particleCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

        particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;
            p.pulse += 0.02;

            // Wrap around edges
            if (p.x < 0) p.x = particleCanvas.width;
            if (p.x > particleCanvas.width) p.x = 0;
            if (p.y < 0) p.y = particleCanvas.height;
            if (p.y > particleCanvas.height) p.y = 0;

            const dynamicOpacity = p.opacity * (0.5 + 0.5 * Math.sin(p.pulse));

            particleCtx.beginPath();
            particleCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            particleCtx.fillStyle = `rgba(10, 10, 10, ${dynamicOpacity})`;
            particleCtx.fill();
        });

        // Draw subtle connection lines between nearby particles
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 120) {
                    const lineOpacity = (1 - dist / 120) * 0.06;
                    particleCtx.beginPath();
                    particleCtx.moveTo(particles[i].x, particles[i].y);
                    particleCtx.lineTo(particles[j].x, particles[j].y);
                    particleCtx.strokeStyle = `rgba(10, 10, 10, ${lineOpacity})`;
                    particleCtx.lineWidth = 0.5;
                    particleCtx.stroke();
                }
            }
        }

        requestAnimationFrame(animateParticles);
    }

    initParticles();

    // Resize particle canvas on window resize
    window.addEventListener('resize', () => {
        if (particleCanvas) {
            particleCanvas.width = window.innerWidth;
            particleCanvas.height = window.innerHeight;
        }
    });

    // ============================================
    // CREATIVE SKILLS SECTIONS INTERACTIVITY
    // (Photography, Photo Editing, Video Editing)
    // ============================================

    // -------- 1. Photography 3D Card Tilt --------
    const bentoItems = document.querySelectorAll('.bento-item');
    bentoItems.forEach((item) => {
        const inner = item.querySelector('.bento-inner');
        if (!inner) return;

        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            inner.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-4px) scale3d(1.01, 1.01, 1.01)`;
        });

        item.addEventListener('mouseleave', () => {
            inner.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) translateY(0) scale3d(1, 1, 1)';
        });
    });

    // -------- 1b. Photography Lightbox / Optical Inspector --------
    const photoLightboxModal = document.getElementById('photoLightboxModal');
    const lightboxMainImg = document.getElementById('lightboxMainImg');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxCounter = document.getElementById('lightboxCounter');
    const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');
    const lightboxBackdrop = document.getElementById('lightboxBackdrop');
    const lightboxPrevBtn = document.getElementById('lightboxPrevBtn');
    const lightboxNextBtn = document.getElementById('lightboxNextBtn');

    const hudCamera = document.getElementById('hudCamera');
    const hudLens = document.getElementById('hudLens');
    const hudAperture = document.getElementById('hudAperture');
    const hudShutter = document.getElementById('hudShutter');
    const hudIso = document.getElementById('hudIso');
    const hudGenre = document.getElementById('hudGenre');

    if (photoLightboxModal && lightboxMainImg && bentoItems.length > 0) {
        let currentPhotoIndex = 0;
        const photoList = Array.from(bentoItems);

        function openPhoto(index) {
            if (index < 0) index = photoList.length - 1;
            if (index >= photoList.length) index = 0;
            currentPhotoIndex = index;

            const item = photoList[currentPhotoIndex];
            const src = item.dataset.photoSrc;
            const title = item.dataset.photoTitle || 'PHOTOGRAPHY';
            const cam = item.dataset.photoCam || '—';
            const lens = item.dataset.photoLens || '—';
            const aperture = item.dataset.photoAperture || '—';
            const shutter = item.dataset.photoShutter || '—';
            const iso = item.dataset.photoIso || '—';
            const genre = item.dataset.photoGenre || '—';

            // Animate transition
            lightboxMainImg.style.opacity = '0';
            lightboxMainImg.style.transform = 'scale(0.97)';

            setTimeout(() => {
                lightboxMainImg.src = src;
                lightboxMainImg.alt = title;
                if (lightboxTitle) lightboxTitle.textContent = title;
                if (lightboxCounter) lightboxCounter.textContent = `${currentPhotoIndex + 1} / ${photoList.length}`;

                if (hudCamera) hudCamera.textContent = cam;
                if (hudLens) hudLens.textContent = lens;
                if (hudAperture) hudAperture.textContent = aperture;
                if (hudShutter) hudShutter.textContent = shutter;
                if (hudIso) hudIso.textContent = iso;
                if (hudGenre) hudGenre.textContent = genre;

                lightboxMainImg.onload = () => {
                    lightboxMainImg.style.opacity = '1';
                    lightboxMainImg.style.transform = 'scale(1)';
                };
                // Fallback in case cached
                lightboxMainImg.style.opacity = '1';
                lightboxMainImg.style.transform = 'scale(1)';
            }, 120);

            photoLightboxModal.classList.add('active');
            photoLightboxModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            photoLightboxModal.classList.remove('active');
            photoLightboxModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }

        // Attach click & enter key handlers to all bento cards
        photoList.forEach((item, idx) => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                openPhoto(idx);
            });

            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openPhoto(idx);
                }
            });
        });

        // Prev & Next navigation
        if (lightboxPrevBtn) {
            lightboxPrevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                openPhoto(currentPhotoIndex - 1);
            });
        }

        if (lightboxNextBtn) {
            lightboxNextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                openPhoto(currentPhotoIndex + 1);
            });
        }

        // Close handlers
        if (lightboxCloseBtn) {
            lightboxCloseBtn.addEventListener('click', closeLightbox);
        }
        if (lightboxBackdrop) {
            lightboxBackdrop.addEventListener('click', closeLightbox);
        }

        // Keyboard shortcuts
        window.addEventListener('keydown', (e) => {
            if (!photoLightboxModal.classList.contains('active')) return;
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                openPhoto(currentPhotoIndex - 1);
            } else if (e.key === 'ArrowRight') {
                openPhoto(currentPhotoIndex + 1);
            }
        });

        // Touch Swipe gesture navigation for mobile
        let touchStartX = 0;
        let touchStartY = 0;
        const stage = photoLightboxModal.querySelector('.lightbox-stage');

        if (stage) {
            stage.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
                touchStartY = e.changedTouches[0].screenY;
            }, { passive: true });

            stage.addEventListener('touchend', (e) => {
                const diffX = e.changedTouches[0].screenX - touchStartX;
                const diffY = e.changedTouches[0].screenY - touchStartY;
                // Detect horizontal swipe
                if (Math.abs(diffX) > 45 && Math.abs(diffX) > Math.abs(diffY)) {
                    if (diffX > 0) {
                        openPhoto(currentPhotoIndex - 1); // Swipe right -> prev
                    } else {
                        openPhoto(currentPhotoIndex + 1); // Swipe left -> next
                    }
                }
            }, { passive: true });
        }
    }

    // -------- 2. Photo Editing Comparison Slider --------
    const compSlider = document.getElementById('comparisonSlider');
    const compBefore = document.getElementById('comparisonBefore');
    const compHandle = document.getElementById('comparisonHandle');

    if (compSlider && compBefore && compHandle) {
        let isDraggingComp = false;

        function updateSliderWidth() {
            const sliderWidth = compSlider.offsetWidth;
            compSlider.style.setProperty('--comp-slider-width', `${sliderWidth}px`);
        }

        updateSliderWidth();
        window.addEventListener('resize', updateSliderWidth);

        function setComparisonPosition(clientX) {
            const rect = compSlider.getBoundingClientRect();
            let offsetX = clientX - rect.left;
            let percent = (offsetX / rect.width) * 100;
            // Clamp between 0% and 100%
            percent = Math.max(0, Math.min(100, percent));

            compBefore.style.width = `${percent}%`;
            compHandle.style.left = `${percent}%`;
            compHandle.setAttribute('aria-valuenow', Math.round(percent));
        }

        // Pointer / Touch / Mouse unified listeners
        function onPointerStart(e) {
            isDraggingComp = true;
            compSlider.classList.add('is-dragging');
            const clientX = e.clientX ?? (e.touches && e.touches[0] ? e.touches[0].clientX : null);
            if (clientX !== null) setComparisonPosition(clientX);
        }

        function onPointerMove(e) {
            if (!isDraggingComp) return;
            const clientX = e.clientX ?? (e.touches && e.touches[0] ? e.touches[0].clientX : null);
            if (clientX !== null) setComparisonPosition(clientX);
        }

        function onPointerEnd() {
            if (isDraggingComp) {
                isDraggingComp = false;
                compSlider.classList.remove('is-dragging');
            }
        }

        compSlider.addEventListener('mousedown', onPointerStart);
        window.addEventListener('mousemove', onPointerMove);
        window.addEventListener('mouseup', onPointerEnd);

        compSlider.addEventListener('touchstart', onPointerStart, { passive: true });
        window.addEventListener('touchmove', onPointerMove, { passive: true });
        window.addEventListener('touchend', onPointerEnd);
        window.addEventListener('touchcancel', onPointerEnd);

        // Keyboard accessibility
        compHandle.setAttribute('tabindex', '0');
        compHandle.setAttribute('role', 'slider');
        compHandle.setAttribute('aria-label', 'Image comparison slider');
        compHandle.setAttribute('aria-valuemin', '0');
        compHandle.setAttribute('aria-valuemax', '100');
        compHandle.setAttribute('aria-valuenow', '50');

        compHandle.addEventListener('keydown', (e) => {
            const currentPct = parseFloat(compBefore.style.width) || 50;
            let newPct = currentPct;
            if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
                newPct = Math.max(0, currentPct - 5);
            } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
                newPct = Math.min(100, currentPct + 5);
            } else if (e.key === 'Home') {
                newPct = 0;
            } else if (e.key === 'End') {
                newPct = 100;
            } else {
                return;
            }
            e.preventDefault();
            compBefore.style.width = `${newPct}%`;
            compHandle.style.left = `${newPct}%`;
            compHandle.setAttribute('aria-valuenow', Math.round(newPct));
        });
    }

    // -------- 3. Skill & Tech Bar Scroll Trigger --------
    const skillFillBars = document.querySelectorAll('.skill-bar-fill, .tech-bar-fill');
    if ('IntersectionObserver' in window && skillFillBars.length > 0) {
        const skillObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        skillFillBars.forEach(bar => skillObserver.observe(bar));
    } else {
        skillFillBars.forEach(bar => bar.classList.add('animated'));
    }

    // -------- 4. Post-Production LUT Switcher --------
    const lutButtons = document.querySelectorAll('.lut-btn');
    const compGradedImg = document.getElementById('compGradedImg');
    const activeGradeName = document.getElementById('activeGradeName');

    const lutProfiles = {
        'golden': {
            name: 'COLOR GRADED // GOLDEN CINEMA',
            filter: 'saturate(1.35) contrast(1.15) brightness(1.03) sepia(0.12)'
        },
        'teal-orange': {
            name: 'COLOR GRADED // TEAL & ORANGE DCI',
            filter: 'saturate(1.45) contrast(1.22) brightness(0.98) hue-rotate(-15deg)'
        },
        'cyber': {
            name: 'COLOR GRADED // CYBERPUNK MATRIX',
            filter: 'saturate(1.6) contrast(1.25) brightness(1.05) hue-rotate(45deg)'
        },
        'noir': {
            name: 'COLOR GRADED // HIGH-CONTRAST NOIR',
            filter: 'grayscale(1) contrast(1.4) brightness(0.95)'
        }
    };

    if (lutButtons.length > 0 && compGradedImg) {
        lutButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                lutButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const lutKey = btn.getAttribute('data-lut');
                if (lutProfiles[lutKey]) {
                    compGradedImg.style.filter = lutProfiles[lutKey].filter;
                    if (activeGradeName) {
                        activeGradeName.textContent = lutProfiles[lutKey].name;
                    }
                }
            });
        });
    }

    // -------- 5. WebDev Workstation Interactions (01. WHO I AM) --------
    const tabCodeBtn = document.getElementById('tabCodeBtn');
    const tabPreviewBtn = document.getElementById('tabPreviewBtn');
    const codeFlowPanel = document.getElementById('codeFlowPanel');
    const livePreviewPanel = document.getElementById('livePreviewPanel');
    const webdevReloadBtn = document.getElementById('webdevReloadBtn');
    const browserScanline = document.getElementById('browserScanline');
    const previewPulseBtn = document.getElementById('previewPulseBtn');

    if (tabCodeBtn && tabPreviewBtn && codeFlowPanel && livePreviewPanel) {
        tabCodeBtn.addEventListener('click', () => {
            tabCodeBtn.classList.add('active');
            tabPreviewBtn.classList.remove('active');
            codeFlowPanel.classList.add('active');
            livePreviewPanel.classList.remove('active');
        });

        tabPreviewBtn.addEventListener('click', () => {
            tabPreviewBtn.classList.add('active');
            tabCodeBtn.classList.remove('active');
            livePreviewPanel.classList.add('active');
            codeFlowPanel.classList.remove('active');
        });
    }

    if (webdevReloadBtn && browserScanline) {
        webdevReloadBtn.addEventListener('click', () => {
            browserScanline.classList.remove('scanning');
            void browserScanline.offsetWidth; // force reflow
            browserScanline.classList.add('scanning');

            // Re-animate code lines if on code tab
            const codeLines = document.querySelectorAll('.code-flow-line');
            codeLines.forEach(line => {
                line.style.animation = 'none';
                void line.offsetWidth;
                line.style.animation = '';
            });
        });
    }

    if (previewPulseBtn) {
        previewPulseBtn.addEventListener('click', () => {
            previewPulseBtn.classList.add('pulsed');
            setTimeout(() => {
                previewPulseBtn.classList.remove('pulsed');
            }, 500);
        });
    }

    // 3D Tilt interaction for Service Items
    const tiltCards = document.querySelectorAll('.webdev-service-item.tilt-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -6;
            const rotateY = ((x - centerX) / centerX) * 6;
            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // -------- 6. Cinematic Video Editing & Motion Lab Interactions --------
    const currentProjectBadge = document.getElementById('currentProjectBadge');
    const genreTabs = document.querySelectorAll('.genre-tab');
    const previewBackdrop = document.getElementById('previewBackdrop');
    const previewKineticBadge = document.getElementById('previewKineticBadge');
    const previewKineticHeadline = document.getElementById('previewKineticHeadline');
    const previewKineticSub = document.getElementById('previewKineticSub');
    const monitorTimecode = document.getElementById('monitorTimecode');
    const hudRetentionVal = document.getElementById('hudRetentionVal');
    const retentionPercentLabel = document.getElementById('retentionPercentLabel');
    const retentionBarFill = document.getElementById('retentionBarFill');
    const fxImpactBtn = document.getElementById('fxImpactBtn');
    const videoStudioCard = document.getElementById('videoStudioCard');
    const previewShockwave = document.getElementById('previewShockwave');
    const videoPlayPauseBtn = document.getElementById('videoPlayPauseBtn');
    const playbackTimeDisplay = document.getElementById('playbackTimeDisplay');
    const timelinePlayhead = document.getElementById('timelinePlayhead');
    const playheadTime = document.getElementById('playheadTime');
    const timelineArena = document.getElementById('timelineArena');
    const speedPills = document.querySelectorAll('.speed-pill');
    const sfxButtons = document.querySelectorAll('.sfx-btn');
    const ctaTypePills = document.querySelectorAll('.cta-type-pill');
    const videoHireBtn = document.getElementById('videoHireBtn');
    const audioWaveBars = document.getElementById('audioWaveBars');
    const videoEditingPlayer = document.getElementById('videoEditingPlayer');
    const videoEditingSource = document.getElementById('videoEditingSource');
    const videoProjectCards = document.querySelectorAll('.video-project-card');
    const openVideoGuideModalBtn = document.getElementById('openVideoGuideModalBtn');
    const videoAddEditModal = document.getElementById('videoAddEditModal');
    const videoGuideCloseBtn = document.getElementById('videoGuideCloseBtn');
    const videoGuideModalBackdrop = document.getElementById('videoGuideModalBackdrop');

    // Generate Audio Wave Bars in Monitor
    if (audioWaveBars) {
        audioWaveBars.innerHTML = '';
        for (let i = 0; i < 22; i++) {
            const bar = document.createElement('div');
            bar.className = 'audio-bar-item';
            bar.style.height = `${Math.floor(Math.random() * 60 + 20)}%`;
            audioWaveBars.appendChild(bar);
        }
    }

    // Web Audio Synthesizer for high-energy SFX without external dependencies
    let audioCtx = null;
    function getAudioContext() {
        if (!audioCtx) {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (AudioContextClass) {
                audioCtx = new AudioContextClass();
            }
        }
        if (audioCtx && audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        return audioCtx;
    }

    function playSynthesizedSFX(type) {
        try {
            const ctx = getAudioContext();
            if (!ctx) return;
            const now = ctx.currentTime;

            if (type === 'whoosh') {
                const bufferSize = Math.floor(ctx.sampleRate * 0.35);
                const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
                const data = buffer.getChannelData(0);
                for (let i = 0; i < bufferSize; i++) {
                    data[i] = (Math.random() * 2 - 1) * Math.sin((i / bufferSize) * Math.PI);
                }
                const noise = ctx.createBufferSource();
                noise.buffer = buffer;

                const filter = ctx.createBiquadFilter();
                filter.type = 'bandpass';
                filter.frequency.setValueAtTime(300, now);
                filter.frequency.exponentialRampToValueAtTime(3500, now + 0.18);
                filter.frequency.exponentialRampToValueAtTime(400, now + 0.35);
                filter.Q.setValueAtTime(2, now);

                const gain = ctx.createGain();
                gain.gain.setValueAtTime(0.01, now);
                gain.gain.linearRampToValueAtTime(0.4, now + 0.18);
                gain.gain.linearRampToValueAtTime(0.01, now + 0.35);

                noise.connect(filter);
                filter.connect(gain);
                gain.connect(ctx.destination);
                noise.start(now);
                noise.stop(now + 0.35);

            } else if (type === 'subdrop' || type === 'bass') {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(140, now);
                osc.frequency.exponentialRampToValueAtTime(32, now + 0.6);

                gain.gain.setValueAtTime(0.5, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 0.65);

            } else if (type === 'glitch') {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(800, now);
                osc.frequency.setValueAtTime(250, now + 0.05);
                osc.frequency.setValueAtTime(1200, now + 0.09);
                osc.frequency.setValueAtTime(150, now + 0.14);

                gain.gain.setValueAtTime(0.35, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 0.2);

            } else if (type === 'shutter') {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(1800, now);
                osc.frequency.exponentialRampToValueAtTime(200, now + 0.08);

                gain.gain.setValueAtTime(0.4, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 0.08);
            }
        } catch (err) {
            // Audio context not allowed or unsupported
        }
    }

    // Genre Presets & User Video Project Mapping
    const genreData = {
        reels: {
            title: 'PROJECT: VIRAL_REEL_01',
            badge: 'HOOK: 0.8s RETENTION',
            headline: 'WATCH THIS EDIT',
            sub: 'BEAT-SYNCED ◈ 4K CINEMA ◈ SOUND FX',
            retention: '98.4%',
            video: 'videos/edit-reels.mp4',
            backdrop: 'radial-gradient(ellipse at center, rgba(168, 85, 247, 0.45) 0%, rgba(239, 68, 68, 0.2) 50%, #050608 85%)'
        },
        commercial: {
            title: 'PROJECT: LUXE_BRAND_COMMERCIAL',
            badge: 'CINEMA SCOPE // 2.39:1',
            headline: 'EMOTIVE PACING',
            sub: 'HOLLYWOOD GRADE ◈ ANAMORPHIC FLARES ◈ PRORES',
            retention: '94.2%',
            video: 'videos/edit-commercial.mp4',
            backdrop: 'radial-gradient(ellipse at center, rgba(245, 158, 11, 0.4) 0%, rgba(239, 68, 68, 0.2) 50%, #050608 85%)'
        },
        drone: {
            title: 'PROJECT: FPV_PROXIMITY_CHASE',
            badge: 'HORIZON LOCK // 120 FPS',
            headline: 'SPEED RAMPING',
            sub: 'D-LOG M RAW ◈ GYROFLOW SMOOTH ◈ BASS IMPACT',
            retention: '96.7%',
            video: 'videos/edit-drone.mp4',
            backdrop: 'radial-gradient(ellipse at center, rgba(239, 68, 68, 0.45) 0%, rgba(220, 38, 38, 0.2) 50%, #050608 85%)'
        },
        vfx: {
            title: 'PROJECT: 3D_CYBER_TITLES_VFX',
            badge: 'HUD COMPOSITING // 3D VFX',
            headline: 'KINETIC 3D MAGIC',
            sub: 'AFTER EFFECTS ◈ GLITCH HOLOGRAPH ◈ BLENDER',
            retention: '99.1%',
            video: 'videos/edit-vfx.mp4',
            backdrop: 'radial-gradient(ellipse at center, rgba(236, 72, 153, 0.45) 0%, rgba(168, 85, 247, 0.25) 50%, #050608 85%)'
        }
    };

    // Load video file into DaVinci NLE Studio Monitor with graceful fallback
    function loadVideoProject(videoSrc) {
        if (!videoEditingPlayer || !videoEditingSource) return;
        if (videoSrc) {
            videoEditingSource.src = videoSrc;
            videoEditingPlayer.load();
            const playPromise = videoEditingPlayer.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    videoEditingPlayer.classList.add('has-media');
                }).catch(() => {
                    // If video not available or autoplay suspended, hide video and show kinetic graphics fallback
                    videoEditingPlayer.classList.remove('has-media');
                });
            }
        } else {
            videoEditingPlayer.classList.remove('has-media');
        }
    }

    if (videoEditingPlayer) {
        videoEditingPlayer.addEventListener('error', () => {
            videoEditingPlayer.classList.remove('has-media');
        });
        videoEditingPlayer.addEventListener('loadeddata', () => {
            videoEditingPlayer.classList.add('has-media');
        });
    }

    if (genreTabs.length > 0) {
        genreTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                genreTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const genre = tab.getAttribute('data-genre');
                const data = genreData[genre];
                if (data) {
                    if (currentProjectBadge) currentProjectBadge.textContent = data.title;
                    if (previewKineticBadge) previewKineticBadge.textContent = data.badge;
                    if (previewKineticHeadline) {
                        previewKineticHeadline.textContent = data.headline;
                        previewKineticHeadline.classList.remove('pop-animate');
                        void previewKineticHeadline.offsetWidth;
                        previewKineticHeadline.classList.add('pop-animate');
                    }
                    if (previewKineticSub) previewKineticSub.textContent = data.sub;
                    if (hudRetentionVal) hudRetentionVal.textContent = `RETENTION: ${data.retention}`;
                    if (retentionPercentLabel) retentionPercentLabel.textContent = data.retention;
                    if (retentionBarFill) retentionBarFill.style.width = data.retention;
                    if (previewBackdrop) previewBackdrop.style.background = data.backdrop;

                    // Load user's video file into studio monitor
                    if (data.video) {
                        loadVideoProject(data.video);
                    }

                    // Sync corresponding card in showreel vault
                    if (videoProjectCards.length > 0) {
                        videoProjectCards.forEach(c => {
                            if (c.getAttribute('data-genre') === genre) {
                                c.classList.add('active');
                            } else {
                                c.classList.remove('active');
                            }
                        });
                    }

                    playSynthesizedSFX('whoosh');
                }
            });
        });
    }

    // Playback Engine
    let isPlaying = false;
    let playbackPercent = 28; // Initial playhead at 28%
    let playSpeed = 1;
    let playInterval = null;
    const maxDurationSeconds = 15;

    function formatTimecode(percent) {
        const totalFrames = Math.floor((percent / 100) * maxDurationSeconds * 24);
        const frames = totalFrames % 24;
        const totalSeconds = Math.floor(totalFrames / 24);
        const seconds = totalSeconds % 60;
        const minutes = Math.floor(totalSeconds / 60);

        const pad = (n, len = 2) => String(n).padStart(len, '0');
        return {
            full: `${pad(0)}:${pad(minutes)}:${pad(seconds)}:${pad(frames)}`,
            short: `${pad(minutes)}:${pad(seconds)}.${pad(frames)}`
        };
    }

    function updatePlayheadUI() {
        if (timelinePlayhead) {
            timelinePlayhead.style.left = `${playbackPercent}%`;
        }
        const tc = formatTimecode(playbackPercent);
        if (playheadTime) {
            playheadTime.textContent = tc.short;
        }
        if (monitorTimecode) {
            monitorTimecode.textContent = tc.full;
        }
        if (playbackTimeDisplay) {
            playbackTimeDisplay.textContent = tc.short;
        }

        // Randomize audio wave bars subtly
        if (audioWaveBars) {
            const bars = audioWaveBars.querySelectorAll('.audio-bar-item');
            bars.forEach(bar => {
                const h = isPlaying ? Math.floor(Math.random() * 80 + 20) : Math.floor(Math.random() * 30 + 10);
                bar.style.height = `${h}%`;
            });
        }
    }

    function startPlayback() {
        if (playInterval) clearInterval(playInterval);
        isPlaying = true;
        if (videoPlayPauseBtn) {
            const playIcon = videoPlayPauseBtn.querySelector('.play-icon');
            const pauseIcon = videoPlayPauseBtn.querySelector('.pause-icon');
            if (playIcon) playIcon.style.display = 'none';
            if (pauseIcon) pauseIcon.style.display = 'block';
        }

        if (videoEditingPlayer && videoEditingPlayer.classList.contains('has-media')) {
            videoEditingPlayer.play().catch(() => {});
        }

        playInterval = setInterval(() => {
            playbackPercent += 0.35 * playSpeed;
            if (playbackPercent >= 100) {
                playbackPercent = 0;
            }
            updatePlayheadUI();
        }, 50);
    }

    function pausePlayback() {
        if (playInterval) clearInterval(playInterval);
        isPlaying = false;
        if (videoPlayPauseBtn) {
            const playIcon = videoPlayPauseBtn.querySelector('.play-icon');
            const pauseIcon = videoPlayPauseBtn.querySelector('.pause-icon');
            if (playIcon) playIcon.style.display = 'block';
            if (pauseIcon) pauseIcon.style.display = 'none';
        }
        if (videoEditingPlayer) {
            videoEditingPlayer.pause();
        }
        updatePlayheadUI();
    }

    if (videoPlayPauseBtn) {
        videoPlayPauseBtn.addEventListener('click', () => {
            if (isPlaying) {
                pausePlayback();
            } else {
                startPlayback();
            }
        });
    }

    // Speed Selector
    if (speedPills.length > 0) {
        speedPills.forEach(pill => {
            pill.addEventListener('click', () => {
                speedPills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                playSpeed = parseFloat(pill.getAttribute('data-speed')) || 1;
                playSynthesizedSFX('shutter');
            });
        });
    }

    // Scrubber Interaction on timelineArena
    if (timelineArena) {
        let isScrubbing = false;

        function scrub(e) {
            const rect = timelineArena.getBoundingClientRect();
            const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
            let percent = ((clientX - rect.left) / rect.width) * 100;
            percent = Math.max(0, Math.min(100, percent));
            playbackPercent = percent;
            updatePlayheadUI();
        }

        timelineArena.addEventListener('mousedown', (e) => {
            isScrubbing = true;
            scrub(e);
        });

        window.addEventListener('mousemove', (e) => {
            if (isScrubbing) scrub(e);
        });

        window.addEventListener('mouseup', () => {
            if (isScrubbing) isScrubbing = false;
        });

        timelineArena.addEventListener('touchstart', (e) => {
            isScrubbing = true;
            scrub(e);
        }, { passive: true });

        window.addEventListener('touchmove', (e) => {
            if (isScrubbing) scrub(e);
        }, { passive: true });

        window.addEventListener('touchend', () => {
            if (isScrubbing) isScrubbing = false;
        });
    }

    // Drop the Bass FX Button
    if (fxImpactBtn) {
        fxImpactBtn.addEventListener('click', () => {
            playSynthesizedSFX('subdrop');
            if (videoStudioCard) {
                videoStudioCard.classList.remove('bass-shaking');
                void videoStudioCard.offsetWidth;
                videoStudioCard.classList.add('bass-shaking');
            }
            if (previewShockwave) {
                previewShockwave.classList.remove('active');
                void previewShockwave.offsetWidth;
                previewShockwave.classList.add('active');
            }
            if (previewKineticHeadline) {
                previewKineticHeadline.classList.remove('pop-animate');
                void previewKineticHeadline.offsetWidth;
                previewKineticHeadline.classList.add('pop-animate');
            }
        });
    }

    // SFX Soundboard Buttons
    if (sfxButtons.length > 0) {
        sfxButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const sfxType = btn.getAttribute('data-sfx');
                playSynthesizedSFX(sfxType);
                btn.classList.add('triggered');
                setTimeout(() => btn.classList.remove('triggered'), 300);
            });
        });
    }

    // Project CTA Selector
    if (ctaTypePills.length > 0) {
        ctaTypePills.forEach(pill => {
            pill.addEventListener('click', () => {
                ctaTypePills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                const projectScope = pill.getAttribute('data-project');
                playSynthesizedSFX('shutter');

                if (videoHireBtn) {
                    videoHireBtn.setAttribute('data-preferred-scope', projectScope);
                }
            });
        });
    }

    // Wire up Hire Button to pre-fill message in contact form
    if (videoHireBtn) {
        videoHireBtn.addEventListener('click', () => {
            const scope = videoHireBtn.getAttribute('data-preferred-scope') || '10x Viral Reels Pack';
            const messageArea = document.getElementById('projectMessage') || document.querySelector('.console-textarea');
            if (messageArea) {
                messageArea.value = `Hi Diptanu, I'm interested in collaborating on a video editing project: ${scope}. Let's discuss details and delivery!`;
                messageArea.focus();
            }
        });
    }

    // 3D Tilt for Video Bento Cards
    const videoBentoCards = document.querySelectorAll('.video-bento-card');
    videoBentoCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;
            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // -------- Video Project Cards Interactivity --------
    if (videoProjectCards.length > 0) {
        videoProjectCards.forEach(card => {
            card.addEventListener('click', () => {
                videoProjectCards.forEach(c => c.classList.remove('active'));
                card.classList.add('active');

                const genre = card.getAttribute('data-genre');
                const videoSrc = card.getAttribute('data-video');
                const title = card.getAttribute('data-title');
                const headline = card.getAttribute('data-headline');
                const badge = card.getAttribute('data-badge');
                const sub = card.getAttribute('data-sub');
                const retention = card.getAttribute('data-retention');

                // Sync studio topbar genre tabs
                if (genreTabs.length > 0) {
                    genreTabs.forEach(t => {
                        if (t.getAttribute('data-genre') === genre) {
                            t.classList.add('active');
                        } else {
                            t.classList.remove('active');
                        }
                    });
                }

                if (currentProjectBadge && title) currentProjectBadge.textContent = title;
                if (previewKineticBadge && badge) previewKineticBadge.textContent = badge;
                if (previewKineticHeadline && headline) {
                    previewKineticHeadline.textContent = headline;
                    previewKineticHeadline.classList.remove('pop-animate');
                    void previewKineticHeadline.offsetWidth;
                    previewKineticHeadline.classList.add('pop-animate');
                }
                if (previewKineticSub) previewKineticSub.textContent = sub;
                if (hudRetentionVal && retention) hudRetentionVal.textContent = `RETENTION: ${retention}`;
                if (retentionPercentLabel && retention) retentionPercentLabel.textContent = retention;
                if (retentionBarFill && retention) retentionBarFill.style.width = retention;

                if (genreData[genre] && previewBackdrop) {
                    previewBackdrop.style.background = genreData[genre].backdrop;
                }

                // Load and play video in the DaVinci NLE monitor
                loadVideoProject(videoSrc);
                playSynthesizedSFX('whoosh');

                // Smoothly scroll to studio card if screen is narrow
                const studioCard = document.getElementById('videoStudioCard');
                if (studioCard && window.innerWidth < 900) {
                    studioCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    // -------- Video Editing Guide Modal Interactivity --------
    function toggleVideoGuideModal(open) {
        if (!videoAddEditModal) return;
        if (open) {
            videoAddEditModal.classList.add('active');
            videoAddEditModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        } else {
            videoAddEditModal.classList.remove('active');
            videoAddEditModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    }

    if (openVideoGuideModalBtn) {
        openVideoGuideModalBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleVideoGuideModal(true);
        });
    }
    if (videoGuideCloseBtn) {
        videoGuideCloseBtn.addEventListener('click', () => toggleVideoGuideModal(false));
    }
    if (videoGuideModalBackdrop) {
        videoGuideModalBackdrop.addEventListener('click', () => toggleVideoGuideModal(false));
    }

    // Initialize playhead
    updatePlayheadUI();

})();

