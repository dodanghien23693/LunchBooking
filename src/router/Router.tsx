import Layout from '@app/components/Layout'
import AppSuspense from '@app/components/Suspense'
import { useAppSelector } from '@app/stores/hook'
import { userStore } from '@app/stores/user'
import { lazy, useEffect } from 'react'
import { createBrowserRouter, Navigate, Outlet, useNavigate } from 'react-router-dom'

interface PrivateRouteProps {
  Comp: () => JSX.Element
  role?: string
}

const PrivateRoute = ({ Comp }: PrivateRouteProps) => {
  const user = useAppSelector(userStore)
  const navigate = useNavigate()
  useEffect(() => {
    const checkRouteTimeOut = setTimeout(() => {
      if (!user.uid) {
        navigate('/login', { state: window.location.pathname })
      }
      // if (!user.bankAccount && user.uid) {
      //   navigate('/profile')
      // }
    }, 0)
    return () => {
      clearTimeout(checkRouteTimeOut)
    }
  }, [navigate, user])
  return <Comp />
}

export default createBrowserRouter([
  {
    path: '/',
    element: <PrivateRoute Comp={Layout} />,
    children: [
      {
        path: '',
        element: <Navigate to="home" replace />,
      },
      {
        path: 'home',
        element: <AppSuspense comp={lazy(() => import('@app/page/Home'))} />,
      },
      {
        path: 'profile',
        element: <AppSuspense comp={lazy(() => import('@app/page/Profile'))} />,
      },
      {
        path: 'events',
        element: <Outlet />,
        children: [
          {
            path: '',
            element: <AppSuspense comp={lazy(() => import('@app/page/Events/List'))} />,
          },
          {
            path: 'add',
            element: <AppSuspense comp={lazy(() => import('@app/page/Events/AddLunch'))} />,
          },
          {
            path: ':id',
            element: <AppSuspense comp={lazy(() => import('@app/page/Events/LunchDetail'))} />,
          },
        ],
      },
    ],
  },
  {
    path: 'login',
    element: <AppSuspense comp={lazy(() => import('@app/page/Login'))} />,
  },
  {
    path: '*',
    element: <AppSuspense comp={lazy(() => import('@app/page/notfound'))} />,
  },
])
