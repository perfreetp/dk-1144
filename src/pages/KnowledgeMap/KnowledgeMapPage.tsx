import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Search, FileText, Users, Monitor, Building, Calculator, Coffee } from 'lucide-react';
import { useKnowledgeStore } from '../../stores/knowledgeStore';
import { getCategoryById } from '../../data/mockCategories';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import EntryCard from '../../components/domain/EntryCard';
import PathCard from '../../components/domain/PathCard';

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

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      searchEntries(query);
    }
  };

  const displayEntries = searchQuery.trim()
    ? searchResults
    : selectedCategory
    ? entries.filter(e => e.categoryId === selectedCategory)
    : entries;

  const selectedCategoryData = selectedCategory ? getCategoryById(selectedCategory) : null;

  return (
    <div className="flex h-full">
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-4 border-b border-slate-200">
          <h2 className="font-bold text-slate-900 mb-3">知识分类</h2>
          <div className="space-y-1">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                !selectedCategory
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
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                    selectedCategory === category.id
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
            {paths.slice(0, 5).map(path => (
              <PathCard key={path.id} path={path} />
            ))}
          </div>
        </div>
      </aside>

      <div className="flex-1 overflow-auto bg-slate-50">
        <div className="p-6 bg-white border-b border-slate-200">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  {selectedCategoryData ? selectedCategoryData.name : '知识地图'}
                </h1>
                <p className="text-sm text-slate-600 mt-1">
                  {searchQuery
                    ? `找到 ${searchResults.length} 个相关结果`
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

            {!searchQuery && !selectedCategory && (
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
          </div>
        </div>

        <div className="p-6">
          <div className="max-w-6xl mx-auto">
            {displayEntries.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayEntries.map(entry => (
                  <EntryCard key={entry.id} entry={entry} />
                ))}
              </div>
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
