class Product {
	setup(app, path) {
		this.app = app
		this.connection = app.get('db')
	}

	async find(params) {
		return new Promise((resolve, reject) => {
			this.connection.execute('SELECT * FROM Product', function(err, results, fields) {
				if(err) { reject(err) };

				resolve(results)
			})
		})
	}

	async get(Ticker) {
		return new Promise((resolve, reject) => {
			this.connection.execute('SELECT * FROM Product WHERE Ticker = ?', [Ticker], function(err, results, fields) {
				if(err) { reject(err) };

				resolve(Object.assign({}, results[0]))
			})
		})
	}

	// Ticker, Name, Description
	async create(data, params) {
		return new Promise((resolve, reject) => {
			this.connection.query('INSERT INTO Product SET ?', data, function(err, results, feilds) {
				if (err) { reject(err) };

				resolve({
					ticker: data.Ticker,
					name: data.Name,
					success: true,
					action: 'created'
				})
			})
		})
	}

	async update(data, params) {
		return new Promise((resolve, reject) => {
			this.connection.execute('UPDATE Product SET Name = ?, Description = ? WHERE Ticker = ?', [data.Name, data.Description, data.Ticker], function(err, results) {
				if(err){ reject(err) };

				resolve({
					name: data.Name,
					description: data.Description,
					success: true,
					action: 'updated'
				})
			})
		})
	}

	async patch(Ticker, data, params) {}

	async remove(Ticker, params) {
		return new Promise((resolve, reject) => {
			this.connection.execute('DELETE FROM Product WHERE Ticker = ?', [Ticker], function(err, results) {
				if(err){ reject(err) };

				resolve({
					ticker: Ticker,
					success: true,
					action: 'removed'
				})
			})
		})
	}
}

module.exports = Product
