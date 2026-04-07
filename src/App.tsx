import { Routes, Route } from 'react-router-dom';
import UserList from './pages/UserList';
import UserPosts from './pages/UserPosts';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/users/:id" element={<UserPosts />} />
      </Routes>
    </div>
  );
}

export default App;
