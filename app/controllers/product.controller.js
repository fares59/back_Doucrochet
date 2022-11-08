const ProductService = require("../services/product.service");

const findAll = async (req,res) => {
   ProductService.findAll().then(response => res.send(response)).catch(err => res.send(err));
};

const findAllNouveau = async (req,res) => {
    // recupere tout les produit
    ProductService.findAll().then(response => { 
        // les compare entre eux, avec leur date ,pour les trier
        const result = response.sort(function(a,b){
            return new Date(b.creation_date)-new Date(a.creation_date)
        }) 
         //return les 7 dernier produit créer
            res.send(result.slice(0, 10))
        }).catch(err => res.send(err));
    };

const create = (req, res) => {
    ProductService.create(req.body).then((data) => {
        res.status(201).send(data)
    }).catch((err) => {
        res.status(500).send({
            message: err.message || 'Some error occurred while creating the Product.',
        });
    })
}

const deleteProduct = (req, res) => {
    ProductService.deleteProduct(req.params).then((data) => {
        res.status(201).send(data)
    }).catch((err) => {
        res.status(500).send({
            message: err.message || 'Some error occurred while creating the Product.',
        });
    })
}
const findOne = (req, res) => {
    ProductService.findOneProduct(req.params.id).then((data) => {
      res.send(data)
    }).catch((err)=>{
        res.status(500).send({
            message : "not found"
        })
    });
}

module.exports = {findAll, findOne, create, findAllNouveau, deleteProduct};



