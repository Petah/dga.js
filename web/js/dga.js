dga = angular.module('dga', []);

dga.controller('IndexController', function ($scope) {
    $scope.logs = {};
    
    var socket = io();
    socket.on('log', function(event) {
        $scope.logs[event.name] = $.extend.apply(null, event.log);
        $scope.$apply();
    });
});
