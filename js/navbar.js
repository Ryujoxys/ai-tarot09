/**
 * 导航栏模块 - Tarot09
 * 实现全局导航栏功能，包括夜间模式切换
 */

// 立即执行函数，创建模块封装
const NavbarModule = (function() {
    // 私有变量
    let initialized = false;
    
    // 初始化导航栏
    function init() {
        if (initialized) return;
        
        // 检查主题设置
        applyThemeSetting();
        
        // 设置事件监听
        setupEventListeners();
        
        initialized = true;
        console.log('导航栏模块初始化完成');
    }
    
    // 应用主题设置
    function applyThemeSetting() {
        // 检查本地存储中的主题设置
        if (localStorage.getItem('darkMode') === 'enabled') {
            document.body.classList.add('dark-mode');
        } else if (localStorage.getItem('darkMode') === null) {
            // 如果未设置，检查系统主题偏好
            checkSystemThemePreference();
        }
    }
    
    // 检查系统主题偏好
    function checkSystemThemePreference() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'enabled');
        }
        
        // 监听系统主题变更
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
            if (event.matches) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('darkMode', 'enabled');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('darkMode', 'disabled');
            }
        });
    }
    
    // 设置事件监听
    function setupEventListeners() {
        // 主题切换按钮
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', toggleTheme);
        }
        
        // 语言切换按钮
        const languageToggle = document.querySelector('.language-toggle');
        if (languageToggle) {
            languageToggle.addEventListener('click', toggleLanguage);
        }
        
        // 移动端菜单切换
        const menuToggle = document.querySelector('.menu-toggle');
        if (menuToggle) {
            menuToggle.addEventListener('click', toggleMobileMenu);
        }
        
        // 会员订阅链接
        const premiumLink = document.querySelector('.nav-link.premium');
        if (premiumLink) {
            premiumLink.id = 'premiumLink';
        }
    }
    
    // 切换主题
    function toggleTheme() {
        // 切换body的dark-mode类
        document.body.classList.toggle('dark-mode');
        
        // 保存设置到本地存储
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.setItem('darkMode', 'disabled');
        }
        
        // 更新图标显示
        updateThemeToggleIcon();
    }
    
    // 切换语言
    function toggleLanguage() {
        const currentPath = window.location.pathname;
        const currentFile = currentPath.split('/').pop();
        
        // 根据当前页面名称决定跳转到哪个语言版本
        if (currentFile === 'index.html' || currentFile === '') {
            window.location.href = 'index-eng.html';
        } else if (currentFile === 'index-eng.html') {
            window.location.href = 'index.html';
        } else if (currentFile === 'ai-taluopai.html') {
            window.location.href = 'ai-taluopai-eng.html';
        } else if (currentFile === 'ai-taluopai-eng.html') {
            window.location.href = 'ai-taluopai.html';
        } else if (currentFile === 'tarot-question.html') {
            window.location.href = 'tarot-question-eng.html';
        } else if (currentFile === 'tarot-question-eng.html') {
            window.location.href = 'tarot-question.html';
        } else if (currentFile === 'tarot-reading.html') {
            window.location.href = 'tarot-reading-eng.html';
        } else if (currentFile === 'tarot-reading-eng.html') {
            window.location.href = 'tarot-reading.html';
        } else if (currentFile === 'tarot-drawing.html') {
            window.location.href = 'tarot-drawing-eng.html';
        } else if (currentFile === 'tarot-drawing-eng.html') {
            window.location.href = 'tarot-drawing.html';
        } else if (currentFile === 'yes-no-question.html') {
            window.location.href = 'yes-no-question-eng.html';
        } else if (currentFile === 'yes-no-question-eng.html') {
            window.location.href = 'yes-no-question.html';
        } else if (currentFile === 'yes-no-tarot.html') {
            window.location.href = 'yes-no-tarot-eng.html';
        } else if (currentFile === 'yes-no-tarot-eng.html') {
            window.location.href = 'yes-no-tarot.html';
        } else if (currentFile === 'yes-no-result.html') {
            window.location.href = 'yes-no-result-eng.html';
        } else if (currentFile === 'yes-no-result-eng.html') {
            window.location.href = 'yes-no-result.html';
        } else {
            // 其他页面暂时不提供语言切换，或者根据需要扩展
            console.log('当前页面不支持语言切换');
            alert('此网页显示\nThis page does not support language switching yet.');
        }
    }
    
    // 更新主题切换图标
    function updateThemeToggleIcon() {
        const moonIcon = document.querySelector('.theme-toggle .fa-moon');
        const sunIcon = document.querySelector('.theme-toggle .fa-sun');
        
        if (document.body.classList.contains('dark-mode')) {
            if (moonIcon) moonIcon.style.display = 'none';
            if (sunIcon) sunIcon.style.display = 'inline-block';
        } else {
            if (moonIcon) moonIcon.style.display = 'inline-block';
            if (sunIcon) sunIcon.style.display = 'none';
        }
    }
    
    // 切换移动端菜单
    function toggleMobileMenu() {
        const navCapsules = document.querySelector('.nav-capsules');
        if (navCapsules) {
            navCapsules.classList.toggle('active');
        }
    }
    
    // 公开API
    return {
        init: init,
        toggleTheme: toggleTheme,
        toggleLanguage: toggleLanguage
    };
})();

// 页面加载完成后初始化导航栏
document.addEventListener('DOMContentLoaded', function() {
    NavbarModule.init();
}); 