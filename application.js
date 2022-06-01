let sum = function (acc, x) { return acc + x };

// calculate prices and total
let updatedTotalPrice = function () {
  let priceArray = []
  $('tbody .item').each(function (i, ele) {
    let individualPrice = parseFloat($(ele).find('.price').text());
    let quantity = parseFloat($(ele).find('.quantity input').val());

    let price = individualPrice * quantity;
    $(ele).find('.total').html(price.toFixed(2));
    priceArray.push(price || 0);

  })
  let updatedTotal = priceArray.length > 0 ? priceArray.reduce(sum) : 0
  $('#total').html(updatedTotal.toFixed(2))
}

// remove existing item
let removeItem = function () {
  $(this).closest('tr').remove();
  updatedTotalPrice();
}

// delay on quantity updates
let updateQuantity = function () {
  clearTimeout(delay);
  var delay = setTimeout(function () {
    updatedTotalPrice();
  }, 1000)
}

// add new item
let addItem = function () {
  let newItem = $('#product').val();
  let newPrice = $('#price').val();
  if (newItem !== (typeof String) || isNaN(newPrice)) {
    alert('Please ensure your item and price are valid.');
  } else {
    $('#addItem').before('<tr class="item"><td class="name">' + newItem + '</td><td class="price">' + newPrice + '</td><td class="quantity"><input type="number" min="0" value="1"></td><td class="total"></td><td><button class="btn btn-light btn-sm remove">Remove</button></td></tr>')
    $('tr').find('#product, #price').val('');
  }
  updatedTotalPrice()
}

// event handlers
$(document).ready(function () {
  updatedTotalPrice()
  $(document).on('input', 'tr input', updateQuantity)
  $(document).on('click', '.remove', removeItem)
  $(document).on('click', '.add', addItem)
})
