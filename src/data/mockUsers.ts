import { User } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: '张明',
    email: 'zhangming@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhang',
    department: '技术部',
    position: '前端工程师',
    role: 'employee',
    joinDate: '2024-01-15',
  },
  {
    id: '2',
    name: '李华',
    email: 'lihua@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=li',
    department: '人力资源部',
    position: 'HR主管',
    role: 'manager',
    joinDate: '2020-06-01',
  },
  {
    id: '3',
    name: '王强',
    email: 'wangqiang@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=wang',
    department: '财务部',
    position: '财务经理',
    role: 'employee',
    joinDate: '2021-03-10',
  },
  {
    id: '4',
    name: '刘芳',
    email: 'liufang@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=liu',
    department: '技术部',
    position: '技术总监',
    role: 'manager',
    joinDate: '2019-01-20',
  },
  {
    id: '5',
    name: '陈静',
    email: 'chenjing@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=chen',
    department: '行政部',
    position: '行政主管',
    role: 'admin',
    joinDate: '2018-09-15',
  },
];

export const currentUser = mockUsers[0];

export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id);
};
