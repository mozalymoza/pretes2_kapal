const connection = require("../config/database");

class Model_pemilik {



    static async getAll() {
        return new Promise((resolve, reject) => {
            connection.query("select * from pemilik order by id_pemilik desc", (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static async Store(Data) {
        return new Promise((resolve, reject) => {
            connection.query("insert into pemilik set ?", Data, function (err, result) {
                if (err) {
                    reject(err);
                    console.log(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static async getId(id) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM pemilik where id_pemilik = ' + id, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static async Update(id, Data) {
         return new Promise((resolve, reject) => {
            connection.query('update pemilik set ? where id_pemilik =' + id, Data, function (err, result) {
                if (err) {
                    reject(err);
                    console.log(err);
                } else {
                    resolve(result);
                }
             })
        });
    }

    static async Delete(id) {
        return new Promise((resolve, reject) => {
           connection.query('delete from pemilik where id_pemilik =' + id, function (err, result) {
               if (err) {
                   reject(err);
               } else {
                   resolve(result);
               }
            })
       });
   }

}

module.exports = Model_pemilik;