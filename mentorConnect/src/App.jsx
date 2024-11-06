import React from 'react';
import ClassRequestsDashboard from './assets/ClassRequestsDashboard';
function App() {
  return (
  <div>
      {/* <Videoapp></Videoapp> */}
      {/* <JoinScreen></JoinScreen> */}
      <ClassRequestsDashboard></ClassRequestsDashboard>

      </div>
  );
}

export default App;
// import React from 'react';
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
//           <Route path="/" element={<MentorDisplay />} /> {/* Main landing page */}
//           <Route path="/profile" element={<Profile />} /> {/* Profile page */}
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
