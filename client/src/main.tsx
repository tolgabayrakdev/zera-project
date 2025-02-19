import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css';
import { lazy, Suspense } from 'react';
import Loading from './components/loading';

const NotFound = lazy(() => import('./pages/error/not-found'));

const Home = lazy(() => import('./pages/home'));

const SignIn = lazy(() => import('./pages/auth/sign-in'));
const SignUp = lazy(() => import('./pages/auth/sign-up'));
const ForgetPassword = lazy(() => import('./pages/auth/forget-password'));


const DashboardLayout = lazy(() => import('./layouts/dashboard-layout'));
const DashboardMain = lazy(() => import('./pages/dashboard/main'));


createRoot(document.getElementById('root')!).render(
    <MantineProvider>
        <Suspense fallback={<Loading />}>
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={<NotFound />} />

                    <Route path="/" element={<Home />} />
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/forget-password" element={<ForgetPassword />} />

                    <Route path="/dashboard" element={<DashboardLayout />}>
                        <Route path="main" element={<DashboardMain />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </Suspense>
    </MantineProvider>
)
