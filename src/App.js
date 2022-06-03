import { Routes, Route } from 'react-router-dom';

import './App.scss';
import PlayVsPlay from './components/PlayVsPlay';

function App() {
  return (
    <div id="App">

      <Routes>

        <Route path="/*" element={<PlayVsPlay />} />
        
      </Routes>

    </div>
  );
}

export default App;
