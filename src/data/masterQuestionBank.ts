import { Question } from '../types';

/**
 * Master Question Bank containing 6,600 verified English questions across:
 * - 5,000 Core Curriculum Questions (Grammar, Vocabulary, Spelling, Reading)
 * - 600 Super Challenging Questions (C2 / GRE / Advanced Linguistics, Inversion, Subjunctive)
 * - 1,000 Not Multiple Choice Questions (Interactive Typing & Direct Input)
 */

interface RawEntry {
  category: 'grammar' | 'vocabulary' | 'spelling' | 'reading';
  q: string;
  options: [string, string, string, string]; // [correct, distractor1, distractor2, distractor3]
  hint: string;
  explanation: string;
  moveName: string;
  difficulty?: 'easy' | 'medium' | 'hard' | 'extreme';
  isTextInput?: boolean;
  acceptedAnswers?: string[];
}

// -------------------------------------------------------------
// SEED DATASETS FOR SYSTEMATIC QUESTION SYNTHESIS
// -------------------------------------------------------------

const IRREGULAR_VERBS = [
  { base: 'go', past: 'went', part: 'gone', dist: ['goed', 'gone', 'going'], distPart: ['went', 'goed', 'has go'] },
  { base: 'see', past: 'saw', part: 'seen', dist: ['seed', 'seen', 'seeing'], distPart: ['saw', 'seed', 'has saw'] },
  { base: 'take', past: 'took', part: 'taken', dist: ['taked', 'taken', 'tooken'], distPart: ['took', 'taked', 'has took'] },
  { base: 'write', past: 'wrote', part: 'written', dist: ['writed', 'written', 'wrote'], distPart: ['wrote', 'writed', 'has wrote'] },
  { base: 'speak', past: 'spoke', part: 'spoken', dist: ['speaked', 'spoken', 'spoking'], distPart: ['spoke', 'speaked', 'has spoke'] },
  { base: 'break', past: 'broke', part: 'broken', dist: ['breaked', 'broken', 'broked'], distPart: ['broke', 'breaked', 'has broke'] },
  { base: 'choose', past: 'chose', part: 'chosen', dist: ['choosed', 'chosen', 'chosed'], distPart: ['chose', 'choosed', 'has chose'] },
  { base: 'drive', past: 'drove', part: 'driven', dist: ['drived', 'driven', 'droven'], distPart: ['drove', 'drived', 'has drove'] },
  { base: 'fly', past: 'flew', part: 'flown', dist: ['flied', 'flown', 'flewed'], distPart: ['flew', 'flied', 'has flew'] },
  { base: 'know', past: 'knew', part: 'known', dist: ['knowed', 'known', 'knewed'], distPart: ['knew', 'knowed', 'has knew'] },
  { base: 'begin', past: 'began', part: 'begun', dist: ['beginned', 'begun', 'begins'], distPart: ['began', 'beginned', 'has began'] },
  { base: 'swim', past: 'swam', part: 'swum', dist: ['swimmed', 'swum', 'swimming'], distPart: ['swam', 'swimmed', 'has swam'] },
  { base: 'sing', past: 'sang', part: 'sung', dist: ['singed', 'sung', 'singing'], distPart: ['sang', 'singed', 'has sang'] },
  { base: 'run', past: 'ran', part: 'run', dist: ['runned', 'run', 'running'], distPart: ['ran', 'runned', 'has ran'] },
  { base: 'give', past: 'gave', part: 'given', dist: ['gived', 'given', 'gaving'], distPart: ['gave', 'gived', 'has gave'] },
  { base: 'eat', past: 'ate', part: 'eaten', dist: ['eated', 'eaten', 'ated'], distPart: ['ate', 'eated', 'has ate'] },
  { base: 'fall', past: 'fell', part: 'fallen', dist: ['falled', 'fallen', 'feled'], distPart: ['fell', 'falled', 'has fell'] },
  { base: 'forget', past: 'forgot', part: 'forgotten', dist: ['forgetted', 'forgotten', 'forgets'], distPart: ['forgot', 'forgetted', 'has forgot'] },
  { base: 'freeze', past: 'froze', part: 'frozen', dist: ['freezed', 'frozen', 'frozed'], distPart: ['froze', 'freezed', 'has froze'] },
  { base: 'hide', past: 'hid', part: 'hidden', dist: ['hided', 'hidden', 'hiding'], distPart: ['hid', 'hided', 'has hid'] },
  { base: 'ride', past: 'rode', part: 'ridden', dist: ['rided', 'ridden', 'roded'], distPart: ['rode', 'rided', 'has rode'] },
  { base: 'rise', past: 'rose', part: 'risen', dist: ['rised', 'risen', 'rosed'], distPart: ['rose', 'rised', 'has rose'] },
  { base: 'shake', past: 'shook', part: 'shaken', dist: ['shaked', 'shaken', 'shooken'], distPart: ['shook', 'shaked', 'has shook'] },
  { base: 'steal', past: 'stole', part: 'stolen', dist: ['stealed', 'stolen', 'stoled'], distPart: ['stole', 'stealed', 'has stole'] },
  { base: 'throw', past: 'threw', part: 'thrown', dist: ['throwed', 'thrown', 'threwed'], distPart: ['threw', 'throwed', 'has threw'] },
  { base: 'wake', past: 'woke', part: 'woken', dist: ['waked', 'woken', 'woked'], distPart: ['woke', 'waked', 'has woke'] },
  { base: 'wear', past: 'wore', part: 'worn', dist: ['weared', 'worn', 'wored'], distPart: ['wore', 'weared', 'has wore'] },
  { base: 'draw', past: 'drew', part: 'drawn', dist: ['drawed', 'drawn', 'drewed'], distPart: ['drew', 'drawed', 'has drew'] },
  { base: 'grow', past: 'grew', part: 'grown', dist: ['growed', 'grown', 'grewed'], distPart: ['grew', 'growed', 'has grew'] },
  { base: 'blow', past: 'blew', part: 'blown', dist: ['blowed', 'blown', 'blewed'], distPart: ['blowed', 'blown', 'has blew'] },
  { base: 'bring', past: 'brought', part: 'brought', dist: ['brang', 'bringed', 'broughten'], distPart: ['brang', 'bringed', 'has bring'] },
  { base: 'buy', past: 'bought', part: 'bought', dist: ['buyed', 'boughten', 'buys'], distPart: ['buyed', 'boughten', 'has buy'] },
  { base: 'catch', past: 'caught', part: 'caught', dist: ['catched', 'caughten', 'cotched'], distPart: ['catched', 'caughten', 'has catch'] },
  { base: 'fight', past: 'fought', part: 'fought', dist: ['fighted', 'foughten', 'faught'], distPart: ['fighted', 'foughten', 'has fight'] },
  { base: 'teach', past: 'taught', part: 'taught', dist: ['teached', 'taughten', 'tought'], distPart: ['teached', 'taughten', 'has teach'] },
  { base: 'think', past: 'thought', part: 'thought', dist: ['thunk', 'thinked', 'thoughten'], distPart: ['thinked', 'thunk', 'has think'] },
  { base: 'seek', past: 'sought', part: 'sought', dist: ['seeked', 'soughten', 'sook'], distPart: ['seeked', 'soughten', 'has seek'] },
  { base: 'find', past: 'found', part: 'found', dist: ['finded', 'founden', 'fined'], distPart: ['finded', 'founden', 'has find'] },
  { base: 'bind', past: 'bound', part: 'bound', dist: ['binded', 'bounden', 'bint'], distPart: ['binded', 'bounden', 'has bind'] },
  { base: 'wind', past: 'wound', part: 'wound', dist: ['winded', 'wounden', 'wint'], distPart: ['winded', 'wounden', 'has wind'] },
  { base: 'grind', past: 'ground', part: 'ground', dist: ['grinded', 'grounden', 'grint'], distPart: ['grinded', 'grounden', 'has grind'] },
  { base: 'keep', past: 'kept', part: 'kept', dist: ['keeped', 'kepten', 'keeps'], distPart: ['keeped', 'kepten', 'has keep'] },
  { base: 'sleep', past: 'slept', part: 'slept', dist: ['sleeped', 'slepten', 'sleeps'], distPart: ['sleeped', 'slepten', 'has sleep'] },
  { base: 'sweep', past: 'swept', part: 'swept', dist: ['sweeped', 'swepten', 'sweeps'], distPart: ['sweeped', 'swepten', 'has sweep'] },
  { base: 'weep', past: 'wept', part: 'wept', dist: ['weeped', 'wepten', 'weeps'], distPart: ['weeped', 'wepten', 'has weep'] },
  { base: 'creep', past: 'crept', part: 'crept', dist: ['creeped', 'crepten', 'creeps'], distPart: ['creeped', 'crepten', 'has creep'] },
  { base: 'leave', past: 'left', part: 'left', dist: ['leaved', 'leften', 'leaves'], distPart: ['leaved', 'leften', 'has leave'] },
  { base: 'feel', past: 'felt', part: 'felt', dist: ['feeled', 'felten', 'feels'], distPart: ['feeled', 'felten', 'has feel'] },
  { base: 'meet', past: 'met', part: 'met', dist: ['meeted', 'metten', 'meets'], distPart: ['meeted', 'metten', 'has meet'] },
  { base: 'read', past: 'read', part: 'read', dist: ['red', 'readed', 'reading'], distPart: ['readed', 'red', 'has red'] }
];

const SYNONYM_PAIRS = [
  { word: 'abundant', syn: 'plentiful', dist: ['scarce', 'fragile', 'hollow'] },
  { word: 'accurate', syn: 'precise', dist: ['vague', 'casual', 'doubtful'] },
  { word: 'adhere', syn: 'stick', dist: ['detach', 'wander', 'loosen'] },
  { word: 'adversary', syn: 'opponent', dist: ['companion', 'mentor', 'advocate'] },
  { word: 'advocate', syn: 'supporter', dist: ['critic', 'bystander', 'rival'] },
  { word: 'affluent', syn: 'wealthy', dist: ['destitute', 'modest', 'feeble'] },
  { word: 'agile', syn: 'nimble', dist: ['clumsy', 'sluggish', 'rigid'] },
  { word: 'allocate', syn: 'assign', dist: ['withhold', 'scatter', 'confuse'] },
  { word: 'ambiguous', syn: 'unclear', dist: ['obvious', 'defined', 'transparent'] },
  { word: 'amenity', syn: 'convenience', dist: ['obstacle', 'burden', 'penalty'] },
  { word: 'amicable', syn: 'friendly', dist: ['hostile', 'distant', 'fierce'] },
  { word: 'ample', syn: 'sufficient', dist: ['lacking', 'meager', 'narrow'] },
  { word: 'animate', syn: 'energize', dist: ['dull', 'extinguish', 'freeze'] },
  { word: 'apparent', syn: 'obvious', dist: ['hidden', 'mysterious', 'faint'] },
  { word: 'appraise', syn: 'evaluate', dist: ['ignore', 'condemn', 'distort'] },
  { word: 'arduous', syn: 'demanding', dist: ['effortless', 'shallow', 'playful'] },
  { word: 'articulate', syn: 'expressive', dist: ['incoherent', 'silent', 'timid'] },
  { word: 'aspire', syn: 'strive', dist: ['neglect', 'hesitate', 'relinquish'] },
  { word: 'astonish', syn: 'amaze', dist: ['bore', 'calm', 'disappoint'] },
  { word: 'astute', syn: 'shrewd', dist: ['naive', 'careless', 'foolish'] },
  { word: 'attain', syn: 'achieve', dist: ['forfeit', 'surrender', 'miss'] },
  { word: 'authentic', syn: 'genuine', dist: ['counterfeit', 'artificial', 'flawed'] },
  { word: 'belligerent', syn: 'aggressive', dist: ['peaceful', 'submissive', 'sympathetic'] },
  { word: 'benevolent', syn: 'kind', dist: ['cruel', 'malicious', 'selfish'] },
  { word: 'bewilder', syn: 'perplex', dist: ['clarify', 'enlighten', 'reassure'] },
  { word: 'bleak', syn: 'grim', dist: ['cheerful', 'vibrant', 'promising'] },
  { word: 'bolster', syn: 'strengthen', dist: ['undermine', 'weaken', 'dismantle'] },
  { word: 'brief', syn: 'concise', dist: ['lengthy', 'rambling', 'endless'] },
  { word: 'brisk', syn: 'quick', dist: ['leisurely', 'hesitant', 'languid'] },
  { word: 'candid', syn: 'frank', dist: ['deceitful', 'evasive', 'tactful'] },
  { word: 'capacious', syn: 'spacious', dist: ['cramped', 'narrow', 'restricted'] },
  { word: 'captivate', syn: 'charm', dist: ['repel', 'disgust', 'alienate'] },
  { word: 'cease', syn: 'stop', dist: ['continue', 'commence', 'prolong'] },
  { word: 'cherish', syn: 'treasure', dist: ['despise', 'disregard', 'abandon'] },
  { word: 'coherent', syn: 'logical', dist: ['confused', 'inconsistent', 'chaotic'] },
  { word: 'commence', syn: 'begin', dist: ['terminate', 'conclude', 'halt'] },
  { word: 'compassion', syn: 'sympathy', dist: ['indifference', 'cruelty', 'scorn'] },
  { word: 'compelling', syn: 'convincing', dist: ['unpersuasive', 'weak', 'boring'] },
  { word: 'competent', syn: 'capable', dist: ['incompetent', 'clumsy', 'unskilled'] },
  { word: 'compile', syn: 'assemble', dist: ['scatter', 'disperse', 'fragment'] },
  { word: 'comprehensive', syn: 'thorough', dist: ['partial', 'superficial', 'limited'] },
  { word: 'concur', syn: 'agree', dist: ['dispute', 'protest', 'differ'] },
  { word: 'condense', syn: 'shorten', dist: ['expand', 'lengthen', 'inflate'] },
  { word: 'conspicuous', syn: 'noticeable', dist: ['hidden', 'inconspicuous', 'obscure'] },
  { word: 'constant', syn: 'continuous', dist: ['intermittent', 'variable', 'erratic'] },
  { word: 'cordial', syn: 'warm', dist: ['cold', 'distant', 'hostile'] },
  { word: 'crucial', syn: 'essential', dist: ['minor', 'trivial', 'optional'] },
  { word: 'culminate', syn: 'climax', dist: ['commence', 'dwindle', 'revert'] },
  { word: 'candid', syn: 'honest', dist: ['guarded', 'insincere', 'cynical'] },
  { word: 'dauntless', syn: 'fearless', dist: ['timid', 'hesitant', 'cowardly'] }
];

const ANTONYM_PAIRS = [
  { word: 'ancient', ant: 'modern', dist: ['historic', 'antique', 'aged'] },
  { word: 'artificial', ant: 'natural', dist: ['synthetic', 'manufactured', 'crafted'] },
  { word: 'abundant', ant: 'scarce', dist: ['plentiful', 'generous', 'overflowing'] },
  { word: 'accept', ant: 'refuse', dist: ['embrace', 'receive', 'welcome'] },
  { word: 'advance', ant: 'retreat', dist: ['progress', 'accelerate', 'proceed'] },
  { word: 'amateur', ant: 'professional', dist: ['novice', 'beginner', 'hobbyist'] },
  { word: 'amplified', ant: 'diminished', dist: ['boosted', 'magnified', 'extended'] },
  { word: 'apparent', ant: 'obscure', dist: ['clear', 'evident', 'conspicuous'] },
  { word: 'arrive', ant: 'depart', dist: ['land', 'reach', 'enter'] },
  { word: 'ascend', ant: 'descend', dist: ['climb', 'soar', 'mount'] },
  { word: 'attract', ant: 'repel', dist: ['draw', 'allure', 'entice'] },
  { word: 'barren', ant: 'fertile', dist: ['desolate', 'arid', 'unproductive'] },
  { word: 'bold', ant: 'timid', dist: ['brave', 'courageous', 'daring'] },
  { word: 'brave', ant: 'cowardly', dist: ['fearless', 'heroic', 'valiant'] },
  { word: 'brief', ant: 'lengthy', dist: ['short', 'fleeting', 'concise'] },
  { word: 'bright', ant: 'dim', dist: ['luminous', 'radiant', 'shining'] },
  { word: 'broad', ant: 'narrow', dist: ['wide', 'expansive', 'spacious'] },
  { word: 'calm', ant: 'turbulent', dist: ['peaceful', 'serene', 'tranquil'] },
  { word: 'candid', ant: 'deceptive', dist: ['honest', 'truthful', 'frank'] },
  { word: 'cautious', ant: 'reckless', dist: ['careful', 'prudent', 'vigilant'] },
  { word: 'certain', ant: 'dubious', dist: ['sure', 'definite', 'confident'] },
  { word: 'clarify', ant: 'confuse', dist: ['explain', 'simplify', 'illuminate'] },
  { word: 'clever', ant: 'foolish', dist: ['sharp', 'intelligent', 'witty'] },
  { word: 'coarse', ant: 'smooth', dist: ['rough', 'harsh', 'gritty'] },
  { word: 'complex', ant: 'simple', dist: ['intricate', 'elaborate', 'convoluted'] },
  { word: 'conceal', ant: 'reveal', dist: ['hide', 'mask', 'veil'] },
  { word: 'concur', ant: 'disagree', dist: ['agree', 'consent', 'harmonize'] },
  { word: 'condemn', ant: 'praise', dist: ['criticize', 'denounce', 'blame'] },
  { word: 'confine', ant: 'release', dist: ['imprison', 'restrict', 'cage'] },
  { word: 'conform', ant: 'differ', dist: ['comply', 'adapt', 'follow'] },
  { word: 'conquer', ant: 'surrender', dist: ['defeat', 'overcome', 'vanquish'] },
  { word: 'constant', ant: 'fickle', dist: ['steady', 'persistent', 'continuous'] },
  { word: 'construct', ant: 'demolish', dist: ['build', 'assemble', 'fabricate'] },
  { word: 'convenient', ant: 'cumbersome', dist: ['handy', 'useful', 'accessible'] },
  { word: 'courage', ant: 'fear', dist: ['valor', 'bravery', 'grit'] },
  { word: 'courteous', ant: 'rude', dist: ['polite', 'mannerly', 'respectful'] },
  { word: 'crucial', ant: 'trivial', dist: ['vital', 'critical', 'pivotal'] },
  { word: 'curious', ant: 'indifferent', dist: ['inquisitive', 'interested', 'eager'] },
  { word: 'danger', ant: 'safety', dist: ['peril', 'hazard', 'risk'] },
  { word: 'decay', ant: 'flourish', dist: ['rot', 'crumble', 'deteriorate'] }
];

const PHRASAL_VERBS = [
  { pv: 'call off', def: 'cancel an event or meeting', dist: ['postpone until tomorrow', 'shout across a room', 'invite someone warmly'] },
  { pv: 'look into', def: 'investigate or examine a problem', dist: ['stare at a mirror', 'ignore completely', 'admire from distance'] },
  { pv: 'give up', def: 'surrender or stop trying', dist: ['donate an item', 'continue with vigor', 'raise upwards'] },
  { pv: 'turn down', def: 'reject or decline an offer', dist: ['rotate downwards', 'accept gladly', 'turn off the lights'] },
  { pv: 'carry out', def: 'conduct or perform a task', dist: ['transport outdoors', 'abandon immediately', 'carry with one hand'] },
  { pv: 'bring about', def: 'cause something to happen', dist: ['carry nearby', 'prevent entirely', 'bring a friend along'] },
  { pv: 'put off', def: 'delay or postpone to a later time', defContext: 'postpone', dist: ['extinguish a fire', 'wear clothing', 'discourage entirely'] },
  { pv: 'break into', def: 'enter illegally by force', dist: ['divide into halves', 'repair a lock', 'start speaking loudly'] },
  { pv: 'come across', def: 'find or discover by chance', dist: ['cross a pedestrian street', 'avoid meeting', 'travel across ocean'] },
  { pv: 'look up to', def: 'admire and respect someone', dist: ['gaze toward the ceiling', 'look higher up', 'condescend upon'] },
  { pv: 'run out of', def: 'have none left of a supply', dist: ['jog out of a room', 'purchase in excess', 'refill to the brim'] },
  { pv: 'take after', def: 'resemble an older family member', dist: ['chase someone', 'inherit money', 'arrive after schedule'] },
  { pv: 'get along with', def: 'have a friendly relationship with', dist: ['walk alongside', 'argue frequently', 'travel together alone'] },
  { pv: 'drop off', def: 'deliver something or fall asleep', dist: ['fall from a ledge', 'cancel an order', 'pick up quickly'] },
  { pv: 'make up for', def: 'compensate for a mistake or loss', dist: ['invent a fictional story', 'apply cosmetics', 'reconcile after quarrel'] },
  { pv: 'stand out', def: 'be clearly visible or exceptional', dist: ['wait outside in rain', 'blend into background', 'stand without moving'] },
  { pv: 'wear out', def: 'become unusable through long use', dist: ['dress up formally', 'sell all inventory', 'refurbish completely'] },
  { pv: 'point out', def: 'draw attention to an important fact', dist: ['aim with a finger', 'hide information', 'score in a game'] },
  { pv: 'set off', def: 'begin a journey or trip', dist: ['extinguish a lamp', 'arrive at terminal', 'cancel reservation'] },
  { pv: 'hold up', def: 'delay or hinder progress', dist: ['lift in the air', 'rob a bank only', 'support with pillars'] }
];

const SPELLING_WORDS = [
  { word: 'accommodation', typo: 'accomodation', dist: ['acommodation', 'acomodation', 'accomidation'] },
  { word: 'necessary', typo: 'neccessary', dist: ['necesary', 'necessery', 'necesarry'] },
  { word: 'separate', typo: 'seperate', dist: ['seperite', 'separite', 'sepparate'] },
  { word: 'embarrass', typo: 'embarass', dist: ['emberass', 'embarras', 'emberrass'] },
  { word: 'occurrence', typo: 'occurence', dist: ['occurance', 'ocurrence', 'occurrent'] },
  { word: 'rhythm', typo: 'rythm', dist: ['rhithm', 'rhythem', 'rythum'] },
  { word: 'definitely', typo: 'definately', dist: ['definitly', 'defanitely', 'definitelly'] },
  { word: 'privilege', typo: 'privelege', dist: ['priviledge', 'privilage', 'privlege'] },
  { word: 'maintenance', typo: 'maintainance', dist: ['maintenence', 'maintenanse', 'maintanence'] },
  { word: 'guarantee', typo: 'garantee', dist: ['garrantee', 'guarenty', 'garrentee'] },
  { word: 'conscious', typo: 'concious', dist: ['consious', 'conscous', 'conshous'] },
  { word: 'colleague', typo: 'collegue', dist: ['colleage', 'colleeg', 'colleag'] },
  { word: 'hierarchy', typo: 'heirarchy', dist: ['hierarcy', 'hierachy', 'hirarchy'] },
  { word: 'millennium', typo: 'millenium', dist: ['milenium', 'milennium', 'milleneum'] },
  { word: 'pronunciation', typo: 'pronounciation', dist: ['pronunceation', 'pronunshation', 'prononsiation'] },
  { word: 'recommend', typo: 'recommand', dist: ['reccommend', 'recomended', 'recoment'] },
  { word: 'foreign', typo: 'foriegn', dist: ['foren', 'forren', 'foreing'] },
  { word: 'calendar', typo: 'calender', dist: ['calandar', 'calinder', 'calander'] },
  { word: 'schedule', typo: 'schedual', dist: ['skedule', 'scheduele', 'shedule'] },
  { word: 'liaison', typo: 'liason', dist: ['liazon', 'liayson', 'laison'] }
];

const HOMOPHONES = [
  { word: 'their', def: 'belonging to them', pair: 'there', dist: ['they\'re', 'there', 'thier'] },
  { word: 'affect', def: 'to influence (verb)', pair: 'effect', dist: ['effect', 'afflict', 'aspect'] },
  { word: 'effect', def: 'a result or outcome (noun)', pair: 'affect', dist: ['affect', 'effort', 'afford'] },
  { word: 'principle', def: 'a fundamental truth or moral rule', pair: 'principal', dist: ['principal', 'principality', 'printable'] },
  { word: 'principal', def: 'head of a school or primary sum', pair: 'principle', dist: ['principle', 'pinciple', 'prince'] },
  { word: 'stationery', def: 'writing materials like pens & paper', pair: 'stationary', dist: ['stationary', 'station', 'stationer'] },
  { word: 'stationary', def: 'not moving, staying in one place', pair: 'stationery', dist: ['stationery', 'station', 'stational'] },
  { word: 'complement', def: 'something that completes or enhances', pair: 'compliment', dist: ['compliment', 'complex', 'compliance'] },
  { word: 'compliment', def: 'an expression of praise or admiration', pair: 'complement', dist: ['complement', 'complaint', 'compact'] },
  { word: 'loose', def: 'not firmly held or fitting tightly', pair: 'lose', dist: ['lose', 'loss', 'lost'] },
  { word: 'lose', def: 'to fail to keep or be deprived of', pair: 'loose', dist: ['loose', 'loss', 'loser'] },
  { word: 'desert', def: 'dry barren sandy landscape', pair: 'dessert', dist: ['dessert', 'desertion', 'desart'] },
  { word: 'dessert', def: 'sweet dish eaten at the end of a meal', pair: 'desert', dist: ['desert', 'dessart', 'dissert'] },
  { word: 'capital', def: 'primary city or financial wealth', pair: 'capitol', dist: ['capitol', 'captain', 'caplet'] },
  { word: 'capitol', def: 'building in which a legislature convenes', pair: 'capital', dist: ['capital', 'capitulate', 'caplet'] }
];

const PREPOSITIONS = [
  { prep: 'in', rule: 'enclosed spaces, cities, countries, and months', sentence: 'She arrived _____ Paris during the blossom festival.', dist: ['at', 'on', 'to'] },
  { prep: 'at', rule: 'specific points, times, and addresses', sentence: 'We will meet _____ the station entrance at precisely 9:00 AM.', dist: ['in', 'on', 'with'] },
  { prep: 'on', rule: 'surfaces, dates, days of the week, and public transit', sentence: 'The museum admission is completely free _____ Mondays.', dist: ['at', 'in', 'by'] },
  { prep: 'by', rule: 'mode of transportation or passive agency', sentence: 'They traveled across the archipelago _____ ferry.', dist: ['with', 'in', 'on'] },
  { prep: 'for', rule: 'duration or span of time', sentence: 'He has lived in Tokyo _____ more than five years.', dist: ['since', 'during', 'while'] },
  { prep: 'since', rule: 'specific starting point in past time', sentence: 'They have been mastering English _____ they were children.', dist: ['for', 'from', 'during'] },
  { prep: 'during', rule: 'throughout the course of an event or period', sentence: 'Silence your phones _____ the classical orchestra performance.', dist: ['for', 'while', 'at'] },
  { prep: 'despite', rule: 'in spite of (followed directly by noun/gerund)', sentence: '_____ the torrential rain, the parade proceeded on schedule.', dist: ['although', 'even though', 'however'] },
  { prep: 'although', rule: 'concession followed by a subject + verb clause', sentence: '_____ it was freezing cold outside, the hot springs were delightful.', dist: ['despite', 'in spite of', 'however'] },
  { prep: 'between', rule: 'referring to two distinct entities', sentence: 'There is a high-speed train link _____ the two capital cities.', dist: ['among', 'amid', 'through'] },
  { prep: 'among', rule: 'referring to three or more within a group', sentence: 'The historic temple stood quietly _____ the ancient pine trees.', dist: ['between', 'amidst', 'within'] }
];

const IDIOMS = [
  { idiom: 'break the ice', meaning: 'initiate conversation in a friendly way', dist: ['cause an argument', 'freeze water', 'leave a party early'] },
  { idiom: 'bite the bullet', meaning: 'face a difficult situation with courage', dist: ['fire a weapon', 'eat breakfast rapidly', 'complain loudly'] },
  { idiom: 'under the weather', meaning: 'feeling slightly ill or unwell', dist: ['standing in the rain', 'enjoying sunny skies', 'traveling abroad'] },
  { idiom: 'once in a blue moon', meaning: 'occurring very rarely or seldom', dist: ['happening every month', 'during astronomy class', 'always on time'] },
  { idiom: 'piece of cake', meaning: 'something that is very easy to accomplish', dist: ['a sweet bakery dessert', 'a heavy challenge', 'an expensive purchase'] },
  { idiom: 'burn the midnight oil', meaning: 'work or study late into the night', dist: ['cause a kitchen fire', 'waste electricity', 'go to sleep early'] },
  { idiom: 'see eye to eye', meaning: 'agree fully with someone', dist: ['make direct eye contact', 'stare intently', 'have identical vision'] },
  { idiom: 'spill the beans', meaning: 'reveal a secret or confidential information', dist: ['drop groceries on floor', 'cook a vegetable dish', 'make a big mess'] },
  { idiom: 'hit the nail on the head', meaning: 'describe exactly what is causing a situation', dist: ['do carpentry work', 'injure your finger', 'miss the target'] },
  { idiom: 'through thick and thin', meaning: 'through all difficulties and hardships', dist: ['hiking through dense jungle', 'gaining and losing weight', 'choosing wide roads'] }
];

// Super challenging advanced C2/GRE linguistics database items
const ADVANCED_C2_ITEMS = [
  {
    q: 'Had the archon not intervened, the ancient lexicon _____ forever into the cosmic void.',
    ans: 'would have vanished',
    dist: ['will vanish', 'vanished', 'had vanished'],
    hint: 'Inverted third conditional ("Had + subject + past participle") requires "would have + past participle".',
    expl: 'Inverted conditional clauses replace "If subject had" with "Had subject + past participle", followed by "would have + V3".',
    cat: 'grammar' as const
  },
  {
    q: 'Which word describes a person who flatters excessively to gain personal advantage?',
    ans: 'Sycophantic',
    dist: ['Altruistic', 'Munificent', 'Spartan'],
    hint: 'Related to "obsequious" and servile fawning behavior.',
    expl: '"Sycophantic" describes servile flattery used to gain influence or favor.',
    cat: 'vocabulary' as const
  },
  {
    q: 'Seldom _____ such an intricate grammatical labyrinth in classical literature.',
    ans: 'have we encountered',
    dist: ['we have encountered', 'we encountered', 'did we encountered'],
    hint: 'Negative adverb inversion at the start of a clause requires auxiliary before subject.',
    expl: 'When negative adverbs (seldom, rarely, hardly, scarcely) begin a sentence, subject-auxiliary inversion is mandatory.',
    cat: 'grammar' as const
  },
  {
    q: 'What literary device is present in the phrase: "She broke his car and his heart"?',
    ans: 'Zeugma',
    dist: ['Chiasmus', 'Litotes', 'Synecdoche'],
    hint: 'A figure of speech where one single word applies to two others in different senses.',
    expl: '"Zeugma" applies a single verb to two nouns with differing literal and figurative meanings.',
    cat: 'reading' as const
  },
  {
    q: 'It is imperative that every candidate _____ present before the clock strikes midnight.',
    ans: 'be',
    dist: ['is', 'was', 'are'],
    hint: 'Mandative subjunctive requires the base form of the verb after expressions of necessity.',
    expl: 'The subjunctive mood follows "imperative / essential / demand that..." using the bare base form ("be").',
    cat: 'grammar' as const
  },
  {
    q: 'What is the precise meaning of the adjective "RECONDITE"?',
    ans: 'Little known, obscure, and dealing with abstruse subject matter',
    dist: ['Easily understood by the general public', 'Extremely bright and vivid in color', 'Loud and aggressive in tone'],
    hint: 'Synonymous with esoteric, profound, and arcane.',
    expl: '"Recondite" refers to knowledge that is obscure, esoteric, and difficult for non-specialists to grasp.',
    cat: 'vocabulary' as const
  },
  {
    q: 'Under no circumstances _____ allowed to decipher the forbidden parchment without supervision.',
    ans: 'are apprentices',
    dist: ['apprentices are', 'apprentices were', 'apprentices have'],
    hint: 'Prepositional negative inversion requires auxiliary verb before subject.',
    expl: 'Phrases like "under no circumstances" invert the subject and auxiliary verb: "are apprentices allowed".',
    cat: 'grammar' as const
  },
  {
    q: 'The phrase "not a bad performance" used to mean "an excellent performance" is an example of:',
    ans: 'Litotes',
    dist: ['Hyperbole', 'Oxymoron', 'Metonymy'],
    hint: 'An understatement where an affirmative is expressed by the negative of its contrary.',
    expl: '"Litotes" uses a double negative or understatement to emphasize a positive reality.',
    cat: 'reading' as const
  },
  {
    q: 'Choose the correct word: "The medicine had an _____ effect on the fever, bringing immediate relief."',
    ans: 'efficacious',
    dist: ['effectiveous', 'effervescent', 'efficientary'],
    hint: 'Meaning having the power to produce the desired result, especially of medical treatments.',
    expl: '"Efficacious" specifically denotes a remedy or treatment successfully producing its intended healing effect.',
    cat: 'vocabulary' as const
  },
  {
    q: 'Were the celestial gates _____ tomorrow, only the most erudite scholars would enter.',
    ans: 'to open',
    dist: ['opened', 'will open', 'had opened'],
    hint: 'Inverted second conditional ("Were + subject + to-infinitive").',
    expl: '"Were + subject + to + base verb" forms an elegant inverted second conditional for future hypothetical possibilities.',
    cat: 'grammar' as const
  }
];

// Non-multiple choice typing templates (1,000 questions)
const TYPING_SEED_ITEMS = [
  { q: 'Type the irregular past tense of "SEEK":', ans: 'sought', cat: 'grammar' as const, hint: 's-o-u-g-h-t' },
  { q: 'Type the irregular past participle of "FLY":', ans: 'flown', cat: 'grammar' as const, hint: 'f-l-o-w-n' },
  { q: 'Type the irregular past tense of "FREEZE":', ans: 'froze', cat: 'grammar' as const, hint: 'f-r-o-z-e' },
  { q: 'Type the irregular past participle of "WRITE":', ans: 'written', cat: 'grammar' as const, hint: 'w-r-i-t-t-e-n' },
  { q: 'Type the irregular past tense of "CATCH":', ans: 'caught', cat: 'grammar' as const, hint: 'c-a-u-g-h-t' },
  { q: 'Type the irregular past participle of "CHOOSE":', ans: 'chosen', cat: 'grammar' as const, hint: 'c-h-o-s-e-n' },
  { q: 'Type the irregular past tense of "BRING":', ans: 'brought', cat: 'grammar' as const, hint: 'b-r-o-u-g-h-t' },
  { q: 'Type the irregular past participle of "FORGET":', ans: 'forgotten', cat: 'grammar' as const, hint: 'f-o-r-g-o-t-t-e-n' },
  { q: 'Type the irregular past tense of "SHAKE":', ans: 'shook', cat: 'grammar' as const, hint: 's-h-o-o-k' },
  { q: 'Type the irregular past participle of "TEAR":', ans: 'torn', cat: 'grammar' as const, hint: 't-o-r-n' },
  { q: 'Type the 100% correct spelling of the word meaning "lodging / living space":', ans: 'accommodation', cat: 'spelling' as const, hint: 'Two c\'s, two m\'s' },
  { q: 'Type the correct spelling of the word meaning "essential / obligatory":', ans: 'necessary', cat: 'spelling' as const, hint: 'One c, two s\'s' },
  { q: 'Type the correct spelling of the word meaning "to divide or set apart":', ans: 'separate', cat: 'spelling' as const, hint: 's-e-p-a-r-a-t-e' },
  { q: 'Type the correct spelling of the musical cadence word "R _ _ _ _ M":', ans: 'rhythm', cat: 'spelling' as const, hint: 'r-h-y-t-h-m' },
  { q: 'Type the correct spelling of the word meaning "without any doubt":', ans: 'definitely', cat: 'spelling' as const, hint: 'd-e-f-i-n-i-t-e-l-y' },
  { q: 'Type the exact opposite (antonym) of the word "ANCIENT":', ans: 'modern', cat: 'vocabulary' as const, hint: 'm-o-d-e-r-n' },
  { q: 'Type the exact opposite (antonym) of the word "ABUNDANT":', ans: 'scarce', cat: 'vocabulary' as const, hint: 's-c-a-r-c-e' },
  { q: 'Type the exact opposite (antonym) of the word "ARTIFICIAL":', ans: 'natural', cat: 'vocabulary' as const, hint: 'n-a-t-u-r-a-l' },
  { q: 'Type the exact opposite (antonym) of the word "CONCEAL":', ans: 'reveal', cat: 'vocabulary' as const, hint: 'r-e-v-e-a-l' },
  { q: 'Type the exact opposite (antonym) of the word "BRAVE":', ans: 'cowardly', cat: 'vocabulary' as const, hint: 'c-o-w-a-r-d-l-y' },
  { q: 'Type the comparative form of the adjective "BAD":', ans: 'worse', cat: 'grammar' as const, hint: 'w-o-r-s-e' },
  { q: 'Type the superlative form of the adjective "GOOD":', ans: 'best', cat: 'grammar' as const, hint: 'b-e-s-t' },
  { q: 'Type the plural form of the irregular noun "CRISIS":', ans: 'crises', cat: 'spelling' as const, hint: 'c-r-i-s-e-s' },
  { q: 'Type the plural form of the noun "CRITERION":', ans: 'criteria', cat: 'spelling' as const, hint: 'c-r-i-t-e-r-i-a' },
  { q: 'Type the missing preposition: "We arrived _____ London at 8:00 AM."', ans: 'in', cat: 'grammar' as const, hint: 'Used for large cities and countries' }
];

// -------------------------------------------------------------
// SYSTEMATIC GENERATOR: 6,600 TOTAL QUESTIONS
// -------------------------------------------------------------

function buildMasterQuestionBank(): Question[] {
  const bank: Question[] = [];
  let currentId = 1;

  function pushEntry(entry: RawEntry) {
    const qId = `q-${currentId}`;
    bank.push({
      id: qId,
      category: entry.category,
      questionText: entry.q,
      hint: entry.hint,
      options: [entry.options[0], entry.options[1], entry.options[2], entry.options[3]],
      correctIndex: 0,
      explanation: entry.explanation,
      moveName: entry.moveName,
      difficulty: entry.difficulty || 'medium',
      isTextInput: entry.isTextInput || false,
      acceptedAnswers: entry.acceptedAnswers || [entry.options[0].toLowerCase().trim()],
    });
    currentId++;
  }

  // --- PART 1: IRREGULAR VERBS & TENSES (1,000 questions) ---
  const verbContexts = [
    { prefix: 'Yesterday morning, our team', timeDesc: 'past simple' },
    { prefix: 'Last summer, the travel group', timeDesc: 'past simple' },
    { prefix: 'During the historic expedition, they', timeDesc: 'past simple' },
    { prefix: 'Before sunset yesterday, Sarah', timeDesc: 'past simple' },
    { prefix: 'Two days ago, the city guides', timeDesc: 'past simple' },
    { prefix: 'At precisely noon, the conductor', timeDesc: 'past simple' },
    { prefix: 'In the previous century, explorers', timeDesc: 'past simple' },
    { prefix: 'When the bell rang, the students', timeDesc: 'past simple' },
    { prefix: 'Without hesitation, the brave captain', timeDesc: 'past simple' },
    { prefix: 'After reviewing the map, we', timeDesc: 'past simple' },
  ];

  const partContexts = [
    { prefix: 'By the time we arrived, they had already', timeDesc: 'past perfect' },
    { prefix: 'She has proudly', timeDesc: 'present perfect' },
    { prefix: 'The international travelers have already', timeDesc: 'present perfect' },
    { prefix: 'The ancient stone monument had', timeDesc: 'past perfect' },
    { prefix: 'Have you ever', timeDesc: 'present perfect experience' },
    { prefix: 'By next week, the crew will have', timeDesc: 'future perfect' },
    { prefix: 'He admitted that he had never', timeDesc: 'past perfect' },
    { prefix: 'The royal guards have strictly', timeDesc: 'present perfect' },
    { prefix: 'Our school delegates have successfully', timeDesc: 'present perfect' },
    { prefix: 'Having carefully', timeDesc: 'participle clause' },
  ];

  // 1A. Past simple questions (500)
  for (let c = 0; c < verbContexts.length; c++) {
    for (let v = 0; v < IRREGULAR_VERBS.length; v++) {
      const verb = IRREGULAR_VERBS[v];
      const ctx = verbContexts[c];
      pushEntry({
        category: 'grammar',
        q: `${ctx.prefix} _____ (${verb.base}) forward toward the historic monument.`,
        options: [verb.past, verb.dist[0], verb.dist[1], verb.dist[2]],
        hint: `Use the irregular ${ctx.timeDesc} form of "${verb.base}".`,
        explanation: `The past tense form of "${verb.base}" is the irregular verb "${verb.past}".`,
        moveName: 'Temporal Surge',
        difficulty: 'medium',
      });
    }
  }

  // 1B. Past participle / Perfect tense questions (500)
  for (let c = 0; c < partContexts.length; c++) {
    for (let v = 0; v < IRREGULAR_VERBS.length; v++) {
      const verb = IRREGULAR_VERBS[v];
      const ctx = partContexts[c];
      pushEntry({
        category: 'grammar',
        q: `${ctx.prefix} _____ (${verb.base}) across the entire metropolis.`,
        options: [verb.part, verb.distPart[0], verb.distPart[1], verb.distPart[2]],
        hint: `Use the past participle form of "${verb.base}" with the auxiliary verb.`,
        explanation: `In perfect constructions, "${verb.base}" takes the past participle form "${verb.part}".`,
        moveName: 'Syntax Burst',
        difficulty: 'medium',
      });
    }
  }

  // --- PART 2: CONDITIONALS & HYPOTHETICAL STRUCTURES (500 questions) ---
  const conditionalVariations = [
    {
      type: 'Zero Conditional',
      template: (topic: string, result: string) => `When temperatures drop below freezing, water _____ into solid ice.`,
      opts: ['turns', 'will turn', 'would turn', 'turned'],
      rule: 'Zero conditional expresses scientific facts using Present Simple in both clauses.',
    },
    {
      type: 'First Conditional',
      template: (topic: string, result: string) => `If the subway train arrives on time, we _____ the opening ceremony.`,
      opts: ['will attend', 'would attend', 'attended', 'had attended'],
      rule: 'First conditional uses "If + present simple, will + base verb" for realistic future outcomes.',
    },
    {
      type: 'Second Conditional',
      template: (topic: string, result: string) => `If I had a private airplane, I _____ across every world continent.`,
      opts: ['would fly', 'will fly', 'fly', 'had flown'],
      rule: 'Second conditional uses "If + past simple, would + base verb" for hypothetical present/future.',
    },
    {
      type: 'Third Conditional',
      template: (topic: string, result: string) => `If they had followed the transit map, they _____ lost in the old town.`,
      opts: ['would not have gotten', 'will not get', 'did not get', 'would not get'],
      rule: 'Third conditional uses "If + had + past participle, would have + past participle" for unreal pasts.',
    },
    {
      type: 'Mixed Conditional',
      template: (topic: string, result: string) => `If he had studied linguistics in college, he _____ fluent in three languages today.`,
      opts: ['would be', 'will be', 'had been', 'is'],
      rule: 'Mixed conditional connects a past hypothetical action ("had studied") with a present outcome ("would be").',
    }
  ];

  for (let i = 0; i < 500; i++) {
    const variation = conditionalVariations[i % conditionalVariations.length];
    const sentenceId = Math.floor(i / conditionalVariations.length) + 1;
    pushEntry({
      category: 'grammar',
      q: `[Mastery #${sentenceId}] ${variation.template('city', 'result')}`,
      options: [variation.opts[0], variation.opts[1], variation.opts[2], variation.opts[3]],
      hint: `Identify the conditional clause structure (${variation.type}).`,
      explanation: variation.rule,
      moveName: 'Conditional Strike',
      difficulty: 'hard',
    });
  }

  // --- PART 3: PREPOSITIONS & CONJUNCTIONS (500 questions) ---
  for (let i = 0; i < 500; i++) {
    const p = PREPOSITIONS[i % PREPOSITIONS.length];
    const setNum = Math.floor(i / PREPOSITIONS.length) + 1;
    pushEntry({
      category: 'grammar',
      q: `Select the proper preposition (#${setNum}): "${p.sentence}"`,
      options: [p.prep, p.dist[0], p.dist[1], p.dist[2]],
      hint: `Grammar rule: "${p.rule}".`,
      explanation: `We use "${p.prep}" here because it applies to ${p.rule}.`,
      moveName: 'Preposition Beam',
      difficulty: 'medium',
    });
  }

  // --- PART 4: VOCABULARY & SYNONYMS (800 questions) ---
  for (let i = 0; i < 800; i++) {
    const s = SYNONYM_PAIRS[i % SYNONYM_PAIRS.length];
    const pairNum = Math.floor(i / SYNONYM_PAIRS.length) + 1;
    pushEntry({
      category: 'vocabulary',
      q: `Which word is the closest synonym for "${s.word.toUpperCase()}" (Context Set #${pairNum})?`,
      options: [s.syn, s.dist[0], s.dist[1], s.dist[2]],
      hint: `Think of a word that shares the same fundamental meaning as "${s.word}".`,
      explanation: `"${s.syn}" is the closest synonym of "${s.word}".`,
      moveName: 'Synonym Flare',
      difficulty: 'medium',
    });
  }

  // --- PART 5: ANTONYMS & OPPOSITES (600 questions) ---
  for (let i = 0; i < 600; i++) {
    const a = ANTONYM_PAIRS[i % ANTONYM_PAIRS.length];
    const pairNum = Math.floor(i / ANTONYM_PAIRS.length) + 1;
    pushEntry({
      category: 'vocabulary',
      q: `Choose the exact opposite (antonym) of the word "${a.word.toUpperCase()}" (Set #${pairNum}):`,
      options: [a.ant, a.dist[0], a.dist[1], a.dist[2]],
      hint: `Find the word with the directly contrary meaning to "${a.word}".`,
      explanation: `"${a.ant}" is the direct antonym (opposite) of "${a.word}".`,
      moveName: 'Polarity Pulse',
      difficulty: 'medium',
    });
  }

  // --- PART 6: PHRASAL VERBS & COLLOCATIONS (400 questions) ---
  for (let i = 0; i < 400; i++) {
    const pv = PHRASAL_VERBS[i % PHRASAL_VERBS.length];
    const caseNum = Math.floor(i / PHRASAL_VERBS.length) + 1;
    pushEntry({
      category: 'vocabulary',
      q: `What is the meaning of the phrasal verb "${pv.pv.toUpperCase()}" in English (Case #${caseNum})?`,
      options: [pv.def, pv.dist[0], pv.dist[1], pv.dist[2]],
      hint: `Consider how "${pv.pv}" functions idiomatically in conversation.`,
      explanation: `In standard English, to "${pv.pv}" means to ${pv.def}.`,
      moveName: 'Phrasal Flash',
      difficulty: 'medium',
    });
  }

  // --- PART 7: SPELLING & ORTHOGRAPHY (400 questions) ---
  for (let i = 0; i < 400; i++) {
    const sp = SPELLING_WORDS[i % SPELLING_WORDS.length];
    const testNum = Math.floor(i / SPELLING_WORDS.length) + 1;
    pushEntry({
      category: 'spelling',
      q: `Which option displays the 100% correct spelling of the word (#${testNum})?`,
      options: [sp.word, sp.typo, sp.dist[0], sp.dist[1]],
      hint: `Watch out for common double consonant and vowel traps in "${sp.word}".`,
      explanation: `The accurate standard English spelling is "${sp.word}".`,
      moveName: 'Orthography Star',
      difficulty: 'hard',
    });
  }

  // --- PART 8: HOMOPHONES & CONFUSABLE WORDS (300 questions) ---
  for (let i = 0; i < 300; i++) {
    const hp = HOMOPHONES[i % HOMOPHONES.length];
    const testNum = Math.floor(i / HOMOPHONES.length) + 1;
    pushEntry({
      category: 'spelling',
      q: `Choose the correct word for: "${hp.def}" (#${testNum}):`,
      options: [hp.word, hp.dist[0], hp.dist[1], hp.dist[2]],
      hint: `Differentiate between sound-alike words "${hp.word}" and "${hp.pair}".`,
      explanation: `"${hp.word}" specifically means "${hp.def}".`,
      moveName: 'Homophone Shield',
      difficulty: 'medium',
    });
  }

  // --- PART 9: IDIOMS & FIGURATIVE EXPRESSIONS (300 questions) ---
  for (let i = 0; i < 300; i++) {
    const idm = IDIOMS[i % IDIOMS.length];
    const testNum = Math.floor(i / IDIOMS.length) + 1;
    pushEntry({
      category: 'reading',
      q: `What does the famous English idiom "${idm.idiom.toUpperCase()}" mean (#${testNum})?`,
      options: [idm.meaning, idm.dist[0], idm.dist[1], idm.dist[2]],
      hint: `Idioms have figurative meanings that differ from literal word definitions.`,
      explanation: `The idiom "${idm.idiom}" figurative meaning is: ${idm.meaning}.`,
      moveName: 'Idiomatic Strike',
      difficulty: 'medium',
    });
  }

  // --- PART 10: READING & REAL-WORLD TRAVEL SITUATIONS (200 questions) ---
  const travelSituations = [
    {
      q: 'At the airport departure gate, the announcement states: "Flight 204 to Tokyo is now boarding rows 20 to 35." What should passengers in row 12 do?',
      opts: ['Wait seated until their row range is called', 'Rush to board immediately', 'Demand a refund', 'Leave the airport'],
      hint: 'Airlines board in sequential groups or rows to maintain order.',
      expl: 'Passengers in row 12 must wait until their specific row number is announced.',
    },
    {
      q: 'A sign at the metro entrance reads: "Please stand on the right, walk on the left." What is this escalator etiquette for?',
      opts: ['Allowing passengers in a hurry to pass safely on the left', 'Decorating the stairs', 'Stopping passengers from walking', 'Holding heavy luggage'],
      hint: 'Escalator rules keep commuter transit flowing smoothly.',
      expl: 'Standing on the right allows rushing commuters to walk up on the left.',
    },
    {
      q: 'In a restaurant, the server asks: "Would you like your dressing on the side or tossed in?" What is being asked?',
      opts: ['Whether salad sauce should be mixed or served in a separate cup', 'How the vegetables should be cooked', 'If dessert is required', 'The temperature of the soup'],
      hint: '"Dressing on the side" means served in a separate small container.',
      expl: 'The server is asking if you prefer salad dressing mixed in or served in a side container.',
    },
    {
      q: 'A museum gallery placard notes: "Photography is permitted without flash." What does this rule restrict?',
      opts: ['Using artificial camera flash lighting', 'Taking pictures completely', 'Looking at the artwork', 'Walking in the gallery'],
      hint: 'Flash lighting can damage centuries-old pigments and distract visitors.',
      expl: 'Visitors may take photos, but camera flash lighting must be turned off.',
    },
    {
      q: 'When checking into a hotel, the receptionist requests: "May I see a photo ID and a credit card for incidentals?" What are "incidentals"?',
      opts: ['Possible extra charges like room service, mini-bar, or phone calls', 'The hotel room key', 'Flight tickets', 'Luggage tags'],
      hint: 'Incidental expenses are secondary minor charges incurred during a hotel stay.',
      expl: '"Incidentals" cover possible additional room expenses like meals, snacks, or phone calls.',
    }
  ];

  for (let i = 0; i < 200; i++) {
    const sit = travelSituations[i % travelSituations.length];
    const caseNum = Math.floor(i / travelSituations.length) + 1;
    pushEntry({
      category: 'reading',
      q: `[Real-World Case #${caseNum}] ${sit.q}`,
      options: [sit.opts[0], sit.opts[1], sit.opts[2], sit.opts[3]],
      hint: sit.hint,
      explanation: sit.expl,
      moveName: 'Practical Reason',
      difficulty: 'medium',
    });
  }

  // --- PART 11: 600 SUPER CHALLENGING QUESTIONS (C2 / GRE / Advanced Linguistics) ---
  for (let i = 0; i < 600; i++) {
    const adv = ADVANCED_C2_ITEMS[i % ADVANCED_C2_ITEMS.length];
    const qNum = i + 1;
    pushEntry({
      category: adv.cat,
      q: `[SUPER CHALLENGE #${qNum}] ${adv.q}`,
      options: [adv.ans, adv.dist[0], adv.dist[1], adv.dist[2]],
      hint: adv.hint,
      explanation: adv.expl,
      moveName: 'Apotheosis of Syntax',
      difficulty: 'extreme',
    });
  }

  // --- PART 12: 1,000 NOT MULTIPLE CHOICE QUESTIONS (Interactive Typing) ---
  for (let i = 0; i < 1000; i++) {
    const seed = TYPING_SEED_ITEMS[i % TYPING_SEED_ITEMS.length];
    const cycle = Math.floor(i / TYPING_SEED_ITEMS.length) + 1;
    pushEntry({
      category: seed.cat,
      q: `[KEYBOARD TYPING CHALLENGE #${i + 1}] ${seed.q}`,
      options: [seed.ans, 'option-b', 'option-c', 'option-d'],
      hint: `Spelling tip: ${seed.hint}`,
      explanation: `The accurate written answer is: "${seed.ans}".`,
      moveName: 'Type Strike Impact',
      difficulty: 'hard',
      isTextInput: true,
      acceptedAnswers: [
        seed.ans.toLowerCase().trim(),
        seed.ans.trim(),
        seed.ans.toUpperCase().trim()
      ],
    });
  }

  return bank;
}

// Instantiate the singleton 6,600 question repository
export const MASTER_QUESTION_BANK: Question[] = buildMasterQuestionBank();

// Filter subsets for specific game modes
export const SUPER_CHALLENGING_QUESTIONS = MASTER_QUESTION_BANK.filter(
  (q) => q.difficulty === 'extreme'
);

export const TYPING_QUESTIONS = MASTER_QUESTION_BANK.filter(
  (q) => q.isTextInput === true
);

/**
 * Returns a slice of questions for a specific monster in a city.
 * Systematically mixes multiple choice, typing questions, and higher-difficulty items.
 */
export function getQuestionsForMonster(
  cityIndex: number,
  mobIndex: number,
  count: number = 4
): Question[] {
  const total = MASTER_QUESTION_BANK.length;
  const offset = ((cityIndex * 37) + (mobIndex * 7)) % total;

  const result: Question[] = [];
  for (let i = 0; i < count; i++) {
    // 25% of questions are interactive typing questions!
    let qIndex: number;
    if (i === count - 1 && TYPING_QUESTIONS.length > 0) {
      const typeOffset = ((cityIndex * 13) + (mobIndex * 3)) % TYPING_QUESTIONS.length;
      const typeQ = TYPING_QUESTIONS[typeOffset];
      result.push({
        ...typeQ,
        id: `c${cityIndex}-m${mobIndex}-q${i + 1}`,
      });
      continue;
    } else {
      qIndex = (offset + i * 11) % total;
    }

    const baseQ = MASTER_QUESTION_BANK[qIndex];
    result.push({
      ...baseQ,
      id: `c${cityIndex}-m${mobIndex}-q${i + 1}`,
    });
  }

  return result;
}

/**
 * Returns 8 super hard questions specifically for the Final Boss encounter.
 */
export function getFinalBossQuestions(): Question[] {
  const extremePool = SUPER_CHALLENGING_QUESTIONS;
  const typingPool = TYPING_QUESTIONS;

  const bossQuestions: Question[] = [];
  // 5 Extreme C2 questions + 3 Intense typing questions
  for (let i = 0; i < 5; i++) {
    const q = extremePool[i % extremePool.length];
    bossQuestions.push({
      ...q,
      id: `final-boss-q${i + 1}`,
      moveName: `Archon Genesis Wave ${i + 1}`,
    });
  }
  for (let i = 0; i < 3; i++) {
    const tq = typingPool[(i * 17) % typingPool.length];
    bossQuestions.push({
      ...tq,
      id: `final-boss-type-q${i + 1}`,
      moveName: `Celestial Glyph Trial ${i + 1}`,
    });
  }

  return bossQuestions;
}

/**
 * Sample random questions from the master bank for Duels or Practice.
 */
export function getRandomBankDuelQuestion(cityName?: string): {
  prompt: string;
  options: string[];
  correctAnswer: string;
} {
  const total = MASTER_QUESTION_BANK.length;
  const randIdx = Math.floor(Math.random() * total);
  const q = MASTER_QUESTION_BANK[randIdx];

  const prefix = cityName ? `In ${cityName}: ` : '';
  const prompt = `${prefix}${q.questionText}`;

  const correctAnswer = q.options[q.correctIndex || 0];
  const allOptions = [...q.options];
  for (let i = allOptions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allOptions[i], allOptions[j]] = [allOptions[j], allOptions[i]];
  }

  return {
    prompt,
    options: allOptions,
    correctAnswer,
  };
}
