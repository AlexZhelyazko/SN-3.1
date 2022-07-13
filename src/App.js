import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.sass';
import { LoginForm } from './components/LoginForm/login';
import { Dialogs } from './Layouts/Dialogs/dialogs';
import { Profile } from './Layouts/Profile/profile';
import { Users } from './Layouts/Users/users';
import { Preloader } from './components/Preloader/preloader'
import { initializeTC } from './redux/app-reducer';
import { Settings } from './Layouts/Settings/settings'
import { News, NewsItem, NewsSections } from './Layouts/News/news';
import { getIsAuth } from './Selectors/selectors';
import { Layout } from './components/Layout/layout';

const App2 = () => {
  const isAuth = useSelector((state) => getIsAuth(state))
  if (!isAuth) return <Navigate to='/login' />
  return (
    <div>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/dialogs' element={<Dialogs />} />
          <Route path='/users' element={<Users />} />
          <Route path='/users/*' element={<Profile />} />
          <Route path='/news' element={<NewsSections />} />
          <Route path='news/:section' element={<News />} />
          <Route path='news/:section/:id' element={<NewsItem />} />
          <Route path='/settings' element={<Settings/>}/>
        </Route>
      </Routes>
    </div>
  )
}

function App() {
  const initialize = useSelector((state) => state.initialize.initialize)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeTC())
  }, [])

  return (
    <div className='app_container'>
      {initialize ? <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginForm />} />
          <Route path='/*' element={<App2 />} />
        </Routes>
      </BrowserRouter> : <Preloader />}
    </div>
  );
}



export default App;
