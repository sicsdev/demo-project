import React from 'react'

const ProductComponent = ({ product }) => {

    return (
        <div class="">
            <div id='12390123' className="tempo-widget-cart-item-comp">
                <img src={product.image} alt="Product Image" />
                <div className="tempo-widget-cart-item-comp-content">
                    <h2 className="tempo-widget-cart-item-comp-title">
                        {product.title}
                    </h2>
                    <p className="tempo-widget-cart-item-comp-price">{product.price}</p>
                    <p className="tempo-widget-cart-item-comp-description">{product.description}</p>
                    <a className="tempo-widget-cart-item-comp-link" href={product.url} target='_blank'> <button>Add to Cart</button></a>
                </div>
            </div>
        </div>
    )
}

export default ProductComponent