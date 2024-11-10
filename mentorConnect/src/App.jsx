import RegisteredClass from "./assets/RegisteredClass";
function App() {
  return (
    <RegisteredClass></RegisteredClass>
  );
}

export default App;

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

// import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
// import AllClass from "./assets/AllClass";
// import ClassRequestsDashboard from './assets/ClassRequestsDashboard';
// import HomePage from './assets/Home'; // Home page after successful login
// import IdentityPage from './assets/Identity'; // Identity page with login/signup
// import LoginPage from './assets/Login'; // Separate login page
// import MentorDisplay from './assets/MentorDisplay';
// import Mentor from './assets/Mentors';
// import Profile from './assets/Profile';
// import RegisterdClass from "./assets/RegisteredClass";
// import RequestClass from './assets/RequestClass';
// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Route for IdentityPage (Login/SignUp) */}
//         <Route path="/" element={<IdentityPage />} />
        
//         {/* Separate Login Page Route */}
//         <Route path="/login" element={<LoginPage />} />
        
//         {/* Home Page route after login */}
//         <Route path="/home" element={<HomePage />} />
//         <Route path="/mentors" element={<MentorDisplay />} /> {/* Main landing page */}
//           <Route path="/profile" element={<Profile />} /> {/* Profile page */}
//           <Route path="/request-class" element={<RequestClass />} />

//           <Route path="/mentors/:id" element={<Mentor />} /> {/* Mentor page */}
//           <Route path="/class-requests" element={<ClassRequestsDashboard />} />
//           <Route path="/classes" element={<AllClass/>}></Route>
//           <Route Path="/Registered-Classes" element={<RegisterdClass/>}></Route>
//       </Routes>
//     </Router>
//   );
// }

// export default App;


