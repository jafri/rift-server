class Owns {
	setup(app, path) {
		this.app = app
		this.connection = app.get('db')
	}

	async find(params) {
		return new Promise((resolve, reject) => {
			this.connection.execute('SELECT Ticker, Amount FROM Owns WHERE Username = ?', [params.user.Username], function(err, results, fields) {
				if(err) { reject(err) };

				resolve(Object.assign({}, results[0]))
			})
		})
	}

	// Basic get operator
	async get(Ticker, params) {
		return new Promise((resolve, reject) => {
			this.connection.execute('SELECT * FROM Owns WHERE Username = ?, Ticker = ?', [params.user.Username, Ticker], function(err, results, fields) {
				if(err) { reject(err) };

				resolve(Object.assign({}, results[0]))
			})
		})
	}

	// Username, Ticker, Amount
	async create(data, params) {
		return new Promise((resolve, reject) => {
			this.connection.query('INSERT INTO Owns SET ?', data, function(err, results, fields) {
				if (err) { reject(err) };
			})
		})
	}

	async patch(data, params) {}

	async remove(Ticker, params) {
		return new Promise((resolve, reject) => {
			this.connection.execute('DELETE FROM Owns WHERE Username = ?, Ticker = ?', [params.user.Username, Ticker], function(err, results) {
				if(err){ reject(err) };

				resolve({
					user: params.user.Username,
					product: Ticker,
					success: true,
					action: 'removed'
				})
			})
		})
	}
}

module.exports = Owns
