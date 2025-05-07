import { type OperatingHours } from "@/map-utils/types/operating-hours";

export type Airspace = {
  _id: string;
  name: string;
  dataIngestion: boolean;
  type: number;
  icaoClass: number;
  activity: number;
  onDemand: boolean;
  onRequest: boolean;
  byNotam: boolean;
  specialAgreement: boolean;
  requestCompliance: boolean;
  centrePoint: [number, number];
  geometry: {
    type: "Polygon";
    coordinates: [number, number][][];
  };
  country: string;
  upperLimit: {
    value: number;
    unit: number;
    referenceDatum: number;
  };
  lowerLimit: {
    value: number;
    unit: number;
    referenceDatum: number;
  };
  upperLimitMax: {
    value: number;
    unit: number;
    referenceDatum: number;
  };
  lowerLimitMin: {
    value: number;
    unit: number;
    referenceDatum: number;
  };
  frequencies: [
    {
      _id: string;
      value: string;
      unit: number;
      name: string;
      primary: boolean;
      remarks: string;
    },
  ];
  hoursOfOperation: {
    operatingHours: OperatingHours[];
    remarks: string;
  };
  activeFrom: string;
  activeUntil: string;
  remarks: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
};

export enum AirspaceType {
  Other,
  Restricted,
  Danger,
  Prohibited,
  /** Controlled Tower Region */
  CTR,
  /** Transponder Mandatory Zone */
  TMZ,
  /** Radio Mandatory Zone */
  RMZ,
  /** Terminal Maneuvering Area */
  TMA,
  /** Temporary Reserved Area */
  TRA,
  /** Temporary Segregated Area */
  TSA,
  /** Flight Information Region */
  FIR,
  /** Upper Flight Information Region */
  UIR,
  /** Air Defense Identification Zone */
  ADIZ,
  /** Airport Traffic Zone */
  ATZ,
  /** Military Airport Traffic Zone */
  MATZ,
  Airway,
  /** Military Training Route */
  MTR,
  Alert,
  Warning,
  Protected,
  /** Helicopter Traffic Zone */
  HTZ,
  Gliding,
  /** Transponder Setting */
  TRP,
  /** Traffic Information Zone */
  TIZ,
  /** Traffic Information Area */
  TIA,
  /** Military Training Area */
  MTA,
  /** Control Area */
  CTA,
  /** ACC Sector */
  ACC,
  /** Aerial Sporting Or Recreational Activity */
  Recreational,
  /** Low Altitude Overflight Restriction */
  LowAltitudeRestriction,
  /** Military Route */
  MRT,
  /** TSA/TRA Feeding Route */
  TFR,
  VFR,
}
