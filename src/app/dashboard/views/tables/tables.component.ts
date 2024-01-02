import { Component, OnInit } from "@angular/core";
import { CardTableComponent } from "../../components/cards/card-table/card-table.component";

@Component({
  selector: "app-tables",
  standalone:true,
  templateUrl: "./tables.component.html",
  imports: [CardTableComponent]
})
export default class TablesComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
