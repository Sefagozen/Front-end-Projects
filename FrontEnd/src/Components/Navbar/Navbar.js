import React, { useState} from 'react';
import './Navbar.css';
import logo from './logo.png';
import Axios from 'axios';




export const Navbar = ({products,setProducts},{User,setUser}) => {
        const [isOpen, setIsOpen] = useState(false);
        const [Username, setUsername] = useState('');
        const [Password, setPassword]= useState('');
        const [logUsername, setlogUsername] = useState('');
        const [logPassword, setlogPassword]= useState('');
        const [Mail, setMail] = useState('');
        const [LoginStatus, setLoginStatus]= useState("");
        const [UserLoggedIn, setUserLoggedIn]= useState("");
        let total=0,temp=0;

        

        function handleRemove(id){          
            const filter=products.filter(item => item !== id);
            setProducts(filter);
            id.itemBasket++;
        }
        function handleDecrease(item){
            if(item.itemBasket===1){
                const filter=products.filter(id => id !== item);
            setProducts(filter);
            }
            if(item.itemBasket>1){
            item.itemBasket--;
            item.itemTotal-=item.ProductPrice;
            setProducts([...products]);
        }
    }
        function handleIncrease(item){
            if(item.itemBasket<item.ProductStock){
                 item.itemBasket++;
            item.itemTotal+=item.ProductPrice;
            setProducts([...products]);
            }else{
                alert(`Eklenebilecek maksimum ürün sayısına ulaştınız. Bu sayı ${item.ProductStock} adettir.  `)
            }
        }
        function TotalCalculator(index1){
            for (let i = products.length-1; i < products.length; i++) {
                temp+=index1;
                total=temp;
            }
            if(total<1){
                setIsOpen(!isOpen);
            }
        }
        
        
        const submitRegister = () => {
            if(Username ==="" || Password === "" || Mail ===""){
                alert("Belirtilen Alanları Doldurunuz.");
            }else{
                Axios.post('http://localhost:4000/api/insertLogin',{
                    UserName: Username,
                    UserPassword: Password,
                    UserMail: Mail
                }).then(()=>{
                    alert("success");
                })
            }
        }
        const Login = () =>{
            if(logUsername !=="" || logPassword !== "" ){
                Axios.post("http://localhost:4000/api/login",{
                    UserName: logUsername,
                    UserPassword: logPassword,
                }).then((response)=>{
                    if(response.data.message){
                        setLoginStatus(response.data.message);
                    } else{
                         setUserLoggedIn(response.data[0].Username);
                         
                    }
                });
            }else{

                alert("Belirtilen Alanları Doldurunuz.");
            }
           
        }
return (
        <header id='Home' style={{position:'relative'}}> 
        <div  className="Navbar" >
            <img className="Logo" src={logo} alt="Logo"/>
            </div>
                <ul className="nav_links col-4">
                   <li><a href='#Home'>Anasayfa</a></li>
                   <li><a href='#Products'>Ürünler</a></li>
                   <li><a data-toggle="modal" data-target="#modalSignUp" href='#Account'>Hesap</a></li>
                   <li>{UserLoggedIn}</li>
               </ul>
               <div className="modal fade bd-example-modal-sm" id="modalSignUp" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"aria-hidden="true">
                    <div className="modal-dialog modal-sm"> 
                    <div className="modal-content">
            <div className="modal-header">
            <h4 className="modal-title" style={{height:"50%"}}>Hesap</h4> 
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
            </div>
            <div className="modal-body">
                <form id="loginForm">
            <p style={{color:"black"}}>Henüz hesap oluşturmadıysanız hesap oluşturmak için  <a style={{color:"black"}} data-toggle="modal" href="#myModalRegister" >buraya</a> tıklayınız.</p>
            <label style={{fontWeight:"bold"}}>Kullanıcı adı</label>
            <input className="inputregister" type="text" id="txtUsername" onChange={(e)=>{
                setlogUsername(e.target.value);

            }}></input>
            <label style={{fontWeight:"bold"}}>Şifre</label>
            <input className="inputregister" type="password" id="txtPassword" onChange={(e)=>{
                setlogPassword(e.target.value);
            }}></input>
            <h4>{LoginStatus}</h4>
            </form>
            </div>
            <div className="modal-footer">
                <button  className="btnNav" onClick={Login}>Giriş Yap</button>
            </div>
        </div>
    </div>

    <div className="modal" id="myModalRegister">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title" style={{height:"50%"}}>Kayıt Ol</h4>
                    <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div className="modal-body" style={{textAlign:"center"}}>
                    <label  style={{color:"black"}}>SafeSounds yeniliklerinden faydalanmak için aşağıdaki alanları doldurunuz.</label><br/>
                    <label style={{fontWeight:"bold"}}>Kullanıcı adı</label>
                    <input className="inputregister" type="text" id="txtUsername" onChange={(e)=>{
                        setUsername(e.target.value);
                    }}></input>
                    <label style={{fontWeight:"bold"}}>Mail Adresi</label>
                    <input className="inputregister" type="text" id="txtMail"
                    onChange={(e)=>{
                        setMail(e.target.value);
                    }}></input>
                    <label style={{fontWeight:"bold"}}>Şifre</label>
                    <input className="inputregister" type="password" id="txtPassword"  onChange={(e)=>{
                        setPassword(e.target.value);
                    }}></input>
                </div>
                <div className="modal-footer">
                    <button data-dismiss="modal" className="btnNav" onClick={submitRegister}> Kayıt Ol</button>
                </div>
            </div>
        </div>
                        </div>
                        </div>
               <div className={isOpen ? 'show modalpro' : 'modalpro'}>
                   {products.map((item,key) => (
                       <div key={key} className="modalproholder">
                           <div className="modalimg">
                           <button type="button" className="close" onClick={() => handleRemove(item)}><i className="fa fa-window-close"></i></button>
                            <p><img alt={item.alt} src={item.ProductImg}></img>{item.ProductName}</p>
                            <p>Ürün Adedi : {item.itemBasket} <button id="crease" onClick={()=>handleIncrease(item,User)}><i className="fa fa-plus" aria-hidden="true"></i></button><button id="crease" onClick={()=>handleDecrease(item)}><i className="fa fa-minus" aria-hidden="true"></i></button></p>
                            <b>{item.itemTotal}<i  id="try" className="fa fa-try" ></i></b>
                          {TotalCalculator(item.itemTotal)}
                          </div>
                        </div>
                        ))}
                        <div className="TotalHolder">
                        <h4 className="TotalP">Toplam:<span> {total} <i id="try" className="fa fa-try" ></i></span></h4>
                        </div>
               </div>
            {products.length >= 0 ? (<a href="/#" className="cta"  onClick={() => {
                setIsOpen(!isOpen);
            }
            }><button className="btnNav">{products.length} Eşya</button></a>) : <p>Yapımcıyla İletişime geçiniz.</p>}
     </header>
    )
}
