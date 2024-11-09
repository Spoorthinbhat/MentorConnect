// import { Route, BrowserRouter as Router, Routes } from "react-router-dom"; // Import Router, Route, and Routes
// import JoinButton from "./assets/JoinButton"; // Import JoinButton
// import AppPage from "./src/App"; // Assuming you have an AppPage component to render when navigating to "/app"
// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Define the default route to show JoinButton */}
//         <Route path="/" element={<JoinButton />} /> 

//         {/* Define the route for the app page */}
//         <Route path="/app" element={<AppPage />} /> 
//       </Routes>
//     </Router>
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

import VideoApp from "./VideoApp";
function App() {
  return (
<VideoApp></VideoApp>  );
}

export default App;

