const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");






app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "project",
});

//material
app.get("/material", (req, res) => {
  db.query("SELECT * FROM material", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post('/creatematerial', (req, res) => {
  const material_Id = req.body.material_Id;
  const material_name = req.body.material_name;
  const material_brand = req.body.material_brand;
  const material_unit = req.body.material_unit;
  const material_price = req.body.material_price;
  const material_remaining = req.body.material_remaining;
  const material_order_date = req.body.material_order_date;
  const material_delivery_date = req.body.material_delivery_date;
  const type_material_Id = req.body.type_material_Id;
  const company_Id = req.body.company_Id;
  db.query(
    "INSERT INTO material (material_Id, material_name, material_brand, material_unit, material_price, material_remaining, material_order_date, material_delivery_date, type_material_Id, company_Id) VALUES(?,?,?,?,?,?,?,?,?,?)",
    [material_Id, material_name, material_brand, material_unit, material_price, material_remaining, material_order_date, material_delivery_date, type_material_Id, company_Id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values inserted");
      }
    });
});

app.put('/updatematerial/:material_Id', (req, res) => {
  const material_Id = req.body.material_Id;
  const material_name = req.body.material_name;
  const material_brand = req.body.material_brand;
  const material_unit = req.body.material_unit;
  const material_price = req.body.material_price;
  const material_remaining = req.body.material_remaining;
  const material_order_date = req.body.material_order_date;
  const material_delivery_date = req.body.material_delivery_date;
  const type_material_Id = req.body.type_material_Id;
  const company_Id = req.body.company_Id;
  db.query(
    "UPDATE material SET material_name = ?, material_brand = ?, material_unit = ?, material_price = ?, material_remaining = ?, material_order_date = ?, material_delivery_date = ?, type_material_Id = ?, company_Id = ? WHERE material_Id = ?",
    [material_name, material_brand, material_unit, material_price, material_remaining, material_order_date, material_delivery_date, type_material_Id, company_Id, material_Id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

app.delete("/deletematerial/:material_Id", (req, res) => {
  const material_Id = req.params.material_Id;
  db.query("DELETE FROM material WHERE material_Id = ?", material_Id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/getmaterial/:material_Id", (req, res) => {
  const material_Id = req.params.material_Id;
  db.query("SELECT * FROM material WHERE material_Id = ?", material_Id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//cart
// กำหนด endpoint สำหรับเพิ่มสินค้าในตะกร้า
app.post("/cart", (req, res) => {
  const { material_Id, order_material_quantity } = req.body;
  const sql = `INSERT INTO order_material (material_Id, order_material_quantity) VALUES (${material_Id}, ${order_material_quantity})`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// กำหนด endpoint สำหรับดึงข้อมูลสินค้าในตะกร้า
app.get('/cart', (req, res) => {
  const sql = 'SELECT order_material.order_material_Id, material.material_name, order_material.order_material_quantity FROM order_material_Id INNER JOIN material ON order_material_Id.material_Id = material.material_Id';
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});


//durablearticles
app.get("/durablearticles", (req, res) => {
  db.query("SELECT * FROM durablearticles", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post('/createdurablearticles', (req, res) => {
  const durablearticles_Id = req.body.durablearticles_Id;
  const durablearticles_name = req.body.durablearticles_name;
  const durablearticles_brand = req.body.durablearticles_brand;
  const durablearticles_unit = req.body.durablearticles_unit;
  const durablearticles_price = req.body.durablearticles_price;
  const durablearticles_order_date = req.body.durablearticles_order_date;
  const durablearticles_delivery_date = req.body.durablearticles_delivery_date;
  const durablearticles_repair_date = req.body.durablearticles_repair_date;
  const durablearticles_finish_date = req.body.durablearticles_finish_date;
  const type_durablearticles_Id = req.body.type_durablearticles_Id;
  const company_Id = req.body.company_Id;
  const room_Id = req.body.room_Id;
  db.query(
    "INSERT INTO durablearticles (durablearticles_Id, durablearticles_name, durablearticles_brand, durablearticles_unit, durablearticles_price, durablearticles_order_date, durablearticles_delivery_date, durablearticles_repair_date, durablearticles_finish_date, type_durablearticles_Id, company_Id, room_Id) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)",
    [durablearticles_Id, durablearticles_name, durablearticles_brand, durablearticles_unit, durablearticles_price, durablearticles_order_date, durablearticles_delivery_date, durablearticles_repair_date, durablearticles_finish_date, type_durablearticles_Id, company_Id, room_Id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values inserted");
      }
    });
});

app.put('/updatedurablearticles/:durablearticles_Id', (req, res) => {
  const durablearticles_Id = req.body.durablearticles_Id;
  const durablearticles_name = req.body.durablearticles_name;
  const durablearticles_brand = req.body.durablearticles_brand;
  const durablearticles_unit = req.body.durablearticles_unit;
  const durablearticles_price = req.body.durablearticles_price;
  const durablearticles_order_date = req.body.durablearticles_order_date;
  const durablearticles_delivery_date = req.body.durablearticles_delivery_date;
  const durablearticles_repair_date = req.body.durablearticles_repair_date;
  const durablearticles_finish_date = req.body.durablearticles_finish_date;
  const type_durablearticles_Id = req.body.type_durablearticles_Id;
  const company_Id = req.body.company_Id;
  const room_Id = req.body.room_Id;
  db.query(
    "UPDATE durablearticles SET durablearticles_name = ?, durablearticles_brand = ?, durablearticles_unit = ?, durablearticles_price = ?, durablearticles_order_date = ?, durablearticles_delivery_date = ?, durablearticles_repair_date = ?, durablearticles_finish_date = ?, type_durablearticles_Id = ?, company_Id = ?, room_Id = ? WHERE durablearticles_Id = ?",
    [durablearticles_name, durablearticles_brand, durablearticles_unit, durablearticles_price, durablearticles_order_date, durablearticles_delivery_date, durablearticles_repair_date, durablearticles_finish_date, type_durablearticles_Id, company_Id, room_Id, durablearticles_Id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

app.delete("/deletedurablearticles/:durablearticles_Id", (req, res) => {
  const durablearticles_Id = req.params.durablearticles_Id;
  db.query("DELETE FROM durablearticles WHERE durablearticles_Id = ?", durablearticles_Id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/getdurablearticles/:durablearticles_Id", (req, res) => {
  const durablearticles_Id = req.params.durablearticles_Id;
  db.query("SELECT * FROM durablearticles WHERE durablearticles_Id = ?", durablearticles_Id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//moveroom
app.put('/moveroom/:durablearticles_Id', (req, res) => {
  const durablearticles_Id = req.body.durablearticles_Id;
  const room_Id = req.body.room_Id;
  db.query(
    "UPDATE durablearticles SET room_Id = ? WHERE durablearticles_Id = ?",
    [room_Id, durablearticles_Id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});


//รายงานแจ้งซ่อม

app.get("/report", (req, res) => {
  db.query("SELECT * FROM `repair_durablearticles`", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//changeroom
app.put('/changeroom/:durablearticles_Id', (req, res) => {
  const durablearticles_Id = req.body.durablearticles_Id;
  const room_Id = req.body.room_Id;
  db.query(
    "UPDATE durablearticles SET room_Id = ? WHERE durablearticles_Id = ?",
    [room_Id, durablearticles_Id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

//repair


app.put('/repair/:durablearticles_Id', (req, res) => {
  const durablearticles_Id = req.body.durablearticles_Id;
  const room = req.body.room;
  const sql = `INSERT INTO repair_durablearticless SET room = ?,durablearticles_Id=? `;
  db.query(sql, [room,durablearticles_Id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});


const scopes = 'personel,student,templecturer'; // <----- Scopes for search account type
const token='sfDdrmyUDe9mzuNA0APClmJDtI5rh-EF';
app.post('/login', (req, res) => {

  const { username, password } = req.body;
 

  fetch('https://api.account.kmutnb.ac.th/api/account-api/user-authen', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization':`Bearer ${token}`
    },
    body: JSON.stringify({
      scopes: scopes,
      username: username,
      password: password,
    }),
  })
    .then(response => response.json())
    .then(json_data => {
      if (!json_data.hasOwnProperty('api_status')) {
        res.status(500).json({ message: 'API Error' });
      } else if (json_data['api_status'] === 'success') {
        res.json({ userInfo: json_data['userInfo'] });
      } else if (json_data['api_status'] === 'fail') {
        res.status(401).json({ message: json_data['api_message'] });
      } else {
        res.status(500).json({ message: 'Internal Error' });
      }
    })
    .catch(error => {
      console.log('Fetch Error: ' + error);
      res.status(500).json({ message: 'Fetch Error' });
    });
  
});




app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});

