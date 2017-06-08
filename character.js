import mongoose from 'mongoose'

mongoose.Promise = global.Promise

//スキーマ作成
const CharacterSchema = new mongoose.Schema({
    charaid: Number,
    name: String,
    imgurl:String,
    type:String
})

//モデルの作成
const Character = mongoose.model('Character',CharacterSchema)

//モデルをexport
export default Character