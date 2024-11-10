// import Calendar from "./assets/Calender";
// import MentorScheduleClass from "./assets/MentorScheduleClass";
// function App() {
//   return (
// <MentorScheduleClass></MentorScheduleClass>
//   );
// }

// export default App;

// export default App;
// import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
// import ClassRequestsDashboard from './assets/ClassRequestsDashboard';
// import MentorDisplay from './assets/MentorDisplay';
// import Mentor from './assets/Mentors';
// import Profile from './assets/Profile';
// import RequestClass from './assets/RequestClass';

// function App() {
//   return (
//     <Router>
//       <div>
//         <Routes>
//           {/* Define your routes here */}
//           <Route path="/mnetors" element={<MentorDisplay />} /> {/* Main landing page */}
//           <Route path="/mentors/profile" element={<Profile />} /> {/* Profile page */}
//           <Route path="/request-class" element={<RequestClass />} />

//           <Route path="/mentors/:id" element={<Mentor />} /> {/* Mentor page */}
//           <Route path="/class-requests" element={<ClassRequestsDashboard />} /> {/* Class Requests Dashboard */}
//           {/* Add other routes as needed */}
//         </Routes>
//       </div>
//     </Router>
//     // <Mentor></Mentor>
//   );
// }

// export default App;

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AllClass from "./assets/AllClass";
import Calender from './assets/Calender';
import ClassRequestsDashboard from './assets/ClassRequestsDashboard';
import HomePage from './assets/Home'; // Home page after successful login
import IdentityPage from './assets/Identity'; // Identity page with login/signup
import LoginPage from './assets/Login'; // Separate login page
import MentorDisplay from './assets/MentorDisplay';
import MentorHome from "./assets/MentorHome";
import Mentor from './assets/Mentors';
import MentorScheduleClass from './assets/MentorScheduleClass';
import Profile from './assets/Profile';
import RegisterdClass from "./assets/RegisteredClass";
import RequestClass from './assets/RequestClass';
import ScheduledClass from "./assets/ScheduledClass";
import VideoApp from './VideoApp';
// import MentorHome from "./assets/Home"
function App() {
  return (
    <Router>
      <Routes>
        {/* Route for IdentityPage (Login/SignUp) */}
        <Route path="/" element={<IdentityPage />} />
        
        {/* Separate Login Page Route */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Home Page route after login */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/mentors" element={<MentorDisplay />} /> {/* Main landing page */}
          <Route path="/profile" element={<Profile />} /> {/* Profile page */}
          <Route path="/request-class" element={<RequestClass />} />
          <Route path="/mentors/:id" element={<Mentor />} /> {/* Mentor page */}
          <Route path="/class-requests" element={<ClassRequestsDashboard />} />
          <Route path="/classes" element={<AllClass/>}></Route>
          <Route path="/registered-classes" element={<RegisterdClass />} />
          <Route path="/calender" element={<Calender/>}></Route>
          <Route path="/mentor-home" element={<MentorHome></MentorHome>}></Route>
          <Route path="/schedule-class" element={<MentorScheduleClass/>}/>
          <Route path="/class-request-dashboard" element={<ClassRequestsDashboard/>}></Route>
          <Route path="/scheduled-class" element={<ScheduledClass/>}/>
          <Route path="/join" element={<VideoApp/>}/>

          {/* <Route pthe="/Mentor-Profile" element */}
      </Routes>
    </Router>
  );
}

export default App;


