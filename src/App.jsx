
import Home from './home'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Sel from './whiteorblack'
import White from './components/whitekingdom'

import { store } from './redux1'
import {Provider} from "react-redux"

function Errorroute(){
  return(
    <h1>page not found</h1>
  )
}
function App() {
  let route=createBrowserRouter([
    {
      path:'/',
      element:<Home/>,
      errorElement:<Errorroute/>
    },
    {
      path:'/Select',
      element:<Sel/>,
      errorElement:<Errorroute/>
    },
    {
      path:'/whitekingdom',
      element:<White/>,
      errorElement:<Errorroute/>
    },
    
  ])

  return (

      <>
      <Provider store={store}>
        <RouterProvider router={route}/>
      </Provider>
      </>

 
  )
}

export default App;
