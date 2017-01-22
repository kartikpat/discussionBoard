import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import template from './login.html';
import { Users } from '../../api/users';

// Controller logic for User Login 
class LoginCtrl {

	constructor($scope, $reactive,$state) {
    'ngInject';

		$reactive(this).attach($scope);

    this.$state = $state;

    this.subscribe('users');

		this.helpers({
      // Method to return all registered users
			users() {
				return Users.find();
			}
		});
	}

  // Login/Register function logic to create a new user
  submit() {
    
    // Check if current user email already exists
    var checkUser = Users.findOne({ email: this.user.email});
        
        // Create user account if it doesn't exist.
        if(checkUser === undefined) {

        // Insert new user to collection 
        Users.insert(this.user);
        
        this.reset();

        window.alert("Successfully Registered");
         }

        // Else check if password is correct
        else {
         
            // If password is correct, redirect to Discussion Board
            if(checkUser.password === this.user.password) {

              document.email = this.user.email;
            
              this.$state.go('comments');
      
           }

           else {
            // Alert for wrong password
            window.alert("Wrong password");
           }
        }
    
   }
    // Method to reset the form fields
    reset() {
      this.user = {};
    }

}
   

const name = 'login';

// create a login module
export default angular.module(name, [
  angularMeteor,
  uiRouter
]).component(name, {
    template,
    controllerAs: name,
    controller: LoginCtrl
  })
    .config(config);

function config($stateProvider) {
  'ngInject';
$stateProvider
    .state('login', {
      url: '/',
      template: '<login></login>'    
    });
}