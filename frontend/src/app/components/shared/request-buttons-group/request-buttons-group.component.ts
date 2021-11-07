import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { NbDialogService } from "@nebular/theme";
import { ButtonsGroupType } from "src/app/models/buttonsGroup";
import { RequestStatus } from "src/app/models/request";
import { CloseRequestDialogComponent } from "../close-request-dialog/close-request-dialog.component";

@Component({
  selector: "app-request-buttons-group",
  templateUrl: "./request-buttons-group.component.html",
  styleUrls: ["./request-buttons-group.component.scss"],
})
export class RequestButtonsGroupComponent implements OnInit {
  ButtonsGroupType = ButtonsGroupType;
  buttonsGroupType: ButtonsGroupType = ButtonsGroupType.GROUP_NONE;
  RequestStatus = RequestStatus;

  private _requestStats: RequestStatus = RequestStatus.STATUS_NONE;
  @Input() set requestStatus(value: RequestStatus) {
    this._requestStats = value;
    this.updateButtonsGroup();
  }
  get requestStatus() {
    return this._requestStats;
  }

  @Input() loading: any = {
    send: false,
    confirm: false,
    reject: false,
    closing: false,
    content: false,
  };
  @Input() sendButtonDisabled: boolean = true;
  @Input() requestCloseComment: string | null = null;

  @Output() onSendButtonClick = new EventEmitter<void>();
  @Output() onBackButtonClick = new EventEmitter<void>();
  @Output() onRejectButtonClick = new EventEmitter<void>();
  @Output() onConfirmButtonClick = new EventEmitter<void>();
  @Output() onCloseRequestButtonClick = new EventEmitter<string>();

  constructor(private dialogService: NbDialogService) {}

  ngOnInit(): void {}

  updateButtonsGroup() {
    switch (this._requestStats) {
      case RequestStatus.STATUS_NONE:
        this.buttonsGroupType = ButtonsGroupType.GROUP_SEND;
        break;
      case RequestStatus.STATUS_NEW:
      case RequestStatus.STATUS_ACTIVE:
      case RequestStatus.STATUS_FINESHED:
      case RequestStatus.STATUS_REJECTED:
        this.buttonsGroupType = ButtonsGroupType.GROUP_BACK;
        break;
      case RequestStatus.STATUS_NOT_CONFIRMED:
        this.buttonsGroupType = ButtonsGroupType.GROUP_CONFIRM;
        break;
    }
  }

  sendButtonClick() {
    this.onSendButtonClick.emit();
  }
  backButtonClick() {
    this.onBackButtonClick.emit();
  }
  rejectButtonClick() {
    this.onRejectButtonClick.emit();
  }
  confirmButtonClick() {
    this.onConfirmButtonClick.emit();
  }

  closeRequestButtonClick() {
    this.dialogService
      .open(CloseRequestDialogComponent, {
        context: {
          // comment: this.requestCloseComment,
          // closeRequestButtonVisible: requestStatus
        },
        closeOnBackdropClick: false,
      })
      .onClose.subscribe(
        (comment) => comment && this.onCloseRequestButtonClick.emit(comment)
      );
  }

  showCloseRequestCommentButtonClick() {
    this.dialogService.open(CloseRequestDialogComponent, {
      context: {
        comment: this.requestCloseComment,
        closeRequestButtonVisible: false,
      },
      closeOnBackdropClick: false,
    });
  }
}
