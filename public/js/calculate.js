	var FINAL_RESULTS = 0;
	/**
	*	Calculate the match test
	*	@name1 The first name to compare
	*	@name2 the second name to compare with
	*/
	function calc_names(name1, name2){
		if(name1 == "" || name2 == "") return;
		name1 = name1.split(""); 
		name2 = name2.split("");
		let text = ("matches").split("");
		//create an array of characters in small cases and empty array of numbers to be used for calculating the results
		let arr_names = (name1 + "," + text + "," + name2).toLowerCase().split(",");
		let arr_numbers = [];
		//loop through the array of chars and take the current and store it in a temp variable
		for(let i = 0; i < arr_names.length; i++){
			let current = arr_names[i];
			let temp_count = 1;
			arr_names[i] = "";
			if(current == "") continue; //check the below comment
			//using the current value, compare it with the rest of the chars in the array, if it matches, 
			//then replace that value with empty char, then next time when you loop empty char, skip it and loop the following char
			//if it does not match any, then count remails 1 for that char and then continues for the rest if the chars in the array
			for(let j = 1; j < arr_names.length; j++){
				if(current == arr_names[j]){
					temp_count++;
					arr_names[j] = "";
				}
			}
			arr_numbers.splice(arr_numbers.length, 0,temp_count); //add to the array
		}
		calc_numbers(arr_numbers);
		console.log(FINAL_RESULTS);
		let result = FINAL_RESULTS;
		console.log(typeof(result));
		if(result >= 80) result = $("#name1").val() + " matches " + $("#name2").val() + " " + result + "%, good match";
		else result = $("#name1").val() + " matches " + $("#name2").val() + " " + result + "%";
		$("#result1").html(result);
	}
	function calc_numbers(arr){
		let array = arr.toString().split(',');
		for(let i = 0; i < array.length; i++){
			arr[i] = parseInt(array[i]);
		}
		//Base case of the iteration
		console.log(arr);
		if(arr.length < 3){
			let temp_result = '';
			for(let j = 0; j < arr.length; j++)
				temp_result += '' + parseInt(arr[j]);
				//console.log(temp_result); 
			FINAL_RESULTS = temp_result; 
			return; 
		} 	

		//use  the fact that if an array is odd, then you add the last value of the array, else if even then add everything together  
		let arr_type = ((arr.length % 2) == 0) ? "even" : "odd";
		let new_arr = [];
		//if even length, then break the array and reverse the other half and then add each two together
		//then form a new array
		if(arr_type == "even"){
			//break array in half and swap the other half then add them then create another array to store newly created numbers 
			let arr_len = (arr.length / 2);
			let temp_arr_1 = arr.splice(0, arr_len);
			let temp_arr_2 = arr.splice(0, arr_len).reverse();
			for(let i = 0; i < arr_len; i++){
				let temp = temp_arr_1[i] + temp_arr_2[i];
				//if the 2 values add up to form a value with length 2, then treat them as individula again
				if(temp > 9){
					let new_temp = temp.toString().split("");
					temp = new_temp[0];
					if(new_temp[1] != "undefined"){
						temp += ', ' + new_temp[1];
					}
				}
				new_arr.splice(i, 0, temp); //add the newly created array
			}
		}else if(arr_type == "odd"){
			//if odd length, then break the array and reverse the other half and then add each two together 
			//then add the last unmatched value to the end of the 2nd array 
			//then form a new array
			let arr_len = ((arr.length - 1) / 2)
			let temp_arr_1 = arr.splice(0, (arr_len + 1));
			let temp_arr_2 = arr.splice(0, (arr_len + 1)).reverse();
			for(let i = 0; i < temp_arr_2.length; i++){
				let temp = temp_arr_1[i] + temp_arr_2[i];
				//if the 2 values add up to form a value with length 2, then treat them as individula again
				if(temp > 9){
					let new_temp = temp.toString().split("");
					temp = new_temp[0];
					if(new_temp[1] != "undefined"){
						temp += ',' + new_temp[1];
					}
				}
				new_arr.splice(i, 0, temp); //add the newly created array
				//add the last unmatched  value to the end of the array  
				if(i == (temp_arr_2.length - 1)){
					if(temp_arr_2.length == 1){
						//the length of the whole array is 3, and when break it leng is 1 then the last value in the array must be included
						new_arr.splice((1), 0, temp_arr_1[ ( i + 1 )]);
					}else{
						new_arr.splice((i + 1), 0, temp_arr_1[i]);
					}
				}
			}
		}
		//Iterate through, given half the previous array 
		calc_numbers(new_arr);
	}
	/**
	*	Validate a text
	*	@text Text to be validated 
	*	@err Place to write the error message not failed validation  
	*	@return Return the text itself if is it valid, else empty string 
	**/
	function validate_data(text, err){
		let pattern = /^[a-zA-Z0-9]+$/;
		if(text == ""){
			err.html(" Name is required");
			return "";
		}else if(!text.match(pattern)){
			err.html(" Invalid use of special characters");
			return "";
		}else{
			err.html(" * ");
			return text;
		}
	}