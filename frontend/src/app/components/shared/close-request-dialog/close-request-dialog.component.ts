import { Component, Input, OnInit } from "@angular/core";
import { NbDialogRef } from "@nebular/theme";
import * as _ from "lodash";

@Component({
  selector: "app-close-request-dialog",
  templateUrl: "./close-request-dialog.component.html",
  styleUrls: ["./close-request-dialog.component.scss"],
})
export class CloseRequestDialogComponent implements OnInit {
  // @Input() comment: string = '';
  comment: string = "";
  closeRequestButtonDisable: boolean = false;
  closeRequestButtonVisible: boolean = true;

  constructor(public dialogRef: NbDialogRef<CloseRequestDialogComponent>) {}
  // constructor() { }

  ngOnInit() {
    this.closeRequestButtonDisable = _.isEmpty(this.comment);
  }

  onCancelButtonClick(): void {
    this.dialogRef.close();
  }

  onCommentChange(value) {
    this.closeRequestButtonDisable = _.isEmpty(value);
  }

  onCloseRequestButtonClick(): void {
    this.dialogRef.close(this.comment);
  }
}
