import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ThumbsUp, Check, MessageCircle, Clock, Eye, FileText } from 'lucide-react';
import { useKnowledgeStore } from '../../stores/knowledgeStore';
import { useAuthStore } from '../../stores/authStore';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';

export default function QuestionDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentQuestion, currentAnswers, fetchQuestionById, adoptAnswer, addAnswer } = useKnowledgeStore();
  const { user } = useAuthStore();
  const [answerContent, setAnswerContent] = useState('');
  const [showConvertModal, setShowConvertModal] = useState(false);
  const [convertedEntryId, setConvertedEntryId] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchQuestionById(id);
    }
  }, [id, fetchQuestionById]);

  const handleAdopt = (answerId: string) => {
    if (currentQuestion && user?.id === currentQuestion.authorId) {
      adoptAnswer(currentQuestion.id, answerId);
    }
  };

  const handleSubmitAnswer = () => {
    if (answerContent.trim() && currentQuestion && user) {
      addAnswer(currentQuestion.id, `<p>${answerContent}</p>`, user.name);
      setAnswerContent('');
      if (id) {
        fetchQuestionById(id);
      }
    }
  };

  const handleConvertToEntry = () => {
    if (!currentQuestion || !currentAnswers.length) return;

    const adoptedAnswer = currentAnswers.find(a => a.isAdopted);
    if (!adoptedAnswer) return;

    const entryContent = `
      <h2>问题背景</h2>
      <p>${currentQuestion.content.replace(/<[^>]*>/g, '')}</p>

      <h2>解答</h2>
      ${adoptedAnswer.content}

      <h2>相关标签</h2>
      <p>${currentQuestion.tags.join('、')}</p>

      <blockquote>
        <p>📌 此词条由问答 "<a href="/qa/${currentQuestion.id}">${currentQuestion.title}</a>" 采纳后沉淀生成</p>
      </blockquote>
    `;

    const newEntry = {
      id: `entry-from-qa-${currentQuestion.id}`,
      title: currentQuestion.title,
      content: entryContent,
      summary: `关于"${currentQuestion.title}"的详细解答`,
      categoryId: currentQuestion.categoryId,
      responsibleId: adoptedAnswer.authorId,
      responsibleName: adoptedAnswer.authorName,
      departments: ['全部'],
      tags: currentQuestion.tags,
      viewCount: 0,
      favoriteCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      version: 1,
      relatedEntries: [],
      relatedQuestions: [currentQuestion.id],
    };

    const knowledgeStore = useKnowledgeStore.getState();
    knowledgeStore.entries.push(newEntry);

    setConvertedEntryId(newEntry.id);
    setShowConvertModal(false);
  };

  if (!currentQuestion) {
    return (
      <div className="min-h-full flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-slate-600">加载中...</p>
        </div>
      </div>
    );
  }

  const adoptedAnswer = currentAnswers.find(a => a.isAdopted);

  return (
    <div className="min-h-full bg-slate-50">
      {showConvertModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-lg p-6 mx-4">
            <h3 className="text-lg font-bold text-slate-900 mb-4">沉淀为词条</h3>
            <p className="text-slate-600 mb-4">
              确定要将此问答的<strong>最佳答案</strong>沉淀为正式词条吗？
            </p>
            <div className="bg-slate-50 rounded-lg p-4 mb-4">
              <div className="text-sm font-medium text-slate-900 mb-2">{currentQuestion.title}</div>
              <div className="text-xs text-slate-500">
                来源：问答采纳答案 · {adoptedAnswer?.authorName}
              </div>
            </div>
            <div className="flex items-center justify-end gap-3">
              <Button variant="secondary" onClick={() => setShowConvertModal(false)}>
                取消
              </Button>
              <Button onClick={handleConvertToEntry}>
                确认生成
              </Button>
            </div>
          </Card>
        </div>
      )}

      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <Link
            to="/qa"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            返回问答列表
          </Link>

          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <Badge
                  variant={
                    currentQuestion.status === 'adopted'
                      ? 'success'
                      : currentQuestion.status === 'answered'
                      ? 'info'
                      : 'warning'
                  }
                >
                  {currentQuestion.status === 'pending'
                    ? '待解答'
                    : currentQuestion.status === 'answered'
                    ? '已回复'
                    : '已采纳'}
                </Badge>
                {currentQuestion.score > 0 && (
                  <Badge variant="warning">{currentQuestion.score} 积分悬赏</Badge>
                )}
              </div>
              <h1 className="text-2xl font-bold text-slate-900 mb-4">
                {currentQuestion.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-slate-600">
                {currentQuestion.authorAvatar && (
                  <img
                    src={currentQuestion.authorAvatar}
                    alt={currentQuestion.authorName}
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <span className="font-medium">{currentQuestion.authorName}</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {currentQuestion.createdAt}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {currentQuestion.viewCount}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  {currentQuestion.answerCount}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-6">
        <Card className="p-6 mb-6">
          <div
            className="prose prose-slate max-w-none"
            dangerouslySetInnerHTML={{ __html: currentQuestion.content }}
          />
          <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-100">
            {currentQuestion.tags.map(tag => (
              <Badge key={tag} variant="default">
                {tag}
              </Badge>
            ))}
          </div>
        </Card>

        {convertedEntryId && (
          <Card className="p-4 mb-6 bg-green-50 border-green-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-green-600" />
                <span className="text-sm text-green-800">
                  此问答已沉淀为词条
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(`/entry/${convertedEntryId}`)}
              >
                查看词条 →
              </Button>
            </div>
          </Card>
        )}

        <div className="mb-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">
            {currentAnswers.length} 个回答
          </h2>

          <div className="space-y-4">
            {currentAnswers.map(answer => (
              <Card
                key={answer.id}
                className={`p-6 ${
                  answer.isAdopted ? 'border-2 border-green-500 bg-green-50' : ''
                }`}
              >
                {answer.isAdopted && (
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-green-600 font-medium">
                      <Check className="w-5 h-5" />
                      已采纳为最佳答案
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      leftIcon={<FileText className="w-4 h-4" />}
                      onClick={() => setShowConvertModal(true)}
                    >
                      沉淀为词条
                    </Button>
                  </div>
                )}
                <div className="flex items-start gap-4">
                  {answer.authorAvatar && (
                    <img
                      src={answer.authorAvatar}
                      alt={answer.authorName}
                      className="w-10 h-10 rounded-full"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-medium text-slate-900">{answer.authorName}</span>
                      <span className="text-sm text-slate-500">{answer.createdAt}</span>
                    </div>
                    <div
                      className="prose prose-slate max-w-none text-slate-700"
                      dangerouslySetInnerHTML={{ __html: answer.content }}
                    />
                    <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-100">
                      <button className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors">
                        <ThumbsUp className="w-4 h-4" />
                        {answer.upvotes}
                      </button>
                      {!answer.isAdopted &&
                        currentQuestion.status !== 'adopted' &&
                        user?.id === currentQuestion.authorId && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleAdopt(answer.id)}
                            leftIcon={<Check className="w-4 h-4" />}
                          >
                            采纳答案
                          </Button>
                        )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">写回答</h3>
          <textarea
            value={answerContent}
            onChange={(e) => setAnswerContent(e.target.value)}
            placeholder="写下你的回答..."
            rows={6}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
          />
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-slate-600">
              回答被采纳后有机会获得 {currentQuestion.score} 积分
            </p>
            <Button onClick={handleSubmitAnswer} disabled={!answerContent.trim()}>
              提交回答
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
