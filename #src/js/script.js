@@include('functions.js');
@@include('swiper.min.js');
@@include('sliders.js');
@@include('spoilers.js');

window.onload = function () {

    document.addEventListener("click", documentActions);

    function documentActions(e) {
        const targetElement = e.target;
        if (targetElement.classList.contains('search-form__icon')) {
            document.querySelector('.search-form').classList.toggle('_active');
        } else if (!targetElement.closest('.search-form') && document.querySelector('.search-form._active')) {
            document.querySelector('.search-form').classList.remove('_active');
        }
        if (targetElement.classList.contains('cart-header__icon') || targetElement.closest('.cart-header__icon')) {
            console.log("Yes");
            if (document.querySelector('.cart-list').children.length > 0) {
                document.querySelector('.cart-header').classList.toggle('_active');
            }
            e.preventDefault();
        } else if (!targetElement.closest('.cart-header') && !targetElement.classList.contains('actions-product__button')) {
            document.querySelector('.cart-header').classList.remove('_active');
        }
        if (targetElement.classList.contains('button__shop_buy')) {
            const productId = targetElement.closest('.product').dataset.pid;
            console.log(productId);
            addToCart(targetElement, productId);
            e.preventDefault();
        }
        if (targetElement.classList.contains('cart-list__delete')) {
            const productId = targetElement.closest('.cart-list__item').dataset.cartPid;
            updateCart(targetElement, productId, false);
            e.preventDefault();
        }
    }
}

function addToCart(productButton, productId) {
    if (!productButton.classList.contains('_hold')) {
        productButton.classList.add('_hold');
        productButton.classList.add('_fly');

        const cart = document.querySelector('.cart-header__icon');
        const product = document.querySelector(`[data-pid="${productId}"]`);
        const productImage = product.querySelector('.product__image');

        const productImageFly = productImage.cloneNode(true);

        const productImageFlyWidth = productImage.offsetWidth;
        const productImageFlyHeight = productImage.offsetHeight;
        const productImageFlyTop = productImage.getBoundingClientRect().top;
        const productImageFlyLeft = productImage.getBoundingClientRect().left;

        productImageFly.setAttribute('class', '_flyImage ');
        productImageFly.style.cssText =
            `
                left: ${productImageFlyLeft}px;
                top: ${productImageFlyTop}px;
                width: ${productImageFlyWidth}px;
                height: ${productImageFlyHeight}px;
            `;

        document.body.append(productImageFly);

        const cartFlyLeft = cart.getBoundingClientRect().left;
        const cartTop = cart.getBoundingClientRect().top;

        productImageFly.style.cssText =
            `
                left: ${cartFlyLeft}px;
                top: ${cartTop}px;
                width: 0px;
                height: 0px;
                opacity:0;s
            `

        productImageFly.addEventListener('transitionend', function () {
            if (productButton.classList.contains('_fly')) {
                productImageFly.remove();
                updateCart(productButton, productId);
                productButton.classList.remove('_fly');
            }
        });
    }
}

function updateCart(productButton, productId, productAdd = true) {
    const cart = document.querySelector('.cart-header');
    const cartIcon = cart.querySelector('.cart-header__icon');
    const cartQuantity = cartIcon.querySelector('span');
    const cartProduct = document.querySelector(`[data-cart-pid="${productId}"]`);
    const cartList = document.querySelector('.cart-list');
    const cartPrice = document.querySelector(`[data-pid="${productId}"]`).querySelector('.product__price').innerHTML;
    let productsSum = +cartPrice;
    const summ = cart.querySelector('.cart-header__text');

    if (productAdd) {
        if (cartQuantity) {
            cartQuantity.innerHTML = ++cartQuantity.innerHTML;
        } else {
            cartIcon.insertAdjacentHTML('beforeend', `<span>1</span>`);
        }
        if (!cartProduct) {
            const product = document.querySelector(`[data-pid="${productId}"]`);
            const cartProductImage = product.querySelector('.product__image').innerHTML;
            const cartProductTitle = product.querySelector('.product__title').innerHTML;
            summ.innerHTML = +summ.innerHTML + (+cartPrice)
            const cartProductContent = `
                <a href="" class="cart-list__image ">${cartProductImage}</a>
                <div class="cart-list__body">
                    <a href="" class="cart-list__title">${cartProductTitle}</a>
                    <div class="cart-list__quantity">Quality: <span>1</span></div>
                    <div class="cart-list__price">Price: <span>${productsSum}</span></div>
                    <a href="" class="cart-list__delete">Delete</a>
                </div>
            `;
            cartList.insertAdjacentHTML('beforeend', `<li data-cart-pid="${productId}" class="cart-list__item">${cartProductContent}</li>`);
        } else {
            const cartProductQuantity = cartProduct.querySelector('.cart-list__quantity span');
            cartProductQuantity.innerHTML = ++cartProductQuantity.innerHTML;
            const productSum = cartProduct.querySelector('.cart-list__price span');
            productSum.innerHTML = cartPrice * cartProductQuantity.innerHTML;
            summ.innerHTML = +summ.innerHTML + (+cartPrice);
        }
        productButton.classList.remove('_hold');
    } else {
        const cartProductQuantity = cartProduct.querySelector('.cart-list__quantity span');
        const cartProductPrice = cartProduct.querySelector('.cart-list__price span');//
        console.log(cartProduct);
        cartProductQuantity.innerHTML = --cartProductQuantity.innerHTML;
        cartProductPrice.innerHTML = +cartProductPrice.innerHTML - cartPrice;
        summ.innerHTML = +summ.innerHTML - cartPrice;
        if (!parseInt(cartProductQuantity.innerHTML)) {
            cartProduct.remove();
        }

        const cartQuantityValue = --cartQuantity.innerHTML;

        if (cartQuantityValue) {
            cartQuantity.innerHTML = cartQuantityValue;
        } else {
            cartQuantity.remove();
            cart.classList.remove('_active');
        }
    }
}