var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/housesDB');
var houses = db.get('houses');
var registeredUsers = db.get('users');

// /* this is a get request to show the homepage
router.get('/', function(req, res, next){
  houses.find({}, function(err, house) {
    res.render('home', {allHouses: house})
  });
});

// this is a get request to show the /new page
router.get('/new', function(req, res,  newxt) {
  res.render('new');
});

// this is a post request to get the form from the new page into the database
// the form action on the '/new' page is set to "/new" and the method is set to "post"
router.post('/new', function(req, res, next) {
  houses.insert({image: req.body.image,
    address: req.body.address,
    city: req.body.city,
    subdivision: req.body.subdivision,
    price: Number(req.body.price), 
    squareFeet: Number(req.body.squareFeet),
    stories: req.body.stories,
    lotSize: req.body.lotSize,
    yearBuilt: req.body.yearBuilt,
    garages: req.body.garages,
    pool: req.body.pool,
    masterMain: req.body.masterMain,
    bedrooms: req.body.bedrooms, 
    fireplace: req.body.fireplace,
    sprinkler: req.body.sprinkler,
    waterfront: req.body.waterfront,
    greenbelt: req.body.greenbelt,
    mediaRoom: req.body.mediaRoom,
    study: req.body.study,
    communityPool: req.body.communityPool,
    golfCommunity: req.body.golfCommunity,
    tennisCourts: req.body.tennisCourts,
    fitnessCenter: req.body.fitnessCenter,
    lake: req.body.lake,
    clubHouse: req.body.clubHouse,
    bikeJog: req.body.bikeJog,
    communityPark: req.body.communityPark,
    schoolDisctrict: req.body.schoolDistrict,
    description: req.body.describe,
    hoaDuration: req.body.hoaDuration,
    hoaAmount: req.body.hoaAmount,
    taxes: req.body.taxes,
    DOM: Number(new Date()),
    pricePerSqFt: Number(req.body.price / req.body.squareFeet),
    taxRate: req.body.taxRate,
    county: req.body.county,
    elemSchool: req.body.elemSchool,
    middleSchool: req.body.middleSchool,
    highSchool: req.body.highSchool,
    bathrooms: req.body.bathrooms}, function(err, house) {
    res.redirect('/');
  })
});



// this is a get request to the show page for a particular house
// router.get('/:id/show', function(req, res, next) {
//   houses.findOne({_id: req.params.id}, function(err, house){
//     res.render('show', {theHouse: house});
//   })
// })


// this is a get request to the show2 page for a particular house
router.get('/:id/show2', function(req, res, next) {
  houses.findOne({_id: req.params.id}, function(err, house){
    res.render('show', {theHouse: house});
  })
})

// this is a get request to render the edit page
router.get('/:id/edit', function(req, res, next) {
  houses.findOne({_id: req.params.id}, function(err, house) {
    res.render('edit', {theHouse: house});
  })
});


// this is a post request to edit the house information in the database
// the form action on the '/edit' page is set to 'thehouseId/edit' and the method is set to 'post'
router.post('/:id/edit', function(req, res, next) {
  houses.update(req.params.id, {
  image: req.body.image, 
  address: req.body.address, 
  city: req.body.city, 
  subdivision: req.body.subdivision,
  price: Number(req.body.price), 
  squareFeet: Number(req.body.squareFeet), 
  bedrooms: req.body.bedrooms,
  stories: req.body.stories,
  lotSize: req.body.lotSize,
  yearBuilt: req.body.yearBuilt,
  garages: req.body.garages,
  pool: req.body.pool,
  masterMain: req.body.masterMain,
  fireplace: req.body.fireplace,
  sprinkler: req.body.sprinkler,
  waterfront: req.body.waterfront,
  greenbelt: req.body.greenbelt,
  mediaRoom: req.body.mediaRoom,
  study: req.body.study,
  communityPool: req.body.communityPool,
  tennisCourts: req.body.tennisCourts,
  golfCommunity: req.body.golfCommunity,
  fitnessCenter: req.body.fitnessCenter,
  clubHouse: req.body.clubHouse,
  lake: req.body.lake,
  bikeJog: req.body.bikeJog,
  communityPark: req.body.communityPark,
  schoolDisctrict: req.body.schoolDistrict,
  description: req.body.describe,
  hoaDuration: req.body.hoaDuration,
  hoaAmount: req.body.hoaAmount,
  taxes: req.body.taxes,
  taxRate: req.body.taxRate,
  DOM: Number(new Date()),  
  pricePerSqFt: Number(req.body.price / req.body.squareFeet),
  county: req.body.county,
  elemSchool: req.body.elemSchool,
  middleSchool: req.body.middleSchool,
  highSchool: req.body.highSchool,
  bathrooms: req.body.bathrooms}, function(err, house){
      res.redirect('/' + req.params.id + '/show2');
    })
})

// this is a post request to delete the house information from the database
router.post('/:id/delete', function(req, res, next) {
  houses.remove({_id: req.params.id}, function(err, house){
    res.redirect('/');
  })
})


// this is a get request to display the login page
router.get('/login', function(req, res, next) {
    res.render('login');
})

// this is a get request to display the search page
// router.get('/search', function(req, res, next){
//   res.render('search2');
// })



// this is a post request to search the database based on user search criteria
router.post('/search', function(req, res, next){
  // console.log(req.body.city);
  houses.find({ $query: {$and: [ 
  // address: req.body.address, 
  // {city: req.body.city},
  {$or: [ { city: req.body.city }, { city: req.body.city[0] }, { city: req.body.city[1] }, { city: req.body.city[2] }, { city: req.body.city[3] },
  { city: req.body.city[4] }, { city: req.body.city[5] }, { city: req.body.city[6] },
  { city: req.body.city[7] }, { city: req.body.city[8] }, { city: req.body.city[9] },
  { city: req.body.city[10] }, { city: req.body.city[11] }, { city: req.body.city[12] },
  { city: req.body.city[13] }, { city: req.body.city[14] }, { city: req.body.city[15] },
  { city: req.body.city[16] }, { city: req.body.city[17] }, { city: req.body.city[18] },
  { city: req.body.city[19] }, { city: req.body.city[20] }, { city: req.body.city[21] },
  { city: req.body.city[22] }, { city: req.body.city[23] }, { city: req.body.city[24] },
  { city: req.body.city[25] } ]}, 
  // subdivision: req.body.subdivision,
  {price: {$gte: Number(req.body.minprice), $lte: Number(req.body.maxprice)}},
  {squareFeet: {$gte: Number(req.body.minsqft), $lte: Number(req.body.maxsqft)}}, 
  {bedrooms: {$gte: req.body.bedsmin}},
  {garages: {$gte: req.body.garages}},
  {stories: {$lte: req.body.stories}},
  // {pool: {$eq: req.body.pool}},
  // {masterMain: {$eq: req.body.masterMain}},
  // fireplace: req.body.fireplace,
  // sprinkler: req.body.sprinkler,
  // waterfront: req.body.waterfront,
  // greenbelt: req.body.greenbelt,
  // mediaRoom: req.body.mediaRoom,
  // study: req.body.study,
  // // communityPool: req.body.communityPool,
  // // tennisCourts: req.body.tennisCourts,
  // // golfCommunity: req.body.golfCommunity,
  // // fitnessCenter: req.body.fitnessCenter,
  // // clubHouse: req.body.clubHouse,
  // // lake: req.body.lake,
  // // bikeJog: req.body.bikeJog,
  // // communityPark: req.body.communityPark,
  // schoolDisctrict: req.body.schoolDistrict,
  // {yearBuilt: {$gte: req.body.yearBuilt}},
  {bathrooms: {$gte: req.body.bathsmin}}]}, $orderby: { price : Number(-1) }
   
}, function(err, house){
    res.render('searchResults', {allHouses: house});
  })
})




// this is a post method for the login page, this gets the username and password
// router.post('/login', function(req, res, next) {
//   registeredUsers.insert({username: req.body.username,
//     password: req.body.password}, function(err, data){
//       res.redirect('login');
//     })
// })


// this is a get request to display the neighborhood page, this is set up, but on hold for now
// router.get('/:subdivision', function(req, res, next) {
//    houses.findOne({_id: req.params.id}, function(err, house){
//     res.render('neighborhood', {theHouse: house});
//   })
// })






module.exports = router;
