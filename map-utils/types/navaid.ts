import { OperatingHours } from "./operating-hours";

export type Navaid = {
    _id: string;
    name: string;
    type: number;
    identifier: string;
    country: string;
    geometry: {
        type: "Polygon";
        coordinates: [number, number][][];
    };
    elevation: {
        value: number;
        unit: number;
        referenceDatum: number;
    };
    elevationGeoid: {
        value: number;
        unit: number;
        referenceDatum: number;
    };
    magneticDeclination: number;
    alignedTrueNorth: boolean;
    channel: string;
    frequency: {
        value: number;
        unit: number;
        name: string;
        primary: boolean;
        remarks: string;
    };
    range: {
        value: number;
        unit: number;
    };
    hoursOfOperation: {
        operatingHours: OperatingHours[];
        remarks: string;
    };
    images: string[];
    remarks: string;
    createdBy: string;
    updatedBy: string;
    createdAt: string;
    updatedAt: string;
};