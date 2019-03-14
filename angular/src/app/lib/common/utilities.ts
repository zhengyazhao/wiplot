export class utilities {

    /**
     * 判断字符串是否为空
     * @param str 要判断的字符串
     * 为空的话返回true；不为空返回false
     */
    public static strIsEmptyOrNull(str: string): boolean {
        return str === undefined || str === null || str === '' ? true : false;
    }
    /**
     * 根据格式获取当前日期(默认返回yyyy-MM-dd)
     * @param type 日期格式：
     * 1. yyyy-MM-dd
     * 2. yyyy-MM-dd HH:mm:ss
     * 3. yyyyMMddHHmmss
     * 4. yyyyMMddHHmmssSS
     */
    public static getDate(type?: number) :string{

       
            // 格式化日期，获取今天的日期
            const Dates = new Date();
            const year: number = Dates.getFullYear();
            const month: any = (Dates.getMonth() + 1) < 10 ? '0' + (Dates.getMonth() + 1) : (Dates.getMonth() + 1);
            const day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
            const hours: any = Dates.getHours();
            const minutes: any = Dates.getMinutes();
            const seconds: any = Dates.getSeconds();
            const millise: any = Dates.getMilliseconds();
            let date = '';
            switch (type) {
                case 1: date = year + '-' + month + '-' + day; break;
                case 2: date = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds; break;
                case 3: date = year + '' + month + '' + day + '' + hours + '' + minutes + '' + seconds; break;
                case 4: date = year + '' + month + '' + day + '' + hours + '' + minutes + '' + seconds + '' + millise; break;
                default: date = year + '-' + month + '-' + day; break;

            }
            return date;
        
    }

}