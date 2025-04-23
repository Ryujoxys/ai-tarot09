/**
 * AI塔罗牌在线占卜平台
 * 主要JavaScript功能和接口预留
 */

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    console.log('AI塔罗牌应用已启动');
    
    // 初始化各个功能模块
    initThemeToggle();
    initLanguageToggle();
    initUserProfile();
    initTarotCard();
    initReadingButtons();
    initReaderSelection();
});

/**
 * 初始化黑暗模式切换
 * 功能：允许用户在亮色和暗色主题之间切换
 */
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // 检查本地存储或系统偏好
    const currentTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');
    
    // 应用主题
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="bi bi-sun"></i>';
    } else {
        themeToggle.innerHTML = '<i class="bi bi-moon"></i>';
    }
    
    // 切换主题事件
    themeToggle.addEventListener('click', function() {
        if (document.body.classList.contains('dark-mode')) {
            // 切换到亮色模式
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="bi bi-moon"></i>';
        } else {
            // 切换到暗色模式
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="bi bi-sun"></i>';
        }
    });
}

/**
 * 初始化语言切换功能
 * 预留接口：未来可支持多语言切换
 */
function initLanguageToggle() {
    const languageToggle = document.getElementById('languageToggle');
    
    languageToggle.addEventListener('click', function() {
        // 预留：语言切换API调用
        console.log('语言切换功能预留');
        
        // 示例：未来可以通过API加载不同语言包
        // switchLanguage('en'); 或 switchLanguage('zh-CN');
    });
}

/**
 * 初始化用户头像和个人资料功能
 * 预留接口：用户登录、注册、个人设置等
 */
function initUserProfile() {
    const userProfile = document.getElementById('userProfile');
    
    userProfile.addEventListener('click', function() {
        // 预留：用户信息API调用
        console.log('用户个人资料功能预留');
        
        // 未来可实现的功能：
        // 1. 弹出登录/注册对话框
        // 2. 已登录用户显示个人菜单
        // 3. 个人设置和历史记录查看
    });
}

/**
 * 初始化塔罗牌卡片动画效果
 */
function initTarotCard() {
    const tarotCard = document.querySelector('.tarot-card');
    
    if (tarotCard) {
        // 添加鼠标悬停时的微妙浮动动画
        tarotCard.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotate(2deg)';
        });
        
        tarotCard.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0)';
        });
        
        // 添加点击效果
        tarotCard.addEventListener('click', function() {
            // 预留：点击卡片的功能，例如翻转或展示卡牌详情
            pulseAnimation(this);
        });
    }
}

/**
 * 初始化开始占卜按钮事件
 * 预留接口：开始占卜流程
 */
function initReadingButtons() {
    const startReadingBtn = document.getElementById('startReading');
    const startAiReadingBtn = document.getElementById('startAiReading');
    
    if (startReadingBtn) {
        startReadingBtn.addEventListener('click', function(e) {
            // 链接已经直接在HTML中设置，不需要在这里处理跳转
            console.log('开始普通塔罗占卜');
            
            // 添加按钮点击动画
            pulseAnimation(this);
        });
    }
    
    if (startAiReadingBtn) {
        startAiReadingBtn.addEventListener('click', function(e) {
            // 链接已经直接在HTML中设置，不需要在这里处理跳转
            console.log('开始AI塔罗占卜');
            
            // 添加按钮点击动画
            pulseAnimation(this);
        });
    }
}

/**
 * 初始化塔罗师选择功能
 * 预留接口：选择不同类型的塔罗师
 */
function initReaderSelection() {
    const readerAvatars = document.querySelectorAll('.reader-avatar');
    
    readerAvatars.forEach((avatar, index) => {
        avatar.addEventListener('click', function() {
            // 移除其他头像的选中状态
            readerAvatars.forEach(item => {
                item.classList.remove('selected');
                item.style.borderColor = 'transparent';
            });
            
            // 添加当前头像的选中状态
            this.classList.add('selected');
            this.style.borderColor = 'white';
            this.style.boxShadow = '0 0 15px rgba(255, 255, 255, 0.8)';
            
            // 预留：选择塔罗师的API调用
            console.log(`已选择塔罗师 ${index + 1}`);
            selectReader(index);
        });
    });
}

// =========================
// 预留API接口函数
// =========================

/**
 * 选择塔罗师
 * @param {number} readerIndex - 塔罗师索引
 */
function selectReader(readerIndex) {
    // 存储用户选择的塔罗师
    localStorage.setItem('selectedReader', readerIndex);
    
    // 未来可实现的功能：
    // 1. 从后端获取该塔罗师的详细信息
    // 2. 展示塔罗师特点和专长
    // 3. 更新UI显示选中的塔罗师
}

/**
 * 脉冲动画效果
 * @param {HTMLElement} element - 需要添加动画的元素
 */
function pulseAnimation(element) {
    element.classList.add('pulse');
    
    // 动画结束后移除类
    setTimeout(() => {
        element.classList.remove('pulse');
    }, 500);
}

/**
 * 预留：用户登录功能
 * @param {string} username - 用户名
 * @param {string} password - 密码
 * @returns {Promise} - 返回登录结果Promise
 */
function userLogin(username, password) {
    return new Promise((resolve, reject) => {
        // 实际项目中，这里会调用后端API
        console.log(`尝试登录: ${username}`);
        
        // 模拟API调用
        setTimeout(() => {
            if (username && password) {
                resolve({ success: true, username: username });
            } else {
                reject(new Error('用户名或密码不能为空'));
            }
        }, 1000);
    });
}

/**
 * 预留：用户注册功能
 * @param {Object} userData - 用户注册数据
 * @returns {Promise} - 返回注册结果Promise
 */
function userRegister(userData) {
    return new Promise((resolve, reject) => {
        // 实际项目中，这里会调用后端API
        console.log('尝试注册新用户', userData);
        
        // 模拟API调用
        setTimeout(() => {
            if (userData && userData.username && userData.password) {
                resolve({ success: true, username: userData.username });
            } else {
                reject(new Error('注册信息不完整'));
            }
        }, 1500);
    });
}

/**
 * 预留：获取占卜历史记录
 * @returns {Promise} - 返回历史记录Promise
 */
function getReadingHistory() {
    return new Promise((resolve) => {
        // 实际项目中，这里会调用后端API
        console.log('获取占卜历史记录');
        
        // 模拟API调用
        setTimeout(() => {
            // 模拟的历史记录数据
            const mockHistory = [
                { id: 1, type: 'love', date: '2025-01-15', result: '积极' },
                { id: 2, type: 'career', date: '2025-01-10', result: '中性' }
            ];
            resolve(mockHistory);
        }, 1000);
    });
} 