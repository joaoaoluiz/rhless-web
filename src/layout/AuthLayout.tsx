import React from 'react'
import AppHeader from 'components/AppHeader/AppHeader'
import SideBar from 'components/SideBar/SideBar'
import { AuthLayoutContextProvider } from 'context/AuthLayoutContext'
import { Route, Routes } from 'react-router-dom'
import routes from 'router/routes'

const routesMemo = Object.values(routes.auth)
function AuthLayout () {
  return (
    <div className='flex flex-col h-full max-h-full font-nunito'>
      <AuthLayoutContextProvider>
        <AppHeader />
        <div className='relative flex overflow-hidden grow'>
          <SideBar />
          <main className='flex flex-col w-full p-4 grow bg-dark-background'>
            {<Routes>
              {routesMemo.map(route => (
                <Route
                  {...route}
                  key={route.path}
                  element={
                    <>
                      <h1 className='text-xl font-bold uppercase text-light-text'>{route.label}</h1>
                      <div className='flex flex-col overflow-x-hidden overflow-y-auto grow'>
                        {route.element}
                      </div>
                    </>
                  }
                  />
              ))}
            </Routes>}
          </main>
        </div>
      </AuthLayoutContextProvider>
    </div>
  )
}

export default AuthLayout
