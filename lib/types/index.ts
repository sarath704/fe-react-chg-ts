export type InputTypes = 'text' | 'select' | 'checkbox';
export type DecisionTypes = 'accepted' | 'declined';

export interface LenderGetResponse {
  name: string;
  fields: Array<
    | 'first_name'
    | 'last_name'
    | 'email'
    | 'date_of_birth'
    | 'monthly_income'
    | 'gender'
    | 'address'
  >;
}

export interface LenderGetResponseExtended {
  name: string;
  fields: Array<LenderFields>;
}

export interface LenderFields {
  name: string;
  type: InputTypes;
  required: boolean;
  label?: string;
  options?: Array<string>;
}

export interface LenderPostResponse {
  decision: DecisionTypes;
}

export interface IFormControl {
  name: string;
  value: unknown;
  onChange: (props: any) => void;
  label: string;
  error: string | null;
  options?: Array<string>;
  checked?: boolean;
  required?: boolean;
}
export type InitValuesTypes = Record<string, string | boolean>;
