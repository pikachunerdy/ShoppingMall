import React, { Fragment, useEffect } from 'react';
import * as R from 'ramda';
import { Link } from 'react-router-dom';

import useActions from '../../hooks/useActions';
import useShallowEqualSelector from '../../hooks/useShallowEqualSelector';
import { fetchPhoneById } from '../../actions/phone';
import { addPhoneToBasket } from '../../actions/basket';
import { getPhoneById } from '../../selectors';
import BasketCart from '../../components/basketCart';

import './style.scss';

const Phone = ({ match }) => {
    const slug = match.params.id;
    const [
        fetchPhoneByIdActionDispatch,
        addPhoneToBasketActionDispatch,
    ] = useActions([fetchPhoneById, addPhoneToBasket]);

    useEffect(() => {
        fetchPhoneByIdActionDispatch(slug);
    }, [fetchPhoneByIdActionDispatch, slug]);

    const phone = useShallowEqualSelector((state) => getPhoneById(state, state.phonePage.id));

    const renderFields = () => {
        const columnField = R.compose(
            R.toPairs,
            R.pick([
                'cpu',
                'camera',
                'size',
                'weight',
                'display',
                'battery',
                'memory',
            ]),
        )(phone);

        return columnField.map(([key, value]) => (
            <div className='details-column' key={key}>
                <div className='details-title'>
                    <p>{key}:</p>
                </div>
                <div className='details-info'>
                    {value}
                </div>
            </div>
        ));
    };

    return (
        <main className='container'>
            <aside className='sidebar'>
                {phone && (
                    <Fragment>
                        <p>Quick shop</p>
                        <BasketCart/>
                        <div>
                            <h1>{phone.name}</h1>
                            <h2>{phone.price}</h2>
                        </div>
                        <Link to='/phones' className='btn btn-primary'>Back to store</Link>
                        <button
                            className='btn btn-primary'
                            type='button'
                            onClick={() => addPhoneToBasketActionDispatch(phone.id)}
                        >Add to cart
                        </button>
                    </Fragment>
                )}
            </aside>
            <section className='content'>
                {phone && (
                    <article id='phone'>
                        <section>
                            <img className='phone-img' src={phone.image} alt={phone.name}/>
                            <div className='phone-details'>
                                {renderFields()}
                            </div>
                        </section>
                        <h4>{phone.name}</h4>
                        <span>${phone.price}</span>
                        <p>{phone.description}</p>
                    </article>
                )}
            </section>
        </main>
    );
};

export default Phone;