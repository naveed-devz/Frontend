import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addStudent, editStudent } from '../features/studentSlice';

const StudentForm = ({ existingStudent, onClose }) => {
    const dispatch = useDispatch();
    const [student, setStudent] = useState(
        existingStudent || { id: Date.now(), name: '', age: '', course: '' }
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (existingStudent) {
            dispatch(editStudent({ id: existingStudent.id, updatedStudent: student }));
        } else {
            dispatch(addStudent(student));
        }
        onClose();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                value={student.name}
                onChange={handleChange}
                placeholder="Name"
                required
            />
            <input
                type="number"
                name="age"
                value={student.age}
                onChange={handleChange}
                placeholder="Age"
                required
            />
            <input
                type="text"
                name="course"
                value={student.course}
                onChange={handleChange}
                placeholder="Course"
                required
            />
            <button type="submit">{existingStudent ? 'Update' : 'Add'} Student</button>
        </form>
    );
};

export default StudentForm;
