/**
 * 会员订阅模块
 * 用于处理会员订阅弹窗相关的所有交互
 * 可在任何页面引入使用
 */
const SubscriptionModule = (function() {
    // 私有变量和方法
    let modal, unlockButton, premiumLink, cancelButton, confirmButton, planOptions;
    
    // 初始化DOM元素引用
    function initElements() {
        modal = document.getElementById('subscriptionModal');
        unlockButton = document.getElementById('unlockButton');
        premiumLink = document.getElementById('premiumLink');
        cancelButton = document.getElementById('cancelSubscription');
        confirmButton = document.getElementById('confirmSubscription');
        planOptions = document.querySelectorAll('.plan-option');
    }
    
    // 初始化事件监听
    function init() {
        // 确保DOM元素引用已初始化
        initElements();
        
        // 解锁无限次占卜按钮
        if (unlockButton) {
            unlockButton.addEventListener('click', openModal);
        }
        
        // 导航栏会员订阅按钮
        if (premiumLink) {
            premiumLink.addEventListener('click', function(e) {
                e.preventDefault();
                openModal();
            });
        } else {
            // 如果找不到premiumLink，尝试查找所有带有premium类的链接
            const premiumLinks = document.querySelectorAll('.premium');
            if (premiumLinks.length > 0) {
                premiumLinks.forEach(link => {
                    link.addEventListener('click', function(e) {
                        e.preventDefault();
                        openModal();
                    });
                });
            }
        }
        
        // 取消按钮
        if (cancelButton) {
            cancelButton.addEventListener('click', closeModal);
        }
        
        // 选择订阅计划
        if (planOptions && planOptions.length > 0) {
            planOptions.forEach(function(option) {
                option.addEventListener('click', selectPlan);
            });
        }
        
        // 确认订阅按钮
        if (confirmButton) {
            confirmButton.addEventListener('click', confirmSubscription);
        }
    }
    
    // 打开订阅弹窗
    function openModal() {
        if (!modal) {
            // 尝试重新初始化元素
            initElements();
            if (!modal) return;
        }
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // 防止背景滚动
    }
    
    // 关闭订阅弹窗
    function closeModal() {
        if (!modal) return;
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // 选择订阅计划
    function selectPlan() {
        // 移除其他选项的选中状态
        planOptions.forEach(plan => plan.classList.remove('selected'));
        // 添加当前选项的选中状态
        this.classList.add('selected');
    }
    
    // 确认订阅
    function confirmSubscription() {
        const selectedPlan = document.querySelector('.plan-option.selected');
        if (!selectedPlan) {
            return;
        }
        
        const planType = selectedPlan.getAttribute('data-plan');
        alert('您已选择 ' + planType + ' 会员计划。这里将连接到支付系统。');
        
        // 模拟订阅完成
        setTimeout(function() {
            closeModal();
            
            // 更新UI以显示已解锁状态
            const freeCounter = document.querySelector('.free-counter');
            if (freeCounter) {
                freeCounter.innerHTML = '已解锁无限次占卜 <i class="fas fa-infinity"></i>';
            }
            
            if (unlockButton) {
                unlockButton.style.display = 'none';
            }
            
            const resetTime = document.querySelector('.reset-time');
            if (resetTime) {
                resetTime.style.display = 'none';
            }
        }, 1000);
    }
    
    // 手动初始化，确保订阅模块能立即使用
    init();
    
    // DOM加载完成后重新初始化，确保所有元素都加载完成
    document.addEventListener('DOMContentLoaded', init);
    
    // 公开API
    return {
        init: init,
        openModal: openModal,
        closeModal: closeModal
    };
})();

// 导出模块供其他脚本使用
window.SubscriptionModule = SubscriptionModule; 