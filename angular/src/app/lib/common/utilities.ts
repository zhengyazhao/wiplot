export  class  utilities{
 
    public static strIsEmptyOrNull(str: string): boolean {
        return str === undefined || str === null || str === '' ? true : false;
    }
}