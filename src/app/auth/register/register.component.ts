import { CommonModule } from "@angular/common";
import { AfterViewInit, Component, ElementRef, ViewChild, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import Swal from 'sweetalert2';

import { UserService } from "../../services/user.service";

declare const google: any;


@Component({
  selector: "app-register",
  standalone: true,
  templateUrl: "./register.component.html",
  imports: [CommonModule, RouterModule, ReactiveFormsModule]
})
export default class RegisterComponent implements AfterViewInit{

  @ViewChild('googleBtn') googleBtn!: ElementRef;

  public formSubmitted = false;

  public registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.email, Validators.required ]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
    terms: [false, Validators.required],
  }, {
    validators: this.samePasswords('password', 'confirmPassword')
  });

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private ngZone: NgZone) {}

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
      { theme: "outline", size: "large", text: "signup_with" } // customization attributes

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

  createUser(){
    this.formSubmitted = true;
    console.log(this.registerForm.value);

    if(this.registerForm.valid){
      this.userService.createUser(this.registerForm.value)
        .subscribe( resp => {
          this.router.navigateByUrl('/');
        }, (err) => {
          Swal.fire('Error', err.error.msg, 'error');
        });

    } else{
      //alert("Please check the form for errors.")
    }

  }

  invalidField(field: string): boolean{

    const control = this.registerForm.get(field);
    if (control?.invalid && this.formSubmitted){
      return true;

    } else {
      return false;

    }
    return true;
  }

  InvalidPasswords(){
    let pass = this.registerForm.controls['password'];
    let confirmPass = this.registerForm.controls['confirmPassword'];

    if(pass.value !== confirmPass.value && this.formSubmitted){
      return true;
    } else {
      return false;
    }

  }

  termsAccept(){
    return !this.registerForm.get('terms')?.value && this.formSubmitted;
  }

  samePasswords(pass1: string, pass2:string){

    return(formGroup:FormGroup) => {

      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);

      if(pass1Control?.value === pass2Control?.value){
        pass2Control?.setErrors(null)
      } else {
        pass2Control?.setErrors({MatchPassword : true})
      }
    }

  }

}
