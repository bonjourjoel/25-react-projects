import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import './App.css'
import React, { useState } from 'react';
import { APP_COMPONENTS } from './AppComponents';

const APPS : Array<{ componentName: string, path: string, component: () => React.JSX.Element }> =
  APP_COMPONENTS.map(component => ({
    componentName: component.prototype.constructor.name,
    path: "/" + component.prototype.constructor.name.toLowerCase(),
    component: component,
  }));

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [appPath, setAppPath] = useState(location.pathname);

  return (
    <>
        <div>
          <big>Joel's ReactJs tutorial <a href="https://www.youtube.com/watch?v=5ZdHfJVAY-s" target="_blank">25 react apps</a> :</big>
          &nbsp;
          For each app, I try to program it myself, and after I play the tutorial's solution and copy it. Then I compare the two versions, and finally I may improve mine.
          Now please select an app:
          &nbsp;
          <select
            value={appPath}
            onChange={e => {
              const newAppPath : string = e.target.value;
              setAppPath(newAppPath);
              navigate(newAppPath);
            }}
          >
            {
              APPS.map((app) => (
                <option key={app.path} value={app.path}>{app.componentName}</option>
              ))
            }
          </select>
          &nbsp;
          <button onClick={() => document.location.reload()}>Reload</button>
        </div>
      <hr />
      <Routes>
        <Route path="/" element={<Navigate replace to={APPS[0].path} />} />
        {
            APPS.map(app => (
              <Route key={app.path} path={app.path} element={app.component()}></Route>
            ))
        }
        <Route path="*" element={<div>Error 404 Not found</div>} />
      </Routes>
    </>
  )
}

export default App
