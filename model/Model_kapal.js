const connection = require('../config/database');

class Model_kapal {

    static async getAll(){
        return new Promise((resolve, reject) => {
            connection.query(`SELECT a.*, b.nama_pemilik, c.nama_dpi, d.nama_alat_tangkap
            FROM kapal as a
            JOIN pemilik as b ON b.id_pemilik = a.id_pemilik
            JOIN dpi as c ON c.id_dpi = a.id_dpi
            JOIN alat_tangkap as d ON d.id_alat_tangkap = a.id_alat_tangkap`, (err, rows) => {
                if(err){
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static async Store(Data){
        return new Promise((resolve, reject) => {
            connection.query('insert into kapal set ?', Data, function(err, result){
                if(err){
                    reject(err);
                    console.log(err);
                } else {
                    resolve(result);
                }
            })
        });
    }

    static async getId(id){
        return new Promise((resolve, reject) => {
            connection.query('select * from kapal where id_kapal = ' + id, (err,rows) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            })
        })
    }

    static async Update(id, Data) {
        return new Promise((resolve, reject) => {
            connection.query('update kapal set ? where id_kapal =' + id, Data, function(err, result){
                if(err){
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        });
    }

    static async Delete(id) {
        return new Promise((resolve, reject) => {
            connection.query('delete from kapal where id_kapal =' + id, function(err,result){
                if(err) {
                    reject(err);
                    console.log(err);
                } else {
                    resolve(result);
                }
            })
        });
    }

}


module.exports = Model_kapal;