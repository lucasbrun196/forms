import express from "express";
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser';
import Post from './models/Post.js';


const app = express()

//config

    //template engine
    //com isso nos falamos para o express que queremos usar o handlebars como template engine
    app.engine('handlebars', engine({
        defaultLayout: 'main',
        runtimeOptions: {
          allowProtoPropertiesByDefault: true,
          allowProtoMethodsByDefault: true,
        },
      }));
    app.set('view engine', 'handlebars');
    app.set('views', './views');

    //body-parser
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())


//ROTAS

/*
na rota / 
Post.findAll() --> pega todos os Posts do banco de dados
se der certo o then recebe o parametro posts que são os posts
{posts: posts} passa para a home_view os posts
{order: [['id', 'DESC']]} ORDENA DO MAIS NOVO PARA O MAIS ANTIGO
*/
app.get('/', function(req, res){
    Post.findAll({order: [['id', 'DESC']]}).then(function(posts){
        console.log(posts);  // Verifique os dados no console
        res.render('home', {posts: posts});
    }).catch(function(error) {
        console.error('Erro ao buscar posts:', error);
    });
});

app.get('/cad', function(req, res){
    res.render('formulario')
})

app.post('/add', function(req, res){
    Post.create({
        titulo: req.body.title,
        conteudo: req.body.content
    }).then(function(){
        res.redirect('/')
    }).catch(function(error){
            res.send('Houve um erro -->> ' + error)
    })
})

//o metodo get envia dados pela url
//o metodo post não pode ser acessado por uma url

app.get('/deletar/:id', function(req, res){
    Post.destroy({where: {'id': req.params.id }}).then(function(){
        res.send('Postagem deletada')
    }).catch(function(error){
        res.send('Essa postagem não existe')
    }) 
})


app.listen(8081, function(){
    console.log("Servidor rodando")
})