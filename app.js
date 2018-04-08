const express=require('express');
const bodyParser=require('body-parser');
const mysql=require('mysql');
const app=express();  

app.use(bodyParser.urlencoded({  }))

const pool = mysql.createPool({
	host:'localhost',
	user:'root',
	password:'root',
	database:'message',
	port:3306
})


app.use('/',(req,res)=>{
	res.setHeader('Access-Control-Allow-Origin','*');
	pool.getConnection((err,con)=>{
		if(err) throw err;
		con.query(`SELECT * FROM list`,(err,rows)=>{
			if(err) throw err;
			res.send(rows);
			con.release();
		})
	})
})
app.listen(3000,()=>{
	console.log('ok')
});