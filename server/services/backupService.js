const { exec } = require('child_process');
const path = require('path');
const config = require('../config/database'); 
require('dotenv').config({ path: './dotenv.env' });

const backupFolder = path.resolve(process.env.FOLDERBACKUP);

// Função para criar backup
const createBackup = () => {
  return new Promise((resolve, reject) => {
    const command = `xtrabackup --backup --target-dir=${backupFolder}/`;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(`Erro ao criar backup: ${stderr}`);
      } else {
        resolve(stdout);
      }
    });
  });
};

// Função para modificar o backup (remover o usuário)
const removeUserFromBackup = (userId) => {
  return new Promise((resolve, reject) => {
    console.log('removeUserFromBackup - ' ,userId)
    // Comando para restaurar o backup
    const restoreCommand = `mariadb-dump -u ${config.mysql.user} -p${config.mysql.password} ${config.mysql.database} < ${backupFolder}/salao_beleza_backup.sql`;
    console.log('restoreCommand - ' ,restoreCommand)

    // Comando para excluir o usuário do banco de dados restaurado
    const deleteUserCommand = `DELETE FROM users WHERE id = ${userId}`;
    console.log('deleteUserCommand - ' ,deleteUserCommand)

    exec(restoreCommand, (error) => {
      if (error) {
        console.log('error - ' ,'`Erro ao restaurar backup:')
        reject(`Erro ao restaurar backup: ${error}`);
      } else {
        exec(deleteUserCommand, (error) => {
          if (error) {
            reject(`Erro ao excluir dados do usuário: ${error}`);
          } else {
            createBackup().then(resolve).catch(reject);
          }
        });
      }
    });
  });
};

module.exports = { createBackup, removeUserFromBackup };
