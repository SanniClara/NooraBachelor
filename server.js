if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const port = process.env.PORT || 8000;

const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const fs = require('fs')


//const mongodbAccess = "mongodb+srv://sclaraNOORABachelor:KinaZudo_24@cluster0.wqvfg.mongodb.net/SunlightValues?retryWrites=true&w=majority"
//mongoose.connect(mongodbAccess, { useNewUrlParser: true,   useUnifiedTopology: true }).then()


const initializePassport = require('./passport-config');
const { wait } = require('@testing-library/react');
const { ContactSupportOutlined } = require('@material-ui/icons');
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)

const users = []
app.set('views', './views');
app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
  secret: "ghjkl56tz8fuikx2ü3rpoq3v#<öy<<c",
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))
app.use(express.static('public'));


app.get('noorahealth.herokuapp.com/', checkAuthenticated, (req, res) => {
  res.render('index.ejs', { name: req.user.name })
})



app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.ejs')
})


app.get('/luxValue', function (req, res) {
  res.render('luxValue.ejs');
});


app.get('/timer', function (req, res) {
  res.render('timer.ejs');
});


app.get('/calmDown', function (req, res) {
  res.render('calm.ejs');
});


app.get('/BlinkingContest', function (req, res) {
  res.render('eye.ejs');
});

app.get('/AnimationLUXsunlight', function (req, res) {
  res.render('AnimationLUXsunlight.ejs');
});

app.get('/LUXinteraktiveGrafik', function (req, res) {
  res.render('LUXinteraktiveGrafik.ejs');
});


app.get('/focus', function (req, res) {
  res.render('focus.ejs');
});

app.get('/Punktepraemien', function (req, res) {
  res.render('Punktepraemien.ejs');
});

app.get('/LUXQuiz', function (req, res) {
  res.render('LUXQuiz.ejs');
});

app.get('/points', function (req, res) {
  res.render('points.ejs');
});

app.get('/settings', function (req, res) {
  res.render('settings.ejs');
});


app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))


app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register.ejs')
})


app.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })
    res.redirect('/login')
  } catch {
    res.redirect('/register')
  }
})


app.delete('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
})

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login')
}


function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}
 
var dps = [0,0,0,0];
// dataPoints

 //app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  // POST Listener
//app.use(bodyParser.json());
  app.use(bodyParser.text({ type: "application/json" }));

  const neuerArray = [0,0,0];

  // POST Listener
  app.post('/LichtValueEndpoint', (req,res) => {

    dps.push(req.body);
    //console.log(req.body)

    function wiederholung (){
      //console.log(req.body)
      fs.appendFileSync("file.txt" , req.body + "," + "\n",  "UTF-8", {'flags': 'w+'});

       var lineReader = require('readline').createInterface({
        input: require('fs').createReadStream('file.txt')
      });


      lineReader.on('line', function (line) {

       // console.log(parseInt(line));
        neuerArray.push(parseInt(line));
        //console.log(neuerArray)
        //console.log(neuerArray.length)
      });
            

    }

    wiederholung();
    //console.log(dps);

    res.end()

  })

    //const jsonString = JSON.stringify(content, null, 2)
    
    
   // fs.writeFile("file.txt" , dps);
  

app.listen(port);