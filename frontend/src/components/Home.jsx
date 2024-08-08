import React from 'react'
import Sidebar from './layout/Sidebar'
import Dashboard from './Admin/Dashboard'
import { useSelector } from 'react-redux'
import Loader from './layout/Loader'

const Home = () => {

  const { loading } = useSelector(state => state.authState);

  return (
    <>
      {
        loading ? (
          <div className="flex justify-center mt-10">
            <Loader />
          </div>
        ) : (
          <div className="flex flex-row ">
            <Sidebar />
            <Dashboard />
          </div>
        )
      }

    </>
  )
}

export default Home