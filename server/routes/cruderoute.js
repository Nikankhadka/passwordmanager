const {Router}=require("express");
const router=Router();
const authHandler=require("../controllers/authhandler");
const crudHandler=require("../controllers/crudhandler");


//any of the routes here should not be accessible without authentication



router.get("/",authHandler.isAuthenticated,crudHandler.getAccounts);

router.post("/",authHandler.isAuthenticated,crudHandler.addAccount);

router.patch("/:email",authHandler.isAuthenticated,crudHandler.updateAccount);






module.exports=router;
