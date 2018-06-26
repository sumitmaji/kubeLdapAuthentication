var express = require('express'),
  passport = require('passport'),
  bodyParser = require('body-parser'),
  LdapStrategy = require('passport-ldapauth');

var OPTS = {
  server: {
    url: process.env.LDAP_HOST,
    bindDN: 'cn=admin,dc=default,dc=svc,dc=cloud,dc=uat',
    bindCredentials: process.env.LDAP_PASSWORD,
    searchBase: 'ou=users,dc=default,dc=svc,dc=cloud,dc=uat',
    searchFilter: '(uid={{username}})'
  }
};

var app = express();

passport.use(new LdapStrategy(OPTS));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(passport.initialize());

app.get('/ldapauth/test', (req, res) => {
  res.send('Hi')
})

app.get('/healthz', (req, res) => {
  res.send('Ok')
})

app.post('/ldapauth/login', passport.authenticate('ldapauth', {
  session: false
}), function(req, res) {
  res.send({
    status: 'ok'
  });
});

app.use((err, req, res, next) => {
  console.log(err)
  res.status(403).send(err);
})

app.listen(5004);
