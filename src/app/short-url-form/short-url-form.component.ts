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
    this.formShorter = this.fb.group({      //FormGroup
      longUrl: ["", [Validators.required, Validators.pattern(this.reg)]], //FormControlName
      shortUrl: new FormControl({ value: null, disabled: true })
    });
  }
  Save(form: FormGroup): void {
    if (form.valid) {
      //Call Bitty API
      this.bitly.shortUrl(form.value["longUrl"]).subscribe(
        (l) => {
          this.formShorter.patchValue({ shortUrl: l.link })
        }
      )

    }
  }
}
