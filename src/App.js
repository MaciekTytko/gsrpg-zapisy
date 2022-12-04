import './App.css';
import Header from "./Containers/Header"
import Main from "./Containers/Main"
import Footer from "./Containers/Footer"
import store from './Redux/Store'
import { Provider } from 'react-redux'
import MenuSite from "./Containers/MenuSite"
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <MenuSite />
          <Header />
          <Main />
          <Footer />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
