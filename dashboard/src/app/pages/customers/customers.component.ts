import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  keysForm;
  keysAdded;

  constructor(    
    private fb: FormBuilder
    ) {
    this.keysForm = this.fb.group({
      active: [''],
      consumer_key: [''],
      consumer_secret: [''],
      access_token: [''],
      access_token_secret: ['']
    });

    this.keysAdded = false;
   }

  ngOnInit() {
    this.keysForm.value.active = localStorage.getItem('active');
    if(this.keysForm.value.active === 'true') {
      this.keysForm.value.active = true;
      this.keysForm.controls.consumer_key.enable()
      this.keysForm.controls.consumer_secret.enable()
      this.keysForm.controls.access_token.enable()
      this.keysForm.controls.access_token_secret.enable()
    } else if(this.keysForm.value.active === 'false' || !this.keysForm.value.active) {
      this.keysForm.value.active = false;
      this.keysForm.controls.consumer_key.disable()
      this.keysForm.controls.consumer_secret.disable()
      this.keysForm.controls.access_token.disable()
      this.keysForm.controls.access_token_secret.disable()
    }
 
    this.keysForm.value.consumer_key = localStorage.getItem('consumer_key');
    this.keysForm.value.consumer_secret = localStorage.getItem('consumer_secret');
    this.keysForm.value.access_token = localStorage.getItem('access_token');
    this.keysForm.value.access_token_secret = localStorage.getItem('access_token_secret');
 
  }

  activeOwnKeys() {
    if(this.keysForm.value.active) {
      this.keysForm.controls.consumer_key.enable()
      this.keysForm.controls.consumer_secret.enable()
      this.keysForm.controls.access_token.enable()
      this.keysForm.controls.access_token_secret.enable()
      localStorage.setItem('active', this.keysForm.value.active);
    } else {
      this.keysForm.controls.consumer_key.disable()
      this.keysForm.controls.consumer_secret.disable()
      this.keysForm.controls.access_token.disable()
      this.keysForm.controls.access_token_secret.disable()
      localStorage.setItem('active', this.keysForm.value.active);
      this.keysAdded = false;
    }
  }

  setKeys() {

    localStorage.setItem('active', this.keysForm.value.active);
    localStorage.setItem('consumer_key', this.keysForm.value.consumer_key);
    localStorage.setItem('consumer_secret', this.keysForm.value.consumer_secret);
    localStorage.setItem('access_token', this.keysForm.value.access_token);
    localStorage.setItem('access_token_secret', this.keysForm.value.access_token_secret);

    if(this.keysForm.value.active) {
      this.keysAdded = true;
    }
  }

}
