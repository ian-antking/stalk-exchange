const app = require('./src/app')
const mongoose = require('mongoose')

const port = process.env.PORT || 4000

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true
}

mongoose.connect(process.env.DATABASE_CONN, options, () => {
  app.listen(port, () => {
    console.log(`App runnig on 127.0.0.1:${port}`)
  })
})
