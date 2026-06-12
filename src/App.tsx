import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import OnboardingPage from './pages/Onboarding/OnboardingPage';
import KnowledgeMapPage from './pages/KnowledgeMap/KnowledgeMapPage';
import QnAListPage from './pages/QnA/QnAListPage';
import QuestionDetailPage from './pages/QnA/QuestionDetailPage';
import EntryDetailPage from './pages/Entry/EntryDetailPage';
import ProgressPage from './pages/Progress/ProgressPage';
import AdminDashboard from './pages/Admin/AdminDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<OnboardingPage />} />
          <Route path="map" element={<KnowledgeMapPage />} />
          <Route path="map/category/:categoryId" element={<KnowledgeMapPage />} />
          <Route path="qa" element={<QnAListPage />} />
          <Route path="qa/:id" element={<QuestionDetailPage />} />
          <Route path="entry/:id" element={<EntryDetailPage />} />
          <Route path="progress" element={<ProgressPage />} />
        </Route>
        <Route path="/admin" element={<Layout />}>
          <Route index element={<AdminDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
