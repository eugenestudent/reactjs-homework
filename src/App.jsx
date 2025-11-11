import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Menu from './components/Menu/Menu';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header>
        {(addToCart) => (
          <>
            <Menu addToCart={addToCart} />
            <Footer />
          </>
        )}
      </Header>
    </div>
  );
}

export default App;
