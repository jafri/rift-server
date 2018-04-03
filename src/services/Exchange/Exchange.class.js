class Exchange {
	setup(app, path) {
		this.app = app
		this.connection = app.get('db')
	}

	find(params) {
		return new Promise((resolve, reject) => {
			this.connection.execute('SELECT * FROM Exchange', function(err, results, fields) {
				if(err) { reject(err) };

				resolve(results)
			})
		})
	}

	get(id) {
		return new Promise((resolve, reject) => {
			this.connection.execute('SELECT * FROM Exchange WHERE Exchange_ID = ?', [id], function(err, results, fields) {
				if(err) { reject(err) };

				resolve(Object.assign({}, results[0]))
			})
		})
	}

	create(data, params) {
		return new Promise((resolve, reject) => {
			this.connection.query('INSERT INTO Exchange SET ?', data, function(err, results, fields) {
				if (err) { reject(err) };
			})
		})
	}

	async update(id, data, params) {
		return new Promise((resolve, reject) => {
			this.connection.execute('UPDATE Exchange SET Name = ?, Fee = ? WHERE Exchange_ID = ?', [data.Name, data.Fee, id], function(err, results) {
				if(err){ reject(err) };

				resolve(results)
			})
		})
	}

	async patch(id, data, params) {}

	async remove(id, params) {
		return new Promise((resolve, reject) => {
			this.connection.execute('DELETE FROM Exchange WHERE Exchange_ID = ?', [id], function(err, results) {
				if(err){ reject(err) };

				resolve({
					exchange_id: id,
					success: true,
					action: 'removed'
				})
			})
		})
	}
}

module.exports = Exchange
