import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
/* import '@ionic/react/css/palettes/dark.system.css'; */

/* Theme variables */
import './theme/variables.css';

import React from 'react';
import OrderWindow from './pages/customerPages/OrderWindow'
import TableListings from './pages/bookingPages/TableListings';
import CustomerInitialize from './pages/customerPages/CustomerInitialize';
import CustomerWindow from './pages/customerPages/CustomerWindow';
import ViewCustomers from './pages/lypPages/ViewCustomers';
import AddCustomer from './pages/waiterPages/AddCustomer';
import UpdateCustomer from './pages/waiterPages/UpdateCustomer';
import WaiterInit from './pages/waiterPages/WaiterInit';
import GenerateBill from './pages/waiterPages/GenerateBill';
import GetCustomerDetail from './pages/lypPages/GetCustomerDetail';
import GetAllOrders from './pages/bookingPages/GetAllOrders';
import PrintBill from './pages/waiterPages/PrintBill';
import SignIn from './pages/SignIn';
import AdminSignUp from './pages/adminPages/AdminSignUp';
import AuthRoute from './components/AuthRoute';
import { useSelector } from 'react-redux';
import SideBarSel from './components/sidebars/SideBarSel';
import TopBar from './components/topbars/TopBar';
import AdminSideBar from './components/sidebars/AdminSideBar';
import ReceptionSideBar from './components/sidebars/ReceptionSideBar';
import WaiterSideBar from './components/sidebars/WaiterSideBar';
import LYPSideBar from './components/sidebars/LYPSideBar';
setupIonicReact();

const App = () => {
  const user = useSelector((state:any) => state.user.currentUser)
  return (
  <IonApp>
    {(user && user.role=='ADMIN') && <AdminSideBar />}
    {(user && user.role=='RECEPTIONIST') && <ReceptionSideBar />}
    {(user && user.role=='WAITER') && <WaiterSideBar />}
    {(user && user.role=='LYPREP') && <LYPSideBar />}
    {(user) && <TopBar />}
    <IonReactRouter>
        <IonRouterOutlet id='main-content'>
          <Route exact path="/">
            <Redirect to="/sign-in" />
          </Route>
          <Route exact path="/sign-in">
            <SignIn />
          </Route>
          <Route exact path="/customerUI/:tableNo">
            <CustomerInitialize />
          </Route>
          <Route exact path="/customerUI/customer-window/:tableNo">
            <CustomerWindow />
          </Route>
          <Route exact path="/customerUI/order-window/:tableNo">
            <OrderWindow />
          </Route>

          <AuthRoute roles={['RECEPTIONIST']} exact path="/reception/table-booking" component={TableListings} />
          <AuthRoute roles={['RECEPTIONIST']} exact path="/reception/all-orders" component={GetAllOrders} />

          <AuthRoute roles={['LYPREP']} exact path="/customerLYP/view-customers" component={ViewCustomers} />
          <AuthRoute roles={['LYPREP']} exact path="/customerLYP/customer-detail/:custId" component={GetCustomerDetail} />

          <AuthRoute roles={['WAITER']} exact path="/waiter" component={WaiterInit} />
          <AuthRoute roles={['WAITER']} exact path="/waiter/add-customer" component={AddCustomer} />
          <AuthRoute roles={['WAITER']} exact path="/waiter/update-customer" component={UpdateCustomer} />
          <AuthRoute roles={['WAITER']} exact path="/waiter/generate-bill" component={GenerateBill} />
          <AuthRoute roles={['WAITER']} exact path="/waiter/print-bill/:orderId/:tableNo" component={PrintBill} />

          <AuthRoute roles={['ADMIN']} exact path="/admin/sign-up" component={AdminSignUp} />

        </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
  )
};

export default App;
