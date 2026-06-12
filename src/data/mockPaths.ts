import { LearningPath } from '../types';

export const mockPaths: LearningPath[] = [
  {
    id: '1',
    title: '新员工入职必读',
    description: '新入职员工需要了解的公司基本制度和流程，帮助快速融入团队',
    entryIds: ['1', '2', '3', '4'],
    requiredForPositions: ['前端工程师', '后端工程师', '产品经理', '设计师'],
    estimatedMinutes: 120,
  },
  {
    id: '2',
    title: '财务报销全流程',
    description: '从差旅申请到费用报销的完整流程，包括各种场景下的报销指南',
    entryIds: ['1', '6'],
    requiredForPositions: ['前端工程师', '后端工程师', '产品经理', '设计师', '销售经理'],
    estimatedMinutes: 60,
  },
  {
    id: '3',
    title: '绩效考核指南',
    description: '详细介绍绩效考核的维度、标准和方法，帮助员工更好地规划职业发展',
    entryIds: ['5', '7'],
    requiredForPositions: ['经理', '主管', '总监'],
    estimatedMinutes: 45,
  },
  {
    id: '4',
    title: 'IT系统入门',
    description: '公司各类IT系统的使用指南，包括OA、邮件、代码仓库等',
    entryIds: ['3'],
    requiredForPositions: ['前端工程师', '后端工程师'],
    estimatedMinutes: 30,
  },
];

export const getPathById = (id: string): LearningPath | undefined => {
  return mockPaths.find(path => path.id === id);
};

export const getPathsByPosition = (position: string): LearningPath[] => {
  return mockPaths.filter(path => 
    path.requiredForPositions.some(pos => position.includes(pos))
  );
};
