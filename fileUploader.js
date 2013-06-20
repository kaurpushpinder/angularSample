app.directive('customUploader', function(){
    return {
       restrict: 'E',
       scope: {},
       template: '<div class="custom-uploader-container">Drop Files Here<input type="file" class="custom-uploader-input"/><button ng-click="upload()" ng-disabled="notReady">Upload</button></div>',
       controller: function($scope, $customUploaderService) {
          $scope.notReady = true;
          $scope.upload = function() {
             //scope.files is set in the linking function below.
             $customUploaderService.beginUpload($scope.files);
          };
          $customUploaderService.onUploadProgress = function(progress) {
             //do something here.
          };
          $customUploaderService.onComplete = function(result) {
             // do something here.
          };
       },
       link: function(scope, elem, attr, ctrl) {
          fileInput = elem.find('input[type="file"]');
          fileInput.bind('change', function(e) {               
               scope.notReady = e.target.files.length > 0;
               scope.files = [];
               for(var i = 0; i < e.target.files.length; i++) {
                   //set files in the scope
                   var file = e.target.files[i];
                   scope.files.push({ name: file.name, type: file.type, size: file.size });
               }
          });
       }
});
