requirejs([
    'modernizr',
    'jquery',
    'menuController',
    'loginController',
    'PasswordController',
    'UpScrollController'
  ],function(
    modernizr, 
    jquery,
    menuController,
    loginController,
    PasswordController,
    UpScrollController
  ){
    $(document).ready(function(){
      new menuController();
      new loginController();
      new UpScrollController();
      new PasswordController();
    });
  });