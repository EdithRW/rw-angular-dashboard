import { CommonModule } from "@angular/common";
import { AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import Swal from 'sweetalert2';

import { UserService } from "../../services/user.service";

declare const google: any;

@Component({
  selector: "app-login",
  standalone: true,
  templateUrl: "./login.component.html",
  imports: [CommonModule, RouterModule, ReactiveFormsModule]

})
export default class LoginComponent implements AfterViewInit{

  @ViewChild('googleBtn') googleBtn!: ElementRef;

  public formSubmitted = false;

  public loginForm = this.fb.group({

    email: [localStorage.getItem('email') || '', [Validators.email, Validators.required ]],
    password: ['', [Validators.required]],
    remember: [false]

  });



  constructor(private fb: FormBuilder, private router: Router, private userService: UserService, private ngZone: NgZone) {}

  ngAfterViewInit(): void {
    this.googleInit();

  }

  googleInit(){
    google.accounts.id.initialize({
      client_id: '1042821282828-q55sdvi1l1f4lqf13r85l2ibm63mtihk.apps.googleusercontent.com',
      callback: (response: any) => this.handleCredentialResponse(response)
    });
    google.accounts.id.renderButton(

      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" } // customization attributes

      );
    }

    handleCredentialResponse(response : any){

      this.userService.googleLogin(response.credential)
      .subscribe(resp => {
        this.ngZone.run(()=> {
          this.router.navigateByUrl('/');
        })
      });

    }

    login(){
      this.userService.login(this.loginForm.value)
      .subscribe(resp => {

        if(this.loginForm.get('remember')!.value){
          localStorage.setItem('email', this.loginForm.get('email')!.value!);
        } else {
          localStorage.removeItem('email');
        }

        this.router.navigateByUrl('/');

      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      });




    }

  }
