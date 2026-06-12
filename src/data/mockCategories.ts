import { Category } from '../types';

export const mockCategories: Category[] = [
  {
    id: '1',
    name: '公司制度',
    icon: 'FileText',
    sortOrder: 1,
    entryCount: 3,
  },
  {
    id: '2',
    name: '人事政策',
    icon: 'Users',
    sortOrder: 2,
    entryCount: 2,
  },
  {
    id: '3',
    name: 'IT系统',
    icon: 'Monitor',
    sortOrder: 3,
    entryCount: 1,
  },
  {
    id: '4',
    name: '行政事务',
    icon: 'Building',
    sortOrder: 4,
    entryCount: 1,
  },
  {
    id: '5',
    name: '财务相关',
    icon: 'Calculator',
    parentId: '1',
    sortOrder: 5,
    entryCount: 2,
  },
  {
    id: '6',
    name: '职场礼仪',
    icon: 'Coffee',
    sortOrder: 6,
    entryCount: 0,
  },
];

export const getCategoryById = (id: string): Category | undefined => {
  return mockCategories.find(cat => cat.id === id);
};

export const getRootCategories = (): Category[] => {
  return mockCategories.filter(cat => !cat.parentId).sort((a, b) => a.sortOrder - b.sortOrder);
};

export const getChildCategories = (parentId: string): Category[] => {
  return mockCategories.filter(cat => cat.parentId === parentId).sort((a, b) => a.sortOrder - b.sortOrder);
};
