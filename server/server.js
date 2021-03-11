const express = require ('express')
const cors = require ('cors')
// const mysql = require('mysql');
const announcementRoute = require('./routes/announcementRoute')
const requireAuth = require('./middleware/requireAuthRoute')
const ItemImagesRoute = require('./routes/itemImagesRoute')
const categoryRouter = require('./routes/categoryRouter');
const subcategoryRouter = require('./routes/subcategoryRouter');
const itemRouter = require('./routes/itemRouter');
const profileRoute = require('./routes/profileRoute')
const path = require('path');

const Signup=require("./routes/signupRoute");
const messagesRoute = require('./routes/messagesRoute')
//const SellerReview=require("./routes/SellerReview.route");
// const ItemRoute=require('./routes/Item.route')

const db = require("./models/db.js");
const app = express();
app.use(cors())



db.connect((err)=> {
    if (err) {
      console.error('error connecting db: ' + err.stack);
      return;
    }
  
    console.log('connected to db as id ' + db.threadId);
  });

app.use(express.json())

app.use(express.static(path.join(__dirname, '../admin/build')));

// require("./routes/announcementReadRoute")(app);
require("./routes/ItemReview.route.js")(app);
require("./routes/SellerReview.route.js")(app);

// require("./routes/anouncementWriteRoute")(app);
require('./routes/signupRoute')(app)
require('./routes/Item.route')(app);
require('./routes/signinRoute')(app);
require('./routes/Image.route')(app);
require('./routes/User.route')(app);
app.use('/messages', requireAuth,  messagesRoute)
app.use('/profile', requireAuth, profileRoute)
app.use('/itemImages', ItemImagesRoute)
app.use('/category', categoryRouter);
app.use('/subcategory', subcategoryRouter);
app.use('/item', requireAuth, itemRouter);

app.use('/announcement', announcementRoute)
app.get("/api", (req, res) => {
    res.json({
        message: 'Welcome to Craft Sell API'
    });
});

// app.get('/profile', requireAuth, (req, res)=>{
//     res.send(req.user)
// })

// app.post('/announcement', (req, res)=>{
//     console.log(req.body)
//     res.send(req.body)
// })
    // db.query(sql, (err, result)=>{
//         if (err) throw err;
//         console.log(result)
//         res.send('Database connected')
//     })    
// })

// app.post('/signup', (req, res)=>{signup.handleSignup(req, res, database, jwt)})
// app.post('/signin', (req, res)=>{signin.handleSignup(req, res, database, jwt)})

let port=process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Listening on ${port}`)
})