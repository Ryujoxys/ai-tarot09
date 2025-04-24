document.addEventListener('DOMContentLoaded', function() {
    // 故事数据 - 实际应用中可以从服务器获取
    const storyData = {
        "1": {
            title: "爱情抉择的困惑",
            cards: [
                { image: "images/06恋人.jpg", name: "恋人" },
                { image: "images/圣杯2.jpg", name: "圣杯二" },
                { image: "images/权杖骑士.jpg", name: "权杖骑士" }
            ],
            conversation: {
                userQuestion: "我现在面临两段感情，一个是相处多年的稳定关系，另一个是新认识但有强烈吸引力的人。我该如何抉择？",
                aiAnswer: "恋人牌代表你正处于一个重要的选择点，它提醒你关注内心真正的渴望。圣杯二表示两人之间的情感连接和和谐，这可能指向你与长期伴侣的关系。而权杖骑士则象征新的冒险、激情和行动，反映了新关系带给你的感受。",
                userFeedback: "我确实被新认识的人吸引，但又害怕失去稳定关系带来的安全感。我是否应该打破现状？",
                aiSecondAnswer: "权杖骑士的出现提醒你，有时我们需要勇气去追求内心真正想要的。但这并不一定意味着要放弃现有关系。关键在于诚实面对自己的感受，并与伴侣坦诚沟通。恋人牌也暗示了需要做出符合内心价值观的选择，而不仅仅是基于冲动。你可以先探索内心真正的需求，然后再做决定。"
            }
        },
        "2": {
            title: "职业转型的迷茫",
            cards: [
                { image: "images/10命运之轮.jpg", name: "命运之轮" },
                { image: "images/星币8.jpg", name: "星币八" },
                { image: "images/19太阳.jpg", name: "太阳" }
            ],
            conversation: {
                userQuestion: "我在金融行业工作了8年，但现在想转行做科技产品经理。这个转变是否正确？我该如何开始？",
                aiAnswer: "命运之轮显示你正处于人生的转折点，变化已经不可避免。星币八代表专业技能和勤奋学习，暗示转行需要投入时间掌握新技能。太阳牌是最积极的牌之一，预示着成功、喜悦和实现，表明这条道路虽有挑战但前景光明。",
                userFeedback: "我担心年龄和经验问题，转行后可能需要从较低职位重新开始，这值得吗？",
                aiSecondAnswer: "星币八特别强调了专业技能的培养过程，暗示你可以利用现有的金融专业知识作为优势，结合新学的产品技能创造独特价值。命运之轮表明现在正是改变的好时机，而太阳牌预示最终结果将是积极的。建议你可以先通过兼职项目或培训课程尝试，在保持当前工作的同时逐步过渡，这样风险会小很多。"
            }
        },
        "3": {
            title: "学业压力的缓解",
            cards: [
                { image: "images/09隐士.jpg", name: "隐士" },
                { image: "images/宝剑4.jpg", name: "宝剑四" },
                { image: "images/星币ACE.jpg", name: "星币王牌" }
            ],
            conversation: {
                userQuestion: "考研备考压力太大，感觉自己快要崩溃了，该怎么调整状态？我有时候怀疑自己是否适合读研。",
                aiAnswer: "隐士牌建议你需要一段独处和内省的时间，找回自己的初心和目标。宝剑四明确表示你需要休息和恢复，过度的压力已经影响到你的效率和健康。星币王牌代表新的开始和机会，暗示如果你能正确处理当前的挑战，未来会有丰厚的回报。",
                userFeedback: "我已经很久没有好好休息了，但是距离考试只有三个月了，我怕休息会影响复习进度。",
                aiSecondAnswer: "宝剑四特别强调了休息不是浪费时间，而是提高效率的必要条件。你可以尝试更科学的学习方法，如番茄工作法，每天安排固定的休息和放松时间。隐士牌也提醒你回顾读研的初衷，这会给你精神动力。星币王牌预示成功的可能性很大，但前提是你必须保持身心健康。适当的休息和调整不会影响你的进度，反而会让复习更高效。"
            }
        }
    };

    // 获取所有故事卡片和相关元素
    const storyCards = document.querySelectorAll('.story-card');
    const storyDetailModal = document.getElementById('storyDetailModal');
    const closeStoryModal = document.getElementById('closeStoryModal');
    const storyModalTitle = document.getElementById('storyModalTitle');
    const storyCard1 = document.getElementById('storyCard1');
    const storyCard2 = document.getElementById('storyCard2');
    const storyCard3 = document.getElementById('storyCard3');
    const userQuestion = document.getElementById('userQuestion');
    const aiAnswer = document.getElementById('aiAnswer');
    const userFeedback = document.getElementById('userFeedback');
    const aiSecondAnswer = document.getElementById('aiSecondAnswer');

    // 为每个故事卡片添加点击事件
    storyCards.forEach(card => {
        card.addEventListener('click', function() {
            const storyId = this.getAttribute('data-story-id');
            openStoryModal(storyId);
        });

        // 为"查看完整故事"按钮添加点击事件
        const readMoreBtn = card.querySelector('.story-read-more');
        if (readMoreBtn) {
            readMoreBtn.addEventListener('click', function(e) {
                e.stopPropagation(); // 阻止事件冒泡
                const storyId = card.getAttribute('data-story-id');
                openStoryModal(storyId);
            });
        }
    });

    // 关闭弹窗
    closeStoryModal.addEventListener('click', function() {
        storyDetailModal.classList.remove('active');
        setTimeout(() => {
            storyDetailModal.style.display = 'none';
        }, 300);
    });

    // 点击弹窗外部关闭弹窗
    window.addEventListener('click', function(event) {
        if (event.target === storyDetailModal) {
            storyDetailModal.classList.remove('active');
            setTimeout(() => {
                storyDetailModal.style.display = 'none';
            }, 300);
        }
    });

    // 打开故事详情弹窗
    function openStoryModal(storyId) {
        const story = storyData[storyId];
        
        if (!story) return;
        
        // 设置弹窗标题
        storyModalTitle.textContent = story.title;
        
        // 设置塔罗牌
        if (story.cards && story.cards.length >= 3) {
            storyCard1.querySelector('img').src = story.cards[0].image;
            storyCard1.querySelector('.card-name').textContent = story.cards[0].name;
            
            storyCard2.querySelector('img').src = story.cards[1].image;
            storyCard2.querySelector('.card-name').textContent = story.cards[1].name;
            
            storyCard3.querySelector('img').src = story.cards[2].image;
            storyCard3.querySelector('.card-name').textContent = story.cards[2].name;
        }
        
        // 设置对话内容
        if (story.conversation) {
            userQuestion.textContent = story.conversation.userQuestion;
            aiAnswer.textContent = story.conversation.aiAnswer;
            userFeedback.textContent = story.conversation.userFeedback;
            aiSecondAnswer.textContent = story.conversation.aiSecondAnswer;
        }
        
        // 显示弹窗
        storyDetailModal.style.display = 'flex';
        
        // 使用setTimeout确保过渡效果正常
        setTimeout(() => {
            storyDetailModal.classList.add('active');
        }, 10);
    }

    // 生成随机的卡牌动画效果 - 仅用于演示
    function initCardAnimations() {
        const readersContainer = document.querySelector('.readers-grid-container');
        if (readersContainer) {
            // 添加AI塔罗师形象
            for (let i = 0; i < 9; i++) {
                const readerBox = document.createElement('div');
                readerBox.className = 'reader-box';
                readerBox.style.animationDelay = `${i * 0.2}s`;
                readersContainer.appendChild(readerBox);
            }
        }

        const yesNoContainer = document.querySelector('.yes-no-cards-container');
        if (yesNoContainer) {
            // 添加是否塔罗牌效果
            const yesCard = document.createElement('div');
            yesCard.className = 'yes-no-card yes-card';
            yesCard.textContent = '是';
            
            const noCard = document.createElement('div');
            noCard.className = 'yes-no-card no-card';
            noCard.textContent = '否';
            
            yesNoContainer.appendChild(yesCard);
            yesNoContainer.appendChild(noCard);
        }
    }

    // 初始化动画效果
    initCardAnimations();
}); 