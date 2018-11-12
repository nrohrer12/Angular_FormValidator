import { Component } from '@angular/core';
import { Employee } from './models/employee.model';
import { FormPoster } from './services/form-poster.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageTitle = 'Employee Form';
  d: Date = new Date();
  languages = [];

  model = new Employee('', '', false, '', this.d, 'default');
  hasPrimaryLanguageError = false;


  constructor(private formPoster: FormPoster) 
  {
    //Sets languages equal to languages from service
    this.formPoster.getLanguages().subscribe(
      data => this.languages = data.languages,
      err => console.log('get error: ', err)
    );
  }

  submitForm(form: NgForm) 
  {
    //Validate form
    this.validatePrimaryLanguage(this.model.primaryLanguage);
    if (this.hasPrimaryLanguageError)
      return;


    //console.log(form.value);  Just to test and see values of form
    this.formPoster.postEmployeeForm(this.model)
    .subscribe(
      data => console.log('success: ', data),
      err => console.log('error: ', err)
    );
  }

  validatePrimaryLanguage(value)
  {
    if(value === 'default')
    {
      this.hasPrimaryLanguageError = true;
    }
    else
    this.hasPrimaryLanguageError = false;
  }

  lastNameToUpperCase(value: string)
  {
    if (value.length > 0)
    {
      this.model.lastName = value.charAt(0).toUpperCase() + value.slice(1);
    }
    else
    this.model.lastName = value;
  }
}
