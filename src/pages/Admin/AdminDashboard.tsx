import { Users, FileText, MessageCircle, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Progress from '../../components/common/Progress';

export default function AdminDashboard() {
  const { user } = useAuthStore();

  const stats = {
    totalUsers: 156,
    activeUsers: 142,
    totalEntries: 87,
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

  return (
    <div className="min-h-full bg-slate-50">
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
              本月新增 8 个词条
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-slate-600 mb-1">已解答问题</div>
                <div className="text-2xl font-bold text-slate-900">{stats.answeredQuestions}</div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-3 text-sm text-slate-500">
              解答率 {Math.round((stats.answeredQuestions / stats.totalQuestions) * 100)}%
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
                    {member.name}
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
                <button className="w-full text-left px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-lg text-sm transition-colors">
                  创建新词条
                </button>
                <button className="w-full text-left px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-lg text-sm transition-colors">
                  管理主题路径
                </button>
                <button className="w-full text-left px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-lg text-sm transition-colors">
                  查看待审核内容
                </button>
                <button className="w-full text-left px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-lg text-sm transition-colors">
                  导出学习报表
                </button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
