const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid');
app.use(express.json());

let products = [
  { id: uuidv4(), name: 'Milk', description: 'Grocery', price: 30.00, category: 'Liquids' },
  { id: uuidv4(), name: 'Bread', description: 'Grocery', price: 25.56, category: 'Food' },
  { id: uuidv4(), name: 'GoodDay', description: 'Grocery', price: 10.5, category: 'Food' },
  { id: uuidv4(), name: 'Sprit', description: 'Grocery', price: 40, category: 'Soft Drinks' },
  { id: uuidv4(), name: 'Almonds', description: 'Grocery', price: 155.5, category: 'Dry Fruits' }
];
app.get('/products', (req, res) => {
  res.json(products);
});

app.get('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.filter(p => p.id === id)[0];

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

app.post('/products', (req, res) => {
  const { name, description, price, category } = req.body;

  if (!name || !description || !price || !category) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }


  const id =uuidv4();

  const newProduct = { id, name, description, price, category };

  products.push(newProduct);

  res.status(201).json(newProduct);
});

app.put('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, description, price, category } = req.body;

  const product = products.find(p => p.id === id);

  if (!product) {
    res.status(404).json({ error: 'Product not found' });
    return;
  }
  product.name = name || product.name;
  product.description = description || product.description;
  product.price = price || product.price;
  product.category = category || product.category;

  res.json(product);
});

app.delete('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    res.status(404).json({ error: 'Product not found' });
    return;
  }

  products.splice(index, 1);

  res.sendStatus(204);
});


app.listen(5050, () => {
  console.log('Server started on port 5050');
});
