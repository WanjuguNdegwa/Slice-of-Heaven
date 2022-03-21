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