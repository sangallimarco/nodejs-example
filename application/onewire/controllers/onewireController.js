var pongular = require('pongular').pongular;

pongular.module('app.onewire')
    .factory('OnewireCtrl',
    function(OnewireService) {

        return {
            get: function(req, res){
                OnewireService.read().then(
                    function (value) {
                        var data = {
                            value: value,
                        };

                        //Socket.io send immediately
                        //req.io.emit('gpio.changed', data);
                        res.status(200).json(data);
                    },
                    function (ret) {
                        res.status(500).json({
                            error: 'error while reading temp'
                        });
                    }
                );
            }
        };
    }
);