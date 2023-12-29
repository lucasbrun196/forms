import { Sequelize } from "./db.js";
import { sequelize } from "./db.js";

const Post = sequelize.define('postagens', {
    titulo: {
        type: Sequelize.TEXT
    },
    conteudo: {
        type: Sequelize.TEXT
    }
});

// Post.sync({ force: true })

export default Post;
