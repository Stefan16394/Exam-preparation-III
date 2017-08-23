const Film = require('../models/Film');

module.exports = {
	index: (req, res) => {

		Film.find().then(film=>
        {
            res.render('film/index',{'films':film});
        });

    },
    createGet: (req, res) => {
        res.render('film/create');
	},

	createPost: (req, res) => {
        let filmArgs=req.body;
        if(!filmArgs.name || !filmArgs.director || !filmArgs.genre || !filmArgs.year) {

            res.redirect('/');
            return;
        }
        Film.create(filmArgs).then(films=>
        {
            res.redirect('/');
        })
	},

	editGet: (req, res) => {
        let id=req.params.id;
        Film.findById(id).then(films=>
            {
                if(!id){
                    res.redirect('/');
                    return;
                }
                res.render('film/edit',films)

            }
        );
	},
	editPost: (req, res) => {
        let film=req.body;
        let id=req.params.id;
        Film.findByIdAndUpdate(id,film).then(film=>{
            res.redirect('/');
        })
	},
	deleteGet: (req, res) => {
        let id=req.params.id;
        Film.findById(id).then(film=>
            {
                if(!id){
                    res.redirect('/');
                    return;
                }
                res.render('film/delete',film)
            }
        );
	},
	deletePost: (req, res) => {

            let id=req.params.id;
            Film.findByIdAndRemove(id).then(film=>{
                res.redirect('/');
            })

	}
};