import { Component, OnInit } from '@angular/core';
import { EmployeeDataService } from 'src/app/service/employee-service.service';
import { IEmployee } from '../employee.model';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {
  employees:IEmployee[];
  constructor(private ds:EmployeeDataService) { }

  ngOnInit() {
    this.ds.getEmployees().subscribe( 
      (listEmployes) => this.employees = listEmployes,
      (err) => console.log(err)
      );
  }
  btnClick_Edit(id:number){
    
  }
  btnClick_Del(id:number){
    this.ds.deleteEmployee(id).subscribe(
      null,
      (err) => console.log(err)
    );
  }

}
