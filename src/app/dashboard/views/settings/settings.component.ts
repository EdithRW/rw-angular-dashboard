import { Component, OnInit } from "@angular/core";
import { CardSettingsComponent } from "../../components/cards/card-settings/card-settings.component";
import { CardProfileComponent } from "../../components/cards/card-profile/card-profile.component";
import { UserService } from "../../../services/user.service";

@Component({
  selector: "app-settings",
  standalone: true,
  templateUrl: "./settings.component.html",
  imports: [CardSettingsComponent, CardProfileComponent]
})
export default class SettingsComponent implements OnInit {

  public imgUrl : string = '';

  constructor( private userService : UserService){
    this.imgUrl = userService.userInfo!.imgUrl;
  }

  ngOnInit(): void {}
}
