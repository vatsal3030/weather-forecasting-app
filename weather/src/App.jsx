import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar';
import Home from './components/Home';
import Graph from './components/WeatherGraph';
import TopNews from './components/TopNews';
import Search from './components/Search';
import Map from './components/Map';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { motion } from 'framer-motion';



function App() {
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element:
          <div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
              <Navbar>
              </Navbar>
              <Home>
              </Home>
            </motion.div>
          </div>
      },
      {
        path: "/home",
        element:
          <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
              <Navbar>
              </Navbar>
              <Home>
              </Home>
            </motion.div>

          </div>
      },
      {
        path: "/navbar",
        element:
          <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
              <Navbar>
              </Navbar>
            </motion.div>

          </div>
      },
      {
        path: "/search",
        element:
          <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
              <Navbar>
              </Navbar>
              <Search></Search>
            </motion.div>

          </div>
      },
      {
        path: "/graph",
        element:
          <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
              <Navbar>
              </Navbar>
              <Graph>
              </Graph>
            </motion.div>

          </div>
      },
      {
        path: "/map",
        element:
          <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
              <Navbar>
              </Navbar>
              <Map>
              </Map>
            </motion.div>

          </div>
      },
      {
        path: "/news",
        element:
          <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
              <Navbar>
              </Navbar>
              <TopNews>
              </TopNews>
            </motion.div>

          </div>
      },
      {
        path: "/news/details",
        element:
          <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
              <Navbar>
              </Navbar>
            </motion.div>


          </div>
      }
      ,
      {
        path: "/signup",
        element:
          <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
              <SignUp></SignUp>
            </motion.div>

          </div>
      }
      ,
      {
        path: "/signin",
        element:
          <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
              <SignIn></SignIn>
            </motion.div>
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
