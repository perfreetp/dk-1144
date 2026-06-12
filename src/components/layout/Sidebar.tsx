import { NavLink, useLocation } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { menuItems, adminMenuItems } from './menuItems';
import { useAuthStore } from '../../stores/authStore';

export default function Sidebar() {
  const location = useLocation();
  const { user } = useAuthStore();

  const filteredMenuItems = menuItems.filter(item => {
    if (!item.roles) return true;
    return user && item.roles.includes(user.role);
  });

  const filteredAdminItems = adminMenuItems.filter(item => {
    if (!item.roles) return true;
    return user && item.roles.includes(user.role);
  });

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg">知识百科</h1>
            <p className="text-xs text-slate-400">公司内部知识库</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <div className="mb-6">
          <h2 className="text-xs uppercase text-slate-500 tracking-wider mb-3 px-3">主菜单</h2>
          <ul className="space-y-1">
            {filteredMenuItems.map(item => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || 
                (item.path !== '/' && location.pathname.startsWith(item.path));
              
              return (
                <li key={item.id}>
                  <NavLink
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>

        {filteredAdminItems.length > 0 && (
          <div>
            <h2 className="text-xs uppercase text-slate-500 tracking-wider mb-3 px-3">管理功能</h2>
            <ul className="space-y-1">
              {filteredAdminItems.map(item => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <li key={item.id}>
                    <NavLink
                      to={item.path}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </nav>

      <div className="p-4 border-t border-slate-700">
        <div className="bg-slate-800 rounded-lg p-4">
          <div className="text-xs text-slate-400 mb-2">帮助与支持</div>
          <p className="text-sm text-slate-300 mb-3">遇到问题？</p>
          <button className="w-full px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm transition-colors">
            联系管理员
          </button>
        </div>
      </div>
    </aside>
  );
}
