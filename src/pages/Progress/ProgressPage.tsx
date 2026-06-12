import { useEffect } from 'react';
import { Award, Target, Clock, TrendingUp, BookOpen, Star } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { useLearningStore } from '../../stores/learningStore';
import { useKnowledgeStore } from '../../stores/knowledgeStore';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import { ProgressRing } from '../../components/common/Progress';
import Progress from '../../components/common/Progress';
import LearningItem from '../../components/domain/LearningItem';

export default function ProgressPage() {
  const { user } = useAuthStore();
  const { records, quizResults, progressStats, fetchRecords, fetchQuizResults, fetchProgressStats, markAsCompleted, markAsInProgress } = useLearningStore();
  const { entries, fetchEntries } = useKnowledgeStore();

  useEffect(() => {
    if (user) {
      fetchRecords(user.id);
      fetchQuizResults(user.id);
      fetchProgressStats(user.id);
      fetchEntries();
    }
  }, [user, fetchRecords, fetchQuizResults, fetchProgressStats, fetchEntries]);

  const completedCount = records.filter(r => r.status === 'completed').length;
  const inProgressCount = records.filter(r => r.status === 'in_progress').length;
  const averageScore = quizResults.length > 0
    ? Math.round(quizResults.reduce((sum, r) => sum + r.score, 0) / quizResults.length)
    : 0;

  const badges = [
    { icon: Award, label: '学习达人', desc: '完成10个词条学习', earned: completedCount >= 3 },
    { icon: Target, label: '初学者', desc: '完成第一个词条', earned: completedCount >= 1 },
    { icon: Star, label: '测验高手', desc: '平均分超过80', earned: averageScore >= 80 },
    { icon: TrendingUp, label: '持续进步', desc: '连续7天学习', earned: false },
  ];

  return (
    <div className="min-h-full bg-slate-50">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">学习进度</h1>
              <p className="text-indigo-100">
                {user?.name}，继续加油！保持学习的热情 💪
              </p>
            </div>
            <ProgressRing percent={progressStats?.completionRate || 0} size={120} strokeWidth={10} />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">{completedCount}</div>
                <div className="text-sm text-slate-600">已完成学习</div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">{inProgressCount}</div>
                <div className="text-sm text-slate-600">进行中</div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">{averageScore}%</div>
                <div className="text-sm text-slate-600">平均测验成绩</div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">{badges.filter(b => b.earned).length}</div>
                <div className="text-sm text-slate-600">获得勋章</div>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4">我的学习清单</h2>
              <div className="space-y-3">
                {records.length > 0 ? (
                  records.map(record => {
                    const entry = entries.find(e => e.id === record.entryId);
                    if (!entry) return null;
                    return (
                      <LearningItem
                        key={record.id}
                        entry={entry}
                        record={record}
                        onStart={() => markAsInProgress(record.entryId)}
                        onComplete={() => markAsCompleted(record.entryId)}
                      />
                    );
                  })
                ) : (
                  <div className="text-center py-8 text-slate-500">
                    暂无学习记录
                  </div>
                )}
              </div>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <div className="space-y-6">
              <Card className="p-6">
                <h2 className="text-lg font-bold text-slate-900 mb-4">薄弱知识点</h2>
                {progressStats?.weakTopics && progressStats.weakTopics.length > 0 ? (
                  <div className="space-y-3">
                    {progressStats.weakTopics.map(topic => (
                      <div key={topic} className="flex items-center justify-between">
                        <span className="text-sm text-slate-700">{topic}</span>
                        <Badge variant="danger">待加强</Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-600">暂无薄弱知识点</p>
                )}
              </Card>

              <Card className="p-6">
                <h2 className="text-lg font-bold text-slate-900 mb-4">测验成绩</h2>
                {quizResults.length > 0 ? (
                  <div className="space-y-3">
                    {quizResults.map(result => (
                      <div key={result.id} className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-slate-900">
                            测验 #{result.quizId.split('-')[1]}
                          </div>
                          <div className="text-xs text-slate-500">
                            {result.completedAt} · {result.correctCount}/{result.totalQuestions} 题
                          </div>
                        </div>
                        <div className="text-lg font-bold text-indigo-600">{result.score}%</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-600">暂无测验记录</p>
                )}
              </Card>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-900 mb-4">🏆 勋章墙</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {badges.map((badge, idx) => {
              const Icon = badge.icon;
              return (
                <Card
                  key={idx}
                  className={`p-6 text-center ${
                    badge.earned ? '' : 'opacity-50 grayscale'
                  }`}
                >
                  <div className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center ${
                    badge.earned ? 'bg-gradient-to-br from-amber-400 to-orange-500' : 'bg-slate-200'
                  }`}>
                    <Icon className={`w-8 h-8 ${badge.earned ? 'text-white' : 'text-slate-400'}`} />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-1">{badge.label}</h3>
                  <p className="text-xs text-slate-600">{badge.desc}</p>
                  {badge.earned && (
                    <Badge variant="success" className="mt-2">已获得</Badge>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
