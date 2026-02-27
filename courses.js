// 课程数据 - 商务英语、商务日语、货代英语、关务英语
const COURSES_DATA = {
    'business-english': {
        id: 'business-english',
        name: '商务英语',
        description: '掌握职场英语，提升商务沟通能力',
        icon: '💼',
        color: '#58CC02',
        units: [
            {
                id: 1,
                title: '职场基础',
                description: '学习基本的职场问候和自我介绍',
                lessons: [
                    {
                        id: 'be-1-1',
                        title: '问候与介绍',
                        questions: [
                            {
                                type: 'choice',
                                question: '请选择正确的商务问候语',
                                options: [
                                    { text: 'Nice to meet you.', correct: true },
                                    { text: 'What\'s up?', correct: false },
                                    { text: 'See you later.', correct: false },
                                    { text: 'Good night.', correct: false }
                                ],
                                explanation: '在商务场合，"Nice to meet you." 是最得体的初次见面问候语。'
                            },
                            {
                                type: 'translation',
                                question: '选择正确的单词完成句子',
                                sentence: 'My {blank} is Li Ming.',
                                blanks: [{ answer: ['name'] }],
                                distractors: ['names', 'named', 'naming'],
                                hint: '名字'
                            },
                            {
                                type: 'choice',
                                question: '"How do you do?" 的正确回应是：',
                                options: [
                                    { text: 'How do you do?', correct: true },
                                    { text: 'Fine, thank you.', correct: false },
                                    { text: 'I\'m good.', correct: false },
                                    { text: 'Nice to meet you too.', correct: false }
                                ],
                                explanation: '"How do you do?" 是正式问候语，回应也用 "How do you do?"'
                            },
                            {
                                type: 'fill-blank',
                                question: '请补全句子：_____ (请) have a seat.',
                                answer: ['Please'],
                                hint: '表示礼貌请求的单词'
                            },
                            {
                                type: 'listening',
                                question: '听录音，选择听到的句子',
                                audio: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZSA0PVanu8LdnHgU1kNbxz4AzBhxqv+zplkcODVGm5O+4ZSAEMYrO89GFNwYdcfDr4ZdJDQtPp+XysWUeBjiS1/LNfi0GI33R8tOENAcdcO/r4phJDQxPp+XyxGUhBjqT1/PQfS4GI3/R8tSFNwYdcfDr4plHDAtQp+TwxmUgBDeOzvPVhjYGHG3A7+SaSQ0MTKjl8sZmIAU2jc7z1YU1Bhxwv+zmm0gNC1Gn5O/EZSAFNo/M89CEMwYccPDs4ppIDQtRp+TvvWUfBTiOz/PShjUGG3Dw7OKbSA0LUqjl8b1kHwU3jM/z0oU1Bxtw8OzhmUgNC1Ko5fG+ZSAF',
                                options: [
                                    { text: 'Nice to meet you.', correct: true },
                                    { text: 'Good to see you.', correct: false },
                                    { text: 'Pleased to meet you.', correct: false }
                                ],
                                explanation: '录音中的句子是 "Nice to meet you."'
                            },
                            {
                                type: 'translation',
                                question: '选择正确的单词完成句子',
                                sentence: 'I am a {blank} {blank}.',
                                blanks: [{ answer: ['sales'] }, { answer: ['manager'] }],
                                distractors: ['sale', 'manage', 'managers', 'director'],
                                hint: '销售经理'
                            },
                            {
                                type: 'choice',
                                question: '"Pleased to meet you." 的意思是：',
                                options: [
                                    { text: '很高兴见到您。', correct: true },
                                    { text: '请多关照。', correct: false },
                                    { text: '再见。', correct: false },
                                    { text: '谢谢。', correct: false }
                                ],
                                explanation: '"Pleased to meet you." = "很高兴见到您。"'
                            },
                            {
                                type: 'fill-blank',
                                question: '补全：Let me _____ (介绍) myself.',
                                answer: ['introduce'],
                                hint: 'introduce'
                            },
                            {
                                type: 'translation',
                                question: '选择正确的单词完成句子',
                                sentence: 'I work {blank} ABC Company.',
                                blanks: [{ answer: ['for', 'at', 'in'] }],
                                distractors: ['with', 'by', 'on'],
                                hint: '在...工作'
                            },
                            {
                                type: 'choice',
                                question: '"Good morning" 应该什么时候使用？',
                                options: [
                                    { text: '上午', correct: true },
                                    { text: '下午', correct: false },
                                    { text: '晚上', correct: false },
                                    { text: '任何时间', correct: false }
                                ],
                                explanation: '"Good morning" 只在上午使用。'
                            }
                        ]
                    },
                    {
                        id: 'be-1-2',
                        title: '电话用语',
                        questions: [
                            {
                                type: 'choice',
                                question: '接听商务电话时，应该首先说：',
                                options: [
                                    { text: 'Hello, this is ABC Company.', correct: true },
                                    { text: 'Who are you?', correct: false },
                                    { text: 'What do you want?', correct: false },
                                    { text: 'Yes?', correct: false }
                                ],
                                explanation: '商务电话应首先报出公司名称，显得专业礼貌。'
                            },
                            {
                                type: 'fill-blank',
                                question: '请补全：May I _____ (询问) who\'s calling?',
                                answer: ['ask'],
                                hint: '询问的动词'
                            },
                            {
                                type: 'choice',
                                question: '"请稍等" 的商务表达是：',
                                options: [
                                    { text: 'Please hold.', correct: true },
                                    { text: 'Wait a moment.', correct: false },
                                    { text: 'Stop there.', correct: false },
                                    { text: 'Don\'t move.', correct: false }
                                ],
                                explanation: '"Please hold." 是电话用语中表示"请稍等"的标准说法。'
                            },
                            {
                                type: 'translation',
                                question: '选择正确的单词完成句子',
                                sentence: 'I will {blank} you to the {blank} department.',
                                blanks: [{ answer: ['transfer'] }, { answer: ['sales'] }],
                                distractors: ['move', 'send', 'marketing', 'HR'],
                                hint: '转接到销售部'
                            },
                            {
                                type: 'choice',
                                question: '"May I take a message?" 的意思是：',
                                options: [
                                    { text: '需要我帮您留言吗？', correct: true },
                                    { text: '我可以接电话吗？', correct: false },
                                    { text: '我能发信息吗？', correct: false },
                                    { text: '请留言。', correct: false }
                                ],
                                explanation: '"May I take a message?" = "需要我帮您留言吗？"'
                            },
                            {
                                type: 'fill-blank',
                                question: '补全：He is not {blank} ( available ) right now.',
                                answer: ['available'],
                                hint: '有空的'
                            },
                            {
                                type: 'translation',
                                question: '选择正确的单词完成句子',
                                sentence: 'Could I {blank} a message?',
                                blanks: [{ answer: ['take', 'leave'] }],
                                distractors: ['give', 'write', 'send', 'make'],
                                hint: '留言'
                            },
                            {
                                type: 'choice',
                                question: '"I\'ll put you through." 的意思是：',
                                options: [
                                    { text: '我帮您转接。', correct: true },
                                    { text: '我帮您挂断。', correct: false },
                                    { text: '我帮您留言。', correct: false },
                                    { text: '我帮您接听。', correct: false }
                                ],
                                explanation: '"put through" = 转接电话'
                            },
                            {
                                type: 'fill-blank',
                                question: '补全：_____ ( 对不起 ), he is on another call.',
                                answer: ['Sorry'],
                                hint: 'Sorry'
                            },
                            {
                                type: 'translation',
                                question: '选择正确的单词完成句子',
                                sentence: 'I will {blank} him you called.',
                                blanks: [{ answer: ['tell'] }],
                                distractors: ['say', 'speak', 'talk'],
                                hint: '告诉他'
                            }
                        ]
                    },
                    {
                        id: 'be-1-3',
                        title: '单词配对',
                        questions: [
                            {
                                type: 'matching',
                                question: '将左侧的单词与右侧的正确释义配对',
                                pairs: [
                                    { left: 'schedule', right: '日程安排', id: 1 },
                                    { left: 'deadline', right: '截止日期', id: 2 },
                                    { left: 'conference', right: '会议', id: 3 },
                                    { left: 'negotiation', right: '谈判', id: 4 }
                                ],
                                explanation: '这些是商务英语中最常用的词汇。'
                            },
                            {
                                type: 'sorting',
                                question: '将以下句子按正确的商务邮件结构排序',
                                items: [
                                    { text: 'Dear Mr. Smith,', order: 1 },
                                    { text: 'I am writing to inquire about...', order: 2 },
                                    { text: 'Please find attached...', order: 3 },
                                    { text: 'Best regards,', order: 4 },
                                    { text: 'John Doe', order: 5 }
                                ],
                                explanation: '商务邮件的标准结构：称呼 → 正文开头 → 正文内容 → 结尾敬语 → 署名'
                            },
                            {
                                type: 'choice',
                                question: '"schedule" 的意思是：',
                                options: [
                                    { text: '日程安排', correct: true },
                                    { text: '时间表', correct: false },
                                    { text: '计划', correct: false },
                                    { text: '行程', correct: false }
                                ],
                                explanation: 'schedule = 日程安排、时间表'
                            },
                            {
                                type: 'translation',
                                question: '选择正确的单词完成句子',
                                sentence: 'The {blank} is next Friday.',
                                blanks: [{ answer: ['deadline'] }],
                                distractors: ['schedule', 'time', 'date'],
                                hint: '截止日期'
                            },
                            {
                                type: 'fill-blank',
                                question: '补全：We have a {blank} (会议) at 3 PM.',
                                answer: ['conference', 'meeting'],
                                hint: '会议'
                            },
                            {
                                type: 'choice',
                                question: '"negotiation" 的意思是：',
                                options: [
                                    { text: '谈判', correct: true },
                                    { text: '协商', correct: false },
                                    { text: '讨论', correct: false },
                                    { text: '会议', correct: false }
                                ],
                                explanation: 'negotiation = 谈判、协商'
                            },
                            {
                                type: 'translation',
                                question: '选择正确的单词完成句子',
                                sentence: 'Let\'s {blank} the schedule.',
                                blanks: [{ answer: ['check'] }],
                                distractors: ['see', 'look', 'watch'],
                                hint: '查看'
                            },
                            {
                                type: 'matching',
                                question: '将单词与反义词配对',
                                pairs: [
                                    { left: 'start', right: 'finish', id: 1 },
                                    { left: 'early', right: 'late', id: 2 },
                                    { left: 'agree', right: 'disagree', id: 3 },
                                    { left: 'accept', right: 'reject', id: 4 }
                                ],
                                explanation: '这些是商务英语中常用的反义词。'
                            },
                            {
                                type: 'fill-blank',
                                question: '补全：Please {blank} (确认) the meeting time.',
                                answer: ['confirm'],
                                hint: '确认'
                            },
                            {
                                type: 'choice',
                                question: '"appointment" 的意思是：',
                                options: [
                                    { text: '预约', correct: true },
                                    { text: '约定', correct: false },
                                    { text: '任命', correct: false },
                                    { text: '职位', correct: false }
                                ],
                                explanation: 'appointment = 预约、约会'
                            }
                        ]
                    }
                ]
            }
        ]
    },
    
    'business-japanese': {
        id: 'business-japanese',
        name: '商务日语',
        description: '学习日本商务礼仪和敬语表达',
        icon: '🗾',
        color: '#FF9600',
        units: [
            {
                id: 1,
                title: '敬语基础',
                description: '学习日语敬语的基本用法',
                lessons: [
                    {
                        id: 'bj-1-1',
                        title: '问候敬语',
                        questions: [
                            {
                                type: 'choice',
                                question: '「您好」的礼貌说法是：',
                                options: [
                                    { text: 'こんにちは', correct: true },
                                    { text: 'やあ', correct: false },
                                    { text: 'おっす', correct: false },
                                    { text: 'どうも', correct: false }
                                ],
                                explanation: '「こんにちは」是商务场合最标准的问候语。'
                            },
                            {
                                type: 'translation',
                                question: '选择正确的单词完成句子',
                                sentence: 'これからよろしくお{blank}します。',
                                blanks: [{ answer: ['願い', 'ねがい'] }],
                                distractors: ['祈り', '求め', '望み'],
                                hint: '请多关照'
                            },
                            {
                                type: 'choice',
                                question: '「初次见面」的敬语表达是：',
                                options: [
                                    { text: 'はじめまして', correct: true },
                                    { text: 'はじめて', correct: false },
                                    { text: 'さいしょ', correct: false },
                                    { text: 'いちど', correct: false }
                                ],
                                explanation: '「はじめまして」是初次见面的标准敬语。'
                            },
                            {
                                type: 'fill-blank',
                                question: '补全：おはよう＿＿＿＿＿（早上好，礼貌说法）。',
                                answer: ['ございます'],
                                hint: 'ございます'
                            },
                            {
                                type: 'translation',
                                question: '选择正确的单词完成句子',
                                sentence: '{blank}、山田です。',
                                blanks: [{ answer: ['はじめまして'] }],
                                distractors: ['こんにちは', 'さようなら', 'おはよう'],
                                hint: '初次见面'
                            },
                            {
                                type: 'choice',
                                question: '「谢谢」最礼貌的说法是：',
                                options: [
                                    { text: 'ありがとうございます', correct: true },
                                    { text: 'ありがとう', correct: false },
                                    { text: 'サンキュー', correct: false },
                                    { text: 'どうも', correct: false }
                                ],
                                explanation: '「ありがとうございます」是商务场合最礼貌的感谢表达。'
                            },
                            {
                                type: 'matching',
                                question: '将问候语与使用场合配对',
                                pairs: [
                                    { left: 'おはようございます', right: '早上', id: 1 },
                                    { left: 'こんにちは', right: '白天', id: 2 },
                                    { left: 'こんばんは', right: '晚上', id: 3 },
                                    { left: 'さようなら', right: '告别', id: 4 }
                                ],
                                explanation: '不同时段使用不同的问候语。'
                            },
                            {
                                type: 'sorting',
                                question: '将以下问候语按一天中的时间顺序排列',
                                items: [
                                    { text: 'おはようございます', order: 1 },
                                    { text: 'こんにちは', order: 2 },
                                    { text: 'こんばんは', order: 3 },
                                    { text: 'おやすみなさい', order: 4 }
                                ],
                                explanation: '时间顺序：早上好 → 你好 → 晚上好 → 晚安'
                            },
                            {
                                type: 'translation',
                                question: '选择正确的单词完成句子',
                                sentence: '失礼{blank}（打扰一下）。',
                                blanks: [{ answer: ['いたします', 'します'] }],
                                distractors: ['なります', 'あります', 'います'],
                                hint: '自谦语'
                            },
                            {
                                type: 'choice',
                                question: '「对不起」最礼貌的说法是：',
                                options: [
                                    { text: '申し訳ございません', correct: true },
                                    { text: 'ごめんなさい', correct: false },
                                    { text: 'すみません', correct: false },
                                    { text: 'わるい', correct: false }
                                ],
                                explanation: '「申し訳ございません」是商务场合最正式的道歉表达。'
                            }
                        ]
                    },
                    {
                        id: 'bj-1-2',
                        title: '自谦语',
                        questions: [
                            {
                                type: 'choice',
                                question: '「我说」的自谦语是：',
                                options: [
                                    { text: '申します', correct: true },
                                    { text: '言います', correct: false },
                                    { text: '話します', correct: false },
                                    { text: '語ります', correct: false }
                                ],
                                explanation: '「申します」是「言う」的自谦语。'
                            },
                            {
                                type: 'translation',
                                question: '选择正确的单词完成句子',
                                sentence: '私は田中と{blank}します。',
                                blanks: [{ answer: ['申し', 'もうし'] }],
                                distractors: ['言い', '話し', '語り'],
                                hint: '自谦语'
                            },
                            {
                                type: 'choice',
                                question: '「我们公司」的谦称是：',
                                options: [
                                    { text: '弊社', correct: true },
                                    { text: '私社', correct: false },
                                    { text: '小社', correct: false },
                                    { text: '当社', correct: false }
                                ],
                                explanation: '「弊社(へいしゃ)」是对自己公司的谦称。'
                            },
                            {
                                type: 'translation',
                                question: '选择正确的单词完成句子',
                                sentence: 'ABC会社の田中と{blank}します。',
                                blanks: [{ answer: ['申し', 'もうし'] }],
                                distractors: ['言い', '話し', '語り'],
                                hint: '～と申します'
                            },
                            {
                                type: 'fill-blank',
                                question: '补全：＿＿＿＿＿（敝公司）の鈴木です。',
                                answer: ['弊社', 'へいしゃ'],
                                hint: '对自己公司的谦称'
                            },
                            {
                                type: 'matching',
                                question: '将普通形与自谦语配对',
                                pairs: [
                                    { left: '言う', right: '申す', id: 1 },
                                    { left: '行く', right: '参る', id: 2 },
                                    { left: '来る', right: '参る', id: 3 },
                                    { left: '知る', right: '存じる', id: 4 }
                                ],
                                explanation: '这些是常用的自谦语动词。'
                            },
                            {
                                type: 'translation',
                                question: '选择正确的单词完成句子',
                                sentence: '明日、東京へ{blank}します。',
                                blanks: [{ answer: ['参り', 'まいり'] }],
                                distractors: ['行き', '来', '赴き'],
                                hint: '自谦语，去'
                            },
                            {
                                type: 'choice',
                                question: '「我知道」的自谦语是：',
                                options: [
                                    { text: '存じております', correct: true },
                                    { text: '知っています', correct: false },
                                    { text: 'わかります', correct: false },
                                    { text: '理解します', correct: false }
                                ],
                                explanation: '「存じております」是「知る」的自谦语。'
                            },
                            {
                                type: 'sorting',
                                question: '将以下自我介绍按正确顺序排列',
                                items: [
                                    { text: 'はじめまして', order: 1 },
                                    { text: 'ABC会社の田中と申します', order: 2 },
                                    { text: 'よろしくお願いいたします', order: 3 }
                                ],
                                explanation: '自我介绍顺序：问候 → 介绍姓名公司 → 请多关照'
                            },
                            {
                                type: 'translation',
                                question: '选择正确的单词完成句子',
                                sentence: 'そのことは{blank}しております（知道那件事）。',
                                blanks: [{ answer: ['存じ', 'ぞんじ'] }],
                                distractors: ['知っ', 'わかっ', '理解し'],
                                hint: '自谦语'
                            }
                        ]
                    }
                ]
            }
        ]
    },
    
    'freight-english': {
        id: 'freight-english',
        name: '货代英语',
        description: '国际物流和货运代理专业英语',
        icon: '🚢',
        color: '#1CB0F6',
        units: [
            {
                id: 1,
                title: '货运基础',
                description: '学习货运代理的基本术语',
                lessons: [
                    {
                        id: 'fe-1-1',
                        title: '运输方式',
                        questions: [
                            {
                                type: 'choice',
                                question: '"FOB" 的意思是：',
                                options: [
                                    { text: 'Free On Board 离岸价', correct: true },
                                    { text: 'Full Ocean Bill 海运提单', correct: false },
                                    { text: 'Freight On Board 船上运费', correct: false },
                                    { text: 'Free Of Bill 免单', correct: false }
                                ],
                                explanation: 'FOB (Free On Board) 表示货物越过船舷后风险转移给买方。'
                            },
                            {
                                type: 'choice',
                                question: '"CIF" 包含哪些费用？',
                                options: [
                                    { text: 'Cost, Insurance and Freight', correct: true },
                                    { text: 'Cargo, Insurance and Fee', correct: false },
                                    { text: 'Cost, Import and Freight', correct: false },
                                    { text: 'Container, Insurance and Freight', correct: false }
                                ],
                                explanation: 'CIF = Cost (成本) + Insurance (保险) + Freight (运费)'
                            },
                            {
                                type: 'fill-blank',
                                question: '补全：B/L 是 _____ 的缩写。',
                                answer: ['Bill of Lading', 'bill of lading'],
                                hint: '提单'
                            },
                            {
                                type: 'translation',
                                question: '选择正确的单词完成句子',
                                sentence: 'We ship goods by {blank}.',
                                blanks: [{ answer: ['sea', 'air'] }],
                                distractors: ['land', 'road', 'train'],
                                hint: '海运/空运'
                            },
                            {
                                type: 'choice',
                                question: '"集装箱" 的英文是：',
                                options: [
                                    { text: 'Container', correct: true },
                                    { text: 'Box', correct: false },
                                    { text: 'Cargo', correct: false },
                                    { text: 'Package', correct: false }
                                ],
                                explanation: 'Container 是货运行业的标准术语。'
                            },
                            {
                                type: 'matching',
                                question: '将贸易条款与含义配对',
                                pairs: [
                                    { left: 'EXW', right: '工厂交货', id: 1 },
                                    { left: 'FOB', right: '离岸价', id: 2 },
                                    { left: 'CIF', right: '到岸价', id: 3 },
                                    { left: 'DDP', right: '完税后交货', id: 4 }
                                ],
                                explanation: '这些是国际贸易中最常用的贸易条款。'
                            },
                            {
                                type: 'translation',
                                question: '选择正确的单词完成句子',
                                sentence: 'The goods are shipped in a {blank}.',
                                blanks: [{ answer: ['container'] }],
                                distractors: ['box', 'package', 'carton'],
                                hint: '集装箱'
                            },
                            {
                                type: 'fill-blank',
                                question: '补全：EXW means Ex {blank}.',
                                answer: ['Works', 'works'],
                                hint: '工厂'
                            },
                            {
                                type: 'choice',
                                question: '"运费" 的英文是：',
                                options: [
                                    { text: 'Freight', correct: true },
                                    { text: 'Fee', correct: false },
                                    { text: 'Charge', correct: false },
                                    { text: 'Cost', correct: false }
                                ],
                                explanation: 'Freight 指运费，尤指海运或空运费用。'
                            },
                            {
                                type: 'sorting',
                                question: '将以下货运流程按正确顺序排列',
                                items: [
                                    { text: 'Booking space', order: 1 },
                                    { text: 'Cargo pickup', order: 2 },
                                    { text: 'Customs declaration', order: 3 },
                                    { text: 'Loading on vessel', order: 4 },
                                    { text: 'Bill of lading issued', order: 5 }
                                ],
                                explanation: '货运流程：订舱 → 提货 → 报关 → 装船 → 签发提单'
                            }
                        ]
                    }
                ]
            }
        ]
    },
    
    'customs-english': {
        id: 'customs-english',
        name: '关务英语',
        description: '海关事务、报关报检专业英语',
        icon: '🛃',
        color: '#9B59B6',
        units: [
            {
                id: 1,
                title: '报关基础',
                description: '学习报关基本术语和流程',
                lessons: [
                    {
                        id: 'ce-1-1',
                        title: '报关术语',
                        questions: [
                            {
                                type: 'choice',
                                question: '"报关" 的英文是：',
                                options: [
                                    { text: 'Customs Declaration', correct: true },
                                    { text: 'Customs Clearance', correct: false },
                                    { text: 'Import Declaration', correct: false },
                                    { text: 'Export Declaration', correct: false }
                                ],
                                explanation: 'Customs Declaration 是"报关"的标准说法。'
                            },
                            {
                                type: 'choice',
                                question: '"海关编码" 的英文是：',
                                options: [
                                    { text: 'HS Code', correct: true },
                                    { text: 'Customs Number', correct: false },
                                    { text: 'Product Code', correct: false },
                                    { text: 'Tariff Number', correct: false }
                                ],
                                explanation: 'HS Code (Harmonized System Code) 是海关编码的国际标准。'
                            },
                            {
                                type: 'fill-blank',
                                question: '补全：CIQ 是 China Inspection and _____ 的缩写。',
                                answer: ['Quarantine'],
                                hint: '检疫'
                            },
                            {
                                type: 'translation',
                                question: '选择正确的单词完成句子',
                                sentence: 'Please provide {blank} declaration.',
                                blanks: [{ answer: ['customs'] }],
                                distractors: ['custom', 'declare', 'clearance'],
                                hint: '报关'
                            },
                            {
                                type: 'choice',
                                question: 'HS编码共有几位数字？',
                                options: [
                                    { text: '10位', correct: true },
                                    { text: '8位', correct: false },
                                    { text: '6位', correct: false },
                                    { text: '12位', correct: false }
                                ],
                                explanation: '中国海关使用10位HS编码，前6位是国际通用编码。'
                            },
                            {
                                type: 'matching',
                                question: '将报关单证与用途配对',
                                pairs: [
                                    { left: 'Packing List', right: '装箱明细', id: 1 },
                                    { left: 'Commercial Invoice', right: '交易凭证', id: 2 },
                                    { left: 'Bill of Lading', right: '提货凭证', id: 3 },
                                    { left: 'Certificate of Origin', right: '原产地证明', id: 4 }
                                ],
                                explanation: '这些是报关必需的基本单证。'
                            },
                            {
                                type: 'translation',
                                question: '选择正确的单词完成句子',
                                sentence: 'The {blank} code is 8542.31.00.',
                                blanks: [{ answer: ['HS'] }],
                                distractors: ['customs', 'product', 'tariff'],
                                hint: '海关编码'
                            },
                            {
                                type: 'fill-blank',
                                question: '补全：We need to pay customs {blank}.',
                                answer: ['duties', 'duty'],
                                hint: '关税'
                            },
                            {
                                type: 'choice',
                                question: '"最惠国税率" 的英文是：',
                                options: [
                                    { text: 'MFN Rate', correct: true },
                                    { text: 'General Rate', correct: false },
                                    { text: 'Preferential Rate', correct: false },
                                    { text: 'Temporary Rate', correct: false }
                                ],
                                explanation: 'MFN (Most Favored Nation) Rate 是最惠国税率。'
                            },
                            {
                                type: 'sorting',
                                question: '将以下报关流程按正确顺序排列',
                                items: [
                                    { text: 'Prepare documents', order: 1 },
                                    { text: 'Submit declaration', order: 2 },
                                    { text: 'Customs inspection', order: 3 },
                                    { text: 'Pay duties', order: 4 },
                                    { text: 'Cargo release', order: 5 }
                                ],
                                explanation: '报关流程：准备单证 → 申报 → 查验 → 缴税 → 放行'
                            }
                        ]
                    }
                ]
            }
        ]
    }
};

// 成就系统数据
const ACHIEVEMENTS_DATA = [
    { id: 'first-lesson', name: '初次学习', icon: '📚', desc: '完成第一节课', condition: 'complete 1 lesson' },
    { id: 'streak-3', name: '三日连胜', icon: '🔥', desc: '连续学习3天', condition: 'streak 3 days' },
    { id: 'streak-7', name: '一周连胜', icon: '🔥', desc: '连续学习7天', condition: 'streak 7 days' },
    { id: 'streak-30', name: '学习达人', icon: '🔥', desc: '连续学习30天', condition: 'streak 30 days' },
    { id: 'perfect-5', name: '完美答题', icon: '⭐', desc: '连续5题全对', condition: 'perfect 5 questions' },
    { id: 'perfect-10', name: '答题高手', icon: '⭐', desc: '连续10题全对', condition: 'perfect 10 questions' },
    { id: 'collector', name: '课程收藏家', icon: '🏆', desc: '解锁所有课程', condition: 'unlock all courses' },
    { id: 'master-be', name: '商务英语大师', icon: '💼', desc: '完成商务英语所有单元', condition: 'complete business-english' },
    { id: 'master-bj', name: '商务日语大师', icon: '🗾', desc: '完成商务日语所有单元', condition: 'complete business-japanese' },
    { id: 'master-fe', name: '货代英语大师', icon: '🚢', desc: '完成货代英语所有单元', condition: 'complete freight-english' },
    { id: 'master-ce', name: '关务英语大师', icon: '🛃', desc: '完成关务英语所有单元', condition: 'complete customs-english' },
    { id: 'voice-master', name: '发音达人', icon: '🎤', desc: '完成10次语音练习', condition: 'voice practice 10 times' },
    { id: 'pk-winner', name: 'PK王者', icon: '⚔️', desc: '赢得5次对战', condition: 'win 5 pk battles' },
    { id: 'matching-expert', name: '配对专家', icon: '🔄', desc: '完成20道配对题', condition: 'complete 20 matching questions' },
    { id: 'listening-pro', name: '听力高手', icon: '🎧', desc: '完成20道听力题', condition: 'complete 20 listening questions' }
];

// 商店商品数据
const SHOP_ITEMS = [
    { id: 'heart-refill', name: '体力补充', icon: '❤️', price: 10, desc: '补充全部体力' },
    { id: 'streak-freeze', name: '连胜保护', icon: '🧊', price: 20, desc: '保护连胜记录一天' },
    { id: 'double-xp', name: '双倍经验', icon: '⚡', price: 30, desc: '接下来3节课双倍经验' },
    { id: 'hint-pack', name: '提示包', icon: '💡', price: 15, desc: '获得5个提示' },
    { id: 'voice-pass', name: '语音通行证', icon: '🎤', price: 50, desc: '解锁所有语音练习' }
];

// 导出数据
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { COURSES_DATA, ACHIEVEMENTS_DATA, SHOP_ITEMS };
}
