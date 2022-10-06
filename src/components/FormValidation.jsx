import React, { Component } from 'react'
import StudentInfo from './ChildsComponent/StudentInfo'
import StudentsTable from './ChildsComponent/StudentsTable'

export default class FormValidation extends Component {
  render() {
    return (
      <div className='container'>
        <StudentInfo />
        <StudentsTable />
      </div>
    )
  }
}
