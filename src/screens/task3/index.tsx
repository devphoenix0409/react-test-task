import StudentsPicker from "../components/StudentsPicker";
import StudentsTable from "../components/StudentsTable";
import {
  fetchStudentData,
  fetchSchoolData,
  fetchLegalguardianData,
} from "../utils";
import { useState } from "react";

interface TableDataType {
  students: any[];
  schools: any[];
  legalguardians: any[];
}

const studentsDataComponent = () => {
  const [tableData, setTableData] = useState<TableDataType>({
    students: [],
    schools: [],
    legalguardians: [],
  });

  const onStudentsPick = async (studentIds: number[]) => {
    await Promise.all(
      studentIds.map(async (studentId) => {
        const students: any[] = await fetchStudentData(studentId);

        await Promise.all(
          students.map(async (student) => {
            const { schoolId, legalguardianId } = student;
            const school = await fetchSchoolData(schoolId);
            const legalguardian = await fetchLegalguardianData(legalguardianId);

            const updatedTableData: TableDataType = {
              students: tableData.students.concat(tableData.students, student),
              schools: tableData.schools.concat(tableData.schools, school),
              legalguardians: tableData.legalguardians.concat(
                tableData.legalguardians,
                legalguardian
              ),
            };

            setTableData(updatedTableData);
          })
        );
      })
    );
  };

  return (
    <>
      <StudentsPicker onPickHandler={onStudentsPick} />
      <StudentsTable
        studentsData={tableData.students}
        schoolsData={tableData.schools}
        legalguardiansData={tableData.legalguardians}
      />
    </>
  );
};

export default studentsDataComponent;
