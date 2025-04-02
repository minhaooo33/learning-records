import Header from './components/Header.jsx';
import Singup from './components/Singup.jsx'
import StateLogin from './components/StateLogin.jsx';
import RefLogin from './components/useRefLogin.jsx';

function App() {
  return (
    <>
      <Header />
      <main>
        <StateLogin />
      </main>
    </>
  );
}

export default App;
