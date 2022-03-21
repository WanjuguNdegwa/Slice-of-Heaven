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
    } else {
      $('#location').hide();
      isDelivery = false;
    }
  });
});