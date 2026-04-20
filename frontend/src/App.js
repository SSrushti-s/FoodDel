import './App.css';
import Home from './screen/Home'; //landing page where users will see the food categories and search bar once the app loads.
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; //GPS system that monitors the browser's URL and decides which page component should be visible to the user at any given moment.
import Login from './screen/Login';
import Signup from './screen/Signup';
import { CartProvider } from './components/ContextReducer';
import Cart from './screen/Cart';

function App() {
  return (
    <CartProvider> {/* its outermost so that shopping cart data is passed to all of the components */}
      <Router>{/*prevents the browser from doing a full page refresh.It is the "Brain" that communicates with the browser's address bar. */}
        <div>
          <Routes> {/* acts as the Track Switcher, Every time the URL changes,looks at all the possible destinations inside it and picks the best match.*/}
            <Route exact path="/" element={<Home />} /> {/*is a single Destination or "Stop" on the map.*/}
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/createuser" element={<Signup />} />
            <Route exact path="/orderData" element={<Cart />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}
export default App;