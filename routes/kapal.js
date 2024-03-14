var express = require('express');
var router = express.Router();
var connection = require('../config/database.js');
const Model_kapal = require('../model/Model_kapal.js');
const Model_pemilik = require('../model/Model_pemilik.js');
const Model_dpi = require('../model/Model_dpi.js');
const Model_alat_tangkap = require('../model/Model_alat_tangkap.js');

router.get('/', async function (req, res, next) {
    let rows = await Model_kapal.getAll();
    res.render('kapal/index', {
        data: rows
    });
});

router.get('/create', async function (req, res, next) {
    let  = await Model_pemilik.getAll();
    let  = await Model_dpi.getAll();
    let  = await Model_alat_tangkap.getAll();
    res.render('kapal/create', {
        nama_kapal: '',
        id_pemilik: '',
        id_dpi: '',
        id_alat_tangkap: '',
        data_pemilik: rows,
        data_dpi: rows1,
        data_alat_tangkap: rows2,
    })
})

router.post('/store', async function (req, res, next) {
    try {
        let { nama_kapal, id_pemilik, id_dpi , id_alat_tangkap} = req.body;
        let Data = {
            nama_kapal,
            tingkat_kapal,
            id_pemilik,
            id_dpi,
            id_alat_tangkap
        }
        await Model_kapal.Store(Data);
        req.flash('success', 'Berhasil menyimpan data');
        res.redirect('/kapal');
    } catch {
        req.flash('error', 'Terjadi kesalahan pada fungsi')
        res.redirect('/kapal')
    }
})

router.get('/edit/(:id)', async function (req, res, next) {
    let id = req.params.id;
    let mhs = await Model_mahasiswa.getAll();
    let rows = await Model_kapal.getId(id);
    res.render('kapal/edit', {
        id: rows[0].id_kapal,
        nama_kapal: rows[0].nama_kapal,
        tingkat_kapal: rows[0].tingkat_kapal,
        id_mahasiswa: rows[0].id_mahasiswa,
        data: mhs,
    })
})



router.post('/update/(:id)', async function (req, res, next) {
    try {
        let id = req.params.id;
        let { nama_kapal, tingkat_kapal, id_mahasiswa } = req.body;
        let Data = {
            nama_kapal: nama_kapal,
            tingkat_kapal: tingkat_kapal,
            id_mahasiswa: id_mahasiswa,
        }
        await Model_kapal.Update(id, Data);
        req.flash('success', 'Berhasil mengubah data');
        res.redirect('/kapal')
    } catch {
        req.flash('error', 'terjadi kesalahan pada fungsi');
        res.render('/kapal');
    }
})

router.get('/delete/(:id)', async function (req, res) {
    let id = req.params.id;
    await Model_kapal.Delete(id);
    req.flash('success', 'Berhasil menghapus data');
    res.redirect('/kapal')
})

module.exports = router;