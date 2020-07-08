import React from 'react';
import { Link } from 'react-router-dom';
import * as R from 'ramda';

import useShallowEqualSelector from '../../hooks/useShallowEqualSelector';
import useActions from '../../hooks/useActions';
import { getBasketPhonesWithCount, getTotalBasketPrice } from '../../selectors';
import { basketCheckout, cleanBasket, removePhoneFromBasket } from '../../actions/basket';

import './style.scss';

const Basket = () => {
    const phones = useShallowEqualSelector((state) => getBasketPhonesWithCount(state));
    const totalPrice = useShallowEqualSelector((state) => getTotalBasketPrice(state));
    const isBasketEmpty = R.isEmpty(phones);

    const [
        removePhoneFromBasketActionDispatch,
        cleanBasketActionDispatch,
        basketCheckoutActionDispatch,
    ] = useActions([removePhoneFromBasket, cleanBasket, basketCheckout]);

    return (
        <main className='container'>
            <aside className='sidebar'>
                <section className='basket-panel'>
                    <Link to='/'>
                        <span>Continue shopping!</span>
                    </Link>
                    {R.not(isBasketEmpty) && (
                        <div>
                            <button onClick={cleanBasketActionDispatch}>Clean cart</button>
                            <button onClick={() => basketCheckoutActionDispatch(phones)}>Checkout</button>
                        </div>
                    )}
                </section>
            </aside>
            <section className='content'>
                {isBasketEmpty && <div>Your shopping cart is empty</div>}
                <table className='basket'>
                    <tbody>
                    {phones.map((phone, index) => (
                        <tr key={index}>
                            <td>
                                <img src={phone.image} alt={phone.name}/>
                            </td>
                            <td>{phone.name}</td>
                            <td>${phone.price}</td>
                            <td>{phone.count}</td>
                            <td>
                                <button type='button'
                                        onClick={() => removePhoneFromBasketActionDispatch(phone.id)}>delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {R.not(isBasketEmpty) && (
                    <div className='price'>
                        <b>Total:</b>
                        ${totalPrice}
                    </div>
                )}
            </section>
        </main>
    );
};

export default Basket;