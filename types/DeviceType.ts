export type DeviceType = {
    uuid : number;
    roomUuid? : number;
    name?: string;
    battery : number;
    sampling : boolean;
    samplingRate : number;
    macAddress : string;

}
