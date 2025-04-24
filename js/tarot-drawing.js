document.addEventListener('DOMContentLoaded', function() {
    // 基础API设置
    // API设置对象，用于存储AI API的配置
    let apiSettings = {
        apiKey: localStorage.getItem('tarot-api-key') || '',
        apiUrl: localStorage.getItem('tarot-api-url') || 'https://api.openai.com/v1/chat/completions',
        model: localStorage.getItem('tarot-api-model') || 'gpt-3.5-turbo',
        customModel: localStorage.getItem('tarot-custom-model') || '',
        temperature: localStorage.getItem('tarot-temperature') || 0.7
    };
    
    // 基础塔罗提示词
    const baseTarotPrompt = `Hello, welcome to the mystical world of tarot. I am a tarot reader with extensive experience. Tarot cards contain the wisdom of the universe and can guide your life's direction. I am honored to do a reading for you today.`;
    
    // 设置调试模态窗口功能
    const debugModal = document.getElementById('debug-modal');
    const debugToggle = document.querySelector('.debug-toggle');
    const closeDebug = document.getElementById('close-debug');
    const aiApiKey = document.getElementById('ai-api-key');
    const aiApiUrl = document.getElementById('ai-api-url');
    const aiModel = document.getElementById('ai-model');
    const customModelSetting = document.getElementById('custom-model-setting');
    const customModel = document.getElementById('custom-model');
    const temperatureSlider = document.getElementById('temperature');
    const temperatureValue = document.getElementById('temperature-value');
    const saveApiSettings = document.getElementById('save-api-settings');
    const testApiConnection = document.getElementById('test-api-connection');
    const apiTestResult = document.getElementById('api-test-result');
    const tarotPromptTextarea = document.getElementById('tarot-prompt');
    
    // 显示基础提示词
    if (tarotPromptTextarea) {
        tarotPromptTextarea.value = baseTarotPrompt;
    }
    
    // 调试模态窗口控制
    if (debugToggle) {
        debugToggle.addEventListener('click', function() {
            debugModal.style.display = 'block';
            
            // 填充之前保存的设置
            aiApiKey.value = apiSettings.apiKey;
            aiApiUrl.value = apiSettings.apiUrl;
            aiModel.value = apiSettings.model;
            
            if (apiSettings.model === 'custom') {
                customModelSetting.style.display = 'block';
                customModel.value = apiSettings.customModel;
            } else {
                customModelSetting.style.display = 'none';
            }
            
            temperatureSlider.value = apiSettings.temperature;
            temperatureValue.textContent = apiSettings.temperature;
        });
    }
    
    if (closeDebug) {
        closeDebug.addEventListener('click', function() {
            debugModal.style.display = 'none';
        });
    }
    
    // 当在模态窗口外点击时关闭窗口
    window.addEventListener('click', function(event) {
        if (event.target === debugModal) {
            debugModal.style.display = 'none';
        }
    });
    
    // 模型选择切换
    if (aiModel) {
        aiModel.addEventListener('change', function() {
            if (this.value === 'custom') {
                customModelSetting.style.display = 'block';
            } else {
                customModelSetting.style.display = 'none';
            }
        });
    }
    
    // 温度滑块实时更新显示
    if (temperatureSlider) {
        temperatureSlider.addEventListener('input', function() {
            temperatureValue.textContent = this.value;
        });
    }
    
    // 保存API设置
    if (saveApiSettings) {
        saveApiSettings.addEventListener('click', function() {
            const modelValue = aiModel.value;
            
            apiSettings = {
                apiKey: aiApiKey.value,
                apiUrl: aiApiUrl.value,
                model: modelValue,
                customModel: modelValue === 'custom' ? customModel.value : '',
                temperature: temperatureSlider.value
            };
            
            // 保存到本地存储
            localStorage.setItem('tarot-api-key', apiSettings.apiKey);
            localStorage.setItem('tarot-api-url', apiSettings.apiUrl);
            localStorage.setItem('tarot-api-model', apiSettings.model);
            localStorage.setItem('tarot-custom-model', apiSettings.customModel);
            localStorage.setItem('tarot-temperature', apiSettings.temperature);
            
            apiTestResult.textContent = 'Settings saved';
            apiTestResult.className = 'api-test-result success';
            apiTestResult.style.display = 'block';
            
            setTimeout(() => {
                apiTestResult.style.display = 'none';
            }, 3000);
        });
    }
    
    // 测试API连接
    if (testApiConnection) {
        testApiConnection.addEventListener('click', async function() {
            apiTestResult.textContent = 'Testing connection...';
            apiTestResult.className = 'api-test-result';
            apiTestResult.style.display = 'block';
            
            try {
                const modelToUse = aiModel.value === 'custom' ? customModel.value : aiModel.value;
                
                const response = await fetch(aiApiUrl.value, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${aiApiKey.value}`
                    },
                    body: JSON.stringify({
                        model: modelToUse,
                        messages: [
                            {role: "system", content: "You are a tarot card reader."},
                            {role: "user", content: "Test connection"}
                        ],
                        temperature: parseFloat(temperatureSlider.value)
                    })
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    apiTestResult.textContent = 'Connection successful! API is working properly.';
                    apiTestResult.className = 'api-test-result success';
                } else {
                    apiTestResult.textContent = `Connection failed: ${data.error?.message || 'Unknown error'}`;
                    apiTestResult.className = 'api-test-result error';
                }
            } catch (error) {
                apiTestResult.textContent = `Connection error: ${error.message}`;
                apiTestResult.className = 'api-test-result error';
            }
        });
    }
    
    // 获取DOM元素
    const tarotFan = document.getElementById('tarotFan');
    const cardPositions = document.getElementById('cardPositions');
    const onlineDrawingBtn = document.getElementById('onlineDrawingBtn');
    const redrawButton = document.getElementById('redrawButton');
    
    // 定义不同牌阵的牌位名称
    const spreadConfigs = {
        'three-card': {
            title: 'Three Card Spread',
            labels: ['Past', 'Present', 'Future'],
            maxCards: 3
        },
        'cross': {
            title: 'Cross Spread',
            labels: ['Core Issue', 'Challenge', 'Current Status', 'Influence', 'Outcome'],
            maxCards: 5
        },
        'five-card': {
            title: 'Development Spread',
            labels: ['Current Status', 'Future Development', 'Obstacles', 'Final Result', 'Advice'],
            maxCards: 5
        },
        'single-card': {
            title: 'Single Card Reading',
            labels: ['Guidance'],
            maxCards: 1
        }
    };
    
    // 获取URL中的牌阵类型参数
    const urlParams = new URLSearchParams(window.location.search);
    const spreadType = urlParams.get('spread') || 'five-card'; // 默认为五卡牌阵
    
    // 当前牌阵配置
    const currentSpreadConfig = spreadConfigs[spreadType] || spreadConfigs['five-card'];
    
    // 最大可选卡牌数量（根据牌阵类型）
    const maxCards = currentSpreadConfig.maxCards;
    
    // 塔罗牌数据
    const tarotData = {
        // 大阿卡纳牌 - 22张
        majorArcana: [
            "The Fool", "The Magician", "The High Priestess", "The Empress", "The Emperor", 
            "The Hierophant", "The Lovers", "The Chariot", "Strength", "The Hermit", 
            "Wheel of Fortune", "Justice", "The Hanged Man", "Death", "Temperance", 
            "The Devil", "The Tower", "The Star", "The Moon", "The Sun", 
            "Judgement", "The World"
        ],
        // 小阿卡纳牌 - 56张
        minorArcana: {
            suits: ["Wands", "Cups", "Swords", "Pentacles"],
            values: ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Page", "Knight", "Queen", "King"]
        }
    };
    
    // 已选择的卡牌数组
    let selectedCards = [];
    
    // 每张卡牌是否为逆位的数组 (true = 逆位, false = 正位)
    let cardOrientations = [];
    
    // 初始化卡牌朝向 - 约25%的概率为逆位，75%为正位
    function initCardOrientations() {
        cardOrientations = [];
        for (let i = 0; i < totalCards; i++) {
            // 75%概率为正位，25%概率为逆位
            cardOrientations.push(Math.random() < 0.25);
        }
    }
    
    // 卡牌中文名称映射到图片文件名
    const cardImageMapping = {
        // 大阿卡纳牌映射
        "The Fool": "TheFool.jpg",
        "The Magician": "TheMagician.jpg",
        "The High Priestess": "TheHighPriestess.jpg",
        "The Empress": "TheEmpress.jpg",
        "The Emperor": "TheEmperor.jpg",
        "The Hierophant": "TheHierophant.jpg",
        "The Lovers": "TheLovers.jpg",
        "The Chariot": "TheChariot.jpg",
        "Strength": "Strength.jpg",
        "The Hermit": "TheHermit.jpg",
        "Wheel of Fortune": "WheelOfFortune.jpg",
        "Justice": "Justice.jpg",
        "The Hanged Man": "TheHangedMan.jpg",
        "Death": "Death.jpg",
        "Temperance": "Temperance.jpg",
        "The Devil": "TheDevil.jpg",
        "The Tower": "TheTower.jpg", 
        "The Star": "TheStar.jpg",
        "The Moon": "TheMoon.jpg",
        "The Sun": "TheSun.jpg",
        "Judgement": "Judgement.jpg",
        "The World": "TheWorld.jpg",
        
        // 小阿卡纳牌映射 - 权杖(Wands)
        "Ace of Wands": "AceOfWands.jpg",
        "2 of Wands": "TwoOfWands.jpg",
        "3 of Wands": "ThreeOfWands.jpg",
        "4 of Wands": "FourOfWands.jpg",
        "5 of Wands": "FiveOfWands.jpg",
        "6 of Wands": "SixOfWands.jpg",
        "7 of Wands": "SevenOfWands.jpg",
        "8 of Wands": "EightOfWands.jpg",
        "9 of Wands": "NineOfWands.jpg",
        "10 of Wands": "TenOfWands.jpg",
        "Page of Wands": "PageOfWands.jpg",
        "Knight of Wands": "KnightOfWands.jpg",
        "Queen of Wands": "QueenOfWands.jpg",
        "King of Wands": "KingOfWands.jpg",
        
        // 小阿卡纳牌映射 - 圣杯(Cups)
        "Ace of Cups": "AceOfCups.jpg",
        "2 of Cups": "TwoOfCups.jpg",
        "3 of Cups": "ThreeOfCups.jpg",
        "4 of Cups": "FourOfCups.jpg",
        "5 of Cups": "FiveOfCups.jpg",
        "6 of Cups": "SixOfCups.jpg",
        "7 of Cups": "SevenOfCups.jpg",
        "8 of Cups": "EightOfCups.jpg",
        "9 of Cups": "NineOfCups.jpg",
        "10 of Cups": "TenOfCups.jpg",
        "Page of Cups": "PageOfCups.jpg",
        "Knight of Cups": "KnightOfCups.jpg",
        "Queen of Cups": "QueenOfCups.jpg",
        "King of Cups": "KingOfCups.jpg",
        
        // 小阿卡纳牌映射 - 宝剑(Swords)
        "Ace of Swords": "AceOfSwords.jpg",
        "2 of Swords": "TwoOfSwords.jpg",
        "3 of Swords": "ThreeOfSwords.jpg",
        "4 of Swords": "FourOfSwords.jpg",
        "5 of Swords": "FiveOfSwords.jpg",
        "6 of Swords": "SixOfSwords.jpg",
        "7 of Swords": "SevenOfSwords.jpg",
        "8 of Swords": "EightOfSwords.jpg",
        "9 of Swords": "NineOfSwords.jpg",
        "10 of Swords": "TenOfSwords.jpg",
        "Page of Swords": "PageOfSwords.jpg",
        "Knight of Swords": "KnightOfSwords.jpg",
        "Queen of Swords": "QueenOfSwords.jpg",
        "King of Swords": "KingOfSwords.jpg",
        
        // 小阿卡纳牌映射 - 星币(Pentacles)
        "Ace of Pentacles": "AceOfPentacles.jpg",
        "2 of Pentacles": "TwoOfPentacles.jpg",
        "3 of Pentacles": "ThreeOfPentacles.jpg",
        "4 of Pentacles": "FourOfPentacles.jpg",
        "5 of Pentacles": "FiveOfPentacles.jpg",
        "6 of Pentacles": "SixOfPentacles.jpg",
        "7 of Pentacles": "SevenOfPentacles.jpg",
        "8 of Pentacles": "EightOfPentacles.jpg",
        "9 of Pentacles": "NineOfPentacles.jpg",
        "10 of Pentacles": "TenOfPentacles.jpg",
        "Page of Pentacles": "PageOfPentacles.jpg",
        "Knight of Pentacles": "KnightOfPentacles.jpg",
        "Queen of Pentacles": "QueenOfPentacles.jpg",
        "King of Pentacles": "KingOfPentacles.jpg"
    };
    
    // 卡牌名称映射到CDN链接中使用的格式
    const cardNameMapping = {
        // 大阿卡纳牌映射
        "The Fool": "TheFool",
        "The Magician": "TheMagician",
        "The High Priestess": "TheHighPriestess",
        "The Empress": "TheEmpress",
        "The Emperor": "TheEmperor",
        "The Hierophant": "TheHierophant",
        "The Lovers": "TheLovers",
        "The Chariot": "TheChariot",
        "Strength": "Strength",
        "The Hermit": "TheHermit",
        "Wheel of Fortune": "WheelOfFortune",
        "Justice": "Justice",
        "The Hanged Man": "TheHangedMan",
        "Death": "Death",
        "Temperance": "Temperance",
        "The Devil": "TheDevil",
        "The Tower": "TheTower",
        "The Star": "TheStar",
        "The Moon": "TheMoon",
        "The Sun": "TheSun",
        "Judgement": "Judgement",
        "The World": "TheWorld",
        
        // 小阿卡纳牌映射 - 权杖(Wands)
        "Ace of Wands": "AceOfWands",
        "2 of Wands": "TwoOfWands",
        "3 of Wands": "ThreeOfWands",
        "4 of Wands": "FourOfWands",
        "5 of Wands": "FiveOfWands",
        "6 of Wands": "SixOfWands",
        "7 of Wands": "SevenOfWands",
        "8 of Wands": "EightOfWands",
        "9 of Wands": "NineOfWands",
        "10 of Wands": "TenOfWands",
        "Page of Wands": "PageOfWands",
        "Knight of Wands": "KnightOfWands",
        "Queen of Wands": "QueenOfWands",
        "King of Wands": "KingOfWands",
        
        // 小阿卡纳牌映射 - 圣杯(Cups)
        "Ace of Cups": "AceOfCups",
        "2 of Cups": "TwoOfCups",
        "3 of Cups": "ThreeOfCups",
        "4 of Cups": "FourOfCups",
        "5 of Cups": "FiveOfCups",
        "6 of Cups": "SixOfCups",
        "7 of Cups": "SevenOfCups",
        "8 of Cups": "EightOfCups",
        "9 of Cups": "NineOfCups",
        "10 of Cups": "TenOfCups",
        "Page of Cups": "PageOfCups",
        "Knight of Cups": "KnightOfCups",
        "Queen of Cups": "QueenOfCups",
        "King of Cups": "KingOfCups",
        
        // 小阿卡纳牌映射 - 宝剑(Swords)
        "Ace of Swords": "AceOfSwords",
        "2 of Swords": "TwoOfSwords",
        "3 of Swords": "ThreeOfSwords",
        "4 of Swords": "FourOfSwords",
        "5 of Swords": "FiveOfSwords",
        "6 of Swords": "SixOfSwords",
        "7 of Swords": "SevenOfSwords",
        "8 of Swords": "EightOfSwords",
        "9 of Swords": "NineOfSwords",
        "10 of Swords": "TenOfSwords",
        "Page of Swords": "PageOfSwords",
        "Knight of Swords": "KnightOfSwords",
        "Queen of Swords": "QueenOfSwords",
        "King of Swords": "KingOfSwords",
        
        // 小阿卡纳牌映射 - 星币(Pentacles)
        "Ace of Pentacles": "AceOfPentacles",
        "2 of Pentacles": "TwoOfPentacles",
        "3 of Pentacles": "ThreeOfPentacles",
        "4 of Pentacles": "FourOfPentacles",
        "5 of Pentacles": "FiveOfPentacles",
        "6 of Pentacles": "SixOfPentacles",
        "7 of Pentacles": "SevenOfPentacles",
        "8 of Pentacles": "EightOfPentacles",
        "9 of Pentacles": "NineOfPentacles",
        "10 of Pentacles": "TenOfPentacles",
        "Page of Pentacles": "PageOfPentacles",
        "Knight of Pentacles": "KnightOfPentacles",
        "Queen of Pentacles": "QueenOfPentacles",
        "King of Pentacles": "KingOfPentacles"
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
    
    // 获取卡牌图片文件路径 - 使用CDN链接
    function getCardImagePath(cardName) {
        if (cardNameMapping[cardName] && cardCdnMapping[cardNameMapping[cardName]]) {
            return cardCdnMapping[cardNameMapping[cardName]];
        } else {
            console.warn(`CDN link for card "${cardName}" not found`);
            return null;
        }
    }
    
    // 创建完整的塔罗牌数组
    const allTarotCards = [];
    
    // 添加大阿卡纳牌
    tarotData.majorArcana.forEach(card => {
        allTarotCards.push(card);
    });
    
    // 添加小阿卡纳牌
    tarotData.minorArcana.suits.forEach(suit => {
        tarotData.minorArcana.values.forEach(value => {
            allTarotCards.push(`${value} of ${suit}`);
        });
    });
    
    // 塔罗牌总数
    const totalCards = allTarotCards.length;
    
    // 初始化卡牌朝向数组
    initCardOrientations();
    
    // 初始化牌位，创建占位符
    function initCardPositions() {
        // 清空牌位容器
        cardPositions.innerHTML = '';
        
        // 创建占位符和标签
        for (let i = 0; i < maxCards; i++) {
            const position = document.createElement('div');
            position.className = `position position-${i + 1}`;
            
            const placeholder = document.createElement('div');
            placeholder.className = 'position-placeholder';
            placeholder.id = `position${i + 1}`;
            
            const label = document.createElement('div');
            label.className = 'position-label';
            label.textContent = currentSpreadConfig.labels[i] || `Position ${i+1}`;
            label.style.display = 'none';
            
            position.appendChild(placeholder);
            position.appendChild(label);
            cardPositions.appendChild(position);
        }
    }
    
    // 生成扇形卡牌
    function generateFanCards(withAnimation = true, showShuffleHint = true) {
        // 显示洗牌提示（如果需要）
        if (showShuffleHint) {
            showShufflingHint();
        }
        
        // 清空卡牌容器
        tarotFan.innerHTML = '';
        
        // 创建随机索引数组
        let indices = Array.from(Array(totalCards).keys());
        const randomIndices = shuffleArray([...indices]);
        
        // 确定要显示的卡牌数量
        const numCards = Math.min(78, totalCards); // 最多显示21张卡牌
        
        // 创建SVG元素 (用于调试扇形路径)
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        svg.style.position = 'absolute';
        svg.style.top = '0';
        svg.style.left = '0';
        svg.style.pointerEvents = 'none';
        svg.style.zIndex = '1';
        
        // 检测当前窗口宽高比
        const isWideAspect = window.innerWidth / window.innerHeight >= 1;
        
        // 根据宽高比调整扇形参数 - 与中文版保持一致
        let fanRadius = isWideAspect ? 400 : 250; // 宽屏时使用更大的半径
        let vertOffset = isWideAspect ? -150 : -70; // 宽屏时调整垂直偏移
        
        // 扇形配置 - 确保卡牌分布均匀 - 与中文版保持一致
        const fanContainer = tarotFan;
        const totalAngle = 60; // 扇形总角度
        const startAngle = -totalAngle / 2; // 起始角度
        const angleStep = totalAngle / (numCards - 1); // 每张卡片的角度步长
        
        // 扇形半径和偏移
        const radius = fanRadius;
        const horizontalOffset = 0;
        const verticalOffset = vertOffset;
        
        // 计算扇形路径
        let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        let pathData = 'M ';
        
        // 计算容器中心点 - 固定圆心在容器宽度中心和高度底部
        const centerX = fanContainer.offsetWidth / 2;
        const centerY = fanContainer.offsetHeight;
        
        // 生成曲线点
        for (let i = 0; i < numCards; i++) {
            const angle = startAngle + i * angleStep;
            const angleRad = (angle * Math.PI) / 180;
            const x = radius * Math.sin(angleRad) + centerX + horizontalOffset;
            const y = -radius * Math.cos(angleRad) + centerY - verticalOffset;
            pathData += `${x},${y} `;
        }
        
        path.setAttribute('d', pathData);
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', 'rgba(255, 215, 0, 0.1)');
        path.setAttribute('stroke-width', '1');
        svg.appendChild(path);
        fanContainer.appendChild(svg);

        // 生成卡片
        for (let i = 0; i < numCards; i++) {
            const cardIndex = randomIndices[i];
            const isReversed = cardOrientations[cardIndex]; // 获取该卡片是否为逆位
            
            const card = document.createElement('div');
            card.className = 'tarot-card';
            card.dataset.index = cardIndex;
            card.dataset.reversed = isReversed; // 存储是否逆位的信息
            
            // 计算位置和旋转
            const angle = startAngle + i * angleStep;
            const angleRad = (angle * Math.PI) / 180;
            
            // 使用固定的圆心计算卡片位置
            const x = radius * Math.sin(angleRad) + horizontalOffset;
            const y = -radius * Math.cos(angleRad) - verticalOffset;
            
            // 存储卡牌的角度和位置信息，用于悬浮效果
            card.dataset.angle = angle;
            card.dataset.x = x;
            card.dataset.y = y;
            card.dataset.radius = radius;
            
            // 设置卡片样式 - 确保使用正确的transform原点
            card.style.transformOrigin = 'center bottom';
            
            if (withAnimation) {
                // 初始位置在中间
                card.style.transform = `translate(-50%, 0) translate(0px, 0px) rotate(0deg)`;
                card.style.opacity = '0';
                
                // 延迟并添加展开动画
                setTimeout(() => {
                    card.style.transition = `all ${0.5 + i * 0.01}s cubic-bezier(0.23, 1, 0.32, 1)`;
                    card.style.opacity = '1';
                    card.style.transform = `translate(-50%, 0) translate(${x}px, ${y}px) rotate(${angle}deg)`;
                }, 50 + i * 20);
            } else {
                // 直接设置最终位置
                card.style.transform = `translate(-50%, 0) translate(${x}px, ${y}px) rotate(${angle}deg)`;
                card.style.opacity = '1';
            }
            
            card.style.zIndex = i + 10;
            
            // 添加鼠标悬浮和离开事件
            card.addEventListener('mouseenter', function() {
                const angle = parseFloat(this.dataset.angle);
                const angleRad = (angle * Math.PI) / 180;
                const x = parseFloat(this.dataset.x);
                const y = parseFloat(this.dataset.y);
                const radius = parseFloat(this.dataset.radius);
                
                const popOutDistance = radius * 0.2;
                const popX = x + popOutDistance * Math.sin(angleRad);
                const popY = y - popOutDistance * Math.cos(angleRad);
                
                this.style.transform = `translate(-50%, 0) translate(${popX}px, ${popY}px) rotate(${angle}deg)`;
            });
            
            card.addEventListener('mouseleave', function() {
                const angle = parseFloat(this.dataset.angle);
                const x = parseFloat(this.dataset.x);
                const y = parseFloat(this.dataset.y);
                
                this.style.transform = `translate(-50%, 0) translate(${x}px, ${y}px) rotate(${angle}deg)`;
            });
            
            // 创建卡片背面
            const cardBack = document.createElement('div');
            cardBack.className = 'card-back';
            // 使用相对路径确保英文版和中文版使用相同的背面图片
            cardBack.style.backgroundImage = `url('images/背面A.jpg')`;
            cardBack.style.backgroundSize = 'cover';
            cardBack.style.backgroundPosition = 'center';
            card.appendChild(cardBack);
            
            // 创建卡片正面
            const cardFront = document.createElement('div');
            cardFront.className = 'card-front';
            cardFront.textContent = allTarotCards[cardIndex];
            card.appendChild(cardFront);
            
            // 添加点击事件
            card.addEventListener('click', function() {
                selectCard(this.dataset.index, this.dataset.reversed === 'true');
            });
            
            fanContainer.appendChild(card);
        }
    }
    
    // 显示洗牌提示
    function showShufflingHint() {
        // 创建洗牌提示元素
        const hintElement = document.createElement('div');
        hintElement.className = 'shuffling-hint';
        hintElement.innerHTML = '<i class="fas fa-random"></i> Shuffling...';
        
        // 将提示添加到塔罗容器中
        const tarotContainer = document.querySelector('.tarot-container');
        tarotContainer.appendChild(hintElement);
        
        // 3秒后移除提示
        setTimeout(() => {
            const hint = document.querySelector('.shuffling-hint');
            if (hint) {
                hint.classList.add('fade-out');
                setTimeout(() => {
                    if (hint.parentNode) {
                        hint.parentNode.removeChild(hint);
                    }
                }, 500);
            }
        }, 3000);
    }
    
    // 显示宇宙传讯提示
    function showCosmicMessageHint() {
        // 创建宇宙传讯提示元素
        const hintElement = document.createElement('div');
        hintElement.className = 'shuffling-hint cosmic-message';
        hintElement.innerHTML = '<i class="fas fa-star"></i> Cosmic message, please wait...';
        
        // 将提示添加到塔罗容器中
        const tarotContainer = document.querySelector('.tarot-container');
        tarotContainer.appendChild(hintElement);
        
        // 第三阶段结束后自动移除提示
        setTimeout(() => {
            const hint = document.querySelector('.cosmic-message');
            if (hint) {
                hint.classList.add('fade-out');
                setTimeout(() => {
                    if (hint.parentNode) {
                        hint.parentNode.removeChild(hint);
                    }
                }, 500);
            }
        }, 5000); // 与第三阶段相同的时间
    }
    
    // 选择卡牌
    function selectCard(cardIndex, isReversed = false) {
        // 如果已经选择过，不再处理
        if (selectedCards.some(card => card.index === cardIndex)) {
            return;
        }
        
        // 如果已经选满，不再处理
        if (selectedCards.length >= maxCards) {
            return;
        }

        // 获取卡牌数据
        const cardName = allTarotCards[cardIndex];
        const displayName = isReversed ? `${cardName} - Reversed` : cardName;
        
        // 获取卡牌元素
        const cardElement = document.querySelector(`.tarot-card[data-index="${cardIndex}"]`);
        if (!cardElement) return;
        
        // 立即标记卡牌为已选择状态
        cardElement.classList.add('selected');
        cardElement.style.display = 'none'; // 直接隐藏卡片，不使用透明度过渡
        
        // 直接添加到已选择的卡牌数组
        selectedCards.push({
            index: cardIndex,
            name: cardName,
            displayName: displayName,
            isReversed: isReversed
        });
        
        // 更新对应的占位符
        const positionIndex = selectedCards.length - 1;
        const placeholder = document.getElementById(`position${positionIndex + 1}`);
        
        // 更新占位符样式
        placeholder.className = 'position-placeholder filled';
        placeholder.innerHTML = '';
        
        // 检查是否是宽屏模式，并设置对应的尺寸
        const isWideAspect = window.innerWidth / window.innerHeight >= 1;
        if (isWideAspect) {
            placeholder.style.width = '178px';
            placeholder.style.height = '300px';
        } else {
            placeholder.style.width = '89px';
            placeholder.style.height = '150px';
        }
        
        // 获取卡牌图片
        const imageUrl = getCardImagePath(cardName);
        if (imageUrl) {
            placeholder.style.backgroundImage = `url('${imageUrl}')`;
            // 如果是逆位，旋转180度
            if (isReversed) {
                placeholder.style.transform = 'rotate(180deg)';
            }
        } else {
            // 如果没有图片，显示卡牌名称
            placeholder.innerHTML = displayName;
        }
        
        // 显示卡牌名称在占位符下方
        const label = document.querySelector(`.position-${positionIndex + 1} .position-label`);
        if (label) {
            label.textContent = displayName;
            label.style.display = 'block';
        }
        
        // 全部选完后立即进入阅读界面
        if (selectedCards.length === maxCards) {
            showReadingInterface();
        }
    }
    
    // 随机洗牌算法
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    // 获取卡牌图片文件名
    function getCardImageFilename(cardName) {
        if (cardImageMapping[cardName]) {
            return `images/${cardImageMapping[cardName]}`;
        } else {
            console.warn(`Image for card "${cardName}" not found`);
            return null;
        }
    }
    
    // 在线抽牌按钮点击事件
    onlineDrawingBtn.addEventListener('click', function() {
        // 如果已经选满卡牌，则不再继续
        if (selectedCards.length >= maxCards) {
            alert(`You have already selected ${maxCards} tarot cards. Click "Reshuffle" to start over.`);
            return;
        }
        
        // 创建所有卡牌的索引数组
        const allCardIndices = Array.from(Array(totalCards).keys());
        // 过滤掉已经选择的卡牌索引
        const remainingIndices = allCardIndices.filter(index => 
            !selectedCards.some(card => card.index === index)
        );
        
        if (remainingIndices.length > 0) {
            // 计算要抽取的卡牌数量
            const cardsToSelect = Math.min(
                maxCards - selectedCards.length, 
                remainingIndices.length
            );
            
            // 随机洗牌剩余索引
            shuffleArray(remainingIndices);
            
            // 按顺序抽取随机洗牌后的卡牌
            for (let i = 0; i < cardsToSelect; i++) {
                setTimeout(() => {
                    selectCard(remainingIndices[i]);
                }, i * 600); // 间隔抽牌
            }
        }
    });
    
    // 重新抽牌按钮点击事件
    redrawButton.addEventListener('click', function() {
        // 清空已选卡牌
        selectedCards.length = 0;
        
        // 重置牌位
        initCardPositions();
        
        // 重新生成卡牌，不显示洗牌提示
        generateFanCards(false, false);
    });
    
    // 初始化
    initCardPositions();
    generateFanCards(false, false);
    
    // 页面加载完成后显示洗牌动画
    window.addEventListener('load', function() {
        // 只在页面加载时显示"正在洗牌"状态栏
        showShufflingHint();
        
        // 启动洗牌动画序列
        showShuffleAnimation();
    });
    
    // 响应窗口大小变化
    window.addEventListener('resize', function() {
        // 检查界面比例并重新生成卡牌
        if (selectedCards.length === 0) {
            generateFanCards();
        }
        
        // 根据窗口宽高比更新已填充的占位符尺寸
        updatePlaceholderSizes();
        
        // 更新卡片摘要区域的图片尺寸
        updateSummaryImageSizes();
    });
    
    // 更新已填充占位符尺寸
    function updatePlaceholderSizes() {
        const isWideAspect = window.innerWidth / window.innerHeight >= 1;
        const filledPlaceholders = document.querySelectorAll('.position-placeholder.filled');
        
        filledPlaceholders.forEach(placeholder => {
            if (isWideAspect) {
                placeholder.style.width = '178px';
                placeholder.style.height = '300px';
            } else {
                placeholder.style.width = '89px';
                placeholder.style.height = '150px';
            }
        });
    }
    
    // 更新卡片摘要区域的图片尺寸
    function updateSummaryImageSizes() {
        const isWideAspect = window.innerWidth / window.innerHeight >= 1;
        const summaryImages = document.querySelectorAll('.card-summary img');
        const summaryPlaceholders = document.querySelectorAll('.card-summary div[style*="background:#1c1347"]');
        
        const width = isWideAspect ? '178px' : '89px';
        const height = isWideAspect ? '300px' : '150px';
        
        summaryImages.forEach(img => {
            img.style.width = width;
            img.style.height = height;
        });
        
        summaryPlaceholders.forEach(div => {
            div.style.width = width;
            div.style.height = height;
        });
    }
    
    // 显示塔罗牌解读界面
    function showReadingInterface() {
        const readingModal = document.getElementById('readingModal');
        const cardsSummary = document.getElementById('cardsSummary');
        const readingDate = document.getElementById('readingDate');
        const readingQuestion = document.getElementById('readingQuestion');
        
        // 设置当前日期和时间
        const now = new Date();
        const dateOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        readingDate.textContent = now.toLocaleDateString('en-US', dateOptions);
        
        // 获取URL中的问题参数
        const question = urlParams.get('q');
        if (question) {
            readingQuestion.textContent = `Your question: ${decodeURIComponent(question)}`;
        } else {
            readingQuestion.textContent = 'Your Tarot Guidance';
        }
        
        // 清空卡牌总结区域
        cardsSummary.innerHTML = '';
        
        // 添加选中的卡牌到总结区域
        selectedCards.forEach((card, index) => {
            const cardSummary = document.createElement('div');
            cardSummary.className = 'card-summary';
            
            const imageUrl = getCardImagePath(card.name);
            let imageHtml;
            
            if (imageUrl) {
                // 如果是逆位，添加旋转样式
                const rotationStyle = card.isReversed ? 'transform: rotate(180deg);' : '';
                imageHtml = `<img src="${imageUrl}" alt="${card.displayName}" style="${rotationStyle}">`;
            } else {
                imageHtml = `<div style="width:89px;height:150px;background:#1c1347;border-radius:8px;margin:0 auto 10px;display:flex;justify-content:center;align-items:center;color:gold;font-size:0.8rem;">${card.displayName}</div>`;
            }
            
            cardSummary.innerHTML = `
                ${imageHtml}
                <div class="card-name">${card.displayName}</div>
                <div class="card-position-name">${currentSpreadConfig.labels[index] || `Position ${index+1}`}</div>
            `;
            
            cardsSummary.appendChild(cardSummary);
        });
        
        // 显示解读界面
        readingModal.style.display = 'block';
        
        // 设置关闭按钮事件
        document.getElementById('closeReading').addEventListener('click', function() {
            readingModal.style.display = 'none';
        });
        
        // 设置聊天输入和发送功能
        const chatInput = document.getElementById('chatInput');
        const sendMessage = document.getElementById('sendMessage');
        const chatMessages = document.getElementById('chatMessages');
        
        // 清空现有的聊天消息
        chatMessages.innerHTML = '';
        
        // 收集塔罗解读所需的数据
        const readingData = {
            question: question ? decodeURIComponent(question) : "Tarot Guidance",
            spreadType: spreadType,
            spreadName: currentSpreadConfig.title,
            cards: selectedCards.map((card, index) => {
                return {
                    name: card.displayName, // 使用带有可能的" - Reversed"后缀的显示名称
                    position: currentSpreadConfig.labels[index] || `Position ${index+1}`,
                    index: index
                };
            }),
            date: now.toLocaleDateString('en-US', dateOptions)
        };
        
        // 调用AI进行初始解读
        getTarotReading(readingData, "initial reading").then(response => {
            // 添加欢迎消息
            const welcomeHtml = `
                <div class="message">
                    <div class="message-tarot">
                        ${response.welcome || `✨ Welcome to your tarot reading`}
                    </div>
                    <div class="message-info message-tarot-info">
                        Tarot Guide • just now
                    </div>
                </div>
            `;
            chatMessages.insertAdjacentHTML('beforeend', welcomeHtml);
            
            // 添加短暂延迟后显示第一张牌的解读
            setTimeout(() => {
                if (response.firstCard) {
                    const firstCardHtml = `
                        <div class="message">
                            <div class="message-tarot">
                                ${response.firstCard}
                            </div>
                            <div class="message-info message-tarot-info">
                                Tarot Guide • just now
                            </div>
                        </div>
                    `;
                    chatMessages.insertAdjacentHTML('beforeend', firstCardHtml);
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }
                
                // 如果有额外的消息，依次显示
                if (response.additionalMessages && response.additionalMessages.length > 0) {
                    let delay = 800;
                    response.additionalMessages.forEach((message, index) => {
                        setTimeout(() => {
                            const messageHtml = `
                                <div class="message">
                                    <div class="message-tarot">
                                        ${message}
                                    </div>
                                    <div class="message-info message-tarot-info">
                                        Tarot Guide • just now
                                    </div>
                                </div>
                            `;
                            chatMessages.insertAdjacentHTML('beforeend', messageHtml);
                            chatMessages.scrollTop = chatMessages.scrollHeight;
                        }, delay + index * 800); // 每条消息之间间隔800毫秒
                    });
                }
            }, 800); // 第一张牌的解读延迟800毫秒显示
            
            // 滚动到底部
            chatMessages.scrollTop = chatMessages.scrollHeight;
        });
        
        // 设置发送消息事件
        if (sendMessage) {
            sendMessage.addEventListener('click', sendUserMessage);
        }
        
        // 设置输入框回车事件
        if (chatInput) {
            chatInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    sendUserMessage();
                }
            });
        }
        
        // 模拟塔罗响应
        function simulateTarotResponse(message) {
            if (!message) return;
            
            const responseHtml = `
                <div class="message">
                    <div class="message-tarot">
                        ${message}
                    </div>
                    <div class="message-info message-tarot-info">
                        Tarot Guide • just now
                    </div>
                </div>
            `;
            
            chatMessages.insertAdjacentHTML('beforeend', responseHtml);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
        
        // 设置保存解读按钮点击事件
        document.getElementById('saveReading').addEventListener('click', function() {
            alert('Your reading has been saved!');
        });
        
        // 设置新解读按钮点击事件
        document.getElementById('newReading').addEventListener('click', function() {
            readingModal.style.display = 'none';
            // 清空已选卡牌
            selectedCards.length = 0;
            // 重置牌位
            initCardPositions();
            // 重新生成卡牌，不显示洗牌提示
            generateFanCards(true, true); // 带动画和提示
        });
    }
    
    // 发送用户消息
    function sendUserMessage() {
        const chatInput = document.getElementById('chatInput');
        const chatMessages = document.getElementById('chatMessages');
        const messageText = chatInput.value.trim();
        if (!messageText) return;
        
        // 添加用户消息
        const messageHtml = `
            <div class="message">
                <div class="message-user">
                    ${messageText}
                </div>
                <div class="message-info message-user-info">
                    You • just now
                </div>
            </div>
        `;
        
        chatMessages.insertAdjacentHTML('beforeend', messageHtml);
        chatInput.value = '';
        
        // 滚动到底部
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // 先移除可能已存在的思考指示器
        const existingIndicator = document.getElementById('thinking-indicator');
        if (existingIndicator) {
            existingIndicator.remove();
        }
        
        // 显示思考中指示器
        const thinkingIndicator = document.createElement('div');
        thinkingIndicator.id = 'thinking-indicator';
        thinkingIndicator.className = 'message';
        thinkingIndicator.innerHTML = `
            <div class="message-tarot thinking">
                <div class="thinking-dots">
                    <span>.</span><span>.</span><span>.</span>
                </div>
            </div>
            <div class="message-info message-tarot-info">
                Tarot Guide is thinking...
            </div>
        `;
        chatMessages.appendChild(thinkingIndicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // 禁用输入和发送按钮，防止重复发送
        chatInput.disabled = true;
        document.getElementById('sendMessage').disabled = true;
        
        // 收集塔罗解读所需的数据
        const now = new Date();
        const dateOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        
        const readingData = {
            question: urlParams.get('q') ? decodeURIComponent(urlParams.get('q')) : "Tarot Guidance",
            spreadType: spreadType,
            spreadName: currentSpreadConfig.title,
            cards: selectedCards.map((card, index) => {
                return {
                    name: card.displayName,
                    position: currentSpreadConfig.labels[index] || `Position ${index+1}`,
                    index: index
                };
            }),
            date: now.toLocaleDateString('en-US', dateOptions)
        };
        
        // 在实际实现时使用AI API，这里模拟响应
        setTimeout(() => {
            // 移除思考指示器
            const thinkingIndicator = document.getElementById('thinking-indicator');
            if (thinkingIndicator) {
                thinkingIndicator.remove();
            }
            
            // 重新启用输入和发送按钮
            chatInput.disabled = false;
            document.getElementById('sendMessage').disabled = false;
            chatInput.focus();
            
            // 模拟AI响应
            const simulatedResponse = `I'm considering your question about "${messageText}". Based on your cards, I can see that there are interesting energies at play. The cards suggest a period of transition, with both challenges and opportunities ahead. Would you like me to explore any specific aspect of this reading in more detail?`;
            
            // 显示响应
            const responseHtml = `
                <div class="message">
                    <div class="message-tarot">
                        ${simulatedResponse}
                    </div>
                    <div class="message-info message-tarot-info">
                        Tarot Guide • just now
                    </div>
                </div>
            `;
            
            chatMessages.insertAdjacentHTML('beforeend', responseHtml);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 2000); // 2秒后显示模拟响应
    }
    
    // 模拟获取塔罗解读，在实际实现时会调用AI API
    async function getTarotReading(readingData, userQuery) {
        // 模拟AI响应
        return new Promise((resolve) => {
            setTimeout(() => {
                // 根据牌阵类型构建不同的响应
                let response = {
                    welcome: `✨ Welcome to your ${readingData.spreadName}. I will guide you through the meaning of each card and how they relate to your question.`,
                    firstCard: `Let's start with the first card: ${readingData.cards[0].name} in the position of ${readingData.cards[0].position}. This card represents your current situation and suggests that you are at a point of transition.`,
                    additionalMessages: []
                };
                
                // 添加其他卡牌的解读
                for (let i = 1; i < readingData.cards.length; i++) {
                    const card = readingData.cards[i];
                    response.additionalMessages.push(`For the position of ${card.position}, we have ${card.name}. This card indicates that you will face some challenges, but with persistence and clarity, you will overcome them.`);
                }
                
                // 添加总结
                response.additionalMessages.push(`Overall, this reading suggests a period of growth and transformation. There may be challenges ahead, but the cards indicate that you have the inner strength and resources to overcome them and emerge stronger.`);
                
                resolve(response);
            }, 1000); // 模拟网络延迟
        });
    }
    
    // 展开为扇形
    function expandToFan() {
        // 模拟扇形展开
        const fanContainer = document.getElementById('tarotFan');
        
        // 隐藏扩展按钮
        onlineDrawingBtn.style.display = 'none';
        
        // 启动洗牌动画序列 - 点击展开时不显示"正在洗牌"状态栏
        showShuffleAnimation();
    }

    // 洗牌动画序列
    function showShuffleAnimation() {
        // 隐藏扇形区域，直到动画结束
        const fanContainer = document.querySelector('.tarot-fan');
        if (fanContainer) {
            fanContainer.style.visibility = 'hidden';
        }
        
        // 创建洗牌动画容器
        const shuffleContainer = document.createElement('div');
        shuffleContainer.className = 'shuffle-container';
        document.querySelector('.tarot-container').appendChild(shuffleContainer);
        
        const isWideAspect = window.innerWidth / window.innerHeight >= 1;
        const cardWidth = isWideAspect ? 178 : 89;
        const cardHeight = isWideAspect ? 300 : 150;
        
        // 阶段1: 创建初始牌堆
        const mainDeck = document.createElement('div');
        mainDeck.className = 'shuffle-deck';
        mainDeck.style.zIndex = '10';
        shuffleContainer.appendChild(mainDeck);
        
        // 创建初始散乱卡片
        const numScatteredCards = 35;
        const cards = [];
        
        for (let i = 0; i < numScatteredCards; i++) {
            const card = document.createElement('div');
            card.className = 'shuffle-card';
            card.style.opacity = '0';
            card.style.zIndex = i;
            shuffleContainer.appendChild(card);
            cards.push(card);
        }
        
        // 动画时间线 - 第一阶段：打乱展开 (延长3秒)
        setTimeout(() => {
            // 阶段1: 打乱展开 - 从主牌堆散开
            for (let i = 0; i < cards.length; i++) {
                setTimeout(() => {
                    const randomX = (Math.random() - 0.5) * window.innerWidth * 0.6;
                    const randomY = (Math.random() - 0.5) * window.innerHeight * 0.6;
                    const randomRotate = (Math.random() - 0.5) * 40;
                    
                    cards[i].style.opacity = '1';
                    cards[i].style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`;
                }, i * 100);
            }
        }, 500);
        
        // 第二阶段：切牌 (延长3秒)
        setTimeout(() => {
            // 阶段2: 切牌 - 将散开的牌收集成3堆
            const leftPileX = -cardWidth * 1.2;
            const rightPileX = cardWidth * 1.2;
            
            // 创建左、中、右三堆
            const leftPile = document.createElement('div');
            leftPile.className = 'shuffle-deck';
            leftPile.style.transform = `translateX(${leftPileX}px)`;
            shuffleContainer.appendChild(leftPile);
            
            const rightPile = document.createElement('div');
            rightPile.className = 'shuffle-deck';
            rightPile.style.transform = `translateX(${rightPileX}px)`;
            shuffleContainer.appendChild(rightPile);
            
            // 将散乱的牌收回到三堆
            for (let i = 0; i < cards.length; i++) {
                setTimeout(() => {
                    // 随机分配到左、中、右三堆
                    const pileIndex = i % 3; // 0=左, 1=中, 2=右
                    let targetX = 0;
                    
                    if (pileIndex === 0) targetX = leftPileX;
                    else if (pileIndex === 2) targetX = rightPileX;
                    
                    cards[i].style.transform = `translateX(${targetX}px) translateY(0) rotate(0deg)`;
                    cards[i].style.zIndex = 20 + i;
                }, i * 100);
            }
            
            // 隐藏主牌堆
            mainDeck.style.opacity = '0';
        }, 2000 + 3000);
        
        // 第三阶段：合并 (延长3秒)
        setTimeout(() => {
            // 阶段3: 合并 - 将三堆牌合并在一起
            const allDecks = document.querySelectorAll('.shuffle-deck');
            allDecks.forEach(deck => {
                deck.style.transform = 'translate(0, 0)';
                deck.style.opacity = '1';
                deck.style.zIndex = '30';
            });
            
            // 将散乱的牌全部合并到中间
            cards.forEach(card => {
                card.style.transform = 'translate(0, 0) rotate(0deg)';
                card.style.zIndex = '20';
            });
        }, 3500 + 5000);
        
        // 在第三阶段结束后立即显示宇宙传讯提示
        setTimeout(() => {
            showCosmicMessageHint();
        }, 3500 + 5000 + 100); // 稍微延迟一点以确保在第三阶段结束后显示
        
        // 第四阶段：平铺 (延长3秒)
        const totalAnimationTime = 5000 + 9000; // 原时间 + 各阶段延长累计9秒
        
        setTimeout(() => {
            // 阶段4: 平铺 - 移除洗牌动画元素，显示最终的扇形布局
            shuffleContainer.remove();
            
            // 显示扇形区域
            if (fanContainer) {
                fanContainer.style.visibility = 'visible';
            }
            
            // 生成扇形卡牌，不显示洗牌提示
            generateFanCards(true, false); // 传入参数表示带有动画效果，但不显示洗牌提示
        }, totalAnimationTime);
    }
}); 