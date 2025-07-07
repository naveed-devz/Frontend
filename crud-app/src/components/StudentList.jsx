import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteStudent } from '../features/studentSlice';
import StudentForm from './StudentForm';

const StudentList = () => {
    const { students } = useSelector((state) => state.student);
    const dispatch = useDispatch();
    const [editingStudent, setEditingStudent] = useState(null);

    const handleDelete = (id) => {
        dispatch(deleteStudent(id));
    };

    return (
        <div>
            <h2>Student List</h2>
            <button onClick={() => setEditingStudent({})}>Add Student</button>
            {students.map((student) => (
                <div key={student.id}>
                    <p>Name: {student.name}</p>
                    <p>Age: {student.age}</p>
                    <p>Course: {student.course}</p>
                    <button onClick={() => setEditingStudent(student)}>Edit</button>
                    <button onClick={() => handleDelete(student.id)}>Delete</button>
                </div>
            ))}
            {editingStudent && (
                <StudentForm
                    existingStudent={editingStudent}
                    onClose={() => setEditingStudent(null)}
                />
            )}
        </div>
    );
};

export default StudentList;
