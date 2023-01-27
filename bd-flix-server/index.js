const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000;
require('dotenv').config();

//implement jwt token
const jwt = require('jsonwebtoken')

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('hello');
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ac1kfa5.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

app.put("/user/:email", (req, res) => {
    try {
        const email = req.params.email;
        console.log(email)
    }
    catch (err) {
        console.log(err)
    }
})

async function run() {
    try {
        const ComediesCollection = client.db("bdFlix").collection("comedies");
        const allMoviesCollection = client.db("bdFlix").collection("allmovies");
        const adminuploadcollection = client.db("bdFlix").collection("adminuploadsshows");

        //user collection
        const usersCollection = client.db("bdFlix").collection("user");

        app.get('/mostPopularMovies', async (req, res) => {
            const result = await MostPopularMoviesCategoriCollection.find({}).toArray();
            res.send(result);
        })


        app.post('/allmovies', async (req, res) => {
            const allmovies = req.body;
            const result = await allMoviesCollection.insertOne(allmovies);
            res.send(result);
        })


        app.get('/allmovies/search', async (req, res) => {
            const searchfield = req.query.original_title
            const result = allMoviesCollection.find({ original_title: { $regex: searchfield } })
            res.send(result)

        })

        app.get('/movies', async (req, res) => {
            const result = await allMoviesCollection.find({}).toArray();
            res.send(result);
        })

        // get movie by category
        app.get('/allmovie/:category', async (req, res) => {
            const allmovies = req.params.category;
            const getmovies = await allMoviesCollection.find({}).toArray();
            const result = await getmovies.filter(getmovie => getmovie.category == allmovies);
            res.send(result);
        })

        app.get('/movie/:id', async (req, res) => {
            const allmovies = req.params.id;
            const getmovies = await allMoviesCollection.find({}).toArray();
            const result = await getmovies.find(getmovie => getmovie.id == allmovies);
            res.send(result);
        })

        app.get('/comedies', async (req, res) => {
            const comedies = await ComediesCollection.find({}).toArray();
            res.send(comedies);
        })



        app.post('/uploadmovies', async (req, res) => {
            const add = req.body;
            const result = await adminuploadcollection.insertOne(add);
            res.send(result);
        });


        app.get('/uploadmovies', async (req, res) => {
            const add = req.body;
            const result = await adminuploadcollection.find(add).toArray();
            res.send(result);
        });

        //save user email and generate JWT token
        app.put('/user/:email', async (req, res) => {
            const email = req.params.email
            const user = req.body
            const filter = { email: email }
            const options = { upsert: true }
            const updateDoc = {
                $set: user,
            }
            const result = await usersCollection.updateOne(filter, updateDoc, options)
            console.log(result)

            const token = jwt.sign(user, process.env.ACCESS_TOKEN,
                { expiresIn: '1d' })
            console.log(token);
            res.send({ result, token })
        })


    }
    finally { }
}
run().catch(console.dir);
app.listen(port, () => {
    console.log(`listening on ${port}`);
})