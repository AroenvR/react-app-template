import { Routes, Route } from 'react-router-dom';

import './App.scss';
import Component from './components/Component';
import Welcome from './components/Welcome';

function App() {
  return (
    <div id="App">

      <Routes>

        <Route path="/*" element={<Welcome />} />
        <Route path="/component" element={<Component/>} />
        
      </Routes>

    </div>
  );
}

export default App;
