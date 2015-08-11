function createTable() {
    var db = openDatabase('db_nestpockets', '1.0', 'storage infomation', 2 * 1024 * 1024);
    db.transaction(function (tx) {
        tx.executeSql("CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY, username TEXT UNIQUE, password TEXT, userType TEXT)", [], onSuccessExecuteSql
            , onError);
        tx.executeSql("CREATE TABLE IF NOT EXISTS department (id INTEGER PRIMARY KEY, dept_name TEXT , user TEXT , size TEXT)", [], onSuccessExecuteSql,
                onError);
        tx.executeSql("CREATE TABLE IF NOT EXISTS admin_corporate (id INTEGER PRIMARY KEY, fname TEXT , lname TEXT , username TEXT , password TEXT , email TEXT , phone TEXT)", [], onSuccessExecuteSql,
                onError);
        tx.executeSql("CREATE TABLE IF NOT EXISTS admin_department (id INTEGER PRIMARY KEY, fname TEXT , lname TEXT , email TEXT , phone TEXT)", [], onSuccessExecuteSql,
                onError);
        tx.executeSql("CREATE TABLE IF NOT EXISTS corporate (id INTEGER PRIMARY KEY, name TEXT, address TEXT, phone TEXT, email TEXT, size TEXT , user TEXT)", [], onSuccessExecuteSql,
            onError);
        tx.executeSql("CREATE TABLE IF NOT EXISTS department_user (id INTEGER PRIMARY KEY, fname TEXT , lname TEXT , email TEXT , phone TEXT)", [], onSuccessExecuteSql,
                onError);
        tx.executeSql('SELECT *FROM department', [], function (tx, result) {
            if (result.rows.length < 1) {
                tx.executeSql('INSERT INTO department(id, dept_name,user, size) VALUES(? , ? , ? , ?)', [null, "Marketing", "10", "200 GB"], onSuccessExecuteSql(tx),
                    onError(tx));
                tx.executeSql('INSERT INTO department(id, dept_name,user, size) VALUES(? , ? , ? , ?)', [null, "Sale", "10", "200 GB"], onSuccessExecuteSql(tx),
                    onError(tx));
                tx.executeSql('INSERT INTO department(id, dept_name,user, size) VALUES(? , ? , ? , ?)', [null, "Finance", "10", "200 GB"], onSuccessExecuteSql(tx),
                    onError(tx));
                tx.executeSql('INSERT INTO department(id, dept_name,user, size) VALUES(? , ? , ? , ?)', [null, "Personnel", "10", "200 GB"], onSuccessExecuteSql(tx),
                    onError(tx));
            }
        });

        tx.executeSql('SELECT *FROM corporate', [], function (tx, result) {
            if (result.rows.length < 1) {
                tx.executeSql('INSERT INTO corporate(id,name,address,phone,email,size,user) VALUES(? , ? , ? , ? , ? , ?,?)', [null, "CP", "Bangkok", "081-1234126", "cpall@outook.com", "1 TB", "400 user"], onSuccessExecuteSql(tx),
                    onError(tx));
            }
        });

        tx.executeSql('SELECT *FROM user', [], function (tx, result) {
            if (result.rows.length < 1) {
                tx.executeSql('INSERT INTO user(id , username , password , userType) VALUES(? , ? , ? , ?)', [null, "sadmin", "sadmin", "super_admin"], onSuccessExecuteSql(tx),
                    onError(tx));
                tx.executeSql('INSERT INTO user(id , username , password , userType) VALUES(? , ? , ? , ?)', [null, "cadmin", "cadmin", "corporate_admin"], onSuccessExecuteSql(tx),
                    onError(tx));
                tx.executeSql('INSERT INTO user(id , username , password , userType) VALUES(? , ? , ? , ?)', [null, "dadmin", "dadmin", "department_admin"], onSuccessExecuteSql(tx),
                    onError(tx));
                tx.executeSql('INSERT INTO user(id , username , password , userType) VALUES(? , ? , ? , ?)', [null, "user", "user", "user"], onSuccessExecuteSql(tx),
                    onError(tx));
            }
        });

    });
}

function dropTable() {
    var db = openDatabase('db_nestpockets', '1.0', 'storage infomation', 2 * 1024 * 1024);
    db.transaction(function (tx) {
        tx.executeSql('DELETE FROM department');
        tx.executeSql('DELETE FROM admin_corporate');
        tx.executeSql('DELETE FROM user');
        tx.executeSql('DELETE FROM corporate');

        tx.executeSql('DROP TABLE department');
        tx.executeSql('DROP TABLE admin_corporate');
        tx.executeSql('DROP TABLE user');
        tx.executeSql('DROP TABLE corporate');
        $('#table-corporate').addClass('hidden');
        $('#table-department').addClass('hidden');
    });
}
function selectAdminCorporate() {
    var db = openDatabase('db_nestpockets', '1.0', 'storage infomation', 2 * 1024 * 1024);
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM admin_corporate', [], function (tx, result) {
            var l = result.rows.length;
            l = parseInt(l);
            if (l < 1) {
                $('#table-corporate').addClass('hidden');
            } else {
                $('#table-corporate').removeClass('hidden');
                for (var i = 0; i < l; i++) {
                    var str;
                    str += "<tr>"
                        + "<td class='text-center'>" + result.rows.item(i).id + "</td>"
                        + "<td class='text-center'>" + result.rows.item(i).fname + "</td>"
                        + "<td class='text-center'>" + result.rows.item(i).lname + "</td>"
                        + "<td class='text-center'>" + result.rows.item(i).email + "</td>"
                        + "<td class='text-center'>" + result.rows.item(i).phone + "</td>"
                        + "</tr>";
                    $('.list-admin-corporrate').append().html(str);
                }
            }
        });
    });
}

function selectAdminDepartment() {
    var db = openDatabase('db_nestpockets', '1.0', 'storage infomation', 2 * 1024 * 1024);
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM admin_department', [], function (tx, result) {
            var l = result.rows.length;
            l = parseInt(l);
            if (l < 1) {
                $('#table-admin_department').addClass('hidden');
            } else {
                $('#table-admin_department').removeClass('hidden');
                for (var i = 0; i < l; i++) {
                    var str;
                    str += "<tr>"
                        + "<td class='text-center'>" + result.rows.item(i).id + "</td>"
                        + "<td class='text-center'>" + result.rows.item(i).fname + "</td>"
                        + "<td class='text-center'>" + result.rows.item(i).lname + "</td>"
                        + "<td class='text-center'>" + result.rows.item(i).email + "</td>"
                        + "<td class='text-center'>" + result.rows.item(i).phone + "</td>"
                        + "</tr>";
                    $('.list-admin-department').append().html(str);
                }
            }
        });
    });
}


function selectDepeartment() {
    var db = openDatabase('db_nestpockets', '1.0', 'storage infomation', 2 * 1024 * 1024);
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM department', [], function (tx, result) {
            var l = result.rows.length;
            l = parseInt(l);
            if (l < 1) {
                $('#table-department').addClass('hidden');
            } else {
                $('#table-department').removeClass('hidden');
                for (var i = 0; i < l; i++) {
                    var str;
                    str += "<tr>"
                        + "<td class='text-center'>" + result.rows.item(i).id + "</td>"
                        + "<td class='text-center'><a href='../department/index.html'>" + result.rows.item(i).dept_name + "</a></td>"
                        + "<td class='text-center'>" + result.rows.item(i).user + "</td>"
                        + "<td class='text-center'>" + result.rows.item(i).size + "</td>"
                        + "</tr>";
                    $('.list-department').append().html(str);
                }
            }
        });
    });
}

function selectDepartment_user() {
    var db = openDatabase('db_nestpockets', '1.0', 'storage infomation', 2 * 1024 * 1024);
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM department_user', [], function (tx, result) {
            var l = result.rows.length;
            l = parseInt(l);
            if (l < 1) {
                $('#table-user').addClass('hidden');
            } else {
                $('#table-user').removeClass('hidden');
                for (var i = 0; i < l; i++) {
                    var str;
                    str += "<tr>"
                        + "<td class='text-center'>" + result.rows.item(i).id + "</td>"
                        + "<td class='text-center'>" + result.rows.item(i).fname + "</td>"
                        + "<td class='text-center'>" + result.rows.item(i).lname + "</td>"
                        + "<td class='text-center'>" + result.rows.item(i).email + "</td>"
                        + "<td class='text-center'>" + result.rows.item(i).phone + "</td>"
                        + "</tr>";
                    $('.list-user').append().html(str);
                }
            }
        });
    });
}

function selectCorporate() {
    var db = openDatabase('db_nestpockets', '1.0', 'storage infomation', 2 * 1024 * 1024);
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM corporate', [], function (tx, result) {
            var l = result.rows.length;
            l = parseInt(l);
            if (l < 1) {
                $('#table-corporate').addClass('hidden');
            } else {
                $('#table-corporate').removeClass('hidden');
                for (var i = 0; i < l; i++) {
                    var str;
                    str += "<tr>" + "<td class='text-center'> <a href='../create-admin-corporate/index.html'>" + result.rows.item(i).id + "</a></td>"
                        + "<td class='text-center'><a href='../create-admin-corporate/index.html'>" + result.rows.item(i).name + "</a></td>"
                        + "<td class='text-center'>" + result.rows.item(i).size + "</td>"
                        + "<td class='text-center'>" + result.rows.item(i).user + "</td>"
                        + "<td class='text-center'>" + result.rows.item(i).email + "</td>"
                        + "<td class='text-center'>" + result.rows.item(i).phone + "</td>"
                    + '<td><button class="btn btn-warning btn-sm" data-toggle="modal" href="#modal-edit" style="width:100%">Edit</button></td>'
                    + '<td><button class="btn btn-danger btn-sm" data-toggle="modal" href="#modal-delete" style="width:100%">Delete</button></td>'
                    + '</tr>';
                    $('.list-corporate').append().html(str);
                }
            }
        });
    });
}
function onReadyTransaction() {
    console.log('Transaction completed')
}
function onSuccessExecuteSql(tx, results) {
    console.log('Execute SQL completed')
}
function onError(err) {
    console.log(err)
}
