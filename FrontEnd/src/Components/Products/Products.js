import React, { useEffect, useState} from 'react'
import './Products.css'
import Axios from 'axios';
// import ProductList from '../Products/ProductList';


export const Products = ({setProducts,products},{User,setUser}) => {
    const [productList, setproductList] = useState([])

    const handleClick=(data,User)=>{
        if(data.itemBasket<1){
            data.itemBasket++;
        }
        setProducts([...products,data]);
        const len= Object.keys(products).length;
        for(let i=0;i<len;i++){
            if(data===products[i]){
                if(data.itemBasket<data.ProductStock){
                    data.itemBasket++;
                    setProducts([...products]);
                    setCart(data);
                   
                }else{
                    alert(`Eklenebilecek maksimum ürün sayısına ulaştınız. Bu sayı ${data.ProductStock} adettir.  `)
                    setProducts([...products]);
                }
            }
        }
        data.itemTotal=data.itemBasket*data.ProductPrice;
      } 
      const setCart = (data,user)=>{
        console.log(data.idProduct);

      }


      useEffect(()=>{
        Axios.get('http://localhost:4000/api/getproducts').then((response)=>{
            setproductList([...response.data]);
        })
      },[])

     
    
    return (
    <div className="container" id="Products" >
        <h2>Ürünler</h2>
        <div className="product_holder" >
            {productList.map((data,key)=>{
                return(
                    <div id={`${key.id}`}  className={`urun ${data.ProductName} col-lg-3 col-md-4 col-sm-6 col-xs-6`} >
                    <div key={`item ${key}`}>
                        <img src={data.ProductImg} alt={data.alt} />
                        <div className="row product_alt">
                            <div className="pname col-sm-auto">
                        <span>{data.ProductName}</span>
                            </div>
                            <div className="pprice col-sm auto" >
                        <span style={{float:"right"}}>{data.ProductPrice}<i id="try" className="fa fa-try " ></i></span>
                            </div>
                        </div>
                            <div className="middle">
                        <button className="btnProduct" data-toggle="modal" data-target={`#myModal${key}`}>{data.ProductName}</button>
                        <button className="btnAdd" onClick={()=>handleClick(data)} type="button"><i className="fa fa-shopping-cart fa-lg" aria-hidden="true"></i></button>
                        </div>
                        <div className="modal fade" id={`myModal${key}`} aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                        <div className="modal-header">
                                            <h4>Safe Sounds</h4>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><i className="fa fa-window-close"></i></button>
                                        </div>
                                        <div className="modal-body">
                                            <img style={{margin:"auto",width:"75%"}} src={data.ProductImg} alt={data.alt} />
                                            <ul>
                                                <h5>{data.ProductName}</h5>
                                                <p>Sadece SafeSounds'da bulabileceğiniz bu ürünün özellikleri şu şekildedir; </p> 
                                            <li><b>Frekans değeri aralığı</b>: {data.ProductFreq}</li>
                                            <li><b>Ohm değeri :</b> {data.ProductOhm}</li>
                                            <li><b>Ağırlık :</b> {data.ProductWeight}</li>
                                            <li>Bu üründen elimizde <b>{data.ProductStock}</b> adet bulunmaktadır.</li>
                                            </ul>
                                           
                                         </div>
                                        <div className="modal-footer">
                                            <b>{data.ProductPrice}<i id="try" className="fa fa-try" ></i></b>
                                            <button className="btnAdd" onClick={()=>handleClick(data,User)} type="button">Sepete Ekle</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                        
                )
            })}
        </div>
        <button id="Up" onClick={(e)=>{e.preventDefault();
        window.location.href="#Home";
        }}><i id="Up" className="fa fa-arrow-up fa-2x" aria-hidden="true"></i></button>
        </div>
        
    );
  };