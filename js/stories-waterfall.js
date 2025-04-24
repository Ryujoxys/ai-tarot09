document.addEventListener('DOMContentLoaded', function() {
    // 卡牌名称映射到英文名称
    const cardNameMapping = {
        // 大阿卡纳牌映射
        "愚人": "TheFool",
        "魔法师": "TheMagician",
        "女祭司": "TheHighPriestess",
        "皇后": "TheEmpress",
        "皇帝": "TheEmperor",
        "教皇": "TheHierophant",
        "恋人": "TheLovers",
        "战车": "TheChariot",
        "力量": "Strength",
        "隐士": "TheHermit",
        "命运之轮": "WheelOfFortune",
        "正义": "Justice",
        "倒吊人": "TheHangedMan",
        "死神": "Death",
        "节制": "Temperance",
        "恶魔": "TheDevil",
        "高塔": "TheTower",
        "星星": "TheStar",
        "月亮": "TheMoon",
        "太阳": "TheSun",
        "审判": "Judgement",
        "世界": "TheWorld",
        
        // 小阿卡纳牌映射 - 权杖(Wands)
        "权杖Ace": "AceOfWands",
        "权杖2": "TwoOfWands",
        "权杖3": "ThreeOfWands",
        "权杖4": "FourOfWands",
        "权杖5": "FiveOfWands",
        "权杖6": "SixOfWands",
        "权杖7": "SevenOfWands",
        "权杖8": "EightOfWands",
        "权杖9": "NineOfWands",
        "权杖10": "TenOfWands",
        "权杖侍卫": "PageOfWands",
        "权杖骑士": "KnightOfWands",
        "权杖王后": "QueenOfWands",
        "权杖国王": "KingOfWands",
        
        // 小阿卡纳牌映射 - 圣杯(Cups)
        "圣杯Ace": "AceOfCups",
        "圣杯2": "TwoOfCups",
        "圣杯3": "ThreeOfCups",
        "圣杯4": "FourOfCups",
        "圣杯5": "FiveOfCups",
        "圣杯6": "SixOfCups",
        "圣杯7": "SevenOfCups",
        "圣杯8": "EightOfCups",
        "圣杯9": "NineOfCups",
        "圣杯10": "TenOfCups",
        "圣杯侍卫": "PageOfCups",
        "圣杯骑士": "KnightOfCups",
        "圣杯王后": "QueenOfCups",
        "圣杯国王": "KingOfCups",
        
        // 小阿卡纳牌映射 - 宝剑(Swords)
        "宝剑Ace": "AceOfSwords",
        "宝剑2": "TwoOfSwords",
        "宝剑3": "ThreeOfSwords",
        "宝剑4": "FourOfSwords",
        "宝剑5": "FiveOfSwords",
        "宝剑6": "SixOfSwords",
        "宝剑7": "SevenOfSwords",
        "宝剑8": "EightOfSwords",
        "宝剑9": "NineOfSwords",
        "宝剑10": "TenOfSwords",
        "宝剑侍卫": "PageOfSwords",
        "宝剑骑士": "KnightOfSwords",
        "宝剑王后": "QueenOfSwords",
        "宝剑国王": "KingOfSwords",
        
        // 小阿卡纳牌映射 - 星币(Pentacles)
        "星币Ace": "AceOfPentacles",
        "星币2": "TwoOfPentacles",
        "星币3": "ThreeOfPentacles",
        "星币4": "FourOfPentacles",
        "星币5": "FiveOfPentacles",
        "星币6": "SixOfPentacles",
        "星币7": "SevenOfPentacles",
        "星币8": "EightOfPentacles",
        "星币9": "NineOfPentacles",
        "星币10": "TenOfPentacles",
        "星币侍卫": "PageOfPentacles",
        "星币骑士": "KnightOfPentacles",
        "星币王后": "QueenOfPentacles",
        "星币国王": "KingOfPentacles"
    };
    
    // 英文名称映射到CDN链接
    const cardCdnMapping = {
        "TheFool": "https://qiniustatic.wodidashi.com/TheFool.jpg",
        "TheMagician": "https://qiniustatic.wodidashi.com/TheMagician.jpg",
        "TheHighPriestess": "https://qiniustatic.wodidashi.com/TheHighPriestess.jpg",
        "TheEmpress": "https://qiniustatic.wodidashi.com/TheEmpress.jpg",
        "TheEmperor": "https://qiniustatic.wodidashi.com/TheEmperor.jpg",
        "TheHierophant": "https://qiniustatic.wodidashi.com/TheHierophant.jpg",
        "TheLovers": "https://qiniustatic.wodidashi.com/TheLovers.jpg",
        "TheChariot": "https://qiniustatic.wodidashi.com/TheChariot.jpg",
        "Strength": "https://qiniustatic.wodidashi.com/Strength.jpg",
        "TheHermit": "https://qiniustatic.wodidashi.com/TheHermit.jpg",
        "WheelOfFortune": "https://qiniustatic.wodidashi.com/WheelOfFortune.jpg",
        "Justice": "https://qiniustatic.wodidashi.com/Justice.jpg",
        "TheHangedMan": "https://qiniustatic.wodidashi.com/TheHangedMan.jpg",
        "Death": "https://qiniustatic.wodidashi.com/Death.jpg",
        "Temperance": "https://qiniustatic.wodidashi.com/Temperance.jpg",
        "TheDevil": "https://qiniustatic.wodidashi.com/TheDevil.jpg",
        "TheTower": "https://qiniustatic.wodidashi.com/TheTower.jpg",
        "TheStar": "https://qiniustatic.wodidashi.com/TheStar.jpg",
        "TheMoon": "https://qiniustatic.wodidashi.com/TheMoon.jpg",
        "TheSun": "https://qiniustatic.wodidashi.com/TheSun.jpg",
        "Judgement": "https://qiniustatic.wodidashi.com/Judgement.jpg",
        "TheWorld": "https://qiniustatic.wodidashi.com/TheWorld.jpg",
        
        // 小阿卡纳牌 - 权杖(Wands)
        "AceOfWands": "https://qiniustatic.wodidashi.com/AceOfWands.jpg",
        "TwoOfWands": "https://qiniustatic.wodidashi.com/TwoOfWands.jpg",
        "ThreeOfWands": "https://qiniustatic.wodidashi.com/ThreeOfWands.jpg",
        "FourOfWands": "https://qiniustatic.wodidashi.com/FourOfWands.jpg",
        "FiveOfWands": "https://qiniustatic.wodidashi.com/FiveOfWands.jpg",
        "SixOfWands": "https://qiniustatic.wodidashi.com/SixOfWands.jpg",
        "SevenOfWands": "https://qiniustatic.wodidashi.com/SevenOfWands.jpg",
        "EightOfWands": "https://qiniustatic.wodidashi.com/EightOfWands.jpg",
        "NineOfWands": "https://qiniustatic.wodidashi.com/NineOfWands.jpg",
        "TenOfWands": "https://qiniustatic.wodidashi.com/TenOfWands.jpg",
        "PageOfWands": "https://qiniustatic.wodidashi.com/PageOfWands.jpg",
        "KnightOfWands": "https://qiniustatic.wodidashi.com/KnightOfWands.jpg",
        "QueenOfWands": "https://qiniustatic.wodidashi.com/QueenOfWands.jpg",
        "KingOfWands": "https://qiniustatic.wodidashi.com/KingOfWands.jpg",
        
        // 小阿卡纳牌 - 圣杯(Cups)
        "AceOfCups": "https://qiniustatic.wodidashi.com/AceOfCups.jpg",
        "TwoOfCups": "https://qiniustatic.wodidashi.com/TwoOfCups.jpg",
        "ThreeOfCups": "https://qiniustatic.wodidashi.com/ThreeOfCups.jpg",
        "FourOfCups": "https://qiniustatic.wodidashi.com/FourOfCups.jpg",
        "FiveOfCups": "https://qiniustatic.wodidashi.com/FiveOfCups.jpg",
        "SixOfCups": "https://qiniustatic.wodidashi.com/SixOfCups.jpg",
        "SevenOfCups": "https://qiniustatic.wodidashi.com/SevenOfCups.jpg",
        "EightOfCups": "https://qiniustatic.wodidashi.com/EightOfCups.jpg",
        "NineOfCups": "https://qiniustatic.wodidashi.com/NineOfCups.jpg",
        "TenOfCups": "https://qiniustatic.wodidashi.com/TenOfCups.jpg",
        "PageOfCups": "https://qiniustatic.wodidashi.com/PageOfCups.jpg",
        "KnightOfCups": "https://qiniustatic.wodidashi.com/KnightOfCups.jpg",
        "QueenOfCups": "https://qiniustatic.wodidashi.com/QueenOfCups.jpg",
        "KingOfCups": "https://qiniustatic.wodidashi.com/KingOfCups.jpg",
        
        // 小阿卡纳牌 - 宝剑(Swords)
        "AceOfSwords": "https://qiniustatic.wodidashi.com/AceOfSwords.jpg",
        "TwoOfSwords": "https://qiniustatic.wodidashi.com/TwoOfSwords.jpg",
        "ThreeOfSwords": "https://qiniustatic.wodidashi.com/ThreeOfSwords.jpg",
        "FourOfSwords": "https://qiniustatic.wodidashi.com/FourOfSwords.jpg",
        "FiveOfSwords": "https://qiniustatic.wodidashi.com/FiveOfSwords.jpg",
        "SixOfSwords": "https://qiniustatic.wodidashi.com/SixOfSwords.jpg",
        "SevenOfSwords": "https://qiniustatic.wodidashi.com/SevenOfSwords.jpg",
        "EightOfSwords": "https://qiniustatic.wodidashi.com/EightOfSwords.jpg",
        "NineOfSwords": "https://qiniustatic.wodidashi.com/NineOfSwords.jpg",
        "TenOfSwords": "https://qiniustatic.wodidashi.com/TenOfSwords.jpg",
        "PageOfSwords": "https://qiniustatic.wodidashi.com/PageOfSwords.jpg",
        "KnightOfSwords": "https://qiniustatic.wodidashi.com/KnightOfSwords.jpg",
        "QueenOfSwords": "https://qiniustatic.wodidashi.com/QueenOfSwords.jpg",
        "KingOfSwords": "https://qiniustatic.wodidashi.com/KingOfSwords.jpg",
        
        // 小阿卡纳牌 - 星币(Pentacles)
        "AceOfPentacles": "https://qiniustatic.wodidashi.com/AceOfPentacles.jpg",
        "TwoOfPentacles": "https://qiniustatic.wodidashi.com/TwoOfPentacles.jpg",
        "ThreeOfPentacles": "https://qiniustatic.wodidashi.com/ThreeOfPentacles.jpg",
        "FourOfPentacles": "https://qiniustatic.wodidashi.com/FourOfPentacles.jpg",
        "FiveOfPentacles": "https://qiniustatic.wodidashi.com/FiveOfPentacles.jpg",
        "SixOfPentacles": "https://qiniustatic.wodidashi.com/SixOfPentacles.jpg",
        "SevenOfPentacles": "https://qiniustatic.wodidashi.com/SevenOfPentacles.jpg",
        "EightOfPentacles": "https://qiniustatic.wodidashi.com/EightOfPentacles.jpg",
        "NineOfPentacles": "https://qiniustatic.wodidashi.com/NineOfPentacles.jpg",
        "TenOfPentacles": "https://qiniustatic.wodidashi.com/TenOfPentacles.jpg",
        "PageOfPentacles": "https://qiniustatic.wodidashi.com/PageOfPentacles.jpg",
        "KnightOfPentacles": "https://qiniustatic.wodidashi.com/KnightOfPentacles.jpg",
        "QueenOfPentacles": "https://qiniustatic.wodidashi.com/QueenOfPentacles.jpg",
        "KingOfPentacles": "https://qiniustatic.wodidashi.com/KingOfPentacles.jpg",
        
        // 牌背
        "CardBack": "https://qiniustatic.wodidashi.com/CardBack.jpg"
    };
    
    // 保留旧的本地映射用于兼容性
    const cardImageMapping = {
        // 大阿卡纳牌映射
        "愚人": "00愚者.jpg",
        "魔法师": "01魔术师.jpg",
        "女祭司": "02女祭祀.jpg",
        "皇后": "03皇后.jpg",
        "皇帝": "04皇帝.jpg",
        "教皇": "05教皇.jpg",
        "恋人": "06恋人.jpg",
        "战车": "07战车.jpg",
        "力量": "08力量.jpg",
        "隐士": "09隐士.jpg",
        "命运之轮": "10命运之轮.jpg",
        "正义": "11正义.jpg",
        "倒吊人": "12倒吊人.jpg",
        "死神": "13死神.jpg",
        "节制": "14节制.jpg",
        "恶魔": "15恶魔.jpg",
        "高塔": "16高塔.jpg",
        "星星": "17星星.jpg",
        "月亮": "18月亮.jpg",
        "太阳": "19太阳.jpg",
        "审判": "20审判.jpg",
        "世界": "21世界.jpg",
        
        // 小阿卡纳牌映射 - 权杖
        "权杖Ace": "权杖ACE.jpg",
        "权杖2": "权杖2.jpg",
        "权杖3": "权杖3.jpg",
        "权杖4": "权杖4.jpg",
        "权杖5": "权杖5.jpg",
        "权杖6": "权杖6.jpg",
        "权杖7": "权杖7.jpg",
        "权杖8": "权杖8.jpg",
        "权杖9": "权杖9.jpg",
        "权杖10": "权杖10.jpg",
        "权杖侍卫": "权杖侍卫.jpg",
        "权杖骑士": "权杖骑士.jpg",
        "权杖王后": "权杖王后.jpg",
        "权杖国王": "权杖国王.jpg",
        
        // 小阿卡纳牌映射 - 圣杯
        "圣杯Ace": "圣杯ACE.jpg",
        "圣杯2": "圣杯2.jpg",
        "圣杯3": "圣杯3.jpg",
        "圣杯4": "圣杯4.jpg",
        "圣杯5": "圣杯5.jpg",
        "圣杯6": "圣杯6.jpg",
        "圣杯7": "圣杯7.jpg",
        "圣杯8": "圣杯8.jpg",
        "圣杯9": "圣杯9.jpg",
        "圣杯10": "圣杯10.jpg",
        "圣杯侍卫": "圣杯侍卫.jpg",
        "圣杯骑士": "圣杯骑士.jpg",
        "圣杯王后": "圣杯王后.jpg",
        "圣杯国王": "圣杯国王.jpg",
        
        // 小阿卡纳牌映射 - 宝剑
        "宝剑Ace": "宝剑ACE.jpg",
        "宝剑2": "宝剑2.jpg",
        "宝剑3": "宝剑3.jpg",
        "宝剑4": "宝剑4.jpg",
        "宝剑5": "宝剑5.jpg",
        "宝剑6": "宝剑6.jpg",
        "宝剑7": "宝剑7.jpg",
        "宝剑8": "宝剑8.jpg",
        "宝剑9": "宝剑9.jpg",
        "宝剑10": "宝剑10.jpg",
        "宝剑侍卫": "宝剑侍卫.jpg",
        "宝剑骑士": "宝剑骑士.jpg",
        "宝剑王后": "宝剑王后.jpg",
        "宝剑国王": "宝剑国王.jpg",
        
        // 小阿卡纳牌映射 - 星币
        "星币Ace": "星币ACE.jpg",
        "星币2": "星币2.jpg",
        "星币3": "星币3.jpg",
        "星币4": "星币4.jpg",
        "星币5": "星币5.jpg",
        "星币6": "星币6.jpg",
        "星币7": "星币7.jpg",
        "星币8": "星币8.jpg",
        "星币9": "星币9.jpg",
        "星币10": "星币10.jpg",
        "星币侍卫": "星币侍卫.jpg",
        "星币骑士": "星币骑士.jpg",
        "星币王后": "星币王后.jpg",
        "星币国王": "星币国王.jpg"
    };
    
    // 获取卡牌图片文件路径 - 更新为使用CDN链接
    function getCardImagePath(cardName) {
        // 优先使用CDN链接
        if (cardNameMapping[cardName] && cardCdnMapping[cardNameMapping[cardName]]) {
            return cardCdnMapping[cardNameMapping[cardName]];
        } else if (cardImageMapping[cardName]) {
            // 兼容旧版本，使用本地路径作为备选
            console.warn(`未找到卡牌 "${cardName}" 对应的CDN链接，使用本地图片`);
            return `images/${cardImageMapping[cardName]}`;
        } else {
            console.warn(`未找到卡牌 "${cardName}" 对应的图片`);
            return null;
        }
    }
    
    // 获取相关元素
    const storiesWaterfall = document.getElementById('storiesWaterfall');
    const storySearch = document.getElementById('storySearch');
    const filterTags = document.querySelectorAll('.filter-tag');
    const loadMoreButton = document.getElementById('loadMoreStories');
    const shareStoryButton = document.getElementById('shareYourStory');
    
    // 当前页码和故事类别
    let currentPage = 1;
    let currentCategory = 'all';
    let isLoading = false;
    
    // 更多故事数据 - 实际应用中可从服务器获取
    const moreStoryData = {
        "9": {
            title: "灵修之路的起点",
            category: "other",
            cards: [
                { image: "images/20审判.jpg", name: "审判" },
                { image: "images/16高塔.jpg", name: "高塔" },
                { image: "images/21世界.jpg", name: "世界" }
            ],
            conversation: {
                userQuestion: "我最近对灵修和冥想很感兴趣，想知道我是否适合走这条路？",
                aiAnswer: "审判牌象征觉醒和重生，表明你正处于精神上的觉醒阶段，这是开始灵修之旅的理想时机。高塔牌代表突破性的改变和旧有思维模式的崩塌，这可能会带来初期的不适应，但也是灵性成长的必要过程。世界牌则是塔罗牌中的最后一张大阿卡纳牌，象征着完成和圆满，预示着你的灵修之旅可能会带来重要的人生完整感。",
                userFeedback: "我确实感觉到一种内在的召唤，但也担心这只是一时的热情，不知道如何持之以恒？",
                aiSecondAnswer: "高塔牌特别强调了你可能会遇到的挑战 - 当旧有的认知体系被打破时，会有一段不适应期。建议你可以从简单的日常冥想开始，设定合理的目标，比如每天10分钟，逐渐培养习惯。审判牌也提示你可能需要找一个精神导师或团体支持你的修行。世界牌提醒你保持开放的心态，不要急于求成，灵修是一个循环上升的过程，而非线性发展的。"
            }
        },
        "10": {
            title: "家庭关系的修复",
            category: "family",
            cards: [
                { image: "images/圣杯4.jpg", name: "圣杯四" },
                { image: "images/13死神.jpg", name: "死神" },
                { image: "images/16高塔.jpg", name: "高塔" }
            ],
            conversation: {
                userQuestion: "我与父母的关系一直很紧张，特别是我父亲，我们该如何修复关系？",
                aiAnswer: "圣杯四表示情感上的停滞和自我保护，可能暗示你已经筑起了心理防线来保护自己。死神牌代表结束和转变，表明修复关系需要告别过去的模式。塔牌则象征着突然的改变和旧有结构的崩塌，这可能是一个艰难但必要的过程，以创建新的家庭关系基础。",
                userFeedback: "我确实很难放下过去的伤害，但又渴望一个和谐的家庭关系，该从何开始？",
                aiSecondAnswer: "塔牌的出现特别有意义，它暗示修复关系可能需要一个'打破'目前沟通模式的契机。这可能始于你勇敢地表达自己的感受，而不是指责。圣杯四建议你可以先给自己一些空间，梳理情绪，做好准备再进行对话。死神牌鼓励你尝试新的方式与父母互动，比如找到共同的兴趣或活动，重新建立联系。修复关系是一个过程，需要耐心和持续的努力。"
            }
        }
    };
    
    // 初始筛选标签点击事件
    filterTags.forEach(tag => {
        tag.addEventListener('click', function() {
            // 移除其他标签的active类
            filterTags.forEach(t => t.classList.remove('active'));
            // 添加当前标签的active类
            this.classList.add('active');
            
            // 获取筛选类别
            currentCategory = this.getAttribute('data-filter');
            
            // 重置页码
            currentPage = 1;
            
            // 筛选故事
            filterStories();
        });
    });
    
    // 搜索功能
    if (storySearch) {
        storySearch.addEventListener('input', debounce(function() {
            filterStories();
        }, 300));
    }
    
    // 加载更多按钮点击事件
    if (loadMoreButton) {
        loadMoreButton.addEventListener('click', function() {
            if (isLoading) return;
            
            isLoading = true;
            this.innerHTML = '加载中... <i class="fas fa-spinner fa-spin"></i>';
            
            // 模拟加载延迟
            setTimeout(() => {
                loadMoreStories();
                this.innerHTML = '加载更多 <i class="fas fa-spinner"></i>';
                isLoading = false;
            }, 1000);
        });
    }
    
    // 分享故事按钮点击事件
    if (shareStoryButton) {
        shareStoryButton.addEventListener('click', function() {
            // 实际应用中可以弹出分享故事的表单
            alert('分享故事功能即将上线，敬请期待！');
        });
    }
    
    // 搜索防抖函数
    function debounce(func, wait) {
        let timeout;
        return function() {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, arguments), wait);
        };
    }
    
    // 根据当前筛选条件和搜索关键词筛选故事
    function filterStories() {
        const storyCards = Array.from(document.querySelectorAll('.story-card'));
        const searchInput = document.getElementById('searchStories');
        const searchText = searchInput.value.toLowerCase().trim();
        
        storyCards.forEach(story => {
            const category = story.getAttribute('data-category');
            const title = story.querySelector('.story-title').textContent.toLowerCase();
            const preview = story.querySelector('.story-preview').textContent.toLowerCase();
            
            // 检查是否符合类别和搜索条件
            let showStory = true;
            
            // 检查类别
            if (currentCategory !== 'all' && category !== currentCategory) {
                showStory = false;
            }
            
            // 检查搜索文本
            if (searchText && !title.includes(searchText) && !preview.includes(searchText)) {
                showStory = false;
            }
            
            // 显示或隐藏故事
            story.style.display = showStory ? 'block' : 'none';
        });
    }
    
    // 添加更多的示例故事数据
    function addMoreExampleStories() {
        // 确保卡牌映射正确
        const newStoriesData = {
            "11": {
                title: "财务规划的优化",
                category: "career",
                cards: [
                    { name: "星币4" },
                    { name: "星币王后" },
                    { name: "节制" }
                ],
                conversation: {
                    userQuestion: "我目前的储蓄不多，想知道如何优化我的财务规划，实现财务自由？",
                    aiAnswer: "星币4代表稳固的基础和保守的财务态度，表明你已经开始关注积累的重要性。星币王后象征着实际和务实的理财能力，暗示你需要发展更成熟的财务管理技能。节制牌则提醒平衡和适度的重要性，建议在消费与储蓄之间找到平衡点。",
                    userFeedback: "我确实在消费与储蓄之间常常难以把握，经常有冲动消费的行为，该如何建立更好的财务习惯？",
                    aiSecondAnswer: "星币王后特别强调了务实管理资源的能力，建议你可以开始记录日常支出，建立预算系统。节制牌提示你需要发展自律的习惯，尝试80/20法则 - 80%收入用于必要开支和储蓄，20%可用于自由支配。星币4则建议你建立紧急备用金，理想情况下应该是3-6个月的基本生活费用，这会给你财务安全感，减少冲动消费的可能性。循序渐进的改变比激进的节约更容易坚持。"
                }
            },
            "12": {
                title: "事业发展方向",
                category: "career",
                cards: [
                    { name: "权杖3" },
                    { name: "战车" },
                    { name: "皇帝" }
                ],
                conversation: {
                    userQuestion: "我在现有公司工作了五年，是继续在这里发展还是应该寻求新的机会？",
                    aiAnswer: "权杖3象征新的成长和机会，表明你可能已经准备好迎接新的挑战。战车牌代表决心和胜利，暗示你有能力掌控自己的方向并取得成功。皇帝牌象征着权威和稳定的结构，可能暗示无论你选择什么道路，都需要考虑长期稳定和权威地位的建立。",
                    userFeedback: "我确实想要更多的挑战和成长，但不确定新环境是否会给我带来更好的发展？",
                    aiSecondAnswer: "战车牌的出现特别有意义，它代表你有能力驾驭变化并在新环境中取得成功。权杖3暗示新环境很可能会激发你的创造力和成长动力。然而，皇帝牌提醒你不要仅仅为了变化而变化，而是要评估任何新机会是否真的能够提供更好的长期职业发展和权威建立。考虑列出当前工作的优缺点，以及潜在新机会的优势和风险，进行理性分析。也可以尝试在现有公司内部寻求新的角色或项目，这可能是一个折中方案。"
                }
            }
        };

        // 处理新添加的故事数据，添加图片路径
        Object.keys(newStoriesData).forEach(id => {
            const storyData = newStoriesData[id];
            
            // 为每张卡牌添加图片路径
            storyData.cards.forEach(card => {
                card.image = getCardImagePath(card.name);
            });
            
            // 添加到全局数据对象
            moreStoryData[id] = storyData;
        });
        
        return Object.keys(newStoriesData);
    }

    // 加载更多故事
    function loadMoreStories() {
        // 这里可以根据currentPage和currentCategory加载更多内容
        // 实际应用中应该从服务器获取数据
        
        // 模拟加载新故事
        if (currentPage === 1) {
            // 添加更多故事卡片
            const storyIds = Object.keys(moreStoryData);
            
            // 添加额外的示例故事
            const newStoryIds = addMoreExampleStories();
            
            // 合并所有故事ID
            const allStoryIds = [...storyIds, ...newStoryIds];
            
            allStoryIds.forEach(id => {
                const storyInfo = moreStoryData[id];
                const newStory = createStoryCard(id, storyInfo);
                storiesWaterfall.appendChild(newStory);
                
                // 添加点击事件
                setupStoryCardEvents(newStory);
            });
            
            currentPage++;
            
            // 应用当前筛选
            filterStories();
        } else {
            // 如果没有更多故事，隐藏加载更多按钮
            loadMoreButton.style.display = 'none';
            
            // 显示"没有更多故事"的提示
            const noMoreStories = document.createElement('p');
            noMoreStories.className = 'no-more-stories';
            noMoreStories.textContent = '没有更多故事了';
            noMoreStories.style.textAlign = 'center';
            noMoreStories.style.color = '#888';
            noMoreStories.style.margin = '1rem 0';
            
            loadMoreButton.parentNode.appendChild(noMoreStories);
        }
    }
    
    // 创建故事卡片
    function createStoryCard(id, storyInfo) {
        const storyCard = document.createElement('div');
        storyCard.className = 'story-card';
        storyCard.setAttribute('data-story-id', id);
        storyCard.setAttribute('data-category', storyInfo.category);
        
        // 确保卡牌图片路径存在
        const card1Image = storyInfo.cards[0].image || getCardImagePath(storyInfo.cards[0].name);
        const card2Image = storyInfo.cards[1].image || getCardImagePath(storyInfo.cards[1].name);
        const card3Image = storyInfo.cards[2].image || getCardImagePath(storyInfo.cards[2].name);
        
        // 设置卡片内容
        storyCard.innerHTML = `
            <h3 class="story-title">${storyInfo.title}</h3>
            <div class="story-tarot-cards">
                <div class="story-tarot-card">
                    <img src="${card1Image}" alt="${storyInfo.cards[0].name}">
                </div>
                <div class="story-tarot-card">
                    <img src="${card2Image}" alt="${storyInfo.cards[1].name}">
                </div>
                <div class="story-tarot-card">
                    <img src="${card3Image}" alt="${storyInfo.cards[2].name}">
                </div>
            </div>
            <p class="story-preview">${storyInfo.conversation.userQuestion.substring(0, 50)}...</p>
            <button class="story-read-more">查看完整故事</button>
        `;
        
        return storyCard;
    }
    
    // 设置故事卡片点击事件
    function setupStoryCardEvents(storyCard) {
        storyCard.addEventListener('click', function() {
            const storyId = this.getAttribute('data-story-id');
            openStoryModal(storyId);
        });
        
        const readMoreBtn = storyCard.querySelector('.story-read-more');
        if (readMoreBtn) {
            readMoreBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const storyId = storyCard.getAttribute('data-story-id');
                openStoryModal(storyId);
            });
        }
    }
    
    // 打开故事详情模态框（与story-sharing.js中的函数相似）
    function openStoryModal(storyId) {
        // 合并原有和新增故事数据
        let allStoryData = {};
        
        // 尝试获取原有的故事数据（从全局变量或其他来源）
        try {
            if (typeof storyData !== 'undefined') {
                allStoryData = {...storyData};
            }
        } catch (e) {
            console.log('使用新的故事数据');
        }
        
        // 添加新的故事数据
        allStoryData = {...allStoryData, ...moreStoryData};
        
        const story = allStoryData[storyId];
        if (!story) return;
        
        // 获取模态框元素
        const storyDetailModal = document.getElementById('storyDetailModal');
        const storyModalTitle = document.getElementById('storyModalTitle');
        const storyCard1 = document.getElementById('storyCard1');
        const storyCard2 = document.getElementById('storyCard2');
        const storyCard3 = document.getElementById('storyCard3');
        const userQuestion = document.getElementById('userQuestion');
        const aiAnswer = document.getElementById('aiAnswer');
        const userFeedback = document.getElementById('userFeedback');
        const aiSecondAnswer = document.getElementById('aiSecondAnswer');
        
        // 设置模态框内容
        storyModalTitle.textContent = story.title;
        
        if (story.cards && story.cards.length >= 3) {
            storyCard1.querySelector('img').src = story.cards[0].image;
            storyCard1.querySelector('.card-name').textContent = story.cards[0].name;
            
            storyCard2.querySelector('img').src = story.cards[1].image;
            storyCard2.querySelector('.card-name').textContent = story.cards[1].name;
            
            storyCard3.querySelector('img').src = story.cards[2].image;
            storyCard3.querySelector('.card-name').textContent = story.cards[2].name;
        }
        
        if (story.conversation) {
            userQuestion.textContent = story.conversation.userQuestion;
            aiAnswer.textContent = story.conversation.aiAnswer;
            userFeedback.textContent = story.conversation.userFeedback;
            aiSecondAnswer.textContent = story.conversation.aiSecondAnswer;
        }
        
        // 显示模态框
        storyDetailModal.style.display = 'flex';
        
        // 使用setTimeout确保过渡效果正常
        setTimeout(() => {
            storyDetailModal.classList.add('active');
        }, 10);
    }
}); 