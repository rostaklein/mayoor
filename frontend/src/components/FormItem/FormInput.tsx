import React from 'react';
import { useField } from 'formik';
import { Input } from 'antd';
import { InputProps } from 'antd/lib/input';

import { StyledFormItem, StyledLabel } from './Form.styles';

type FieldProps = {
	name: string;
	label?: string;
	icon?: React.ReactNode;
	withLabel?: boolean;
};

type Props = FieldProps & InputProps;

export const FormInput: React.FC<Props> = ({ icon, label, name, withLabel, ...rest }) => {
	const [{ value, onChange }, { touched, error }] = useField(name);
	const errorMessage = touched && error;
	const status = errorMessage ? 'error' : '';
	const getValue = () => {
		if (typeof value === 'string') {
			return value;
		}
		if (typeof value === 'number') {
			return value;
		}
		return '';
	};
	return (
		<StyledFormItem validateStatus={status} help={errorMessage}>
			<>
				{withLabel && <StyledLabel>{label}</StyledLabel>}
				<Input
					prefix={icon && icon}
					placeholder={label}
					name={name}
					onChange={onChange}
					value={getValue()}
					{...rest}
				/>
			</>
		</StyledFormItem>
	);
};
