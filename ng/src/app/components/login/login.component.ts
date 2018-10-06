import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  phone: string;
  password: string;

  constructor(private api: ApiService,
    private notifications: NotificationService,
    private router: Router) { }

  ngOnInit() {
  }

  submit() {
    this.api.login(this.phone, this.password).subscribe(
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
