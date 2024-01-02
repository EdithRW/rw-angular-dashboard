import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-login",
  standalone: true,
  templateUrl: "./login.component.html",
  imports: [CommonModule, RouterModule]

})
export default class LoginComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
