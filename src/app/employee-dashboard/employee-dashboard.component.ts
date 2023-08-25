import { Component, OnInit } from '@angular/core';
import{FormBuilder,FormGroup} from '@angular/forms';
import { EmployeeModel } from './employee-dashboard.model';
import { ApiService } from '../shared/api.service';


@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  reactiveForm !: FormGroup;
  employeeModelObj : EmployeeModel = new EmployeeModel();
  employeeData !: any;
  showAdd!:boolean;
  showUpdate!:boolean;
  constructor(private formbuilder : FormBuilder,private api:ApiService)
  {

  }
  ngOnInit(): void {
    this.reactiveForm = this.formbuilder.group({
firstName : [''],
lastName:[''],
email:[''],
mobile:[''],
salary:[''],

    })
    this.getAllEmployee();
  }
  clickAddEmployee(){
    this.reactiveForm.reset();
    this.showAdd = true;
    this.showUpdate =false;
  }
  postEmployeeDetails(){
    this.employeeModelObj.firstName = this.reactiveForm.value.firstName;
  this.employeeModelObj.lastName = this.reactiveForm.value.lastName;
  this.employeeModelObj.email = this.reactiveForm.value.email;
this.employeeModelObj.mobile = this.reactiveForm.value.mobile;
this.employeeModelObj.salary = this.reactiveForm.value.salary;
this.api.postEmployee(this.employeeModelObj)
.subscribe(res=>
  {
    console.log(res);
    alert("Employee Added successfully");
    let ref = document.getElementById('cancel')
    ref?.click()
    this.reactiveForm.reset();
    this.getAllEmployee();
  },
  err=>
  {
   alert("Something went wrong!");
  })
  }
  getAllEmployee(){
    this.api.getEmployee()
    .subscribe(res=>{
      this.employeeData = res;
    })
  }
  deleteEmployee(row:any){
    this.api.deleteEmployee(row.id)
    .subscribe(res=>{
alert("Employee Deleted successfully");
    })
  }
  onEdit(row:any){
    this.showUpdate = true;
    this.showAdd = false;
    this.employeeModelObj.id = row.id;
    this.reactiveForm.controls['firstName'].setValue(row.firstName);
    this.reactiveForm.controls['lastName'].setValue(row.lastName);
    this.reactiveForm.controls['email'].setValue(row.email);
    this.reactiveForm.controls['mobile'].setValue(row.mobile);
    this.reactiveForm.controls['salary'].setValue(row.salary);

  }
  updateEmployeeDetails(){
    this.employeeModelObj.firstName = this.reactiveForm.value.firstName;
    this.employeeModelObj.lastName = this.reactiveForm.value.lastName;
    this.employeeModelObj.email = this.reactiveForm.value.email;
  this.employeeModelObj.mobile = this.reactiveForm.value.mobile;
  this.employeeModelObj.salary = this.reactiveForm.value.salary;
  this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id)
  .subscribe(res=>{
    alert("Updated successfully");
    let ref = document.getElementById('cancel')
    ref?.click()
    this.reactiveForm.reset();
    this.getAllEmployee();

  })
  }

}
