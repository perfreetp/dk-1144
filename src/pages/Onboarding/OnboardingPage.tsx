import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Mail, FileText, Monitor, Users, BookOpen, ArrowRight, ExternalLink, TrendingUp } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { useKnowledgeStore } from '../../stores/knowledgeStore';
import { useLearningStore } from '../../stores/learningStore';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import { ProgressRing } from '../../components/common/Progress';
import Progress from '../../components/common/Progress';

export default function OnboardingPage() {
  const { user } = useAuthStore();
  const { paths, fetchPaths, entries, fetchEntries, categories, fetchCategories } = useKnowledgeStore();
  const { records, progressStats, fetchRecords, fetchProgressStats, quizResults, fetchQuizResults } = useLearningStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPaths();
    fetchEntries();
    fetchCategories();
  }, [fetchPaths, fetchEntries, fetchCategories]);

  useEffect(() => {
    if (user) {
      fetchRecords(user.id);
      fetchProgressStats(user.id);
      fetchQuizResults(user.id);
    }
  }, [user, fetchRecords, fetchProgressStats, fetchQuizResults]);

  const getDaysSinceJoining = () => {
    if (!user?.joinDate) return 0;
    const joinDate = new Date(user.joinDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - joinDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const recommendedPaths = paths.filter(path =>
    user?.position && path.requiredForPositions.some(pos =>
      user.position.includes(pos) || pos === '全部'
    )
  );

  const handlePathClick = (pathId: string) => {
    const path = paths.find(p => p.id === pathId);
    if (path) {
      navigate(`/map?path=${pathId}`);
    }
  };

  const completedCount = records.filter(r => r.status === 'completed').length;
  const inProgressCount = records.filter(r => r.status === 'in_progress').length;
  const averageScore = quizResults.length > 0
    ? Math.round(quizResults.reduce((sum, r) => sum + r.score, 0) / quizResults.length)
    : 0;

  return (
    <div className="min-h-full bg-gradient-to-br from-slate-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white mb-8">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                    第 {getDaysSinceJoining()} 天
                  </span>
                  <Badge variant="warning">新员工</Badge>
                </div>
                <h1 className="text-3xl font-bold mb-2">
                  欢迎加入，{user?.name}！👋
                </h1>
                <p className="text-indigo-100 text-lg">
                  欢迎来到我们的团队！这里为你准备了入职必备的学习内容，帮你快速融入公司。
                </p>
                <div className="flex items-center gap-6 mt-6">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    <span className="text-sm">{user?.department}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Monitor className="w-5 h-5" />
                    <span className="text-sm">{user?.position}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span className="text-sm">入职于 {user?.joinDate}</span>
                  </div>
                </div>
              </div>
              <div className="hidden lg:block">
                <ProgressRing percent={progressStats?.completionRate || 0} size={140} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">
                    {completedCount}
                  </div>
                  <div className="text-sm text-slate-600">已完成学习</div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">
                    {inProgressCount}
                  </div>
                  <div className="text-sm text-slate-600">进行中</div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">
                    {averageScore}%
                  </div>
                  <div className="text-sm text-slate-600">平均测验成绩</div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">
                    {progressStats?.totalTasks || 0}
                  </div>
                  <div className="text-sm text-slate-600">总任务数</div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4">📚 为你推荐的学习路径</h2>
              <div className="space-y-4">
                {recommendedPaths.length > 0 ? (
                  recommendedPaths.map(path => (
                    <Card
                      key={path.id}
                      hoverable
                      onClick={() => handlePathClick(path.id)}
                      className="p-6 cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-900 mb-2">{path.title}</h3>
                          <p className="text-sm text-slate-600 mb-3">{path.description}</p>
                          <div className="flex items-center gap-4 text-xs text-slate-500">
                            <span>{path.entryIds.length} 个词条</span>
                            <span>约 {path.estimatedMinutes} 分钟</span>
                            <div className="flex flex-wrap gap-1">
                              {path.requiredForPositions.slice(0, 2).map(pos => (
                                <Badge key={pos} variant="default">{pos}</Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-slate-400" />
                      </div>
                    </Card>
                  ))
                ) : (
                  <Card className="p-6 text-center text-slate-500">
                    暂无为你推荐的学习路径
                  </Card>
                )}
              </div>
            </div>

            {records.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-slate-900">📖 最近学习记录</h2>
                  <Link to="/progress" className="text-sm text-indigo-600 hover:text-indigo-700">
                    查看全部 →
                  </Link>
                </div>
                <div className="space-y-3">
                  {records.slice(0, 3).map(record => {
                    const entry = entries.find(e => e.id === record.entryId);
                    if (!entry) return null;
                    return (
                      <Card key={record.id} className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-slate-900">{entry.title}</div>
                            <div className="text-xs text-slate-500">
                              {record.status === 'completed' && `已完成 · ${record.timeSpent}分钟`}
                              {record.status === 'in_progress' && `进行中 · ${record.progress}%`}
                              {record.status === 'not_started' && '未开始'}
                            </div>
                          </div>
                          <Badge variant={record.status === 'completed' ? 'success' : record.status === 'in_progress' ? 'primary' : 'default'}>
                            {record.status === 'completed' ? '已完成' : record.status === 'in_progress' ? '进行中' : '未开始'}
                          </Badge>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-900">🚀 快速入口</h2>
                <Link to="/map" className="text-sm text-indigo-600 hover:text-indigo-700">
                  查看全部 →
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: Mail, label: '企业邮箱', href: '#', color: 'bg-blue-500' },
                  { icon: Monitor, label: 'OA系统', href: '#', color: 'bg-purple-500' },
                  { icon: FileText, label: '考勤系统', href: '#', color: 'bg-green-500' },
                  { icon: Users, label: '通讯录', href: '#', color: 'bg-orange-500' },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <a key={idx} href={item.href} target="_blank" rel="noopener noreferrer">
                      <Card hoverable className="p-6 text-center">
                        <div className={`w-12 h-12 ${item.color} rounded-xl mx-auto mb-3 flex items-center justify-center`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-sm font-medium text-slate-900">{item.label}</div>
                        <ExternalLink className="w-3 h-3 text-slate-400 mx-auto mt-1" />
                      </Card>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4">📋 入职清单</h2>
              <Card className="p-6">
                <div className="space-y-3">
                  {[
                    { label: '完成入职培训', done: true },
                    { label: '开通企业邮箱', done: true },
                    { label: '领取工牌', done: true },
                    { label: '完成必读词条学习', done: false, link: '/progress' },
                    { label: '参加部门例会', done: false },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        item.done ? 'bg-green-500 border-green-500' : 'border-slate-300'
                      }`}>
                        {item.done && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                      {item.link ? (
                        <Link to={item.link} className={`text-sm ${item.done ? 'text-slate-500 line-through' : 'text-slate-900 hover:text-indigo-600'}`}>
                          {item.label}
                        </Link>
                      ) : (
                        <span className={`text-sm ${item.done ? 'text-slate-500 line-through' : 'text-slate-900'}`}>
                          {item.label}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4">🏢 公司介绍</h2>
              <Card className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">关于我们</h3>
                    <p className="text-sm text-slate-600">
                      我们是一家专注于企业服务的科技公司，致力于为客户提供优质的产品和服务。
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">我们的价值观</h3>
                    <div className="flex flex-wrap gap-2">
                      {['创新', '协作', '责任', '成长'].map(v => (
                        <Badge key={v} variant="primary">{v}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4">📢 最新公告</h2>
              <div className="space-y-3">
                {[
                  { title: '2024年度体检通知', date: '2024-03-10' },
                  { title: '清明节放假安排', date: '2024-03-08' },
                  { title: '第一季度团建活动', date: '2024-03-05' },
                ].map((notice, idx) => (
                  <Card key={idx} hoverable className="p-4">
                    <div className="text-sm font-medium text-slate-900 mb-1">{notice.title}</div>
                    <div className="text-xs text-slate-500">{notice.date}</div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
