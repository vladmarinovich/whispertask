import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import WhisperLayout from './components/layout/WhisperLayout';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/home" element={<WhisperLayout />} />
      </Routes>
    </Router>
  );
}