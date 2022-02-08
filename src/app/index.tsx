import { Route, Routes } from 'react-router-dom';

import NotFound from '@/pages/NotFound';
import Home from '@/pages/Home';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
}
