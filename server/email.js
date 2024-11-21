import express from 'express';
import nodemailer from 'nodemailer';
import mysql from 'mysql2/promise';

const con = await mysql.createConnection ({
  host: 'localhost',
  user: 'fatec',
  password: 'fatec',
  database: 'salao_beleza'
});

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'fatecfullstack@gmail.com',
    pass: 'zvmy dvhc tful wzus'
  }
});

function enviarEmail(email, titulo, texto) {
	var mailOptions = {
	  from: 'fatecfullstack@gmail.com',
	  to: email,
	  subject: titulo,
	  text: texto
	};

	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
		console.log(error);
	  } else {
		console.log('Email enviado: ' + info.response);
	  }
	});
}

const emails = [];
//emails dos clientes
try {
	console.log("Pegando o email dos clientes");
	const [results, fields] = await con.query('SELECT email FROM clientes');
	results.forEach((element) => {
		var string = JSON.stringify(element);
		string = string.replace('{"email":"', '');
		string = string.slice(0, -2);
		emails.push(string)
	});
} catch (err) {
  console.log(err);
}
//emails dos funcionarios
try {
	console.log("Pegando o email dos clientes");
	const [results, fields] = await con.query('SELECT email FROM funcionarios');
	results.forEach((element) => {
		var string = JSON.stringify(element);
		string = string.replace('{"email":"', '');
		string = string.slice(0, -2);
		emails.push(string)
	});
} catch (err) {
  console.log(err);
}

const titulo = "Vazamento de dados";
const texto = "Houve um vazamento de dados, onde seus dados foram comprometidos";
emails.forEach((element) => {
	console.log("Enviando email para " + element);
	enviarEmail(element, titulo, texto);
});
