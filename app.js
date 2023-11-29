const express=require('express');
const app=express();
const multer=require('multer')



//views engine
app.set('view engine','ejs');

//middleware
app.use(express.urlencoded({extended:false}))


const storage=multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
      },
      filename: function (req, file, cb) {
        const name=Date.now()+file.originalname;
        cb(null, name)
      }
})

const upload=multer({storage:storage})

app.get('/',(req,res)=>{
  res.status(200).render('index')
})

app.post('/upload',upload.array('profileImage',3),(req,res)=>{
    console.log(req.files);
    res.redirect('/')
})

app.listen(3000,()=>{
    console.log("Server has started at port 3000");
})