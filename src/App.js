import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import GetUsers from './pages/getUsers';
import GetProduct from './pages/getProduct';
import AddProductForm from './pages/addProduct';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                {/* Public routes */}
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                {/* Protected routes */}
                <Route
                    path="/addProduct"
                    element={
                        <ProtectedRoute>
                            <AddProductForm />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/getProduct"
                    element={
                        <ProtectedRoute>
                            <GetProduct />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/getUsers"
                    element={
                        <ProtectedRoute>
                            <GetUsers />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
