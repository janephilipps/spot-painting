# Spot Painting

Spot Painting is an app originally created and built during General Assembly's Web Development Immersive course. Inspried by Damien Hirst's [spot paintings](http://www.damienhirst.com/artworks/catalogue?category=1), the app allows users to select parameters (`width`, `height`, and `colors`) to randomly generate web versions of spot paintings and save them to a common gallery. Users can also see the "paintings" on individual painting pages, and share them via Twitter.

## Technical specs
Spot Painting was built with the MEAN stack: MongoDB, Express, Angular, and Node.js


### Instructions for renewing SSL certificate
**Next renewal: 10/20/18**

Note: try `certbot renew` and update instructions if it works

We generate the SSL certificate using [certbot](https://certbot.eff.org/).

Here are the steps to renew it:

1. From the CLI, run `sudo certbot certonly --manual`
2. Enter `www.spot-painting.com` into input box
3. Login to Heroku
4. Change `NODE_ENV` to `handshake`
5. Change `HANDSHAKE_PATH` and `HANDSHAKE_RESPONSE` to certbot output
6. Press enter in certbot interface and ensure certificate creation
7. `sudo heroku certs:update /etc/letsencrypt/live/www.spot-painting.com/fullchain.pem /etc/letsencrypt/live/www.spot-painting.com/privkey.pem --app spotpainting --confirm spotpainting`
8. Change `NODE_ENV` back to `production`
9. Go to `www.spot-painting.com` and check that it's working!

