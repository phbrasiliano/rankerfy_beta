# Rankerfy structure module
This is the repository for the basic implementation for the Rankerfy project. Here you can find the most simple structure in which the rankerfy can work, using only HTML, CSS and Javascript.
### What is Rankerfy?
Rankerfy is a project of a web application that helps users decide in which order they prefer the items from any given list, automatically creating a personal rank on the matter.
The ranking structure uses a modified sorting algorithm to order the items on the list. After a few tests, I found out that the Mergesort was the best structure to be used for the code, as it has a low number of comparisons, and always display the items in an interesting order for the user.
### Is the whole application on this repository?
No, this is the repository just for the logic of the application, that is supposed to be running locally on the users computer. Initially wrote the code for this in ruby, as my first plan was to make Rankerfy as a Rails application, but I decided that letting the process run on the user computer would be much better, so I decided to port it to javascript.
I also chose to make this small implementation of rankerfy, so I could train my javascript, and have the implementation as a small demonstration to people.
### What is Rankerfy structure supposed to be doing right now?
At the time I am writing this, the app is not ready yet, but the "MVP" of this module should:
1. Let users choose among a few different base lists, which list they want to order. (showing also the criteria for the list).
2. Let the user delete some of the items on their list, that they don't want to order.
3. Have the user actually rank the items.
4. Display the final rank to the user.

Also, it is my objective to have the application
* Run fine on mobile.
* Let the keyboard keys be used in the ranking stage of the process.