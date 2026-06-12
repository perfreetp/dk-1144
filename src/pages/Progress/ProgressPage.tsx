import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, Target, Clock, TrendingUp, BookOpen, Star, PlayCircle, X, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { useLearningStore } from '../../stores/learningStore';
import { useKnowledgeStore } from '../../stores/knowledgeStore';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import { ProgressRing } from '../../components/common/Progress';
import Progress from '../../components/common/Progress';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizData {
  id: string;
  entryId: string;
  title: string;
  questions: QuizQuestion[];
  passingScore: number;
}

const mockQuizzes: QuizData[] = [
  {
    id: 'quiz-1',
    entryId: '1',
    title: '公司报销制度测试',
    questions: [
      { id: 'q1', question: '报销申请需要在费用发生后多少天内提交？', options: ['15天', '30天', '45天', '60天'], correctAnswer: 1 },
      { id: 'q2', question: '普通员工的差旅住宿标准是多少？', options: ['≤300元/晚', '≤400元/晚', '≤500元/晚', '≤600元/晚'], correctAnswer: 1 },
      { id: 'q3', question: '单笔报销超过多少元需要总监审批？', options: ['3000元', '5000元', '8000元', '10000元'], correctAnswer: 1 },
      { id: 'q4', question: '差旅费报销需要提供什么类型的发票？', options: ['普通收据', '增值税发票', '定额发票', '电子凭证'], correctAnswer: 1 },
      { id: 'q5', question: '报销审批流程的第一步是什么？', options: ['财务审核', '员工在OA系统提交报销申请', '出纳付款', '总监审批'], correctAnswer: 1 },
    ],
    passingScore: 60,
  },
  {
    id: 'quiz-2',
    entryId: '2',
    title: '年假与请假制度测试',
    questions: [
      { id: 'q1', question: '工龄1-10年的员工年假是多少天？', options: ['3天', '5天', '7天', '10天'], correctAnswer: 1 },
      { id: 'q2', question: '病假工资发放比例是多少？', options: ['100%', '90%', '80%', '70%'], correctAnswer: 2 },
      { id: 'q3', question: '婚假有多少天？', options: ['1天', '3天', '5天', '7天'], correctAnswer: 1 },
      { id: 'q4', question: '请假流程中需要HR备案的是？', options: ['所有请假', '仅年假', '婚假、产假等', '都不需要'], correctAnswer: 2 },
      { id: 'q5', question: '年假需要在什么时候使用完？', options: ['3月底', '6月底', '当年12月31日', '次年3月'], correctAnswer: 2 },
    ],
    passingScore: 60,
  },
];

export default function ProgressPage() {
  const { user } = useAuthStore();
  const { records, quizResults, progressStats, fetchRecords, fetchQuizResults, fetchProgressStats, markAsCompleted, markAsInProgress, addQuizResult } = useLearningStore();
  const { entries, fetchEntries, getEntryById } = useKnowledgeStore();
  const navigate = useNavigate();

  const [showQuizModal, setShowQuizModal] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState<QuizData | null>(null);
  const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  useEffect(() => {
    fetchEntries();
    if (user) {
      fetchRecords(user.id);
      fetchQuizResults(user.id);
      fetchProgressStats(user.id);
    }
  }, [user, fetchEntries, fetchRecords, fetchQuizResults, fetchProgressStats]);

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

  const handleStartLearning = (entryId: string) => {
    markAsInProgress(entryId);
    navigate(`/entry/${entryId}`);
  };

  const handleStartQuiz = (entryId: string) => {
    const quiz = mockQuizzes.find(q => q.entryId === entryId);
    if (quiz) {
      setCurrentQuiz(quiz);
      setSelectedEntryId(entryId);
      setSelectedAnswers(new Array(quiz.questions.length).fill(-1));
      setCurrentQuestionIndex(0);
      setQuizSubmitted(false);
      setQuizScore(0);
      setShowQuizModal(true);
    }
  };

  const handleSelectAnswer = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuiz && currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitQuiz = () => {
    if (!currentQuiz) return;

    let correctCount = 0;
    currentQuiz.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / currentQuiz.questions.length) * 100);
    setQuizScore(score);
    setQuizSubmitted(true);

    const newResult = {
      id: `result-${Date.now()}`,
      userId: user?.id || '1',
      quizId: currentQuiz.id,
      score,
      totalQuestions: currentQuiz.questions.length,
      correctCount,
      answers: selectedAnswers,
      completedAt: new Date().toISOString().split('T')[0],
    };

    addQuizResult(newResult);

    if (score >= currentQuiz.passingScore && selectedEntryId) {
      markAsCompleted(selectedEntryId);
    }
  };

  const handleCloseQuiz = () => {
    setShowQuizModal(false);
    setCurrentQuiz(null);
    setSelectedEntryId(null);
    setSelectedAnswers([]);
    setCurrentQuestionIndex(0);
    setQuizSubmitted(false);
    setQuizScore(0);
  };

  return (
    <div className="min-h-full bg-slate-50">
      {showQuizModal && currentQuiz && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-auto py-8">
          <Card className="w-full max-w-2xl m-4">
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{currentQuiz.title}</h3>
                <p className="text-sm text-slate-500">
                  {quizSubmitted
                    ? `已完成 · 得分：${quizScore}%`
                    : `题目 ${currentQuestionIndex + 1}/${currentQuiz.questions.length}`}
                </p>
              </div>
              <button
                onClick={handleCloseQuiz}
                className="p-2 hover:bg-slate-100 rounded-lg"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            {quizSubmitted ? (
              <div className="p-6">
                <div className={`text-center py-8 ${quizScore >= currentQuiz.passingScore ? 'bg-green-50' : 'bg-amber-50'} rounded-xl mb-6`}>
                  {quizScore >= currentQuiz.passingScore ? (
                    <>
                      <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                      <h4 className="text-xl font-bold text-green-700 mb-2">恭喜通过！</h4>
                      <p className="text-green-600">你的得分是 {quizScore}%，已达到及格线</p>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-16 h-16 text-amber-600 mx-auto mb-4" />
                      <h4 className="text-xl font-bold text-amber-700 mb-2">未通过</h4>
                      <p className="text-amber-600">你的得分是 {quizScore}%，需要达到 {currentQuiz.passingScore}% 才能通过</p>
                    </>
                  )}
                </div>

                <h4 className="font-semibold text-slate-900 mb-4">答题详情</h4>
                <div className="space-y-4 max-h-60 overflow-y-auto">
                  {currentQuiz.questions.map((q, idx) => {
                    const isCorrect = selectedAnswers[idx] === q.correctAnswer;
                    return (
                      <div key={q.id} className={`p-4 rounded-lg border ${
                        isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                      }`}>
                        <div className="flex items-start gap-3">
                          {isCorrect ? (
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                          )}
                          <div>
                            <p className="font-medium text-slate-900 mb-2">{q.question}</p>
                            <p className="text-sm text-slate-600">
                              你的答案：{selectedAnswers[idx] >= 0 ? q.options[selectedAnswers[idx]] : '未作答'}
                            </p>
                            {!isCorrect && (
                              <p className="text-sm text-green-600">
                                正确答案：{q.options[q.correctAnswer]}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <Button variant="secondary" onClick={handleCloseQuiz}>
                    关闭
                  </Button>
                  {quizScore < currentQuiz.passingScore && (
                    <Button
                      onClick={() => {
                        setSelectedAnswers(new Array(currentQuiz.questions.length).fill(-1));
                        setCurrentQuestionIndex(0);
                        setQuizSubmitted(false);
                        setQuizScore(0);
                      }}
                    >
                      重新测验
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <>
                <div className="p-6">
                  <div className="mb-4">
                    <Progress
                      percent={((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100}
                      size="sm"
                    />
                  </div>

                  <h4 className="text-lg font-medium text-slate-900 mb-4">
                    {currentQuiz.questions[currentQuestionIndex].question}
                  </h4>

                  <div className="space-y-3">
                    {currentQuiz.questions[currentQuestionIndex].options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSelectAnswer(idx)}
                        className={`w-full text-left p-4 rounded-lg border transition-all ${
                          selectedAnswers[currentQuestionIndex] === idx
                            ? 'border-indigo-500 bg-indigo-50'
                            : 'border-slate-200 hover:border-indigo-300'
                        }`}
                      >
                        <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full mr-3 text-sm font-medium ${
                          selectedAnswers[currentQuestionIndex] === idx
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {String.fromCharCode(65 + idx)}
                        </span>
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between p-6 border-t border-slate-200">
                  <Button
                    variant="ghost"
                    onClick={handlePrevQuestion}
                    disabled={currentQuestionIndex === 0}
                  >
                    上一题
                  </Button>

                  {currentQuestionIndex < currentQuiz.questions.length - 1 ? (
                    <Button
                      onClick={handleNextQuestion}
                      disabled={selectedAnswers[currentQuestionIndex] === -1}
                    >
                      下一题
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmitQuiz}
                      disabled={selectedAnswers.includes(-1)}
                    >
                      提交测验
                    </Button>
                  )}
                </div>
              </>
            )}
          </Card>
        </div>
      )}

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
                    const hasQuiz = mockQuizzes.some(q => q.entryId === record.entryId);
                    if (!entry) return null;
                    return (
                      <div key={record.id} className="flex items-center gap-4 p-4 rounded-xl border transition-all bg-white hover:border-indigo-200">
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                          record.status === 'completed'
                            ? 'bg-green-100 text-green-600'
                            : record.status === 'in_progress'
                            ? 'bg-indigo-100 text-indigo-600'
                            : 'bg-slate-100 text-slate-400'
                        }`}>
                          {record.status === 'completed' ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : record.status === 'in_progress' ? (
                            <PlayCircle className="w-5 h-5" />
                          ) : (
                            <BookOpen className="w-5 h-5" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-slate-900">{entry.title}</h4>
                          <p className="text-xs text-slate-500">
                            {record.status === 'completed' && `已完成 · ${record.timeSpent}分钟`}
                            {record.status === 'in_progress' && `进行中 · ${record.progress}%`}
                            {record.status === 'not_started' && '未开始'}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <Badge variant={record.status === 'completed' ? 'success' : record.status === 'in_progress' ? 'primary' : 'default'}>
                            {record.status === 'completed' ? '已完成' : record.status === 'in_progress' ? '进行中' : '未开始'}
                          </Badge>

                          {record.status === 'completed' ? (
                            <>
                              <Button variant="ghost" size="sm" onClick={() => handleStartLearning(record.entryId)}>
                                查看详情
                              </Button>
                              {hasQuiz && (
                                <Button
                                  variant="secondary"
                                  size="sm"
                                  leftIcon={<PlayCircle className="w-4 h-4" />}
                                  onClick={() => handleStartQuiz(record.entryId)}
                                >
                                  重新测验
                                </Button>
                              )}
                            </>
                          ) : (
                            <Button size="sm" onClick={() => handleStartLearning(record.entryId)}>
                              {record.status === 'in_progress' ? '继续学习' : '开始学习'}
                            </Button>
                          )}

                          {record.status === 'completed' && hasQuiz && (
                            <Button
                              variant="secondary"
                              size="sm"
                              leftIcon={<PlayCircle className="w-4 h-4" />}
                              onClick={() => handleStartQuiz(record.entryId)}
                            >
                              参加小测
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-8 text-slate-500">
                    <BookOpen className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                    <p>暂无学习记录</p>
                    <p className="text-sm mt-2">从知识地图开始你的学习之旅吧！</p>
                    <Button className="mt-4" onClick={() => navigate('/map')}>
                      浏览知识地图
                    </Button>
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
                        <div className={`text-lg font-bold ${result.score >= 60 ? 'text-green-600' : 'text-amber-600'}`}>
                          {result.score}%
                        </div>
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
