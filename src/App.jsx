import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from './Home'
import { InstructorLogin } from './Instructor_Management/Instructor_login'
import { Instructor_profile } from './Instructor_Management/Instructor_profile'
import { UserProvider } from './UserContext'
import { Instructor_Signup } from './Instructor_Management/Instructor_signup'
import { Admin_Login } from './Admin_Management/Admin_login'
import { Sample } from './Sample'
import { All_Instructors } from './Instructor_Management/All_Instructors'
import { Instructor_update } from './Instructor_Management/Instructor_update'
import { Student_Signup } from './Student_Management/Student_signup'
import { All_Students } from './Student_Management/All_Students'
import { Admin_profile } from './Admin_Management/Admin_profile'
import { Create_Message } from './Message_Management/Create_Message'
import { All_Messages } from './Message_Management/All_Messages'
import { Edit_Message } from './Message_Management/Edit_Message'
import { Enroll_Instructor_Class } from './Class_Management/Enroll_Instructor_class'
import { Student_Login } from './Student_Management/Student_Login'
import { Student_profile } from './Student_Management/Student_profile'
import { Enroll_Student_class } from './Class_Management/Enroll_Student_class'


function App() {
  

  return (
    <div>
      <UserProvider>
      <Routes>
        <Route index path='sample' element={<Sample/>} />
        <Route index path='/' element={<Home/>} />

        {/* admin management */}
        <Route index path='admin/login' element={<Admin_Login/>} /> 
        <Route index path='admin/profile' element={<Admin_profile/>} /> 


        {/* Instructor management */}
        <Route index path='instructor/login' element={<InstructorLogin/>} />
        <Route index path='instructor/profile' element={<Instructor_profile/>} />
        <Route index path='instructor/signup' element={<Instructor_Signup/>} />
        <Route index path='instructors' element={<All_Instructors/>} />
        <Route index path='instructor/edit/:id' element={<Instructor_update/>} />

        {/* student management */}
        <Route index path='student/signup' element={<Student_Signup/>} />
        <Route index path='students' element={<All_Students/>} />
        <Route index path='student/login' element={<Student_Login/>} />
        <Route index path='student/profile' element={<Student_profile/>} />


         {/* message management */}
         <Route index path='message/create' element={<Create_Message/>} />
         <Route index path='messages' element={<All_Messages/>} />
         <Route path="message/edit/:id" element={<Edit_Message />} />

         {/*class management*/}
         <Route index path='enroll/insructor/class' element={<Enroll_Instructor_Class/>} />
         <Route index path='/studentclass/enroll/student/class' element={<Enroll_Student_class/>} />

      </Routes>
      </UserProvider>
    </div>
  )
}

export default App
