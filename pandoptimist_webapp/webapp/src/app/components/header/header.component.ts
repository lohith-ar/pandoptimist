import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConsultantServiceService } from 'src/app/services/consultant-service.service';
import { LoginuserService } from 'src/app/services/loginuser.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private loginservice: LoginuserService, private router: Router, 
    private conservice: ConsultantServiceService) { }
  loggedin:boolean=false;
  loginuserButton:boolean=true;
  sosbutton=true;
  ngOnInit(): void {
  }
  ngDoCheck():void{
    // if(localStorage.getItem('role')=="doctor" || localStorage.getItem('role')=="volunteer"
    // || localStorage.getItem('role')=="donor" || this.loginservice.isPatientLoggedin()
    // || localStorage.getItem('role')=="null")
    if(this.loginservice.isLoggedin())
    {
      this.sosbutton=false;
      this.loggedin= this.loginservice.isLoggedin();
    }
    if(this.loginservice.isPatientLoggedin()){
      this.sosbutton=false;
      this.loggedin=true;
    }
  }
  // onlogin(){
  //   if(this.loginservice.isLoggedin()==true){
  //   this.loginuserButton=false;
  //   }
  // }
  toSOS() {
    this.router.navigate(['/patient-login']);
  }
  toHome() {
    this.router.navigate(['/home'])
  }
  logout() {
    if(localStorage.getItem('role')=="doctor"){
      this.setDoctorOffline(localStorage.getItem('email'));
    }
    this.loginservice.logout();
    this.loggedin = this.loginservice.isLoggedin();
    location.reload();
  }
  setDoctorOffline(mail:String){
    this.conservice.getAllDoctorsOnline().subscribe(
      (alldoctors)=>{
        alldoctors.forEach(element => {
          if(element.email== mail){
            this.loginservice.setStatusBusy(element).subscribe();
            console.log("======================");
            
          }
        });
      }
    )
  }
}