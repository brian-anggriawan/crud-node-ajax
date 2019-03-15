'use strict';

let response = require('../res'),
    login = require('../model/mdl_login'),
    mhs = require('../model/mdl_mhs'),
    request = require('request'),
    os = require('os'),
    namauser = 'data',
    pcuser = os.hostname(),
    networkInterfaces = os.networkInterfaces(),
    ipuser = networkInterfaces.Ethernet[1].address,
    DateNode = new Date(),
    TanggalEntry = (DateNode.getFullYear()+'-'+(DateNode.getMonth()+1)+'-'+DateNode.getDate());


  
exports.index = function (req, res) {

    if (req.session.user) {
        res.render('index',{
            data: namauser
        });   
    }
    else{
        res.render('login');
    }
       
}

exports.ceklogin = function (req , res) {
    var user = req.params.user,
        password = req.params.password;
    
        req.session.user = user;
        req.session.password = password;

    login.findOne({
       where: {
           vcusername: user,
           vcpassword: password
       } 
    }).then(hasil =>{
        if (hasil) {
            response.ok(hasil,res);
            namauser = user;
        } else{
            response.ok('data tidak ada',res)
        }    
    })
}

exports.formlogin = function (req , res) {
    res.render('login');
}

exports.Logout = function (req, res) {
    req.session.destroy(function(err) {
        if (err) {
            console.log(err)
        }
        else{
            response.ok('Berhasil Log out',res)
        }
    })
}

exports.users = function(req , res) { 
   request({url: 'http://dev.farizdotid.com/api/daerahindonesia/provinsi',json:true},function (err , res , json) {
    });

    mhs.findAll({
    }).then( hasil =>{
        if (hasil) {
            res.render('./setup/stp_user',{
                data : hasil
            });
        }
    });

    
}

exports.FindUser = function(req , res){
   
    var iduser = req.params.iduser;

    mhs.findOne({
        where:{
            VCIDMAHASISWA: iduser
        }
    }).then(hasil =>{
        if (hasil) {
            response.ok(hasil,res)
        }else{
            response.ok('kosong',res)
        }
    });
    
};

exports.DeleteUser = function(req , res){
    var id = req.body.vcid;

    mhs.destroy({
        where: {
            VCIDMAHASISWA: id
        }
    }).then(() =>{
            response.ok('Berhasil Menghapus' , res)
    })
};

exports.UpdateUser = function (req , res) {
    var id = req.body.vcidmahasiswa,
        nama = req.body.vcusername,
        alamat = req.body.vcalamat;

    
    mhs.update({
        VCUSERNAME : nama,
        VCALAMAT : alamat,
        VCUPDATEBY: namauser,
        VCIPUPDATE: ipuser,
        DTUPDATEBY: TanggalEntry,
        VCPCNAMEUPDATE: pcuser
    },{
        where:{
            VCIDMAHASISWA: id
        }
    }).then(() =>{
        response.ok('Data Berhasil Di Update' , res)
        console.log(TanggalEntry);
    });
};


exports.SaveUser = function (req , res) {
    var id = req.body.vcidmahasiswa,
        nama = req.body.vcusername,
        alamat = req.body.vcalamat;

    mhs.create({
        VCIDMAHASISWA: id,
        VCUSERNAME : nama,
        VCALAMAT : alamat,
        VCENTRYBY: namauser,
        VCIPENTRY: ipuser,
        DTENTRYBY: TanggalEntry,
        VCPCNAMEENTRY: pcuser
    }).then(() =>{
        response.ok('Data Berhasil Disimpan',res)
    });

};
