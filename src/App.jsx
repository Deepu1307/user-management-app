import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserList from './components/UserList/UserList';
import UserForm from './components/UseForm/UserForm';
import { QueryClient, QueryClientProvider } from 'react-query';

import Navbar from './components/Navbar/Navbar';

const queryClient = new QueryClient();

const App = () => (
  
  <QueryClientProvider client={queryClient}>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/add" element={<UserForm isEdit={false} />} />
        <Route path="/edit/:id" element={<UserForm isEdit={true} />} />
      </Routes>
    </Router>
  </QueryClientProvider>
);

export default App;





