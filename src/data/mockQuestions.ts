import { Question, Answer } from '../types';

export const mockQuestions: Question[] = [
  {
    id: '1',
    title: '如何申请年假？需要提前多久申请？',
    content: '我是新入职的员工，想了解一下年假的申请流程。另外，想知道年假需要提前多久申请比较合适？',
    authorId: '1',
    authorName: '张明',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhang',
    categoryId: '2',
    tags: ['请假', '年假', 'HR'],
    status: 'adopted',
    adoptedAnswerId: '1',
    viewCount: 328,
    answerCount: 3,
    score: 10,
    createdAt: '2024-02-20',
    updatedAt: '2024-02-21',
  },
  {
    id: '2',
    title: '报销时发票丢了怎么办？',
    content: '上周出差回来发现有几张发票找不到了，这种情况下还能报销吗？有没有其他补救办法？',
    authorId: '1',
    authorName: '张明',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhang',
    categoryId: '1',
    tags: ['报销', '发票', '财务'],
    status: 'answered',
    viewCount: 245,
    answerCount: 2,
    score: 5,
    createdAt: '2024-02-22',
    updatedAt: '2024-02-23',
  },
  {
    id: '3',
    title: '会议室预订有什么限制吗？',
    content: '经常需要组织会议，想了解一下会议室预订有什么规则或限制？',
    authorId: '3',
    authorName: '王强',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=wang',
    categoryId: '4',
    tags: ['会议室', '预订', '行政'],
    status: 'answered',
    viewCount: 189,
    answerCount: 1,
    score: 5,
    createdAt: '2024-02-24',
    updatedAt: '2024-02-24',
  },
  {
    id: '4',
    title: 'OA系统登录密码忘了怎么重置？',
    content: '尝试登录OA系统时发现密码不对，尝试了几次后账号被锁定了，应该怎么处理？',
    authorId: '1',
    authorName: '张明',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhang',
    categoryId: '3',
    tags: ['IT', '密码', 'OA'],
    status: 'adopted',
    adoptedAnswerId: '2',
    viewCount: 412,
    answerCount: 2,
    score: 10,
    createdAt: '2024-02-25',
    updatedAt: '2024-02-25',
  },
  {
    id: '5',
    title: '差旅费报销需要提供哪些材料？',
    content: '下周要出差，想提前了解一下回来报销时需要准备哪些材料，避免到时候手忙脚乱。',
    authorId: '3',
    authorName: '王强',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=wang',
    categoryId: '1',
    tags: ['差旅', '报销', '财务'],
    status: 'pending',
    viewCount: 156,
    answerCount: 0,
    score: 10,
    createdAt: '2024-02-26',
    updatedAt: '2024-02-26',
  },
];

export const mockAnswers: Answer[] = [
  {
    id: '1',
    questionId: '1',
    content: `
      <p>你好，关于年假申请，我可以详细说明一下：</p>
      
      <h3>申请流程：</h3>
      <ol>
        <li>登录OA系统</li>
        <li>进入"请假申请"模块</li>
        <li>选择请假类型为"年假"</li>
        <li>选择开始和结束日期</li>
        <li>填写请假原因（可选）</li>
        <li>提交申请</li>
      </ol>
      
      <h3>提前申请时间：</h3>
      <ul>
        <li><strong>3天以内</strong>：提前1个工作日申请即可</li>
        <li><strong>3-7天</strong>：建议提前3个工作日申请</li>
        <li><strong>7天以上</strong>：建议提前1周申请</li>
      </ul>
      
      <p>特殊情况（如突发疾病）可以事后补假，但需要提供相关证明材料。</p>
      
      <p>另外提醒一下，年假需要在当年度使用完，不能跨年累积哦。</p>
    `,
    authorId: '2',
    authorName: '李华',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=li',
    isAdopted: true,
    upvotes: 15,
    createdAt: '2024-02-20',
    updatedAt: '2024-02-20',
  },
  {
    id: '2',
    questionId: '1',
    content: `
      <p>补充一下，年假的有效期通常是到当年12月31日，所以大家记得及时使用哦。</p>
      <p>如果因为工作需要实在无法休假，可以申请折算工资，但这种情况比较特殊，需要部门负责人和HR共同审批。</p>
    `,
    authorId: '2',
    authorName: '李华',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=li',
    isAdopted: false,
    upvotes: 8,
    createdAt: '2024-02-21',
    updatedAt: '2024-02-21',
  },
  {
    id: '3',
    questionId: '1',
    content: `
      <p>年假的具体天数是根据您的工龄来计算的：</p>
      <ul>
        <li>工作满1年：5天</li>
        <li>工作满10年：10天</li>
        <li>工作满20年：15天</li>
      </ul>
      <p>您可以登录OA系统查看自己的年假余额。</p>
    `,
    authorId: '5',
    authorName: '陈静',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=chen',
    isAdopted: false,
    upvotes: 12,
    createdAt: '2024-02-21',
    updatedAt: '2024-02-21',
  },
  {
    id: '4',
    questionId: '2',
    content: `
      <p>发票丢失的情况确实比较麻烦，但还是有补救办法的：</p>
      
      <h3>处理方式：</h3>
      <ol>
        <li><strong>出租车发票</strong>：可以联系出租车公司补开发票，或者提供行程截图+支付记录</li>
        <li><strong>餐饮发票</strong>：联系餐厅补开，但通常比较困难</li>
        <li><strong>住宿发票</strong>：联系酒店前台，说明情况后可以补开</li>
      </ol>
      
      <h3>注意事项：</h3>
      <ul>
        <li>如果实在无法补开发票，该笔费用将无法报销</li>
        <li>以后报销时，建议及时整理发票，可以拍照备份</li>
        <li>公司正在考虑推行电子发票，以后这种情况会越来越少</li>
      </ul>
      
      <p>建议下次出差时，用手机拍照备份所有发票。</p>
    `,
    authorId: '3',
    authorName: '王强',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=wang',
    isAdopted: false,
    upvotes: 10,
    createdAt: '2024-02-22',
    updatedAt: '2024-02-22',
  },
  {
    id: '5',
    questionId: '3',
    content: `
      <p>会议室预订的规则如下：</p>
      
      <h3>预订限制：</h3>
      <ul>
        <li>单次预订时长上限为2小时</li>
        <li>同一会议室同一时段只能被一个部门使用</li>
        <li>取消预订需提前1小时，否则会计入"取消率"</li>
      </ul>
      
      <h3>预订技巧：</h3>
      <ol>
        <li>热门会议室（如大型会议室）建议提前1-2天预订</li>
        <li>周一下午和周五上午是会议室使用高峰期</li>
        <li>小型会议室相对宽松，当天预订通常都有空位</li>
      </ol>
      
      <p>总体来说，只要提前做好准备，会议室预订还是比较方便的。</p>
    `,
    authorId: '5',
    authorName: '陈静',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=chen',
    isAdopted: false,
    upvotes: 7,
    createdAt: '2024-02-24',
    updatedAt: '2024-02-24',
  },
  {
    id: '6',
    questionId: '4',
    content: `
      <p>密码忘了或账号被锁定，都可以通过以下方式处理：</p>
      
      <h3>方法一：自助重置（推荐）</h3>
      <ol>
        <li>登录页面点击"忘记密码"</li>
        <li>输入注册邮箱或手机号</li>
        <li>系统会发送重置链接到您的邮箱</li>
        <li>点击链接设置新密码</li>
      </ol>
      
      <h3>方法二：联系IT支持</h3>
      <p>如果自助重置失败，可以联系IT部门：</p>
      <ul>
        <li>电话：400-888-8888（工作日 9:00-18:00）</li>
        <li>邮箱：it@company.com</li>
        <li>企业微信：IT支持小助手</li>
      </ul>
      
      <p>IT人员会核实您的身份后，帮您重置密码或解锁账号。通常处理时间为10-30分钟。</p>
    `,
    authorId: '4',
    authorName: '刘芳',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=liu',
    isAdopted: true,
    upvotes: 22,
    createdAt: '2024-02-25',
    updatedAt: '2024-02-25',
  },
];

export const getQuestionById = (id: string): Question | undefined => {
  return mockQuestions.find(q => q.id === id);
};

export const getAnswersByQuestion = (questionId: string): Answer[] => {
  return mockAnswers.filter(a => a.questionId === questionId);
};

export const getQuestionsByStatus = (status: 'pending' | 'answered' | 'adopted'): Question[] => {
  return mockQuestions.filter(q => q.status === status);
};
