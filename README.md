# Spot Painting

Spot Painting is an app originally created and built during General Assembly's Web Development Immersive course. Inspried by Damien Hirst's [spot paintings](http://www.damienhirst.com/artworks/catalogue?category=1), the app allows users to select parameters (`width`, `height`, and `colors`) to randomly generate web versions of spot paintings and save them to a common gallery. Users can also see the "paintings" on individual painting pages, and share them via Twitter.

## Technical specs
Spot Painting was built with the MEAN stack: MongoDB, Express, Angular, and Node.js


### Instructions for renewing SSL certificate
We generate the SSL certificate using [certbot](https://certbot.eff.org/).
Here are the steps to renew it:
1. From the CLI, run `sudo certbot certonly --manual`
2. Enter `spot-painting.com` into input box
3. Add route for handshake in `routes/index.js`
4. 
