var my_number = 5;
console.log(my_number);

var my_string = "heyo 1";

console.log(my_number + my_string);

var my_array = [2, 3, 4];
console.log(my_array);

var my_person = {name: "sally", age:9, eyes: "blue"};
console.log(my_person);
console.log(my_person.name);

var add = function(number1, number2){
	return number1 + number2
}

console.log(add(4,5))

var personNameAge = function(person){
	return person.name + " is " + person.age + " years old"

}

console.log(personNameAge(my_person))