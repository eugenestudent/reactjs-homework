import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import AuthListener from './components/AuthListener/AuthListener';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Menu from './components/Menu/Menu';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import Order from './components/Order/Order';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <AuthListener>
        <Router>
          <div className="App">
            <Header />
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/login" element={<Login />} />
              <Route 
                path="/order" 
                element={
                  <ProtectedRoute>
                    <Order />
                  </ProtectedRoute>
                } 
              />
            </Routes>
            <Footer />
          </div>
        </Router>
      </AuthListener>
    </Provider>
  );
}

export default App;