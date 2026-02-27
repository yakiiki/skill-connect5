// 技能五子棋 - 技能系统配置

const SkillType = {
    OFFENSIVE: '攻击',
    DEFENSIVE: '防御',
    CONTROL: '控制',
    SPECIAL: '特殊'
};

const SkillTarget = {
    SELF: '自身',
    ENEMY: '敌方',
    BOARD: '棋盘',
    GLOBAL: '全局'
};

// 技能数据库 - 基于中国成语
const SKILLS_DATABASE = [
    // 等级 1 - 基础技能
    {
        id: 'wei_jiu_zhao',
        name: '围魏救赵',
        idiom: '围魏救赵',
        level: 1,
        type: SkillType.DEFENSIVE,
        target: SkillTarget.BOARD,
        description: '当对方即将形成五连时，可以交换棋盘上的两个棋子位置（必须包含对方的棋子）',
        effect: 'exchangePieces',
        icon: '🔄',
        cooldown: 0
    },
    {
        id: 'sheng_dong_ji',
        name: '声东击西',
        idiom: '声东击西',
        level: 1,
        type: SkillType.OFFENSIVE,
        target: SkillTarget.BOARD,
        description: '本回合落子位置会显示在错误的位置（偏移1格），实际位置只有你知晓',
        effect: 'deceivePlacement',
        icon: '🎭',
        cooldown: 0
    },
    {
        id: 'cao_chuan_jian',
        name: '草船借箭',
        idiom: '草船借箭',
        level: 1,
        type: SkillType.SPECIAL,
        target: SkillTarget.ENEMY,
        description: '复制对方上一个使用的技能（如果对方还未使用技能，则本技能无效）',
        effect: 'copySkill',
        icon: '📋',
        cooldown: 0
    },

    // 等级 2
    {
        id: 'fu_di_chou',
        name: '釜底抽薪',
        idiom: '釜底抽薪',
        level: 2,
        type: SkillType.CONTROL,
        target: SkillTarget.BOARD,
        description: '移除对方棋盘上1个棋子（不能移除会导致对方立即获胜的棋子）',
        effect: 'removePiece',
        icon: '❌',
        cooldown: 0
    },
    {
        id: 'hun_shui_mo',
        name: '浑水摸鱼',
        idiom: '浑水摸鱼',
        level: 2,
        type: SkillType.SPECIAL,
        target: SkillTarget.SELF,
        description: '随机获得一个你未选择的技能使用机会（一次性）',
        effect: 'randomSkill',
        icon: '🎲',
        cooldown: 0
    },
    {
        id: 'jin_chan_tuo',
        name: '金蝉脱壳',
        idiom: '金蝉脱壳',
        level: 2,
        type: SkillType.DEFENSIVE,
        target: SkillTarget.SELF,
        description: '本回合可以移动自己的1个棋子到相邻的空位，然后再正常落子',
        effect: 'movePiece',
        icon: '🦗',
        cooldown: 0
    },

    // 等级 3
    {
        id: 'guan_men_zuo',
        name: '关门捉贼',
        idiom: '关门捉贼',
        level: 3,
        type: SkillType.CONTROL,
        target: SkillTarget.BOARD,
        description: '封锁对方一个棋子的四周（使其无法向外延伸），持续2回合',
        effect: 'blockPiece',
        icon: '🚫',
        cooldown: 2
    },
    {
        id: 'yuan_jiao_jin',
        name: '远交近攻',
        idiom: '远交近攻',
        level: 3,
        type: SkillType.OFFENSIVE,
        target: SkillTarget.BOARD,
        description: '本回合可以在距离你任意棋子2格范围内的位置落子（无视距离限制）',
        effect: 'extendedRange',
        icon: '🎯',
        cooldown: 0
    },
    {
        id: 'jia_tao_shu',
        name: '假途灭虢',
        idiom: '假途灭虢',
        level: 3,
        type: SkillType.SPECIAL,
        target: SkillTarget.BOARD,
        description: '本回合落子后，如果形成活三，则额外获得一次落子机会',
        effect: 'extraMove',
        icon: '⚡',
        cooldown: 0
    },

    // 等级 4
    {
        id: 'tou_liang_huan',
        name: '偷梁换柱',
        idiom: '偷梁换柱',
        level: 4,
        type: SkillType.CONTROL,
        target: SkillTarget.BOARD,
        description: '将对方1个棋子变成你的棋子（不能转换会导致你立即获胜的棋子）',
        effect: 'convertPiece',
        icon: '🔄',
        cooldown: 0
    },
    {
        id: 'zhi_sang_ma',
        name: '指桑骂槐',
        idiom: '指桑骂槐',
        level: 4,
        type: SkillType.CONTROL,
        target: SkillTarget.ENEMY,
        description: '对方下回合不能使用技能，且必须在你指定的区域内落子',
        effect: 'restrictEnemy',
        icon: '👆',
        cooldown: 0
    },
    {
        id: 'jia_chi_bu',
        name: '假痴不癫',
        idiom: '假痴不癫',
        level: 4,
        type: SkillType.DEFENSIVE,
        target: SkillTarget.SELF,
        description: '本回合可以假装落子（实际不落子），但对方会看到你"落子"的假象',
        effect: 'fakeMove',
        icon: '🎪',
        cooldown: 0
    },

    // 等级 5
    {
        id: 'shang_wu_zheng',
        name: '上屋抽梯',
        idiom: '上屋抽梯',
        level: 5,
        type: SkillType.CONTROL,
        target: SkillTarget.ENEMY,
        description: '对方下回合必须落子，且落子位置必须与你本回合落子相邻',
        effect: 'forceAdjacent',
        icon: '🪜',
        cooldown: 0
    },
    {
        id: 'shun_shou_qian',
        name: '顺手牵羊',
        idiom: '顺手牵羊',
        level: 5,
        type: SkillType.SPECIAL,
        target: SkillTarget.ENEMY,
        description: '如果对方本回合有可用技能，偷取其中一个技能的使用机会',
        effect: 'stealSkill',
        icon: '🐑',
        cooldown: 0
    },
    {
        id: 'da_cao_jing',
        name: '打草惊蛇',
        idiom: '打草惊蛇',
        level: 5,
        type: SkillType.SPECIAL,
        target: SkillTarget.GLOBAL,
        description: '显示对方所有可用技能的图标（但不显示具体效果），持续3回合',
        effect: 'revealSkills',
        icon: '👁️',
        cooldown: 0
    },

    // 等级 6
    {
        id: 'jie_dao_sha',
        name: '借刀杀人',
        idiom: '借刀杀人',
        level: 6,
        type: SkillType.CONTROL,
        target: SkillTarget.BOARD,
        description: '移除棋盘上任意3个相邻的棋子（可以是混合颜色）',
        effect: 'removeThree',
        icon: '🔪',
        cooldown: 0
    },
    {
        id: 'yi_tao_hu',
        name: '以逸待劳',
        idiom: '以逸待劳',
        level: 6,
        type: SkillType.DEFENSIVE,
        target: SkillTarget.SELF,
        description: '跳过本回合，下回合可以连续落2子',
        effect: 'doubleNext',
        icon: '☯️',
        cooldown: 0
    },
    {
        id: 'an_du_chen',
        name: '暗度陈仓',
        idiom: '暗度陈仓',
        level: 6,
        type: SkillType.OFFENSIVE,
        target: SkillTarget.BOARD,
        description: '本回合可以在棋盘任意位置落子（无视五子棋规则限制）',
        effect: 'freePlacement',
        icon: '🌙',
        cooldown: 0
    },

    // 等级 7
    {
        id: 'yu_hun_hun',
        name: '鱼目混珠',
        idiom: '鱼目混珠',
        level: 7,
        type: SkillType.SPECIAL,
        target: SkillTarget.BOARD,
        description: '本回合你的棋子看起来像是对方的棋子，持续1回合',
        effect: 'disguisePiece',
        icon: '🐟',
        cooldown: 0
    },
    {
        id: 'li_dai_tao',
        name: '李代桃僵',
        idiom: '李代桃僵',
        level: 7,
        type: SkillType.DEFENSIVE,
        target: SkillTarget.SELF,
        description: '如果对方本回合要获胜，你可以替对方落子（选择对你最有利的位置）',
        effect: 'replaceMove',
        icon: '🍑',
        cooldown: 0
    },
    {
        id: 'xiao_li_cang',
        name: '笑里藏刀',
        idiom: '笑里藏刀',
        level: 7,
        type: SkillType.OFFENSIVE,
        target: SkillTarget.ENEMY,
        description: '对方下回合落子后，那个位置会自动变成你的棋子',
        effect: 'trapPiece',
        icon: '😊',
        cooldown: 0
    },

    // 等级 8
    {
        id: 'diao_hu_li',
        name: '调虎离山',
        idiom: '调虎离山',
        level: 8,
        type: SkillType.CONTROL,
        target: SkillTarget.BOARD,
        description: '将对方一条线上的所有棋子移动到另一条线上',
        effect: 'shiftLine',
        icon: '🐅',
        cooldown: 0
    },
    {
        id: 'yu_chang_da',
        name: '欲擒故纵',
        idiom: '欲擒故纵',
        level: 8,
        type: SkillType.SPECIAL,
        target: SkillTarget.ENEMY,
        description: '让对方下回合可以使用2次技能，但之后2回合不能使用技能',
        effect: 'skillExchange',
        icon: '🎣',
        cooldown: 0
    },
    {
        id: 'pao_zhuan_yin',
        name: '抛砖引玉',
        idiom: '抛砖引玉',
        level: 8,
        type: SkillType.SPECIAL,
        target: SkillTarget.GLOBAL,
        description: '本回合不落子，下回合对方必须先落子，然后你连续落2子',
        effect: 'baitMove',
        icon: '🧱',
        cooldown: 0
    },

    // 等级 9
    {
        id: 'qin_zei_qin',
        name: '擒贼擒王',
        idiom: '擒贼擒王',
        level: 9,
        type: SkillType.OFFENSIVE,
        target: SkillTarget.BOARD,
        description: '移除对方棋盘上最关键的1个棋子（通常是连接最多线路的棋子）',
        effect: 'removeKey',
        icon: '👑',
        cooldown: 0
    },
    {
        id: 'fan_jian_ji',
        name: '反间计',
        idiom: '反间计',
        level: 9,
        type: SkillType.CONTROL,
        target: SkillTarget.ENEMY,
        description: '交换你和对方的技能（已使用的技能不交换），持续2回合',
        effect: 'swapSkills',
        icon: '🔀',
        cooldown: 0
    },
    {
        id: 'ku_rou_ji',
        name: '苦肉计',
        idiom: '苦肉计',
        level: 9,
        type: SkillType.SPECIAL,
        target: SkillTarget.SELF,
        description: '移除自己棋盘上2个棋子，立即获得3个额外技能使用次数',
        effect: 'sacrificeGain',
        icon: '💔',
        cooldown: 0
    },

    // 等级 10 - 终极技能
    {
        id: 'tian_xia_wu',
        name: '天下无双',
        idiom: '天下无双',
        level: 10,
        type: SkillType.OFFENSIVE,
        target: SkillTarget.BOARD,
        description: '本回合可以连续落2个棋子（可以形成六连获胜）',
        effect: 'doubleMove',
        icon: '👑',
        cooldown: 0
    },
    {
        id: 'wan_bi_gui',
        name: '完璧归赵',
        idiom: '完璧归赵',
        level: 10,
        type: SkillType.DEFENSIVE,
        target: SkillTarget.GLOBAL,
        description: '重置棋盘到上回合的状态（双方各回退1步），你的技能使用次数恢复',
        effect: 'resetBoard',
        icon: '🔄',
        cooldown: 0
    },
    {
        id: 'ba_mian_ling',
        name: '八面玲珑',
        idiom: '八面玲珑',
        level: 10,
        type: SkillType.SPECIAL,
        target: SkillTarget.SELF,
        description: '本回合你可以使用所有你已解锁的技能（各1次），无视选择限制',
        effect: 'ultimateForm',
        icon: '💎',
        cooldown: 0
    }
];

// 技能管理器
class SkillManager {
    constructor() {
        this.skills = SKILLS_DATABASE;
        this.bannedSkills = new Set();
        this.playerSkills = [];
        this.aiSkills = [];
        this.skillUses = {};
        this.activeEffects = {};
    }

    // 获取玩家可使用的技能（根据等级）
    getAvailableSkills(playerLevel) {
        return this.skills.filter(skill => 
            skill.level <= playerLevel && 
            !this.bannedSkills.has(skill.id)
        );
    }

    // 获取已解锁的技能
    getUnlockedSkills(playerLevel) {
        return this.skills.filter(skill => skill.level <= playerLevel);
    }

    // 获取未解锁的技能
    getLockedSkills(playerLevel) {
        return this.skills.filter(skill => skill.level > playerLevel);
    }

    // 禁用技能
    banSkill(skillId) {
        if (this.bannedSkills.size < 3) {
            this.bannedSkills.add(skillId);
            return true;
        }
        return false;
    }

    // 取消禁用
    unbanSkill(skillId) {
        this.bannedSkills.delete(skillId);
    }

    // 选择技能
    pickSkill(skillId, isPlayer = true) {
        const skill = this.skills.find(s => s.id === skillId);
        if (!skill) return false;

        const targetArray = isPlayer ? this.playerSkills : this.aiSkills;
        if (targetArray.length < 3 && !targetArray.find(s => s.id === skillId)) {
            targetArray.push(skill);
            this.skillUses[skillId] = 1; // 每个技能可以使用1次
            return true;
        }
        return false;
    }

    // 取消选择
    unpickSkill(skillId, isPlayer = true) {
        const targetArray = isPlayer ? this.playerSkills : this.aiSkills;
        const index = targetArray.findIndex(s => s.id === skillId);
        if (index > -1) {
            targetArray.splice(index, 1);
            delete this.skillUses[skillId];
            return true;
        }
        return false;
    }

    // 使用技能
    useSkill(skillId) {
        if (this.skillUses[skillId] > 0) {
            this.skillUses[skillId]--;
            return true;
        }
        return false;
    }

    // 检查技能是否可用
    canUseSkill(skillId) {
        return this.skillUses[skillId] > 0;
    }

    // 获取技能剩余使用次数
    getRemainingUses(skillId) {
        return this.skillUses[skillId] || 0;
    }

    // 获取总剩余技能次数
    getTotalRemainingUses(isPlayer = true) {
        const targetArray = isPlayer ? this.playerSkills : this.aiSkills;
        return targetArray.reduce((sum, skill) => sum + (this.skillUses[skill.id] || 0), 0);
    }

    // AI随机选择禁用
    aiBanSkills(playerLevel) {
        const available = this.getAvailableSkills(playerLevel);
        const bans = [];
        while (bans.length < 3) {
            const randomSkill = available[Math.floor(Math.random() * available.length)];
            if (!bans.find(s => s.id === randomSkill.id)) {
                bans.push(randomSkill);
                this.banSkill(randomSkill.id);
            }
        }
        return bans;
    }

    // AI随机选择技能
    aiPickSkills(playerLevel) {
        const available = this.getAvailableSkills(playerLevel);
        const picks = [];
        while (picks.length < 3) {
            const randomSkill = available[Math.floor(Math.random() * available.length)];
            if (!picks.find(s => s.id === randomSkill.id) && 
                !this.playerSkills.find(s => s.id === randomSkill.id)) {
                picks.push(randomSkill);
                this.pickSkill(randomSkill.id, false);
            }
        }
        return picks;
    }

    // 重置
    reset() {
        this.bannedSkills.clear();
        this.playerSkills = [];
        this.aiSkills = [];
        this.skillUses = {};
        this.activeEffects = {};
    }

    // 获取技能效果函数
    getSkillEffect(effectName) {
        return SKILL_EFFECTS[effectName] || null;
    }
}

// 技能效果实现
const SKILL_EFFECTS = {
    // 围魏救赵 - 交换棋子
    exchangePieces: (game, player, params) => {
        const { pos1, pos2 } = params;
        const piece1 = game.board[pos1.y][pos1.x];
        const piece2 = game.board[pos2.y][pos2.x];
        
        if (piece1 && piece2) {
            game.board[pos1.y][pos1.x] = piece2;
            game.board[pos2.y][pos2.x] = piece1;
            game.addLog(`${player} 使用【围魏救赵】交换了棋子位置！`);
            return true;
        }
        return false;
    },

    // 声东击西 - 迷惑落子
    deceivePlacement: (game, player, params) => {
        game.activeEffects[player] = game.activeEffects[player] || {};
        game.activeEffects[player].deceivePlacement = true;
        game.addLog(`${player} 使用【声东击西】，落子位置已隐藏！`);
        return true;
    },

    // 草船借箭 - 复制技能
    copySkill: (game, player, params) => {
        const opponent = player === 'black' ? 'white' : 'black';
        const lastSkill = game.lastUsedSkill[opponent];
        if (lastSkill) {
            game.addLog(`${player} 使用【草船借箭】复制了 ${lastSkill.name}！`);
            return true;
        }
        game.addLog(`${player} 使用【草船借箭】失败，对方还未使用过技能！`);
        return false;
    },

    // 釜底抽薪 - 移除棋子
    removePiece: (game, player, params) => {
        const { x, y } = params;
        const opponent = player === 'black' ? 2 : 1;
        
        if (game.board[y][x] === opponent) {
            game.board[y][x] = 0;
            game.addLog(`${player} 使用【釜底抽薪】移除了对方一个棋子！`);
            return true;
        }
        return false;
    },

    // 浑水摸鱼 - 随机技能
    randomSkill: (game, player, params) => {
        const available = game.skillManager.getAvailableSkills(game.playerLevel);
        const randomSkill = available[Math.floor(Math.random() * available.length)];
        if (randomSkill) {
            game.skillManager.skillUses[randomSkill.id] = 
                (game.skillManager.skillUses[randomSkill.id] || 0) + 1;
            game.addLog(`${player} 使用【浑水摸鱼】获得了【${randomSkill.name}】！`);
            return true;
        }
        return false;
    },

    // 金蝉脱壳 - 移动棋子
    movePiece: (game, player, params) => {
        const { from, to } = params;
        const playerNum = player === 'black' ? 1 : 2;
        
        if (game.board[from.y][from.x] === playerNum && game.board[to.y][to.x] === 0) {
            game.board[from.y][from.x] = 0;
            game.board[to.y][to.x] = playerNum;
            game.addLog(`${player} 使用【金蝉脱壳】移动了棋子！`);
            return true;
        }
        return false;
    },

    // 关门捉贼 - 封锁棋子
    blockPiece: (game, player, params) => {
        const { x, y } = params;
        game.activeEffects.blockedPieces = game.activeEffects.blockedPieces || [];
        game.activeEffects.blockedPieces.push({ x, y, turns: 2 });
        game.addLog(`${player} 使用【关门捉贼】封锁了对方棋子！`);
        return true;
    },

    // 远交近攻 - 扩展范围
    extendedRange: (game, player, params) => {
        game.activeEffects[player] = game.activeEffects[player] || {};
        game.activeEffects[player].extendedRange = true;
        game.addLog(`${player} 使用【远交近攻】，本回合落子范围扩大！`);
        return true;
    },

    // 假途灭虢 - 额外落子
    extraMove: (game, player, params) => {
        game.activeEffects[player] = game.activeEffects[player] || {};
        game.activeEffects[player].extraMoveOnLiveThree = true;
        game.addLog(`${player} 使用【假途灭虢】，形成活三可额外落子！`);
        return true;
    },

    // 偷梁换柱 - 转换棋子
    convertPiece: (game, player, params) => {
        const { x, y } = params;
        const opponent = player === 'black' ? 2 : 1;
        const playerNum = player === 'black' ? 1 : 2;
        
        if (game.board[y][x] === opponent) {
            game.board[y][x] = playerNum;
            game.addLog(`${player} 使用【偷梁换柱】将对方棋子变为己方的！`);
            return true;
        }
        return false;
    },

    // 以逸待劳 - 双倍下回合
    doubleNext: (game, player, params) => {
        game.activeEffects[player] = game.activeEffects[player] || {};
        game.activeEffects[player].doubleNext = true;
        game.skipTurn = true;
        game.addLog(`${player} 使用【以逸待劳】，下回合可落2子！`);
        return true;
    },

    // 暗度陈仓 - 自由落子
    freePlacement: (game, player, params) => {
        game.activeEffects[player] = game.activeEffects[player] || {};
        game.activeEffects[player].freePlacement = true;
        game.addLog(`${player} 使用【暗度陈仓】，本回合可自由落子！`);
        return true;
    },

    // 天下无双 - 双落子
    doubleMove: (game, player, params) => {
        game.activeEffects[player] = game.activeEffects[player] || {};
        game.activeEffects[player].doubleMove = true;
        game.addLog(`${player} 使用【天下无双】，本回合可落2子！`);
        return true;
    },

    // 完璧归赵 - 重置棋盘
    resetBoard: (game, player, params) => {
        if (game.history.length >= 2) {
            game.board = JSON.parse(JSON.stringify(game.history[game.history.length - 2]));
            game.history = game.history.slice(0, -2);
            
            // 恢复技能使用次数
            Object.keys(game.skillManager.skillUses).forEach(skillId => {
                game.skillManager.skillUses[skillId] = 1;
            });
            
            game.addLog(`${player} 使用【完璧归赵】，棋盘回退到上回合！`);
            return true;
        }
        return false;
    }
};

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SkillManager, SKILLS_DATABASE, SkillType, SkillTarget };
}
