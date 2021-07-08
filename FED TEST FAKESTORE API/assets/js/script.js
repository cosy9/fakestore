// genral hamburger menu
var navbar = document.querySelector('.nav-list')
var ham = document.querySelector('.hambur')
// toggles hamburger menu in and out when clicking on the hamburger
function toggleHamburger() {
  navbar.classList.toggle('display')
  ham.classList.toggle('active-span')
}
ham.addEventListener('click', toggleHamburger)
// toggle when clicking on links
var menuLinks = document.querySelectorAll('.nav-list li')
menuLinks.forEach(function (menuLink) {
  menuLink.addEventListener('click', toggleHamburger)
})

//home page functionality starts here

var page_path = window.location.href;
if (page_path.includes('index.html')) { // checking if 

  var loadDiv = document.querySelector('.fetch') //load More button
  loadDiv.classList.add('not-active-list')
  var allProductList = [];

  function displayProducts() {
    //1 initialize AJAX
    var xhr = new XMLHttpRequest()
    //2 open object
    xhr.open('GET','https://fakestoreapi.com/products',true)
    //3 on load object
    xhr.onload = function () {
      if (this.status === 200) {
        var object = JSON.parse(this.responseText)
        console.log(object)
      if(object.length === 0){
        return false
      }
      allProductList = JSON.parse(JSON.stringify(object));
      console.log(allProductList); //important please comment this
      var inputHtml = document.querySelector('.all-products-data')
      inputHtml.innerHTML =''
      for (var i = 0; i < object.length; i++) {
        var category = object[i]['category']
        var title = object[i]['title']
        var description = object[i]['description']
        var image = object[i]['image']
        var id = object[i]['id']
        var price = object[i]['price']
        price = Math.floor(price)
        var html = '<li class="product not-active-list"><figure><img src='+image+' alt='+category+'></figure><h5>'+category+'</h5><h6>'+title+'</h6><p>'+description+'</p><p>Price : '+price+' $ </p><a class="product-id" href="#FIXME" data-attribute='+id+' title="Add to cart">Add to cart</a></li>'
        inputHtml.innerHTML+=html
      }
        loadDiv.classList.remove('not-active-list')
        loadMore()
      } else {
        return false
      }
    }
    //4 send request
    xhr.send()
  }

  displayProducts()

  // load more results on click of loadMore button
  function loadMore() {
        var elementList = Array.from(document.querySelectorAll('.all-products-data .product'));
          for (let i = 0; i <= 4; i++) {
              if (elementList[i]) {
                  elementList[i].classList.remove('not-active-list');
              }
          }
      var loadmore = document.querySelector('.fetchBtn');
      loadmore.classList.remove('not-active-list');
      var currentItems = 5;
      loadmore.addEventListener('click', function(e) {
          for (let i = currentItems; i <= currentItems + 4; i++) {
              if (elementList[i]) {
                  elementList[i].classList.remove('not-active-list');
              }
          }
          currentItems += 4;
          // Load more button will be hidden after list fully loaded
          if (currentItems >= elementList.length) {
              e.target.classList.add('not-active-list');
              currentItems = 5;
          }
      })
  }

  var inputData = document.querySelector("input[name='product-search']")

  inputData.addEventListener('input', showSpecificData)
  function showSpecificData(e) {
    e.preventDefault()
    var inputval = this.value.toLowerCase();
    if(inputval.length != 0){
      var loadmore = document.querySelector('.fetchBtn');
      loadmore.classList.add('not-active-list');
    }
    else{
      loadmore = document.querySelector('.fetchBtn');
      loadmore.classList.remove('not-active-list');
    }
    var listItem = document.getElementsByClassName('product');
    Array.from(listItem).forEach(function (element) {
      var listTxt = element.getElementsByTagName("h6")[0].innerText.toLowerCase();
      if(element.classList.contains('not-active-list')){
        return
      }
      if (listTxt.includes(inputval)) {
        element.classList.remove('not-active')
        element.classList.add('active')
      } else {
        element.classList.remove('active')
        element.classList.add('not-active')
      }
    })
  }

  //for slider 
    $(document).ready(function() 
      {
          $('.sliders').slick(
        {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots:true,
        autoplay:false,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                    autoplay:true,
                    prevArrow: false,
                    nextArrow: false,
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                    autoplay:true,
                    prevArrow: false,
                    nextArrow: false,
                }
            },
          ],
      }
      );
  })

}

//home page functionality ends here

//category page functionality starts here
  
function categoryProducts(categoryText) {
//1 initialize AJAX
var xhr = new XMLHttpRequest()
//2 open object
xhr.open('GET','https://fakestoreapi.com/products/category/'+categoryText+'',true)
//3 on load object
xhr.onload = function () {
  if (this.status === 200) {
    var object = JSON.parse(this.responseText)
    console.log(object)
  if(object.length === 0){
    return false
  }
  var categoryTextTrim = categoryText.replace(/'/g,'').replace(/ /g,'').trim()
  var inputHtml = document.querySelector("."+categoryTextTrim+"-products")
  inputHtml.innerHTML =''
  for (var i = 0; i < object.length; i++) {
    var category = object[i]['category']
    var title = object[i]['title']
    var description = object[i]['description']
    var image = object[i]['image']
    var id = object[i]['id']
    var price = object[i]['price']
    price = Math.floor(price)
    var html = '<li class="product"><figure><img src='+image+' alt='+category+'></figure><h5>'+category+'</h5><h6>'+title+'</h6><p>'+description+'</p><p>Price : '+price+' $ </p><a class="product-id" href="#FIXME" data-attribute='+id+' title="Add to cart">Add to cart</a></li>'
    inputHtml.innerHTML+=html
  }
  } 
  else {
    return false
  }
}
//4 send request
xhr.send()
}

var page_path_category = window.location.href;
if(page_path_category.includes('Category.html')){
  var arr = ['electronics','women\'s clothing','men\'s clothing','jewelery']
  for (var i = 0; i < arr.length; i++) {
    categoryProducts(arr[i])
  }

  $(document).ready(function() {
    // Add smooth scrolling to all links
    $("a").on("click", function(event) {
        // Make sure this.hash has a value before overriding default behavior
        if(this.getAttribute('href')=='#fixme'){
          return
        }
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();
            var hash = this.hash;
            $("html, body").animate({
                scrollTop: $(hash).offset().top,
                },
              800,
              function() {
                  // Add hash (#) to URL when done scrolling (default click behavior)
                  window.location.hash = hash;
              }
            );
        } // End if
    });
  });

  var selectSort = document.querySelector("select[name='sort-product']")

  selectSort.addEventListener('change',function(e){
  e.preventDefault()
  var seasonValue = document.querySelector("select[name='sort-product']")
  var seasonVal = seasonValue.options[seasonValue.selectedIndex].text.toLowerCase()
  if(seasonVal == 'all'){
    var productList = document.getElementsByClassName('product-list')
    Array.from(productList).forEach(function (element) {
      element.classList.remove('not-active')
    })
    return
  }
  else{
    var productList = document.getElementsByClassName('product-list')
    Array.from(productList).forEach(function (element) {
      var headFour = element.getElementsByTagName('h4')[0].innerText.toLowerCase()
      if(headFour == seasonVal){
        element.classList.remove('not-active')
        element.classList.add('active')
      }
      else{
        element.classList.add('not-active')
      }
    })
  }
  })

    //for slide to top {
  var gotoTop = document.getElementsByClassName('top')[0]
  var backTop = function() {
      window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
      })
  }
  gotoTop.addEventListener('click', backTop)
  gotoTop.addEventListener('click', function(event) {
      event.preventDefault()
  })


}

//category page functionality ends here


  function allDataOfProducts() {
    //1 initialize AJAX
    var xhr = new XMLHttpRequest()
    //2 open object
    xhr.open('GET','https://fakestoreapi.com/products',true)
    //3 on load object
    xhr.onload = function () {
      if (this.status === 200) {
        var object = JSON.parse(this.responseText)
        console.log(object)
      if(object.length === 0){
        return false
      }
      allProductList = JSON.parse(JSON.stringify(object));
      } else {
        return false
      }
    }
    //4 send request
    xhr.send()
  }

  allDataOfProducts()

  var page_path_cart = window.location.href;
  if(page_path_cart.includes('Cart.html')){
    var cartList = document.querySelector('.nav-list li:nth-child(4)')
    cartList.classList.add('not-active-list')
    function checkIfCartEmpty(){
    var para =document.querySelector('.empty')
    para.innerHTML= ''
    var productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers == '0'){
      var textToDisplay = "Your Cart is Empty"
      para.textContent= textToDisplay
    }
    else{
      para.innerHTML=''
    }
    }
    checkIfCartEmpty()
  }



setTimeout(function() {
  var addToCart = document.querySelectorAll('.product-id') //All anchors

  for (let l = 0; l < allProductList.length; l++) {
    allProductList[l]['incart'] = 0    
    allProductList[l]['price']= Math.floor(allProductList[l]['price'])
  } 
  console.log(allProductList);
  for (var j = 0; j < addToCart.length; j++) {
    addToCart[j].addEventListener('click',function(){
      // console.log('added to cart');
      var a=this.getAttribute('data-attribute')
      // console.log(a);
      for (var k = 0; k < allProductList.length; k++) {
          if(allProductList[k]['id'] ==a){
            cartNumbers(allProductList[k])
            totalCost(allProductList[k])
          }        
      } 
    })
  }
},2000);

function cartNumbers(product,action){
  // console.log(product);

  var productNumbers = localStorage.getItem('cartNumbers');
  productNumbers = parseInt(productNumbers)
  var cartItems = localStorage.getItem('productsInCart')
  cartItems = JSON.parse(cartItems)
  if(action=='decrease'){
    localStorage.setItem('cartNumbers',productNumbers -1)
      
    document.querySelector('.cart span').textContent= productNumbers-1
  }
  else if(productNumbers){
    localStorage.setItem('cartNumbers', productNumbers+1)
    document.querySelector('.cart span').textContent = productNumbers+1
  }
  else{
    localStorage.setItem('cartNumbers', 1)
    document.querySelector('.cart span').textContent = 1
  }
  setItems(product)
}

function setItems(product){
  var cartItems = localStorage.getItem('productsInCart')
  cartItems = JSON.parse(cartItems)
  //  var cartStored = JSON.parse(JSON.stringify(cartItems))
  if(cartItems != null){
    if(cartItems[product.id]== undefined){
      cartItems={
        ...cartItems,
        [product.id]:product
      }
    }
    cartItems[product.id].incart +=1
  }
  else{
  product.incart = 1
  cartItems = {
    [product.id]:product
  }
  }
  localStorage.setItem('productsInCart',JSON.stringify(cartItems));
}

function totalCost(product,action){
  // console.log('product value is',product.price);
  var cartCost = localStorage.getItem('totalCost')
  if(action=="decrease"){
    cartCost = parseInt(cartCost)
    localStorage.setItem('totalCost',cartCost - product.price)
  }
  else if(cartCost != null){
    cartCost = parseInt(cartCost)
    localStorage.setItem('totalCost',cartCost + product.price)
  }
  else{
    localStorage.setItem('totalCost',product.price)
  }
}

function onLoadCartNumber(){
  var productNumbers = localStorage.getItem('cartNumbers');
  if(productNumbers){
    document.querySelector('.cart span').textContent = productNumbers
  }
}

function displayCart(){
  var cartItems = localStorage.getItem('productsInCart')
  cartItems = JSON.parse(cartItems)
  var productContainer = document.querySelector('.products-data')
  var cartCost = localStorage.getItem('totalCost')
  if(cartItems && productContainer){
    productContainer.innerHTML =''
    Object.values(cartItems).forEach(function(val){
      // console.log(val);
      productContainer.innerHTML +='<li><figure><img src="'+val.image+'" alt="'+val.category+'"><figcaption>'+val.title+'</figcaption></figure><p>$ '+val.price+'</p><p><span class="left">left</span>'+val.incart+'<span class="right">right</span></p><p>$ '+val.price*val.incart+'</p><a class="removeBtn" href= "#fixme" data-attribute="'+val.id+'" title ="Remove">Remove</a></li>'
    })

    productContainer.innerHTML +='<li><h4>Cart Total</h4><p>$'+cartCost+'</p></li>'
  }
  deleteButtons()
  manageQuantity()
}

function deleteButtons(){
var removeBtnAll = document.getElementsByClassName('removeBtn')
var productId
var cartItems = localStorage.getItem('productsInCart')
var productNumbers = localStorage.getItem('cartNumbers')
var cartCost =localStorage.getItem('totalCost')

cartItems=JSON.parse(cartItems)
for (var i = 0; i < removeBtnAll.length; i++) {
  removeBtnAll[i].addEventListener('click',function(){
   productId = this.getAttribute('data-attribute')
  //  console.log(cartItems[productId].title);
  //  console.log(productId);
  localStorage.setItem('cartNumbers',productNumbers - cartItems[productId].incart)
  localStorage.setItem('totalCost',cartCost - (cartItems[productId].price*cartItems[productId].incart))
  delete cartItems[productId]
  localStorage.setItem('productsInCart',JSON.stringify(cartItems))

  onLoadCartNumber()
  displayCart()
  checkIfCartEmpty()
  })
}
}

function manageQuantity(){
  var decreaseButtons = document.querySelectorAll('.left')
  var increaseButtons = document.querySelectorAll('.right')
  var cartItems = localStorage.getItem('productsInCart')
  var currentQuantity=0
  var currentProductId
  cartItems= JSON.parse(cartItems)

  for (var i = 0; i < decreaseButtons.length; i++) {
    decreaseButtons[i].addEventListener('click',function(){
      currentQuantity=this.parentElement.textContent.replace(/[^0-9\.]/g, '')
      console.log(currentQuantity);
      currentProductId = this.parentElement.nextElementSibling.nextElementSibling.getAttribute('data-attribute')
      if(cartItems[currentProductId].incart>1){
        cartItems[currentProductId].incart -= 1
        cartNumbers(cartItems[currentProductId],"decrease")
        totalCost(cartItems[currentProductId],"decrease")
        localStorage.setItem('productsInCart',JSON.stringify(cartItems))
      displayCart()
      checkIfCartEmpty()
      }
      
    })    
  }

    for (var i = 0; i < increaseButtons.length; i++) {
    increaseButtons[i].addEventListener('click',function(){
      // console.log('right btn ');
      currentQuantity=this.parentElement.textContent.replace(/[^0-9\.]/g, '')
      // console.log(currentQuantity);
      currentProductId = this.parentElement.nextElementSibling.nextElementSibling.getAttribute('data-attribute')
        cartItems[currentProductId].incart += 1
        cartNumbers(cartItems[currentProductId])
        totalCost(cartItems[currentProductId])
        localStorage.setItem('productsInCart',JSON.stringify(cartItems))
      displayCart()
    })    
  }
}

onLoadCartNumber()
displayCart()


