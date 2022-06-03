import { Routes, Route } from 'react-router-dom';

import './App.scss';
import Component from './components/Component';

function App() {
  return (
    <div id="App">

      <Routes>

        <Route path="/*" element={<Component/>} />
        
      </Routes>

    </div>
  );
}

export default App;
