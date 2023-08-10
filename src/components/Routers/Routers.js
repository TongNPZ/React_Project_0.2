
import React from "react";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import LoginForm from '../Login/LoginForm';
import Homepage from '../Homepage/Homepage';
import Booking from '../Booking/Booking';
import Housing from '../Housing/Housing';
import Planner from '../Planner/Planner';
import HousingEdit from '../Housing/HousingEdit/HousingEdit';
import HousingAdd from '../Housing/HousingAdd/HousingAdd';
import AdminProfile from "../AdminProfile/AdminProfile";
import AdminProfileEdit from "../AdminProfile/AdminProfileEdit"
import AdminUsePassEdit from "../AdminProfile/AdminUsePassEdit"
import ZoneEdit from "../Zoneing/ZoneEdit/ZoneEdit"
import ZoneAdd from "../Zoneing/ZoneAdd/ZoneAdd";
import Zoneing from "../Zoneing/Zoneing";
import EditUser from "../ManageUsers/EditUser/EditUser";
import AddBooking from "../Booking/AddBooking/AddBooking";
import EditBooking from "../Booking/EditBooking/EditBooking";
import ContractAdd from "../Booking/ContractAdd";
import ContractEdit from "../Booking/ContractEdit";
import TransferAdd from "../Transfer/TransferAdd";
import TransferEdit from "../Transfer/TransferEdit";
import TransferUser from "../Transfer/TransferUser";
import Receipt from "../Receipt/Receipt";
import ReceiptCon from "../Receipt/ReceiptCon";
import ReceiptRemain from "../Receipt/ReceiptRemain";

import ContractDoc from "../Receipt/ContractDoc";
import AllBill from '../Bill/AllBill';
import AddBill from '../Bill/AddBill';
import ManageUsers from "../ManageUsers/ManageUsers";
import UsePassEdit from "../User/UsePassEdit";
import UserHouse from "../User/UserHouse";
import User from "../User/User";
import UserBill from "../Bill/UserBill";
import AboutUs from '../AboutUS/AboutUs';
import RootLayout from './Root';
import Errorpage from './Error';

  // const routerDefinitions = createRoutesFromElements(
  //   <Route>
  //     <Route path="/" element={<Homepage />}/>
  //     <Route path="/Login" element={<Login />}/>
  //     <Route path="/Register" element={<Register />}/>
  //   </Route>
  // );

  // const router = createBrowserRouter(routerDefinitions);

const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout/>,
      errorElement: <Errorpage/>, 
      children: [
            { path: '/', element: <Homepage />},
            { path: '/Booking', element: <Booking />},
            { path: '/Housing', element: <Housing />},
            { path: '/Planner', element: <Planner />},
            { path: '/HousingEdit/:Eid', element: <HousingEdit />},
            { path: '/AboutUs', element: <AboutUs />},
            { path: '/HousingAdd', element: <HousingAdd />},
            { path: '/AdminProfile', element: <AdminProfile />},
            { path: '/AdminProfileEdit', element: <AdminProfileEdit />},
            { path: '/Zoneing', element: <Zoneing />},
            { path: '/ZoneEdit/:Zid', element: <ZoneEdit />},
            { path: '/ZoneAdd', element: <ZoneAdd />},
            { path: '/EditUser/:Uid', element: <EditUser />},
            { path: '/AddBooking/:Hid', element: <AddBooking />},
            { path: '/EditBooking/:Bid', element: <EditBooking />},
            { path: '/ContractAdd/:Bid', element: <ContractAdd />},
            { path: '/ContractEdit/:Bid', element: <ContractEdit />},
            { path: '/TransferAdd/:Bid', element: <TransferAdd />},
            { path: '/TransferEdit/:Bid', element: <TransferEdit />},
            { path: '/TransferUser/:Uid', element: <TransferUser />},
            { path: '/Receipt/:Bid', element: <Receipt />},
            { path: '/ReceiptCon/:Bid', element: <ReceiptCon />},
            { path: '/ReceiptRemain/:Bid', element: <ReceiptRemain />},
        
            { path: '/ContractDoc/:Bid', element: <ContractDoc />},
            { path: '/AllBill', element: <AllBill />},
            { path: '/UsePassEdit/:Uid', element: <UsePassEdit />},
            { path: '/AddBill', element: <AddBill />},
            { path: '/ManageUsers', element: <ManageUsers />},
            { path: '/AdminUsePassEdit/:Uid', element: <AdminUsePassEdit />},
            { path: '/User/:Uid', element: <User />},
            { path: '/UserBill/:Uid', element: <UserBill />},
            { path: '/LoginForm', element: <LoginForm />},
            { path: '/UserHouse/:Uid', element: <UserHouse />},

      ],
    },

  ]);
 const Routers = () => {

  return (
    <RouterProvider router={router}/>

  );
}

export default Routers;