class Cryptocurrency {
	setup(app, path) {
		this.app = app
		this.connection = app.get('db')
	}

	find(params) {
		return new Promise((resolve, reject) => {
			this.connection.execute('SELECT * FROM Cryptocurrency', function(err, results, fields) {
				if(err) { reject(err) };

				resolve(results)
			})
		})
	}

	get(product_code) {
		return new Promise((resolve, reject) => {
			this.connection.execute('SELECT * FROM Cryptocurrency WHERE Product_Code = ?', [product_code], function(err, results, fields) {
				if(err) { reject(err) };

				resolve(Object.assign({}, results[0]))
			})
		})
	}

	create(data, params) {
		return new Promise((resolve, reject) => {
			this.connection.query('INSERT INTO Cryptocurrency SET ?', data, function(err, results, fields) {
				if (err) { reject(err) };
			})
		})
	}

	async update(product_code, data, params) {
		return new Promise((resolve, reject) => {
			this.connection.execute('UPDATE Cryptocurrency SET Circulating_Supply = ?, Total_Supply = ?, Market_Cap = ? WHERE Product_Code = ?', [data.Circulating_Supply, data.Total_Supply, data.Market_Cap, product_code], function(err, results) {
				if(err){ reject(err) };

				resolve(results)
			})
		})
	}

	async patch(product_code, data, params) {}

	async remove(product_code, params) {
		return new Promise((resolve, reject) => {
			this.connection.execute('DELETE FROM Cryptocurrency WHERE Product_Code = ?', [product_code], function(err, results) {
				if(err){ reject(err) };

				resolve({
					cryptocurrency: product_code,
					success: true,
					action: 'removed'
				})
			})
		})
	}
}

module.exports = Cryptocurrency
