const {Router}=require("express");
const router=Router();
const authHandler=require("../controllers/authhandler");
const crudHandler=require("../controllers/Crudhandler");


//any of the routes here should not be accessible without authentication
//registration the middle ware function to route for protection
router.use(authHandler.isAuthenticated)


router.get("/",crudHandler.getAccounts);

router.post("/",crudHandler.addAccount);

router.patch("/:email",crudHandler.updateAccount);

router.delete("/:email",crudHandler.deleteAccount);




module.exports=router;
