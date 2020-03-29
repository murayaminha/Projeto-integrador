import { Component, OnInit, Injectable } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';
import { Router } from '@angular/router';
import { StockService } from 'src/app/service/stock.service';
import { Carrinho } from '../models/carrinho';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  logar: boolean;
  carrinho: Carrinho[] = [];

  constructor(private http: HttpService, private router: Router,private stock: StockService) { }


  verificarLogin() {
    let usuario = JSON.parse(localStorage.getItem("usuario"))
    if (usuario == null) {
      this.logar = true
      console.log("usuário não logado")
    }
    else {
    this.logar = false
      console.log(usuario)
    }
  }


  ngOnInit(): void {
    this.verificarLogin()
  }


  verificarCarrinho() {
    this.carrinho = this.stock.recoverCart()
    if (this.carrinho == null || this.carrinho.length <= 0) {
      return alert("Carrinho está vazio")
    }else{
      this.router.navigate(["/carrinho"])
    }
  }


}
