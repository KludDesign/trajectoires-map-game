var express = require('express'),
    app = express(),
    server = require('http').Server(app),
     io = require('socket.io').listen(server),
     fs = require('fs'),
     events = require('events'),
     eventEmitter = new events.EventEmitter(),
     five = require('johnny-five'),
     board = new five.Board(),

     valid = require('./public/js/validation');
// Ecoute sur le port 8080 de localhost
server.listen(8080);

// Création du server expressJS
app.get('/', (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile(__dirname + '/index.html', (err,data) => {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading index.html');
      };
      res.end(data);
    });
});

// Création du dossier statique /public
app.use('/public', express.static(__dirname + '/public'));

eventEmitter = new events.EventEmitter();

// Manipulation de la carte Arduino avec johnny-five
board.on('ready', () => {

  // Create a new `led` instance and initialise the led on
  var led = new five.Led(13);

  // Create a new 'relay' instance ----------------------------------------------
  var relay = new five.Relay({
    pin: 21,
    type: "NO",
  });

  var buttonRelay = new five.Button({
    pin: 3,
    isPullup: true,
  });
  // Evenement pour le changement de jeu
  buttonRelay.on('press', () => {
    console.log( "Button relay pressed" );
    relay.toggle();
    // Envoyer l'événement au front lorsque le bouton est appuié
    io.emit('swichJeu');
  });
  // Déclaration des bouttons jeu de gauche ------------------------------------
  var button1G = new five.Button({
    pin: 44,
    isPullup: true,
  });

  var button2G = new five.Button({
    pin: 45,
    isPullup: true,
  });

  var button3G = new five.Button({
    pin: 46,
    isPullup: true,
  });

  var button4G = new five.Button({
    pin: 47,
    isPullup: true,
  });

  var button5G = new five.Button({
    pin: 48,
    isPullup: true,
  });

  var button6G = new five.Button({
    pin: 49,
    isPullup: true,
  });

  var button7G = new five.Button({
    pin: 50,
    isPullup: true,
  });

  var button8G = new five.Button({
    pin: 51,
    isPullup: true,
  });

  var button9G = new five.Button({
    pin: 52,
    isPullup: true,
  });

  var button10G = new five.Button({
    pin: 53,
    isPullup: true,
  });

  // Déclaration des boutons jeu de droite ----------------------------------
  var button1D = new five.Button({
    pin: 8,
    isPullup: true,
  });

  var button2D = new five.Button({
    pin: 9,
    isPullup: true,
  });

  var button3D = new five.Button({
    pin: 10,
    isPullup: true,
  });

  var button4D = new five.Button({
    pin: 11,
    isPullup: true,
  });

  var button5D = new five.Button({
    pin: 12,
    isPullup: true,
  });

  var test1 = false;
  var test2 = false;
  // Evenement lors du click sur la map ------------------------------------------------------
  io.on('connection', (socket) => {
    socket.on('clickEspagne',  () => {
      led.toggle();
      console.log( "Espagne");
      test2 = true;
      if (test1 == true && test2 == true){
        console.log( "Gagné!!!!");
      }
      else{
        console.log( "tu t'es trompé!!");
      };
      return test1 = false, test2 = false;
    });
  });

  // Evenement lors de l'appui sur les bouttons du jeu Gauche -----------------------------------
  button1G.on('press', () => {
    console.log( "Button 1 pressed" );
    led.toggle();
    return test1 = true;
  });

  button2G.on('press', () => {
    console.log( "Button 2 pressed" );
    led.toggle();
  });

  button3G.on('press', () => {
    console.log( "Button 2 pressed" );
    led.toggle();
  });

  button4G.on('press', () => {
    console.log( "Button 2 pressed" );
    led.toggle();
  });

  button5G.on('press', () => {
    console.log( "Button 2 pressed" );
    led.toggle();
  });

  button6G.on('press', () => {
    console.log( "Button 2 pressed" );
    led.toggle();
  });

  button7G.on('press', () => {
    console.log( "Button 2 pressed" );
    led.toggle();
  });

  button8G.on('press', () => {
    console.log( "Button 2 pressed" );
    led.toggle();
  });

  button9G.on('press', () => {
    console.log( "Button 2 pressed" );
    led.toggle();
  });

  button10G.on('press', () => {
    console.log( "Button 2 pressed" );
    led.toggle();
  });

  // Evenement lors de l'appui sur les bouttons du jeu Gauche -----------------------------------
  button1D.on('press', () => {
    console.log( "Button 2 pressed" );
    led.toggle();
    // Envoyer l'événement au front lorsque le bouton est appuié
    io.emit('song');
  });

  button2D.on('press', () => {
    console.log( "Button 2 pressed" );
    led.toggle();
    // Envoyer l'événement au front lorsque le bouton est appuié
    io.emit('song');
  });

  button3D.on('press', () => {
    console.log( "Button 2 pressed" );
    led.toggle();
    // Envoyer l'événement au front lorsque le bouton est appuié
    io.emit('song');
  });

  button4D.on('press', () => {
    console.log( "Button 2 pressed" );
    led.toggle();
    // Envoyer l'événement au front lorsque le bouton est appuié
    io.emit('song');
  });

  button5D.on('press', () => {
    console.log( "Button 2 pressed" );
    led.toggle();
    // Envoyer l'événement au front lorsque le bouton est appuié
    io.emit('song');
  });
});
