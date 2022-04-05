import './App.css';
import {BrowserRouter as Router} from 'react-router-dom'
import MyRouter from "./utils/MyRouter";
import Header from "./components/Header";

function App() {
    return (
        <Router>
            <div className="App">
                <Header/>
                <MyRouter/>
            </div>
        </Router>

    );
}

export default App;
