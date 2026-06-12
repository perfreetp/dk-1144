import { useNavigate } from 'react-router-dom';
import { MessageCircle, Eye, Clock, Star } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import { Question } from '../../types';

interface QuestionCardProps {
  question: Question;
}

export default function QuestionCard({ question }: QuestionCardProps) {
  const navigate = useNavigate();

  const getStatusBadge = () => {
    switch (question.status) {
      case 'pending':
        return <Badge variant="warning">待解答</Badge>;
      case 'answered':
        return <Badge variant="info">已回复</Badge>;
      case 'adopted':
        return <Badge variant="success">已采纳</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card
      hoverable
      onClick={() => navigate(`/qa/${question.id}`)}
      className="p-6"
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold text-slate-900 line-clamp-2 flex-1">
            {question.title}
          </h3>
          {getStatusBadge()}
        </div>

        <p className="text-sm text-slate-600 line-clamp-2">{question.content}</p>

        <div className="flex flex-wrap gap-2">
          {question.tags.map((tag) => (
            <Badge key={tag} variant="default">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-1">
            {question.authorAvatar && (
              <img
                src={question.authorAvatar}
                alt={question.authorName}
                className="w-5 h-5 rounded-full mr-1.5"
              />
            )}
            <span className="font-medium">{question.authorName}</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <MessageCircle className="w-3.5 h-3.5" />
              {question.answerCount}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              {question.viewCount}
            </span>
            {question.score > 0 && (
              <span className="flex items-center gap-1 text-amber-600">
                <Star className="w-3.5 h-3.5" />
                {question.score}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {question.createdAt}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
