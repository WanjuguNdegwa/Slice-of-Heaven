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