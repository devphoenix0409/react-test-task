# React Test Task on Upwork

## Task 1: Build a simple React application that allows users to create, read, update and delete notes.
### Requirements:
- The user should be able to create a new note by filling out a form that includes a title and body.
- The user should be able to view all existing notes in a list format, displaying the title and a preview of the body.
- The user should be able to click on a note in the list to view its full content.
- The user should be able to edit the title and body of an existing note.
- The user should be able to delete a note.
- The application should be styled using CSS, with a clean and simple design.
- The application should be responsive and work well on desktop and mobile devices.
- The application should use React for building the user interface.
### Bonus:
- Implement search functionality to allow the user to search for specific notes based on their title or body content.
- Implement sorting functionality to allow the user to sort notes by title, date created or date modified.

### Please submit your code via GitHub or a similar code-sharing platform, along with instructions for running the application.

## Task 2: Find and fix issues with the following code:
```
function multiplyByClosure(mult) {
  const values = [0, 0.5, 1, 2, 3, 4, 5, 'a', false];
  return values.map(function(value) { 
	if(typeof value === 'number') {
		return value * mult
	}
	return value;
  });
}

function countZeroValues(values) {
	return values.filter(function(value) {
		return value == 0
	}).length
}

const multiplyByTwo = multiplyByClosure(2);
console.log(multiplyByTwo);

const multiplyByThree = multiplyByClosure(3);
console.log(multiplyByThree);

// count zero values, expecting 1:
console.log(countZeroValues(multiplyByTwo));

for (var i = 0; i < 10; i++) {
	
	const button = document.createElement('button');
	button.textContent = `Multiply by ${i}`;
	document.body.appendChild(button);

    button.onclick = function() {
        console.log(multiplyByClosure(i))
    };
}
```