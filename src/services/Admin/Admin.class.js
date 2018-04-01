class Admin {
	setup(app, path) {
		this.app = app
		this.connection = app.get('db')
    this.id = 'Username'
	}

	find(params) {
		const query = params.query
		return new Promise((resolve, reject) => {
			this.connection.execute('SELECT * FROM Admin WHERE Username = ?', [query.Username], function(err, results, fields) {
				if(err) { reject(err) };

				resolve(results)
			})
		})
	}

	get(username) {
		return new Promise((resolve, reject) => {
			this.connection.execute('SELECT * FROM Admin WHERE Username = ?', [username], function(err, results, fields) {
				if(err) { reject(err) };

				resolve(Object.assign({}, results[0]))
			})
		})
	}

	create(data, params) {
		return new Promise((resolve, reject) => {
			this.connection.query('INSERT INTO Admin SET ?', data, function(err, results, fields) {
				if (err) { reject(err) };
			})
		})
	}

	async update(username, data, params) {
		return new Promise((resolve, reject) => {
			this.connection.execute('UPDATE Admin SET Powers = ?, Focus_Area = ? WHERE Username = ?', [data.Powers, data.Focus_Area, username], function(err, results) {
				if(err){ reject(err) };

				resolve(results)
			})
		})
	}

	async patch(username, data, params) {}

	async remove(username, params) {
		return new Promise((resolve, reject) => {
			this.connection.execute('DELETE FROM Admin WHERE Username = ?', [username], function(err, results) {
				if(err){ reject(err) };

				resolve({
					username: username,
					success: true,
					action: 'removed'
				})
			})
		})
	}
}

module.exports = Admin;
