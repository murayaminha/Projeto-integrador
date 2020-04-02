import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { LoginService } from 'src/app/service/login.service';
import { Login } from '../models/login.model';
import { HeaderComponent } from '../header/header.component';
import { HttpService } from 'src/app/service/http.service';
import { StockService } from 'src/app/service/stock.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formularioLogin: FormGroup;
usuario: any

  constructor(private fb: FormBuilder, private http: LoginService, private http2: HttpService, private logar : HeaderComponent,private stock: StockService) { }

  login: boolean
  verificarLogin() {
    if (sessionStorage.getItem("usuario") != null) {
    this.usuario = JSON.parse(atob(sessionStorage.getItem("usuario")))
    this.login = true
    }
    else {
      this.login = false
    }
  }

  ngOnInit(): void {
    this.criarFormularioDeLogin()
    this.verificarLogin()
  }


  criarFormularioDeLogin() {
    this.formularioLogin = this.fb.group(
      {
        email: ["",
          Validators.compose([
            Validators.email,
            Validators.required
          ])],
        senha: ['']
      }
    )
  }


  logando() {
    let user: Login = new Login()
    user.mail = this.formularioLogin.value.email;
    user.password = this.formularioLogin.value.senha;

    
    this.http.fazerLogin(user).subscribe(data => {
      let login_json = JSON.stringify(data)
      sessionStorage.setItem("usuario", btoa(login_json))
      this.verificarLogin()
      location.reload()
    })  
  }


  deslogar() {
    sessionStorage.removeItem("usuario")
    this.verificarLogin()
    location.reload()
    this.stock.removeCart()
  }

}
