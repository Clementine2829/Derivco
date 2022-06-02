## This is a match percentage app between two people's names using Node.Js ##

The sentence to be processed will read as {name1} matches {name2}, for example **'John matches Sherly'** 

Put two names and it will calculate how much they match to each other 

  -	Starting from the left, read the first character in the sentence and count how many times that character occurs. 
  -	Move on to the next character that has not been counted yet
  -	Repeat until all characters in the sentence have been counted
  -	You should now have a number showing how many times each character occurred in the sentence

This number now needs to be reduced to a 2 digit number.
  -	Add the left most and right most number that has not been added yet and put its sum at the end of the result.
  -	If there is only one number left add that number to the end of the result
  -	Repeat this process until there are only 2 digits left in the final string

The output then is read like **'John matches Sherly 60%'**

If the percentage is more than 80%, so for example if the output was 82% the output should read
**'John matches Sherly 81%, good match'**

### Below is a screenshot of the web app ###
![image](https://user-images.githubusercontent.com/79464757/171632866-b996f04e-b425-4c11-be3d-bb0fe66deaad.png)


### To clone the app you can do the following ###
- git clone https://github.com/Clementine2829/Derivco
