import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar';
import Home from './components/Home';
import Graph from './components/WeatherGraph';
import TopNews from './components/TopNews';
import Search from './components/search';
import NewsPage from './components/NewsPage';
import Map from './components/Map';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';



function App() {
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element:
          <div>
            <Navbar>
            </Navbar>
            <Home>
            </Home>
          </div>
      },
      {
        path: "/home",
        element:
          <div>
            <Navbar>
            </Navbar>
            <Home>
            </Home>
          </div>
      },
      {
        path: "/navbar",
        element:
          <div>
            <Navbar>
            </Navbar>
          </div>
      },
      {
        path: "/search",
        element:
          <div>
            <Navbar>
            </Navbar>
            <Search></Search>
          </div>
      },
      {
        path: "/graph",
        element:
          <div>
            <Navbar>
            </Navbar>
            <Graph>
            </Graph>
          </div>
      },
      {
        path: "/map",
        element:
          <div>
            <Navbar>
            </Navbar>
            <Map>
            </Map>
          </div>
      },
      {
        path: "/news",
        element:
          <div>
            <Navbar>
            </Navbar>
            <TopNews>
            </TopNews>
          </div>
      },
      {
        path: "/news/details",
        element:
          <div>
            <Navbar>
            </Navbar>
            <NewsPage>
            </NewsPage>
          </div>
      }
      ,
      {
        path: "/signup",
        element:
          <div>
            <SignUp></SignUp>
          </div>
      }
      ,
      {
        path: "/signin",
        element:
          <div>
            <SignIn></SignIn>
          </div>
      }
    ]
  );

  return (
    <div className='overflow-x-hidden w-full h-full'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
