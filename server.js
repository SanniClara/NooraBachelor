if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}



const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')



const initializePassport = require('./passport-config')
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

app.get('noorahealth.herokuapp.com', checkAuthenticated, (req, res) => {
  res.render('index.ejs', { name: req.user.name })
})



app.get('noorahealth.herokuapp.com/login', checkNotAuthenticated, (req, res) => {
  res.render('login.ejs')
})


app.get('noorahealth.herokuapp.com/luxValue', function (req, res) {
  res.render('luxValue.ejs');
});


app.get('noorahealth.herokuapp.com/timer', function (req, res) {
  res.render('timer.ejs');
});



app.post('noorahealth.herokuapp.com/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: 'noorahealth.herokuapp.com/',
  failureRedirect: 'noorahealth.herokuapp.com/login',
  failureFlash: true
}))


app.get('noorahealth.herokuapp.com/register', checkNotAuthenticated, (req, res) => {
  res.render('noorahealth.herokuapp.com/register.ejs')
})


app.post('noorahealth.herokuapp.com/register', checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })
    res.redirect('noorahealth.herokuapp.com/login')
  } catch {
    res.redirect('noorahealth.herokuapp.com/register')
  }
})


app.delete('noorahealth.herokuapp.com/logout', (req, res) => {
  req.logOut()
  res.redirect('noorahealth.herokuapp.com/login')
})

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('noorahealth.herokuapp.com/login')
}


function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('noorahealth.herokuapp.com/')
  }
  next()
}

app.listen(5000)