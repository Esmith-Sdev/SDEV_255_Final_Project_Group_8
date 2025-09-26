import React from 'react';
import {BrowserRouter, Routes, Route, Link,} from 'react-router-dom';
import 'app.css';
import NavBar from './components/NavBar';
function App() {
    return (
        <>
        <NavBar />
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/classes" element={<Classes />} />
            </Routes>
        </BrowserRouter>
        </>
    )
}
export default App;