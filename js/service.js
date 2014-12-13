requirejs([
    'modernizr',
    'jquery',
    'menuController',
    'serviceDetailsController',
    'cardController',
    'loginController',
    'PasswordController',
    'UpScrollController'
  ],function(
    modernizr, 
    jquery, 
    menuController, 
    serviceDetailsController,
    cardController,
    loginController,
    PasswordController,
    UpScrollController
  ){
  $(document).ready(function(){
    new menuController();
    new serviceDetailsController();
    new cardController();
    new loginController();
    new UpScrollController();
    new PasswordController();

  });
});