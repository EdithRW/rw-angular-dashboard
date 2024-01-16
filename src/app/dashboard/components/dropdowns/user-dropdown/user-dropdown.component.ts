import { CommonModule } from "@angular/common";
import { Component, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import { createPopper } from "@popperjs/core";
import { UserService } from "../../../../services/user.service";

@Component({
  selector: "app-user-dropdown",
  standalone: true,
  templateUrl: "./user-dropdown.component.html",
  imports: [CommonModule]
})
export class UserDropdownComponent implements AfterViewInit {
  dropdownPopoverShow = false;
  @ViewChild("btnDropdownRef", { static: false }) btnDropdownRef!: ElementRef;
  @ViewChild("popoverDropdownRef", { static: false })
  popoverDropdownRef!: ElementRef;

  public imgUrl : string = '';

  constructor( private userService : UserService){
    this.imgUrl = userService.userInfo!.imgUrl;
  }

  ngAfterViewInit() {
    createPopper(
      this.btnDropdownRef.nativeElement,
      this.popoverDropdownRef.nativeElement,
      {
        placement: "bottom-start",
      }
    );
  }

  toggleDropdown(event:any) {
    event.preventDefault();
    if (this.dropdownPopoverShow) {
      this.dropdownPopoverShow = false;
    } else {
      this.dropdownPopoverShow = true;
    }
  }

  logout(){
    this.userService.logout();
  }

}
