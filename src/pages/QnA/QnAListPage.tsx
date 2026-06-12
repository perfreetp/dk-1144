import { useEffect, useState } from 'react';
import { Plus, Filter, X } from 'lucide-react';
import { useKnowledgeStore } from '../../stores/knowledgeStore';
import { useAuthStore } from '../../stores/authStore';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import QuestionCard from '../../components/domain/QuestionCard';

export default function QnAListPage() {
  const { questions, fetchQuestions, fetchAnswers, addQuestion } = useKnowledgeStore();
  const { user } = useAuthStore();
  const [filter, setFilter] = useState<'all' | 'pending' | 'answered' | 'adopted'>('all');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: '',
  });

  useEffect(() => {
    fetchQuestions();
    fetchAnswers();
  }, [fetchQuestions, fetchAnswers]);

  const filteredQuestions = questions.filter(q => {
    if (filter === 'all') return true;
    return q.status === filter;
  });

  const stats = {
    all: questions.length,
    pending: questions.filter(q => q.status === 'pending').length,
    answered: questions.filter(q => q.status === 'answered').length,
    adopted: questions.filter(q => q.status === 'adopted').length,
  };

  const handleSubmit = () => {
    if (!formData.title.trim() || !formData.content.trim()) return;

    const tagsArray = formData.tags
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    addQuestion({
      title: formData.title,
      content: `<p>${formData.content}</p>`,
      authorId: user?.id || '1',
      authorName: user?.name || '匿名用户',
      authorAvatar: user?.avatar,
      categoryId: '1',
      tags: tagsArray,
      status: 'pending',
      score: 0,
    });

    setFormData({ title: '', content: '', tags: '' });
    setShowForm(false);
  };

  return (
    <div className="min-h-full bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">问答专区</h1>
              <p className="text-sm text-slate-600 mt-1">
                提问、回答、相互学习 · 共 {questions.length} 个问题
              </p>
            </div>
            <Button
              leftIcon={<Plus className="w-4 h-4" />}
              onClick={() => setShowForm(true)}
            >
              提问
            </Button>
          </div>

          <div className="flex items-center gap-2">
            {[
              { key: 'all', label: '全部' },
              { key: 'pending', label: '待解答' },
              { key: 'answered', label: '已回复' },
              { key: 'adopted', label: '已采纳' },
            ].map(item => (
              <button
                key={item.key}
                onClick={() => setFilter(item.key as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === item.key
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {item.label}
                <Badge variant={filter === item.key ? 'primary' : 'default'} className="ml-2">
                  {stats[item.key as keyof typeof stats]}
                </Badge>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6">
        {showForm && (
          <Card className="p-6 mb-6 border-2 border-indigo-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900">提问</h3>
              <button
                onClick={() => setShowForm(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  问题标题 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="请简要描述你的问题（不超过100字）"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  maxLength={100}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  问题详情 <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="详细描述你的问题，包括背景、具体情况等..."
                  rows={6}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  标签（用逗号分隔）
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="例如：报销,请假,HR"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4">
                <Button variant="secondary" onClick={() => setShowForm(false)}>
                  取消
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!formData.title.trim() || !formData.content.trim()}
                >
                  提交问题
                </Button>
              </div>
            </div>
          </Card>
        )}

        <div className="space-y-4">
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map(question => (
              <QuestionCard key={question.id} question={question} />
            ))
          ) : (
            <Card className="p-12 text-center">
              <Filter className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {filter === 'all' ? '暂无问题' : `暂无${filter === 'pending' ? '待解答' : filter === 'answered' ? '已回复' : '已采纳'}的问题`}
              </h3>
              <p className="text-slate-600 mb-4">
                {filter === 'all' ? '成为第一个提问的人吧！' : '换个筛选条件试试'}
              </p>
              {filter === 'all' && (
                <Button onClick={() => setShowForm(true)}>立即提问</Button>
              )}
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
