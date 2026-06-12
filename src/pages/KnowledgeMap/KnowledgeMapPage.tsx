import { useEffect, useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { Search, FileText, Users, Monitor, Building, Calculator, Coffee, Map, ArrowLeft } from 'lucide-react';
import { useKnowledgeStore } from '../../stores/knowledgeStore';
import { getCategoryById } from '../../data/mockCategories';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import EntryCard from '../../components/domain/EntryCard';
import Button from '../../components/common/Button';

const iconMap: Record<string, React.ComponentType<any>> = {
  FileText,
  Users,
  Monitor,
  Building,
  Calculator,
  Coffee,
};

export default function KnowledgeMapPage() {
  const { categoryId, pathId } = useParams();
  const [searchParams] = useSearchParams();
  const {
    entries,
    categories,
    paths,
    fetchEntries,
    fetchCategories,
    fetchPaths,
    searchResults,
    searchEntries,
  } = useKnowledgeStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPath, setSelectedPath] = useState<string | null>(null);

  useEffect(() => {
    fetchEntries();
    fetchCategories();
    fetchPaths();
  }, [fetchEntries, fetchCategories, fetchPaths]);

  useEffect(() => {
    if (categoryId) {
      setSelectedCategory(categoryId);
    }
  }, [categoryId]);

  useEffect(() => {
    const pathParam = searchParams.get('path');
    if (pathParam) {
      setSelectedPath(pathParam);
    }
  }, [searchParams]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      searchEntries(query);
    }
  };

  const selectedCategoryData = selectedCategory ? getCategoryById(selectedCategory) : null;
  const selectedPathData = selectedPath ? paths.find(p => p.id === selectedPath) : null;

  const pathEntries = selectedPath
    ? entries.filter(e => selectedPathData?.entryIds.includes(e.id))
    : [];

  const displayEntries = searchQuery.trim()
    ? searchResults
    : selectedPath
    ? pathEntries
    : selectedCategory
    ? entries.filter(e => e.categoryId === selectedCategory)
    : entries;

  return (
    <div className="flex h-full">
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-4 border-b border-slate-200">
          <h2 className="font-bold text-slate-900 mb-3">知识分类</h2>
          <div className="space-y-1">
            <button
              onClick={() => {
                setSelectedCategory(null);
                setSelectedPath(null);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                !selectedCategory && !selectedPath
                  ? 'bg-indigo-50 text-indigo-700 font-medium'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              全部词条
            </button>
            {categories.map(category => {
              const Icon = iconMap[category.icon] || FileText;
              return (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setSelectedPath(null);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                    selectedCategory === category.id && !selectedPath
                      ? 'bg-indigo-50 text-indigo-700 font-medium'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="flex-1">{category.name}</span>
                  <Badge variant="default">{category.entryCount}</Badge>
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-4 border-t border-slate-200 flex-1 overflow-auto">
          <h2 className="font-bold text-slate-900 mb-3">热门主题路径</h2>
          <div className="space-y-2">
            {paths.map(path => (
              <div
                key={path.id}
                onClick={() => {
                  setSelectedPath(path.id);
                  setSelectedCategory(null);
                }}
                className={`p-3 rounded-lg cursor-pointer transition-all ${
                  selectedPath === path.id
                    ? 'bg-indigo-50 border border-indigo-200'
                    : 'bg-slate-50 hover:bg-slate-100 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Map className="w-4 h-4 text-indigo-600" />
                  <span className="text-sm font-medium text-slate-900 flex-1">{path.title}</span>
                </div>
                <div className="text-xs text-slate-500 mt-1 ml-6">
                  {path.entryIds.length} 个词条
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>

      <div className="flex-1 overflow-auto bg-slate-50">
        <div className="p-6 bg-white border-b border-slate-200">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {selectedPath && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedPath(null);
                        setSelectedCategory(null);
                      }}
                      leftIcon={<ArrowLeft className="w-4 h-4" />}
                    >
                      返回
                    </Button>
                  )}
                </div>
                <h1 className="text-2xl font-bold text-slate-900">
                  {selectedPath
                    ? selectedPathData?.title || '主题路径'
                    : selectedCategoryData
                    ? selectedCategoryData.name
                    : '知识地图'}
                </h1>
                <p className="text-sm text-slate-600 mt-1">
                  {searchQuery
                    ? `找到 ${searchResults.length} 个相关结果`
                    : selectedPath
                    ? `包含 ${pathEntries.length} 个词条 · 约 ${selectedPathData?.estimatedMinutes || 0} 分钟`
                    : `共 ${displayEntries.length} 个词条`}
                </p>
              </div>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="搜索词条..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full px-4 py-3 pl-12 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            </div>

            {!searchQuery && !selectedCategory && !selectedPath && (
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="text-sm text-slate-600">热门标签：</span>
                {['报销', '请假', 'IT系统', '绩效考核'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => handleSearch(tag)}
                    className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}

            {selectedPath && selectedPathData && (
              <div className="mt-4 p-4 bg-indigo-50 rounded-xl">
                <p className="text-sm text-indigo-900">{selectedPathData.description}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {selectedPathData.requiredForPositions.map(pos => (
                    <Badge key={pos} variant="primary">{pos}</Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="p-6">
          <div className="max-w-6xl mx-auto">
            {displayEntries.length > 0 ? (
              selectedPath ? (
                <div className="space-y-4">
                  {displayEntries.map((entry, idx) => (
                    <Card key={entry.id} className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold">
                            {idx + 1}
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-900 mb-2">{entry.title}</h3>
                            <p className="text-sm text-slate-600 mb-3">{entry.summary}</p>
                            <div className="flex flex-wrap gap-2">
                              {entry.tags.slice(0, 3).map(tag => (
                                <Badge key={tag} variant="default">{tag}</Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <Link
                          to={`/entry/${entry.id}`}
                          className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors whitespace-nowrap"
                        >
                          开始学习
                        </Link>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {displayEntries.map(entry => (
                    <EntryCard key={entry.id} entry={entry} />
                  ))}
                </div>
              )
            ) : (
              <Card className="p-12 text-center">
                <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">未找到相关词条</h3>
                <p className="text-slate-600">请尝试其他关键词或浏览全部词条</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
