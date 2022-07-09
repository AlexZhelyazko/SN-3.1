import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import './App.sass';
import { LoginForm } from './components/LoginForm/login';
import { Dialogs } from './Layouts/Dialogs/dialogs';
import { Header } from './Layouts/Header/header';
import { Profile } from './Layouts/Profile/profile';
import { Sidebar } from './Layouts/Sidebar/sidebar';
import { Users } from './Layouts/Users/users';
import { Preloader } from './components/Preloader/preloader'
import { initializeTC } from './redux/app-reducer';
import { News, NewsItem, NewsSections } from './Layouts/News/news';
import { Memes } from './Layouts/Memes/memes';
import { getIsAuth } from './Selectors/selectors';

const App2 = () => {
  const isAuth = useSelector((state) => getIsAuth(state))
  const location = useLocation()
  console.log(location);
  if (!isAuth) return <Navigate to='/login' />
  return (
    <div>
      <Header />
      <div className='wrap'>
        <Sidebar />
        <Routes>
          <Route path='/profile' element={<Profile />} />
          <Route path='/dialogs' element={<Dialogs />} />
          <Route path='/users' element={<Users />} />
          <Route path='/users/*' element={<Profile />} />
          <Route path='/news' element={<NewsSections />}/>
          <Route path='news/section' element={<News/>}/>
          <Route path='news/section/:id' element={<NewsItem/>}/>
          <Route path='/memes' element={<Memes/>}/>
        </Routes>
      </div>
    </div>
  )
}

function App() {
  const initialize = useSelector((state) => state.initialize.initialize)
  //const isLoaded = useSelector((state) => state.auth.isLoaded)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeTC())
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
