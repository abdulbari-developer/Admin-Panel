import React from 'react'

const ProductModal = ({ product, onClose }) => {
  if (!product) return null

  return (
    <div className="modal-overlay">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>❌</button>
        <img src={product.image} alt={product.name} />
        <div className="modal-r">
        <h2>{product.name}</h2>
        <p><strong>Price:</strong> Rs. {product.price}</p>
        <p><strong>Description:</strong> {product.description}</p>
        </div>
      </div>
    </div>
  )
}

export default ProductModal



