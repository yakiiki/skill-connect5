// 语言大师 - 游戏主逻辑

class LanguageMasterGame {
    constructor() {
        // 用户数据
        this.userData = {
            level: 1,
            xp: 0,
            gems: 0,
            hearts: 5,
            streak: 0,
            lastStudyDate: null,
            completedLessons: new Set(),
            unlockedCourses: new Set(['business-english', 'business-japanese', 'freight-english', 'customs-english']),
            achievements: new Set(),
            dailyProgress: 0,
            hints: 3,
            voicePractices: 0,
            pkWins: 0,
            matchingCompleted: 0,
            listeningCompleted: 0
        };
        
        // 游戏状态
        this.currentCourse = 'business-english';
        this.currentLesson = null;
        this.currentQuestionIndex = 0;
        this.lessonQuestions = [];
        this.lessonCorrect = 0;
        this.lessonWrong = 0;
        this.currentAnswer = null;
        this.streakCount = 0; // 连续答对计数
        
        // 语音合成
        this.speechSynthesis = window.speechSynthesis;
        this.speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        
        // 对战模式
        this.pkMode = false;
        this.pkOpponent = null;
        this.pkTimer = null;
        this.pkTimeLeft = 60;
        
        // 初始化
        this.loadUserData();
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.updateUI();
        this.renderCourseList();
        this.renderLearningPath();
        this.renderAchievements();
        this.renderRanking();
    }
    
    // 从本地存储加载用户数据
    loadUserData() {
        const saved = localStorage.getItem('languageMasterData');
        if (saved) {
            const data = JSON.parse(saved);
            this.userData = {
                ...this.userData,
                ...data,
                completedLessons: new Set(data.completedLessons || []),
                unlockedCourses: new Set(data.unlockedCourses || ['business-english']),
                achievements: new Set(data.achievements || [])
            };
            this.checkDailyStreak();
        }
    }
    
    // 保存用户数据
    saveUserData() {
        const dataToSave = {
            ...this.userData,
            completedLessons: Array.from(this.userData.completedLessons),
            unlockedCourses: Array.from(this.userData.unlockedCourses),
            achievements: Array.from(this.userData.achievements)
        };
        localStorage.setItem('languageMasterData', JSON.stringify(dataToSave));
    }
    
    // 检查每日连胜
    checkDailyStreak() {
        const today = new Date().toDateString();
        const lastDate = this.userData.lastStudyDate;
        
        if (lastDate) {
            const last = new Date(lastDate);
            const todayDate = new Date(today);
            const diffDays = Math.floor((todayDate - last) / (1000 * 60 * 60 * 24));
            
            if (diffDays > 1) {
                this.userData.streak = 0;
            }
        }
        
        this.saveUserData();
    }
    
    // 设置事件监听
    setupEventListeners() {
        // 课程选择
        document.querySelectorAll('.course-item').forEach(item => {
            item.addEventListener('click', () => {
                const courseId = item.dataset.course;
                if (this.userData.unlockedCourses.has(courseId)) {
                    this.switchCourse(courseId);
                }
            });
        });
        
        // 检查答案按钮
        document.getElementById('check-btn').addEventListener('click', () => this.checkAnswer());
        
        // 继续按钮
        document.getElementById('continue-btn').addEventListener('click', () => this.nextQuestion());
        
        // 关闭课程
        document.getElementById('close-lesson').addEventListener('click', () => this.closeLesson());
        
        // 返回主页
        document.getElementById('back-menu-btn').addEventListener('click', () => this.showScreen('menu-screen'));
        
        // 继续学习
        document.getElementById('continue-study-btn').addEventListener('click', () => {
            this.showScreen('menu-screen');
            this.renderLearningPath();
        });
        
        // 每日挑战
        document.getElementById('daily-challenge-btn').addEventListener('click', () => this.startDailyChallenge());
        
        // 对战按钮
        const pkBtn = document.getElementById('pk-mode-btn');
        if (pkBtn) {
            pkBtn.addEventListener('click', () => this.startPKMode());
        }
        
        // 语音练习按钮
        const voiceBtn = document.getElementById('voice-practice-btn');
        if (voiceBtn) {
            voiceBtn.addEventListener('click', () => this.startVoicePractice());
        }
    }
    
    // 切换课程
    switchCourse(courseId) {
        this.currentCourse = courseId;
        document.querySelectorAll('.course-item').forEach(item => {
            item.classList.toggle('active', item.dataset.course === courseId);
        });
        this.renderLearningPath();
        this.updateCourseInfo();
    }
    
    // 更新课程信息
    updateCourseInfo() {
        const course = COURSES_DATA[this.currentCourse];
        document.getElementById('current-course-title').textContent = course.name;
        document.getElementById('current-course-desc').textContent = course.description;
    }
    
    // 渲染课程列表
    renderCourseList() {
        const courseList = document.querySelector('.course-list');
        courseList.innerHTML = '';
        
        Object.values(COURSES_DATA).forEach(course => {
            const isUnlocked = this.userData.unlockedCourses.has(course.id);
            const progress = this.calculateCourseProgress(course.id);
            
            const courseItem = document.createElement('div');
            courseItem.className = `course-item ${this.currentCourse === course.id ? 'active' : ''} ${!isUnlocked ? 'locked' : ''}`;
            courseItem.dataset.course = course.id;
            
            courseItem.innerHTML = `
                <div class="course-icon">${isUnlocked ? course.icon : '🔒'}</div>
                <div class="course-info">
                    <h3>${course.name}</h3>
                    <p>${course.description}</p>
                    <div class="course-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${progress}%"></div>
                        </div>
                        <span class="progress-text">${Math.round(progress)}%</span>
                    </div>
                </div>
            `;
            
            courseItem.addEventListener('click', () => {
                if (isUnlocked) {
                    this.switchCourse(course.id);
                }
            });
            
            courseList.appendChild(courseItem);
        });
    }
    
    // 计算课程进度
    calculateCourseProgress(courseId) {
        const course = COURSES_DATA[courseId];
        let totalLessons = 0;
        let completedLessons = 0;
        
        course.units.forEach(unit => {
            unit.lessons.forEach(lesson => {
                totalLessons++;
                if (this.userData.completedLessons.has(lesson.id)) {
                    completedLessons++;
                }
            });
        });
        
        return totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
    }
    
    // 渲染学习路径
    renderLearningPath() {
        const container = document.getElementById('path-container');
        const course = COURSES_DATA[this.currentCourse];
        
        container.innerHTML = '';
        
        course.units.forEach((unit, unitIndex) => {
            const unitEl = document.createElement('div');
            unitEl.className = 'unit-section';
            
            const unitHeader = document.createElement('div');
            unitHeader.className = 'unit-header';
            unitHeader.innerHTML = `
                <h3>第 ${unit.id} 单元: ${unit.title}</h3>
                <p>${unit.description}</p>
            `;
            unitEl.appendChild(unitHeader);
            
            const lessonsContainer = document.createElement('div');
            lessonsContainer.className = 'lessons-path';
            
            unit.lessons.forEach((lesson, lessonIndex) => {
                const isCompleted = this.userData.completedLessons.has(lesson.id);
                const isLocked = !this.isLessonUnlocked(lesson.id, unitIndex, lessonIndex);
                
                const lessonNode = document.createElement('div');
                lessonNode.className = `lesson-node ${isCompleted ? 'completed' : ''} ${isLocked ? 'locked' : ''}`;
                lessonNode.innerHTML = `
                    <div class="node-circle">
                        ${isCompleted ? '✓' : isLocked ? '🔒' : lessonIndex + 1}
                    </div>
                    <div class="node-label">${lesson.title}</div>
                `;
                
                if (!isLocked) {
                    lessonNode.addEventListener('click', () => this.startLesson(lesson));
                }
                
                lessonsContainer.appendChild(lessonNode);
            });
            
            unitEl.appendChild(lessonsContainer);
            container.appendChild(unitEl);
        });
    }
    
    // 检查课程是否解锁
    isLessonUnlocked(lessonId, unitIndex, lessonIndex) {
        if (unitIndex === 0 && lessonIndex === 0) return true;
        
        const course = COURSES_DATA[this.currentCourse];
        
        if (lessonIndex > 0) {
            const prevLesson = course.units[unitIndex].lessons[lessonIndex - 1];
            return this.userData.completedLessons.has(prevLesson.id);
        }
        
        if (unitIndex > 0) {
            const prevUnit = course.units[unitIndex - 1];
            const lastLesson = prevUnit.lessons[prevUnit.lessons.length - 1];
            return this.userData.completedLessons.has(lastLesson.id);
        }
        
        return false;
    }
    
    // 开始课程
    startLesson(lesson) {
        if (this.userData.hearts <= 0) {
            this.showNotification('体力不足！请稍后再试或购买体力。', 'error');
            return;
        }
        
        this.currentLesson = lesson;
        this.currentQuestionIndex = 0;
        this.lessonQuestions = [...lesson.questions];
        this.lessonCorrect = 0;
        this.lessonWrong = 0;
        this.currentAnswer = null;
        this.streakCount = 0;
        
        this.showScreen('lesson-screen');
        this.renderQuestion();
        this.updateLessonProgress();
    }
    
    // 渲染题目
    renderQuestion() {
        const question = this.lessonQuestions[this.currentQuestionIndex];
        const container = document.getElementById('question-area');
        
        container.innerHTML = '';
        
        // 题目头部
        const header = document.createElement('div');
        header.className = 'question-header';
        header.innerHTML = `
            <span class="question-number">题目 ${this.currentQuestionIndex + 1}/${this.lessonQuestions.length}</span>
            <span class="question-type">${this.getQuestionTypeName(question.type)}</span>
        `;
        container.appendChild(header);
        
        // 题目内容
        const content = document.createElement('div');
        content.className = 'question-content';
        content.innerHTML = `<h2>${question.question}</h2>`;
        container.appendChild(content);
        
        // 根据题型渲染不同的答题区域
        switch(question.type) {
            case 'choice':
                this.renderChoiceQuestion(container, question);
                break;
            case 'fill-blank':
                this.renderFillBlankQuestion(container, question);
                break;
            case 'translation':
                this.renderTranslationQuestion(container, question);
                break;
            case 'listening':
                this.renderListeningQuestion(container, question);
                break;
            case 'matching':
                this.renderMatchingQuestion(container, question);
                break;
            case 'sorting':
                this.renderSortingQuestion(container, question);
                break;
            case 'speaking':
                this.renderSpeakingQuestion(container, question);
                break;
        }
        
        // 重置按钮状态
        document.getElementById('check-btn').classList.remove('hidden');
        document.getElementById('continue-btn').classList.add('hidden');
        document.getElementById('feedback-area').classList.add('hidden');
    }
    
    // 获取题型名称
    getQuestionTypeName(type) {
        const names = {
            'choice': '选择题',
            'fill-blank': '填空题',
            'translation': '翻译题',
            'listening': '听力题',
            'matching': '配对题',
            'sorting': '排序题',
            'speaking': '口语题'
        };
        return names[type] || type;
    }
    
    // 渲染选择题
    renderChoiceQuestion(container, question) {
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'options-container';
        
        question.options.forEach((option, index) => {
            const optionEl = document.createElement('div');
            optionEl.className = 'option-item';
            optionEl.innerHTML = `
                <span class="option-letter">${String.fromCharCode(65 + index)}</span>
                <span class="option-text">${option.text}</span>
            `;
            
            optionEl.addEventListener('click', () => {
                document.querySelectorAll('.option-item').forEach(el => el.classList.remove('selected'));
                optionEl.classList.add('selected');
                this.currentAnswer = index;
            });
            
            optionsContainer.appendChild(optionEl);
        });
        
        container.appendChild(optionsContainer);
    }
    
    // 渲染填空题
    renderFillBlankQuestion(container, question) {
        const inputContainer = document.createElement('div');
        inputContainer.className = 'fillblank-container';
        
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'fillblank-input';
        input.placeholder = '请输入答案...';
        
        if (question.hint) {
            const hint = document.createElement('div');
            hint.className = 'question-hint';
            hint.innerHTML = `💡 提示: ${question.hint}`;
            inputContainer.appendChild(hint);
        }
        
        input.addEventListener('input', (e) => {
            this.currentAnswer = e.target.value.trim();
        });
        
        inputContainer.appendChild(input);
        container.appendChild(inputContainer);
        
        setTimeout(() => input.focus(), 100);
    }
    
    // 渲染翻译题
    renderTranslationQuestion(container, question) {
        // 新版挖空翻译题
        if (question.blanks) {
            this.renderBlanksTranslation(container, question);
        } else {
            // 兼容旧版
            this.renderOldTranslation(container, question);
        }
    }
    
    // 新版挖空翻译题
    renderBlanksTranslation(container, question) {
        const translationContainer = document.createElement('div');
        translationContainer.className = 'blanks-translation-container';
        
        // 显示题目句子，挖空部分用输入框代替
        const sentenceDiv = document.createElement('div');
        sentenceDiv.className = 'blanks-sentence';
        
        let blankIndex = 0;
        const parts = question.sentence.split(/(\{blank\})/);
        
        parts.forEach((part, index) => {
            if (part === '{blank}') {
                const blankInput = document.createElement('input');
                blankInput.type = 'text';
                blankInput.className = 'blank-word';
                blankInput.dataset.index = blankIndex;
                blankInput.readOnly = true;
                blankInput.addEventListener('click', () => {
                    this.selectBlank(blankIndex);
                });
                sentenceDiv.appendChild(blankInput);
                blankIndex++;
            } else {
                const textSpan = document.createElement('span');
                textSpan.className = 'sentence-text';
                textSpan.textContent = part;
                sentenceDiv.appendChild(textSpan);
            }
        });
        
        translationContainer.appendChild(sentenceDiv);
        
        // 乱序选项
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'blank-options';
        
        // 收集所有正确答案并打乱
        let allOptions = [];
        question.blanks.forEach(blank => {
            const answers = Array.isArray(blank.answer) ? blank.answer : [blank.answer];
            allOptions.push({
                text: answers[0],
                isCorrect: true,
                blankIndex: question.blanks.indexOf(blank)
            });
        });
        
        // 添加干扰项（如果有）
        if (question.distractors) {
            question.distractors.forEach(text => {
                allOptions.push({
                    text: text,
                    isCorrect: false,
                    blankIndex: -1
                });
            });
        }
        
        // 打乱顺序
        allOptions.sort(() => Math.random() - 0.5);
        
        // 创建选项按钮
        allOptions.forEach((option, index) => {
            const optionBtn = document.createElement('button');
            optionBtn.className = 'blank-option-btn';
            optionBtn.textContent = option.text;
            optionBtn.dataset.text = option.text;
            
            optionBtn.addEventListener('click', () => {
                this.fillBlank(option.text);
            });
            
            optionsDiv.appendChild(optionBtn);
        });
        
        translationContainer.appendChild(optionsDiv);
        
        // 提示
        if (question.hint) {
            const hint = document.createElement('div');
            hint.className = 'question-hint';
            hint.innerHTML = `💡 提示: ${question.hint}`;
            translationContainer.appendChild(hint);
        }
        
        container.appendChild(translationContainer);
        
        // 初始化答案数组
        this.currentAnswer = new Array(question.blanks.length).fill('');
        this.selectedBlankIndex = 0;
        this.updateBlankSelection();
    }
    
    // 选择挖空
    selectBlank(index) {
        this.selectedBlankIndex = index;
        this.updateBlankSelection();
    }
    
    // 更新挖空选中状态
    updateBlankSelection() {
        document.querySelectorAll('.blank-word').forEach((blank, index) => {
            blank.classList.toggle('selected', index === this.selectedBlankIndex);
        });
    }
    
    // 填充挖空
    fillBlank(text) {
        if (this.selectedBlankIndex === -1) {
            this.showNotification('请先选择一个空位', 'warning');
            return;
        }
        
        this.currentAnswer[this.selectedBlankIndex] = text;
        
        const blanks = document.querySelectorAll('.blank-word');
        blanks[this.selectedBlankIndex].value = text;
        
        // 自动选择下一个空位
        let nextIndex = this.selectedBlankIndex + 1;
        while (nextIndex < blanks.length && this.currentAnswer[nextIndex]) {
            nextIndex++;
        }
        
        if (nextIndex < blanks.length) {
            this.selectBlank(nextIndex);
        } else {
            // 所有空都填完了，找到第一个未填的空
            const emptyIndex = this.currentAnswer.findIndex(a => !a);
            if (emptyIndex !== -1) {
                this.selectBlank(emptyIndex);
            } else {
                this.selectedBlankIndex = -1;
                this.updateBlankSelection();
            }
        }
    }
    
    // 旧版翻译题（兼容）
    renderOldTranslation(container, question) {
        const inputContainer = document.createElement('div');
        inputContainer.className = 'translation-container';
        
        const textarea = document.createElement('textarea');
        textarea.className = 'translation-input';
        textarea.placeholder = '请输入翻译...';
        textarea.rows = 3;
        
        if (question.hint) {
            const hint = document.createElement('div');
            hint.className = 'question-hint';
            hint.innerHTML = `💡 提示: ${question.hint}`;
            inputContainer.appendChild(hint);
        }
        
        textarea.addEventListener('input', (e) => {
            this.currentAnswer = e.target.value.trim();
        });
        
        inputContainer.appendChild(textarea);
        container.appendChild(inputContainer);
        
        setTimeout(() => textarea.focus(), 100);
    }
    
    // 渲染听力题
    renderListeningQuestion(container, question) {
        const listeningContainer = document.createElement('div');
        listeningContainer.className = 'listening-container';
        
        // 播放按钮
        const playBtn = document.createElement('button');
        playBtn.className = 'btn btn-secondary play-audio-btn';
        playBtn.innerHTML = '🔊 播放音频';
        playBtn.addEventListener('click', () => {
            this.playAudio(question.audio);
            playBtn.innerHTML = '🔊 播放中...';
            setTimeout(() => {
                playBtn.innerHTML = '🔊 播放音频';
            }, 2000);
        });
        listeningContainer.appendChild(playBtn);
        
        // 选项
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'options-container';
        
        question.options.forEach((option, index) => {
            const optionEl = document.createElement('div');
            optionEl.className = 'option-item';
            optionEl.innerHTML = `
                <span class="option-letter">${String.fromCharCode(65 + index)}</span>
                <span class="option-text">${option.text}</span>
            `;
            
            optionEl.addEventListener('click', () => {
                document.querySelectorAll('.option-item').forEach(el => el.classList.remove('selected'));
                optionEl.classList.add('selected');
                this.currentAnswer = index;
            });
            
            optionsContainer.appendChild(optionEl);
        });
        
        listeningContainer.appendChild(optionsContainer);
        container.appendChild(listeningContainer);
        
        // 自动播放一次
        setTimeout(() => this.playAudio(question.audio), 500);
    }
    
    // 渲染配对题
    renderMatchingQuestion(container, question) {
        const matchingContainer = document.createElement('div');
        matchingContainer.className = 'matching-container';
        
        const pairs = [...question.pairs].sort(() => Math.random() - 0.5);
        const leftItems = pairs.map(p => ({ ...p }));
        const rightItems = [...pairs].sort(() => Math.random() - 0.5);
        
        this.currentAnswer = {};
        this.selectedLeft = null;
        
        const leftColumn = document.createElement('div');
        leftColumn.className = 'matching-column';
        
        const rightColumn = document.createElement('div');
        rightColumn.className = 'matching-column';
        
        leftItems.forEach((item, index) => {
            const itemEl = document.createElement('div');
            itemEl.className = 'matching-item left-item';
            itemEl.textContent = item.left;
            itemEl.dataset.id = item.id;
            
            itemEl.addEventListener('click', () => {
                document.querySelectorAll('.left-item').forEach(el => el.classList.remove('selected'));
                itemEl.classList.add('selected');
                this.selectedLeft = item.id;
                
                // 检查是否可以配对
                if (this.selectedRight !== null) {
                    this.checkMatchingPair();
                }
            });
            
            leftColumn.appendChild(itemEl);
        });
        
        rightItems.forEach((item, index) => {
            const itemEl = document.createElement('div');
            itemEl.className = 'matching-item right-item';
            itemEl.textContent = item.right;
            itemEl.dataset.id = item.id;
            
            itemEl.addEventListener('click', () => {
                if (this.selectedLeft === null) {
                    this.showNotification('请先选择左侧项目', 'warning');
                    return;
                }
                
                this.selectedRight = item.id;
                this.checkMatchingPair();
            });
            
            rightColumn.appendChild(itemEl);
        });
        
        matchingContainer.appendChild(leftColumn);
        matchingContainer.appendChild(rightColumn);
        container.appendChild(matchingContainer);
        
        // 检查配对状态
        this.matchingPairs = {};
        this.matchedCount = 0;
    }
    
    // 检查配对
    checkMatchingPair() {
        if (this.selectedLeft === this.selectedRight) {
            // 配对成功
            this.matchingPairs[this.selectedLeft] = true;
            this.matchedCount++;
            
            document.querySelector(`.left-item[data-id="${this.selectedLeft}"]`).classList.add('matched');
            document.querySelector(`.right-item[data-id="${this.selectedRight}"]`).classList.add('matched');
            
            this.selectedLeft = null;
            this.selectedRight = null;
            
            // 检查是否全部配对完成
            const totalPairs = document.querySelectorAll('.left-item').length;
            if (this.matchedCount === totalPairs) {
                this.currentAnswer = this.matchingPairs;
            }
        } else {
            // 配对失败
            this.showNotification('配对不正确，请重试', 'error');
            document.querySelectorAll('.left-item, .right-item').forEach(el => {
                el.classList.remove('selected');
            });
            this.selectedLeft = null;
            this.selectedRight = null;
        }
    }
    
    // 渲染排序题
    renderSortingQuestion(container, question) {
        const sortingContainer = document.createElement('div');
        sortingContainer.className = 'sorting-container';
        
        const items = [...question.items].sort(() => Math.random() - 0.5);
        this.currentSortOrder = [];
        
        const itemsList = document.createElement('div');
        itemsList.className = 'sorting-list';
        
        items.forEach((item, index) => {
            const itemEl = document.createElement('div');
            itemEl.className = 'sorting-item';
            itemEl.draggable = true;
            itemEl.dataset.order = item.order;
            itemEl.innerHTML = `
                <span class="sort-handle">☰</span>
                <span class="sort-text">${item.text}</span>
                <span class="sort-number">${index + 1}</span>
            `;
            
            // 拖拽功能
            itemEl.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', index);
                itemEl.classList.add('dragging');
            });
            
            itemEl.addEventListener('dragend', () => {
                itemEl.classList.remove('dragging');
                this.updateSortOrder();
            });
            
            itemEl.addEventListener('dragover', (e) => {
                e.preventDefault();
            });
            
            itemEl.addEventListener('drop', (e) => {
                e.preventDefault();
                const fromIndex = parseInt(e.dataTransfer.getData('text/plain'));
                const toIndex = index;
                
                if (fromIndex !== toIndex) {
                    const list = itemsList;
                    const items = Array.from(list.children);
                    list.insertBefore(items[fromIndex], toIndex > fromIndex ? items[toIndex].nextSibling : items[toIndex]);
                    this.updateSortNumbers();
                }
            });
            
            // 点击上下移动
            itemEl.addEventListener('click', () => {
                const currentIndex = Array.from(itemsList.children).indexOf(itemEl);
                if (currentIndex > 0) {
                    itemsList.insertBefore(itemEl, itemsList.children[currentIndex - 1]);
                    this.updateSortNumbers();
                }
            });
            
            itemsList.appendChild(itemEl);
        });
        
        sortingContainer.appendChild(itemsList);
        
        // 说明文字
        const hint = document.createElement('div');
        hint.className = 'question-hint';
        hint.innerHTML = '💡 提示：点击项目向上移动，或拖拽调整顺序';
        sortingContainer.appendChild(hint);
        
        container.appendChild(sortingContainer);
    }
    
    // 更新排序数字
    updateSortNumbers() {
        document.querySelectorAll('.sorting-item').forEach((item, index) => {
            item.querySelector('.sort-number').textContent = index + 1;
        });
        this.updateSortOrder();
    }
    
    // 更新排序答案
    updateSortOrder() {
        this.currentAnswer = Array.from(document.querySelectorAll('.sorting-item')).map(item => ({
            order: parseInt(item.dataset.order),
            currentPosition: Array.from(item.parentNode.children).indexOf(item) + 1
        }));
    }
    
    // 渲染口语题
    renderSpeakingQuestion(container, question) {
        const speakingContainer = document.createElement('div');
        speakingContainer.className = 'speaking-container';
        
        // 显示要朗读的文本
        const textDisplay = document.createElement('div');
        textDisplay.className = 'speaking-text';
        textDisplay.innerHTML = `<p>请朗读以下句子：</p><h3>${question.text}</h3>`;
        speakingContainer.appendChild(textDisplay);
        
        // 播放示范按钮
        const playBtn = document.createElement('button');
        playBtn.className = 'btn btn-secondary';
        playBtn.innerHTML = '🔊 听示范';
        playBtn.addEventListener('click', () => {
            this.speakText(question.text, question.language || 'en-US');
        });
        speakingContainer.appendChild(playBtn);
        
        // 录音按钮
        const recordBtn = document.createElement('button');
        recordBtn.className = 'btn btn-primary record-btn';
        recordBtn.innerHTML = '🎤 开始录音';
        
        let isRecording = false;
        let recognition = null;
        
        if (this.speechRecognition) {
            recordBtn.addEventListener('click', () => {
                if (!isRecording) {
                    // 开始录音
                    recognition = new this.speechRecognition();
                    recognition.lang = question.language || 'en-US';
                    recognition.continuous = false;
                    recognition.interimResults = false;
                    
                    recognition.onstart = () => {
                        isRecording = true;
                        recordBtn.innerHTML = '🔴 录音中...';
                        recordBtn.classList.add('recording');
                    };
                    
                    recognition.onresult = (event) => {
                        const transcript = event.results[0][0].transcript;
                        this.currentAnswer = transcript;
                        
                        // 简单相似度检查
                        const similarity = this.calculateSimilarity(
                            transcript.toLowerCase(),
                            question.text.toLowerCase()
                        );
                        
                        if (similarity > 0.7) {
                            this.showNotification('发音很好！相似度: ' + Math.round(similarity * 100) + '%', 'success');
                        } else {
                            this.showNotification('再试一次，相似度: ' + Math.round(similarity * 100) + '%', 'warning');
                        }
                    };
                    
                    recognition.onerror = (event) => {
                        this.showNotification('语音识别错误: ' + event.error, 'error');
                        isRecording = false;
                        recordBtn.innerHTML = '🎤 开始录音';
                        recordBtn.classList.remove('recording');
                    };
                    
                    recognition.onend = () => {
                        isRecording = false;
                        recordBtn.innerHTML = '🎤 开始录音';
                        recordBtn.classList.remove('recording');
                    };
                    
                    recognition.start();
                } else {
                    // 停止录音
                    if (recognition) {
                        recognition.stop();
                    }
                }
            });
        } else {
            recordBtn.disabled = true;
            recordBtn.innerHTML = '🎤 浏览器不支持语音识别';
        }
        
        speakingContainer.appendChild(recordBtn);
        container.appendChild(speakingContainer);
    }
    
    // 播放音频
    playAudio(audioSrc) {
        const audio = new Audio(audioSrc);
        audio.play().catch(err => {
            console.error('音频播放失败:', err);
            this.showNotification('音频播放失败', 'error');
        });
    }
    
    // 语音合成
    speakText(text, lang = 'en-US') {
        if (!this.speechSynthesis) {
            this.showNotification('浏览器不支持语音合成', 'error');
            return;
        }
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.rate = 0.9;
        this.speechSynthesis.speak(utterance);
    }
    
    // 计算字符串相似度（简单版）
    calculateSimilarity(str1, str2) {
        const longer = str1.length > str2.length ? str1 : str2;
        const shorter = str1.length > str2.length ? str2 : str1;
        
        if (longer.length === 0) return 1.0;
        
        const distance = this.levenshteinDistance(longer, shorter);
        return (longer.length - distance) / longer.length;
    }
    
    // Levenshtein 距离算法
    levenshteinDistance(str1, str2) {
        const matrix = [];
        for (let i = 0; i <= str2.length; i++) {
            matrix[i] = [i];
        }
        for (let j = 0; j <= str1.length; j++) {
            matrix[0][j] = j;
        }
        for (let i = 1; i <= str2.length; i++) {
            for (let j = 1; j <= str1.length; j++) {
                if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
                    );
                }
            }
        }
        return matrix[str2.length][str1.length];
    }
    
    // 检查答案
    checkAnswer() {
        if (this.currentAnswer === null || this.currentAnswer === '' || 
            (Array.isArray(this.currentAnswer) && this.currentAnswer.length === 0)) {
            this.showNotification('请先选择或输入答案！', 'warning');
            return;
        }
        
        const question = this.lessonQuestions[this.currentQuestionIndex];
        let isCorrect = false;
        
        switch(question.type) {
            case 'choice':
            case 'listening':
                isCorrect = question.options[this.currentAnswer].correct;
                this.markChoiceOptions(isCorrect, question);
                break;
                
            case 'fill-blank':
                const answers = Array.isArray(question.answer) ? question.answer : [question.answer];
                isCorrect = answers.some(ans => 
                    this.currentAnswer.toLowerCase().includes(ans.toLowerCase())
                );
                this.markFillBlank(isCorrect, question);
                break;
                
            case 'translation':
                // 新的翻译题逻辑 - 检查选中的单词
                if (question.blanks) {
                    isCorrect = this.checkBlanksAnswer(question);
                    this.markBlanks(isCorrect, question);
                } else {
                    // 兼容旧版翻译题
                    const transAnswers = Array.isArray(question.answer) ? question.answer : [question.answer];
                    isCorrect = transAnswers.some(ans => 
                        this.currentAnswer.toLowerCase().includes(ans.toLowerCase())
                    );
                }
                break;
                
            case 'matching':
                const totalPairs = question.pairs.length;
                isCorrect = Object.keys(this.currentAnswer).length === totalPairs;
                if (isCorrect) {
                    this.userData.matchingCompleted++;
                }
                break;
                
            case 'sorting':
                isCorrect = this.currentAnswer.every(item => item.order === item.currentPosition);
                this.markSorting(isCorrect);
                break;
                
            case 'speaking':
                const similarity = this.calculateSimilarity(
                    this.currentAnswer.toLowerCase(),
                    question.text.toLowerCase()
                );
                isCorrect = similarity > 0.6;
                if (isCorrect) {
                    this.userData.voicePractices++;
                }
                break;
        }
        
        this.showFeedback(isCorrect, question);
        
        if (isCorrect) {
            this.lessonCorrect++;
            this.streakCount++;
            this.playSound('correct');
            
            // 记录听力题完成
            if (question.type === 'listening') {
                this.userData.listeningCompleted++;
            }
            
            // 正确后自动进入下一题（延迟1.5秒让用户看到反馈）
            setTimeout(() => {
                this.nextQuestion();
            }, 1500);
        } else {
            this.lessonWrong++;
            this.streakCount = 0;
            this.userData.hearts--;
            this.playSound('wrong');
            this.updateUI();
            
            // 错误时显示继续按钮
            document.getElementById('check-btn').classList.add('hidden');
            document.getElementById('continue-btn').classList.remove('hidden');
        }
    }
    
    // 标记选择题选项
    markChoiceOptions(isCorrect, question) {
        const options = document.querySelectorAll('.option-item');
        options.forEach((option, index) => {
            if (index === this.currentAnswer) {
                // 用户选择的
                option.classList.add(isCorrect ? 'correct-answer' : 'wrong-answer');
            } else if (question.options[index].correct) {
                // 正确答案
                option.classList.add('correct-answer');
            }
        });
    }
    
    // 标记填空题
    markFillBlank(isCorrect, question) {
        const input = document.querySelector('.fillblank-input');
        if (input) {
            input.classList.add(isCorrect ? 'correct-answer' : 'wrong-answer');
            if (!isCorrect) {
                const correctAnswer = Array.isArray(question.answer) ? question.answer[0] : question.answer;
                input.value = correctAnswer;
            }
        }
    }
    
    // 检查挖空翻译题答案
    checkBlanksAnswer(question) {
        if (!this.currentAnswer || !Array.isArray(this.currentAnswer)) return false;
        
        for (let i = 0; i < question.blanks.length; i++) {
            const blank = question.blanks[i];
            const userAnswer = this.currentAnswer[i];
            const correctAnswers = Array.isArray(blank.answer) ? blank.answer : [blank.answer];
            
            if (!correctAnswers.some(ans => userAnswer.toLowerCase() === ans.toLowerCase())) {
                return false;
            }
        }
        return true;
    }
    
    // 标记挖空翻译题
    markBlanks(isCorrect, question) {
        const blanks = document.querySelectorAll('.blank-word');
        blanks.forEach((blank, index) => {
            const userAnswer = this.currentAnswer[index];
            const correctAnswers = Array.isArray(question.blanks[index].answer) ? 
                question.blanks[index].answer : [question.blanks[index].answer];
            
            if (correctAnswers.some(ans => userAnswer.toLowerCase() === ans.toLowerCase())) {
                blank.classList.add('correct-answer');
            } else {
                blank.classList.add('wrong-answer');
                blank.value = correctAnswers[0];
            }
        });
    }
    
    // 标记排序题
    markSorting(isCorrect) {
        const items = document.querySelectorAll('.sorting-item');
        items.forEach((item, index) => {
            const correctOrder = parseInt(item.dataset.order);
            const currentOrder = index + 1;
            
            if (correctOrder === currentOrder) {
                item.classList.add('correct-position');
            } else {
                item.classList.add('wrong-position');
            }
        });
    }
    
    // 显示反馈
    showFeedback(isCorrect, question) {
        const feedbackArea = document.getElementById('feedback-area');
        const feedbackContent = document.getElementById('feedback-content');
        
        feedbackArea.className = `feedback-area ${isCorrect ? 'correct' : 'wrong'}`;
        
        let feedbackHTML = '';
        if (isCorrect) {
            feedbackHTML = `
                <div class="feedback-icon">🎉</div>
                <div class="feedback-text">回答正确！</div>
            `;
            
            if (this.streakCount >= 3) {
                feedbackHTML += `<div class="feedback-streak">🔥 ${this.streakCount} 连击！</div>`;
            }
        } else {
            feedbackHTML = `
                <div class="feedback-icon">😅</div>
                <div class="feedback-text">回答错误</div>
            `;
            
            if (question.explanation) {
                feedbackHTML += `<div class="feedback-explanation">${question.explanation}</div>`;
            }
            
            if (question.fullAnswer) {
                feedbackHTML += `<div class="feedback-answer">正确答案: ${question.fullAnswer}</div>`;
            } else if (question.answer) {
                const answer = Array.isArray(question.answer) ? question.answer[0] : question.answer;
                feedbackHTML += `<div class="feedback-answer">正确答案: ${answer}</div>`;
            }
        }
        
        feedbackContent.innerHTML = feedbackHTML;
        feedbackArea.classList.remove('hidden');
    }
    
    // 下一题
    nextQuestion() {
        this.currentQuestionIndex++;
        this.currentAnswer = null;
        
        if (this.currentQuestionIndex >= this.lessonQuestions.length) {
            this.finishLesson();
        } else {
            this.renderQuestion();
            this.updateLessonProgress();
        }
    }
    
    // 更新课程进度条
    updateLessonProgress() {
        const progress = (this.currentQuestionIndex / this.lessonQuestions.length) * 100;
        document.getElementById('lesson-progress').style.width = `${progress}%`;
    }
    
    // 完成课程
    finishLesson() {
        // 标记课程完成
        if (!this.userData.completedLessons.has(this.currentLesson.id)) {
            this.userData.completedLessons.add(this.currentLesson.id);
        }
        
        // 计算奖励
        const accuracy = this.lessonQuestions.length > 0 
            ? Math.round((this.lessonCorrect / this.lessonQuestions.length) * 100) 
            : 0;
        
        const xpGained = Math.round(20 * (accuracy / 100));
        const gemsGained = accuracy === 100 ? 5 : accuracy >= 80 ? 3 : 1;
        
        this.userData.xp += xpGained;
        this.userData.gems += gemsGained;
        
        // 更新连胜
        const today = new Date().toDateString();
        if (this.userData.lastStudyDate !== today) {
            this.userData.streak++;
            this.userData.lastStudyDate = today;
        }
        
        // 每日进度
        this.userData.dailyProgress = Math.min(3, this.userData.dailyProgress + 1);
        
        // 检查升级
        this.checkLevelUp();
        
        // 检查成就
        this.checkAchievements();
        
        // 检查解锁新课程
        this.checkUnlockCourses();
        
        this.saveUserData();
        
        // 显示结果
        this.showResult(xpGained, gemsGained, accuracy);
    }
    
    // 检查升级
    checkLevelUp() {
        const xpNeeded = this.userData.level * 100;
        if (this.userData.xp >= xpNeeded) {
            this.userData.xp -= xpNeeded;
            this.userData.level++;
            this.showNotification(`🎉 升级到 ${this.userData.level} 级！`, 'success');
        }
    }
    
    // 检查成就
    checkAchievements() {
        const completedCount = this.userData.completedLessons.size;
        
        // 基础成就
        if (completedCount >= 1 && !this.userData.achievements.has('first-lesson')) {
            this.userData.achievements.add('first-lesson');
            this.showNotification('🏆 解锁成就：初次学习！', 'success');
        }
        
        if (this.userData.streak >= 3 && !this.userData.achievements.has('streak-3')) {
            this.userData.achievements.add('streak-3');
            this.showNotification('🏆 解锁成就：三日连胜！', 'success');
        }
        
        if (this.userData.streak >= 7 && !this.userData.achievements.has('streak-7')) {
            this.userData.achievements.add('streak-7');
            this.showNotification('🏆 解锁成就：一周连胜！', 'success');
        }
        
        if (this.userData.streak >= 30 && !this.userData.achievements.has('streak-30')) {
            this.userData.achievements.add('streak-30');
            this.showNotification('🏆 解锁成就：学习达人！', 'success');
        }
        
        // 连击成就
        if (this.streakCount >= 5 && !this.userData.achievements.has('perfect-5')) {
            this.userData.achievements.add('perfect-5');
            this.showNotification('🏆 解锁成就：完美答题！', 'success');
        }
        
        if (this.streakCount >= 10 && !this.userData.achievements.has('perfect-10')) {
            this.userData.achievements.add('perfect-10');
            this.showNotification('🏆 解锁成就：答题高手！', 'success');
        }
        
        // 语音成就
        if (this.userData.voicePractices >= 10 && !this.userData.achievements.has('voice-master')) {
            this.userData.achievements.add('voice-master');
            this.showNotification('🏆 解锁成就：发音达人！', 'success');
        }
        
        // 配对成就
        if (this.userData.matchingCompleted >= 20 && !this.userData.achievements.has('matching-expert')) {
            this.userData.achievements.add('matching-expert');
            this.showNotification('🏆 解锁成就：配对专家！', 'success');
        }
        
        // 听力成就
        if (this.userData.listeningCompleted >= 20 && !this.userData.achievements.has('listening-pro')) {
            this.userData.achievements.add('listening-pro');
            this.showNotification('🏆 解锁成就：听力高手！', 'success');
        }
        
        // PK成就
        if (this.userData.pkWins >= 5 && !this.userData.achievements.has('pk-winner')) {
            this.userData.achievements.add('pk-winner');
            this.showNotification('🏆 解锁成就：PK王者！', 'success');
        }
        
        // 检查课程完成成就
        const courses = ['business-english', 'business-japanese', 'freight-english', 'customs-english'];
        const achievementIds = ['master-be', 'master-bj', 'master-fe', 'master-ce'];
        
        courses.forEach((courseId, index) => {
            if (!this.userData.achievements.has(achievementIds[index])) {
                const course = COURSES_DATA[courseId];
                const totalLessons = course.units.reduce((sum, unit) => sum + unit.lessons.length, 0);
                const completedInCourse = course.units.reduce((sum, unit) => {
                    return sum + unit.lessons.filter(l => this.userData.completedLessons.has(l.id)).length;
                }, 0);
                
                if (completedInCourse >= totalLessons) {
                    this.userData.achievements.add(achievementIds[index]);
                    this.showNotification(`🏆 解锁成就：${course.name}大师！`, 'success');
                }
            }
        });
        
        // 检查是否解锁所有课程成就
        if (this.userData.unlockedCourses.size >= 3 && !this.userData.achievements.has('collector')) {
            this.userData.achievements.add('collector');
            this.showNotification('🏆 解锁成就：课程收藏家！', 'success');
        }
    }
    
    // 检查解锁新课程
    checkUnlockCourses() {
        // 商务英语完成一定进度后解锁商务日语
        const beProgress = this.calculateCourseProgress('business-english');
        if (beProgress >= 30 && !this.userData.unlockedCourses.has('business-japanese')) {
            this.userData.unlockedCourses.add('business-japanese');
            this.showNotification('🔓 解锁新课程：商务日语！', 'success');
        }
        
        // 商务日语完成一定进度后解锁货代英语
        const bjProgress = this.calculateCourseProgress('business-japanese');
        if (bjProgress >= 20 && !this.userData.unlockedCourses.has('freight-english')) {
            this.userData.unlockedCourses.add('freight-english');
            this.showNotification('🔓 解锁新课程：货代英语！', 'success');
        }
    }
    
    // 显示结果
    showResult(xp, gems, accuracy) {
        this.showScreen('result-screen');
        
        // 星级评价
        const stars = document.querySelectorAll('#result-stars .star');
        const starCount = accuracy === 100 ? 3 : accuracy >= 70 ? 2 : 1;
        stars.forEach((star, index) => {
            star.style.opacity = index < starCount ? '1' : '0.3';
        });
        
        // 结果标题
        const titles = {
            3: '完美! 🌟',
            2: '很好! 👍',
            1: '不错! 💪'
        };
        document.getElementById('result-title').textContent = titles[starCount];
        
        // 统计数据
        document.getElementById('result-xp').textContent = `+${xp} XP`;
        document.getElementById('result-gems').textContent = `+${gems} 💎`;
        document.getElementById('result-accuracy').textContent = `${accuracy}%`;
    }
    
    // 关闭课程
    closeLesson() {
        if (confirm('确定要退出当前课程吗？进度将不会保存。')) {
            this.showScreen('menu-screen');
        }
    }
    
    // 开始每日挑战
    startDailyChallenge() {
        if (this.userData.dailyProgress >= 3) {
            this.showNotification('今日挑战已完成！明天再来吧。', 'info');
            return;
        }
        
        // 随机选择一个未完成的课程
        const course = COURSES_DATA[this.currentCourse];
        let availableLessons = [];
        
        course.units.forEach(unit => {
            unit.lessons.forEach(lesson => {
                if (!this.userData.completedLessons.has(lesson.id)) {
                    availableLessons.push(lesson);
                }
            });
        });
        
        if (availableLessons.length === 0) {
            course.units.forEach(unit => {
                availableLessons.push(...unit.lessons);
            });
        }
        
        const randomLesson = availableLessons[Math.floor(Math.random() * availableLessons.length)];
        this.startLesson(randomLesson);
    }
    
    // 开始PK模式
    startPKMode() {
        this.showNotification('正在匹配对手...', 'info');
        
        // 模拟匹配对手
        setTimeout(() => {
            const opponents = [
                { name: '小明', level: 5 },
                { name: '小红', level: 3 },
                { name: '小李', level: 7 },
                { name: '小张', level: 4 }
            ];
            
            this.pkOpponent = opponents[Math.floor(Math.random() * opponents.length)];
            this.pkMode = true;
            this.pkTimeLeft = 60;
            
            this.showNotification(`匹配成功！对手: ${this.pkOpponent.name} (Lv.${this.pkOpponent.level})`, 'success');
            
            // 开始对战课程
            this.startDailyChallenge();
        }, 1500);
    }
    
    // 开始语音练习
    startVoicePractice() {
        const voiceQuestions = [
            { text: 'Nice to meet you.', language: 'en-US' },
            { text: 'How do you do?', language: 'en-US' },
            { text: 'Thank you very much.', language: 'en-US' },
            { text: 'こんにちは', language: 'ja-JP' },
            { text: 'ありがとうございます', language: 'ja-JP' }
        ];
        
        const randomQuestion = voiceQuestions[Math.floor(Math.random() * voiceQuestions.length)];
        
        // 创建临时题目
        const tempQuestion = {
            type: 'speaking',
            question: '请朗读以下句子',
            text: randomQuestion.text,
            language: randomQuestion.language
        };
        
        this.currentLesson = { id: 'voice-practice', questions: [tempQuestion] };
        this.currentQuestionIndex = 0;
        this.lessonQuestions = [tempQuestion];
        this.lessonCorrect = 0;
        this.lessonWrong = 0;
        this.currentAnswer = null;
        
        this.showScreen('lesson-screen');
        this.renderQuestion();
    }
    
    // 渲染成就
    renderAchievements() {
        const container = document.getElementById('achievement-grid');
        container.innerHTML = '';
        
        ACHIEVEMENTS_DATA.forEach(achievement => {
            const isUnlocked = this.userData.achievements.has(achievement.id);
            const achievementEl = document.createElement('div');
            achievementEl.className = `achievement-item ${isUnlocked ? 'unlocked' : 'locked'}`;
            achievementEl.innerHTML = `
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-name">${achievement.name}</div>
            `;
            achievementEl.title = achievement.desc;
            container.appendChild(achievementEl);
        });
    }
    
    // 渲染排行榜
    renderRanking() {
        const container = document.getElementById('ranking-list');
        const mockUsers = [
            { name: '小明', xp: 1250 },
            { name: '小红', xp: 980 },
            { name: '小李', xp: 850 },
            { name: '你', xp: this.userData.xp + (this.userData.level - 1) * 100 },
            { name: '小张', xp: 620 }
        ];
        
        mockUsers.sort((a, b) => b.xp - a.xp);
        
        container.innerHTML = mockUsers.map((user, index) => `
            <div class="ranking-item ${user.name === '你' ? 'current-user' : ''}">
                <span class="rank">${index + 1}</span>
                <span class="name">${user.name}</span>
                <span class="xp">${user.xp} XP</span>
            </div>
        `).join('');
    }
    
    // 更新UI
    updateUI() {
        document.getElementById('user-level').textContent = this.userData.level;
        document.getElementById('streak-count').textContent = this.userData.streak;
        document.getElementById('gem-count').textContent = this.userData.gems;
        document.getElementById('heart-count').textContent = this.userData.hearts;
        document.getElementById('daily-progress').textContent = `${this.userData.dailyProgress}/3`;
        
        // 经验条
        const xpNeeded = this.userData.level * 100;
        const xpProgress = (this.userData.xp / xpNeeded) * 100;
        document.getElementById('xp-progress').style.width = `${xpProgress}%`;
    }
    
    // 切换屏幕
    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    }
    
    // 播放音效
    playSound(type) {
        const sound = document.getElementById(`sound-${type}`);
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(() => {});
        }
    }
    
    // 显示通知
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// 初始化游戏
document.addEventListener('DOMContentLoaded', () => {
    window.game = new LanguageMasterGame();
});
