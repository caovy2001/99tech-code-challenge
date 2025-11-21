export class CommonReponse {
  constructor(_data: any, _success: boolean, _message: string | undefined) {
    this.data = _data;
    this.success = _success;
    this.message = _message;

    if (!this.message) {
      this.message = this.success ? "success" : "fail";
    }
  }
  private success: boolean | undefined;
  private message: string | undefined;
  private data: any;
  public static of(data: any, success: boolean, message?: string) {
    return new CommonReponse(data, success, message);
  }
}
