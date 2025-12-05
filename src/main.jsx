import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import SnakeGame from './components/game/SnakeGame';
import './index.css';
import Layout from './Layout';
import NotFound from './routes/404';
import Home from './routes/Home';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/snake" element={<SnakeGame />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
