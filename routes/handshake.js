module.exports = function (app) {

  var handshakePath = process.env.HANDSHAKE_PATH;
  var handshakeResponse = process.env.HANDSHAKE_RESPONSE;

  if (handshakePath && handshakeResponse) {
    app.get('/.well-known/acme-challenge/' + handshakePath, function (req, res) {
      res.send(handshakeResponse);
    });
  }
};
