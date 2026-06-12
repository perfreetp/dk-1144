import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ThumbsUp, Check, MessageCircle, Clock, Eye } from 'lucide-react';
import { useKnowledgeStore } from '../../stores/knowledgeStore';
import { useAuthStore } from '../../stores/authStore';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';

export default function QuestionDetailPage() {
  const { id } = useParams();
  const { currentQuestion, currentAnswers, fetchQuestionById, adoptAnswer, addAnswer } = useKnowledgeStore();
  const { user } = useAuthStore();
  const [answerContent, setAnswerContent] = useState('');

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
    }
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

  return (
    <div className="min-h-full bg-slate-50">
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
                  <div className="flex items-center gap-2 text-green-600 font-medium mb-4">
                    <Check className="w-5 h-5" />
                    已采纳为最佳答案
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
