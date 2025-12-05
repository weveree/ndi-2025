import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import SnakeGame from './components/game/SnakeGame';
import './index.css';
import NotFound from './routes/404';
import Credits from './routes/Credits';
import Home from './routes/Home';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route index element={<Home />} />
      <Route path="/credits" element={<Credits />} />
      <Route path="/snake" element={<SnakeGame />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>,
);
