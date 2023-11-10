import React from 'react'

const ProductComponent = () => {
    
    return (
        <div class="">
            <div id='12390123' className="tempo-widget-cart-item-comp">
                <img src="" alt="Product Image" />
                <div className="tempo-widget-cart-item-comp-content">
                    <h2 className="tempo-widget-cart-item-comp-title">
                        $title
                    </h2>
                    <p className="tempo-widget-cart-item-comp-price">$123</p>
                    <p className="tempo-widget-cart-item-comp-description">description</p>
                    <a className="tempo-widget-cart-item-comp-link" href='${productUrl}' target='_blank'> <button>Add to Cart</button></a>
                </div>
            </div>
        </div>
    )
}

export default ProductComponent