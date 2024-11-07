export interface KeyValueObj {
  [key: string]: string;
}
export interface ColorPickerData {
  showPicker: boolean;
  pickerColor: {
      r: string;
      g: string;
      b: string;
      a: string;
  };
}     

export type ChildProp = {
  children: string | JSX.Element | JSX.Element[];
};
