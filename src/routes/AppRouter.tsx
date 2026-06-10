import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppShell from '../components/AppShell';
import LoginView from '../views/LoginView';
import RegisterView from '../views/RegisterView';
import ArchiveView from '../views/ArchiveView';
import SharedView from '../views/SharedView';
import UploadView from '../views/UploadView';
import ProcessingView from '../views/ProcessingView';
import VerificationView from '../views/VerificationView';
import SuccessView from '../views/SuccessView';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* AppShell działa jako nadrzędny Layout, który decyduje o renderowaniu pasków nawigacji */}
        <Route element={<AppShell />}>
          <Route path="/" element={<LoginView />} />
          <Route path="/register" element={<RegisterView />} />
          <Route path="/archive" element={<ArchiveView />} />
          <Route path="/shared" element={<SharedView />} />
          <Route path="/upload" element={<UploadView />} />
          <Route path="/processing" element={<ProcessingView />} />
          <Route path="/verification" element={<VerificationView />} />
          <Route path="/success" element={<SuccessView />} />
          
          {/* Przekierowanie dla nieznanych ścieżek */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
