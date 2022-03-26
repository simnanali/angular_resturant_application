import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DashboardApiService } from '../shared/dashboard-api.service';
import { ResturantModel } from './resturant.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  formValue!: FormGroup;
  resturantModelObj: ResturantModel = new ResturantModel;
  getAllResturantRecordsObj: any;
  Addbtn!: boolean;
  Updatebtn!: boolean;

  constructor(private formBuilder: FormBuilder, private dashboardApi: DashboardApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      mobile: [''],
      email: [''],
      address: [''],
      services: [''],
    })

    this.getAllResturantRecords();
  }

  clickAddRestorant() {
    this.formValue.reset();
    this.Addbtn = true;
    this.Updatebtn = false;
  }
  addResturant() {
    this.resturantModelObj.name = this.formValue.value.name;
    this.resturantModelObj.email = this.formValue.value.email;
    this.resturantModelObj.mobile = this.formValue.value.mobile;
    this.resturantModelObj.address = this.formValue.value.address;
    this.resturantModelObj.services = this.formValue.value.services;

    this.dashboardApi.postResturantRecords(this.resturantModelObj).subscribe(res => {
      //console.log(res);
      this.getAllResturantRecords();
      this.formValue.reset();
      alert("Record Inserted Successfully !!!");
    })
  }

  getAllResturantRecords() {
    this.dashboardApi.getAllResturantRecords().subscribe(res => {
      this.getAllResturantRecordsObj = res;
    })
  }

  deleteResturantRecordbyId(data: any) {
    console.log(data);
    this.dashboardApi.deleteResturantRecord(data.id).subscribe(res => {
      this.getAllResturantRecords();

      alert("Record deleted!!!");
    })
  }

  OnEditResturantRecord(data: any) {
    this.Addbtn = false;
    this.Updatebtn = true;

    this.resturantModelObj.id = data.id;
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['services'].setValue(data.services);
  }

  updateResturantRecord() {
    this.resturantModelObj.name = this.formValue.value.name;
    this.resturantModelObj.email = this.formValue.value.email;
    this.resturantModelObj.mobile = this.formValue.value.mobile;
    this.resturantModelObj.address = this.formValue.value.address;
    this.resturantModelObj.services = this.formValue.value.services;

    this.dashboardApi.putResturantRecords(this.resturantModelObj.id, this.resturantModelObj).subscribe(res => {
      this.getAllResturantRecords();
      this.formValue.reset();

      alert("Record Update Successfully!!!");
    })
  }
}
