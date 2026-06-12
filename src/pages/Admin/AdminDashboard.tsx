import { useState, useEffect } from 'react';
import { Users, FileText, MessageCircle, TrendingUp, AlertCircle, Plus, Edit2, Trash2, X } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { useKnowledgeStore } from '../../stores/knowledgeStore';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Progress from '../../components/common/Progress';
import { Entry, LearningPath } from '../../types';

export default function AdminDashboard() {
  const { user } = useAuthStore();
  const { entries, paths, categories, fetchEntries, fetchPaths, fetchCategories } = useKnowledgeStore();

  const [showEntryModal, setShowEntryModal] = useState(false);
  const [showPathModal, setShowPathModal] = useState(false);
  const [editingEntry, setEditingEntry] = useState<Entry | null>(null);
  const [editingPath, setEditingPath] = useState<LearningPath | null>(null);

  const [entryForm, setEntryForm] = useState({
    title: '',
    content: '',
    summary: '',
    categoryId: '1',
    responsibleName: '',
    tags: '',
  });

  const [pathForm, setPathForm] = useState({
    title: '',
    description: '',
    entryIds: [] as string[],
    requiredForPositions: '',
    estimatedMinutes: 30,
  });

  useEffect(() => {
    fetchEntries();
    fetchPaths();
    fetchCategories();
  }, [fetchEntries, fetchPaths, fetchCategories]);

  const stats = {
    totalUsers: 156,
    activeUsers: 142,
    totalEntries: entries.length,
    totalQuestions: 234,
    answeredQuestions: 198,
    pendingQuestions: 36,
  };

  const weakPoints = [
    { topic: 'IT系统使用', count: 28, percentage: 18 },
    { topic: '绩效考核', count: 22, percentage: 14 },
    { topic: '财务报销', count: 15, percentage: 10 },
  ];

  const teamProgress = [
    { name: '张明', department: '技术部', completion: 75, status: '进行中' },
    { name: '李华', department: '人力资源部', completion: 90, status: '优秀' },
    { name: '王强', department: '财务部', completion: 60, status: '进行中' },
    { name: '陈静', department: '行政部', completion: 85, status: '良好' },
  ];

  const recentQuestions = [
    { id: 1, title: '如何申请年假？', author: '张明', status: 'adopted', time: '2小时前' },
    { id: 2, title: 'OA系统登录问题', author: '王强', status: 'pending', time: '5小时前' },
    { id: 3, title: '会议室预订限制', author: '李华', status: 'answered', time: '1天前' },
  ];

  const handleSaveEntry = () => {
    const tagsArray = pathForm.requiredForPositions.split(',').map(t => t.trim()).filter(t => t);

    const newEntry: Entry = {
      id: editingEntry?.id || `entry-${Date.now()}`,
      title: entryForm.title,
      content: `<p>${entryForm.content}</p>`,
      summary: entryForm.summary,
      categoryId: entryForm.categoryId,
      responsibleId: '1',
      responsibleName: entryForm.responsibleName || user?.name || '管理员',
      departments: ['全部'],
      tags: entryForm.tags.split(',').map(t => t.trim()).filter(t => t),
      viewCount: editingEntry?.viewCount || 0,
      favoriteCount: editingEntry?.favoriteCount || 0,
      createdAt: editingEntry?.createdAt || new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      version: editingEntry ? editingEntry.version + 1 : 1,
      relatedEntries: [],
      relatedQuestions: [],
    };

    const knowledgeStore = useKnowledgeStore.getState();
    if (editingEntry) {
      const index = knowledgeStore.entries.findIndex(e => e.id === editingEntry.id);
      if (index !== -1) {
        knowledgeStore.entries[index] = newEntry;
      }
    } else {
      knowledgeStore.entries.push(newEntry);
    }

    setShowEntryModal(false);
    setEditingEntry(null);
    setEntryForm({
      title: '',
      content: '',
      summary: '',
      categoryId: '1',
      responsibleName: '',
      tags: '',
    });
  };

  const handleSavePath = () => {
    const positionsArray = pathForm.requiredForPositions.split(',').map(t => t.trim()).filter(t => t);

    const newPath: LearningPath = {
      id: editingPath?.id || `path-${Date.now()}`,
      title: pathForm.title,
      description: pathForm.description,
      entryIds: pathForm.entryIds,
      requiredForPositions: positionsArray,
      estimatedMinutes: pathForm.estimatedMinutes,
    };

    const knowledgeStore = useKnowledgeStore.getState();
    if (editingPath) {
      const index = knowledgeStore.paths.findIndex(p => p.id === editingPath.id);
      if (index !== -1) {
        knowledgeStore.paths[index] = newPath;
      }
    } else {
      knowledgeStore.paths.push(newPath);
    }

    setShowPathModal(false);
    setEditingPath(null);
    setPathForm({
      title: '',
      description: '',
      entryIds: [],
      requiredForPositions: '',
      estimatedMinutes: 30,
    });
  };

  return (
    <div className="min-h-full bg-slate-50">
      {showEntryModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-auto py-8">
          <Card className="w-full max-w-2xl m-4">
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h3 className="text-lg font-bold text-slate-900">
                {editingEntry ? '编辑词条' : '创建新词条'}
              </h3>
              <button
                onClick={() => {
                  setShowEntryModal(false);
                  setEditingEntry(null);
                }}
                className="p-2 hover:bg-slate-100 rounded-lg"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  词条标题 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={entryForm.title}
                  onChange={(e) => setEntryForm({ ...entryForm, title: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="请输入词条标题"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  摘要 <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={entryForm.summary}
                  onChange={(e) => setEntryForm({ ...entryForm, summary: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  placeholder="请输入词条摘要"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  正文内容 <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={entryForm.content}
                  onChange={(e) => setEntryForm({ ...entryForm, content: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  placeholder="请输入正文内容（支持HTML格式）"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">所属分类</label>
                  <select
                    value={entryForm.categoryId}
                    onChange={(e) => setEntryForm({ ...entryForm, categoryId: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">负责人</label>
                  <input
                    type="text"
                    value={entryForm.responsibleName}
                    onChange={(e) => setEntryForm({ ...entryForm, responsibleName: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="负责人姓名"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  标签（用逗号分隔）
                </label>
                <input
                  type="text"
                  value={entryForm.tags}
                  onChange={(e) => setEntryForm({ ...entryForm, tags: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="例如：报销,请假,HR"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-200">
              <Button
                variant="secondary"
                onClick={() => {
                  setShowEntryModal(false);
                  setEditingEntry(null);
                }}
              >
                取消
              </Button>
              <Button
                onClick={handleSaveEntry}
                disabled={!entryForm.title.trim() || !entryForm.summary.trim()}
              >
                {editingEntry ? '保存修改' : '创建词条'}
              </Button>
            </div>
          </Card>
        </div>
      )}

      {showPathModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-auto py-8">
          <Card className="w-full max-w-2xl m-4">
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h3 className="text-lg font-bold text-slate-900">
                {editingPath ? '编辑主题路径' : '创建新主题路径'}
              </h3>
              <button
                onClick={() => {
                  setShowPathModal(false);
                  setEditingPath(null);
                }}
                className="p-2 hover:bg-slate-100 rounded-lg"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  路径名称 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={pathForm.title}
                  onChange={(e) => setPathForm({ ...pathForm, title: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="请输入路径名称"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  路径描述 <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={pathForm.description}
                  onChange={(e) => setPathForm({ ...pathForm, description: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  placeholder="请输入路径描述"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  包含词条
                </label>
                <div className="space-y-2 max-h-40 overflow-y-auto border border-slate-200 rounded-lg p-3">
                  {entries.map(entry => (
                    <label key={entry.id} className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={pathForm.entryIds.includes(entry.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setPathForm({
                              ...pathForm,
                              entryIds: [...pathForm.entryIds, entry.id],
                            });
                          } else {
                            setPathForm({
                              ...pathForm,
                              entryIds: pathForm.entryIds.filter(id => id !== entry.id),
                            });
                          }
                        }}
                        className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                      />
                      {entry.title}
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    适用岗位（用逗号分隔）
                  </label>
                  <input
                    type="text"
                    value={pathForm.requiredForPositions}
                    onChange={(e) => setPathForm({ ...pathForm, requiredForPositions: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="例如：前端工程师,后端工程师"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    预计时长（分钟）
                  </label>
                  <input
                    type="number"
                    value={pathForm.estimatedMinutes}
                    onChange={(e) => setPathForm({ ...pathForm, estimatedMinutes: parseInt(e.target.value) || 30 })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    min={1}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-200">
              <Button
                variant="secondary"
                onClick={() => {
                  setShowPathModal(false);
                  setEditingPath(null);
                }}
              >
                取消
              </Button>
              <Button
                onClick={handleSavePath}
                disabled={!pathForm.title.trim() || !pathForm.description.trim()}
              >
                {editingPath ? '保存修改' : '创建路径'}
              </Button>
            </div>
          </Card>
        </div>
      )}

      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">管理仪表盘</h1>
          <p className="text-sm text-slate-600">欢迎回来，{user?.name}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-slate-600 mb-1">总用户数</div>
                <div className="text-2xl font-bold text-slate-900">{stats.totalUsers}</div>
              </div>
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
            <div className="mt-3 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
              <span className="text-green-600">+12%</span>
              <span className="text-slate-500 ml-2">较上月</span>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-slate-600 mb-1">知识词条</div>
                <div className="text-2xl font-bold text-slate-900">{stats.totalEntries}</div>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-3 text-sm text-slate-500">
              <Button variant="ghost" size="sm" onClick={() => setShowEntryModal(true)}>
                <Plus className="w-4 h-4 mr-1" /> 添加词条
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-slate-600 mb-1">主题路径</div>
                <div className="text-2xl font-bold text-slate-900">{paths.length}</div>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-3 text-sm text-slate-500">
              <Button variant="ghost" size="sm" onClick={() => setShowPathModal(true)}>
                <Plus className="w-4 h-4 mr-1" /> 添加路径
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-slate-600 mb-1">待回复问题</div>
                <div className="text-2xl font-bold text-slate-900">{stats.pendingQuestions}</div>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-amber-600" />
              </div>
            </div>
            <div className="mt-3 text-sm text-amber-600">
              需要关注
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-slate-900">团队学习进度</h2>
                <Badge variant="primary">{teamProgress.length} 名成员</Badge>
              </div>
              <div className="space-y-4">
                {teamProgress.map((member, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <span className="w-20 text-sm font-medium">{member.name}</span>
                    <div className="flex-1">
                      <Progress
                        percent={member.completion}
                        variant={member.completion >= 80 ? 'success' : 'default'}
                        size="sm"
                      />
                    </div>
                    <span className="text-sm font-medium text-slate-700 w-12">
                      {member.completion}%
                    </span>
                    <Badge
                      variant={
                        member.status === '优秀'
                          ? 'success'
                          : member.status === '良好'
                          ? 'primary'
                          : 'warning'
                      }
                    >
                      {member.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-slate-900">最新问答</h2>
                <a href="/qa" className="text-sm text-indigo-600 hover:text-indigo-700">
                  查看全部 →
                </a>
              </div>
              <div className="space-y-3">
                {recentQuestions.map(q => (
                  <div key={q.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div>
                      <div className="font-medium text-slate-900 text-sm">{q.title}</div>
                      <div className="text-xs text-slate-500">{q.author} · {q.time}</div>
                    </div>
                    <Badge
                      variant={
                        q.status === 'adopted'
                          ? 'success'
                          : q.status === 'answered'
                          ? 'primary'
                          : 'warning'
                      }
                    >
                      {q.status === 'adopted'
                        ? '已采纳'
                        : q.status === 'answered'
                        ? '已回复'
                        : '待解答'}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="p-6 mb-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4">团队薄弱知识点</h2>
              <div className="space-y-4">
                {weakPoints.map((point, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700">{point.topic}</span>
                      <span className="text-sm text-slate-500">{point.count} 人</span>
                    </div>
                    <Progress percent={point.percentage} size="sm" variant="danger" />
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100">
                <p className="text-xs text-slate-600">
                  建议：针对这些薄弱点增加相关培训和学习资源
                </p>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4">快捷操作</h2>
              <div className="space-y-2">
                <button
                  onClick={() => setShowEntryModal(true)}
                  className="w-full text-left px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-lg text-sm transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4 text-indigo-600" />
                  创建新词条
                </button>
                <button
                  onClick={() => setShowPathModal(true)}
                  className="w-full text-left px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-lg text-sm transition-colors flex items-center gap-2"
                >
                  <TrendingUp className="w-4 h-4 text-indigo-600" />
                  管理主题路径
                </button>
                <button className="w-full text-left px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-lg text-sm transition-colors flex items-center gap-2">
                  <FileText className="w-4 h-4 text-indigo-600" />
                  查看待审核内容
                </button>
                <button className="w-full text-left px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-lg text-sm transition-colors flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-indigo-600" />
                  导出学习报表
                </button>
              </div>
            </Card>

            <Card className="p-6 mt-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4">最近创建的词条</h2>
              <div className="space-y-3">
                {entries.slice(0, 5).map(entry => (
                  <div key={entry.id} className="flex items-center justify-between">
                    <span className="text-sm text-slate-700 line-clamp-1 flex-1">{entry.title}</span>
                    <button
                      onClick={() => {
                        setEditingEntry(entry);
                        setEntryForm({
                          title: entry.title,
                          content: entry.content.replace(/<[^>]*>/g, ''),
                          summary: entry.summary,
                          categoryId: entry.categoryId,
                          responsibleName: entry.responsibleName,
                          tags: entry.tags.join(','),
                        });
                        setShowEntryModal(true);
                      }}
                      className="p-1 hover:bg-slate-100 rounded"
                    >
                      <Edit2 className="w-4 h-4 text-slate-400" />
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
