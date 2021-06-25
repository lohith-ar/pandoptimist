import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor } from 'src/app/Model/Doctor';
import { HealthTips } from 'src/app/Model/HealthTips';
import { Mail } from 'src/app/Model/Mail';
import { DoctorService } from 'src/app/services/doctor.service';
import { OtpService } from 'src/app/services/otp.service';
import { from, Observable, interval } from 'rxjs';
import { map, take,concatMap } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tips: Array<HealthTips>;
  animatedTitles: Array<string> = ['Pandoptimist is a crowd sourcing platform to help all your emergency health requirements.'];
  animatedTitle$: Observable<string|null>;
  constructor(private router: Router, private doctorservice: DoctorService) { }
  ngOnInit(): void {
    this.animatedTitle$ = from(this.animatedTitles).pipe(
      concatMap((x) => this.typeEffect(x)),
    )
    this.doctorservice.getDoctorsTips().subscribe(
      resp => {
        this.tips = resp;
      }
    )
  }

type({ word, speed, backwards = false }): Observable<string>{
  return interval(speed).pipe(
    map(x =>
      backwards ? word.substr(0, word.length - x - 1) : word.substr(0, x + 1)
    ),
    take(word.length)
  );
}

 typeEffect(word): Observable<string> {
    return this.type({ word,speed: 100})
}
}
