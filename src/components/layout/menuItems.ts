import { Home, Map, MessageCircleQuestion, BookOpen, TrendingUp, Settings, Users } from 'lucide-react';

export interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  roles?: ('employee' | 'manager' | 'admin')[];
}

export const menuItems: MenuItem[] = [
  {
    id: 'onboarding',
    label: '入职导航',
    icon: Home,
    path: '/',
  },
  {
    id: 'knowledge-map',
    label: '知识地图',
    icon: Map,
    path: '/map',
  },
  {
    id: 'qa',
    label: '问答专区',
    icon: MessageCircleQuestion,
    path: '/qa',
  },
  {
    id: 'progress',
    label: '学习进度',
    icon: TrendingUp,
    path: '/progress',
  },
];

export const adminMenuItems: MenuItem[] = [
  {
    id: 'admin-dashboard',
    label: '管理仪表盘',
    icon: Settings,
    path: '/admin',
    roles: ['manager', 'admin'],
  },
  {
    id: 'team-management',
    label: '团队管理',
    icon: Users,
    path: '/admin/team',
    roles: ['manager'],
  },
];
