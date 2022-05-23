import React from 'react';

const Cart = props => {
    return (
        <dialog className="cart-modal" open={props.isCartOpen}>
            <h2>Sepetim</h2>
            <i id="cart-close-button" className="bi bi-x-lg" onClick={() => props.setIsCartOpen(false)}></i>
            <div>
                {props.cart.map((item, i) => (
                    <div key={i} className="cart-item">
                        <img className='cart-item-image' src={item.image} width={24}/>
                        <p className='cart-item-name'>{item.name}</p>
                        <span className='cart-item-pricetext'>{item.priceText}</span>
                        <i className="bi bi-trash" onClick={() => props.deleteFromCart(item.index, item.price)}></i>
                    </div>
                ))}

                {!props.cart || props.cart.length === 0 && <div>Sepetinize ürün eklemediniz.</div>}

            </div>

            {props.cart && props.cart.length > 0 &&
                <div className="cart-total-area">
                    Toplam : {props.cartTotal.toFixed(2)}
                    <i
                        className="bi bi-trash"
                        style={{color:'white',fontSize:'22px',cursor:'pointer'}}
                        title={'Sepeti Boşalt'}
                        onClick={() => props.clearCart()}></i>
                </div>
            }

        </dialog>
    );
}

export default Cart;