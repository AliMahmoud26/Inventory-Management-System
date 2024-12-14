// Importing all the IDs that we're going to use
const title = document.getElementById('title');
const price = document.getElementById('price');
const taxes = document.getElementById('taxes');
const ads = document.getElementById('ads');
const discount = document.getElementById('discount');
const total = document.getElementById('total');
const count = document.getElementById('count');
const category = document.getElementById('category');
const submitBtn = document.getElementById('submit');

let mood = 'create';

// Get Total Price Of The Input Fields
function getTotal() {
  const priceInput = parseInt(price.value) || 0;
  const taxesInput = parseInt(taxes.value) || 0;
  const adsInput = parseInt(ads.value) || 0;
  const discountInput = parseInt(discount.value) || 0;
  
  if (price.value != '') {
    let result = (priceInput + taxesInput + adsInput) - (discountInput);
    total.innerHTML = result;
    total.style.background = '#040';
  } else {
    total.innerHTML = '';
    total.style.background = '#a00d02';
  }
}

// Adding EventListeners to the input fields
const inputs = document.querySelectorAll('.price input');
inputs.forEach(input => {
  input.addEventListener('keyup', getTotal);
});

getTotal();

// Create Products and Append them to the table 
if (localStorage.product != null) {
  dataProduct = JSON.parse(localStorage.product);
} else {
  dataProduct = [];
}

submitBtn.addEventListener('click', () => {
  let newProduct = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  }

  // Count The Products == Add More Than a Product at The Same Time

  if (mood === 'create') {
    if (newProduct.count > 1) {
      for (let i = 0; i < newProduct.count - 1; i++) {
        dataProduct.push(newProduct);
      }
    } else {
      dataProduct.push(newProduct);
    }
  } else {
    dataProduct[tmp] = newProduct;
    mood = 'create';
    submitBtn.innerHTML = 'Create';
    count.style.display = 'block';
  }


  // Adding the data of this object to the Array
  dataProduct.push(newProduct);
  // Save To LocalStorage
  localStorage.setItem('product', JSON.stringify(dataProduct));
  // console.log(newProduct);

  clearData();
  showData();
});

// Clear Inputs Data
function clearData() {
  title.value = '';
  price.value = '';
  taxes.value = '';
  ads.value = '';
  discount.value = '';
  total.innerHTML = '';
  count.value = '';
  category.value = '';
}

// Read The Data
function showData() {
  let table = '';
  for (let i = 0; i < dataProduct.length; i++) {
    table += `
      <tr>
        <td>${i+1}</td>
        <td>${dataProduct[i].title}</td>
        <td>${dataProduct[i].price}</td>
        <td>${dataProduct[i].taxes}</td>
        <td>${dataProduct[i].ads}</td>
        <td>${dataProduct[i].discount}</td>
        <td>${dataProduct[i].total}</td>
        <td>${dataProduct[i].category}</td>
        <td><button onclick='updateData(${i})' id='update'>update</button></td>
        <td><button onclick=deleteData(${i}) id='delete'>delete</button></td>
      </tr>
    `;
  }

  document.getElementById('tbody').innerHTML = table;

  // Delete All Products
  let btnDelete = document.getElementById('deleteAll');

  if (dataProduct.length > 0) {
    btnDelete.innerHTML = `<button onclick=deleteAll()>Delete All(${dataProduct.length})</button>`
  } else {
    btnDelete.innerHTML = '';
  }

  getTotal();
}
showData();

// Delete Single Item
function deleteData(i) {
  dataProduct.splice(i, 1)
  localStorage.product = JSON.stringify(dataProduct);
  showData();
}

// Delete All Products
function deleteAll() {
  localStorage.clear();
  dataProduct.splice(0);
  showData();
}

// Update The Products' Data
function updateData(i) {
  title.value = dataProduct[i].title;
  price.value = dataProduct[i].price;
  taxes.value = dataProduct[i].taxes;
  ads.value = dataProduct[i].ads;
  discount.value = dataProduct[i].discount;
  count.value = dataProduct[i].count;
  category.value = dataProduct[i].category;
  count.style.display = 'none';
  submitBtn.innerHTML = 'Update';
  mood = 'update';
  tmp = i;
  getTotal();
  scroll({
    top: 0,
    behavior: 'smooth',
  })
}

// Custom Search
let searchMood = 'title';

function getSearchMood(id) {
  let search = document.getElementById('search');
  
  if (this.id == 'searchTitle') {
    searchMood = 'title';
    search.placeholder = 'Search By Title';
  } else {
    searchMood = 'category';
    search.placeholder = 'Search By Category';
  }
  search.focus();
  search.value = '';
  showData();
}

// Adding EventListeners to the search buttons
let btnSearch = document.querySelectorAll('.btnSearch button');

btnSearch.forEach(button => {
  button.addEventListener('click', getSearchMood)
});


// Function Search Data
function searchData(value) {
  let table = '';
  if (searchMood == 'title') {
    for (let i = 0; i < dataProduct.length; i++) {
      if (dataProduct[i].title.includes(value.toLowerCase())) {
        table += `
          <tr>
            <td>${i}</td>
            <td>${dataProduct[i].title}</td>
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].taxes}</td>
            <td>${dataProduct[i].ads}</td>
            <td>${dataProduct[i].discount}</td>
            <td>${dataProduct[i].total}</td>
            <td>${dataProduct[i].category}</td>
            <td><button onclick='updateData(${i})' id='update'>update</button></td>
            <td><button onclick=deleteData(${i}) id='delete'>delete</button></td>
          </tr>
        `;
      }
    }
  } else {
    for (let i = 0; i < dataProduct.length; i++) {
      if (dataProduct[i].category.includes(value.toLowerCase())) {
        table += `
          <tr>
            <td>${i}</td>
            <td>${dataProduct[i].title}</td>
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].taxes}</td>
            <td>${dataProduct[i].ads}</td>
            <td>${dataProduct[i].discount}</td>
            <td>${dataProduct[i].total}</td>
            <td>${dataProduct[i].category}</td>
            <td><button onclick='updateData(${i})' id='update'>update</button></td>
            <td><button onclick=deleteData(${i}) id='delete'>delete</button></td>
          </tr>
        `;
      }
    }
  }
  document.getElementById('tbody').innerHTML = table;
} 