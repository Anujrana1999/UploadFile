import path from 'path';
import express from 'express'
import multer from 'multer'

// server/port
const app = express()
const port = 8000

// instance
const storage = multer.diskStorage({
    destination(req, file, callback) {
        return callback(null, './upload')
    },
    filename(req, file, callback) {
        return callback(null, `${Date.now()}-${file.originalname}`)
    },
})

const upload = multer({ storage })

// views
app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

// middleware plugins
app.use(express.urlencoded({ extended: false }))

// routes
app.get('/', (req, res) => {
    return res.render('homepage')
})

app.post('/upload', upload.single('profileImage'), (req, res) => {
    console.log(req.body)
    console.log(req.file)

    return res.redirect('/')
})

// server start
app.listen(port, () => console.log(`Server started at PORT: ${port}`))