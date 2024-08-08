import { useDispatch } from 'react-redux';
import QuestionList from "./components/Admin/question/QuestionList";
import TestList from "./components/Admin/test/TestList";
import ForgotPassword from "./components/Admin/auth/ForgotPassword";
import Login from "./components/Admin/auth/Login";
import ResetPassword from "./components/Admin/auth/ResetPassword";
import UserList from "./components/Admin/users/UserList";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import store from "./store";
import { loadUser } from './actions/authActions';
import Loader from './components/layout/Loader';
import ProtectedRoute from './components/routes/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/layout/Navbar';
import Profile from './components/Admin/users/Profile';
import TestDetail from './components/Admin/test/TestDetail';
import NewTest from './components/Admin/test/NewTest';
import QuestionDetail from './components/Admin/question/QuestionDetail';
import NewQuestion from './components/Admin/question/NewQuestion';
import EditQuestion from './components/Admin/question/EditQuestion';
import NewUser from './components/Admin/users/NewUser';
import TestInstruction from './components/user/TestInstruction';
import TestPage from './components/user/TestPage';
import ProtectedTestRoute from './components/routes/ProtectedTestRoute';
import TestSubmitted from './components/user/TestSubmitted';

function App() {

  useEffect(() => {
    store.dispatch(loadUser);
  }, []);
  
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<ProtectedRoute ><Home /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
          <Route path="/tests" element={<ProtectedRoute ><TestList /></ProtectedRoute>} />
          <Route path="/questions" element={<ProtectedRoute ><QuestionList /></ProtectedRoute>} />
          <Route path="/users" element={<ProtectedRoute ><UserList /></ProtectedRoute>} />
          <Route path="/user/new" element={<ProtectedRoute ><NewUser /></ProtectedRoute>} />
          {/* <Route path="/myprofile" element={<ProtectedRoute ><Profile /></ProtectedRoute>} /> */}
          <Route path="/test/:testId" element={<ProtectedRoute ><TestDetail /></ProtectedRoute>} />
          <Route path="/test/new" element={<ProtectedRoute ><NewTest /></ProtectedRoute>} />
          <Route path="/question/:questionId" element={<ProtectedRoute ><QuestionDetail /></ProtectedRoute>} />
          <Route path="/question/new/:testId" element={<ProtectedRoute ><NewQuestion /></ProtectedRoute>} />
          <Route path="/question/edit/:questionId" element={<ProtectedRoute ><EditQuestion /></ProtectedRoute>} />

          {/* <Route path="/instruction/:testId" element={<ProtectedTestRoute><TestInstruction /></ProtectedTestRoute>} /> */}
          <Route path="/instruction/:testId" element={<TestInstruction />} />
          <Route path="/:testId" element={<ProtectedTestRoute><TestPage /></ProtectedTestRoute>} />
          <Route path="/test/submit" element={<ProtectedTestRoute><TestSubmitted /></ProtectedTestRoute>} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
