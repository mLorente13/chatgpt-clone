import { BrowserRouter, Routes, Route } from "react-router";
import Sidebar from "./components/Sidebar";
import Chat from "./routes/Chat";
import Home from "./routes/Homepage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Sidebar />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/chat/:id" element={<Chat />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
