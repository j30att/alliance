import { Component, Input, OnInit } from "@angular/core";
import { NgModel } from "@angular/forms";
import { NbDialogService } from "@nebular/theme";
import { CloseRequestDialogComponent } from "src/app/components/shared/close-request-dialog/close-request-dialog.component";

export class Model {
  constructor(public m_str: string, public m_num: number) {}
}

@Component({
  selector: "app-butts",
  templateUrl: "./butts.component.html",
  styleUrls: ["./butts.component.scss"],
})
export class ButtsComponent implements OnInit {
  constructor(private dialogService: NbDialogService) {}

  ngOnInit(): void {}

  onOpenDialogButtonClick(): void {
    this.dialogService
      .open(CloseRequestDialogComponent, {
        context: {
          comment: "This is a title passed to the dialog component",
        },
        closeOnBackdropClick: false,
      })
      .onClose.subscribe((name) => name && console.log("name", name));
  }
}
