import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { deepStrictEqual } from 'assert';
import { EmployeeDataService } from 'src/app/service/employee-service.service';
import { CustomValidator } from "../../customValidator"
import { IEmployee, ISkill } from '../employee.model';

@Component({
  selector: 'app-put-employee',
  templateUrl: './put-employee.component.html',
  styleUrls: ['./put-employee.component.css']
})
export class PutEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  employee: IEmployee;
  editId: number;
  validationMessages: any = {
    fullName: {
      'required': "Full name is required",
      'maxlength': "max 15 characters are allowed",
      'minlength': "at least 2 characters are required"
    },
    email: {
      'email': "must be an email (name@email.com)",
      'emailDomain': "Email domain must be from email.com",
      'required': "email is required"
    },
    phone:{
      minLength:"must be 5 characters at least",
      maxLength: "not more than 20 charecters"
    },
    skillName: {
      'required': "skill name is required"
    },
    expInYear: {
      'required': "skill experiance is required",
      'positiveNo': "only positive value allowed"
    },
    proficiency: {
      'required': "skill proficiency is a required field"
    }
  }
  formErr = {
    'fullName': '',
    'email': '',
    'phone':''
    // 'skills': [{
    //   'skillName': '',
    //   'expInYear': '',
    //   'proficiency': ''
    // }]
  }
  constructor(private fb: FormBuilder, private ds: EmployeeDataService,
    private route: ActivatedRoute) { this.route.params.subscribe(params => this.editId = params.id); }

  ngOnInit() {
    this.employeeForm = new FormGroup({
      fullName: new FormControl('',
        [Validators.required, Validators.maxLength(25), Validators.minLength(2)]),
      phone: new FormControl('',[Validators.minLength(5),Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required, CustomValidator.email, CustomValidator.emailDomain('email.com')]),
      skills: this.fb.array([
        this.addSkill()
      ])
    });
    if (this.editId) {
      this.ds.getEmployee(this.editId).subscribe(
        (emp) => this.loadEmployee(emp),
        (err) => console.log(err)
      );
    }
    this.employeeForm.valueChanges.subscribe((data) => {
      this.checkValidation();
    })
  }
  loadEmployee(emp: IEmployee) {
    this.employee = emp;
    this.employeeForm.setControl('skills', this.loadSkills(this.employee.skills));    
    this.employeeForm.patchValue(this.employee);
  }
  loadSkills(skills:ISkill[]):FormArray{
    let formArr = new FormArray([]);
    skills.forEach(s=> {
      formArr.push(this.addSkill());
    });
    return formArr;
  }
  onSubmit(): void {
    if (this.employeeForm.invalid) {
      //this.checkValidation(this.employeeForm);
      alert("fill the form correctly");
    } else {
      //submit form
      console.log(this.employeeForm);
      if(this.editId){
        this.ds.putEmployee(this.employeeForm.value,this.editId).subscribe(
          (data) => {
            this.employee = data;
            this.loadEmployee(this.employee);
          },
          (err) => console.log(err)
        );
      }else{
        this.ds.postEmployee(this.employeeForm.value).subscribe(
          (data) => this.employee = data,
          (err) => console.log(err)
        );
      }
      this.employeeForm.markAsUntouched();
      alert("Data has been saved!")
    }
  }
  onAddSkillBtn_Click() {
    (this.employeeForm.get('skills') as FormArray).push(this.addSkill());
  }
  onDelSkill_Click(index:number){
    let skillSet = (this.employeeForm.get('skills') as FormArray);
    skillSet.removeAt(index);
    skillSet.markAsTouched();
    skillSet.markAsDirty();
  }
  checkValidation(fg: FormGroup = this.employeeForm): void {
    //looping through controls
    Object.keys(fg.controls).forEach((key: string) => {
      const fc = fg.get(key);

      this.formErr[key] = '';
      if (fc.touched || fc.dirty || fc.value!='')
        for (const errKey in fc.errors) {
          if (Object.prototype.hasOwnProperty.call(fc.errors, errKey)) {
            const errMsg = this.validationMessages[key][errKey];
            this.formErr[key] += errMsg + ", ";
          }
        }
      if (fc instanceof FormGroup)
        this.checkValidation(fc);

    });
    //console.log(this.formErr);
  }

  addSkill(): FormGroup {
    // this.formErr.skills.push({
    //   'skillName': '',
    //   'expInYear': '',
    //   'proficiency': ''
    // });
    return new FormGroup({
      skillName: new FormControl('', [Validators.required]),
      expInYear: new FormControl('', [Validators.required, CustomValidator.positiveNo]),
      proficiency: new FormControl('', Validators.required)
    });
  }

  onCheckData() {
    console.log(this.employee);
    console.log(this.employeeForm.value);
  }
}
