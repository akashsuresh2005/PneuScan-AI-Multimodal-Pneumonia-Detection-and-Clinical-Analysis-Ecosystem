// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
// import { Activity, LayoutDashboard, History as HistoryIcon, LogOut, UserCircle } from 'lucide-react';
// import Login from './pages/Login';
// import Dashboard from './pages/Dashboard';
// import History from './pages/History';
// import PatientPortal from './pages/PatientPortal'; // Ensure you create this file

// function App() {
//   const [user, setUser] = useState(JSON.parse(localStorage.getItem('userData')));

//   const logout = () => {
//     localStorage.clear();
//     setUser(null);
//   };

//   // Helper to update auth state after login
//   const handleAuthSuccess = (data) => {
//     localStorage.setItem('token', data.token);
//     localStorage.setItem('userData', JSON.stringify(data.user));
//     setUser(data.user);
//   };

//   return (
//     <Router>
//       <div className="min-h-screen bg-slate-50">
//         {user && (
//           <nav className="bg-black text-white p-5 flex justify-between items-center border-b-4 border-bit-orange">
//             <div className="flex items-center gap-3">
//               <Activity className="text-bit-orange" />
//               <span className="font-black italic tracking-tighter text-xl uppercase">
//                 PneuScan AI {user.role === 'doctor' ? '(Staff)' : '(Patient)'}
//               </span>
//             </div>
            
//             <div className="flex gap-8 font-bold text-sm items-center">
//               {user.role === 'doctor' ? (
//                 <>
//                   <Link to="/dashboard" className="flex items-center gap-2 hover:text-bit-orange transition-colors">
//                     <LayoutDashboard size={18}/> DASHBOARD
//                   </Link>
//                   <Link to="/history" className="flex items-center gap-2 hover:text-bit-orange transition-colors">
//                     <HistoryIcon size={18}/> HISTORY
//                   </Link>
//                 </>
//               ) : (
//                 <Link to="/my-reports" className="flex items-center gap-2 hover:text-bit-orange transition-colors">
//                   <UserCircle size={18}/> MY REPORTS
//                 </Link>
//               )}
              
//               <button onClick={logout} className="ml-4 bg-red-600/10 text-red-500 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-600 hover:text-white transition-all">
//                 <LogOut size={16}/> LOGOUT
//               </button>
//             </div>
//           </nav>
//         )}

//         <div className="container mx-auto py-10 px-4">
//           <Routes>
//             {/* Auth Gate */}
//             <Route path="/login" element={!user ? <Login onAuthSuccess={handleAuthSuccess} /> : <Navigate to="/" />} />
            
//             {/* Dynamic Home Route based on Role */}
//             <Route path="/" element={
//               user ? (
//                 user.role === 'doctor' ? <Navigate to="/dashboard" /> : <Navigate to="/my-reports" />
//               ) : <Navigate to="/login" />
//             } />

//             {/* Doctor Routes */}
//             <Route path="/dashboard" element={user?.role === 'doctor' ? <Dashboard /> : <Navigate to="/login" />} />
//             <Route path="/history" element={user?.role === 'doctor' ? <History /> : <Navigate to="/login" />} />

//             {/* Patient Routes */}
//             <Route path="/my-reports" element={user?.role === 'patient' ? <PatientPortal patientId={user.patientId} /> : <Navigate to="/login" />} />

//             {/* Fallback */}
//             <Route path="*" element={<Navigate to="/" />} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { Activity, LayoutDashboard, History as HistoryIcon, LogOut, UserCircle } from 'lucide-react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import PatientPortal from './pages/PatientPortal'; // Ensure you create this file

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('userData')));

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  // Helper to update auth state after login
  const handleAuthSuccess = (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('userData', JSON.stringify(data.user));
    setUser(data.user);
  };

  return (
    <Router>
      <div className="min-h-screen bg-slate-50">
        {user && (
          <nav className="bg-black text-white px-4 py-3 sm:px-5 sm:py-5 flex flex-wrap justify-between items-center gap-3 border-b-4 border-bit-orange">
            <div className="flex items-center gap-2 sm:gap-3">
              <Activity className="text-bit-orange" size={20} />
              <span className="font-black italic tracking-tighter text-sm sm:text-xl uppercase whitespace-nowrap">
                PneuScan AI {user.role === 'doctor' ? '(Staff)' : '(Patient)'}
              </span>
            </div>

            <div className="flex flex-wrap gap-3 sm:gap-8 font-bold text-xs sm:text-sm items-center">
              {user.role === 'doctor' ? (
                <>
                  <Link to="/dashboard" className="flex items-center gap-1.5 sm:gap-2 hover:text-bit-orange transition-colors">
                    <LayoutDashboard size={16} className="sm:hidden" />
                    <LayoutDashboard size={18} className="hidden sm:block" />
                    DASHBOARD
                  </Link>
                  <Link to="/history" className="flex items-center gap-1.5 sm:gap-2 hover:text-bit-orange transition-colors">
                    <HistoryIcon size={16} className="sm:hidden" />
                    <HistoryIcon size={18} className="hidden sm:block" />
                    HISTORY
                  </Link>
                </>
              ) : (
                <Link to="/my-reports" className="flex items-center gap-1.5 sm:gap-2 hover:text-bit-orange transition-colors">
                  <UserCircle size={16} className="sm:hidden" />
                  <UserCircle size={18} className="hidden sm:block" />
                  MY REPORTS
                </Link>
              )}

              <button onClick={logout} className="bg-red-600/10 text-red-500 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg flex items-center gap-1.5 sm:gap-2 hover:bg-red-600 hover:text-white transition-all">
                <LogOut size={14} className="sm:hidden" />
                <LogOut size={16} className="hidden sm:block" />
                LOGOUT
              </button>
            </div>
          </nav>
        )}
        <div className="container mx-auto py-6 px-3 sm:py-10 sm:px-4">
          <Routes>
            {/* Auth Gate */}
            <Route path="/login" element={!user ? <Login onAuthSuccess={handleAuthSuccess} /> : <Navigate to="/" />} />
            
            {/* Dynamic Home Route based on Role */}
            <Route path="/" element={
              user ? (
                user.role === 'doctor' ? <Navigate to="/dashboard" /> : <Navigate to="/my-reports" />
              ) : <Navigate to="/login" />
            } />
            {/* Doctor Routes */}
            <Route path="/dashboard" element={user?.role === 'doctor' ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/history" element={user?.role === 'doctor' ? <History /> : <Navigate to="/login" />} />
            {/* Patient Routes */}
            <Route path="/my-reports" element={user?.role === 'patient' ? <PatientPortal patientId={user.patientId} /> : <Navigate to="/login" />} />
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
