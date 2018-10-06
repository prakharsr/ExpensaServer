import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  name: string;
  phone: string;
  password: string;

  constructor(private api: ApiService,
    private notifications: NotificationService,
    private router: Router) { }

  ngOnInit() {
  }

  submit() {
    this.api.register(this.name, this.phone, this.password).subscribe(
      data => {
        if (data.success) {
          this.router.navigateByUrl('/dashboard');
        }
        else {
          console.log(data);

          this.notifications.show(data.msg);
        }
      }
    );
  }
}
