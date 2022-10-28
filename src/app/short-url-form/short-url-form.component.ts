import { Component, Input, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { UrlModel } from '../Model/UrlModel'; { }
import {
  FormBuilder,
  NgForm,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";

@Component({
  selector: 'app-short-url-form',
  templateUrl: './short-url-form.component.html',
  styleUrls: ['./short-url-form.component.css']
})
export class ShortUrlFormComponent implements OnInit {
  formShorter!: FormGroup;
  reg =
    "((http|https)://)(www.)?" +
    "[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]" +
    "{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)";
  @Input() urlModel?: UrlModel;
  constructor(public fb: FormBuilder) { }

  ngOnInit(): void {
    this.formShorter = this.fb.group({      //FormGroup
      longUrl: ["", [Validators.required, Validators.pattern(this.reg)]], //FormControlName
      shortUrl: new FormControl({ value: null, disabled: true })
    });
  }
  Save(form: FormGroup): void {
    console.log(form.value["longUrl"]);
  }
}
