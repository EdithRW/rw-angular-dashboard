import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterModule } from "@angular/router";
import Swal from 'sweetalert2';

import { UserService } from "../../services/user.service";


@Component({
  selector: "app-register",
  standalone: true,
  templateUrl: "./register.component.html",
  imports: [CommonModule, RouterModule, ReactiveFormsModule]
})
export default class RegisterComponent {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    name: ['sdfsdfsdf', [Validators.required, Validators.minLength(3)]],
    email: ['sdfsd@sdf.sdf', [Validators.email, Validators.required ]],
    password: ['123', [Validators.required]],
    confirmPassword: ['123', [Validators.required]],
    terms: [false, Validators.required],
  }, {
    validators: this.samePasswords('password', 'confirmPassword')
  });

  constructor(private fb: FormBuilder, private userService: UserService) {}

  createUser(){
    this.formSubmitted = true;
    console.log(this.registerForm.value);

    if(this.registerForm.valid){
      console.log('correct');
      this.userService.createUser(this.registerForm.value)
        .subscribe( resp => {
          console.log(resp);
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

    if(pass !== confirmPass && this.formSubmitted){
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
