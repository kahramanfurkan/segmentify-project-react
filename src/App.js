import React, {useState, useEffect} from 'react';
import './App.css';
import axios from "axios";
import ReactLoading from 'react-loading';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation} from "swiper";
import 'swiper/css/bundle';
import {toast, ToastContainer} from 'react-toastify';
import {injectStyle} from "react-toastify/dist/inject-style";
import Navbar from "./Navbar";
import ProductCard from "./ProductCard";

function App() {
    const [categories, setCategories] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [cart, setCart] = useState([]);
    const [selectedCategoryItems, setSelectedCategoryItems] = useState(null);

    useEffect(() => {
        injectStyle();
        axios.get('https://api.npoint.io/ceec662bde0d9ba4f7cc/responses/0/0/params/')
            .then(response => {
                arrangeCategoryTitlesAndInitialData(response.data.userCategories);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);


    useEffect(() => {
        axios.get('https://api.npoint.io/ceec662bde0d9ba4f7cc/responses/0/0/params/recommendedProducts')
            .then(response => {
                setSelectedCategoryItems(response.data[`${selectedCategory.categoryName}`]);
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error);
            });
    }, [selectedCategory])


    const arrangeCategoryTitlesAndInitialData = (categoryData) => {
        let categories = [];

        categoryData.forEach((category) => {
            categories.push({name: category, shortedName: category.includes('>') ? category.split('>')[1] : category});
        });

        setCategories(categories);
        setSelectedCategory({categoryIndex: 0, categoryName: 'Size Özel'});
        setCategory(0, 'Size Özel');
    }


    const setCategory = (categoryIndex, categoryName) => {
        setIsLoading(true);
        setSelectedCategory({categoryIndex: categoryIndex, categoryName: categoryName});

        const navItems = document.querySelectorAll('.nav-item');
        for (let i = 0; i < navItems.length; i++) {
            navItems[i].classList.remove('selected-nav-item');
        }
        navItems[categoryIndex].classList.add('selected-nav-item');
    }

    const showToast = (type) => {
        const options = {
            position: "bottom-right",
            autoClose: 1500,
            hideProgressBar: true,
            closeButton: true,
        }
        if (type === 'add') {
            toast.success('Ürün sepete eklendi.', options);
        } else {
            toast.warning('Ürün sepetten çıkarıldı.', options);
        }
    }

    const toggleCartButton = (itemIndex) => {
        let tempCart = [...cart];
        if (tempCart.includes(itemIndex)) {
            tempCart = tempCart.filter(item => item !== itemIndex);
            showToast('remove');
        } else {
            tempCart.push(itemIndex);
            showToast('add');
        }
        setCart(tempCart);
    }

    return (
        <div className="container">
            <div>
                <h2>Sizin için Seçtiklerimiz</h2>
                <div className="second-row">
                    <Navbar
                        categories={categories}
                        setCategory={setCategory}
                    />
                    <div className="cards-area">
                        {isLoading &&
                            <div className="loader-container">
                                <ReactLoading type={"spin"} width={50} height={50} color={"rgba(117,114,114,0.35)"}/>
                            </div>}
                        {!isLoading &&
                            <Swiper
                                spaceBetween={0}
                                slidesPerView={1}
                                width={320}
                                style={{padding: '40px'}}
                                modules={[Navigation]}
                                navigation
                            >
                                {selectedCategoryItems && selectedCategoryItems.map((item, i) => (
                                    <SwiperSlide key={i}>
                                        <ProductCard
                                            index={i}
                                            image={selectedCategoryItems[i].image}
                                            title={selectedCategoryItems[i].name}
                                            priceText={selectedCategoryItems[i].priceText}
                                            shipping={selectedCategoryItems[i].params.shippingFee}
                                            toggleCartButton={toggleCartButton}
                                            cart={cart}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>}
                    </div>

                </div>
            </div>
            <ToastContainer/>
            <div className="cart-container">
                <span className="item-length">{cart.length}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="#2249BA"
                     className="bi bi-cart2" viewBox="0 0 16 16">
                    <path
                        d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5
                        6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25
                        5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0
                        1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
                </svg>
            </div>

            <div className="signature">
                <img src={process.env.PUBLIC_URL + '/favicon.png'} width={25}/>
                Segmentify işe alım projesi - <a href="https://www.linkedin.com/in/furkan-kahraman-377889208/"
                                                 target="_blank">Furkan Kahraman</a>
            </div>
        </div>
    );
}

export default App;
