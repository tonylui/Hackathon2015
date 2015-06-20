var freeDraggerModule = angular.module('freeDragger', []);

freeDraggerModule.directive('messageta', ['$document', function ($document) {
    return {
        link: function (scope, element, attribute) {

            element.css({
                color: 'blue'
            });

            element.on('keyup', function (event) {
                // Prevent default dragging of selected content
                event.preventDefault();
                //console.log(element.val());

            });

            function mousemove(event) {
                y = event.pageY - startY;
                x = event.pageX - startX;
                element.css({
                    top: y + 'px',
                    left: x + 'px'
                });
            }

            function mouseup() {
                $document.off('mousemove', mousemove);
                $document.off('mouseup', mouseup);
                function persistPos() {
                    console.log(y);
                    //$http.post("url?x="+x+"&y="+y);
                }

                persistPos();
            }


        }
    }
}]);


freeDraggerModule.directive('draggable', ['$document', function ($document) {
    return {
        //width: {{message.w}} px; height: 100px
        //ng-model="message" style="background-color: aqua;"
        //template: '<div ng-model="dragmodel"></div>',
        //replace: true,
        //scope: {dragmodel: '='},
        link: function (scope, element, attribute) {
            console.log(scope);
            console.log(scope.message);
            console.log(scope.message.x);

            var startX = 0, startY = 0;

            element.css({
                position: 'absolute',
                border: '1px solid red',
                backgroundColor: 'lightgrey',
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

                persistPos();
            }


        }
    }
}]);
