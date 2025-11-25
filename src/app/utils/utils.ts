import { Constants } from "./constants";

export class Utils {

  public static getStringConvertDate(dateString: string): Date {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return Constants.EMPTY_DATE;
    }
    console.log('Converted Date:', date); // Debugging line
    return date;
  }
}