const express = require('express');
const app = express()
app.use(express.json());

let products = [
    {
        id: 1,
        name: "Corsair HS45",
        price: 4500,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8gWBYEsEc-BIBkLfkTItnNdjABTkmYTqibZh4E10XHg&s=10",
        desc: "A high Quality Gaming.",
    },
    {
        id: 2,
        name: "RTX 3060", 
        price: 93000,
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsI-f1pxbsXODAbY_lNzCKkmK_v9D-sVThyKq3GQTm_w&s=10",
        desc: "A powerfll Grahic Card from nvidia.",
    },
]


app.get("/products", (req, res) => {
  res.json(products);
}); 

app.post("/products", (req,res)=>{
    const newProduct = req.body;
    products.push (newProduct);
    res.status(201).json(newProduct);
});

app.delete("/products/:id", (req, res)=> {
    const {id} = req.params;
    products = products.filter((product) => product.id !== parseInt(id));
    res.status(204).send();
});

app.listen(5050, ()=>{
    console.log("Server is Running on PORT 5050");
});


