module.exports = function(app) {
    var jwt = require("jsonwebtoken");
    var Usuario = app.models.usuario;
    var controller = {};

    controller.autenticar = function(req, res) {
        Usuario.findOne(req.body, function(err, usuario) {
            if (err) {
                res.json({
                    type: false,
                    data: "Error occured: " + err
                });
            } else {
                if (usuario) {
                    res.json({
                        type: true,
                        data: usuario,
                        token: usuario.token
                    });
                } else {
                    res.json({
                        type: false,
                        data: "Username/Password incorreto!"
                    });
                }
            }
        });
    };

    controller.cadastrar = function(req, res) {
        Usuario.findOne(req.body, function(err, user) {
            if (err) {
                res.json({
                    type: false,
                    data: "Ocorreu um erro ao cadastrar: " + err
                });
            } else {
                if (user) {
                    res.json({
                        type: false,
                        data: "Este usuário já existe!"
                    });
                } else {
                    Usuario.create(req.body).then(
                        function(usuario) {
                            usuario.token = jwt.sign(usuario, "pro fazenda dando certo na vida");
                            usuario.save().then(
                                function(user) {
                                    res.json(user);
                                },
                                function() {
                                    res.status(404).json(erro);
                                }
                            );
                        },
                        function(erro) {
                            res.status(403).json(erro);
                        }
                    );
                }
            }
        });
    };

    controller.eu = function(req, res) {
        Usuario.findOne({
            token: req.token
        }).exec().then(
            function(user) {
                res.json({
                    type: true,
                    data: user
                });
            },
            function(error) {
                res.json({
                    type: false,
                    data: "Error occured: " + error
                });
            }
        );
    };

    return controller;
};
