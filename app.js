const { Pool } = require('pg')

const pool = new Pool({
   host: "localhost",
   user: "postgres",
   database: "kino_sait",
   password: "root",
   port: "3000"
})

// pool.connect((err, client, release) => {
//   if (err) {
//     console.error('Ошибка подключения:', err);
//   } else {
//     console.log('✅ PostgreSQL подключён!');
//     release(); // Освобождаем клиента
//   }
//   pool.end(); // Закрываем пул
// });

pool.query('SELECT * FROM kino_sait6 LIMIT 6', (err, res) => {
  if (err) {
    console.error('Ошибка запроса:', err);
  } else {
    console.log('Данные из таблицы kino_sait6 :');
    console.log(res.rows); // Вывод всех полученных строк
  }
  pool.end(); // Закрыть подключение
});