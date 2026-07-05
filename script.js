document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const langToggleBtn = document.getElementById('lang-toggle');
    const htmlElement = document.documentElement;

    // =========================================
    // 1. إعدادات الوضع الليلي (Dark Mode)
    // =========================================
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    if (savedTheme === 'dark') {
        htmlElement.setAttribute('data-theme', 'dark');
        themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    }

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            htmlElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            htmlElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        }
    });

    // =========================================
    // 2. إعدادات تبديل اللغة (Language Toggle)
    // =========================================
    const savedLang = localStorage.getItem('lang') || 'ar';
    setLanguage(savedLang);

    langToggleBtn.addEventListener('click', () => {
        const currentLang = htmlElement.getAttribute('lang');
        const newLang = currentLang === 'ar' ? 'en' : 'ar';
        setLanguage(newLang);
    });

    function setLanguage(lang) {
        if (lang === 'en') {
            htmlElement.setAttribute('lang', 'en');
            htmlElement.setAttribute('dir', 'ltr');
            langToggleBtn.textContent = 'AR';
            localStorage.setItem('lang', 'en');
        } else {
            htmlElement.setAttribute('lang', 'ar');
            htmlElement.setAttribute('dir', 'rtl');
            langToggleBtn.textContent = 'EN';
            localStorage.setItem('lang', 'ar');
        }
    }

    // =========================================
    // 3. إعدادات أدوات التحكم بالفيديو
    // =========================================
    const video = document.getElementById('anthem-video');
    const unmuteBtn = document.getElementById('unmute-btn');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const seekBar = document.getElementById('seek-bar');

    // تم وضع هذا الشرط لكي لا يحدث خطأ عند فتح صفحة (rules.html) التي لا تحتوي على فيديو
    if (video && unmuteBtn && playPauseBtn && seekBar) {
        
        unmuteBtn.addEventListener('click', () => {
            if (video.muted) {
                video.muted = false;
                video.volume = 1.0; 
                
                if (video.paused) {
                    video.play();
                    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i> <span class="lang-ar">إيقاف</span><span class="lang-en">Pause</span>';
                }
                
                unmuteBtn.innerHTML = '<i class="fas fa-volume-up"></i> <span class="lang-ar">كتم</span><span class="lang-en">Mute</span>';
            } else {
                video.muted = true;
                unmuteBtn.innerHTML = '<i class="fas fa-volume-mute"></i> <span class="lang-ar">الصوت</span><span class="lang-en">Sound</span>';
            }
            
            // إعادة ضبط نصوص اللغات داخل الزر عند التبديل
            setLanguage(htmlElement.getAttribute('lang'));
        });

        playPauseBtn.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i> <span class="lang-ar">إيقاف</span><span class="lang-en">Pause</span>';
            } else {
                video.pause();
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i> <span class="lang-ar">تشغيل</span><span class="lang-en">Play</span>';
            }
            
            // إعادة ضبط نصوص اللغات داخل الزر عند التبديل
            setLanguage(htmlElement.getAttribute('lang'));
        });

        video.addEventListener('timeupdate', () => {
            if (video.duration) {
                const progress = (100 / video.duration) * video.currentTime;
                seekBar.value = progress;
            }
        });

        seekBar.addEventListener('input', () => {
            const time = video.duration * (seekBar.value / 100);
            video.currentTime = time;
        });
    }
});