import React from 'react';
import { Link } from 'react-router-dom';
import * as R from 'ramda';
import classNames from 'classnames';

import Layout from '../../components/Layout';
import useShallowEqualSelector from '../../hooks/useShallowEqualSelector';
import useActions from '../../hooks/useActions';
import { getBasketPhonesWithCount, getTheTotalCostOfTheBasket } from '../../selectors';
import { basketCheckout, cleanBasket, removePhoneFromBasket } from '../../actions/cart';

import styled from './cart.module.scss';

function Cart() {
    const phones = useShallowEqualSelector((state) => getBasketPhonesWithCount(state));
    const totalPrice = useShallowEqualSelector((state) => getTheTotalCostOfTheBasket(state));
    const isCartEmpty = R.isEmpty(phones);

    const [removePhoneFromBasketActionDispatch, cleanBasketActionDispatch, basketCheckoutActionDispatch] = useActions([
        removePhoneFromBasket,
        cleanBasket,
        basketCheckout,
    ]);

    console.log('isCartEmpty', isCartEmpty);

    return (
        <Layout breakpoint="xl">
            <div className={styled.cart}>
                <div className={styled.heading}>
                    <h1 className={styled.title}>Корзина</h1>
                </div>
                {isCartEmpty && (
                    <>
                        <p className={styled.warning}>
                            Корзина пуста. Перейдите в интернет-магазин, чтобы начать покупки.
                        </p>
                        <Link to="/" className={classNames('btn', 'btn-danger', styled.btnCartEmpty)}>
                            Перейти в интернет-магазин
                        </Link>
                    </>
                )}
            </div>
        </Layout>
    );

    /* return (
        <main className="container">
            <aside className="sidebar">
                <section className="basket-panel">
                    <Link to="/">
                        <span>Continue shopping!</span>
                    </Link>
                    {R.not(isBasketEmpty) && (
                        <div>
                            <button onClick={cleanBasketActionDispatch}>Clean cart</button>
                            <button onClick={() => basketCheckoutActionDispatch(phones)}>
                                Checkout
                            </button>
                        </div>
                    )}
                </section>
            </aside>
            <section className="content">
                {isBasketEmpty && <div>Your shopping cart is empty</div>}
                <table className="basket">
                    <tbody>
                        {phones.map((phone, index) => (
                            <tr key={index}>
                                <td>
                                    <img src={phone.image} alt={phone.name} />
                                </td>
                                <td>{phone.name}</td>
                                <td>${phone.price}</td>
                                <td>{phone.count}</td>
                                <td>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            removePhoneFromBasketActionDispatch(phone.id)
                                        }
                                    >
                                        delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {R.not(isBasketEmpty) && (
                    <div className="price">
                        <b>Total:</b>${totalPrice}
                    </div>
                )}
            </section>
        </main>
    ); */
}

export default Cart;
