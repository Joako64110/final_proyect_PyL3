import { Provider } from 'react-redux';
import store from './redux/store';
import ListEmpresas from './components/screens/GridEmpresas/ListEmpresas';

function App() {


  return (
    <Provider store={store}>
      <div className="App">
        <ListEmpresas />
      </div>
    </Provider>
  );
}

export default App
