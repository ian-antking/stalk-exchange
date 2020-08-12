const express = require('express')
var cors = require('cors')
const path = require('path')

const { 
  userRouter,
  priceRouter,
  authRouter,
} = require('./routes')


const app = express()
app.use(cors())

app.use(express.static(path.join(process.cwd(), 'build')))
app.use(
  express.json({
    limit: '10mb'
  })
)

app.use('/user', userRouter)
app.use('/auth', authRouter)
app.use('/price', priceRouter)

app.get('*', (_, res) => {
  res.sendFile(path.join(process.cwd(), 'build', 'index.html'))
})

module.exports = app
