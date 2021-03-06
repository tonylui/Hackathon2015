var fb_username = "";

function updateUserInfo() {
	    	var userInfo = document.getElementById('user-info');
		    console.log('Welcome!  Fetching your information.... ');
		    FB.api('/me', function(response) {
		      console.log('Successful login for: ' + response.name);
			  userInfo.innerHTML = '<div class=\'roundImage\' ><img src="https://graph.facebook.com/' + response.id + '/picture">' + response.name + '</div>';
			  loginFunction(response.id);
		      document.getElementById('status').innerHTML = 'Thanks for logging in, ' + response.name + '!';

                fb_username = response.id;
		    });
	  }
  function updateFriendInfo(){
	    FB.api('/me/friends', function(response) {
	    	var list_of_friends = document.getElementById('list_of_friends');

	    	var friend_data = response.data;
	    	var friend_names = '';
	    	for (var i = 0; i < friend_data.length; i++) {
	    		friend_names += "<div id='name_'"+i+"'>" + friend_data[i].name + "</div>";
	    	}
	        list_of_friends.innerHTML = '<h2>List of friend names</h2>' + friend_names;
	        console.log(response.data);
	        console.log(friend_names);
	     	});
    }
 function updateSearchOptions(event){
	 console.log(event.which);
	 var key=event.which;
	 var search_form = document.getElementById('search_form');
	 var search_input = document.getElementById('search_input');
	 var options = getListOfOptions(search_input.value+key);
	 for (var i = 0; i < options.length; i++){
		 addNewInputToSearchForm(search_form, 'name'+i);
	 }
	 
	 $(".autocomplete").autocomplete(options);
 	 	 
 }   
 function addNewInputToSearchForm(search_form, name){
	 newField = document.createElement("input");
	 newField.setAttribute("name", name);
	 newField.setAttribute("type", "text");
	 newField.setAttribute("class", "autocomplete");
	 search_form.appendChild(newField);
 }
 function getListOfOptions(match){
	 var list_of_friends = document.getElementById('list_of_friends');
	 var result = [];
	 for (var i = 0; i < list_of_friends.length; i++){
		 if (list_of_friends[i].contains(match)){
			 result[result.length] = list_of_friends[i];
		 }
	 }
	 return result;
 }
 