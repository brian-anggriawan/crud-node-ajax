let urlusers = 'http://localhost:3000/users'
let urllogin = 'http://localhost:3000/login'
let urllogout = 'http://localhost:3000/logout'
let urlindex = 'http://localhost:3000'

/*let urlusers = 'http://localhost/node/users'
let urllogin = 'http://localhost/node/login'
let urlindex = 'http://localhost/node'*/



$(document).ready( function () {
    
    $('#table').DataTable({
        //"order": [[ 0,'asc']],
        //"lengthMenu": [100, 250],
        //"pageLength": 100
        "ordering": false
    });

    $('#table').excelTableFilter();
} );

function generateid(prefix ,idcolumn) {
    var time = new Date();
    var id = prefix+time.getFullYear()+(time.getMonth()+1)+time.getDate()+time.getHours()+time.getMinutes()+time.getSeconds()+time.getMilliseconds();
    $(idcolumn).val(id);
}


function showalert(flag , msg ,url) {
    if (flag == 'alertsc') {
       swal({
            title: "Berhasil",
            text: msg,
            type: "success"
        }).then(function() {
            window.location.assign(url);
        }); 
    }else if (flag == 'alerter') {
        swal({
            title: "Error",
            text: msg,
            type: "error"
        }).then(function() {
            window.location.assign(url);
        }); 
    } 
       
    
}

function editdata(id) {
    $('#entrydlg').modal('show');
    $('#txentrydlg').text('Edit Data');

    $.ajax({
        url: urlusers+'/'+id,
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            var res = response.values;

            $('#tx_id').val(res.VCIDMAHASISWA);
            $('#vcnama').val(res.VCUSERNAME);
            $('#vcalamat').val(res.VCALAMAT);

        },
        error: function() {
            showalert('alerter','Terjadi Kesalahan')
        }
    }); 
}

function savedata() {
    var id = $('#tx_id').val();
    var nama = $('#vcnama').val();
    var alamat = $('#vcalamat').val();
    var input = { vcidmahasiswa:id ,vcusername:nama ,vcalamat:alamat};
    
    
    $.ajax({
        url: urlusers+'/'+id,
        type: 'GET',
        dataType: 'json',
        success: function(res){
        cek = res.values;

            if ( cek == 'kosong') {
                $.ajax({
                    url: urlusers,
                    type: 'POST',
                    data: input,
                    dataType: 'json',
                    success: function (response) {
                        showalert('alertsc','Menyimpan Data',urlusers)
                    },
                    error: function() {
                        showalert('alerter','Terjadi Kesalahan',urlusers)
                    }
                });  
            }else{
                $.ajax({
                    url: urlusers,
                    type: 'PUT',
                    data: input,
                    dataType: 'json',
                    success: function (response) {
                        showalert('alertsc','Update Data',urlusers)
                    },
                    error: function() {
                        showalert('alerter','Terjadi Kesalahan',urlusers)
                    }
                });  
            }
        },
        error: function () {
            alert('Terjasi Kesalahan');
        } 

        });

    
}

function tambahdata() {
    $('#formentry')[0].reset();
    $('#entrydlg').modal('show'); 
    $('#txentrydlg').text('Tambah Data'); 
    generateid('MHS','#tx_id');

}

function deletedata(id) {
    var input = {vcid:id};

    Swal({
        title: 'Apakah Anda Yakin?',
        text: "Menghapus Data ini",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya , Hapus'
      }).then((result) => {
        if (result.value) {
            $.ajax({
                url: urlusers,
                type: 'DELETE',
                data: input,
                dataType: 'JSON',
                success: function(response){
                    showalert('alertsc','Menghapus Data',urlusers)
                },
                error: function() {
                    showalert('alerter','Terjadi Kesalahan'),urlusers
                }
            });
        }
      })
}

function loginuser() {
    var user = $('#usr_login').val(),
        password = $('#pwd_login').val();
        $('#frm_login')[0].reset();
        

    $.ajax({
        url: urllogin+'/'+user+'/'+password,
        type: 'GET',
        dataType: 'JSON',
        success: function (response) {
            var cek = response.values.length;
            if (cek < 1) {
             showalert('alerter','User Dan Password Salah',urllogin);
            }
            else {
             showalert('alertsc','Login',urlindex);
            }
        },
        error: function () {
            showalert('alerter','Terjadi Kesalahan',urllogin);
        }
    });

}

function logout() {
    
    Swal({
        title: 'Apakah Anda Yakin?',
        text: "Logout",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya'
      }).then((result) => {
        if (result.value) {
            $.ajax({
                url: urllogout,
                type: 'GET',
                success: function (response) {
                    showalert('alertsc','Logout',urlindex)
                }
            });
    }      
    })
}