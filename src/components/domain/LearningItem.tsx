import { Check, Circle, PlayCircle } from 'lucide-react';
import { LearningRecord, Entry } from '../../types';
import { clsx } from 'clsx';

interface LearningItemProps {
  entry: Entry;
  record: LearningRecord;
  onStart?: () => void;
  onComplete?: () => void;
}

export default function LearningItem({ entry, record, onStart, onComplete }: LearningItemProps) {
  const getStatusIcon = () => {
    switch (record.status) {
      case 'completed':
        return <Check className="w-5 h-5 text-green-600" />;
      case 'in_progress':
        return <PlayCircle className="w-5 h-5 text-indigo-600" />;
      default:
        return <Circle className="w-5 h-5 text-slate-400" />;
    }
  };

  const getStatusText = () => {
    switch (record.status) {
      case 'completed':
        return '已完成';
      case 'in_progress':
        return '进行中';
      default:
        return '未开始';
    }
  };

  return (
    <div
      className={clsx(
        'flex items-center gap-4 p-4 rounded-xl border transition-all duration-200',
        record.status === 'completed'
          ? 'bg-green-50 border-green-200'
          : record.status === 'in_progress'
          ? 'bg-indigo-50 border-indigo-200'
          : 'bg-white border-slate-200 hover:border-slate-300'
      )}
    >
      <div className="flex-shrink-0">{getStatusIcon()}</div>

      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-slate-900 mb-1">{entry.title}</h4>
        <p className="text-sm text-slate-600 line-clamp-1">{entry.summary}</p>
      </div>

      <div className="flex items-center gap-4">
        <span
          className={clsx(
            'text-sm font-medium',
            record.status === 'completed'
              ? 'text-green-600'
              : record.status === 'in_progress'
              ? 'text-indigo-600'
              : 'text-slate-500'
          )}
        >
          {getStatusText()}
        </span>

        {record.status === 'completed' && (
          <button
            onClick={onComplete}
            className="px-4 py-2 text-sm text-indigo-600 hover:bg-indigo-100 rounded-lg transition-colors"
          >
            重新学习
          </button>
        )}

        {record.status === 'in_progress' && (
          <button
            onClick={onComplete}
            className="px-4 py-2 text-sm bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg transition-colors"
          >
            完成学习
          </button>
        )}

        {record.status === 'not_started' && (
          <button
            onClick={onStart}
            className="px-4 py-2 text-sm bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg transition-colors"
          >
            开始学习
          </button>
        )}
      </div>
    </div>
  );
}
