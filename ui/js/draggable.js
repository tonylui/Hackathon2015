var freeDraggerModule = angular.module('freeDragger', []);

freeDraggerModule.directive('draggable', ['$document', function ($document) {
    return {
        link: function (scope, element, attribute) {
            //console.log(scope.message);
            //console.log(scope.message.x);

            var startX = 0, startY = 0;

            element.css({
                position: 'absolute',
                cursor: 'pointer',
                width: scope.message.width + 'px',
                height: scope.message.height + 'px',
                top: scope.message.y + 'px',
                left: scope.message.x + 'px'
            });

            element.on('mousedown', function (event) {
                // Prevent default dragging of selected content
                //event.preventDefault();
                startX = event.pageX - scope.message.x;
                startY = event.pageY - scope.message.y;
                $document.on('mousemove', mousemove);
                $document.on('mouseup', mouseup);
            });

            function mousemove(event) {
                scope.message.y = event.pageY - startY;
                scope.message.x = event.pageX - startX;
                element.css({
                    top: scope.message.y + 'px',
                    left: scope.message.x + 'px'
                });
            }

            function mouseup() {
                $document.off('mousemove', mousemove);
                $document.off('mouseup', mouseup);
                function persistPos() {
                    console.log(scope.message.y);
                    //$http.post("url?x="+x+"&y="+y);
                }

                scope.persistMessage(scope.message);
            }


        }
    }
}]);
