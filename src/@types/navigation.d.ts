export type SpeakerNavigationProps = {
  id?: string;
}
export type CompanyNavigationProps = {
  id?: string;
}
export type ScheduleNavigationProps = {
  id?: string;
}

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      signin: undefined;
      home: undefined;
      speaker: undefined;
      speaker_details: SpeakerNavigationProps;
      company: undefined;
      company_details: CompanyNavigationProps;
      schedule: undefined;
      schedule_details: ScheduleNavigationProps;
      guest: undefined;
    }
  }
}