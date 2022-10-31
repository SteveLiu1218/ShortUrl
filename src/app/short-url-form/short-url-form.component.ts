import { Component, Input, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import {
  FormBuilder,
  NgForm,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { BitlyService } from '../Service/bitly.service';
import { __values } from 'tslib';

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

  constructor(public fb: FormBuilder,
    public bitly: BitlyService) { }

  ngOnInit(): void {
    //定義接到的form 的 Schema
    //詳細方法 參考 https://angular.io/guide/reactive-forms , https://ithelp.ithome.com.tw/articles/10195280
    this.formShorter = this.fb.group({      //FormGroup
      //寫法1
      //["", [Validators.required, Validators.pattern(this.reg)]], //FormControlName
      longUrl: new FormControl({ value: null, disabled: false }, [Validators.required, Validators.pattern(this.reg)]),//寫法2
      shortUrl: new FormControl({ value: null, disabled: true })
    });

  }
  Save(form: FormGroup): void {
    if (form.valid) {
      //Call Bitty API
      //Observable 在Select的時候一定是搭配subscribe
      this.bitly.shortUrl(form.value["longUrl"]).subscribe(
        (l) => {
          this.formShorter.patchValue({ shortUrl: l.link }) //還有SetValue 可以用 https://ithelp.ithome.com.tw/articles/10195280
        }
      )
    }
  }
  //取form 整個的方法 //console.log(this.accountControl.value) 可驗證
  get accountControl(): FormControl {
    return this.formShorter.get('longUrl') as FormControl  //form.value["longUrl"] 一樣意思
  }
}
