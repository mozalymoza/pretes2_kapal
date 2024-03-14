var express = require('express');
var router = express.Router();
var connection = require('../config/database.js');
const Model_alat_tangkap = require('../model/Model_alat_tangkap.js');

router.get('/', async function (req, res, next) {
    let rows = await Model_alat_tangkap.getAll();
    res.render('alat_tangkap/index', {
        data: rows
    })
})



router.get('/create', function (req, res, next) {
    res.render('alat_tangkap/create', {
        nama_alat_tangkap: ''
    })
})


router.post('/store', async function (req, res, next) {
    try {
        let {nama_alat_tangkap} = req.body;
        let Data = {
            nama_alat_tangkap
        }
            await Model_alat_tangkap.Store(Data);
            req.flash('success', 'Berhasil menyimpan data!');
            res.redirect('/alat_tangkap');
        } catch {
        req.flash('error', 'Terjadi kesalahan pada fungsi')
        res.redirect('/alat_tangkap')
    }
})


router.get('/edit/(:id)', async function (req, res, next) {
    let id = req.params.id;
    let rows = await Model_alat_tangkap.getId(id);
            res.render('alat_tangkap/edit', {
                id: rows[0].id_alat_tangkap,
                nama_alat_tangkap: rows[0].nama_alat_tangkap,
            })
        })

router.post('/update/(:id)', async function (req, res, next) {
    try {
        let id = req.params.id;
        let { nama_alat_tangkap} = req.body;
        let Data = {
            nama_alat_tangkap
        }
        await Model_alat_tangkap.Update(id, Data);
         req.flash('success', 'Berhasil memperbaharui data baru!');
         res.redirect('/alat_tangkap');
    } catch {
        req.flash('error', 'terjadi kesalahan pada fungsi');
        res.render('/alat_tangkap');
    }
})


router.get('/delete/(:id)', async function (req, res) {
    let id = req.params.id;
    await Model_alat_tangkap.Delete(id);
        req.flash('success', 'Data terhapus!');
        res.redirect('/alat_tangkap');
    })


module.exports = router;