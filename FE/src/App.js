import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Call from "./page/Call";
import Meeting from "./page/Call/Meeting";
import Login from "./page/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Home from "./page/Home";
import Course from "./page/Course";
import Group from "./page/Group";
import GroupDetailt from "./page/Group/GroupDetailt";
import LessionDetail from "./component/LessionDetail";
import { AppContext } from "./Context/AppContext";
import CrCourse from "./page/Course/CrCourse";
import PeerCall from "./component/Peer";
import Ca from "./component/Ca/Ca";
import StreamVideo from "./component/Video";
import AuthContext from "./Context/AuthContext";

// Create a client
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext>
        <AppContext>
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<Home />}></Route>
              <Route exact path="/login" element={<Login />}></Route>
              <Route path="/call" element={<Call />}>
                <Route exact path="/call" element={<StreamVideo />}></Route>
              </Route>
              <Route exact path="/meeting" element={<Meeting />}></Route>
              <Route exact path="/c" element={<Ca />}></Route>
              <Route path="/peer" element={<PeerCall />}>
                <Route exact path="/peer" element={<Meeting />}></Route>
              </Route>
              <Route path="/group" element={<Group />}>
                <Route exact path=":id" element={<GroupDetailt />}></Route>
              </Route>
              <Route path="/course" element={<Course />}></Route>
              <Route path="/course/create" element={<CrCourse />}>
                <Route path=":id" element={<CrCourse />}></Route>
              </Route>
              <Route path="/lession">
                <Route path=":id" element={<LessionDetail />}></Route>
              </Route>
              <Route exact path="*" element={Error}></Route>
            </Routes>
          </BrowserRouter>{" "}
          <ReactQueryDevtools initialIsOpen={false} />
        </AppContext>
      </AuthContext>
    </QueryClientProvider>
  );
}

export default App;
