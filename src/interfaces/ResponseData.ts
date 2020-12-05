export default interface IResponseData {
  code: number;
  success: boolean;
  message: string | Array<any>;
  content?: Array<any> | Object;
}
