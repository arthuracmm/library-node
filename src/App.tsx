import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home} from './pages/Home';
import { NewBook } from './pages/NewBook';
import { NewAuthor } from './pages/NewAuthor';
import { NewUser } from './pages/NewUser';
import { NewLoan } from './pages/NewLoan';
import { Return } from './pages/Return';
import { Available } from './pages/available';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App font-poppins">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new-book" element={<NewBook />} />
          <Route path="/new-author" element={<NewAuthor />} />
          <Route path="/new-user" element={<NewUser />} />
          <Route path="/available" element={<Available />} />
          <Route path="/new-loan" element={<NewLoan />} />
          <Route path="/return" element={<Return />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
