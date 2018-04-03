class Fiat {
	setup(app, path) {
		this.app = app
		this.connection = app.get('db')
	}

	find(params) {
		return new Promise((resolve, reject) => {
			this.connection.execute('SELECT * FROM Fiat', function(err, results, fields) {
				if(err) { reject(err) };

				resolve(results)
			})
		})
	}

	get(product_code) {
		return new Promise((resolve, reject) => {
			this.connection.execute('SELECT * FROM Fiat WHERE Product_Code = ?', [product_code], function(err, results, fields) {
				if(err) { reject(err) };

				resolve(Object.assign({}, results[0]))
			})
		})
	}

	create(data, params) {
		return new Promise((resolve, reject) => {
			this.connection.query('INSERT INTO Fiat SET ?', data, function(err, results, fields) {
				if (err) { reject(err) };
			})
		})
	}

	async update(product_code, data, params) {
		return new Promise((resolve, reject) => {
			this.connection.execute('UPDATE Fiat SET Country = ? WHERE Product_Code = ?', [data.Country, product_code], function(err, results) {
				if(err){ reject(err) };

				resolve(results)
			})
		})
	}

	async patch(product_code, data, params) {}

	async remove(product_code, params) {
		return new Promise((resolve, reject) => {
			this.connection.execute('DELETE FROM Fiat WHERE Product_Code = ?', [product_code], function(err, results) {
				if(err){ reject(err) };

				resolve({
					fiat: product_code,
					success: true,
					action: 'removed'
				})
			})
		})
	}
}

module.exports = Fiat
