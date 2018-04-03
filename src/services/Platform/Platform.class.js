class Platform {
	setup(app, path) {
		this.app = app
		this.connection = app.get('db')
	}

	find(params) {
		return new Promise((resolve, reject) => {
			this.connection.execute('SELECT * FROM Platform', function(err, results, fields) {
				if(err) { reject(err) };

				resolve(results)
			})
		})
	}

	get(id) {
		return new Promise((resolve, reject) => {
			this.connection.execute('SELECT * FROM Platform WHERE Exchange_ID = ?', [id], function(err, results, fields) {
				if(err) { reject(err) };

				resolve(Object.assign({}, results[0]))
			})
		})
	}

	create(data, params) {
		return new Promise((resolve, reject) => {
			this.connection.query('INSERT INTO Platform SET ?', data, function(err, results, fields) {
				if (err) { reject(err) };
			})
		})
	}

	async update(id, data, params) {
		return new Promise((resolve, reject) => {
			this.connection.execute('UPDATE Platform SET URL = ? WHERE Exchange_ID = ?', [data.url, id], function(err, results) {
				if(err){ reject(err) };

				resolve(results)
			})
		})
	}

	async patch(id, data, params) {}

	async remove(id, params) {
		return new Promise((resolve, reject) => {
			this.connection.execute('DELETE FROM Platform WHERE Exchange_ID = ?', [id], function(err, results) {
				if(err){ reject(err) };

				resolve({
					platform: id,
					success: true,
					action: 'removed'
				})
			})
		})
	}
}

module.exports = Platform
