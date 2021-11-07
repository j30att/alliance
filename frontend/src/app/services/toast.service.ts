import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { NbGlobalLogicalPosition, NbToastrService } from "@nebular/theme";
import { BehaviorSubject } from "rxjs";
import { User } from "../models/user";
import { StorageService } from "./storage.service";

@Injectable({
  providedIn: "root",
})
export class ToastService {
  config: any = {
    // position: NbGlobalLogicalPosition.BOTTOM_END,
    position: NbGlobalLogicalPosition.TOP_END,
    icon: "",
    duration: 5000,
  };

  constructor(private toastrService: NbToastrService) {}

  showSuccess(title, message) {
    this.toastrService.show(message, title, {
      ...this.config,
      status: "success",
    });
  }

  showError(title, message) {
    this.toastrService.show(message, title, {
      ...this.config,
      status: "danger",
    });
  }
}
