# nodejs-api-gateway
API gateway written in NodeJs using expressjs, passportjs, jwt and MySQL. Implements passportjs's Facebook, Google and Local strategy. 
## Usage
### 1. Installation
```
git clone https://github.com/Loubis/nodejs-api-gateway.git
cd nodejs-api-gateway
sudo npm i
```

### 2. Prepare database (Optional)
Create a new database and user for the gateway

### 3. Configuration
```
nano src/config.js
```
Add your new or existing database informations, keys for Google and Facebook, etc. . Here you can also setup the proxy. For the case that the examples are not engough look at https://www.npmjs.com/package/express-http-proxy for more in depth configuration.

### 4.
```
node src/server.js
```
or if you use pm2
```
pm2 start src/server.js
```

The tables for user models are created automatically

## License
MIT
