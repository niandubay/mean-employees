import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from 'src/app/models/employee';

declare var M: any;

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  constructor(private employeeService: EmployeeService) { }

  profileForm = new FormGroup({
    _id: new FormControl(''),
    name: new FormControl('', Validators['required']),
    position: new FormControl('', Validators['required']),
    office: new FormControl('', Validators['required']),
    salary: new FormControl('', Validators['required']),
  });

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getEmployees()
    .subscribe(res => {
      this.employeeService.employees = res as Employee[];
    });
  }

  addEmployee() {
    if (this.profileForm.value._id) {
      this.employeeService.putEmployee(this.profileForm.value)
      .subscribe(res => {
        this.resetForm();
        M.toast({html: 'Updated Success'});
        this.getEmployees();
      });
    } else {
      this.employeeService.postEmployee(this.profileForm.value)
      .subscribe(res => {
        this.resetForm();
        M.toast({html: 'Save Success'});
        this.getEmployees();
      });
    }
  }

  editEmployee(employee: Employee) {
    this.employeeService.selectedEmployee = employee;
    this.updateProfile(employee);
  }

  deleteEmployee(_id: string) {
    if (confirm('Are you sure you want to delete it?')) {
      this.employeeService.deleteEmployee(_id)
      .subscribe(res => {
        console.log(res);
        M.toast({html: 'Deleted Successfully'});
        this.getEmployees();
      });
    }
  }

  resetForm() {
    this.profileForm.reset();
    this.employeeService.selectedEmployee = new Employee();
  }

  updateProfile(employee: Employee) {
    this.profileForm.patchValue(employee);
  }

}
