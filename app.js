const express = require("express");
require("dotenv").config();
const app = express();

var con = require("./connection");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine','ejs');

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Server is up and running");
});

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.get("/register", function(req, res){
  res.sendFile(__dirname + "/register.html");
});


app.get("/login", function(req, res){
  res.sendFile(__dirname + "/login.html");
});
    
app.post("/", function(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    console.log(name, email, password);

    //let sql = "INSERT INTO users(username, email, password) VALUES(?, ?, ?)";
     let sql = "INSERT INTO users(username, email, password) VALUES('"+ name +"', '"+ email +"' , '"+ password +"')"

    // let values = [[name, email, password]];

    con.query(sql, function(err, result){
        if (err) throw err;

        console.log("Data Uploaded.");

        res.send("User Registerd Successfully." + result.insertId);
    });

});

app.get('/users', function(req, res){
    con.getConnection(function(error){
        if(error) 
          console.log(error);
        
        var select = "select * from users";

        con.query(select, function(error, result){
            if(error) 
              console.log(error);

            res.render(__dirname + "/users", {users : result});
        });
    });
});

app.get('/delete-user', function(req, res){
    con.getConnection(function(error){
        if(error) 
          console.log(error);
        
        var deleteuser = "delete from users where id= ?";

        let id = req.query.id;

        con.query(deleteuser, [id], function(error, result){
            if(error) 
              console.log(error);

            res.redirect( "/users");
        });
    });
});


app.get('/update-user', function(req, res){
    con.getConnection(function(error){
        if(error) 
          console.log(error);
        
        var deleteuser = "select * from users where id= ?";

        let id = req.query.id;

        con.query(deleteuser, [id], function(error, result){
            if(error) 
              console.log(error);

            res.render(__dirname +  "/update-user", {user: result});  // user name pass to update-user.ejs
        });
    });
});

app.post('/update-user', function(req, res){

    let id = req.body.id;
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;

    con.getConnection(function(error){
        if(error) 
          console.log(error);
        
        var updateQuery = "update users set username=?, email=?, password=? where id= ?";

        con.query(updateQuery, [name, email, password,id], function(error, result){
            if(error) 
              console.log(error);

            res.redirect('/users');
        });
    });
});

app.get('/search-users', function(req, res){
  con.getConnection(function(error){
      if(error) 
        console.log(error);
      
      var searchuser = "select * from users";

      con.query(searchuser, function(error, result){
          if(error) 
            console.log(error);

          res.render(__dirname +  "/search-users", {users: result});
      });
  });
});

app.get('/search', function(req, res){

   let name = req.query.name;
   let email = req.query.email;
   let password = req.query.password;

   con.getConnection(function(error){
      if(error) console.log(error);

      var search = "SELECT * from users where username LIKE '%"+name+"%' AND email LIKE '%"+email+"%' AND password LIKE '%"+password+"%' ";

      con.query(search, function(error, result){
          if(error) console.log(error);

          res.render(__dirname + '/search-users' , {users: result});
      });

   });

});