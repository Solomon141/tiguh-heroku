const express = require("express");
const app = express();
const cors = require("cors");

const con = require("./db_conn");
// Middlewares
app.use(cors());
app.use(express.json());

// Routes
const lookup_routes = require("./Routes/Lookup");
app.use("/lookup", lookup_routes);
const lookuptype_routes = require("./Routes/LookupType");
app.use("/lookuptype", lookuptype_routes);
const user_routes = require("./Routes/User");
app.use("/user", user_routes);
const compuser_router = require("./Routes/CompUser");
app.use("/compuser", compuser_router);
const order_routes = require("./Routes/Order");
app.use("/order", order_routes);
const Promoterorder_routes = require("./Routes/Orders/PromoterOrder");
app.use("/promoterorder", Promoterorder_routes);
const nested_routes = require("./Routes/Nested/Nested");
app.use("/nestedorder", nested_routes);
const ContactPerson_routes = require("./Routes/Orders/ContactPerson");
app.use("/ContactPerson", ContactPerson_routes);
const Product_routes = require("./Routes/Product");
app.use("/product", Product_routes);
const returndetail_route = require("./Routes/Orders/ReturnDetail");
app.use("/returndetail", returndetail_route);


app.listen(3010, (req, res) => {
  console.log("connected to port 3010");
});
