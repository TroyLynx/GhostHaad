// const express =require('express')
// const ejs=require('ejs')
// const path=require('path')
// const app=express()
// app.set('view engine','ejs')

// app.use(express.json());
// app.use(express.urlencoded({extended:true}));
// app.use(express.static(path.join(__dirname,"./public")));

// app.get("/",(req,res)=>{
//     res.render('home',{result:null})
// })

// app.post('/add',(req,res)=>{
//     const {value1,value2}=req.body
//     const result1= ejs.render(`<%=${value1} + ${value2}%>`);
    
//     res.render('home',{result:result1})
// })

// app.listen(8080,()=>{console.log("listening on port 8080")})


const express = require('express');
const ejs = require('ejs');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './public')));

app.get('/', (req, res) => {
    res.render('home', { result: null });
});

app.post('/add', (req, res) => {
    const { payload } = req.body;

    // Simulate vulnerable EJS rendering
    const userTemplate = `<%= ${payload} %>`;

    try {
        const result = ejs.render(userTemplate, {});
        res.render('home', { result });
    } catch (err) {
        res.render('home', { result: 'Template error: ' + err.message });
    }
});

app.listen(8080, () => {
    console.log("Listening on port 8080");
});
