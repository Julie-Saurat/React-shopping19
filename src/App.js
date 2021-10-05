import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { sendCartData, fetchCartData } from './store/cart-actions';

//To avoid useEffect to re-execute when the app restarts =>
let isInitial = true;

//Handling the side effects by an action creator
function App() {
  const dispatch = useDispatch();
  const show = useSelector(state => state.ui.cartIsVisible);
  //here we are creating a subscription to Redux store to monitor cart changes
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);   //no dynamic dependencies (dispatch does not change) == rendered only when the app is loaded

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return
    };
    //HERE: With isInitial => useEffect will not re-execute when our app restarts & will thus not send the initial (i.e. empty) cart to our backend and overwrite any data stored there.

    //Enable to avoid the 'sucess' message when the cart is relaod for the first time 
    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);
  //WARNING HERE: Without isInitial => It's a problem because this will execute when our app restarts & will send the initial (i.e. empty) cart to our backend and overwrite any data stored there.

  return (
    <Fragment>
      {notification && <Notification 
        status={notification.status}
        title={notification.title}
        message={notification.message}
      />}
      <Layout>
        {show && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;



//Handling the side effects inside the Component:
// function App() {
//   const dispatch = useDispatch();
//   const show = useSelector(state => state.ui.cartIsVisible);
//   //here we are creating a subscription to Redux store to monitor cart changes
//   const cart = useSelector(state => state.cart);
//   const notification = useSelector(state => state.ui.notification);

//   useEffect(() => {
//     const sendCartData = async () => {
//       dispatch(
//         uiActions.showNotification({
//           status: 'pending',
//           title: 'sending',
//           message: 'Sending cart data!'
//         })
//       );
//       const response = await fetch('https://react-class-b341e-default-rtdb.firebaseio.com/cart.json', 
          // {
  //         method: 'PUT',
  //         body: JSON.stringify(cart)  //useSelector sets up a subscription to Redux so that whenever the Redux store changes, the App component function will automatically will be re-executed to get the latest state (= here the latest cart)
//         }
        // );

//       if (!response.ok) {
//         throw new Error('Sending failed');  
//       }

//       dispatch(
//         uiActions.showNotification({
//           status: 'success',
//           title: 'succes',
//           message: 'Send cart data succesfully!'
//         })
//       );
//     };

//     if (isInitial) {
//       isInitial = false;
//       return
//     };
//     //HERE: With isInitial => useEffect will not re-execute when our app restarts & will thus not send the initial (i.e. empty) cart to our backend and overwrite any data stored there.

//     sendCartData().catch((error) => {
//       dispatch(
//         uiActions.showNotification({
//           status: 'error',
//           title: 'error',
//           message: 'Sending cart data failed'
//         })
//       );
//     });
//   }, [cart, dispatch]);
//   //WARNING HERE: Without isInitial => It's a problem because this will execute when our app restarts & will send the initial (i.e. empty) cart to our backend and overwrite any data stored there.

//   return (
//     <Fragment>
//       {notification && <Notification 
//         status={notification.status}
//         title={notification.title}
//         message={notification.message}
//       />}
//       <Layout>
//         {show && <Cart />}
//         <Products />
//       </Layout>
//     </Fragment>
//   );
// }
