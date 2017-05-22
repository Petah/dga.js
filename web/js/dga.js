dga = angular.module('dga', []);

dga.controller('IndexController', function ($scope) {
    $scope.logs = {};
    $scope.range = {
        task: null,
        progress: {},
    };
    $scope.matches = {};
    
    var socket = io();
    socket.on('tasks', function(tasks) {
        console.log('tasks');
        $scope.tasks = tasks;
        $scope.$apply();
    });
    socket.on('log', function(event) {
        var log = $.extend.apply(null, event.log);
        console.log('log', log);
//        console.log(log);
        $scope.matches[log['Best match']] = log['Best match'];
        $scope.range.progress[event.name] = [
            log['Seed'], log['Iteration'],
        ];
        $scope.$apply();
    });
    socket.on('task', function(task) {
        $scope.range.task = task;
    });
});

dga.directive('task', function () {
    return {
        restrict: 'E',
        scope: {
            task: '=task',
        },
        templateUrl: 'task.html',
        link: function(scope, element, attributes) {
            scope.task = scope.task || {};
            
            var svg = d3.select(element.find('svg').get(0));
            
            var width = 1000;
            var height = 30;
            
            var x = d3.scale.linear()
            
            function update() {
                console.log(scope.task);
//                var data = d3.values(scope.data.progress);
                svg.attr('viewBox', '0 0 ' + width + ' ' + height)
                x.range([0, width]);
                x.domain([0, scope.task.length]);
////                console.log('-----');
////                console.log(d3.max(data, function(d) {
////                    console.log(d);
////                    return d[1];
////                }));
////                console.log(x.domain());
////                console.log('#####');
//                
//                var bars = svg.selectAll('.range-data')
//                    .data(d3.values(data));
//
//                bars.enter()
//                    .append('rect')
//                    .attr('class', 'range-data range-bar');
//
//                svg.selectAll('.range-data')
////                    .style('opacity', function(d) {
////                        return d.average / 3;
////                    })
//                    .attr('x', function(d) {
//                        return x(d[0]);
//                    })
//                    .attr('width', function(d) {
//                        return x(d[1]) - x(d[0]);
//                    })
//                    .attr('y', 0)
//                    .attr('height', height);
//
//                bars.exit().remove();
            };
            
            scope.$watch('data', update, true);
        },
    };
});
