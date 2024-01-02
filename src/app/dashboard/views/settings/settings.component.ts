import { Component, OnInit } from "@angular/core";
import { CardSettingsComponent } from "../../components/cards/card-settings/card-settings.component";
import { CardProfileComponent } from "../../components/cards/card-profile/card-profile.component";

@Component({
  selector: "app-settings",
  standalone: true,
  templateUrl: "./settings.component.html",
  imports: [CardSettingsComponent, CardProfileComponent]
})
export default class SettingsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
