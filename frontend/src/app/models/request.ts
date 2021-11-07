import differenceInHours from "date-fns/differenceInHours";
import * as _ from "lodash";
import { environment } from "src/environments/environment";

export enum RequestCategory {
  CATEGORY_NONE = "none",
  CATEGORY_GLONASS = "glonass",
  CATEGORY_TACHOGRAPH = "tachograph",
}

export enum RequestType {
  TYPE_NONE = "none",
  TYPE_INSTALL = "install",
  TYPE_SERVICE = "service",
  TYPE_CALIBRATION = "calibration",
  TYPE_CHANGE_SKZI = "changeSKZI",
  TYPE_METROLOGICAL_VERIFY = "metrologicalVerify",
  TYPE_SKZI_DRIVER_CARD = "SKZIDriverCard",
  TYPE_ESTR_DRIVER_CARD = "ESTRDriverCard",
  TYPE_SKZI_ORGANIZATION_CARD = "SKZIOrganizationCard",
  TYPE_ESTR_ORGANIZATION_CARD = "ESTROrganizationCard",
}

export enum RequestStatus {
  STATUS_NONE = "none",
  STATUS_NEW = "new",
  STATUS_ACTIVE = "active",
  STATUS_FINESHED = "finished",
  STATUS_NOT_CONFIRMED = "notConfirmed",
  STATUS_REJECTED = "rejected",
}

export enum RequestHighlight {
  NONE = "none",
  NEW = "new",
  NOT_CONFIRMED = "not_confirmed",
  OVERDUE = "overdue",
}

export class Request {
  private requestOverdueInHours: number = environment.requestOverdueInHours;

  constructor(
    public created_at: string = "",
    public id: number = 0,
    public contractor: string = "",
    public vehicle: string = "",
    public status: RequestStatus = RequestStatus.STATUS_NONE,
    public type: RequestType = RequestType.TYPE_NONE,
    public category: RequestCategory = RequestCategory.CATEGORY_NONE,
    public worker: string = "",
    public description: string = "",
    public ended_at: string = "",
    public notificationNumber: number | null = null,
    public closeComment: string | null = null,
    public body: object = {}
  ) {}

  public formattedCreatedAtDate() {
    return new Date(this.created_at);
  }

  public formattedStatus() {
    switch (this.status) {
      case RequestStatus.STATUS_NEW:
        return "Новая";
      case RequestStatus.STATUS_ACTIVE:
        return "В работе";
      case RequestStatus.STATUS_FINESHED:
        return "Выполнена";
      case RequestStatus.STATUS_NOT_CONFIRMED:
        return "Требует подтверждения";
      case RequestStatus.STATUS_REJECTED:
        return "Отклонена";
      default:
        return "Не определён";
    }
  }

  public formattedType() {
    switch (this.type) {
      case RequestType.TYPE_INSTALL:
        return "Монтаж";
      case RequestType.TYPE_SERVICE:
        return "Сервис";
      case RequestType.TYPE_CALIBRATION:
        return "Калибровка";
      case RequestType.TYPE_CHANGE_SKZI:
        return "Замена СКЗИ";
      case RequestType.TYPE_METROLOGICAL_VERIFY:
        return "Метрологическая поверка";
      case RequestType.TYPE_SKZI_DRIVER_CARD:
        return "СКЗИ. Карта водителя";
      case RequestType.TYPE_ESTR_DRIVER_CARD:
        return "ЕСТР. Карта водителя";
      case RequestType.TYPE_SKZI_ORGANIZATION_CARD:
        return "СКЗИ. Карта предприятия";
      case RequestType.TYPE_ESTR_ORGANIZATION_CARD:
        return "ЕСТР. Карта предприятия";
      default:
        return "Не определён";
    }
  }

  capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  getHighlight(): RequestHighlight {
    if (_.isEmpty(this.created_at)) {
      return RequestHighlight.NONE;
    }

    switch (this.status) {
      case RequestStatus.STATUS_NEW:
        if (
          differenceInHours(new Date(), new Date(this.created_at)) >
          this.requestOverdueInHours
        ) {
          return RequestHighlight.OVERDUE;
        } else {
          return RequestHighlight.NEW;
        }
        break;
      case RequestStatus.STATUS_NOT_CONFIRMED:
        return RequestHighlight.NOT_CONFIRMED;

      default:
        return RequestHighlight.NONE;
    }
  }

  static fromJSON(d: Object): Request {
    return Object.assign(new Request(), d);
  }
}
