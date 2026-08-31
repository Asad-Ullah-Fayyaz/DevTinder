import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import appstore from "./utils/appStore";
import { Provider } from "react-redux";
import SignUp from "./pages/SignUp";
import Feed from "./pages/Feed"
import Connections from "./pages/Connections";
import Requests from "./pages/Requests"

function App() {
  return (
    <Provider store={appstore}>
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="/" element={<Feed />}/>
          <Route path="about" element={<About />} />
          <Route path="profile" element={<Profile />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="connections" element={<Connections />} />
          <Route path="requests" element={<Requests />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;