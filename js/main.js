let doc = document; 
let container = doc.querySelector('.container');
let prodBlock = doc.querySelector('.product-block');

let products = [
    {img: 'img-1.jpg', name: 'Смарт-часы Xiaomi Mi Watch Lite Ivory', price: 1966},
    {img: 'img-2.jpg', name: 'Планшет Apple iPad 10.2" 2021 Wi-Fi 64 GB Space Gray', price: 16999},
    {img: 'img-3.jpg', name: 'Монитор 23.8" Samsung S24R350 Dark Silver', price: 5599},
];

let priceArr = [];
let prodArrBasket = [];

let productsData,
    prod,
    allProdLocal;

if (!localStorage.getItem('products')) {
    productsData = localStorage.setItem('products', JSON.stringify(products));
    prod = localStorage.getItem('products');
    allProdLocal = JSON.parse(prod);
} else {
    prod = localStorage.getItem('products');
    allProdLocal = JSON.parse(prod);
}

renderProductCards();

let prodCard = doc.querySelectorAll('.product-card');
let counterBuyProd = 0;
let counterInBasket = 1;

renderBasket();

let buttonBasket = doc.querySelector('.product-basket');
let basketCount = doc.querySelector('.basket-counter');
let windowBasket = doc.querySelector('.window-basket');
let basketSum = doc.querySelector('.basket-sum');
basketCount.innerHTML = `${counterBuyProd}`;

openBasket();
closeBasket();
clickBuyProds();


function renderProductCards() {
    allProdLocal.forEach(function(item) {
        let prodCardHtml = `<div class="product-card">
                                <div class="product-img"><img src="./img/${item.img}"></div>
                                <span class="product-name">${item.name}</span>
                                <span class="product-price">${item.price}₴</span>
                            </div>`;

       prodBlock.insertAdjacentHTML('beforeend', prodCardHtml);
    });
}

function renderBasket() {
    let basketButton = `<div class="product-basket">
                            <img src="./img/basket-icon.png">
                            <span class="basket-counter"></span>
                        </div>
                        <div class="window-basket">
                            <button class="button-close">X</button>
                            <div class="basket-sum">Сумма товаров: 0</div>
                        </div>`;
    container.insertAdjacentHTML('beforeend', basketButton);
}

function openBasket() {
    buttonBasket.onclick = function() {
        windowBasket.classList.add('window-active');
    };
}

function closeBasket() {
    let butClose = doc.querySelector('.button-close');
    butClose.onclick = function() {
        windowBasket.classList.remove('window-active');
    };
}

function clickBuyProds() {
    prodCard.forEach(function(item,index) {
        item.onclick = function() {
            let cardImg = false;
            counterBuyProd++;

            basketCount.innerHTML = `${counterBuyProd}`;
            let prodsCardHtml;    

            for(let i = 0;i < allProdLocal.length;i++) {
                for(item of allProdLocal) {
                    let price = parseInt(item.price);
                    item.price = price;
                }
                prodsCardHtml = `<div class="product-card"">
                                    <div class="product-img"><img src="./img/${allProdLocal[index].img}"></div>
                                    <span class="product-name">${allProdLocal[index].name}</span>
                                    <span class="product-number" data-id="${index}"></span>
                                    <span class="product-price">${allProdLocal[index].price}₴</span>
                                </div>`;
            }

            let arr = {img: `${allProdLocal[index].img}`, name: `${allProdLocal[index].name}`, price: `${allProdLocal[index].price}`, number: 1};
            
            console.log(arr);

            prodArrBasket.forEach(function(item) {
                if(arr.img === item.img) {
                    let prodNumber = doc.querySelectorAll('.product-number');
                    let arrNumber = +1;
                }
            });

            if(!cardImg) {
                counterInBasket++;
            }

            if(!cardImg) {
                prodArrBasket.push(arr);
                console.log(prodArrBasket);
                windowBasket.insertAdjacentHTML(`beforeend`, prodsCardHtml);
            }
     

            let prodPrice = allProdLocal[index].price;
            console.log(prodPrice);
            priceArr.push(prodPrice);

            let totalPrice = priceArr.reduce(function(acc,curr) {
                return acc + curr;
            }, 0);
            basketSum.innerText = `Сумма Товаров: ${totalPrice} ₴`;
        }
    });
}
