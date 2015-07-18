dga = angular.module('dga', []);

dga.controller('IndexController', function ($scope) {
    $scope.logs = {};
    $scope.range = {
        task: null,
        progress: {},
    };
    $scope.matches = {};
    
    var socket = io();
    socket.on('log', function(event) {
        var log = $.extend.apply(null, event.log);
        console.log(log);
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

dga.directive('range', function () {
    return {
        scope: {
            data: '=data',
        },
        templateUrl: 'range.html',
        link: function(scope, element, attributes) {
            scope.data = scope.data || {};
            
            var svg = d3.select(element.find('svg').get(0));
            
            var width = 1000;
            var height = 30;
            
            var x = d3.scale.linear()
            
            function update() {
                var data = d3.values(scope.data.progress);
                svg.attr('viewBox', '0 0 ' + width + ' ' + height)
                x.range([0, width]);
                x.domain([0, scope.data.task ? scope.data.task.length : d3.max(data, function(d) {
                    return d[1];
                })]);
//                console.log('-----');
//                console.log(d3.max(data, function(d) {
//                    console.log(d);
//                    return d[1];
//                }));
//                console.log(x.domain());
//                console.log('#####');
                
                var bars = svg.selectAll('.range-data')
                    .data(d3.values(data));

                bars.enter()
                    .append('rect')
                    .attr('class', 'range-data range-bar');

                svg.selectAll('.range-data')
//                    .style('opacity', function(d) {
//                        return d.average / 3;
//                    })
                    .attr('x', function(d) {
                        return x(d[0]);
                    })
                    .attr('width', function(d) {
                        return x(d[1]) - x(d[0]);
                    })
                    .attr('y', 0)
                    .attr('height', height);

                bars.exit().remove();
            };
            
            scope.$watch('data', update, true);
        },
    };
});
