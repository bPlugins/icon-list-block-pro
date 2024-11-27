import { Navigate, Route, Routes } from 'react-router-dom';
import BlockSettings from './Pages/BlockSettings';
import Changelog from './Pages/Changelog';
import Dashboard from './Pages/Dashboard';
import GeneralSettings from './Pages/GeneralSettings';
import { Toaster } from 'react-hot-toast';



const App = () => {
  return (
    <>.
      <Toaster position="bottom-center" />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/changelog" element={<Changelog />} />
        <Route path="/settings" element={<GeneralSettings />} />
        <Route path="/block-settings" element={<BlockSettings />} />

        {/* When no routes match, it will redirect to this route path. Note that it should be registered above. */}
        <Route
          path="*"
          element={<Navigate to="/dashboard" replace />}
        />
      </Routes>
    </>
  )
}

export default App;