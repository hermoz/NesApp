import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // incluimos en el constructor nuestro authservice para llamar luego al método logout
  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  salir(){
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }

}
