function productsIndex(req, res) {
  res.send('We are at bse route of products');
}
function productsDetails(req, res) {
  res.send('We are at details page of products');
}
module.exports = { productsIndex, productsDetails };
