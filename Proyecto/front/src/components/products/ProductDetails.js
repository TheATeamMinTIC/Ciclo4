import React,{Fragment,useEffect,useState} from "react";
import {useDispatch,useSelector} from "react-redux";
import { useParams } from "react-router-dom";
import {getProductDetails} from "../../actions/productActions";
import {Carousel} from "react-bootstrap"; 

export const ProductDetails = () => {
    const {loading,error,product} = useSelector(state => state.productDetails);
    const {id} = useParams();
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1) 

    useEffect(() => {
        dispatch(getProductDetails(id));
    },[dispatch,id]);

    const increaseQty = () => {
        const contador = document.querySelector('.count');

        if(contador.valueAsNumber >= product.stock) return;

        const qty = contador.valueAsNumber + 1;
        setQuantity(qty);
    }

    const decreaseQty = () => {
        const contador = document.querySelector('.count');

        if(contador.valueAsNumber <= 1) return;

        const qty = contador.valueAsNumber - 1;
        setQuantity(qty);
    }

    return (
        <Fragment>
            {loading ? <h1>Loading...</h1> : error ? <h1>{error}</h1> : (
                <Fragment>
                    <div className="row f-flex justify-content-around">
                        <div className="col-12 col-lg-5 img-fluid" id="imagen_producto">
                            <Carousel pause='hover'>
                                {product.imagen && product.imagen.map(img => (
                                    <Carousel.Item key={img.public_id}>
                                        <img className="d-block w-100" src={img.url} alt={product.nombre} />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </div>

                        <div className="col-12 col-lg-5 mt-5">
                            <h3>{product.nombre}</h3>
                            <p id="product_id">Producto # {product._id}</p>
                            <hr/>
                            <div className="rating-outer">
                                <div className="rating-inner" style={{width: `${(product.calificacion/5) * 100}%`}}></div>
                            </div>
                            <span id="no_of_reviews">({product.numCalificaciones} Reviews)</span>
                            <hr/>
                            <p id="product_price">${product.precio}</p>
                            <div className="stockCounter d-inline">
                                <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>

                                <input type="number" className="form-control count d-inline" value={quantity} readOnly />
                                <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
                                
                            </div>
                            <button type="button" id="carrito_btn" className="btn btn-primary d-inline ml-4" disabled={product.inventario===0}>Agregar al Carrito</button>
                            <hr/>
                            <p>Estado: <span id="stock_stado" className={product.inventario>0 ? 'greenColor':'redColor'}>{product.inventario>0 ? "En existencia": "Agotado"}</span></p>
                            <hr/>
                            <h4 className="mt-2">Descripción:</h4>
                            <p>{product.descripcion}</p>
                            <hr/>
                            <p id="product_seller mb-3">Vendido por: <strong>{product.vendedor}</strong></p>
                            <button id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal">
                                Dejar una reseña
                            </button>
                            <div className="alert alert-danger mt-5" type="alert">Inicia Sesión para dejar tu review</div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>


    )

}