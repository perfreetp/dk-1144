import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, User, Eye, Heart, Share2, Bookmark, History, PlayCircle } from 'lucide-react';
import { useKnowledgeStore } from '../../stores/knowledgeStore';
import { useLearningStore } from '../../stores/learningStore';
import { getEntryById } from '../../data/mockEntries';
import { getCategoryById } from '../../data/mockCategories';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import EntryCard from '../../components/domain/EntryCard';

export default function EntryDetailPage() {
  const { id } = useParams();
  const { currentEntry, fetchEntryById } = useKnowledgeStore();
  const { records, markAsInProgress } = useLearningStore();
  const [isLearning, setIsLearning] = useState(false);

  useEffect(() => {
    if (id) {
      fetchEntryById(id);
    }
  }, [id, fetchEntryById]);

  useEffect(() => {
    if (id) {
      const record = records.find(r => r.entryId === id);
      if (record && record.status === 'in_progress') {
        setIsLearning(true);
      }
    }
  }, [id, records]);

  const entry = currentEntry || (id ? getEntryById(id) : null);

  const handleStartLearning = () => {
    if (id) {
      markAsInProgress(id);
      setIsLearning(true);
    }
  };

  if (!entry) {
    return (
      <div className="min-h-full flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-slate-600">加载中...</p>
        </div>
      </div>
    );
  }

  const category = getCategoryById(entry.categoryId);
  const relatedEntries = entry.relatedEntries
    .map(relatedId => getEntryById(relatedId))
    .filter(Boolean);

  return (
    <div className="min-h-full bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <Link
            to="/map"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            返回知识地图
          </Link>

          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                {category && (
                  <Badge variant="primary">{category.name}</Badge>
                )}
                {entry.tags.slice(0, 2).map(tag => (
                  <Badge key={tag} variant="default">{tag}</Badge>
                ))}
              </div>
              <h1 className="text-2xl font-bold text-slate-900 mb-4">{entry.title}</h1>
              <div className="flex items-center gap-6 text-sm text-slate-600">
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {entry.responsibleName}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  更新于 {entry.updatedAt}
                </span>
                <span className="flex items-center gap-2">
                  <History className="w-4 h-4" />
                  v{entry.version}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" leftIcon={<Bookmark className="w-4 h-4" />}>
                收藏
              </Button>
              <Button variant="ghost" size="sm" leftIcon={<Share2 className="w-4 h-4" />}>
                分享
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Card className="p-8 mb-6">
              <div
                className="prose prose-slate max-w-none"
                dangerouslySetInnerHTML={{ __html: entry.content }}
              />
            </Card>

            {relatedEntries.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-4">相关阅读</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {relatedEntries.map(related => (
                    <EntryCard key={related!.id} entry={related!} />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-6">
              <h3 className="font-semibold text-slate-900 mb-4">词条信息</h3>

              <div className="space-y-4 text-sm">
                <div>
                  <div className="text-slate-600 mb-1">负责人</div>
                  <div className="font-medium text-slate-900">{entry.responsibleName}</div>
                </div>

                <div>
                  <div className="text-slate-600 mb-1">适用部门</div>
                  <div className="flex flex-wrap gap-1">
                    {entry.departments.map(dept => (
                      <Badge key={dept} variant="default">{dept}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-slate-600 mb-1">创建时间</div>
                  <div className="font-medium text-slate-900">{entry.createdAt}</div>
                </div>

                <div>
                  <div className="text-slate-600 mb-1">更新时间</div>
                  <div className="font-medium text-slate-900">{entry.updatedAt}</div>
                </div>

                <div>
                  <div className="text-slate-600 mb-1">版本号</div>
                  <div className="font-medium text-slate-900">v{entry.version}</div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      阅读
                    </span>
                    <span className="font-medium">{entry.viewCount}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600 mt-2">
                    <span className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      收藏
                    </span>
                    <span className="font-medium">{entry.favoriteCount}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                {isLearning ? (
                  <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-lg text-indigo-600">
                    <PlayCircle className="w-5 h-5" />
                    <span className="font-medium">学习中...</span>
                  </div>
                ) : (
                  <Button className="w-full" onClick={handleStartLearning} leftIcon={<PlayCircle className="w-4 h-4" />}>
                    开始学习
                  </Button>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
