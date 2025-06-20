import express from "express";
import routerProduct from './router/product.router.js'

const app = express();
app.use(express.json());
const PORT = 8080;


// Router
app.use('/api', routerProduct);


app.listen(PORT, () => {
    console.log(`Server run on port: ${PORT}`);
})





