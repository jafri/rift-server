class User {
  setup(app, path) {
    this.app = app;
    this.connection = app.get('db')
    this.id = 'Username'
  }

  find(params) {
		const query = params.query
		return new Promise((resolve, reject) => {
			this.connection.execute('SELECT * FROM User WHERE Username = ?', [query.Username], function(err, results, fields) {
				if(err) { reject(err) };

				resolve(results)
			})
		})
	}

  get(username) {
    return new Promise((resolve, reject) => {
      this.connection.execute('SELECT * FROM User WHERE Username = ?', [username], function(err, results, fields) {
        if(err){
          reject(err)
        }

        resolve(Object.assign({}, results[0]))
      })
    })
  }

  create(data, params) {
    return new Promise((resolve, reject) => {
      this.connection.query('INSERT INTO User SET ?', data, function(err, results, fields) {
        console.log(err)
        console.log(results)
        console.log(fields)
        if (err) { reject(err) };
      })
    })
  }

  async update(username, data, params) {
    return new Promise((resolve, reject) => {
      this.connection.execute('UPDATE User SET Email = ?, Main_Currency = ? WHERE Username = ?', [data.Email, data.Main_Currency, username], function(err, results) {
        if(err){
          reject(err)
        }

        resolve(results)
      })
    })
  }

  async patch(username, data, params) {}

  async remove(username, params) {
    return new Promise((resolve, reject) => {
      this.connection.execute('DELETE FROM User WHERE Username = ?', [username], function(err, results) {
        if(err){
          reject(err)
        }

        resolve({
          username: username,
          success: true,
          action: 'removed'
        })
      })
    })
  }
}

module.exports = User;
