import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import express from "express";
import {QrCodeService} from "./qr-code.service";
import {data} from "autoprefixer";

@Component({
  selector: 'app-qr-generation-page',
  templateUrl: './qr-generation-page.component.html',
  styleUrl: './qr-generation-page.component.css'
})
export class QrGenerationPageComponent implements OnInit{
    qrCodeUrl=''


  constructor(private router:Router,
              private route: ActivatedRoute,
              private qrCodeService: QrCodeService,

  ) {
  }

  ngOnInit() {
  }

  generateQr() {
      let param = '';

    this.route.queryParamMap.subscribe(params => {
      const data = params.get('data') as string;
      if (data) {
        param = JSON.parse(data);
      }
    })


    this.qrCodeService.getQrCode(param).subscribe(
      (html: string)=> {
        this.qrCodeUrl = html;
      },
    )

    console.log(this.qrCodeUrl);
  }



}
