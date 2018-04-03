class Currency {
	setup(app, path) {
		this.app = app
		this.connection = app.get('db')
	}

	find(params) {
		return new Promise((resolve, reject) => {
			this.connection.execute('SELECT * FROM Currency', function(err, results, fields) {
				if(err) { reject(err) };

				resolve(results)
			})
		})
	}

	get(product_code) {
		return new Promise((resolve, reject) => {
			this.connection.execute('SELECT * FROM Currency WHERE Product_Code = ?', [product_code], function(err, results, fields) {
				if(err) { reject(err) };

				resolve(Object.assign({}, results[0]))
			})
		})
	}

	create(data, params) {
		return new Promise((resolve, reject) => {
			this.connection.query('INSERT INTO Currency SET ?', data, function(err, results, fields) {
				if (err) { reject(err) };
			})
		})
	}

	async update(product_code, data, params) {
		return new Promise((resolve, reject) => {
			this.connection.execute('UPDATE Currency SET Price_USD = ? WHERE Product_Code = ?', [data.Price_USD, product_code], function(err, results) {
				if(err){ reject(err) };

				resolve(results)
			})
		})
	}

	async patch(product_code, data, params) {}

	async remove(product_code, params) {
		return new Promise((resolve, reject) => {
			this.connection.execute('DELETE FROM Currency WHERE Product_Code = ?', [product_code], function(err, results) {
				if(err){ reject(err) };

				resolve({
					currency: product_code,
					success: true,
					action: 'removed'
				})
			})
		})
	}
}

module.exports = Currency;
