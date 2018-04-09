const express=require('express');
const bodyParser=require('body-parser');
const mysql=require('mysql');
const app=express();  

app.use(bodyParser.urlencoded({  }))

const pool = mysql.createPool({
	host:'localhost',
	user:'root',
	password:'root',
	database:'house',
	port:3306
})


app.use('/sel',(req,res)=>{
	res.setHeader('Access-Control-Allow-Origin','*');
	pool.getConnection((err,con)=>{
		if(err) throw err;
		con.query(`SELECT * FROM list WHERE fenlei=${req.body.fenlei}`,(err,rows)=>{
			console.log(req.body.fenlei)
			if(err) throw err;
			res.send(rows);
		con.release();
		})
	})
})

app.use('/detail',(req,res)=>{
	res.setHeader('Access-Control-Allow-Origin','*');
	pool.getConnection((err,con)=>{
		if(err) throw err;
		con.query(`SELECT * FROM list WHERE id=${req.body.id}`,(err,rows)=>{
			// console.log(req.body)
			if(err) throw err;
			res.send(rows);
			con.release();
		})
	})
})




app.listen(3000,()=>{
	console.log('ok')
});