export type Runway = {
  designator: string;
  trueHeading: number;
  alignedTrueNorth: boolean;
  operations: number;
  mainRunway: boolean;
  turnDirection: number;
  takeOffOnly: boolean;
  landingOnly: boolean;
  surface: {
    composition: number[];
    mainComposite: number;
    condition: number;
  };
  dimension: {
    length: {
      value: number;
      unit: number;
    };
    width: {
      value: number;
      unit: number;
    };
  };
  declaredDistance: {
    tora?: {
      value: number;
      unit: number;
    };
    lda?: {
      value: number;
      unit: number;
    };
    toda?: {
      value: number;
      unit: number;
    };
    asda?: {
      value: number;
      unit: number;
    };
  };
  thresholdLocation: {
    geometry: {
      type: "Point";
      coordinates: [number, number];
    };
    elevation: {
      value: number;
      unit: number;
      referenceDatum: number;
    };
  };
  exclusiveAircraftType: number[];
  pilotCtrlLighting: boolean;
  lightingSystem?: number[];

  /* Available visual approach aids on this runway. Possible values:
        0: Visual Approach Slope Indicator
        1: Precision Approach Path Indicator
        2: Tri-Color Visual Approach Slope Indicator
        3: Pulsating Visual Approach Slope Indicator
        4: Alignment Of Elements System 
    */
  visualApproachAids?: number[];
  _id: string;
};
