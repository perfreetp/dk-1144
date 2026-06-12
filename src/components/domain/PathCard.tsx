import { Clock, BookOpen, TrendingUp } from 'lucide-react';
import Card from '../common/Card';
import Progress from '../common/Progress';
import { LearningPath } from '../../types';

interface PathCardProps {
  path: LearningPath;
  onClick?: () => void;
}

export default function PathCard({ path, onClick }: PathCardProps) {
  return (
    <Card hoverable onClick={onClick} className="p-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h3 className="font-semibold text-slate-900 mb-2">{path.title}</h3>
            <p className="text-sm text-slate-600 line-clamp-2">{path.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-slate-600">
          <span className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            {path.entryIds.length} 个词条
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            约 {path.estimatedMinutes} 分钟
          </span>
        </div>

        {path.progress !== undefined && (
          <div className="flex items-center gap-3">
            <Progress
              percent={path.progress}
              variant={path.progress === 100 ? 'success' : 'default'}
              size="sm"
              className="flex-1"
            />
            <span className="text-sm font-medium text-slate-700">
              {path.progress === 100 ? (
                <span className="text-green-600 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  已完成
                </span>
              ) : (
                `${path.progress}%`
              )}
            </span>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {path.requiredForPositions.slice(0, 3).map((position) => (
            <span
              key={position}
              className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs"
            >
              {position}
            </span>
          ))}
          {path.requiredForPositions.length > 3 && (
            <span className="px-2.5 py-1 bg-slate-100 text-slate-500 rounded-lg text-xs">
              +{path.requiredForPositions.length - 3}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}
