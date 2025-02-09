import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css';
import { lazy, Suspense } from 'react';
import Loading from './components/loading';

const Home = lazy(() => import('./pages/Home'));


createRoot(document.getElementById('root')!).render(
    <MantineProvider>
        <Suspense fallback={<Loading />}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </BrowserRouter>
        </Suspense>
    </MantineProvider>
)
