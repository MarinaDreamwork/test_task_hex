// import React from "react";
// import { Route, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { getIsLoggedIn } from "../../store/users";
// import Form from "../../layouts/form";

// const ProtectedRoute = ({ element: Component, children, ...rest }) => {
//   console.log('children', children);
 


//   return (
//     <Route
//       {...rest}
//       render={(props) => {
//         if (!isLoggedIn) {
//           return <Route path='login' element={<Form />} />;
//         }
//         return Component ? <Component {...props} /> : children;
//       }}
//     />
//   );
// };

// export default ProtectedRoute;