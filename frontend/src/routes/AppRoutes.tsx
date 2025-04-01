import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';

// Pages
import Main from '../pages/Main/Main';
import SignInPage from '../pages/Auth/SignInPage';
import Hyperlink from '../pages/Undergraduate/Hyperlink';
import GraduateOverview from '../pages/Graduate/GraduateOverview';
import GraduateCurriculum from '../pages/Graduate/GraduateCurriculum';
import Overview from '../pages/About/About';
import Professor from '../pages/About/Faculty/Professor';
import ProfessorDetail from '../pages/About/Faculty/ProfessorDetail';
import ProfessorEdit from '../pages/About/Faculty/ProfessorEdit';
import ProfessorCreate from '../pages/About/Faculty/ProfessorCreate';
import Organization from '../pages/About/Organization/Organization';
import StudentCouncil from '../pages/About/StudentCouncil/StudentCouncil';
import NoticeBoard from '../pages/News/NoticeBoard/NoticeBoard';
import NoticeDetail from '../pages/News/NoticeBoard/NoticeDetail';
import NoticeCreate from '../pages/News/NoticeBoard/NoticeCreate';
import NoticeEdit from '../pages/News/NoticeBoard/NoticeEdit';
import News from '../pages/News/News/News';
import NewsDetail from '../pages/News/News/NewsDetail';
import NewsCreate from '../pages/News/News/NewsCreate';
import NewsEdit from '../pages/News/News/NewsEdit';
import ThesisList from '../pages/News/Thesis/ThesisList';
import ThesisDetail from '../pages/News/Thesis/ThesisDetail';
import ThesisCreate from '../pages/News/Thesis/ThesisCreate';
import ThesisEdit from '../pages/News/Thesis/ThesisEdit';
import SeminarList from '../pages/Seminar/SeminarList';
import SeminarDetail from '../pages/Seminar/SeminarDetail';
import SeminarCreate from '../pages/Seminar/SeminarCreate';
import SeminarEdit from '../pages/Seminar/SeminarEdit';
import Curriculum from '../pages/Undergraduate/Curriculum/Curriculum';
import Calendar from '../features/calendarReservation/components/Calendar';
import ChangeAdminPassword from '../pages/Admin/ChangeAdminPassword/ChangeAdminPassword';
import NotFound from '../components/Notfound/NotFound';

export const AppRoutes: React.FC = ({}) => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/signin" element={<SignInPage />} />

      {/* Undergraduate */}
      <Route
        path="/undergraduate/admission-scholarship"
        element={<Hyperlink />}
      />
      <Route path="/undergraduate/curriculum" element={<Curriculum />} />

      {/* Graduate */}
      <Route path="graduate/overview" element={<GraduateOverview />} />
      <Route path="graduate/curriculum" element={<GraduateCurriculum />} />

      {/* About */}
      <Route path="/about" element={<Overview />} />
      <Route path="/about/faculty" element={<Professor />} />
      <Route path="/about/faculty/:id" element={<ProfessorDetail />} />
      <Route path="/about/organization" element={<Organization />} />
      <Route path="/about/studentcouncil" element={<StudentCouncil />} />

      {/* News */}
      <Route path="/news/noticeboard" element={<NoticeBoard />} />
      <Route path="/news/noticeboard/:id" element={<NoticeDetail />} />
      <Route path="/news/seminar" element={<SeminarList />} />
      <Route path="/news/seminar/:id" element={<SeminarDetail />} />
      <Route path="/news/thesis" element={<ThesisList />} />
      <Route path="/news/thesis/:id" element={<ThesisDetail />} />
      <Route path="/news" element={<News />} />
      <Route path="/news/:newsId" element={<NewsDetail />} />

      {/* Calendar */}
      <Route path="/seminar-rooms/reservation" element={<Calendar />} />

      {/* Protected Routes */}
      <Route
        path="/about/faculty/edit/:id"
        element={
          <ProtectedRoute requireAuth requireAdmin>
            {<ProfessorEdit />}
          </ProtectedRoute>
        }
      />
      <Route
        path="/about/faculty/create"
        element={
          <ProtectedRoute requireAuth requireAdmin>
            {<ProfessorCreate />}
          </ProtectedRoute>
        }
      />
      <Route
        path="/news/noticeboard/create"
        element={
          <ProtectedRoute requireAuth requireAdmin>
            {<NoticeCreate />}
          </ProtectedRoute>
        }
      />
      <Route
        path="/news/noticeboard/edit/:id"
        element={
          <ProtectedRoute requireAuth requireAdmin>
            {<NoticeEdit />}
          </ProtectedRoute>
        }
      />
      <Route
        path="/news/thesis/create"
        element={
          <ProtectedRoute requireAuth requireAdmin>
            {<ThesisCreate />}
          </ProtectedRoute>
        }
      />
      <Route
        path="/news/thesis/edit/:id"
        element={
          <ProtectedRoute requireAuth requireAdmin>
            {<ThesisEdit />}
          </ProtectedRoute>
        }
      />
      <Route
        path="/news/seminar/create"
        element={
          <ProtectedRoute requireAuth requireAdmin>
            {<SeminarCreate />}
          </ProtectedRoute>
        }
      />
      <Route
        path="/news/seminar/edit/:id"
        element={
          <ProtectedRoute requireAuth requireAdmin>
            {<SeminarEdit />}
          </ProtectedRoute>
        }
      />
      <Route
        path="/news/create"
        element={
          <ProtectedRoute requireAuth requireAdmin>
            {<NewsCreate />}
          </ProtectedRoute>
        }
      />
      <Route
        path="/news/edit/:newsId"
        element={
          <ProtectedRoute requireAuth requireAdmin>
            {<NewsEdit />}
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/change-password"
        element={
          <ProtectedRoute requireAuth requireAdmin>
            {<ChangeAdminPassword />}
          </ProtectedRoute>
        }
      />

      <Route
        path="/google7b8b29cb66f52214.html"
        element={<div>구글 인증 파일 </div>}
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
