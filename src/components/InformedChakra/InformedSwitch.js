import React from "react";
import { Switch, FormLabel, Flex } from "@chakra-ui/core";
import { useField } from "informed";

const InformedSwitch = (props) => {
  const { fieldState, fieldApi, render, ref, userProps } = useField({
    ...props,
  });

  const { value } = fieldState;
  const { setValue, setTouched } = fieldApi;
  const { onChange, onBlur, field, label, ...rest } = userProps;

  return render(
    <>
      <Flex justify="space-between" align="center">
        <FormLabel htmlFor={field}>{label}</FormLabel>
        <Switch
          {...rest}
          ref={ref}
          id={field}
          value={value}
          onChange={(e) => {
            // debugger;
            // setValue(e.target.value);
            setValue(e.target.checked);
            if (onChange) {
              onChange(e);
            }
          }}
          onBlur={(e) => {
            setTouched(true);
            if (onBlur) {
              onBlur(e);
            }
          }}
        />
      </Flex>
    </>
  );
};

export default InformedSwitch;
