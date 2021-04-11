const { response, request } = require('express');
const Guide = require('../models/guide'); //double dot means go out of the current folder


//Controller logic

//function to do the logic of the index page
const guide_index = (request, response) => {
    Guide.find().sort({createdAt: -1}) //means descending order
        .then((result) => {
            response.render('guides/index', {title: 'All Guides', blogs: result})
        })
        .catch((error) => {
            console.log(error);
        })
}


const guide_details = (request, response) => {
    const id = request.params.id;
    Guide.findById(id)
    .then(result => {
        response.render('guides/details', {guide: result, title: 'Guide Details'})
    })
    .catch(error => {
        console.log(error)
    });
}

const guide_create_get = (request, response) => {
    response.render('guides/create', { title: 'Create a new guide'});
}

const guide_create_post = (request, response) => {
    const guide = new Guide(request.body);
    guide.save()
    .then(result => {
    response.redirect('/');
    })
    .catch((error) => {
        response.statu(404).render('404', { title: 'Blog Not Found'})
    })
}

const guide_delete = (request, response) =>{
    const id = request.params.id;

  Guide.findByIdAndDelete(id)
  .then(result => {
    response.json({redirect: '/'})
  })
  .catch(error => {
      console.log(error);
  })
} 

module.exports = {
    guide_index,
    guide_details,
    guide_create_get,
    guide_create_post,
    guide_delete,
}