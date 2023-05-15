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

### Result:

```
git clone https://github.com/devphoenix0409/react-test-task.git
cd react-test-task
yarn
yarn start
```

## Task 3: Improve the following component’s code. Reduce number of requests & StudentsTable total update time. fetchStudentData, fetchSchoolData & fetchLegalguardianData can only fetch one entity per request, we don’t have control over remote API. Please, abstain from using help of neural networks - we’re evaluating your programming skill.

```
import StudentsPicker from '../components/StudentsPicker';
import StudentsTable from '../components/StudentsTable';
import { fetchStudentData, fetchSchoolData, fetchLegalguardianData } from '../utils';
import { useState } from 'react';

const studentsDataComponent = () => {
  const [studentsData, setStudentsData] = useState([]);
  const [schoolsData, setSchoolsData] = useState([]);
  const [legalguardiansData, setLegalguardiansData] = useState([]);

  const onStudentsPick = async (studentIds) => {
    for (const studentId of studentIds) {
      const studentData = await fetchStudentData(studentId);
      setStudentsData([...studentsData, studentData]);
      for (const student of studentData) {
          const { schoolId, legalguardianId } = student;
          const schoolData = await fetchSchoolData(schoolId);
          setSchoolsData([...schoolsData, schoolData]);
          const legalguardianData = await fetchLegalguardianData(legalguardianId);
          setLegalguardiansData([...legalguardiansData, legalguardianData]);
      }
    }
  };

  return (
    <>
      <StudentsPicker onPickHandler={onStudentsPick} />
      <StudentsTable
        studentsData={studentsData}
        schoolsData={schoolsData}
        LegalguardiansData={legalguardiansData}
      />
    </>
  );
};

export default studentsDataComponent;
```

### Result:

```
git clone https://github.com/devphoenix0409/react-test-task.git
cd react-test-task/src/screens/task3
```
