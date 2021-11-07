import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Observable, of, from, BehaviorSubject } from "rxjs";
import { User } from "src/app/models/user";
import { ApiService } from "src/app/services/api.service";
import { UserService } from "src/app/services/user.service";
import * as _ from "lodash";
import { UploadedFile } from "src/app/models/uploadedFile";
import { ToastService } from "src/app/services/toast.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit, OnDestroy {
  uploading = false;
  resetting = false;
  loading = false;
  error: string = "";
  user: User;
  userStreamSubscription: Subscription;

  constructor(
    private userService: UserService,
    private apiService: ApiService,
    private toastService: ToastService
  ) {
    this.userStreamSubscription = this.userService
      .getUserStream()
      .subscribe((user: User) => {
        this.user = _.clone(user);
        // console.log('userStreamSubscription: ', this.user)
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.userStreamSubscription.unsubscribe();
  }

  async onLoadImage() {}

  async onRemoveImage() {
    try {
      this.resetting = true;
      this.error = "";
      this.user.avatar = "assets/img/no-avatar.png";
      const response = await this.apiService.updateUser(this.user);
      this.userService.setUser(User.fromJSON(response));
      this.toastService.showSuccess("Изменение профиля", "Удаление изображения прошло успешно");
    } catch (err) {
      console.error(err);
      this.error = err.statusText ? err.statusText : err.message;
      this.toastService.showSuccess("Изменение профиля", "Возникли проблемы при удалении изображения");
    } finally {
      this.resetting = false;
    }
  }

  async onSaveChanges() {
    try {
      this.loading = true;
      this.error = "";
      const response = await this.apiService.updateUser(this.user);
      this.userService.setUser(User.fromJSON(response));
      this.toastService.showSuccess("Изменение профиля", "Сохранение профиля прошло успешно");
    } catch (err) {
      console.error(err);
      this.error = err.statusText ? err.statusText : err.message;
      this.toastService.showSuccess("Изменение профиля", "Возникли проблемы при сохранении профиля");
    } finally {
      this.loading = false;
    }
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  onClick(): void {
    console.log("onClick");
    this.userService.setUser(new User(12));
  }

  async fileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append("file", file, file.name);

      try {
        this.uploading = true;
        this.error = "";
        const uploadResponse = await this.apiService.uploadFile(formData);
        this.user.avatar = uploadResponse;
        const upldateResponse = await this.apiService.updateUser(this.user);
        this.userService.setUser(User.fromJSON(upldateResponse));
        this.toastService.showSuccess("Изменение профиля", "Загрузка изображения прошло успешно");
      } catch (err) {
        console.error(err);
        this.error = err.statusText ? err.statusText : err.message;
        this.toastService.showError("Изменение профиля", "Возникли проблемы при загрузке изображения");
      } finally {
        this.uploading = false;
      }
    }
  }
}
