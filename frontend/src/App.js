import './App.css';
import {BrowserRouter as Router} from 'react-router-dom'
import MyRouter from "./router/MyRouter";

function App() {
  return (
    <div className="App">
      <Router>
          <MyRouter/>
      </Router>
    </div>
  );
}

export default App;
