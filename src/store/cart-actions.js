import { uiActions } from './ui';
import { cartActions } from './cart';

export const fetchCartData = () => {
  return async (dispatch) => {
    // dispatch(
    //   uiActions.showNotification({
    //     status: 'pending',
    //     title: 'fetching',
    //     message: 'Fetching cart data!'
    //   })
    // );

    const fetchData = async () => {
      const response = await fetch('https://react-class-b341e-default-rtdb.firebaseio.com/cart.json');

      if (!response.ok) {
        throw new Error('Fetching failed');  
      }

      const data = await response.json();

      return data;
    };

    try {
      const cartData = await fetchData();

      dispatch(cartActions.replaceCart({
        items: cartData.items || [],
        totalQuantity: cartData.totalQuantity
      }));

      // dispatch(
      //   uiActions.showNotification({
      //     status: 'success',
      //     title: 'success',
      //     message: 'Cart data fetched!'
      //   })
      // );
  
    } catch(error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'error',
          message: 'Fetching cart data failed!'
        })
      );
    }
  };
};

//Redux Toolkit accept action creators (as well as action object) and execute the dispatch function for us (as part of a flow of side-effects/steps)
export const sendCartData = (cartData) => {
  //the action creator return a function instead of an action object
  return async (dispatch) => {

    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'sending',
        message: 'Sending cart data!'
      })
    );

    const sendRequest = async () => {
      const response = await fetch('https://react-class-b341e-default-rtdb.firebaseio.com/cart.json', 
        {
          method: 'PUT',
          body: JSON.stringify(cartData)  //useSelector sets up a subscription to Redux so that whenever the Redux store changes, the App component function will automatically will be re-executed to get the latest state (= here the latest cart)
        }
      );
  
      if (!response.ok) {
        throw new Error('Sending failed');  
      }
    };

    try {
      await sendRequest();

      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'succes',
          message: 'Send cart data succesfully!'
        })
      );  
    } catch(error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'error',
          message: 'Sending cart data failed'
        })
      );
    };
  };
};
