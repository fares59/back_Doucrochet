const express = require('express')
const serverConfig = require('./app/config/server.config')
const cors = require('cors')
const mongoose = require("mongoose");
const BddCreate = require('./app/scripts/createBdd.script') 
const RoleRoutes = require('./app/routes/role.router')
const UserRoutes = require('./app/routes/user.router')
const ProductRoutes = require('./app/routes/product.router');

const mongoDB = process.env.DB_LOCAL;
const url = process.env.DB_LIVE;
const PORT = serverConfig.PORT || 5000
const app = express()

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}
// Pour se connecter en local
mongoose.connect(mongoDB).then(r => {
    console.log('Connected to MongoDB')
});

// Pour se connecter au live
// mongoose.connect(url, connectionParams).then(() => {
//     console.log("Connected to MongoDB")
// })
// .catch( (err) => {
//     console.error(`Error connecting to the database. n${err}`);
// });

const db = mongoose.connection;
// Bind connection to error event (to get notification of connection errors)

db.on("error", console.error.bind(console, "MongoDB connection error:"));

BddCreate.insertRoleBDD()

const corsOptions = {
    origin:'*',
    credentials: true,
    optionsSuccessStatus:200,
    methods: "*"
}

app.use(cors(corsOptions));

app.use(express.json())

app.use("/role", RoleRoutes)
app.use("/users", UserRoutes);
app.use('/products', ProductRoutes);


app.listen(PORT,  () => console.log(`Server is running on port ${PORT}`));


