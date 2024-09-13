import React, { useEffect } from 'react';
import { BrowserRouter as Router, useRoutes, Navigate } from 'react-router-dom';
import CreateBookPage from './pages/CreateBookPage';
import NavBar from './components/NavBar';
import CustomerHomePage from './pages/CustomerHomePage';
import { CartProvider } from './context/CartContext';
import ShoppingCartPage from './pages/ShoppingCartPage';
import AdminPage from './pages/AdminPage';
import AdminViewBooksPage from './pages/AdminViewBooksPage';
import AdminViewAuthorsPage from './pages/AdminViewAuthorPage';
import AdminViewOrdersPage from './pages/AdminViewOrdersPage';
import { jwtDecode } from 'jwt-decode';
import GenrePage from './pages/GenrePage';
import { AuthProvider, useAuth } from './context/AuthContext';
import AdminNavbar from './components/AdminNavbar';
import SearchResultsPage from './pages/SearchResultsPage';
import BookDetailsPage from './pages/BookDetailsPage';
import AuthorPage from './pages/AuthorPage';
import ViewOrdersPage from './pages/ViewOrdersPage';

interface DecodedToken {
  roles: string[];
}

const AppRoutes: React.FC<{ isAdmin: boolean }> = ({ isAdmin }) => {
  const routes = [
    { path: "/admin/create-book", element: isAdmin ? <CreateBookPage /> : <Navigate to='/' /> },
    { path: "/admin/view-books", element: isAdmin ? <AdminViewBooksPage /> : <Navigate to='/' /> },
    { path: "/admin/view-authors", element: isAdmin ? <AdminViewAuthorsPage /> : <Navigate to='/' /> },
    { path: "/admin/view-orders", element: isAdmin ? <AdminViewOrdersPage /> : <Navigate to='/' /> },
    { path: "/admin", element: isAdmin ? <AdminPage /> : <Navigate to="/" /> },
    { path: "/shopping-cart", element: <ShoppingCartPage /> },
    { path: "/books/genres", element: <GenrePage /> },
    { path: "/books/view-book/:bookId", element: <BookDetailsPage /> },
    { path: "/books/search", element: <SearchResultsPage /> },
    { path: "/authors/:authorId/books", element: <AuthorPage /> },
    { path: "/view-orders", element: <ViewOrdersPage /> },
    { path: "/", element: <CustomerHomePage /> },
  ];

  return useRoutes(routes);
};

const App: React.FC = () => {
  const { isAuthenticated, setIsAuthenticated, isAdmin, setIsAdmin } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const rolesString = localStorage.getItem('roles');
        const roles: string[] = rolesString ? JSON.parse(rolesString) : [];
        setIsAdmin(roles.includes('admin'));
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error decoding token:', error);
        setIsAdmin(false);
        setIsAuthenticated(true);
      }
    } else {
      setIsAdmin(false);
      setIsAuthenticated(false);
    }
  }, [setIsAdmin, setIsAuthenticated]);

  if (isAdmin === null || isAuthenticated === null) {
    // Show a loading spinner or similar while fetching role
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <CartProvider>
        <div>
          {isAdmin ? <AdminNavbar /> : <NavBar />}
          <AppRoutes isAdmin={isAdmin} />
        </div>
      </CartProvider>
    </Router>
  );
};

export default App;