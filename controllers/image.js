const Clarifai = require('clarifai');

const app = new Clarifai.App({apiKey: 'e1d7e8aea2fa49b39bc8b2bd24386c1b'}); 

const handleApiCall = (req, res) => {
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.imageUrl)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('unable to call api'));
}

const handleImage = (db) => (req, res) => {
    const {id} = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'));
}

module.exports = {
    handleImage,
    handleApiCall
}