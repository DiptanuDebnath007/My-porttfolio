# 🎬 Website Project Videos & GitHub Source Code Guide

Drop your website screen recordings or demo videos in this folder to showcase them in your portfolio's redesigned **Web Developer** section!

---

## 📁 Current Video Mapping

1. **`videos/project-1.mp4`** *(Active)*
   - **Website Title**: DentalCare Pro // Modern Clinical & Appointment Web App
   - **Category**: Healthcare & Clinic Web App
   - **GitHub Repo**: [https://github.com/DiptanuDebnath007](https://github.com/DiptanuDebnath007)

2. **`videos/project-2.mp4`**
   - **Website Title**: Nexus AI // Enterprise Cloud Dashboard
   - **Category**: Full-Stack SaaS

3. **`videos/project-3.mp4`**
   - **Website Title**: Hyperion // 3D Interactive Web Experience
   - **Category**: 3D & Creative Web

4. **`videos/project-4.mp4`**
   - **Website Title**: Apex Commerce // High-Conversion Storefront
   - **Category**: E-Commerce Store

---

## 🚀 How to Add a New Website Video & GitHub Source Code

### Step 1: Save Your Video
Drop your screen-recorded demo video (`.mp4` or `.webm`) into this `videos/` folder:
Example: `videos/my-website.mp4`

### Step 2: Add Your Project Card in `index.html`
Open `index.html`, find `<div class="webdev-projects-grid" id="webdevProjectsGrid">`, and paste:

```html
<div class="project-video-card" data-category="clinic"
    data-video="videos/my-website.mp4"
    data-title="My Website Title // Subtitle"
    data-tag="FULL-STACK WEB APP"
    data-desc="Description of the website you built, problem solved, and key features..."
    data-url="my-website.com"
    data-live="https://my-website.com"
    data-repo="https://github.com/DiptanuDebnath007/my-repo"
    data-tech='["HTML5", "CSS3", "JavaScript", "React"]'>

    <!-- Video Preview Viewport -->
    <div class="card-video-viewport">
        <video class="card-mini-video" muted loop playsinline preload="metadata">
            <source src="videos/my-website.mp4" type="video/mp4">
        </video>
        <div class="card-viewport-overlay">
            <span class="card-time-pill">01:00</span>
            <span class="card-play-pill">▶ STREAM VIDEO</span>
        </div>
        <div class="card-scanline-fx"></div>
    </div>

    <!-- Project Details -->
    <div class="card-info-pane">
        <div class="card-header-meta">
            <span class="card-index-num">// WEBSITE 05</span>
            <span class="card-type-tag">FULL-STACK</span>
        </div>
        <h4 class="card-project-name">My Website Name</h4>
        <p class="card-project-summary">Brief summary of the website features and highlights.</p>
        <div class="card-tech-chips">
            <span>HTML5</span>
            <span>CSS3</span>
            <span>JavaScript</span>
        </div>

        <!-- Action Buttons Below: GitHub Source Code & Live Demo -->
        <div class="card-action-footer">
            <a href="https://github.com/DiptanuDebnath007/my-repo" target="_blank" rel="noopener"
                class="card-github-btn" title="Open Source Code of this Website on GitHub" onclick="event.stopPropagation();">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>GitHub Source</span>
            </a>
            <a href="https://my-website.com" target="_blank" rel="noopener"
                class="card-demo-btn" title="Visit Live Site" onclick="event.stopPropagation();">
                <span>Live Site ↗</span>
            </a>
        </div>
    </div>
</div>
```

---

---

# 🎬 Video Editing Projects & Showreel Guide

Drop your video edits and client showreels in this folder to showcase them in the **Motion & Video Lab** (`#video-editing`) section!

## 📁 Video Editing File Names
- **`videos/edit-reels.mp4`**: High-retention 9:16 vertical reels & TikToks
- **`videos/edit-commercial.mp4`**: 16:9 or anamorphic brand commercials
- **`videos/edit-drone.mp4`**: 4K 60/120fps FPV drone showreel
- **`videos/edit-vfx.mp4`**: 3D motion graphics & cyber kinetic titles
- Or any custom filename, e.g. `videos/my-client-edit.mp4`

## 🚀 How to Add a Video Editing Project Card
In `index.html`, inside `<div class="video-projects-grid" id="videoProjectsGrid">`, add:

```html
<div class="video-project-card" data-genre="reels"
    data-video="videos/edit-reels.mp4"
    data-title="PROJECT: VIRAL_REEL_01"
    data-headline="WATCH THIS EDIT"
    data-badge="HOOK: 0.8s RETENTION"
    data-sub="BEAT-SYNCED ◈ 4K CINEMA ◈ SOUND FX"
    data-retention="98.4%">
    <div class="card-video-viewport">
        <video class="card-mini-video" muted loop playsinline preload="metadata">
            <source src="videos/edit-reels.mp4" type="video/mp4">
        </video>
        <div class="card-viewport-overlay">
            <span class="card-time-pill">00:15</span>
            <span class="card-play-pill">▶ PREVIEW EDIT</span>
        </div>
        <div class="card-scanline-fx"></div>
    </div>
    <div class="card-info-pane">
        <div class="card-header-meta">
            <span class="card-index-num">// EDIT 01</span>
            <span class="card-type-tag genre-reels">VIRAL REEL</span>
        </div>
        <h4 class="card-project-name">High-Retention Viral Reel // Fitness & Lifestyle</h4>
        <p class="card-project-summary">Hypnotic 9:16 vertical cut engineered with micro-hooks...</p>
        <div class="card-metrics-strip">
            <span class="metric-chip">📈 98.4% Retention</span>
            <span class="metric-chip">⚡ 0.8s Hook Lock</span>
        </div>
        <div class="card-tech-chips">
            <span>DaVinci Resolve</span>
            <span>Beat-Sync</span>
            <span>Sound Design</span>
        </div>
        <div class="card-action-footer">
            <button type="button" class="load-nle-btn">
                ▶ Load into Studio Monitor
            </button>
        </div>
    </div>
</div>
```

## ⚡ Studio NLE Integration
- Clicking any video project card automatically streams its video file in the DaVinci NLE Studio monitor above (`#videoPreviewStage`), syncs the play/pause button, updates the project badge, telemetry HUD, and retention meter.
- If a video file is not yet placed in `videos/`, an animated kinetic graphics canvas is displayed as a fallback.
