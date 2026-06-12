import { useNavigate } from 'react-router-dom';
import { Eye, Heart, Clock, User } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import { Entry } from '../../types';

interface EntryCardProps {
  entry: Entry;
}

export default function EntryCard({ entry }: EntryCardProps) {
  const navigate = useNavigate();

  return (
    <Card hoverable onClick={() => navigate(`/entry/${entry.id}`)} className="p-6">
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold text-slate-900 line-clamp-2 flex-1">
            {entry.title}
          </h3>
          <Badge variant="primary">{entry.version}版</Badge>
        </div>

        <p className="text-sm text-slate-600 line-clamp-2">{entry.summary}</p>

        <div className="flex flex-wrap gap-2">
          {entry.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="default">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              {entry.viewCount}
            </span>
            <span className="flex items-center gap-1">
              <Heart className="w-3.5 h-3.5" />
              {entry.favoriteCount}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <User className="w-3.5 h-3.5" />
            {entry.responsibleName}
          </div>
        </div>
      </div>
    </Card>
  );
}
