/* eslint-disable @typescript-eslint/no-explicit-any */
/* Import Node modules */
import React from "react";
import { useEffect, useState } from "react";
import { Color, SketchPicker } from "react-color";
import reactCSS from "reactcss";
import { InstructionText } from "@contentstack/venus-components";
import { isEmpty } from "lodash";
/* Import our modules */
import localeTexts from "../../common/locales/en-us/index";
import { ColorPickerData } from "../../common/types/types";
import { useCustomField } from "../../common/hooks/useCustomField";
/* Import our CSS */
import "./styles.css";

const CustomFieldUILocation = () => {
  const { customField, setFieldData }: any = useCustomField();
  const [stateColor, setColor] = useState<ColorPickerData>({
    showPicker: false,
    pickerColor: {
      r: "108",
      g: "92",
      b: "231",
      a: "100",
    },
  });

  const styles = reactCSS({
    default: {
      color: {
        width: "70px",
        height: "30px",
        borderRadius: "4px",
        background: `rgba(${stateColor.pickerColor.r}, ${stateColor.pickerColor.g}, ${stateColor.pickerColor.b}, ${stateColor.pickerColor.a})`,
      },
    },
  });

  const togglePickerVisibility = () => {
    setColor((prev) => ({
      showPicker: !prev.showPicker,
      pickerColor: prev.pickerColor,
    }));
  };

  const closePicker = () => {
    setColor((prev) => ({
      showPicker: false,
      pickerColor: prev.pickerColor,
    }));
  };

  const pickerColorChanged = (color: any) => {
    setColor((prev) => ({
      showPicker: prev.showPicker,
      pickerColor: color.rgb,
    }));
    setFieldData(color);
  };

  useEffect(() => {

    if (!isEmpty(customField) && customField !== null) {
      setColor({
        showPicker: false,
        pickerColor: customField.rgb,
      });
    }
  }, [customField]);

  return (
    <div className="layout-container">
      <div>
        <div className="swatch" role="none" onClick={togglePickerVisibility} onKeyDown={togglePickerVisibility}>
          <div style={styles.color} />
        </div>
        {stateColor.showPicker ? (
          <div className="popover">
            <div className="cover" role="presentation" onClick={closePicker} onKeyDown={closePicker}>
              <SketchPicker color={stateColor.pickerColor  as unknown as Color} onChange={pickerColorChanged} />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default CustomFieldUILocation;

