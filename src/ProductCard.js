import React from 'react';

const ProductCard = props => {
    return (
            <div className="card">
                <div className="card-image">
                    <img src={props.image}/>
                </div>

                <div className="card-title">
                    {props.title}
                </div>

                <div className="card-price">
                    <h5>{props.priceText}</h5>
                </div>

                <div className="card-shipping">
                    {props.shipping ? (props.shipping.includes("FREE") ? '* Ücretsiz Kargo' : '') : ''}
                </div>

                <div className="card-button">
                    <button onClick={()=> {props.toggleCartButton(props.index,props.image,props.title,props.price,props.priceText)}}>
                        {props.cartIndexes && props.cartIndexes.includes(props.index) ? "Sepetten Çıkar" : "Sepete Ekle"}
                    </button>
                </div>

            </div>
    );
}

export default ProductCard;