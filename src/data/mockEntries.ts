import { Entry } from '../types';

export const mockEntries: Entry[] = [
  {
    id: '1',
    title: '公司报销制度',
    content: `
      <h2>一、报销范围</h2>
      <p>公司报销范围包括但不限于以下几类：</p>
      <ul>
        <li><strong>差旅费</strong>：因公出差产生的交通、住宿、餐饮费用</li>
        <li><strong>业务招待费</strong>：因业务需要产生的客户招待费用</li>
        <li><strong>办公费用</strong>：办公用品、设备维修等日常办公支出</li>
        <li><strong>培训费</strong>：员工参加外部培训的学费、资料费等</li>
      </ul>

      <h2>二、报销标准</h2>
      <h3>2.1 差旅费标准</h3>
      <table>
        <thead>
          <tr><th>职级</th><th>机票</th><th>酒店</th><th>餐饮</th></tr>
        </thead>
        <tbody>
          <tr><td>普通员工</td><td>经济舱</td><td>≤400元/晚</td><td>≤150元/天</td></tr>
          <tr><td>经理级</td><td>经济舱/商务舱</td><td>≤600元/晚</td><td>≤250元/天</td></tr>
          <tr><td>总监级</td><td>商务舱</td><td>≤1000元/晚</td><td>≤400元/天</td></tr>
        </tbody>
      </table>

      <h2>三、报销流程</h2>
      <ol>
        <li>员工在OA系统提交报销申请</li>
        <li>直属上级审批</li>
        <li>财务部门审核</li>
        <li>出纳付款（3-5个工作日）</li>
      </ol>

      <h2>四、注意事项</h2>
      <ul>
        <li>发票必须是正规增值税发票</li>
        <li>报销申请需在费用发生后30天内提交</li>
        <li>单笔报销超过5000元需总监审批</li>
      </ul>
    `,
    summary: '详细介绍公司各项费用的报销流程、标准和注意事项，帮助员工快速了解报销制度',
    categoryId: '1',
    responsibleId: '3',
    responsibleName: '财务部',
    departments: ['全部'],
    tags: ['报销', '财务', '制度'],
    viewCount: 1250,
    favoriteCount: 89,
    createdAt: '2024-01-10',
    updatedAt: '2024-03-15',
    version: 3,
    relatedEntries: ['2', '3', '6'],
    relatedQuestions: ['1', '5'],
  },
  {
    id: '2',
    title: '年假与请假制度',
    content: `
      <h2>一、年假政策</h2>
      <p>根据国家规定和公司制度，员工享受带薪年假的条件如下：</p>
      <ul>
        <li><strong>工龄1-10年</strong>：年假5天</li>
        <li><strong>工龄10-20年</strong>：年假10天</li>
        <li><strong>工龄20年以上</strong>：年假15天</li>
      </ul>

      <h2>二、请假类型</h2>
      <table>
        <thead>
          <tr><th>假期类型</th><th>天数</th><th>工资</th><th>说明</th></tr>
        </thead>
        <tbody>
          <tr><td>年假</td><td>按工龄</td><td>全薪</td><td>需提前申请</td></tr>
          <tr><td>病假</td><td>≤30天/年</td><td>80%</td><td>需提供医院证明</td></tr>
          <tr><td>事假</td><td>≤5天/年</td><td>不计薪</td><td>需提前申请</td></tr>
          <tr><td>婚假</td><td>3天</td><td>全薪</td><td>需提供结婚证</td></tr>
          <tr><td>产假</td><td>98天</td><td>全薪</td><td>按国家规定</td></tr>
        </tbody>
      </table>

      <h2>三、请假流程</h2>
      <ol>
        <li>员工在OA系统提交请假申请</li>
        <li>直属上级审批</li>
        <li>HR备案（婚假、产假等）</li>
        <li>系统自动扣减假期余额</li>
      </ol>
    `,
    summary: '详细介绍年假、病假、事假等各类假期的政策和申请流程',
    categoryId: '2',
    responsibleId: '2',
    responsibleName: '人力资源部',
    departments: ['全部'],
    tags: ['请假', '年假', 'HR', '假期'],
    viewCount: 987,
    favoriteCount: 156,
    createdAt: '2024-01-08',
    updatedAt: '2024-02-20',
    version: 2,
    relatedEntries: ['1', '7'],
    relatedQuestions: ['2', '3'],
  },
  {
    id: '3',
    title: 'IT系统使用指南',
    content: `
      <h2>一、账号开通</h2>
      <p>新员工入职后，IT部门会在1个工作日内完成以下账号的开通：</p>
      <ul>
        <li><strong>企业邮箱</strong>：yourname@company.com</li>
        <li><strong>OA系统</strong>：用于日常审批和流程</li>
        <li><strong>钉钉/企业微信</strong>：用于即时通讯</li>
        <li><strong>代码仓库</strong>：GitLab访问权限</li>
      </ul>

      <h2>二、常用系统入口</h2>
      <table>
        <thead>
          <tr><th>系统名称</th><th>访问地址</th><th>用途</th></tr>
        </thead>
        <tbody>
          <tr><td>OA系统</td><td>oa.company.com</td><td>审批流程</td></tr>
          <tr><td>企业邮箱</td><td>mail.company.com</td><td>邮件收发</td></tr>
          <tr><td>知识库</td><td>wiki.company.com</td><td>文档管理</td></tr>
          <tr><td>代码仓库</td><td>gitlab.company.com</td><td>代码管理</td></tr>
        </tbody>
      </table>

      <h2>三、密码策略</h2>
      <ul>
        <li>密码长度至少8位</li>
        <li>必须包含大小写字母和数字</li>
        <li>每90天必须更换一次</li>
        <li>不得使用最近5次用过的密码</li>
      </ul>

      <h2>四、IT支持</h2>
      <p>如遇技术问题，请联系IT支持热线：<strong>400-888-8888</strong> 或发送邮件至 it@company.com</p>
    `,
    summary: '新员工IT系统使用指南，包括账号开通、常用系统入口和密码策略',
    categoryId: '3',
    responsibleId: '4',
    responsibleName: '技术部',
    departments: ['全部'],
    tags: ['IT', '系统', '账号', '新员工'],
    viewCount: 1543,
    favoriteCount: 234,
    createdAt: '2024-01-05',
    updatedAt: '2024-03-01',
    version: 4,
    relatedEntries: ['4', '5'],
    relatedQuestions: ['4'],
  },
  {
    id: '4',
    title: '会议室预订指南',
    content: `
      <h2>一、会议室资源</h2>
      <p>公司总部共有各类会议室12间，可通过OA系统在线预订：</p>
      <ul>
        <li><strong>大型会议室</strong>（可容纳20-30人）：3间</li>
        <li><strong>中型会议室</strong>（可容纳10-15人）：5间</li>
        <li><strong>小型会议室</strong>（可容纳4-6人）：4间</li>
      </ul>

      <h2>二、预订流程</h2>
      <ol>
        <li>登录OA系统</li>
        <li>进入"会议室预订"模块</li>
        <li>选择日期和时间段</li>
        <li>选择会议室类型</li>
        <li>填写会议主题和参与人数</li>
        <li>提交预订申请</li>
      </ol>

      <h2>三、使用规范</h2>
      <ul>
        <li>会议室使用时长上限为2小时</li>
        <li>请提前15分钟到达，如取消请提前1小时</li>
        <li>会议结束后请收拾整理，保持清洁</li>
        <li>禁止在会议室内食用有气味的事物</li>
      </ul>

      <h2>四、设备使用</h2>
      <p>所有会议室均配备投影仪、白板、视频会议设备。如需IT技术支持，请拨打分机：<strong>8001</strong></p>
    `,
    summary: '会议室预订流程、使用规范和设备使用指南',
    categoryId: '4',
    responsibleId: '5',
    responsibleName: '行政部',
    departments: ['全部'],
    tags: ['会议室', '预订', '行政'],
    viewCount: 756,
    favoriteCount: 45,
    createdAt: '2024-01-12',
    updatedAt: '2024-02-15',
    version: 2,
    relatedEntries: ['5'],
    relatedQuestions: [],
  },
  {
    id: '5',
    title: '绩效考核制度',
    content: `
      <h2>一、考核周期</h2>
      <p>公司采用季度考核与年度考核相结合的制度：</p>
      <ul>
        <li><strong>季度考核</strong>：每季度末进行，影响季度奖金</li>
        <li><strong>年度考核</strong>：每年12月进行，影响年终奖和晋升</li>
      </ul>

      <h2>二、考核维度</h2>
      <table>
        <thead>
          <tr><th>维度</th><th>权重</th><th>说明</th></tr>
        </thead>
        <tbody>
          <tr><td>工作业绩</td><td>50%</td><td>目标完成情况</td></tr>
          <tr><td>工作能力</td><td>25%</td><td>专业技能和综合素质</td></tr>
          <tr><td>工作态度</td><td>25%</td><td>责任心、团队协作等</td></tr>
        </tbody>
      </table>

      <h2>三、考核流程</h2>
      <ol>
        <li><strong>自评</strong>：员工填写自我评价表</li>
        <li><strong>上级评价</strong>：直属上级进行评价</li>
        <li><strong>绩效面谈</strong>：上下级进行绩效沟通</li>
        <li><strong>结果确认</strong>：员工签字确认考核结果</li>
      </ol>

      <h2>四、结果应用</h2>
      <ul>
        <li>绩效考核结果与季度/年终奖金挂钩</li>
        <li>连续两次考核不合格将启动改进计划</li>
        <li>优秀员工可获得晋升机会</li>
      </ul>
    `,
    summary: '绩效考核周期、维度、流程和结果应用的详细说明',
    categoryId: '1',
    responsibleId: '2',
    responsibleName: '人力资源部',
    departments: ['全部'],
    tags: ['绩效', '考核', 'HR', '奖金'],
    viewCount: 1123,
    favoriteCount: 98,
    createdAt: '2024-01-15',
    updatedAt: '2024-03-10',
    version: 2,
    relatedEntries: ['2', '7'],
    relatedQuestions: [],
  },
  {
    id: '6',
    title: '费用报销流程详解',
    content: `
      <h2>一、报销前的准备工作</h2>
      <p>在申请报销前，请确保您已经准备好以下材料：</p>
      <ul>
        <li>正规发票（抬头为公司名称）</li>
        <li>费用明细清单</li>
        <li>相关证明材料（如行程单、合同等）</li>
      </ul>

      <h2>二、OA系统操作步骤</h2>
      <h3>2.1 提交申请</h3>
      <ol>
        <li>登录OA系统</li>
        <li>点击"费用报销"菜单</li>
        <li>选择"新建报销单"</li>
        <li>填写报销类型、金额、事由等信息</li>
        <li>上传发票照片或电子发票</li>
        <li>提交申请</li>
      </ol>

      <h3>2.2 审批流程</h3>
      <p>普通报销的审批流程为：申请人 → 直属上级 → 财务审核 → 出纳付款</p>
      <p>大额报销（>5000元）需要增加：总监审批环节</p>

      <h2>三、常见问题</h2>
      <h3>3.1 发票要求</h3>
      <p>Q：电子发票可以报销吗？</p>
      <p>A：可以，需打印后提交，或直接提交PDF版本。</p>

      <h3>3.2 报销时限</h3>
      <p>Q：发票日期较早还能报销吗？</p>
      <p>A：发票日期需在费用发生后30天内，逾期不予报销。</p>

      <h2>四、注意事项</h2>
      <ul>
        <li>同一事项不可拆分报销</li>
        <li>发票内容需与实际消费一致</li>
        <li>预支款需在费用发生后一周内冲销</li>
      </ul>
    `,
    summary: '费用报销的详细操作步骤和常见问题解答',
    categoryId: '1',
    responsibleId: '3',
    responsibleName: '财务部',
    departments: ['全部'],
    tags: ['报销', 'OA', '流程', '财务'],
    viewCount: 876,
    favoriteCount: 67,
    createdAt: '2024-01-18',
    updatedAt: '2024-02-28',
    version: 2,
    relatedEntries: ['1'],
    relatedQuestions: ['5'],
  },
  {
    id: '7',
    title: '职业发展通道',
    content: `
      <h2>一、发展通道概述</h2>
      <p>公司为员工提供管理和专业两条职业发展通道：</p>
      <ul>
        <li><strong>管理通道</strong>：专员 → 主管 → 经理 → 总监 → VP</li>
        <li><strong>专业通道</strong>：初级 → 中级 → 高级 → 专家 → 首席专家</li>
      </ul>

      <h2>二、晋升条件</h2>
      <h3>2.1 通用条件</h3>
      <ul>
        <li>在本职级工作满2年（特殊情况下可缩短至1年）</li>
        <li>最近两次绩效考核均在B及以上</li>
        <li>具备下一职级所需的能力素质</li>
        <li>有岗位空缺</li>
      </ul>

      <h3>2.2 管理通道额外要求</h3>
      <ul>
        <li>具备团队管理和协调能力</li>
        <li>有跨部门协作经验</li>
        <li>具备战略思维能力</li>
      </ul>

      <h2>三、内部调岗</h2>
      <p>员工在公司工作满1年后，可以申请内部调岗：</p>
      <ol>
        <li>在OA系统提交调岗申请</li>
        <li>获得原部门和新部门同意</li>
        <li>HR部门审核</li>
        <li>办理调岗手续</li>
      </ol>

      <h2>四、培训资源</h2>
      <p>公司提供多种培训资源支持员工发展：</p>
      <ul>
        <li>新员工入职培训</li>
        <li>专业技能培训</li>
        <li>管理能力培训</li>
        <li>外部讲师课程</li>
        <li>在线学习平台（内部）</li>
      </ul>
    `,
    summary: '职业发展双通道、晋升条件和培训资源介绍',
    categoryId: '2',
    responsibleId: '2',
    responsibleName: '人力资源部',
    departments: ['全部'],
    tags: ['职业发展', '晋升', '培训', 'HR'],
    viewCount: 1345,
    favoriteCount: 178,
    createdAt: '2024-01-20',
    updatedAt: '2024-03-05',
    version: 2,
    relatedEntries: ['2', '5'],
    relatedQuestions: [],
  },
];

export const getEntryById = (id: string): Entry | undefined => {
  return mockEntries.find(entry => entry.id === id);
};

export const getEntriesByCategory = (categoryId: string): Entry[] => {
  return mockEntries.filter(entry => entry.categoryId === categoryId);
};

export const searchEntries = (keyword: string): Entry[] => {
  const lowerKeyword = keyword.toLowerCase();
  return mockEntries.filter(entry =>
    entry.title.toLowerCase().includes(lowerKeyword) ||
    entry.summary.toLowerCase().includes(lowerKeyword) ||
    entry.tags.some(tag => tag.toLowerCase().includes(lowerKeyword))
  );
};
