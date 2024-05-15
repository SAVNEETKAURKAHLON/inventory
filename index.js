import express from "express";
import bodyParser from "body-parser";

const app =express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//storing memory 

let inventory = [
    {
        id:1,
        name:"tomatoes",
        quantity:3,
        company:"abc ltd"
    },
    {
        id:2,
        name:"cheese",
        quantity:2,
        company:"example ltd"
    },

];

let lastItemId = 2;

app.get("/inventory", (req,res) => {
    console.log(inventory)
;    res.json(inventory);
})

app.get("/inventory/:id", (req,res) => {
    const product = inventory.find((p) => p.id === parseInt(req.params.id));
    if (!product){
        console.log("this product do not exist");
    }
    res.json(product);
})

app.post("/inventory",(req,res) => {
    let newItemId = lastItemId+1;
    const item = {
        id: newItemId,
        name: req.body.name,
        quantity: req.body.quantity,
        company: req.body.company
    }
    lastItemId = newItemId;
    inventory.push(item);
    res.json(item);
})

app.patch("/inventory/:id", (req,res) => {
    const product = inventory.find((p) => p.id === parseInt(req.params.id));

    if(req.body.name) product.name = req.body.name;
    if(req.body.quantity) product.quantity = req.body.quantity;
    if(req.body.company) product.company = req.body.company;

    res.json(product);
})

app.delete("/inventory/:id", (req, res) => {
    const index = inventory.findIndex((p) => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: "Post not found" });
  
    inventory.splice(index, 1);
    res.json({ message: "Item deleted" });
  });

app.listen(port, () => {
    console.log(`This is api port: ${port}`);
  });