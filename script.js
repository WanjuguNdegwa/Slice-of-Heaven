class Pizza {
	constructor(flavor, quantity, size, crust, toppings) {
		this.flavor = flavor;
		this.quantity = parseInt(quantity);
		this.size = size;
		this.crust = crust;
		this.toppings = toppings;
	}

	get cost() {
		let sum = 0;
		sum += pricing[this.flavor][this.size];
		sum += pricing[this.crust];

		this.toppings.forEach((topping) => {
			sum += pricing[topping];
		});

		return sum * this.quantity;
	}
}

const pricing = {
  hawaiian: {
    small: 700,
    medium: 850,
    large: 1000,
  },
  "chicken tikka": {
    small: 800,
    medium: 1000,
    large: 1200,
  },
  "bbq steak": {
    small: 800,
    medium: 1000,
    large: 1200,
  },
  thin: 0,
  thick: 100,
  stuffed: 200,
  bacon: 50,
  mushrooms: 50,
  onions: 50,
};

$(document).ready(function () {
	const pizzas = [];
  let isDelivery;
	let address;

	$('form').submit(function (event) {
    event.preventDefault();
    const flavor = $('select[name="flavor"]').val();
    const quantity = $('input[name="quantity"]').val();
    const crust = $('input[name="crust"]:checked').val();
    const size = $('input[name="size"]:checked').val();
    const toppings = [];

    $('input[name="toppings"]:checked').each(function () {
      toppings.push(this.value);
    });

    const pizza = new Pizza(flavor, quantity, size, crust, toppings);
    pizzas.push(pizza);

    const order = `
    <tr>
      <td>${pizza.flavor} </td>
      <td>${pizza.size} </td>
      <td>${pizza.crust} </td>
      <td>${pizza.toppings.join('<br>')}</td>
      <td>${pizza.cost}</td>
    </tr>
    `

    $('tbody').prepend(order);
    const subtotal = pizzas.reduce((previous, current) => {
      return previous + current.cost
    }, 0);

    $('#subtotal').text(subtotal);
  });

	$('button#checkout').click(function () {
    if (pizzas.length === 0) {
      alert('Please order at least one pizza');
    } else {
      $('#delivery-options').show();
    }
  });

	$('input[name=delivery-option]').on('change', function () {
    if(this.value === 'delivery') {
      $('#location').show();
      isDelivery = true;
			$('button#make-order').prop('disabled', true);
    } else {
      $('#location').hide();
      isDelivery = false;
			$('button#make-order').prop('disabled', false);
    }
  });

	$('button#add-location').click(function () {
		address =	$('input[name="location"').val();
		if (address.length === 0) {
			alert('Please add an address');
		} else {
			$('button#make-order').prop('disabled', false);
		}
	})

	$('button#make-order').click(function() {
		let sum = 0;
    pizzas.forEach(function (pizza) {
      let toppings = pizza.toppings.map(function (topping) {
        return `
        <div class="order text-muted">
          <span class="d-inline ms-3">${topping}</span>
          <span class="d-inline text-end">${pricing[topping]}</span>
        </div>
        `
      }).join(' ');

      $('#order-summary').prepend(`
      <div class="pizza-order">
        <div class="order">
          <span class="d-inline"><strong>${pizza.size} ${pizza.flavor} x${pizza.quantity}</strong></span>
          <span class="d-inline text-end">${pricing[pizza.flavor][pizza.size]}</span>
        </div>
        <div class="order text-muted">
          <span class="d-inline ms-3">${pizza.crust} Crust</span>
          <span class="d-inline text-end">${pricing[pizza.crust]}</span>
        </div>
        ${toppings}
      </div>
      `);

      sum += pizza.cost;
    });

    if (isDelivery) {
      $('#order-summary').append(`
      <div class="order text-muted">
        <span class="d-inline">Delivery Fee</span><span class="d-inline text-end">200</span>
      </div>
      `);
      sum += 200;
			
			if (address) {
				$('#address').text(address);
			} else {
				$('#address').text('Pickup');
			}
    }


    $('#total').text(sum);
    $('#order-summary').show();
	})
});