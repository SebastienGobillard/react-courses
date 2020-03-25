const router = require('express').Router();
const User = require('../model/User');
const Lists = require('../model/Lists');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ObjectId = require('mongodb').ObjectId
const { registerValidation, loginValidation } = require ('../validation');


router.post('/register', async (req, res) => {
    console.log('req body user', req.body.user);
    // VALIDATE DATE BEFORE CREATE USER
    // const { error } = registerValidation(req.body.user);
    // if(error){
    //     console.log('manque champs');
    //     return res.status(400).send(error.details[0].message);
    // }

    //CHECKING IF USER ALREADY IN DATABASE
    const emailExist = await User.findOne({ email: req.body.user.email });
    if (emailExist) {
        console.log('mail existe');
        return res.status(400).send('Email already exists');
    }

    //PASSWORD HASH WITH BCRYPTJS
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.user.password, salt);



    //CREATE A NEW USER
    const user = new User({
        name: req.body.user.name,
        surname: req.body.user.surname,
        email: req.body.user.email,
        password: hashedPassword,
    })
        //CREATE AND ASSIGN A TOKEN
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    try{
        console.log('on lance savedUser');
        const savedUser = await user.save();
        res.header('auth-token', token);
        res.send({token, user: user._id}); 

    } catch(err){
        res.status(400).send(err);
    }
});

    //LOGIN
router.post('/login', async (req, res) => {
    console.log('login', req.body.user);
    //VALIDATE DATE BEFORE LOGIN
    // const { error } = loginValidation(req.body.user);
    // if(error){
    //     console.log('verif echouée');
    // return res.status(400).send(error.details[0].message);
    // }

    //CHECKING IF EMAIL EXISTS
    const user = await User.findOne({ email: req.body.user.email });
    if (!user) return res.status(400).send('Email or password is wrong');

    //CHECKING IF PASSWORD IS CORRECT
    const validPass = await bcrypt.compare(req.body.user.password, user.password);
    if (!validPass) return res.status(400).send('Invalid password');

    //CREATE AND ASSIGN A TOKEN
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send({token, _id: user._id});

})

//Enregistrement des favoris de l'user
router.post('/favlist/:id', async(req, res) => {
    console.log('dans la route favlist', req.params,  'et body', req.body.favlist);
    const newUser = await User.updateOne({ _id: req.params.id}, {$set: {favlist: req.body.favlist}});
    const user = await User.findOne({_id: req.params.id})
    console.log('nouvelle favlist', user.favlist);
})

//Ajouter une nouvelle liste
router.post('/newlist/:id', async(req, res) => {
    console.log('dans la route newlist', req.params.id, 'et le contenu', req.body)
    const list = new Lists ({
        userId: req.params.id,
        title: req.body.listName,
        racks: req.body.racks,
        products: req.body.products,
    });
    try{
        console.log('on lance savedList');
        const savedList = await list.save();
        res.send({list}); 
    } catch(err){
        res.status(400).send(err);
    }
})


router.get('/getfavlist/:id', async(req,res) => {
    console.log('dans la route get favlist');
    const user = await User.findOne( {_id: req.params.id});
    console.log('voila la favlist demandée', user.favlist);
    res.send(user.favlist)
} )
        


//Récupérer les infos des listes sauvegardées
router.get('/getlist/:id', async(req, res) => {
    const getlist = await Lists.find({ userId: req.params.id });
    console.log('retour fait par getlist', getlist, 'pour l\'user', req.params.id);
    
    
    let tasks = {};
    let columns = {};
    let columnOrder = [];
    
    
    


        for(let x = 0; x < getlist.length; x ++) {
            
            let taskIds = [];
            getlist[x].products.forEach(product => {
                let key = 'task-' + product.id;
                tasks[key] = {id: key, content: product.product};
                taskIds.push(key)
             
            });

            let key = 'column-' + getlist[x].id;
            columns[key] = {id: key, title: getlist[x].title, taskIds }
            columnOrder.push(key);
             
        }
        // console.log('testtasks', tasks, 'testcolumns', columns, 'testcolumnOrder', columnOrder);
        let response = {
            tasks,
            columns,
            columnOrder
        }
       
        console.log('reponse', response, 'les produits', tasks)    

        res.send({response, columnOrder});
 
})

//récupérer les infos d'une liste par son id 
router.get('/findlist/:id', async (req, res) => {
    let listId = req.params.id.substring(7);
    const getlist = await Lists.findOne({_id: listId })
    userId = getlist.userId;
    console.log('user id', userId)
    console.log('liste demandée',getlist)
    //Après avoir trouvé la liste on récupère la liste des favoris de l'user.
    const userfavs = await User.findOne({ _id: ObjectId(userId)});
    console.log("la liste des favoris de l'user", userfavs.surname, "est celle ci", userfavs.favlist);
    //Je parcours les produits composant la liste demlandée
    for (let x = 0; x < getlist.products.length; x ++) {
        //Je vérifie leur nom et leur propriété fav
        console.log('test du name',getlist.products[x].product, getlist.products[x].fav);
        //Si la liste des favs de l'user est > 0
            if(userfavs.favlist.length > 0){
                // Je la passe en revue
                for(let y = 0; y < userfavs.favlist.length; y ++){
                    // Je compare les noms des produits passés en maj
                    if(getlist.products[x].product.toUpperCase() == userfavs.favlist[y].product.toUpperCase()){
                        //Si ce sont les mêmes, je m'assurer que la propriété fav est true
                        console.log("l'item", getlist.products[x].product , "est dans les fav");
                        getlist.products[x].fav = true;
                        console.log('donc voici la nouvelle propriété', getlist.products[x].product.toUpperCase(), getlist.products[x].fav)
                    } else {
                        //Sinon je m'assure que fav est false
                        console.log("l'item n'est pas dans les fav");
                        getlist.products[x].fav = false;
                        console.log("log donc on s'assure que c'est bien false pour", getlist.products[x].product, getlist.products[x].fav );
                    }
                }
            }else {
                //Si la longueur de la liste de fav de l'user est 0, il n'a pas de favoris
                //Je passe fav en false
                getlist.products[x].fav = false;
            }
    };
    console.log('sortie du for voici la nouvelle liste', getlist);
    let updatedList = await Lists.findOneAndUpdate({_id: listId}, getlist, {upsert:true})
    const postupdatedList = await Lists.findOne({_id: listId })
    console.log('nouvelle query', postupdatedList)
    res.send(postupdatedList);
})

 
//Obtenir les infos de l'user 
router.get('/getuser/:id', async (req, res) => {
    console.log('dans auth getUser req:', req.params);
    const user = await User.findOne({ _id: req.params.id});
    console.log(user);
    if (!user){

    return res.status(400).send('Email or password is wrong');
    }
    const connectedUser = {
        name: user.name,
        surname: user.surname,
        email: user.email,
        favlist: user.favlist
    }
    res.send(connectedUser);

})

module.exports = router;