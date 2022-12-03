import './App.css';
import Header from "./Containers/Header"
import Main from "./Containers/Main"
import Footer from "./Containers/Footer"
import store from './Redux/Store'
import { Provider } from 'react-redux'
import { Counter } from './Redux/Counter';
import MenuSite from "./Containers/MenuSite"

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <MenuSite/>
        <Main />
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
