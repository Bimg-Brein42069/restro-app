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

import SideBar from './components/sidebars/SideBar';
import React from 'react';
import OrderWindow from './pages/customerPages/OrderWindow'
import TableListings from './pages/bookingPages/TableListings';
import CustomerInitialize from './pages/customerPages/CustomerInitialize';
import CustomerWindow from './pages/customerPages/CustomerWindow';
import ViewCustomers from './pages/lypPages/ViewCustomers';
import AddCustomer from './pages/waiterPages/AddCustomer';
import UpdateCustomer from './pages/waiterPages/UpdateCustomer';
setupIonicReact();

const App: React.FC = () => (
  <IonApp>
  <SideBar />
    <IonReactRouter>
        <IonRouterOutlet id='main-content'>
          <Route exact path="/customerUI/">
            <CustomerInitialize />
          </Route>
          <Route exact path="/customerUI/customer-window">
            <CustomerWindow />
          </Route>
          <Route exact path="/customerUI/order-window">
            <OrderWindow />
          </Route>
          <Route exact path="/reception/table-booking">
            <TableListings />
          </Route>
          <Route exact path="/customerLYP/view-customers">
            <ViewCustomers />
          </Route>
          <Route exact path="/waiter/add-customer">
            <AddCustomer />
          </Route>
          <Route exact path="/waiter/update-customer">
            <UpdateCustomer />
          </Route>
        </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
