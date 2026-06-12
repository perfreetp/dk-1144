import { useState } from 'react';
import { Plus, Filter } from 'lucide-react';
import { useKnowledgeStore } from '../../stores/knowledgeStore';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import QuestionCard from '../../components/domain/QuestionCard';

export default function QnAListPage() {
  const { questions, fetchQuestions } = useKnowledgeStore();
  const [filter, setFilter] = useState<'all' | 'pending' | 'answered' | 'adopted'>('all');
  const [showForm, setShowForm] = useState(false);

  const filteredQuestions = questions.filter(q => {
    if (filter === 'all') return true;
    return q.status === filter;
  });

  return (
    <div className="min-h-full bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">问答专区</h1>
              <p className="text-sm text-slate-600 mt-1">
                提问、回答、相互学习
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
              { key: 'all', label: '全部', count: questions.length },
              { key: 'pending', label: '待解答', count: questions.filter(q => q.status === 'pending').length },
              { key: 'answered', label: '已回复', count: questions.filter(q => q.status === 'answered').length },
              { key: 'adopted', label: '已采纳', count: questions.filter(q => q.status === 'adopted').length },
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
                  {item.count}
                </Badge>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="space-y-4">
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map(question => (
              <QuestionCard key={question.id} question={question} />
            ))
          ) : (
            <Card className="p-12 text-center">
              <Filter className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">暂无相关问题</h3>
              <p className="text-slate-600 mb-4">成为第一个提问的人吧！</p>
              <Button onClick={() => setShowForm(true)}>立即提问</Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
