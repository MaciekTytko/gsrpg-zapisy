import './App.css';
import Header from "./Containers/Header"
import Main from "./Containers/Main"
import Footer from "./Containers/Footer"
import store from './Redux/Store'
import { Provider } from 'react-redux'
import MenuSite from "./Containers/MenuSite"

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <MenuSite/>
        <Header />
        <Main />
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
