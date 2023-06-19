/* eslint-disable react/react-in-jsx-scope */
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Call from "./page/Call";
import Meeting from "./page/Call/Meeting";
import Login from "./page/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Course from "./page/Course";
import { AppContext } from "./Context/AppContext";
import StreamVideo from "./component/Video";
import AuthContext from "./Context/AuthContext";
import PrivateRoute from "./ultis/PrivateRoute";
import CourseDetail from "./page/Course/CourseDetail";
import Admin from "./Admin";
import "@coreui/coreui/dist/css/coreui.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminCourse from "./Admin/component/AdminCourse";
import "antd/dist/antd.css";
import HomeLayout from "./page/Home";
import LectureDetail from "./component/LectureDetail";
import GroupDetail from "./page/Group/GroupDetail";
import Register from "./page/Register";
import Checkout from "./page/Checkout/Checkout";
import ProtectedRoute from "./ultis/PrivateRoute";
import AppResult from "./page/Result/ResultComponent";
import Dashboard from "./Admin/component/Dashboard";
// Create a client
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext>
        <AppContext>
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<HomeLayout />} />
              <Route exact path="/login" element={<Login />}></Route>
              <Route exact path="/register" element={<Register />}></Route>
              <Route exact path="/result/:id" element={<AppResult />}>
                {/* <Route exact path=":id" element={<AppResult />}></Route> */}
              </Route>
              <Route
                exact
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              ></Route>
              <Route path="/call" element={<Call />}>
                <Route exact path="/call" element={<StreamVideo />}></Route>
              </Route>
              <Route path="/call" element={<Call />}>
                <Route exact path="/call" element={<StreamVideo />}></Route>
              </Route>
              {/* <Route exact path="/meeting" element={<PrivateRoute />}>
                <Route exact path="/meeting" element={<Meeting />}></Route>
              </Route> */}
              <Route
                exact
                path="/meeting"
                element={<ProtectedRoute></ProtectedRoute>}
              >
                <Route
                  exact
                  path=":id"
                  element={
                    <ProtectedRoute>
                      <Meeting />
                    </ProtectedRoute>
                  }
                ></Route>
              </Route>
              {/* <Route exact path="/c" element={<Ca />}></Route>
              <Route path="/peer" element={<PeerCall />}>
                <Route exact path="/peer" element={<Meeting />}></Route>
              </Route> */}
              <Route path="/group">
                <Route exact path=":id" element={<GroupDetail />}></Route>
              </Route>
              <Route exact path="/course" element={<Course />}>
                <Route exact path=":id" element={<CourseDetail />}></Route>
              </Route>
              {/* <Route path="/course/create" element={<CrCourse />}>
                <Route path=":id" element={<CrCourse />}></Route>
              </Route> */}
              <Route path="/lecture">
                <Route path=":id" element={<LectureDetail />}></Route>
              </Route>
              <Route
                path="/admin"
                element={
                  <ProtectedRoute requirementRole={"Admin"}>
                    <Admin />
                  </ProtectedRoute>
                }
              >
                <Route
                  path="/admin/home"
                  element={<Dashboard></Dashboard>}
                ></Route>
                <Route
                  path="/admin/course"
                  element={<AdminCourse></AdminCourse>}
                ></Route>
              </Route>
              <Route exact path="*" element={Error}></Route>
            </Routes>
          </BrowserRouter>
          <ReactQueryDevtools initialIsOpen={false} />
        </AppContext>
      </AuthContext>
    </QueryClientProvider>
  );
}

export default App;
