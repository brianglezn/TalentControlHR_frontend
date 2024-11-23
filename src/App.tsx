import { Routes, Route } from 'react-router-dom';

import Dashboard from '@pages/dashboard/Dashboard';
import Home from '@pages/landing/Home';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}
