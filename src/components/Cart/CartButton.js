import { useSelector, useDispatch } from 'react-redux';

import classes from './CartButton.module.css';
import { uiActions } from '../../store/ui';

const CartButton = (props) => {
  const quantity = useSelector(state => state.cart.totalQuantity);
  const dispatch = useDispatch();

  function toggleCartHandler() {
    if (quantity !== 0) {
      dispatch(uiActions.toggle());
    }
  };

  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{quantity}</span>
    </button>
  );
};

export default CartButton;
