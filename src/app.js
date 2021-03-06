import createError from 'http-errors';
import express from 'express';
import path from 'path'
import logger from 'morgan'
import db from '@db/connection'
import bookRouter from '@routes/book/router'
import authorRouter from '@routes/author/router'
import cors from 'cors'

const app = express();
app.use(cors())

async function init() {
  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, 'public')));
  app.use('/books', bookRouter);
  app.use('/authors', authorRouter);
  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    next(createError(404));
  });
  // error handler
  app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
}
db.initMongoConnection()
  .then(() => {
    init();
    if (process.platform !== 'win32' && process.send) {
      process.send('init-server');
    } else {
      process.emit('init-server')
    }
  })
export default app;