import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import Character from './character'

const app = express()
const port = 3001
const dbUrl = 'mongodb://localhost/deresute'

app.use(bodyParser.urlencoded({ extended:true }))
app.use(bodyParser.json())

mongoose.connect(dbUrl,dbErr => {
    if(dbErr) throw new Error(dbErr)
    else console.log('db connect')

       app.get('/api/characters', (request, response) => {
     Character.find({}, (err, characterArray) => {  // 取得したドキュメントをクライアント側と同じくcharacterArrayと命名
       if (err) response.status(500).send()
       else response.status(200).send(characterArray)  // characterArrayをレスポンスとして送り返す
     })
   })

    app.listen(port,err => {
        if(err) throw new Error(err)
        else console.log(`port ${port}`)
    })
})

