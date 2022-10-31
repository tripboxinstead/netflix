import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieDetail from './pages/MovieDetail';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './component/Navigation';

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Movies" element={<Movies/>} />
        <Route path="/Movies/:movie_id" element={<MovieDetail/>} />
        <Route path="*" element= { <main style={{ padding: "1rem" }}> <p>페이지를 찾을수가 없습니다!</p> </main>} />
      </Routes>
     
    </div>
  );
}

export default App;
