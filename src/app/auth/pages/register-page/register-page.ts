import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-register-page',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './register-page.html',
})
export class RegisterPage {



  fb = inject(FormBuilder);
  hasError = signal(false);
  isPosting = signal(false);
  router = inject(Router);

  authService = inject(AuthService);

  loginForm = this.fb.group({
    fullName: ['',[Validators.required,Validators.maxLength(60)]],
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(6),Validators.maxLength(20)]]
  });

  onSubmit(){
    if(this.loginForm.invalid){
      this.hasError.set(true);
      setTimeout(()=>{
        this.hasError.set(false);
      },2000);
      return;
    }

    const {fullName='', email = '',password=''} = this.loginForm.value;
    this.authService.register(fullName!,email!,password!).subscribe((isAuthenticated)=>{
      if(isAuthenticated){
        this.router.navigateByUrl('/');
        return;
      }
      this.hasError.set(true);
      setTimeout(()=>{
        this.hasError.set(false);
      },2000);
    });
  }


}
